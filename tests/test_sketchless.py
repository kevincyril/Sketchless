import json,time,os
from pathlib import Path
from types import SimpleNamespace as NS
import pytest
from pydantic import ValidationError
from fastapi.testclient import TestClient
from backend.schemas import Spec, BracketSpec, parse_spec
from backend.cad import build
from backend.agent import interpret
from backend import app as server
from ml.model import dataset, classify

BASE=dict(length_mm=100,width_mm=60,height_mm=35)
def test_geometry_exports(tmp_path):
    report=build(Spec(**BASE),tmp_path)
    assert all(report['checks'].values())
    assert report['volume_mm3']==pytest.approx(47568)
    assert report['bounding_box_mm']==pytest.approx([100,60,35])
    assert all((tmp_path/f'part.{ext}').stat().st_size>0 for ext in ('step','stl'))
@pytest.mark.parametrize('extra',[dict(wall_thickness_mm=30),dict(wall_thickness_mm=20,width_mm=30),dict(base_thickness_mm=10,height_mm=5),dict(code='import os')])
def test_invalid(extra):
    with pytest.raises(ValidationError): Spec(**(BASE|extra))
def test_groups():
    rows=dataset(); groups={s:{r['group'] for r in rows if r['split']==s} for s in ('train','validation','test')}
    assert not groups['train']&groups['validation'] and not groups['train']&groups['test'] and not groups['validation']&groups['test']
    assert set(classify('electronics enclosure')['scores'])=={'enclosure','bracket','tray'}

def fake_client(arguments,name='validate_spec'):
    from google.genai import types
    class Models:
        count=0
        def generate_content(self,**kwargs):
            self.count+=1
            return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name=name,args=arguments)]))])
    return NS(models=Models())

def test_repairs_bounded_and_unknown_tool():
    c=fake_client({'spec':BASE|{'width_mm':1}})
    with pytest.raises(ValueError,match='repair limit'): interpret('make box',None,None,lambda *a:None,c)
    assert c.models.count==3
    with pytest.raises(ValueError,match='Unsupported tool'): interpret('x',None,None,lambda *a:None,fake_client({},'shell'))
def test_mock_relative_edit():
    current=Spec(**BASE).model_dump(); proposed=current|{'length_mm':120}
    result,_=interpret('Make it 20 mm longer',current,None,lambda *a:None,fake_client({'spec':proposed}))
    assert result.model_dump()==proposed

def wait(client,jid):
    deadline=time.monotonic()+int(os.getenv('SKETCHLESS_TEST_JOB_TIMEOUT','90'))
    while time.monotonic()<deadline:
        j=client.get('/api/jobs/'+jid).json()
        if j['status'] not in ('queued','generating'): return j
        time.sleep(.1)
    raise AssertionError('Job timeout')
def test_full_api_and_failed_build_preserves(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','true')
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id']
        j=client.post('/api/jobs',json={'session_id':sid,'description':'enclosure','spec':BASE}).json()
        j=wait(client,j['id']); assert j['status']=='succeeded',j
        first=j['id']
        assert client.get('/api/artifacts/'+first+'/step').status_code==200
        assert client.get('/api/artifacts/'+first+'/stl').content.startswith(b'solid') or client.get('/api/artifacts/'+first+'/stl').status_code==200
        edited=wait(client,client.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':20}).json()['id'])
        assert edited['status']=='succeeded',edited
        assert edited['spec']==Spec(**BASE).model_dump()|{'length_mm':120}
        saved=client.get('/api/sessions/'+sid).json()
        def fail(*a,**kw): raise RuntimeError('forced CAD failure')
        monkeypatch.setattr(server.subprocess,'run',fail)
        failed=wait(client,client.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':20}).json()['id'])
        assert failed['status']=='failed'
        assert client.get('/api/sessions/'+sid).json()==saved
        assert client.get('/api/artifacts/'+saved['job_id']+'/step').status_code==200
        assert client.get('/api/artifacts/../../secret/stl').status_code!=200
        assert client.post('/api/jobs',json={'session_id':sid,'spec':BASE|{'shell':'x'}}).status_code==422

def test_tray_geometry(tmp_path):
    report=build(Spec(part_type='tray',length_mm=120,width_mm=80,height_mm=15),tmp_path)
    assert all(report['checks'].values())
    assert report['volume_mm3']==pytest.approx(42768)

def test_clarification_context_and_structured_routing(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','false')
    monkeypatch.setenv('GEMINI_API_KEY','mock-key-not-real')
    calls=[]
    def mock_interpret(description,current,routing,emit,context=None):
        calls.append((description,current,routing,context))
        if 'bracket' in description:
            return BracketSpec(length_mm=60,width_mm=40,height_mm=50),'Mocked bracket interpretation for test'
        if 'dimensions' not in description:
            return None,'What length, width and height do you need?'
        return Spec(**BASE),'Mocked model interpretation for test'
    monkeypatch.setattr(server,'interpret',mock_interpret)
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id']
        first=wait(client,client.post('/api/jobs',json={'session_id':sid,'description':'electronics enclosure'}).json()['id'])
        assert first['status']=='clarification'
        second=wait(client,client.post('/api/jobs',json={'session_id':sid,'description':'dimensions 100 by 60 by 35 mm'}).json()['id'])
        assert second['status']=='succeeded',second
        assert calls[1][3][0]['content']=='electronics enclosure'
        assert calls[1][3][1]['content']=='What length, width and height do you need?'
        assert any(e['tool']=='classify_part' for e in second['events'])
        assert len(client.get('/api/sessions/'+sid+'/jobs').json())==2
        # New bracket requests now route through the trained classifier to the bracket template.
        other=client.post('/api/sessions').json()['session_id']
        bracket=wait(client,client.post('/api/jobs',json={'session_id':other,'description':'L shaped mounting bracket with holes'}).json()['id'])
        assert bracket['status']=='succeeded',bracket
        assert bracket['spec']['part_type']=='bracket'
        assert any(e['tool']=='classify_part' and e['result']['category']=='bracket' for e in bracket['events'])
        assert len(calls)==3

def test_live_missing_key_actionable(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','false');monkeypatch.delenv('GEMINI_API_KEY',raising=False)
    with TestClient(server.app) as client:
        sid=client.post('/api/sessions').json()['session_id']
        result=wait(client,client.post('/api/jobs',json={'session_id':sid,'description':'electronics enclosure 100 by 60 by 35 mm'}).json()['id'])
        assert result['status']=='failed'
        assert 'GEMINI_API_KEY' in result['message']

def test_agent_repair_feedback_then_success():
    from google.genai import types
    responses=[]
    class Models:
        def generate_content(self,**kwargs):
            responses.append(list(kwargs['contents']))
            spec=Spec(**BASE).model_dump()
            if len(responses)==1: spec['width_mm']=1
            return types.GenerateContentResponse(candidates=[types.Candidate(content=types.Content(role='model',parts=[types.Part.from_function_call(name='validate_spec',args={'spec':spec})]),finish_reason='STOP')])
    spec,_=interpret('enclosure',None,None,lambda *a:None,NS(models=Models()),context=[{'role':'user','content':'previous dimensions'}])
    assert spec.width_mm==60
    assert responses[0][0].parts[0].text=='previous dimensions'
    assert any(p.function_response for x in responses[1] for p in x.parts)


def test_provider_failure_redacted():
    import httpx
    class Models:
        def generate_content(self,**kwargs):
            raise httpx.ConnectError('sensitive provider diagnostics')
    with pytest.raises(ValueError) as error:
        interpret('enclosure',None,None,lambda *a:None,NS(models=Models()))
    assert 'sensitive' not in str(error.value)
    assert 'connect to Gemini' in str(error.value)


@pytest.mark.parametrize('holes',[0,1,2])
def test_bracket_geometry_and_roundtrip(tmp_path,holes):
    import math
    import cadquery as cq
    spec=BracketSpec(length_mm=60,width_mm=40,height_mm=50,holes_per_face=holes)
    result=build(spec,tmp_path)
    assert all(result['checks'].values())
    expected=40*3*(60+50-3)-2*holes*math.pi*2.5**2*3
    assert result['volume_mm3']==pytest.approx(expected)
    assert result['bounding_box_mm']==pytest.approx([60,40,50])
    assert result['holes']['total']==2*holes
    # Re-import the actual exchange artifact; it must still be one valid solid.
    step=cq.importers.importStep(str(tmp_path/'part.step'))
    assert step.val().isValid() and len(step.solids().vals())==1
    assert step.val().Volume()==pytest.approx(expected)
    if holes:
        for i in range(holes):
            y=-20+40*(i+1)/(holes+1)
            # Sample the full bore at three depths on both arms.
            for depth in (.1,1.5,2.9):
                assert not step.val().isInside(cq.Vector(31.5,y,depth),1e-6)
                assert not step.val().isInside(cq.Vector(depth,y,26.5),1e-6)

@pytest.mark.parametrize('extra',[
    {'thickness_mm':50}, {'hole_diameter_mm':30}, {'width_mm':10},
    {'length_mm':5}, {'holes_per_face':3}, {'holes_per_face':True}, {'holes_per_face':1.5}, {'wall_thickness_mm':3}, {'shell':'execute'}])
def test_bracket_rejects_invalid(extra):
    with pytest.raises(ValidationError):
        BracketSpec(**({'length_mm':60,'width_mm':40,'height_mm':50}|extra))

def test_bracket_agent_spec_and_family_switch(monkeypatch):
    bracket=BracketSpec(length_mm=60,width_mm=40,height_mm=50)
    client=fake_client({'spec':bracket.model_dump()})
    interpreted,_=interpret('Make an L bracket',None,None,lambda *a:None,client)
    assert isinstance(interpreted,BracketSpec)
    monkeypatch.setenv('DEMO_MODE','true')
    with TestClient(server.app) as http:
        sid=http.post('/api/sessions').json()['session_id']
        first=wait(http,http.post('/api/jobs',json={'session_id':sid,'spec':BASE}).json()['id'])
        assert first['status']=='succeeded'
        made=wait(http,http.post('/api/jobs',json={'session_id':sid,'spec':bracket.model_dump()}).json()['id'])
        assert made['status']=='succeeded',made
        changed=wait(http,http.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':20}).json()['id'])
        assert changed['status']=='succeeded',changed
        assert changed['spec']==bracket.model_dump()|{'length_mm':80}
        assert http.get('/api/artifacts/'+changed['id']+'/step').status_code==200
        saved=http.get('/api/sessions/'+sid).json()
        invalid=wait(http,http.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':-79}).json()['id'])
        assert invalid['status']=='failed'
        assert http.get('/api/sessions/'+sid).json()==saved
        back=wait(http,http.post('/api/jobs',json={'session_id':sid,'spec':BASE}).json()['id'])
        assert back['status']=='succeeded',back
        assert back['spec']['part_type']=='enclosure'

def test_named_design_export_import_and_restore(monkeypatch,tmp_path):
    monkeypatch.setenv('DEMO_MODE','true')
    with TestClient(server.app) as http:
        sid=http.post('/api/sessions').json()['session_id']
        first=wait(http,http.post('/api/jobs',json={'session_id':sid,'spec':BASE}).json()['id'])
        second=wait(http,http.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':20}).json()['id'])
        assert second['status']=='succeeded'
        assert http.post('/api/sessions/'+sid+'/name',json={'name':' Sensor box '}).status_code==200
        assert http.get('/api/sessions/'+sid).json()['name']=='Sensor box'
        assert any(d['session_id']==sid and d['name']=='Sensor box' for d in http.get('/api/designs').json())
        exported=http.get('/api/sessions/'+sid+'/design')
        assert exported.status_code==200 and 'attachment' in exported.headers['content-disposition']
        document=exported.json()
        assert set(document)=={'format','version','name','spec'}
        assert document['spec']['length_mm']==120
        assert http.post('/api/designs/validate',json=document).json()==document
        assert http.post('/api/designs/validate',json=document|{'version':2}).status_code==422
        assert http.post('/api/designs/validate',json=document|{'version':True}).status_code==422
        assert http.post('/api/designs/validate',json=document|{'code':'execute'}).status_code==422
        assert http.post('/api/designs/validate',json=document|{'spec':BASE|{'shell':'x'}}).status_code==422
        assert http.post('/api/designs/validate',content=b'x'*65537,headers={'Content-Type':'application/json'}).status_code==413
        assert http.post('/api/designs/validate',content=b'{broken',headers={'Content-Type':'application/json'}).status_code==422
        restored=http.post('/api/sessions/'+sid+'/restore',json={'job_id':first['id']})
        assert restored.status_code==200
        assert http.get('/api/sessions/'+sid).json()['spec']['length_mm']==100
        assert len(http.get('/api/sessions/'+sid+'/jobs').json())==2 # Restore is not a fake build.
        assert http.get('/api/designs/'+second['id']+'/file').json()['spec']['length_mm']==120
        assert http.get('/api/designs/'+first['id']+'/file').json()['spec']['length_mm']==100
        assert http.get('/api/artifacts/'+second['id']+'/step').status_code==200
        # A session cannot restore another design's artifact, and failures do not change its pointer.
        other=http.post('/api/sessions').json()['session_id']
        assert http.post('/api/sessions/'+other+'/restore',json={'job_id':first['id']}).status_code==404
        with server.lock: server.active.add(sid)
        try:
            assert http.post('/api/sessions/'+sid+'/restore',json={'job_id':second['id']}).status_code==409
        finally:
            with server.lock: server.active.discard(sid)
        assert http.get('/api/sessions/'+sid).json()['job_id']==first['id']
        # Missing files refuse restoration instead of replacing a working accepted model.
        (server.DATA/second['id']/'part.step').rename(tmp_path/'missing.step')
        assert http.post('/api/sessions/'+sid+'/restore',json={'job_id':second['id']}).status_code==409
        assert http.get('/api/sessions/'+sid).json()['job_id']==first['id']
        assert http.post('/api/sessions/'+sid+'/name',json={'name':'  '}).status_code==422
        assert http.post('/api/sessions/'+sid+'/name',json={'name':'x'*65}).status_code==422
        # A relative edit now starts from the restored 100 mm version, not the newer 120 mm build.
        edited=wait(http,http.post('/api/jobs',json={'session_id':sid,'edit_length_delta_mm':10}).json()['id'])
        assert edited['spec']['length_mm']==110

@pytest.mark.parametrize('spec',[
    Spec(**BASE).model_dump(),
    Spec(**BASE,part_type='tray').model_dump(),
    BracketSpec(length_mm=60,width_mm=40,height_mm=50).model_dump()
])
def test_design_file_family_validation(spec):
    with TestClient(server.app) as http:
        document={'format':'sketchless-design','version':1,'name':'My part','spec':spec}
        assert http.post('/api/designs/validate',json=document).json()==document

@pytest.mark.parametrize('demo,key,expected',[
    ('true','',False),('true','placeholder-not-real',False),
    ('false','',False),('false','placeholder-not-real',True)
])
def test_ai_configuration_status(monkeypatch,demo,key,expected):
    monkeypatch.setenv('DEMO_MODE',demo)
    monkeypatch.setenv('GEMINI_API_KEY',key)
    with TestClient(server.app) as http:
        response=http.get('/api/config')
        assert response.json()['ai_configured'] is expected
        if key: assert key not in response.text
