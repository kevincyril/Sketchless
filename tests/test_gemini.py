"""Provider boundaries, quota behavior and bounded Gemini repair; no network."""
import json
from types import SimpleNamespace
import httpx
import pytest
from google import genai
from google.genai import types
from backend import agent
from backend.schemas import Spec


def test_client_pins_developer_api_and_disables_retries(monkeypatch):
    captured={}
    def factory(**kwargs):
        captured.update(kwargs)
        return object()
    monkeypatch.setattr(genai,'Client',factory)
    monkeypatch.setenv('GOOGLE_API_KEY','unrelated-google-key')
    monkeypatch.setenv('GOOGLE_GENAI_USE_VERTEXAI','true')
    monkeypatch.setenv('GOOGLE_GENAI_USE_ENTERPRISE','true')
    agent.create_client()
    assert captured['api_key']=='offline-test-placeholder'
    assert captured['vertexai'] is False and captured['enterprise'] is False
    options=captured['http_options']
    assert options.base_url=='https://generativelanguage.googleapis.com'
    assert options.timeout==30000 and options.retry_options.attempts==1


@pytest.mark.parametrize('code,expected',[(429,'free quota'),(401,'access denied'),(403,'access denied'),(404,'unavailable'),(500,'request failed')])
def test_provider_errors_redacted_no_retry(code,expected):
    requests=[]
    def transport(request):
        requests.append(request)
        return httpx.Response(code,json={'error':{'code':code,'message':'SECRET-DIAGNOSTIC','status':'RESOURCE_EXHAUSTED'}})
    with genai.Client(api_key='offline',vertexai=False,enterprise=False,http_options=types.HttpOptions(base_url='https://offline.invalid',retry_options=types.HttpRetryOptions(attempts=1),client_args={'transport':httpx.MockTransport(transport)})) as client:
        with pytest.raises(ValueError) as error:
            agent.interpret('enclosure',None,None,lambda *a:None,client=client)
    assert expected in str(error.value)
    assert 'SECRET' not in str(error.value)
    assert len(requests)==1


def test_repair_limit_and_owned_client_cleanup(monkeypatch):
    calls=[]; closed=[]
    def generate_content(**kwargs):
        calls.append(list(kwargs['contents']))
        spec=Spec(length_mm=100,width_mm=60,height_mm=35).model_dump()|{'wall_thickness_mm':50}
        return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name='validate_spec',args={'spec':spec})]))])
    client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content),close=lambda:closed.append(True))
    monkeypatch.setattr(agent,'create_client',lambda:client)
    with pytest.raises(ValueError,match='repair limit'):
        agent.interpret('enclosure',None,None,lambda *a:None)
    assert len(calls)==3 and closed==[True]
    assert sum(bool(p.function_response) for c in calls[-1] for p in c.parts)==2


@pytest.mark.parametrize('setting,value', [('GEMINI_MODEL','paid-or-unknown-model'),('GEMINI_FREE_TIER_CONFIRMED','false'),('GEMINI_API_KEY','')])
def test_no_network_without_free_tier_configuration(monkeypatch,setting,value):
    monkeypatch.setenv(setting,value)
    def forbidden():
        pytest.fail('Must reject before constructing client')
    monkeypatch.setattr(agent,'create_client',forbidden)
    with pytest.raises(ValueError):
        agent.interpret('enclosure',None,None,lambda *a:None)


def test_legacy_free_model_is_explicitly_configurable(monkeypatch):
    monkeypatch.setenv('GEMINI_MODEL','gemini-2.5-flash-lite')
    def generate_content(**kwargs):
        assert kwargs['model']=='gemini-2.5-flash-lite'
        assert kwargs['config'].tool_config.function_calling_config.mode=='AUTO'
        return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_text(text='What dimensions?')]))])
    spec,message=agent.interpret('enclosure',None,None,lambda *a:None,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content)))
    assert spec is None and message=='What dimensions?'


@pytest.mark.parametrize('parts,finish,expected', [
    ([], 'MAX_TOKENS', 'could not complete'),
    ([types.Part.from_function_call(name='run_python',args={})], 'STOP','Unsupported tool'),
    ([types.Part.from_function_call(name='validate_spec',args={})]*2,'STOP','Only one tool'),
])
def test_rejects_incomplete_or_unauthorized_calls(parts,finish,expected):
    client=SimpleNamespace(models=SimpleNamespace(generate_content=lambda **kw:types.GenerateContentResponse(candidates=[types.Candidate(finish_reason=finish,content=types.Content(role='model',parts=parts))])))
    with pytest.raises(ValueError,match=expected):
        agent.interpret('enclosure',None,None,lambda *a:None,client=client)


def test_private_setup_helper_offline():
    import subprocess
    result=subprocess.run(['powershell','-NoProfile','-Command',r'''. .\Configure-SketchlessAI.ps1
$content = "# preserved`nOPENAI_API_KEY=obsolete-placeholder`nGEMINI_API_KEY=obsolete-placeholder`nGEMINI_MODEL=gemini-3.5-flash-lite`nDEMO_MODE=true"
$updated = Update-SketchlessAIEnvironment -Content $content -Key 'offline-placeholder'
if ($updated -match 'OPENAI_' -or ([regex]::Matches($updated,'GEMINI_API_KEY=')).Count -ne 1 -or $updated -notmatch 'GEMINI_FREE_TIER_CONFIRMED=true' -or $updated -notmatch '# preserved' -or $updated -notmatch 'GEMINI_MODEL=gemini-3.5-flash-lite') { throw 'Invalid settings update' }
$rejected = $false
try { Update-SketchlessAIEnvironment -Content '' -Key "bad`nkey" | Out-Null } catch { $rejected=$true }
if (-not $rejected) { throw 'Multiline key accepted' }
'''],capture_output=True,text=True,timeout=15)
    assert result.returncode==0,result.stderr
