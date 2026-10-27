"""Clarification choices are optional draft text, never hidden submissions or approvals."""
import pytest
from fastapi.testclient import TestClient
from backend import app as server
from backend.requirements import clarification_help
from backend.concepts import concept_scene
from backend.scene_schema import ConceptRequest
from tests.test_sketchless import wait


def history(*texts):return [{'role':'user','content':t} for t in texts]


def test_suggestions_follow_first_missing_field():
 first=clarification_help('Create a cooking robot')
 assert first['missing_fields']==['form','tasks','size']
 assert first['topic']=='Choose a form' and len(first['suggestions'])==4
 second=clarification_help('A fixed robotic arm working at a stove.',context=history('Create a cooking robot'))
 assert second['requirements']['form']=='Fixed robotic arm'
 assert second['missing_fields']==['tasks','size'] and second['topic']=='Choose the main tasks'
 third=clarification_help('It should stir and heat food.',context=history('Create a cooking robot','A fixed robotic arm working at a stove.'))
 assert third['requirements']['tasks']==['stir','heat'] and third['missing_fields']==['size']
 assert third['topic']=='Choose a starting size'


def test_default_dimensions_are_not_reasked():
 result=clarification_help('Create a cooking robot with default settings')
 assert result['requirements']['size']=='Suggested default dimensions'
 assert result['missing_fields']==['form','tasks']


def test_choices_do_not_silently_add_tasks():
 result=clarification_help('A fixed arm, use default dimensions',context=history('Cooking robot'))
 option=next(s for s in result['suggestions'] if s['label']=='Stir only')
 from backend.requirements import requirements_summary
 facts=requirements_summary(option['text'],history('Cooking robot, fixed arm, use default dimensions'))
 assert facts['tasks']==['stir']


def test_guided_answers_require_send_and_reach_review_without_cad(monkeypatch):
 monkeypatch.setenv('DEMO_MODE','false');calls=[]
 def interpret(description,current,classification,emit,**kwargs):
  calls.append(description)
  scene=concept_scene(ConceptRequest(concept='stand',body_x_mm=400,body_y_mm=300,body_z_mm=30))
  scene.name='Mocked kitchen proposal'
  return scene,'Mock interpretation, not a functional kitchen appliance.'
 def forbidden(*a,**kw):pytest.fail('No approval has been given; CAD must not run')
 monkeypatch.setattr(server,'interpret',interpret);monkeypatch.setattr(server.subprocess,'run',forbidden)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  def send(text):return wait(http,http.post('/api/jobs',json={'session_id':sid,'description':text}).json()['id'])
  first=send('Create a cooking robot');assert first['status']=='clarification' and calls==[]
  form=next(s for s in first['clarification']['suggestions'] if s['label']=='Fixed robotic arm')
  assert http.get('/api/sessions/'+sid+'/jobs').json()[-1]['clarification']==first['clarification']
  second=send(form['text']);assert second['clarification']['missing_fields']==['tasks','size'] and calls==[]
  tasks=next(s for s in second['clarification']['suggestions'] if s['label']=='Stir and heat')
  third=send(tasks['text']);assert third['clarification']['missing_fields']==['size'] and calls==[]
  size=next(s for s in third['clarification']['suggestions'] if s['label']=='Suggest dimensions')
  proposed=send(size['text'])
  assert proposed['status']=='clarification' and proposed.get('proposed_spec') and len(calls)==1
  assert proposed['brief']['requirements']['form']=='Fixed robotic arm'
  assert proposed['brief']['requirements']['tasks']==['stir','heat']
  assert http.get('/api/sessions/'+sid).json()['spec'] is None
