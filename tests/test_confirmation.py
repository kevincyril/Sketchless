"""Understanding and explicit approval must precede concept CAD."""
from pathlib import Path
from types import SimpleNamespace
import pytest
from fastapi.testclient import TestClient
from google.genai import types
from backend import app as server,agent
from backend.routing import concept_clarification
from backend.concepts import concept_scene
from backend.scene_schema import ConceptRequest
from tests.test_sketchless import wait

@pytest.mark.parametrize('description',[
 'Create a cooking robot','Make a cooking robot with default settings',
 'Build a kitchen robot','A chef robot, use sensible defaults'])
def test_cooking_robot_gets_purpose_and_form_questions(description):
 answer=concept_clarification(description)
 assert 'countertop' in answer and 'fixed robotic arm' in answer and 'mobile kitchen' in answer
 assert 'stir' in answer
 if 'default' not in description:assert 'size' in answer
 else:assert 'Roughly what size' not in answer
 assert 'How many legs' not in answer


def test_cooking_answers_can_progress_to_a_proposal():
 for answer in ['A countertop appliance to stir and heat food, 400 mm wide','A humanoid chef to chop and serve, use default dimensions','A stationary arm to stir, 500 mm reach','A robot arm to stir and heat food, use sensible defaults']:
  assert concept_clarification(answer,context=[{'role':'user','content':'Build a cooking robot'}]) is None


def test_cooking_request_does_not_call_model_or_cad_while_ambiguous(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false')
 def forbidden(*a,**kw):pytest.fail('Ambiguous cooking request must not invoke model or CAD')
 monkeypatch.setattr(server,'interpret',forbidden);monkeypatch.setattr(server.subprocess,'run',forbidden)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  result=wait(http,http.post('/api/jobs',json={'session_id':sid,'description':'Build a cooking robot with default settings'}).json()['id'])
  assert result['status']=='clarification' and not result.get('proposed_spec')
  assert 'cooking' in result['message'] and 'countertop' in result['message']
  assert http.get('/api/sessions/'+sid).json()['spec'] is None


def test_proposal_is_persisted_no_cad_until_explicit_yes(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');model=[];cad=[];original=server.subprocess.run
 scene=concept_scene(ConceptRequest(concept='robot'))
 def interpret(*a,**kw):model.append(True);return scene,'Mocked interpretation'
 def run(*a,**kw):cad.append(True);return original(*a,**kw)
 monkeypatch.setattr(server,'interpret',interpret);monkeypatch.setattr(server.subprocess,'run',run)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def prompt(**kw):return wait(http,http.post('/api/jobs',json={'session_id':sid,**kw}).json()['id'])
  proposal=prompt(description='A cube robot with four articulated legs, 200 mm cube body, two eyes and default settings')
  assert proposal['status']=='clarification' and proposal['proposed_spec']==scene.model_dump(mode='json')
  assert 'Before I build' in proposal['message'] and proposal['brief']['solid_components']==23
  assert model==[True] and cad==[]
  assert not (server.DATA/proposal['id']).exists()
  assert http.get('/api/sessions/'+sid).json()['spec'] is None
  assert http.get('/api/sessions/'+sid+'/jobs').json()[-1]['proposed_spec']==proposal['proposed_spec']
  other=http.post('/api/sessions').json()['session_id']
  cross=wait(http,http.post('/api/jobs',json={'session_id':other,'confirm_job_id':proposal['id'],'description':'Build this concept'}).json()['id'])
  assert cross['status']=='failed' and cad==[]
  built=prompt(description='Yes, build it')
  assert built['status']=='succeeded',built.get('message')
  assert model==[True] and cad==[True]
  assert http.get('/api/sessions/'+sid).json()['job_id']==built['id']
  stale=prompt(description='Build this concept',confirm_job_id=proposal['id'])
  assert stale['status']=='failed' and len(cad)==1
  assert http.get('/api/sessions/'+sid).json()['job_id']==built['id']


def test_correcting_proposal_never_builds_or_approves_old_requirements(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');scenes=[concept_scene(ConceptRequest(concept='robot')),concept_scene(ConceptRequest(concept='robot',body_x_mm=150))]
 def interpret(*a,**kw):return scenes.pop(0),'Mocked corrected proposal'
 monkeypatch.setattr(server,'interpret',interpret)
 def forbidden(*a,**kw):pytest.fail('No confirmation was given')
 monkeypatch.setattr(server.subprocess,'run',forbidden)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def prompt(**kw):return wait(http,http.post('/api/jobs',json={'session_id':sid,**kw}).json()['id'])
  first=prompt(description='Four articulated legs, a 200 mm cube robot and use default settings')
  second=prompt(description='No, make the body 150 mm wide instead')
  assert second.get('proposed_spec') and second['status']=='clarification'
  assert second['proposed_spec']['components'][0]['dimensions']['x_mm']==150
  stale=prompt(description='Build this concept',confirm_job_id=first['id'])
  assert stale['status']=='failed' and 'superseded' in stale['message']
  assert http.get('/api/sessions/'+sid).json()['spec'] is None


def test_walking_recipe_rejected_for_cooking_intent():
 count=[]
 def generate_content(**kwargs):
  count.append(True)
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='create_concept',args={'concept':'robot'})]))])
 with pytest.raises(ValueError,match='repair limit'):
  agent.interpret('Countertop cooking robot to stir and heat food, use default size',None,None,lambda *a:None,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)),scene=True)
 assert len(count)==3
