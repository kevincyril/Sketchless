"""Opt-in real HTTP/Gemini chair check. Three AI requests, two explicit CAD approvals.
No keys/cookies in reports; never retry provider failures or switch providers.
"""
import argparse
import json
from pathlib import Path
import re
import time
import httpx


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url',required=True)
    parser.add_argument('--expected-revision',required=True)
    parser.add_argument('--report',type=Path,default=Path('data/chair-http-verification.json'))
    args=parser.parse_args()
    if args.report.exists():raise SystemExit('Report already exists; inspect it before making more Gemini calls.')
    root=Path(__file__).resolve().parents[1]
    prompts=json.loads((root/'tests/fixtures/chair_request.json').read_text())
    state={'base_url':args.base_url,'prompts':prompts,'phases':{},'passed':False,'interpretation_requests':0}
    args.report.parent.mkdir(parents=True,exist_ok=True)
    def save():args.report.write_text(json.dumps(state,indent=2),encoding='utf-8')
    save()
    with httpx.Client(base_url=args.base_url,headers={'Origin':args.base_url.rstrip('/')},timeout=90) as client:
        def request(method,path,body=None):
            r=client.request(method,path,json=body) if body is not None else client.request(method,path)
            if r.status_code>=400:raise RuntimeError(f'HTTP {r.status_code}: '+r.json().get('detail','Request failed'))
            return r.json()
        def job(phase,sid,**payload):
            started=time.monotonic()
            result=request('POST','/api/jobs',{'session_id':sid,**payload})
            state['phases'][phase]={'job_id':result['id']};save()
            while time.monotonic()-started<360:
                result=request('GET','/api/jobs/'+result['id'])
                if result['status'] not in ('queued','generating'):
                    state['phases'][phase].update(seconds=round(time.monotonic()-started,3),result=result);save()
                    if result['status']=='failed':raise RuntimeError(result.get('message','Job failed'))
                    return result
                time.sleep(1.5)
            raise RuntimeError('Bounded polling timed out; no resubmission attempted.')
        def check(proposal,thickness,leg):
            assert proposal['status']=='clarification',proposal.get('message')
            brief=proposal['brief'];spec=proposal['proposed_spec']
            assert brief['requirements']['purpose']=='sitting'
            assert brief['overall_dimensions_mm']==[450,450,850]
            assert len(brief['components'])==len([c for c in spec['components'] if c['primitive']!='group'])
            slats=[c for c in spec['components'] if 'slat' in (c['name']+' '+c['role']+' '+c['id']).lower()]
            legs=[c for c in spec['components'] if c['primitive']!='group' and re.search(r'\bleg',re.sub('[_-]',' ',c['role']+' '+c['name']).lower())]
            seat=next(c for c in spec['components'] if c['role']=='seat' or c['name'].lower()=='seat')
            assert len(slats)==3 and all(c['name'] in brief['components'] for c in slats)
            assert len(legs)==4 and all(c['dimensions']['z_mm']==leg for c in legs)
            assert seat['dimensions']['z_mm']==thickness and seat['position_mm'][2]+thickness/2==450
            assert all(c['position_mm'][2]+leg/2==450-thickness and c['position_mm'][2]-leg/2==0 for c in legs)
            return spec
        def check_build(phase,sid,proposal):
            built=job(phase,sid,confirm_job_id=proposal['id'])
            assert built['status']=='succeeded' and built['spec']==proposal['proposed_spec']
            assert all(built['inspection']['checks'].values()) and all(abs(a-b)<.01 for a,b in zip(built['inspection']['bounding_box_mm'],[450,450,850]))
            # scene.json is emitted inside the CAD worker, from the actual builder input.
            artifact=request('GET','/api/artifacts/'+built['id']+'/scene')
            assert artifact['components']==built['spec']['components']
            assert artifact['coordinates']==built['spec']['coordinates'] and artifact['units']=='mm'
            assert {m['id'] for m in artifact['meshes']}=={c['id'] for c in built['spec']['components'] if c['primitive']!='group'}
            state['phases'][phase]['cad_worker_spec_verified']=True;save()
            return built
        try:
            config=request('GET','/api/config');state['config']=config;save()
            assert config.get('build_revision')==args.expected_revision,'Website is running a different revision'
            assert config.get('modeling_contract_version')==2 and config['ai_configured'] and config['mode']=='LIVE_AGENT'
            original_sid=request('POST','/api/sessions',{})['session_id']
            state['interpretation_requests']+=1;save()
            original=job('original_unsized_confirmation',original_sid,workflow='auto',description=prompts['original_description'])
            assert original['brief']['requirements']['purpose']=='sitting'
            original_parts=original['proposed_spec']['components']
            original_seat=next(c for c in original_parts if c['role']=='seat' or c['name'].lower()=='seat')
            original_legs=[c for c in original_parts if c['primitive']!='group' and re.search(r'\bleg',re.sub('[_-]',' ',c['role']+' '+c['name']).lower())]
            assert len(original_legs)==4 and len([c for c in original_parts if 'slat' in (c['name']+' '+c['role']).lower()])==3
            seat_bottom=original_seat['position_mm'][2]-original_seat['dimensions']['z_mm']/2
            assert all(abs(c['position_mm'][2]+c['dimensions']['z_mm']/2-seat_bottom)<.1 for c in original_legs)
            sid=request('POST','/api/sessions',{})['session_id']
            state['interpretation_requests']+=1;save()
            first=job('initial_confirmation',sid,workflow='auto',description=prompts['description']);check(first,30,420)
            built=check_build('initial_build',sid,first)
            state['interpretation_requests']+=1;save()
            revised=job('followup_confirmation',sid,workflow='auto',description=prompts['follow_up'],base_version_id=built['id']);check(revised,40,410)
            assert revised['proposed_spec']!=first['proposed_spec']
            original={c['id']:c for c in first['proposed_spec']['components']};edited={c['id']:c for c in revised['proposed_spec']['components']}
            assert original.keys()==edited.keys()
            for cid,c in original.items():
                if 'seat' not in (c['role']+' '+c['name']).lower() and 'leg' not in (c['role']+' '+c['name']).lower():assert edited[cid]==c
            check_build('followup_build',sid,revised)
            state['passed']=True;save()
            print(json.dumps({'passed':True,'revision':config['build_revision'],'interpretation_requests':state['interpretation_requests'],'phases':{k:{'seconds':v['seconds'],'status':v['result']['status']} for k,v in state['phases'].items()}}))
        except Exception as error:
            state['error']=str(error);save()
            raise SystemExit('Verification stopped: '+str(error)+'. No fallback or automatic resubmission.') from None


if __name__=='__main__':main()
