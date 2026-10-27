import pytest
from backend.scene_schema import SceneSpec
from backend.scene_review import overall_constraints,review_overall_dimensions

@pytest.mark.parametrize('text',[
 'Make the legs 400 mm tall','Make it 20 mm taller','A 200 mm cube body',
 'About 300-400 mm tall','A seat 450 mm high; backrest 850 mm high',
])
def test_component_sizes_and_ambiguous_phrases_are_not_global_constraints(text):
 assert overall_constraints(text)==[]

@pytest.mark.parametrize('text,expected',[
 ('A lamp. About 40 cm tall.',[(2,400,40)]),
 ('Overall height: 400 mm.',[(2,400,.1)]),
 ('Total width of exactly 12 inches.',[(0,304.8,.1)]),
])
def test_explicit_global_sizes(text,expected):
 result=overall_constraints(text)
 for actual,wanted in zip(result,expected):assert actual==pytest.approx(wanted)
 assert len(result)==len(expected)

def test_mismatch_provides_calculated_feedback():
 scene=SceneSpec(name='Fixture',components=[{'id':'body','name':'Body','primitive':'box','dimensions':{'x_mm':50,'y_mm':50,'z_mm':344}}])
 with pytest.raises(ValueError,match='transformed scene measures 344'):
  review_overall_dimensions(scene,'A lamp. About 400 mm tall.')
 review_overall_dimensions(scene,'A lamp. About 350 mm tall.')


def test_dimension_feedback_uses_bounded_model_repair():
 from types import SimpleNamespace
 from google.genai import types
 from backend import agent
 calls=[]
 def generate_content(**kwargs):
  calls.append(kwargs)
  if len(calls)==2:
   feedback=kwargs['contents'][-1].parts[0].function_response.response['error']
   assert 'transformed scene measures 344' in feedback
  height=344 if len(calls)==1 else 400
  spec={'name':'Desk lamp','components':[{'id':'body','name':'Body','primitive':'box','dimensions':{'x_mm':50,'y_mm':50,'z_mm':height}}]}
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='propose_scene',args={'spec':spec})]))])
 result,_=agent.interpret('A lamp. About 400 mm tall.',None,None,lambda *args:None,scene=True,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)))
 assert len(calls)==2 and result.components[0].dimensions.z_mm==400
