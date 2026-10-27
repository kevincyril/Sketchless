"""Latest user corrections must inform the proposal without inventing capabilities."""
import pytest
from backend.requirements import requirements_summary,effective_context
from backend.routing import concept_clarification,route_workflow
from backend.brief import concept_brief
from backend.concepts import concept_scene
from backend.scene_schema import ConceptRequest


def history(*texts):return [{'role':'user','content':text} for text in texts]


def test_agreed_cooking_requirements_across_turns():
 context=history('Build a cooking robot','A fixed robotic arm to stir and heat food')
 facts=requirements_summary('About 400 mm wide',context)
 assert facts=={'purpose':'cooking','form':'Fixed robotic arm','tasks':['stir','heat'],'size':'400 mm'}
 assert concept_clarification('About 400 mm wide',context=context) is None

@pytest.mark.parametrize('correction,expected',[
 ('No chopping, only stirring',['stir']),
 ('Do not heat food; just mix it',['mix']),
 ('No serving, only stir and heat',['stir','heat'])])
def test_task_negation_and_only(correction,expected):
 facts=requirements_summary(correction,history('Cooking robot, countertop, to chop, heat and serve, 400 mm wide'))
 assert sorted(facts['tasks'])==sorted(expected)
 assert facts['purpose']=='cooking' and facts['form']=='Countertop appliance' and facts['size']=='400 mm'


def test_rejected_form_is_not_retained():
 facts=requirements_summary('Not a countertop appliance; a fixed arm instead',history('Cooking robot, countertop, stir and heat, 400 mm'))
 assert facts['form']=='Fixed robotic arm'
 assert facts['tasks']==['stir','heat']
 assert requirements_summary('Not a countertop appliance',history('A countertop cooking robot to stir, 400 mm'))['form'] is None


def test_ask_only_for_missing_cooking_details():
 question=concept_clarification('It should stir food',context=history('Build a cooking robot','A countertop appliance'))
 assert 'size' in question.lower()
 assert 'Do you mean' not in question and 'What should it do' not in question


def test_dimension_correction_keeps_purpose():
 context=history('Cooking robot, fixed arm, to stir, 400 mm')
 assert effective_context('Actually make it 500 mm wide instead',context)==context
 facts=requirements_summary('Actually make it 500 mm wide instead',context)
 assert facts['purpose']=='cooking' and facts['size']=='500 mm'

@pytest.mark.parametrize('new_request,expected',[
 ('Actually make a walking toy robot with four articulated legs and a 200 mm cube body instead','walking'),
 ('Instead make a home robot cleaner with default settings','cleaner'),
 ('Forget that. Make a table 300 mm wide instead','table'),
 ('Instead make an electronics enclosure 100 mm long, not a cooking robot','enclosure')])
def test_explicit_purpose_replacement(new_request,expected):
 context=history('Build a cooking robot','A countertop appliance to chop food, 400 mm')
 assert effective_context(new_request,context)==[]
 assert requirements_summary(new_request,context)['purpose']==expected
 assert route_workflow(new_request,context=context)==('precise' if expected=='enclosure' else 'concept')
 if expected=='walking':assert concept_clarification(new_request,context=context) is None


def test_no_defaults_revokes_assumed_size():
 facts=requirements_summary('Do not use defaults',history('Cooking robot, fixed arm, stir, use sensible defaults'))
 assert facts['size'] is None
 assert 'size' in concept_clarification('Do not use defaults',context=history('Cooking robot, fixed arm, stir, use sensible defaults')).lower()


def test_brief_separates_requested_tasks_from_proposed_geometry():
 scene=concept_scene(ConceptRequest(concept='table',body_x_mm=400,body_y_mm=300,body_z_mm=20))
 brief=concept_brief(scene,'400 mm',history('Cooking robot','A countertop appliance to stir and heat'))
 assert brief['requirements']['purpose']=='cooking'
 assert brief['requirements']['tasks']==['stir','heat']
 assert brief['name']==scene.name and brief['components']

def test_explicit_product_replacement_can_propose_new_recipe():
 from types import SimpleNamespace
 from google.genai import types
 from backend import agent
 current=concept_scene(ConceptRequest(concept='table')).model_dump(mode='json')
 def generate_content(**kwargs):
  assert 'EXPLICIT REPLACEMENT OF PRODUCT PURPOSE: True' in kwargs['config'].system_instruction
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='create_concept',args={'concept':'robot'})]))])
 proposed,_=agent.interpret('Actually make a walking toy robot with four articulated legs and a 200 mm cube body instead',current,None,lambda *a:None,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)),scene=True)
 assert proposed.concept=='robot' and current['concept']=='table'


def test_dimension_edits_cannot_replace_whole_recipe():
 from types import SimpleNamespace
 from google.genai import types
 from backend import agent
 current=concept_scene(ConceptRequest(concept='table')).model_dump(mode='json')
 def generate_content(**kwargs):
  assert 'EXPLICIT REPLACEMENT OF PRODUCT PURPOSE: False' in kwargs['config'].system_instruction
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='create_concept',args={'concept':'table'})]))])
 with pytest.raises(ValueError,match='repair limit'):
  agent.interpret('Actually make the table 500 mm long instead',current,None,lambda *a:None,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)),scene=True)


@pytest.mark.parametrize('message',["Don't use default settings",'No default dimensions','Without defaults','Do not use any default settings'])
def test_default_refusal_is_respected(message):
 from backend.routing import wants_defaults
 assert not wants_defaults(message)
 context=history('Cooking robot, fixed arm, stir, use sensible defaults')
 assert requirements_summary(message,context)['size'] is None
 assert requirements_summary(message,history('Cooking robot, fixed arm, stir, 400 mm'))['size']=='400 mm'


@pytest.mark.parametrize('description',[
 'A wheeled delivery robot to carry parcels indoors, 500 mm wide',
 'A fixed robotic arm to sort packages, use sensible defaults',
])
def test_clear_nonwalking_robots_do_not_repeat_generic_question(description):
 from backend.routing import concept_clarification
 assert concept_clarification(description) is None

def test_robot_answers_across_turns_do_not_repeat_generic_question():
 from backend.routing import concept_clarification
 assert concept_clarification('500 mm wide',context=history('A wheeled delivery robot to carry parcels')) is None
 assert concept_clarification('A robot with default settings') is not None
