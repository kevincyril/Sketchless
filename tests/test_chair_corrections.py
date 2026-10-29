import json
import uuid
from pathlib import Path
from types import SimpleNamespace
import pytest
from fastapi.testclient import TestClient
from backend import app as server, agent
from backend.scene_schema import SceneSpec
from backend.requirements import requirements_summary
from backend.brief import concept_brief, brief_message
from backend.scene_review import review_scene_requirements
from tests.test_sketchless import wait
from tests.test_proposal_revisions import response

INITIAL = 'A chair for sitting, four legs and three backrest slats. Overall dimensions 450 x 450 x 850 mm. Seat surface height 450 mm; seat thickness 30 mm; legs meet the underside of the seat.'
CORRECTION = 'The purpose is sitting, not walking. Include three backrest slats. Seat surface height is 450 mm and seat thickness is 30 mm; the legs meet the underside of the seat. Keep the overall dimensions unchanged.'


def box(id, name, role, xyz, position):
    return dict(id=id,name=name,role=role,primitive='box',dimensions=dict(zip(('x_mm','y_mm','z_mm'),xyz)),position_mm=position)


def chair(correct=True):
    parts=[box('seat','Seat','seat',(450,450,30),(0,0,435 if correct else 465))]
    for index,(x,y) in enumerate([(-210,-210),(210,-210),(-210,210),(210,210)]):
        parts.append(box('leg'+str(index+1),'Leg '+str(index+1),'leg',(30,30,420 if correct else 450),(x,y,210 if correct else 225)))
    for index,x in enumerate([-210,210]):
        parts.append(box('post'+str(index+1),'Backrest post '+str(index+1),'backrest_post',(30,30,400),(x,210,650)))
    if correct:
        for index,z in enumerate([550,675,800]):
            parts.append(box('slat'+str(index+1),'Backrest slat '+str(index+1),'backrest_slat',(390,20,40),(0,210,z)))
    assumptions=['Purpose is sitting.','Seat surface height 450 mm; seat thickness 30 mm; leg length 420 mm.'] if correct else ['Purpose is walking.','Leg length 450 mm; seat surface height 450 mm; seat thickness 30 mm.']
    return SceneSpec(name='Chair',components=parts,assumptions=assumptions)


def test_named_dimensions_override_without_losing_overall_size():
    original=requirements_summary(INITIAL)
    corrected=requirements_summary(CORRECTION,previous=original)
    dims={(d['component'],d['meaning']):d['value_mm'] for d in corrected['dimensions']}
    assert corrected['purpose']=='sitting'
    assert dims=={('overall','width'):450,('overall','depth'):450,('overall','height'):850,('seat','surface_height'):450,('seat','thickness'):30,('leg','length'):420}
    assert 'seat surface height: 450 mm' in corrected['size'] and 'leg length: 420 mm' in corrected['size']
    assert corrected['component_counts']==[{'component':'leg','count':4,'source':'four legs'},{'component':'backrest_slat','count':3,'source':'three backrest slats'}]
    assert original['dimensions'] is not corrected['dimensions']


def test_confirmation_inventory_is_the_proposed_model_not_a_truncated_summary():
    scene=chair();brief=concept_brief(scene,INITIAL)
    assert brief['solid_components']==10 and len(brief['components'])==10
    assert [d['id'] for d in brief['component_details']]==[c.id for c in scene.components]
    message=brief_message(brief)
    for index in range(1,4):assert 'Backrest slat '+str(index) in message
    assert 'purpose: sitting' in message and 'leg length: 420 mm' in message
    scene.components[-1].name=scene.components[-2].name
    assert len(concept_brief(scene,INITIAL)['components'])==10


@pytest.mark.parametrize('fault', ['missing_slats','wrong_seat_surface','long_legs','stale_assumption'])
def test_geometry_and_assumptions_must_agree_before_confirmation(fault):
    scene=chair();facts=requirements_summary(INITIAL)
    if fault=='missing_slats':scene.components=scene.components[:-3]
    elif fault=='wrong_seat_surface':scene.components[0].position_mm=(0,0,465)
    elif fault=='long_legs':scene.components[1].dimensions.z_mm=450;scene.components[1].position_mm=(-210,-210,225)
    else:scene.assumptions=['Purpose is walking.']
    with pytest.raises(ValueError):review_scene_requirements(scene,facts)


def test_correct_legacy_chair_regenerates_confirmation_and_builds_exact_proposal(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','false');calls=[];cad=[]
    original_run=server.subprocess.run
    corrected=chair()
    def generate(**kwargs):
        calls.append(kwargs)
        system=kwargs['config'].system_instruction
        assert '"purpose": "sitting"' in system and '"value_mm": 420.0' in system
        current=json.loads(system.split(' CURRENT MODEL: ')[1].split(' SELECTED ID: ')[0])
        assert len(current['components'])==7
        if len(calls)==1:
            return response('update_components',{'assumptions':['Purpose is sitting.']})
        assert '3 separate backrest slat' in kwargs['contents'][-1].parts[0].function_response.response['error']
        return response('update_components',{'updates':[{'id':c.id,'dimensions':c.dimensions.model_dump(exclude_none=True),'position_mm':list(c.position_mm)} for c in corrected.components[:5]],'additions':[c.model_dump(mode='json') for c in corrected.components[-3:]],'assumptions':corrected.assumptions})
    monkeypatch.setattr(agent,'create_client',lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None))
    def build(command,**kwargs):
        cad.append(json.loads(Path(command[-1]).read_text(encoding='utf-8')))
        return original_run(command,**kwargs)
    monkeypatch.setattr(server.subprocess,'run',build)
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id'];old_id=str(uuid.uuid4())
        server.save({'id':old_id,'session_id':sid,'status':'clarification','base_version_id':None,'events':[],'description':INITIAL,'request_summary':'Chat: '+INITIAL,'proposed_spec':chair(False).model_dump(mode='json'),'message':'Legacy incorrect walking-chair confirmation.'})
        revised=wait(client,client.post('/api/jobs',json={'session_id':sid,'workflow':'concept','description':CORRECTION}).json()['id'])
        assert revised['status']=='clarification',revised.get('message')
        assert revised['revises_proposal_id']==old_id and len(calls)==2 and cad==[]
        assert revised['proposed_spec']==corrected.model_dump(mode='json')
        assert revised['brief']['requirements']['purpose']=='sitting'
        assert revised['brief']['overall_dimensions_mm']==[450,450,850]
        assert len(revised['brief']['components'])==10
        assert 'walking' not in revised['message'].lower() and 'leg length: 420 mm' in revised['message']
        built=wait(client,client.post('/api/jobs',json={'session_id':sid,'confirm_job_id':revised['id']}).json()['id'])
        assert built['status']=='succeeded',built.get('message')
        assert cad==[revised['proposed_spec']] and built['spec']==revised['proposed_spec'] and len(calls)==2
        assert built['inspection']['bounding_box_mm']==pytest.approx([450,450,850],abs=.01)

        stale=wait(client,client.post('/api/jobs',json={'session_id':sid,'confirm_job_id':old_id}).json()['id'])
        assert stale['status']=='failed' and len(cad)==1


def test_later_seat_correction_recalculates_supports_and_keeps_named_extents():
    facts=requirements_summary(INITIAL)
    corrected=requirements_summary('Seat thickness should be 40 mm, not 30 mm.',previous=facts)
    dims={(d['component'],d['meaning']):d['value_mm'] for d in corrected['dimensions']}
    assert dims[('seat','thickness')]==40 and dims[('leg','length')]==410
    assert dims[('seat','surface_height')]==450 and dims[('overall','height')]==850
    assert {(d['component'],d['meaning']):d['value_mm'] for d in facts['dimensions']}[('seat','thickness')]==30


def test_contradictory_explicit_leg_length_is_not_silently_overwritten():
    facts=requirements_summary('Use 430 mm legs.',previous=requirements_summary(INITIAL))
    assert next(d['value_mm'] for d in facts['dimensions'] if d['component']=='leg')==430
    with pytest.raises(ValueError,match='latest explicit requirement'):
        review_scene_requirements(chair(),facts)


def test_supporting_legs_do_not_imply_walking():
    assert requirements_summary('A table with four legs')['purpose']=='table'
    assert requirements_summary('A chair with four legs')['purpose']=='sitting'


def test_exact_saved_website_prompt_first_proposal_then_followup_reaches_builder(monkeypatch):
    request=json.loads((Path(__file__).parent/'fixtures/chair_request.json').read_text())
    facts=requirements_summary(request['description'])
    dims={(d['component'],d['meaning']):d['value_mm'] for d in facts['dimensions']}
    assert dims=={('overall','width'):450,('overall','depth'):450,('overall','height'):850,('seat','width'):450,('seat','depth'):450,('seat','thickness'):30,('seat','surface_height'):450,('leg','length'):420}
    assert {c['component']:c['count'] for c in facts['component_counts']}=={'leg':4,'backrest_slat':3}
    monkeypatch.setenv('DEMO_MODE','false');calls=[];cad=[];original_run=server.subprocess.run
    def generate(**kwargs):
        calls.append(kwargs)
        if len(calls)==1:return response('propose_scene',{'spec':chair(False).model_dump(mode='json')})
        if len(calls)==2:return response('propose_scene',{'spec':chair().model_dump(mode='json')})
        assert '"value_mm": 410.0' in kwargs['config'].system_instruction
        return response('update_components',{'updates':[{'id':'seat','dimensions':{'z_mm':40},'position_mm':[0,0,430]}]+[{'id':f'leg{i}','dimensions':{'z_mm':410},'position_mm':[chair().components[i].position_mm[0],chair().components[i].position_mm[1],205]} for i in range(1,5)],'assumptions':['Purpose is sitting.','Seat surface height 450 mm; seat thickness 40 mm; leg length 410 mm.']})
    monkeypatch.setattr(agent,'create_client',lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None))
    def build(command,**kwargs):
        cad.append(json.loads(Path(command[-1]).read_text(encoding='utf-8')))
        return original_run(command,**kwargs)
    monkeypatch.setattr(server.subprocess,'run',build)
    with TestClient(server.app) as client:
        config=client.get('/api/config');assert config.headers['cache-control']=='no-store'
        assert config.json()['modeling_contract_version']==2 and len(config.json()['modeling_source_digest'])==16
        sid=client.post('/api/sessions').json()['session_id']
        def send(**payload):return wait(client,client.post('/api/jobs',json={'session_id':sid,**payload}).json()['id'])
        first=send(description=request['description'],workflow='auto')
        assert first['status']=='clarification',first.get('message')
        assert first['brief']['requirements']['purpose']=='sitting' and len(first['brief']['components'])==10
        assert first['modeling_contract_version']==2 and first['brief']['overall_dimensions_mm']==[450,450,850]
        assert cad==[] and len(calls)==2
        built=send(confirm_job_id=first['id'])
        assert built['status']=='succeeded',built.get('message')
        revised=send(description=request['follow_up'],workflow='auto',base_version_id=built['id'])
        assert revised['status']=='clarification',revised.get('message')
        assert revised['brief']['overall_dimensions_mm']==[450,450,850] and len(calls)==3
        updated=send(confirm_job_id=revised['id'],base_version_id=built['id'])
        assert updated['status']=='succeeded',updated.get('message')
        assert cad==[first['proposed_spec'],revised['proposed_spec']]
        assert updated['spec']==revised['proposed_spec'] and updated['spec']!=built['spec']
        assert updated['spec']['components'][0]['dimensions']['z_mm']==40
        assert [c['dimensions']['z_mm'] for c in updated['spec']['components'][1:5]]==[410]*4
        assert updated['inspection']['bounding_box_mm']==pytest.approx([450,450,850],abs=.01)


def test_pre_fix_saved_confirmation_requires_review_again(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','false')
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id'];jid=str(uuid.uuid4())
        server.save({'id':jid,'session_id':sid,'status':'clarification','base_version_id':None,'events':[],'description':INITIAL,'proposed_spec':chair(False).model_dump(mode='json')})
        result=wait(client,client.post('/api/jobs',json={'session_id':sid,'confirm_job_id':jid}).json()['id'])
        assert result['status']=='failed' and 'predates the current design checks' in result['message']
        assert client.get('/api/sessions/'+sid).json()['job_id'] is None


def test_original_unsized_chair_defaults_must_be_self_consistent():
    prompt='Create a simple wooden chair with a flat rectangular seat, four straight legs, and a vertical backrest with three evenly spaced horizontal slats. Make the legs equal in length and ensure all parts are connected properly. Use realistic proportions and keep the model suitable for 3D printing'
    facts=requirements_summary(prompt)
    assert facts['purpose']=='sitting' and {c['component']:c['count'] for c in facts['component_counts']}=={'leg':4,'backrest_slat':3}
    scene=chair();review_scene_requirements(scene,facts)
    scene.components[1].dimensions.z_mm=450;scene.components[1].position_mm=(-210,-210,225)
    with pytest.raises(ValueError,match='seat underside'):review_scene_requirements(scene,facts)


def test_stale_assumption_is_regenerated_from_scene_without_altering_geometry():
    from backend.scene_review import reconcile_scene_assumptions
    scene=chair();facts=requirements_summary(INITIAL)
    for part in scene.components[1:5]:part.role=''
    scene.assumptions=['Wooden visual concept.','Leg length 450 mm; seat surface height 450 mm; seat thickness 30 mm.']
    fixed=reconcile_scene_assumptions(scene,facts)
    assert fixed.components==scene.components and scene.assumptions!=fixed.assumptions
    assert 'Wooden visual concept.' in fixed.assumptions
    assert 'leg length 420 mm' in fixed.assumptions[-1]
    review_scene_requirements(fixed,facts)
    scene.components[1].dimensions.z_mm=450;scene.components[1].position_mm=(-210,-210,225)
    with pytest.raises(ValueError):review_scene_requirements(reconcile_scene_assumptions(scene,facts),facts)


def test_measurement_before_its_component_does_not_belong_to_prior_leg():
    facts=requirements_summary('Leg length 420 mm to accommodate a 30 mm seat thickness.',previous=requirements_summary(INITIAL))
    dims={(d['component'],d['meaning']):d['value_mm'] for d in facts['dimensions']}
    assert dims[('seat','thickness')]==30 and dims[('leg','length')]==420


def test_cylindrical_chair_bounds_measure_brep_after_preview_tessellation(tmp_path):
    from backend.scene_cad import build_scene
    from backend.scene_schema import Dimensions
    scene=chair()
    for part in scene.components[1:7]:
        part.primitive='cylinder'
        part.dimensions=Dimensions(radius_mm=18,z_mm=part.dimensions.z_mm)
        x,y,z=part.position_mm
        part.position_mm=(195 if x>0 else -195,195 if y>0 else -195,z)
    report=build_scene(scene,tmp_path)
    assert report['bounding_box_mm']==pytest.approx([450,450,850],abs=.001)
    assert all(report['checks'].values())
    posts=[c for c in report['components'] if c['id'].startswith('post')]
    assert all(c['bounds_mm'][1][2]==pytest.approx(850) for c in posts)
