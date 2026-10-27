"""Concept schema, routing, actual CAD and offline Gemini/API vertical slice."""
import copy,json,struct
from pathlib import Path
from types import SimpleNamespace
import pytest
import httpx
from google import genai
from google.genai import types
from pydantic import ValidationError
from fastapi.testclient import TestClient
from backend import app as server,agent
from backend.scene_schema import SceneSpec,Component,ConceptRequest,SceneChanges
from backend.concepts import concept_scene,edit_scene
from backend.routing import route_workflow
from backend.cad import build
from tests.test_sketchless import wait

@pytest.mark.parametrize('description,current,expected',[
 ('electronics enclosure 100x60x35',None,'precise'),('a shallow tray',None,'precise'),('L bracket',None,'precise'),
 ('cube robot with legs',None,'concept'),('a table',None,'concept'),('display stand',None,'concept'),('a dragon',None,'concept'),
 ('make it taller',{'part_type':'assembly'},'concept'),('make it longer',{'part_type':'enclosure'},'precise'),
 ('change to a robot',{'part_type':'enclosure'},'concept'),('change to an enclosure',{'part_type':'assembly'},'precise')])
def test_explicit_workflow_routing(description,current,expected):
 assert route_workflow(description,current)==expected

def robot():return concept_scene(ConceptRequest(concept='robot'))

@pytest.mark.parametrize('mutation',[
 lambda d:d['components'].append(d['components'][0]),
 lambda d:d['components'][0].update(parent_id='missing'),
 lambda d:d['components'][1].update(parent_id=d['components'][1]['id']),
 lambda d:d['components'][0].update(position_mm=[float('nan'),0,0]),
 lambda d:d['components'][0].update(rotation_deg=[0,float('inf'),0]),
 lambda d:d['components'][0]['dimensions'].update(x_mm=-1),
 lambda d:d.update(components=d['components']*4),
 lambda d:d['components'][0].update(primitive='python'),
 lambda d:d['components'][0].update(color='javascript:bad'),
 lambda d:d['components'][0].update(parent_id='eye_1')])
def test_invalid_scene_rejected(mutation):
 d=robot().model_dump(mode='json');mutation(d)
 with pytest.raises(ValidationError):SceneSpec.model_validate(d)

def test_robot_stable_ids_and_segment_edits():
 s=robot();before={c.id:c.model_dump(mode='json') for c in s.components}
 assert len(s.components)==27
 assert sum(c.primitive!='group' for c in s.components)==23
 assert sum(c.role=='eye' for c in s.components)==2
 after=edit_scene(s,SceneChanges(lengthen_legs_mm=30))
 nodes={c.id:c for c in after.components}
 assert nodes.keys()==before.keys()
 assert nodes['body'].dimensions.model_dump()==s.components[0].dimensions.model_dump()
 assert nodes['front_left_leg.lower'].dimensions.z_mm==before['front_left_leg.lower']['dimensions']['z_mm']+15
 assert nodes['front_left_leg.foot'].dimensions.model_dump()==next(c for c in s.components if c.id=='front_left_leg.foot').dimensions.model_dump()
 changed=edit_scene(s,SceneChanges(updates=[{'id':'eye_1','position_mm':[-48,-108,330]}]))
 for c in changed.components:
  if c.id!='eye_1':assert c.model_dump(mode='json')==before[c.id]
 removed=edit_scene(s,SceneChanges(remove_ids=['rear_left_leg','rear_right_leg']))
 assert not any(c.id.startswith('rear_') for c in removed.components)
 assert len(removed.components)==15
 feet=edit_scene(s,SceneChanges(cylindrical_feet=True))
 assert all(c.primitive=='cylinder' for c in feet.components if c.role=='foot')
 assert {c.id for c in feet.components}==set(before)


def test_duplicate_and_mirror_subtree_no_dangling_ids():
 s=SceneSpec(name='Pair',components=[Component(id='pair',name='Pair',primitive='group',position_mm=(10,0,0)),Component(id='pair.arm',name='Arm',primitive='box',dimensions={'x_mm':10,'y_mm':20,'z_mm':30},parent_id='pair',position_mm=(5,0,0),rotation_deg=(0,20,0))])
 changed=edit_scene(s,SceneChanges(copies=[{'source_id':'pair','new_id':'other','mirror_axis':'x'}]))
 nodes={c.id:c for c in changed.components}
 assert nodes['other'].position_mm==(-10,0,0)
 assert nodes['other.arm'].parent_id=='other'
 assert nodes['other.arm'].position_mm==(-5,0,0)
 assert nodes['other.arm'].rotation_deg==(0,-20,0)
 with pytest.raises(ValueError):edit_scene(s,SceneChanges(copies=[{'source_id':'pair','new_id':'pair'}]))

@pytest.mark.parametrize('concept',['robot','table','stand'])
def test_actual_assembly_geometry_and_exports(tmp_path,concept):
 import cadquery as cq
 params=ConceptRequest(concept=concept,body_z_mm=200 if concept=='robot' else 20)
 s=concept_scene(params);r=build(s,tmp_path)
 assert all(r['checks'].values())
 assert r['solid_count']==sum(c.primitive!='group' for c in s.components)
 imported=cq.importers.importStep(str(tmp_path/'part.step'))
 assert len(imported.solids().vals())==r['solid_count']
 assert all(v.isValid() for v in imported.solids().vals())
 manifest=json.loads((tmp_path/'scene.json').read_text())
 assert {m['id'] for m in manifest['meshes']}=={c.id for c in s.components if c.primitive!='group'}
 raw=(tmp_path/'part.glb').read_bytes();magic,version,length=struct.unpack('<4sII',raw[:12]);assert magic==b'glTF' and version==2 and length==len(raw)
 count,kind=struct.unpack('<I4s',raw[12:20]);doc=json.loads(raw[20:20+count]);assert len(doc['nodes'])==r['solid_count']
 assert all('component_id' in n['extras'] for n in doc['nodes'])


def test_rotated_primitives_expected_bounds(tmp_path):
 s=SceneSpec(name='Primitives',components=[Component(id='root',name='Root',primitive='group',position_mm=(40,20,90),rotation_deg=(15,30,45)),Component(id='cone',name='Cone',primitive='cone',dimensions={'radius_mm':20,'top_radius_mm':0,'z_mm':60},parent_id='root',rotation_deg=(15,10,30)),Component(id='cylinder',name='Cylinder',primitive='cylinder',dimensions={'radius_mm':15,'z_mm':30},position_mm=(100,0,0),rotation_deg=(30,60,20))])
 assert all(build(s,tmp_path)['checks'].values())


def test_mocked_sdk_clarification_scene_edit_restore_and_failure(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false')
 payloads=[]
 def transport(request):
  assert request.url.host=='offline-concept.invalid';body=json.loads(request.content);payloads.append(body);i=len(payloads)-1
  assert body['generationConfig']['maxOutputTokens']==6000
  if i==0:parts=[{'functionCall':{'name':'create_concept','args':{'concept':'robot','body_x_mm':200,'body_y_mm':200,'body_z_mm':200,'leg_count':4,'articulated':True,'eye_count':2,'leg_height_mm':160}}}]
  elif i==1:parts=[{'functionCall':{'name':'update_components','args':{'lengthen_legs_mm':30}}}]
  elif i==2:
   assert '160.0' in body['systemInstruction']['parts'][0]['text']
   parts=[{'functionCall':{'name':'update_components','args':{'cylindrical_feet':True}}}]
  elif i==3:return httpx.Response(429,json={'error':{'code':429,'message':'PRIVATE-DIAGNOSTIC','status':'RESOURCE_EXHAUSTED'}})
  else:pytest.fail('Unexpected retry or request')
  return httpx.Response(200,json={'candidates':[{'content':{'role':'model','parts':parts},'finishReason':'STOP'}]})
 real=genai.Client(api_key='offline',vertexai=False,enterprise=False,http_options=types.HttpOptions(base_url='https://offline-concept.invalid',retry_options=types.HttpRetryOptions(attempts=1),client_args={'transport':httpx.MockTransport(transport)}))
 close=real.close;monkeypatch.setattr(real,'close',lambda:None);monkeypatch.setattr(agent,'create_client',lambda:real)
 try:
  with TestClient(server.app) as http:
   sid=http.post('/api/sessions').json()['session_id']
   def prompt(description,**kwargs):
    r=http.post('/api/jobs',json={'session_id':sid,'description':description,**kwargs});assert r.status_code==202;result=wait(http,r.json()['id'])
    if result.get('proposed_spec'):
     result=wait(http,http.post('/api/jobs',json={'session_id':sid,'description':'Build this concept','confirm_job_id':result['id']}).json()['id'])
    return result
   question=prompt('Build a cube-shaped robot with legs.');assert question['status']=='clarification',question
   first=prompt('Four articulated legs, a 200 mm cube body, and two camera eyes.');assert first['status']=='succeeded',first.get('message')
   assert first['workflow']=='concept' and first['inspection']['solid_count']==23
   assert not any(e['tool']=='classify_part' for e in first['events'])
   assert any(e['tool']=='build_scene' for e in first['events'])
   second=prompt('Make all legs 30 mm longer.');assert second['status']=='succeeded',second.get('message')
   first_nodes={c['id']:c for c in first['spec']['components']};second_nodes={c['id']:c for c in second['spec']['components']}
   assert first_nodes['body']['dimensions']==second_nodes['body']['dimensions']
   assert first_nodes.keys()==second_nodes.keys()
   restored=prompt('Restore the previous version');assert restored['status']=='restored',restored
   assert http.get('/api/sessions/'+sid).json()['job_id']==first['id']
   third=prompt('Add cylindrical feet.');assert third['status']=='succeeded',third.get('message')
   assert next(c for c in third['spec']['components'] if c['id']=='front_left_leg.lower')['dimensions']['z_mm']==80
   accepted=http.get('/api/sessions/'+sid).json()
   failed=prompt('Move the eyes higher.');assert failed['status']=='failed' and 'free quota' in failed['message'] and 'PRIVATE' not in failed['message']
   assert http.get('/api/sessions/'+sid).json()==accepted
   for ext in ['step','stl','glb','scene']:assert http.get('/api/artifacts/'+third['id']+'/'+ext).status_code==200
   document=http.get('/api/designs/'+third['id']+'/file').json();assert document['spec']==third['spec'];assert http.post('/api/designs/validate',json=document).status_code==200
   branched_restore=prompt('Restore the previous version');assert branched_restore['status']=='restored'
   assert http.get('/api/sessions/'+sid).json()['job_id']==first['id'] # C was edited from A, so previous means A rather than abandoned B.
   assert len(payloads)==4
 finally:close()


def test_selected_only_edit_rejects_unrelated_changes(monkeypatch):
 s=robot().model_dump(mode='json');calls=[]
 def generate_content(**kwargs):
  calls.append(kwargs)
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='update_components',args={'updates':[{'id':'eye_2','position_mm':[0,0,0]}]})]))])
 with pytest.raises(ValueError,match='repair limit'):
  agent.interpret('Move this eye higher',s,None,lambda *a:None,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)),scene=True,selected_id='eye_1',selection_only=True)
 assert len(calls)==3

def test_scene_failed_worker_stale_version_and_overlap_preserve_active(monkeypatch):
 import threading
 s=robot()
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  first=wait(http,http.post('/api/jobs',json={'session_id':sid,'spec':s.model_dump()}).json()['id']);assert first['status']=='succeeded'
  original=http.get('/api/sessions/'+sid).json()
  stale=wait(http,http.post('/api/jobs',json={'session_id':sid,'spec':s.model_dump(),'base_version_id':'00000000-0000-0000-0000-000000000000'}).json()['id'])
  assert stale['status']=='failed' and 'active version changed' in stale['message']
  entered=threading.Event();release=threading.Event()
  def fail(*args,**kwargs):
   entered.set();assert release.wait(10);return SimpleNamespace(returncode=1,stderr='Mocked CAD build failure')
  monkeypatch.setattr(server.subprocess,'run',fail)
  queued=http.post('/api/jobs',json={'session_id':sid,'spec':s.model_dump()});assert queued.status_code==202
  assert entered.wait(10)
  assert http.post('/api/jobs',json={'session_id':sid,'spec':s.model_dump()}).status_code==409
  assert http.post('/api/sessions/'+sid+'/restore',json={'job_id':first['id']}).status_code==409
  release.set();failed=wait(http,queued.json()['id'])
  assert failed['status']=='failed'
  assert http.get('/api/sessions/'+sid).json()==original
  assert http.get('/api/artifacts/'+first['id']+'/glb').status_code==200


def test_selected_component_success_preserves_other_nodes(monkeypatch):
 scene=robot().model_dump(mode='json');seen=[]
 def generate_content(**kwargs):
  seen.append(kwargs)
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='update_components',args={'updates':[{'id':'eye_1','position_mm':[-48,-108,330]}]})]))])
 edited,_=agent.interpret('Move this eye higher',scene,None,lambda *a:None,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)),scene=True,selected_id='eye_1',selection_only=True)
 assert len(seen)==1
 before={c['id']:c for c in scene['components']}
 for c in edited.model_dump(mode='json')['components']:
  if c['id']!='eye_1':assert c==before[c['id']]
 assert next(c for c in edited.components if c.id=='eye_1').position_mm==(-48,-108,330)


@pytest.mark.parametrize('prompt,context,needs_question',[
 ('Build a cube-shaped robot with legs.',[],True),
 ('Four articulated legs, a 200 mm cube body, and two camera eyes.',[{'role':'user','content':'Build a robot'}],False),
 ('Use sensible defaults',[{'role':'user','content':'Build a robot'}],True),
 ('Build a table',[],True),
 ('Build a table 300 mm wide with 200 mm legs',[],False)])
def test_high_value_clarification_gate(prompt,context,needs_question):
 from backend.routing import concept_clarification
 assert bool(concept_clarification(prompt,None,context)) is needs_question
