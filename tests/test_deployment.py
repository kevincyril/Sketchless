import pytest
from deploy import start

@pytest.fixture
def config(monkeypatch, tmp_path):
    for key in ('SKETCHLESS_DEPLOYMENT_MODE', 'SKETCHLESS_PUBLIC_MODE', 'SKETCHLESS_PUBLIC_ORIGIN', 'SKETCHLESS_PERSISTENT_STORAGE_CONFIRMED'):
        monkeypatch.delenv(key, raising=False)
    monkeypatch.setenv('SKETCHLESS_DATA_DIR', str(tmp_path/'storage'))
    monkeypatch.setenv('PORT', '8000')
    calls=[]
    monkeypatch.setattr(start.os, 'execv', lambda *args: calls.append(args))
    return calls

def test_public_container_fails_closed(config):
    with pytest.raises(SystemExit, match='SKETCHLESS_PUBLIC_MODE=true'): start.main()
    assert not config

@pytest.mark.parametrize('origin', ['', 'http://example.com', 'https://example.com/path', 'https://user@example.com', 'https://example.com?secret=x'])
def test_public_container_requires_clean_https_origin(config,monkeypatch,origin):
    monkeypatch.setenv('SKETCHLESS_PUBLIC_MODE','true')
    monkeypatch.setenv('SKETCHLESS_PUBLIC_ORIGIN',origin)
    with pytest.raises(SystemExit,match='HTTPS origin'):start.main()
    assert not config

def test_public_container_requires_storage_confirmation(config,monkeypatch):
    monkeypatch.setenv('SKETCHLESS_PUBLIC_MODE','true')
    monkeypatch.setenv('SKETCHLESS_PUBLIC_ORIGIN','https://example.com')
    with pytest.raises(SystemExit,match='persistent local disk'):start.main()
    monkeypatch.setenv('SKETCHLESS_PERSISTENT_STORAGE_CONFIRMED','true')
    start.main()
    assert config[0][1][-3:]==['--workers','1','--no-access-log']

def test_explicit_local_container_mode(config,monkeypatch):
    monkeypatch.setenv('SKETCHLESS_DEPLOYMENT_MODE','local')
    start.main()
    assert len(config)==1
