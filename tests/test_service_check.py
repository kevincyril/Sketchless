import io
import json
import pytest
from scripts import check_service


def test_readiness_checks_only_read_public_endpoints(monkeypatch):
    paths=[]
    class Response(io.BytesIO):
        status=200
    def fetch(url,timeout):
        paths.append(url)
        if url.endswith('/healthz'):
            return Response(json.dumps({'service':'Sketchless','status':'ok'}).encode())
        if url.endswith('/api/config'):
            return Response(json.dumps({'name':'Sketchless','build_revision':'test','public_mode':True,'unexpected_secret':'never include response bodies'}).encode())
        return Response(b'<!doctype html><html></html>')
    monkeypatch.setattr(check_service,'urlopen',fetch)
    result=check_service.check('https://example.org')
    assert result['passed'] and len(paths)==3
    assert 'unexpected_secret' not in json.dumps(result)
    assert all('/api/jobs' not in url and '/api/sessions' not in url for url in paths)


@pytest.mark.parametrize('origin',['https://user:password@example.org','file:///private','https://example.org?key=private','https://example.org/path'])
def test_readiness_rejects_credentials_and_non_origins(origin):
    with pytest.raises(ValueError):check_service.check(origin)


def test_wrong_application_is_not_healthy(monkeypatch):
    class Response(io.BytesIO):
        status=200
    monkeypatch.setattr(check_service,'urlopen',lambda *args,**kwargs:Response(b'{}'))
    with pytest.raises(ValueError,match='health response'):check_service.check('https://example.org')
