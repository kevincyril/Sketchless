"""The evaluator must detect wrong intent, skipped cases and quota without provider calls."""
import json
import pytest
from scripts.evaluate_modeling import Budget,load_suite,implementation_matches,initial_checks,edit_checks,summary,scripted_response
from backend.scene_schema import ConceptRequest
from backend.concepts import concept_scene,edit_scene
from backend.scene_schema import SceneChanges


def test_evaluation_is_frozen_and_groups_are_disjoint():
 suite,lock=load_suite()
 assert implementation_matches(lock)
 assert len([c for c in suite['cases'] if c['split']=='heldout'])==6
 assert len({c['group'] for c in suite['cases']})==len(suite['cases'])


def test_scoring_rejects_wrong_dimensions_without_raising():
 suite,_=load_suite();case=next(c for c in suite['cases'] if c['id']=='heldout-display-table')
 spec=concept_scene(ConceptRequest(**case['offline_recipe'])).model_dump(mode='json')
 assert all(initial_checks(case,spec).values())
 spec['components'][0]['dimensions']['x_mm']=None
 assert initial_checks(case,spec)['primary_x_mm'] is False


@pytest.mark.parametrize('id',['heldout-sensor-case','heldout-organizer','heldout-angle-mount'])
def test_precise_edit_scoring_rejects_collateral_changes(id):
 suite,_=load_suite();case=next(c for c in suite['cases'] if c['id']==id)
 original=case['expected']['spec'];changed=dict(original);changed[case['edit']['field']]+=case['edit']['delta_mm']
 assert all(edit_checks(case,original,changed).values())
 changed['height_mm']+=1
 assert not all(edit_checks(case,original,changed).values())


def test_component_scoring_detects_geometry_loss_during_color_edit():
 suite,_=load_suite();case=next(c for c in suite['cases'] if c['id']=='heldout-survey-character')
 model=concept_scene(ConceptRequest(**case['offline_recipe']));before=model.model_dump(mode='json');selected=next(c for c in model.components if c.role=='body')
 edited=edit_scene(model,SceneChanges(updates=[{'id':selected.id,'color':case['edit']['color']}])).model_dump(mode='json')
 assert all(edit_checks(case,before,edited,selected.id).values())
 edited['components'][1]['position_mm'][0]+=1
 assert edit_checks(case,before,edited,selected.id)['outside_selection_preserved'] is False


def test_budget_exhaustion_never_calls_provider_again():
 count=[];budget=Budget(1);budget.case={'id':'fixture'}
 def generate(**kw):count.append(True);return None
 budget.invoke(generate,{'model':'mock'})
 with pytest.raises(ValueError,match='budget exhausted'):budget.invoke(generate,{'model':'mock'})
 assert count==[True] and len(budget.calls)==1
 assert budget.stop_reason=='model_request_budget_exhausted'


def test_quota_stops_all_subsequent_requests_without_recording_secret():
 class Quota(Exception):code=429
 budget=Budget(3);budget.case={'id':'fixture'};count=[]
 def generate(**kw):count.append(True);raise Quota('fake-private-provider-detail')
 with pytest.raises(Quota):budget.invoke(generate,{'model':'mock'})
 with pytest.raises(ValueError,match='stopped'):budget.invoke(generate,{'model':'mock'})
 assert count==[True] and budget.stop_reason=='provider_quota_or_rate_limit'
 assert 'fake-private' not in json.dumps(budget.calls)


def test_summary_keeps_blocked_and_not_run_in_denominator():
 report=summary([{'status':'passed','steps':[{'elapsed_seconds':1}]},{'status':'failed','steps':[{'elapsed_seconds':3}]},{'status':'blocked','steps':[]},{'status':'not_run','steps':[]}])
 assert report['pass_fraction_all_scenarios']==.25
 assert report['attempted_scenarios']==3
 assert report['step_latency_seconds']['median']==2


def test_live_evaluation_requires_opt_in_before_using_credentials():
 import subprocess,sys
 result=subprocess.run([sys.executable,'-m','scripts.evaluate_modeling','--mode','live'],capture_output=True,text=True,timeout=15)
 assert result.returncode!=0 and 'No API calls made' in result.stderr


def test_clarification_case_never_approves_an_unexpected_proposal():
 from scripts.evaluate_modeling import run_cases
 class Response:
  def __init__(self,payload):self.payload=payload
  def json(self):return self.payload
  def raise_for_status(self):pass
 class HTTP:
  def __init__(self):self.jobs=[]
  def post(self,path,json=None):
   if path=='/api/sessions':return Response({'session_id':'test'})
   self.jobs.append(json);return Response({'id':'unexpected-proposal'})
  def get(self,path):
   if path=='/api/jobs/unexpected-proposal':return Response({'id':'unexpected-proposal','status':'clarification','message':'I propose a model','proposed_spec':{'part_type':'assembly'}})
   if path=='/api/sessions/test':return Response({'job_id':None,'spec':None})
   raise AssertionError('No artifact requests or approval should occur for a clarification-only case')
 case={'id':'test','kind':'clarification','workflow':'concept','prompt':'An ambiguous object','expected':{}}
 client=HTTP();results=run_cases(client,[case],Budget(1))
 assert results[0]['status']=='failed'
 assert len(client.jobs)==1 and 'confirm_job_id' not in client.jobs[0]
