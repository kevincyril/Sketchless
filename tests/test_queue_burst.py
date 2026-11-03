"""Offline admission burst: bounded queue, same-session exclusion and failure recovery."""
from concurrent.futures import ThreadPoolExecutor
from threading import Event
from types import SimpleNamespace
import time
from fastapi.testclient import TestClient
from backend import app as server


def test_concurrent_burst_is_bounded_and_failed_workers_release_capacity(monkeypatch):
    release=Event()
    def blocked_failure(*args,**kwargs):
        assert release.wait(10),'The test must release its blocked CAD worker.'
        return SimpleNamespace(returncode=1,stderr='Intentional offline worker failure',stdout='')
    monkeypatch.setattr(server.subprocess,'run',blocked_failure)
    with TestClient(server.app) as http:
        sessions=[http.post('/api/sessions').json()['session_id'] for _ in range(16)]
        def submit(sid):
            return sid,http.post('/api/jobs',json={'session_id':sid,'spec':{'part_type':'tray','length_mm':100,'width_mm':60,'height_mm':25}})
        try:
            with ThreadPoolExecutor(max_workers=12) as clients:
                responses=list(clients.map(submit,sessions))
            accepted=[(sid,result.json()['id']) for sid,result in responses if result.status_code==202]
            assert len(accepted)==4
            assert sum(result.status_code==429 for _,result in responses)==12
            assert submit(accepted[0][0])[1].status_code==409
            assert http.get('/healthz').status_code==200
        finally:release.set()
        deadline=time.monotonic()+10
        while time.monotonic()<deadline:
            if all(http.get('/api/jobs/'+jid).json()['status']=='failed' for _,jid in accepted):break
            time.sleep(.05)
        assert all(http.get('/api/jobs/'+jid).json()['status']=='failed' for _,jid in accepted)
        _,new=submit(sessions[0]);assert new.status_code==202
        jid=new.json()['id'];deadline=time.monotonic()+5
        while time.monotonic()<deadline and http.get('/api/jobs/'+jid).json()['status']!='failed':time.sleep(.05)
        assert http.get('/api/jobs/'+jid).json()['status']=='failed'
