"""Cleaner-specific intent, recognizable features and actual CAD; routine tests are offline."""
import copy,json
from pathlib import Path
from types import SimpleNamespace
import pytest
from pydantic import ValidationError
from google.genai import types
from fastapi.testclient import TestClient
from backend import agent,app as server
from backend.routing import concept_clarification,route_workflow,wants_defaults
from backend.scene_schema import CleanerRequest,SceneChanges
from backend.concepts import cleaner_scene,review_cleaner,edit_scene
from backend.cad import build
from tests.test_sketchless import wait

@pytest.mark.parametrize('prompt',[
 'I want a home robot cleaner','Make a floor cleaner','Create a home ccleaner','Build a robot vacuum'])
def test_cleaners_are_not_walking_robots(prompt):
 assert route_workflow(prompt)=='concept'
 question=concept_clarification(prompt)
 assert question and 'leg' not in question.lower()
 assert 'vacuum' in question.lower()

@pytest.mark.parametrize('prompt',[
 'Create a home cleaner with default settings','Make a robot vacuum using sensible defaults',
 'i want 2 wheels instead of legs and use sensiible deafults'])
def test_cleaner_defaults_and_followup_answers(prompt):
 assert wants_defaults(prompt)
 assert concept_clarification(prompt,context=[{'role':'user','content':'I want a home robot cleaner'}]) is None


def test_default_negation_and_different_cleaner_types():
 assert not wants_defaults("Don't use defaults")
 assert concept_clarification('I want an upright vacuum with default settings') is None

@pytest.mark.parametrize('params',[{'body_height_mm':150,'diameter_mm':200},{'diameter_mm':10},{'body_height_mm':float('nan')},{'side_brushes':5},{'shell_color':'url(bad)'}])
def test_invalid_cleaner_design_arguments(params):
 with pytest.raises(ValidationError):CleanerRequest(**params)


def test_cleaner_has_coherent_features_and_stable_edits():
 scene=cleaner_scene(CleanerRequest());nodes={c.id:c for c in scene.components}
 assert scene.concept=='cleaner' and len(scene.components)==22
 assert nodes['body'].primitive=='cylinder'
 assert nodes['bumper'].dimensions.radius_mm==170
 assert nodes['body'].dimensions.z_mm==75
 assert sum(c.role=='wheel' for c in scene.components)==2
 assert all(nodes[id].rotation_deg==(0,90,0) for id in ('wheel_left','wheel_right'))
 assert all(review_cleaner(scene)['checks'].values())
 assert not any(c.role=='knee' for c in scene.components)
 edited=edit_scene(scene,SceneChanges(updates=[{'id':'body','color':'#214867'},{'id':'deck','color':'#214867'},{'id':'lid','color':'#214867'}]))
 assert {c.id for c in edited.components}==set(nodes)
 assert all(c.position_mm==nodes[c.id].position_mm and c.dimensions==nodes[c.id].dimensions for c in edited.components)
 without=scene.model_copy(update={'components':[c for c in scene.components if c.role!='brush']})
 with pytest.raises(ValueError,match='cleaning_brush_present'):review_cleaner(without)


def test_actual_cleaner_cad_and_visual_exports(tmp_path):
 import cadquery as cq
 scene=cleaner_scene(CleanerRequest());report=build(scene,tmp_path)
 assert report['solid_count']==21
 assert all(report['checks'].values()) and all(report['design_review']['checks'].values())
 # The 340 mm analytic body must not include a cached preview-mesh margin.
 assert report['bounding_box_mm'][0]==pytest.approx(340,abs=.01)
 assert report['bounding_box_mm'][2]<120
 assert len(cq.importers.importStep(str(tmp_path/'part.step')).solids().vals())==21
 assert (tmp_path/'part.glb').read_bytes()[:4]==b'glTF'
 assert len(json.loads((tmp_path/'scene.json').read_text())['meshes'])==21


def test_cleaner_tool_repairs_unrelated_walking_robot_proposal():
 seen=[];events=[]
 def generate_content(**kwargs):
  seen.append(kwargs)
  name='create_concept' if len(seen)==1 else 'create_cleaner'
  args={'concept':'robot'} if len(seen)==1 else {'diameter_mm':340,'body_height_mm':75}
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name=name,args=args)]))])
 result,_=agent.interpret('Make a home robot cleaner with default settings',None,None,lambda *a:events.append(a),client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)),scene=True)
 assert result.concept=='cleaner' and len(seen)==2
 assert any(e[0]=='review_concept' for e in events)
 assert any(p.function_response for c in seen[1]['contents'] for p in c.parts)


def test_cleaner_clarification_then_default_build_no_classifier(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');calls=[]
 def mocked(description,current,classification,emit,**kwargs):
  calls.append(description);return cleaner_scene(CleanerRequest()),'Robot vacuum concept; 340 mm diameter and 75 mm body height. Assumptions are shown.'
 monkeypatch.setattr(server,'interpret',mocked)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def prompt(description):return wait(http,http.post('/api/jobs',json={'session_id':sid,'description':description}).json()['id'])
  question=prompt('I want a home robot cleaner')
  assert question['status']=='clarification' and 'legs' not in question['message']
  assert not calls
  proposal=prompt('Use default settings and two wheels')
  assert proposal['status']=='clarification' and proposal.get('proposed_spec')
  assert http.get('/api/sessions/'+sid).json()['spec'] is None
  result=wait(http,http.post('/api/jobs',json={'session_id':sid,'confirm_job_id':proposal['id'],'description':'Build this concept'}).json()['id'])
  assert result['status']=='succeeded',result.get('message')
  assert result['spec']['concept']=='cleaner' and result['inspection']['solid_count']==21
  assert len(calls)==1 and not any(e['tool']=='classify_part' for e in result['events'])
  assert all(result['inspection']['design_review']['checks'].values())
  assert http.get('/api/artifacts/'+result['id']+'/glb').status_code==200
