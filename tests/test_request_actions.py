import uuid
import pytest
from fastapi.testclient import TestClient
from backend import app as server

@pytest.mark.parametrize('extra',[
 {}, {'description':'   '},
 {'spec':{'length_mm':100,'width_mm':60,'height_mm':35},'confirm_job_id':str(uuid.uuid4())},
 {'spec':{'length_mm':100,'width_mm':60,'height_mm':35},'edit_length_delta_mm':20},
 {'confirm_job_id':str(uuid.uuid4()),'edit_length_delta_mm':0},
 {'description':'Edit this','selection_only':True},
 {'description':'Edit this','selection_only':True,'selected_component_id':'  '},
])
def test_invalid_actions_never_create_work(extra,monkeypatch):
 def forbidden(*args,**kwargs):pytest.fail('Invalid requests must not reach interpretation or CAD')
 monkeypatch.setattr(server,'interpret',forbidden)
 monkeypatch.setattr(server.subprocess,'run',forbidden)
 with TestClient(server.app) as http:
  sid=http.post('/api/sessions').json()['session_id']
  result=http.post('/api/jobs',json={'session_id':sid,**extra})
  assert result.status_code==422
  assert http.get('/api/sessions/'+sid+'/jobs').json()==[]
  assert http.get('/api/sessions/'+sid).json()['spec'] is None

def test_zero_delta_is_an_explicit_action():
 request=server.Request(session_id=uuid.uuid4(),edit_length_delta_mm=0)
 assert request.edit_length_delta_mm==0
