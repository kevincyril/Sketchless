import json
from types import SimpleNamespace
from fastapi.testclient import TestClient
from google.genai import types
from backend import app as server,agent
from backend.scene_schema import SceneSpec
from backend.brief import proposal_changes
from tests.test_sketchless import wait


def lamp():
 return SceneSpec(name='Lamp',components=[
  {'id':'base','name':'Base','primitive':'cylinder','dimensions':{'radius_mm':50,'z_mm':10},'position_mm':[0,0,5]},
  {'id':'shade','name':'Shade','primitive':'cone','dimensions':{'radius_mm':30,'top_radius_mm':10,'z_mm':40},'position_mm':[0,0,100]},
 ])


def response(name,args):
 return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name=name,args=args)]))])


def test_multiple_corrections_patch_pending_scene_then_build_exact_latest(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');calls=[];cad=[];original=server.subprocess.run
 def generate(**kwargs):
  system=kwargs['config'].system_instruction;calls.append(system)
  if len(calls)==1:
   assert 'CURRENT SCENE IS AN UNBUILT PROPOSAL: False' in system
   return response('propose_scene',{'spec':lamp().model_dump(mode='json')})
  current=json.loads(system.split(' CURRENT MODEL: ')[1].split(' SELECTED ID: ')[0])
  assert 'CURRENT SCENE IS AN UNBUILT PROPOSAL: True' in system
  assert {c['id'] for c in current['components']}=={'base','shade'}
  if len(calls)==2:return response('update_components',{'updates':[{'id':'shade','color':'#c43d32'}]})
  assert current['components'][1]['color']=='#c43d32'
  return response('update_components',{'updates':[{'id':'shade','dimensions':{'z_mm':60}}]})
 monkeypatch.setattr(agent,'create_client',lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None))
 def build(*args,**kwargs):cad.append(True);return original(*args,**kwargs)
 monkeypatch.setattr(server.subprocess,'run',build)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def send(**payload):return wait(http,http.post('/api/jobs',json={'session_id':sid,**payload}).json()['id'])
  first=send(description='Create a desk lamp, use default dimensions')
  second=send(description='Make the shade red')
  third=send(description='Make the shade 60 mm high; keep its color')
  assert first['status']==second['status']==third['status']=='clarification'
  assert second['revises_proposal_id']==first['id'] and third['revises_proposal_id']==second['id']
  assert second['brief']['changes']==['Updated Shade: color']
  assert third['brief']['changes']==['Updated Shade: size']
  assert not cad and len(calls)==3
  assert http.get('/api/sessions/'+sid).json()['spec'] is None
  for job in (first,second,third):assert not (server.DATA/job['id']).exists()
  built=send(confirm_job_id=third['id'])
  assert built['status']=='succeeded',built.get('message')
  assert built['spec']==third['proposed_spec'] and len(calls)==3 and cad==[True]
  stale=send(confirm_job_id=first['id'])
  assert stale['status']=='failed' and len(cad)==1


def test_pending_revision_preserves_accepted_spec_until_confirmed(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');seen=[]
 def interpret(description,current,*args,**kwargs):
  seen.append((current,kwargs['provisional']))
  proposed=lamp() if len(seen)==1 else SceneSpec.model_validate(current)
  if len(seen)==2:proposed.components[1].color='#c43d32'
  return proposed,'Mock proposal'
 monkeypatch.setattr(server,'interpret',interpret)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def send(**payload):return wait(http,http.post('/api/jobs',json={'session_id':sid,**payload}).json()['id'])
  accepted=send(spec={'length_mm':100,'width_mm':60,'height_mm':35})
  first=send(description='Create a desk lamp with default dimensions',workflow='concept')
  revised=send(description='Make its shade red')
  assert revised['status']=='clarification' and revised['workflow']=='concept'
  assert seen[0]==(accepted['spec'],False)
  assert seen[1]==(first['proposed_spec'],True)
  assert revised['base_version_id']==accepted['id']
  assert http.get('/api/sessions/'+sid).json()['job_id']==accepted['id']
  assert http.get('/api/artifacts/'+accepted['id']+'/step').status_code==200
  assert http.get('/api/artifacts/'+revised['id']+'/step').status_code!=200


def test_component_change_summary_handles_additions_removals_and_noop():
 original=lamp();changed=lamp();changed.components.pop(0)
 changed.components[0].position_mm=(0,0,150)
 assert proposal_changes(original.model_dump(mode='json'),changed)==['Updated Shade: position','Removed Base']
 assert proposal_changes(changed.model_dump(mode='json'),original)==['Added Base','Updated Shade: position']
 assert proposal_changes(original.model_dump(mode='json'),original)==['No component changes.']


def test_failed_correction_can_retry_without_losing_pending_geometry(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');seen=[]
 def interpret(description,current,*args,**kwargs):
  seen.append((current,kwargs['provisional']))
  if len(seen)==2:raise ValueError('Gemini free quota or rate limit reached. Try later.')
  return lamp() if current is None else SceneSpec.model_validate(current),'Mock proposal'
 monkeypatch.setattr(server,'interpret',interpret)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def send(description):return wait(http,http.post('/api/jobs',json={'session_id':sid,'description':description}).json()['id'])
  first=send('Create a desk lamp with default dimensions')
  failed=send('Make the shade red')
  retried=send('Try making the shade red again')
  assert failed['status']=='failed' and retried['status']=='clarification'
  assert seen[1]==seen[2]==(first['proposed_spec'],True)
  assert retried['revises_proposal_id']==first['id']
  assert http.get('/api/sessions/'+sid).json()['spec'] is None


def test_explicit_active_component_selection_uses_accepted_scene(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');seen=[]
 def interpret(description,current,*args,**kwargs):
  seen.append((current,kwargs['provisional']))
  revised=SceneSpec.model_validate(current);revised.components[1].dimensions.z_mm=80
  return revised,'Mock proposal'
 monkeypatch.setattr(server,'interpret',interpret)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def send(**payload):return wait(http,http.post('/api/jobs',json={'session_id':sid,**payload}).json()['id'])
  built=send(spec=lamp().model_dump(mode='json'))
  pending=send(description='Make the shade taller')
  selected=send(description='Change the active shade',selected_component_id='shade',selection_only=True)
  assert pending['proposed_spec']['components'][1]['dimensions']['z_mm']==80
  assert seen[1]==(built['spec'],False)
  assert selected['status']=='clarification' and not selected.get('revises_proposal_id')
