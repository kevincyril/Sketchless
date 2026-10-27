"""Real SDK + HTTP API + classifier + CAD, with an offline scripted model transport.
These verify wiring/serialization, NOT live language understanding or provider access.
"""
import json
import httpx
from google import genai
from google.genai import types
from backend import agent
from fastapi.testclient import TestClient
from backend import app as server
from backend.schemas import Spec, BracketSpec
from tests.test_sketchless import wait

def test_offline_gemini_sdk_to_real_cad(monkeypatch):
    monkeypatch.setenv('DEMO_MODE','false')
    monkeypatch.setenv('GEMINI_API_KEY','offline-test-placeholder')
    box=Spec(length_mm=100,width_mm=60,height_mm=35).model_dump()
    bracket=BracketSpec(length_mm=60,width_mm=40,height_mm=50).model_dump()
    tray=Spec(part_type='tray',length_mm=120,width_mm=80,height_mm=15).model_dump()
    payloads=[]
    def transport(request):
        assert request.url.host=='offline-model.invalid'
        assert request.method=='POST' and request.url.path=='/v1beta/models/gemini-3.5-flash-lite:generateContent'
        body=json.loads(request.content)
        payloads.append(body); index=len(payloads)-1
        assert body['toolConfig']['functionCallingConfig']['mode']=='VALIDATED'
        declaration=body['tools'][0]['functionDeclarations'][0]
        assert declaration['name']=='validate_spec'
        assert len(declaration['parameters_json_schema']['properties']['spec']['anyOf'])==2
        assert body['generationConfig']['maxOutputTokens']==1500
        if index==0:
            parts=[{'text':'What length, width, and height should the enclosure have?'}]
        elif index==4:
            return httpx.Response(429,json={'error':{'code':429,'message':'Sensitive fake provider diagnostic offline-test-placeholder','status':'RESOURCE_EXHAUSTED'}})
        else:
            variants={1:box|{'wall_thickness_mm':50},2:box,3:box|{'length_mm':120},5:box|{'length_mm':110},6:bracket,7:tray,8:tray}
            assert index in variants, 'Unexpected extra provider request or retry'
            parts=[{'functionCall':{'name':'run_python' if index==8 else 'validate_spec','args':{'spec':variants[index]}},'thoughtSignature':'b2ZmbGluZS1zaWduYXR1cmU='}]
        return httpx.Response(200,json={'candidates':[{'content':{'role':'model','parts':parts},'finishReason':'STOP'}]})
    real_client=genai.Client(api_key='offline-test-placeholder',vertexai=False,enterprise=False,http_options=types.HttpOptions(base_url='https://offline-model.invalid',api_version='v1beta',retry_options=types.HttpRetryOptions(attempts=1),client_args={'transport':httpx.MockTransport(transport)}))
    monkeypatch.setattr(agent,'create_client',lambda:real_client)
    # This test reuses one transport client; production closes each request's owned client.
    real_close=real_client.close
    monkeypatch.setattr(real_client,'close',lambda:None)
    try:
        with TestClient(server.app) as http:
            sid=http.post('/api/sessions').json()['session_id']
            def prompt(text):
                response=http.post('/api/jobs',json={'session_id':sid,'description':text})
                assert response.status_code==202
                return wait(http,response.json()['id'])
            question=prompt('Make an electronics enclosure for a circuit board.')
            assert question['status']=='clarification',question.get('message')
            assert http.get('/api/sessions/'+sid).json()['spec'] is None
            first=prompt('Use 100 mm length, 60 mm width, and 35 mm height for the electronics enclosure.')
            assert first['status']=='succeeded',first
            assert first['spec']==box
            assert first['inspection']['volume_mm3']==47568
            assert any(e['tool']=='classify_part' for e in first['events'])
            assert sum(e['tool']=='validate_spec' for e in first['events'])==3 # failed proposal, repaired proposal, final server gate
            assert any('functionResponse' in p for i in payloads[2]['contents'] for p in i['parts'])
            assert any(p.get('thoughtSignature')=='b2ZmbGluZS1zaWduYXR1cmU=' for i in payloads[2]['contents'] for p in i['parts'])
            assert any(i.get('role')=='model' and 'What length' in str(i.get('parts')) for i in payloads[1]['contents'])
            second=prompt('Make it 20 mm longer.')
            assert second['status']=='succeeded',second
            assert second['spec']==box|{'length_mm':120}
            assert second['inspection']['bounding_box_mm']==[120,60,35]
            assert not any(e['tool']=='classify_part' for e in second['events'])
            accepted=http.get('/api/sessions/'+sid).json()
            failed=prompt('Make it 20 mm taller.')
            assert failed['status']=='failed'
            assert 'Sensitive' not in failed['message'] and 'offline-test-placeholder' not in failed['message']
            assert 'free quota or rate limit' in failed['message']
            assert http.get('/api/sessions/'+sid).json()==accepted
            assert http.get('/api/artifacts/'+second['id']+'/step').status_code==200
            assert http.post('/api/sessions/'+sid+'/restore',json={'job_id':first['id']}).status_code==200
            restored_edit=prompt('Make it 10 mm longer.')
            assert restored_edit['status']=='succeeded',restored_edit
            assert restored_edit['spec']==box|{'length_mm':110}
            assert not any(i.get('role')=='user' and any(p.get('text')=='Make it 20 mm longer.' for p in i['parts']) for i in payloads[5]['contents'])
            assert '"length_mm": 100.0' in payloads[5]['systemInstruction']['parts'][0]['text']
            made_bracket=prompt('Change to an L-shaped bracket with a 60 mm foot, 40 mm width, 50 mm height, 3 mm plates and two 5 mm holes per face.')
            assert made_bracket['status']=='succeeded',made_bracket
            assert made_bracket['spec']==bracket and all(made_bracket['inspection']['checks'].values())
            made_tray=prompt('Change to a rectangular tray 120 mm long, 80 mm wide and 15 mm high with 3 mm walls and base.')
            assert made_tray['status']=='succeeded',made_tray
            assert made_tray['spec']==tray
            last=http.get('/api/sessions/'+sid).json()
            unsupported=prompt('Make the tray longer.')
            assert unsupported['status']=='failed' and 'Unsupported tool' in unsupported['message']
            assert http.get('/api/sessions/'+sid).json()==last
            assert len(payloads)==9
    finally:
        real_close()

def test_live_verification_requires_free_tier_confirmation():
    import subprocess
    import sys
    from pathlib import Path
    result=subprocess.run([sys.executable,'-m','scripts.verify_live'],cwd=Path(__file__).resolve().parents[1],capture_output=True,text=True,timeout=15)
    assert result.returncode!=0
    assert 'No API calls made' in result.stderr and '--confirm-free-tier' in result.stderr



