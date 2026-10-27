import json,sqlite3,time,uuid
from types import SimpleNamespace
import pytest
from fastapi.testclient import TestClient
from google.genai import types,errors
from backend import app as server,agent,public_access
from tests.test_sketchless import wait


@pytest.fixture
def public(monkeypatch,tmp_path):
 monkeypatch.setenv('SKETCHLESS_PUBLIC_MODE','true')
 monkeypatch.delenv('SKETCHLESS_PUBLIC_ORIGIN',raising=False)
 monkeypatch.setenv('DEMO_MODE','false')
 monkeypatch.setattr(server,'DATA',tmp_path);monkeypatch.setattr(server,'DB',tmp_path/'sketchless.sqlite3')
 with server.db() as db:
  db.execute('CREATE TABLE sessions(id TEXT PRIMARY KEY,spec TEXT,job TEXT,name TEXT,owner TEXT)')
  db.execute('CREATE TABLE jobs(id TEXT PRIMARY KEY,payload TEXT)')
 return lambda:TestClient(server.app,base_url='https://testserver')


def test_secure_cookie_and_private_session_routes(public):
 with public() as alice,public() as bob:
  response=alice.post('/api/sessions');sid=response.json()['session_id'];cookie=response.headers['set-cookie']
  assert 'HttpOnly' in cookie and 'Secure' in cookie and 'SameSite=lax' in cookie
  alice.post('/api/sessions/'+sid+'/name',json={'name':'Alice private design'})
  assert len(alice.get('/api/designs').json())==1 and bob.get('/api/designs').json()==[]
  for suffix in ('','/jobs','/design'):
   assert bob.get('/api/sessions/'+sid+suffix).status_code==404
  assert bob.post('/api/sessions/'+sid+'/name',json={'name':'stolen'}).status_code==404
  assert bob.post('/api/sessions/'+sid+'/restore',json={'job_id':str(uuid.uuid4())}).status_code==404
  assert bob.post('/api/jobs',json={'session_id':sid,'spec':{'length_mm':100,'width_mm':60,'height_mm':35}}).status_code==404
  assert alice.get('/api/sessions/'+sid).headers['cache-control']=='no-store'
  assert alice.get('/api/sessions/'+sid).json()['name']=='Alice private design'


def test_job_and_artifact_routes_do_not_leak_across_browsers(public):
 with public() as alice,public() as bob:
  sid=alice.post('/api/sessions').json()['session_id'];jid=str(uuid.uuid4())
  server.save({'id':jid,'session_id':sid,'status':'clarification','message':'Private prompt text'})
  assert alice.get('/api/jobs/'+jid).status_code==200
  for path in ['/api/jobs/'+jid,'/api/artifacts/'+jid+'/step','/api/designs/'+jid+'/file']:
   response=bob.get(path);assert response.status_code==404 and 'Private prompt' not in response.text


def test_legacy_local_sessions_are_not_exposed_in_public_mode(public,monkeypatch):
 sid=str(uuid.uuid4())
 with server.db() as db:db.execute('INSERT INTO sessions VALUES (?,NULL,NULL,?,NULL)',(sid,'Old local work'))
 with public() as visitor:
  assert visitor.get('/api/designs').json()==[]
  assert visitor.get('/api/sessions/'+sid).status_code==404
  monkeypatch.setenv('SKETCHLESS_PUBLIC_MODE','false')
  assert visitor.get('/api/sessions/'+sid).status_code==200


def test_public_cross_origin_mutation_and_oversized_chunked_body_rejected(public):
 with public() as visitor:
  assert visitor.post('/api/sessions',headers={'Origin':'https://attacker.invalid'}).status_code==403
  response=visitor.post('/api/designs/validate',content=iter([b'x'*65536,b'x'*65536,b'x']),headers={'Content-Type':'application/json'})
  assert response.status_code==413
  assert visitor.post('/api/sessions',headers={'Origin':'https://testserver'}).status_code==200


def test_public_limits_reserve_atomically_and_survive_new_connections(public,monkeypatch):
 monkeypatch.setenv('SKETCHLESS_VISITOR_JOB_MINUTE_LIMIT','1')
 with public() as visitor:
  sid=visitor.post('/api/sessions').json()['session_id']
  # Ambiguous intent requires no model/CAD but still consumes a job admission.
  first=wait(visitor,visitor.post('/api/jobs',json={'session_id':sid,'description':'Create a cooking robot'}).json()['id'])
  assert first['status']=='clarification'
  response=visitor.post('/api/jobs',json={'session_id':sid,'description':'Create a cooking robot'})
  assert response.status_code==429 and response.headers['retry-after']=='60'
  assert len(visitor.get('/api/sessions/'+sid+'/jobs').json())==1
 with sqlite3.connect(server.DB) as db:assert db.execute("SELECT count FROM public_usage WHERE kind='jobs_minute' AND scope!='global'").fetchone()[0]==1


def test_every_sdk_attempt_including_repair_is_budgeted(public,monkeypatch):
 calls=[];monkeypatch.setenv('SKETCHLESS_AI_DAILY_LIMIT','1')
 def generate(**kw):
  calls.append(True)
  return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='validate_spec',args={'spec':{'length_mm':100,'width_mm':60,'height_mm':35,'wall_thickness_mm':50}})]))])
 monkeypatch.setattr(agent,'create_client',lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None))
 with public() as visitor:
  sid=visitor.post('/api/sessions').json()['session_id']
  job=wait(visitor,visitor.post('/api/jobs',json={'session_id':sid,'description':'Make an electronics enclosure 100 mm long 60 mm wide 35 mm high'}).json()['id'])
  assert job['status']=='failed' and 'Gemini demo limit' in job['message'] and calls==[True]
  assert visitor.get('/api/sessions/'+sid).json()['spec'] is None


def test_global_budget_cannot_be_bypassed_with_a_new_cookie(public,monkeypatch):
 calls=[];monkeypatch.setenv('SKETCHLESS_AI_DAILY_LIMIT','1')
 def generate(**kw):calls.append(True);return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_text(text='Please provide dimensions.')]))])
 monkeypatch.setattr(agent,'create_client',lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None))
 for _ in range(2):
  with public() as visitor:
   sid=visitor.post('/api/sessions').json()['session_id']
   job=wait(visitor,visitor.post('/api/jobs',json={'session_id':sid,'description':'Make an electronics enclosure'}).json()['id'])
 assert calls==[True] and job['status']=='failed' and 'limit reached' in job['message']


def test_provider_429_pauses_other_visitors_before_sdk(public,monkeypatch):
 calls=[]
 def generate(**kw):calls.append(True);raise errors.ClientError(429,{'error':{'message':'not for output','status':'RESOURCE_EXHAUSTED'}})
 monkeypatch.setattr(agent,'create_client',lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None))
 for _ in range(2):
  with public() as visitor:
   sid=visitor.post('/api/sessions').json()['session_id']
   job=wait(visitor,visitor.post('/api/jobs',json={'session_id':sid,'description':'Make an electronics enclosure'}).json()['id'])
 assert calls==[True] and 'temporarily paused' in job['message']


def test_public_ownership_and_exports_survive_restarting_client(public):
 with public() as visitor:
  sid=visitor.post('/api/sessions').json()['session_id']
  job=wait(visitor,visitor.post('/api/jobs',json={'session_id':sid,'spec':{'length_mm':100,'width_mm':60,'height_mm':35}}).json()['id'])
  assert job['status']=='succeeded',job.get('message')
  cookies=dict(visitor.cookies)
 with public() as reopened:
  reopened.cookies.update(cookies)
  assert reopened.get('/api/sessions/'+sid).json()['job_id']==job['id']
  assert reopened.get('/api/artifacts/'+job['id']+'/step').status_code==200
 with public() as stranger:assert stranger.get('/api/artifacts/'+job['id']+'/step').status_code==404


def test_storage_limit_blocks_new_build_but_not_restoration(public,monkeypatch):
 with public() as visitor:
  sid=visitor.post('/api/sessions').json()['session_id']
  def submit(payload):return wait(visitor,visitor.post('/api/jobs',json={'session_id':sid,**payload}).json()['id'])
  first=submit({'spec':{'length_mm':100,'width_mm':60,'height_mm':35}})
  second=submit({'edit_length_delta_mm':20})
  assert first['status']==second['status']=='succeeded'
  monkeypatch.setenv('SKETCHLESS_MAX_DATA_MB','1');(server.DATA/'occupied.bin').write_bytes(b'x'*(2*1024**2))
  assert visitor.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':10}).status_code==429
  restored=submit({'description':'Restore the previous version'})
  assert restored['status']=='restored'
  assert visitor.get('/api/sessions/'+sid).json()['job_id']==first['id']
  assert visitor.get('/api/artifacts/'+first['id']+'/step').status_code==200


def test_atomic_budget_does_not_spend_other_scopes_on_rejection(public):
 day=int(time.time()//86400)
 public_access.consume(server.DB,[('test_day','a',day,1,'used'),('test_day','b',day,2,'used')])
 with pytest.raises(ValueError):public_access.consume(server.DB,[('test_day','b',day,2,'used'),('test_day','a',day,1,'used')])
 with sqlite3.connect(server.DB) as db:assert db.execute("SELECT count FROM public_usage WHERE kind='test_day' AND scope='b'").fetchone()[0]==1
