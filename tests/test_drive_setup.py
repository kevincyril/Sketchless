import json
from pathlib import Path
from threading import Thread
from urllib.parse import parse_qs, urlencode, urlsplit
from urllib.request import urlopen
from urllib.error import HTTPError

import pytest
import requests
from scripts import configure_drive_backup as setup

SENTINEL='private-sentinel-never-print'


@pytest.fixture
def client_file(tmp_path):
    data={'installed':{'client_id':'example.apps.googleusercontent.com','client_secret':SENTINEL,
        'auth_uri':'https://accounts.google.com/o/oauth2/auth','token_uri':'https://oauth2.googleapis.com/token',
        'redirect_uris':['http://localhost']}}
    path=tmp_path/'client.json'
    path.write_text(json.dumps(data),encoding='utf-8')
    return path


def run_failure(client,tmp_path):
    diagnostic=setup.Diagnostics(tmp_path)
    with pytest.raises(Exception) as caught:
        setup.configure(client,tmp_path,diagnostics=diagnostic)
    return diagnostic.failure(caught.value)


def test_preflight_checks_without_google_or_browser(client_file,tmp_path,monkeypatch,capsys):
    def forbidden(*args,**kwargs):pytest.fail('Preflight must not launch consent or contact Google')
    monkeypatch.setattr(setup.webbrowser,'open',forbidden)
    monkeypatch.setattr(requests,'post',forbidden)
    setup.configure('"'+str(client_file)+'"',tmp_path,check_only=True)
    report=json.loads((tmp_path/'drive-preflight-diagnostics.json').read_text())
    assert report['status']=='passed' and report['loopback_bind']=='passed'
    assert not (tmp_path/'drive-oauth.json').exists()
    assert SENTINEL not in capsys.readouterr().out


@pytest.mark.parametrize('shape',[{'web':{}},{'type':'service_account'},{'installed':{}},['invalid']])
def test_bad_client_shape_identifies_structure_stage(tmp_path,shape):
    path=tmp_path/'client.json';path.write_text(json.dumps(shape))
    report=run_failure(path,tmp_path)
    assert report['stage']=='client_structure' and report['error_type']=='SetupError'


def test_json_parse_failure_does_not_echo_contents_or_filename(tmp_path,capsys):
    path=tmp_path/(SENTINEL+'.json');path.write_text(SENTINEL)
    report=run_failure(path,tmp_path)
    assert report['stage']=='client_read' and report['error_type']=='JSONDecodeError'
    assert SENTINEL not in json.dumps(report)+capsys.readouterr().out


def test_missing_client_path_is_redacted(tmp_path):
    report=run_failure(tmp_path/(SENTINEL+'.json'),tmp_path)
    assert report['stage']=='client_read' and report['error_type']=='FileNotFoundError'
    assert SENTINEL not in json.dumps(report)


def test_bom_desktop_json_is_accepted(client_file,tmp_path):
    client_file.write_text(client_file.read_text(),encoding='utf-8-sig')
    setup.configure(client_file,tmp_path,check_only=True)


def test_permission_failure_identifies_output_stage_without_exception_text(client_file,tmp_path,monkeypatch):
    def denied(*args,**kwargs):raise PermissionError('postgresql://'+SENTINEL)
    monkeypatch.setattr(setup.tempfile,'NamedTemporaryFile',denied)
    report=run_failure(client_file,tmp_path)
    assert report['stage']=='output_permissions' and report['error_type']=='PermissionError'
    assert SENTINEL not in json.dumps(report)


def test_missing_dependency_is_reported_before_consent(client_file,tmp_path,monkeypatch):
    def missing(name):raise ModuleNotFoundError(SENTINEL)
    monkeypatch.setattr(setup.importlib,'import_module',missing)
    report=run_failure(client_file,tmp_path)
    assert report['stage']=='dependencies' and report['error_type']=='ModuleNotFoundError'
    assert SENTINEL not in json.dumps(report)


def test_socket_permission_error_identifies_loopback_stage(client_file,tmp_path,monkeypatch):
    def denied(*args,**kwargs):raise PermissionError(13,SENTINEL)
    monkeypatch.setattr(setup,'HTTPServer',denied)
    report=run_failure(client_file,tmp_path)
    assert report['stage']=='loopback_bind' and report['errno']==13
    assert SENTINEL not in json.dumps(report)


def test_partial_saved_authorization_is_preserved(client_file,tmp_path):
    saved=tmp_path/'drive-oauth.json';saved.write_text(SENTINEL)
    report=run_failure(client_file,tmp_path)
    assert report['stage']=='output_permissions'
    assert 'Only one' in report['explanation'] and saved.read_text()==SENTINEL


@pytest.mark.parametrize('raises',[False,True])
def test_browser_failure_is_immediate_and_secret_free(client_file,tmp_path,monkeypatch,raises):
    def unavailable(url):
        if raises:raise OSError(url+' '+SENTINEL)
        return False
    monkeypatch.setattr(setup.webbrowser,'open',unavailable)
    report=run_failure(client_file,tmp_path)
    assert report['stage']=='browser_launch'
    assert 'Windows did not open' in report['explanation']
    assert SENTINEL not in json.dumps(report) and 'client_id=' not in json.dumps(report)


def test_loopback_rejects_wrong_state_and_never_logs_codes(capsys):
    answer={}
    with setup.HTTPServer(('127.0.0.1',0),setup.callback_handler('expected',answer)) as server:
        worker=Thread(target=server.serve_forever,daemon=True);worker.start()
        origin='http://127.0.0.1:'+str(server.server_port)+'/'
        try:
            with pytest.raises(HTTPError):urlopen(origin+'?state=wrong&code='+SENTINEL)
            assert answer=={}
            with urlopen(origin+'?state=expected&code='+SENTINEL) as response:
                assert SENTINEL not in response.read().decode()
            assert answer=={'code':SENTINEL}
        finally:server.shutdown();worker.join(timeout=3)
    output=capsys.readouterr()
    assert SENTINEL not in output.out+output.err


def install_browser_callback(monkeypatch):
    threads=[]
    def browser(url):
        query=parse_qs(urlsplit(url).query)
        assert query['scope']==[setup.SCOPE]
        assert query['code_challenge_method']==['S256']
        callback=query['redirect_uri'][0]+'?'+urlencode({'state':query['state'][0],'code':SENTINEL})
        def visit():
            with urlopen(callback,timeout=5) as response:response.read()
        worker=Thread(target=visit,daemon=True);worker.start();threads.append(worker)
        return True
    monkeypatch.setattr(setup.webbrowser,'open',browser)
    return threads


def test_token_error_identifies_exact_step_without_http_body(client_file,tmp_path,monkeypatch,capsys):
    threads=install_browser_callback(monkeypatch)
    def denied(*args,**kwargs):
        response=requests.Response();response.status_code=400
        response._content=json.dumps({'error':'invalid_client','error_description':SENTINEL}).encode()
        response.url='https://oauth2.googleapis.com/token?code='+SENTINEL
        return response
    monkeypatch.setattr(requests,'post',denied)
    report=run_failure(client_file,tmp_path)
    for worker in threads:worker.join(timeout=3)
    assert report['stage']=='token_exchange' and report['error_type']=='HTTPError'
    assert report['http_status']==400 and report['provider_reason']=='invalid_client'
    assert SENTINEL not in json.dumps(report)+capsys.readouterr().out


def test_unknown_provider_reason_is_not_reflected(tmp_path):
    response=requests.Response();response.status_code=403
    response._content=json.dumps({'error':{'message':SENTINEL,'errors':[{'reason':SENTINEL}]}}).encode()
    error=requests.HTTPError(SENTINEL,response=response)
    diagnostic=setup.Diagnostics(tmp_path);diagnostic.start('folder_create')
    report=diagnostic.failure(error)
    assert report['http_status']==403 and 'provider_reason' not in report
    assert SENTINEL not in json.dumps(report)


def test_success_keeps_secrets_out_of_diagnostics(client_file,tmp_path,monkeypatch,capsys):
    threads=install_browser_callback(monkeypatch)
    def respond(url,**kwargs):
        response=requests.Response();response.status_code=200
        data=({'scope':setup.SCOPE,'refresh_token':SENTINEL,'access_token':SENTINEL}
              if url.endswith('/token') else {'id':'private-folder','shared':False,'ownedByMe':True})
        response._content=json.dumps(data).encode();return response
    monkeypatch.setattr(requests,'post',respond)
    setup.configure(client_file,tmp_path)
    for worker in threads:worker.join(timeout=3)
    report=json.loads((tmp_path/'drive-setup-diagnostics.json').read_text())
    assert report['status']=='passed' and not report['scheduled_backups_enabled']
    assert json.loads((tmp_path/'drive-oauth.json').read_text())['refresh_token']==SENTINEL
    assert SENTINEL not in json.dumps(report)+capsys.readouterr().out


def test_secret_upload_failure_has_safe_stage_and_http_status(tmp_path,monkeypatch,capsys):
    pytest.importorskip('nacl.public')
    from nacl.public import PrivateKey
    import base64
    from scripts import upload_backup_secrets as uploader
    folder=tmp_path/'data/backup-setup';folder.mkdir(parents=True)
    (folder/'backup.env').write_text(SENTINEL)
    private=PrivateKey.generate()
    def response(status,data):
        item=requests.Response();item.status_code=status;item._content=json.dumps(data).encode()
        item.url='https://api.github.com/?private='+SENTINEL
        return item
    class Session:
        def get(self,url,**kwargs):
            return response(200,{'key_id':'test','key':base64.b64encode(bytes(private.public_key)).decode()}
                if url.endswith('/public-key') else {'private':True})
        def put(self,url,**kwargs):
            assert SENTINEL not in kwargs['json']['encrypted_value']
            return response(403,{'message':SENTINEL})
    monkeypatch.setattr(uploader,'github_session',Session)
    monkeypatch.setattr(uploader,'ROOT',tmp_path)
    diagnostic=setup.Diagnostics(folder)
    with pytest.raises(requests.HTTPError) as caught:uploader.upload(True,diagnostic)
    report=diagnostic.failure(caught.value)
    assert report['stage']=='encrypted_secret_upload' and report['http_status']==403
    assert SENTINEL not in json.dumps(report)+capsys.readouterr().out
