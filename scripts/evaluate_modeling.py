"""Frozen, opt-in end-to-end evaluation; scripted and live results stay separate."""
import argparse
import hashlib
import importlib.metadata
import json
import math
import os
from pathlib import Path
import platform
import statistics
import tempfile
import time
from datetime import datetime,timezone
from types import SimpleNamespace

ROOT=Path(__file__).resolve().parents[1]
SUITE=ROOT/'evaluation/modeling_v1.json'
LOCK=ROOT/'evaluation/modeling_v1.lock.json'


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_suite():
    suite=json.loads(SUITE.read_text(encoding='utf-8'))
    lock=json.loads(LOCK.read_text(encoding='utf-8'))
    if digest(SUITE)!=lock['dataset_sha256']:raise ValueError('Frozen evaluation fixture changed. Create a new suite version; do not overwrite this evaluation.')
    ids=[c['id'] for c in suite['cases']]
    if len(ids)!=len(set(ids)):raise ValueError('Duplicate evaluation case IDs.')
    groups={split:{c['group'] for c in suite['cases'] if c['split']==split} for split in ('development','heldout')}
    if groups['development']&groups['heldout']:raise ValueError('Scenario groups cross evaluation splits.')
    return suite,lock


def implementation_matches(lock):
    return all((ROOT/name).is_file() and digest(ROOT/name)==value for name,value in lock['implementation_sha256'].items())


def measurement_matches(actual,expected):
    return isinstance(actual,(int,float)) and not isinstance(actual,bool) and math.isfinite(actual) and abs(actual-expected)<.01


def initial_checks(case,spec):
    expected=case['expected']
    if case['kind']=='precise':return {'requested_spec':spec==expected['spec']}
    parts=spec.get('components',[])
    primary=[c for c in parts if c['role']==expected['role']]
    checks={'concept_matches':spec.get('concept')==expected['concept'],'one_primary_component':len(primary)==1}
    for field,value in expected['dimensions'].items():checks['primary_'+field]=bool(len(primary)==1 and measurement_matches(primary[0]['dimensions'].get(field),value))
    for role,count in expected.get('role_counts',{}).items():checks['count_'+role]=sum(c['role']==role for c in parts)==count
    for role,dimensions in expected.get('component_dimensions_by_role',{}).items():
        selected=[c for c in parts if c['role']==role]
        checks['dimensions_'+role]=bool(selected and all(all(measurement_matches(c['dimensions'].get(k),v) for k,v in dimensions.items()) for c in selected))
    for label,count in expected.get('symmetry_group_counts',{}).items():checks['groups_'+label]=sum(c['primitive']=='group' and c['symmetry_group']==label for c in parts)==count
    return checks


def edit_checks(case,before,after,selected=None):
    edit=case['edit']
    if case['kind']=='precise':
        wanted=dict(before);wanted[edit['field']]+=edit['delta_mm']
        return {'exact_edit_and_preservation':after==wanted}
    old={c['id']:c for c in before['components']};new={c['id']:c for c in after.get('components',[])}
    checks={'stable_component_ids':old.keys()==new.keys(),'outside_selection_preserved':all(new.get(k)==v for k,v in old.items() if k!=selected)}
    wanted=json.loads(json.dumps(old.get(selected,{})))
    if 'color' in edit:wanted['color']=edit['color']
    elif wanted:wanted['dimensions'][edit['field']]+=edit['delta_mm']
    checks['selected_component_exact_edit']=new.get(selected)==wanted
    checks['scene_metadata_preserved']=all(before.get(k)==after.get(k) for k in ('part_type','schema_version','units','coordinates','name','concept'))
    return checks


class Budget:
    def __init__(self,maximum,interval=0):
        self.maximum=maximum;self.interval=interval;self.calls=[];self.stop_reason=None;self.last_start=None;self.case=None;self.stage=None
    def invoke(self,generate,kwargs):
        if self.stop_reason:raise ValueError('Evaluation stopped; no further provider requests permitted.')
        if len(self.calls)>=self.maximum:
            self.stop_reason='model_request_budget_exhausted';raise ValueError('Evaluation request budget exhausted; no provider request made.')
        if self.last_start is not None:
            delay=self.interval-(time.monotonic()-self.last_start)
            if delay>0:time.sleep(delay)
        self.last_start=time.monotonic()
        item={'case':self.case['id'],'stage':self.stage,'model':kwargs['model']};self.calls.append(item)
        try:
            response=generate(**kwargs)
            usage=getattr(response,'usage_metadata',None)
            if usage:
                for name in ('prompt_token_count','candidates_token_count','total_token_count'):
                    value=getattr(usage,name,None)
                    if value is not None:item[name]=value
            item['status']='response';return response
        except Exception as exc:
            # Never persist provider exception text, headers, request bodies or credentials.
            code=getattr(exc,'code',None);item['status']='provider_error';item['http_status']=code
            if code==429:self.stop_reason='provider_quota_or_rate_limit'
            elif code in (401,403,404):self.stop_reason='provider_access_or_model_unavailable'
            raise
        finally:item['latency_seconds']=round(time.monotonic()-self.last_start,3)


def scripted_response(case,stage):
    from google.genai import types
    if case['kind']=='clarification':
        return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_text(text='What length, width and height would you like?')]))])
    if case['kind']=='precise':
        spec=dict(case['expected']['spec'])
        if stage=='edit':spec[case['edit']['field']]+=case['edit']['delta_mm']
        name,args='validate_spec',{'spec':spec}
    elif stage=='initial':name,args='create_concept',case['offline_recipe']
    else:
        from backend.concepts import concept_scene
        from backend.scene_schema import ConceptRequest
        spec=concept_scene(ConceptRequest(**case['offline_recipe']))
        selected=next(c for c in spec.components if c.role==case['edit']['role'])
        patch={'id':selected.id}
        if 'color' in case['edit']:patch['color']=case['edit']['color']
        else:patch['dimensions']={case['edit']['field']:getattr(selected.dimensions,case['edit']['field'])+case['edit']['delta_mm']}
        name,args='update_components',{'updates':[patch]}
    return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name=name,args=args)]))])


def run_cases(http,cases,budget):
    results=[]
    def wait_job(jid):
        until=time.monotonic()+180
        while time.monotonic()<until:
            response=http.get('/api/jobs/'+jid);response.raise_for_status();job=response.json()
            if job['status'] not in ('queued','generating'):return job
            time.sleep(.1)
        budget.stop_reason='job_timeout';raise RuntimeError('Evaluation job timeout; no further cases submitted.')
    def submit(sid,payload):
        response=http.post('/api/jobs',json={'session_id':sid,**payload});response.raise_for_status();return wait_job(response.json()['id'])
    def build(sid,payload,entry):
        started=time.monotonic();count=len(budget.calls);job=submit(sid,payload)
        entry['request_to_first_terminal_seconds']=round(time.monotonic()-started,3)
        if job.get('proposed_spec') and budget.case['kind']!='clarification':
            pending=http.get('/api/sessions/'+sid).json()
            entry['approval_gate_verified']=pending['job_id']==payload.get('base_version_id')
            entry['proposal_has_no_cad']=http.get('/api/artifacts/'+job['id']+'/step').status_code!=200
            # Explicit harness approval, never implicit approval in the application.
            approval=time.monotonic();job=submit(sid,{'confirm_job_id':job['id']})
            entry['approval_and_build_seconds']=round(time.monotonic()-approval,3)
        entry['elapsed_seconds']=round(time.monotonic()-started,3);entry['model_requests']=len(budget.calls)-count
        entry['job_status']=job['status'];entry['message']=job.get('message','')
        if job['status']=='succeeded':
            checks=job.get('inspection',{}).get('checks',{})
            entry['geometry_checks']=checks;entry['cad_generation_seconds']=job.get('inspection',{}).get('generation_seconds')
            formats=('step','stl','glb','scene') if job['spec']['part_type']=='assembly' else ('step','stl')
            exports={}
            for ext in formats:
                response=http.get('/api/artifacts/'+job['id']+'/'+ext)
                exports[ext]=response.status_code==200 and bool(response.content)
                if ext=='glb':exports[ext]=exports[ext] and response.content[:4]==b'glTF'
            entry['exports']=exports;entry['spec']=job['spec'];entry['bounds_mm']=job['inspection'].get('bounding_box_mm')
        return job
    for case in cases:
        result={'id':case['id'],'kind':case['kind'],'status':'not_run','steps':[]};results.append(result)
        if budget.stop_reason:result['reason']=budget.stop_reason;continue
        budget.case=case
        sid=http.post('/api/sessions').json()['session_id']
        initial={'stage':'initial','prompt':case['prompt']};result['steps'].append(initial);budget.stage='initial'
        try:
            first=build(sid,{'description':case['prompt'],'workflow':case['workflow']},initial)
            if case['kind']=='clarification':
                checks={'clarifies':first['status']=='clarification','no_spec':not first.get('proposed_spec') and not first.get('spec'),'message_nonempty':bool(first.get('message','').strip()),'no_accepted_model':http.get('/api/sessions/'+sid).json()['spec'] is None}
                checks.update({'mentions_'+word:word.lower() in first.get('message','').lower() for word in case['expected'].get('required_words',[])})
                initial['intent_checks']=checks;result['status']='passed' if all(checks.values()) else 'failed';continue
            if first['status']!='succeeded':result['status']='blocked' if budget.stop_reason else 'failed';result['reason']='initial_generation_did_not_succeed';continue
            initial['intent_checks']=initial_checks(case,first['spec'])
            selected=None
            if case['kind']=='concept':
                matches=[c for c in first['spec']['components'] if c['role']==case['edit']['role']]
                if len(matches)!=1:result.update(status='failed',reason='Cannot uniquely identify requested edit component');continue
                selected=matches[0]['id']
            edit={'stage':'edit','prompt':case['edit']['prompt']};result['steps'].append(edit);budget.stage='edit'
            payload={'description':case['edit']['prompt'],'workflow':case['workflow'],'base_version_id':first['id']}
            if selected:payload.update(selected_component_id=selected,selection_only=True)
            second=build(sid,payload,edit)
            if second['status']!='succeeded':
                edit['previous_version_preserved']=http.get('/api/sessions/'+sid).json()['job_id']==first['id']
                result.update(status='blocked' if budget.stop_reason else 'failed',reason='edit_did_not_succeed');continue
            edit['intent_checks']=edit_checks(case,first['spec'],second['spec'],selected)
            budget.stage='restore';before_calls=len(budget.calls);started=time.monotonic()
            restored=submit(sid,{'description':'Restore the previous version'})
            active=http.get('/api/sessions/'+sid).json()
            restore={'stage':'restore','elapsed_seconds':round(time.monotonic()-started,3),'model_requests':len(budget.calls)-before_calls,'job_status':restored['status'],'intent_checks':{'restored_original_id':restored.get('restored_job_id')==first['id'] and active['job_id']==first['id'],'restored_exact_spec':active['spec']==first['spec'],'no_model_call':len(budget.calls)==before_calls,'original_export_available':http.get('/api/artifacts/'+first['id']+'/step').status_code==200}}
            result['steps'].append(restore)
            good=True
            for step in result['steps']:
                for field in ('intent_checks','geometry_checks','exports'):
                    if field in step:good=good and bool(step[field]) and all(step[field].values())
                for field in ('approval_gate_verified','proposal_has_no_cad'):
                    if field in step:good=good and step[field]
            result['status']='passed' if good else 'failed'
        except Exception as exc:
            result.update(status='blocked' if budget.stop_reason else 'failed',reason='evaluation_error',error_type=type(exc).__name__)
            # Unexpected errors remain diagnostic, never copied verbatim into public reports.
    for result in results:
        planned=['initial'] if result['kind']=='clarification' else ['initial','edit','restore']
        result['not_run_stages']=[stage for stage in planned if stage not in {s['stage'] for s in result['steps']}]
    return results


def summary(results):
    counts={name:sum(r['status']==name for r in results) for name in ('passed','failed','blocked','not_run')}
    latencies=[s['elapsed_seconds'] for r in results for s in r['steps'] if 'elapsed_seconds' in s]
    return {**counts,'total_scenarios':len(results),'attempted_scenarios':len(results)-counts['not_run'],'pass_fraction_all_scenarios':round(counts['passed']/len(results),4) if results else None,'step_latency_seconds':{'count':len(latencies),'median':round(statistics.median(latencies),3) if latencies else None,'max':max(latencies) if latencies else None},'step_latency_seconds_by_stage':{stage:{'count':len(values),'median':round(statistics.median(values),3),'max':max(values)} for stage in ('initial','edit','restore') if (values:=[s['elapsed_seconds'] for r in results for s in r['steps'] if s.get('stage')==stage and 'elapsed_seconds' in s])},'note':'Pass fraction includes unavailable/skipped cases in its denominator. A blocked evaluation is not evidence of model failure or model success.'}


def classifier_report():
    import joblib
    from ml.model import metrics,LABELS
    rows=json.loads((ROOT/'ml/dataset.json').read_text())
    model=joblib.load(ROOT/'ml/classifier.joblib')
    groups={split:{r['group'] for r in rows if r['split']==split} for split in ('train','validation','test')}
    return {'dataset_sha256':digest(ROOT/'ml/dataset.json'),'model_sha256':digest(ROOT/'ml/classifier.joblib'),'threshold':json.loads((ROOT/'ml/config.json').read_text())['threshold'],'group_disjoint':not any(groups[a]&groups[b] for a,b in [('train','validation'),('train','test'),('validation','test')]),'splits':{split:metrics(model,[r for r in rows if r['split']==split]) for split in groups},'labels':LABELS,'limitations':'108 project-authored synthetic samples from 36 seed groups; not independently collected human data. Perfect synthetic scores do not measure 3D quality, Gemini performance or real-world accuracy. This run evaluates the saved model without fitting or changing its threshold.'}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--mode',choices=['offline','live'],default='offline')
    parser.add_argument('--split',choices=['development','heldout'],default='development')
    parser.add_argument('--confirm-free-tier',action='store_true')
    parser.add_argument('--max-model-calls',type=int,default=12)
    parser.add_argument('--min-call-interval',type=float,default=20)
    args=parser.parse_args()
    if not math.isfinite(args.min_call_interval) or not 0<=args.min_call_interval<=60:parser.error('Set --min-call-interval between 0 and 60 seconds.')
    if not 1<=args.max_model_calls<=30:parser.error('Set --max-model-calls between 1 and 30.')
    if args.mode=='live' and not args.confirm_free_tier:parser.error('No API calls made. Live evaluation needs --confirm-free-tier for the configured no-billing Gemini project.')
    suite,lock=load_suite()
    if args.split=='heldout' and not implementation_matches(lock):parser.error('Frozen modeling implementation changed. Do not tune against this held-out suite; create a new version or report it as development data.')
    from dotenv import load_dotenv
    load_dotenv(ROOT/'.env')
    if args.mode=='offline':os.environ.update(GEMINI_API_KEY='offline-evaluation-placeholder',GEMINI_FREE_TIER_CONFIRMED='true',GEMINI_MODEL='gemini-3.5-flash-lite')
    from backend import agent
    model=agent.require_free_tier()
    budget=Budget(args.max_model_calls,max(5,args.min_call_interval) if args.mode=='live' else 0)
    original=agent.create_client
    def factory():
        if args.mode=='offline':
            generate=lambda **kwargs:scripted_response(budget.case,budget.stage)
            return SimpleNamespace(models=SimpleNamespace(generate_content=lambda **kwargs:budget.invoke(generate,kwargs)),close=lambda:None)
        client=original();generate=client.models.generate_content
        client.models.generate_content=lambda **kwargs:budget.invoke(generate,kwargs)
        return client
    agent.create_client=factory
    cases=[c for c in suite['cases'] if c['split']==args.split]
    started=time.monotonic();stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    report={'run_id':stamp,'mode':args.mode,'split':args.split,'model':model,'provider':'Gemini Developer API' if args.mode=='live' else 'Scripted SDK responses; no provider calls','fixture_sha256':digest(SUITE),'evaluator_sha256':digest(Path(__file__)),'frozen_implementation_matches':implementation_matches(lock),'implementation_sha256':lock['implementation_sha256'],'environment':{'python':platform.python_version(),'platform':platform.platform(),'packages':{n:importlib.metadata.version(n) for n in ['google-genai','cadquery','numpy','scikit-learn','fastapi']}},'provenance':suite['provenance'],'limitations':['Small project-authored synthetic suite, not independent human evaluation.','One model sample per request, with production bounded repairs; results can vary on repeated live runs.','Semantic predicates cover stated parameters/selection preservation, not arbitrary design intent, appearance, mechanical function or printability.','Concept approvals are explicit test-harness actions; the application requires user approval.','Offline passes establish wiring/scoring/geometry only, not language-model capability.','No prompt or classifier tuning is permitted against this frozen held-out score.']}
    from fastapi.testclient import TestClient
    (ROOT/'data').mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='modeling-evaluation-',dir=ROOT/'data') as folder:
        os.environ['SKETCHLESS_DATA_DIR']=folder;os.environ['DEMO_MODE']='false';os.environ['SKETCHLESS_PUBLIC_MODE']='false'
        from backend import app as server
        try:
            with TestClient(server.app) as http:report['cases']=run_cases(http,cases,budget)
            report['classifier']=classifier_report()
        finally:
            server.pool.shutdown(wait=True);agent.create_client=original
    report.update(summary=summary(report['cases']),model_requests=budget.calls,stop_reason=budget.stop_reason,total_elapsed_seconds=round(time.monotonic()-started,3),min_model_call_interval_seconds=budget.interval)
    output=ROOT/'evaluation/results'/f'{stamp}-{args.mode}-{args.split}.json';output.parent.mkdir(exist_ok=True)
    with output.open('x',encoding='utf-8') as file:json.dump(report,file,indent=2)
    print(json.dumps({'report':str(output.relative_to(ROOT)),**report['summary'],'model_requests':len(budget.calls),'stop_reason':budget.stop_reason},indent=2))
    return 0 if report['summary']['passed']==len(cases) else 1


if __name__=='__main__':raise SystemExit(main())
