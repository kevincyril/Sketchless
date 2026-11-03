import pytest
from fastapi.testclient import TestClient
from backend.capabilities import capability_question
from backend import app as server
from tests.test_sketchless import wait


def test_explicit_cylindrical_fit_conflict():
    from backend.capabilities import cylindrical_fit_conflict
    text='The container body is 70 mm in outer diameter, with 4 mm walls. A 63 mm-diameter plug.'
    assert 'opening is 62 mm' in cylindrical_fit_conflict(text)
    assert cylindrical_fit_conflict(text.replace('63 mm','61 mm')) is None
    assert cylindrical_fit_conflict('Use a suitable plug and wall thickness') is None


@pytest.mark.parametrize('text,workflow', [
    ('A 100 x 60 x 30 mm tray with 3 mm walls', 'precise'),
    ('An L bracket with two 5 mm holes per face', 'precise'),
    ('A four-legged robot with a 200 mm cube body', 'concept'),
    ('Move the selected cylinder 10 mm upward', 'concept'),
    ('Add two through-holes to the plate', 'concept'),
    ('Add 5 mm fillets to the slotted tray', 'concept'),
    ('A plain bracket without holes or fillets', 'precise'),
])
def test_supported_requests_continue_to_interpretation(text,workflow):
    assert capability_question(text,workflow) is None


@pytest.mark.parametrize('text,workflow,phrase', [
    ('Add 4 mm fillets', 'precise', 'component-based CAD workflow'),
    ('Add chamfers to the plate', 'concept', 'chamfers'),
    ('Bracket holes positioned 15 mm from the corner', 'precise', 'custom bracket hole positions'),
    ('Make a hinged case with bores', 'concept', 'articulation'),
    ('Create a scanner holder', 'concept', 'mounting method'),
])
def test_unsupported_or_underspecified_requests_never_call_model_or_cad(monkeypatch,text,workflow,phrase):
    monkeypatch.setenv('DEMO_MODE','false')
    def forbidden(*args,**kwargs):
        pytest.fail('Preflight must not invoke the provider or CAD')
    monkeypatch.setattr(server,'interpret',forbidden)
    monkeypatch.setattr(server.subprocess,'run',forbidden)
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id']
        job=wait(client,client.post('/api/jobs',json={'session_id':sid,'workflow':workflow,'description':text}).json()['id'])
        assert job['status']=='clarification'
        assert phrase in job['message']
        assert not job.get('proposed_spec')
        assert client.get('/api/sessions/'+sid).json()['spec'] is None


def test_unsupported_edit_preserves_accepted_geometry_and_downloads(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','false')
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id']
        original=wait(client,client.post('/api/jobs',json={'session_id':sid,'spec':{'part_type':'tray','length_mm':100,'width_mm':60,'height_mm':25}}).json()['id'])
        assert original['status']=='succeeded'
        before=client.get('/api/sessions/'+sid).json()
        def forbidden(*args,**kwargs):pytest.fail('Unsupported edit must preserve geometry without model or CAD calls')
        monkeypatch.setattr(server,'interpret',forbidden)
        monkeypatch.setattr(server.subprocess,'run',forbidden)
        edited=wait(client,client.post('/api/jobs',json={'session_id':sid,'description':'Add 6 mm chamfers to the tray'}).json()['id'])
        assert edited['status']=='clarification'
        after=client.get('/api/sessions/'+sid).json()
        assert after['spec']==before['spec'] and after['job_id']==before['job_id']
        # The original STEP export remains accessible after the rejected edit.
        assert client.get('/api/artifacts/'+original['id']+'/step').status_code==200
