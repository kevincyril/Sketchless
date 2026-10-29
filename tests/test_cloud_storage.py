import hashlib
import io
import os
from pathlib import Path
import sqlite3
import uuid
import pytest
from backend import artifacts, persistence


class Objects:
    def __init__(self):
        self.objects = {}
        self.fail_upload = False
        self.fail_download = False
        self.writes = 0

    def put_object(self, *, Bucket, Key, Body):
        self.writes += 1
        if self.fail_upload and self.writes == 2:
            raise RuntimeError('private-provider-error-with-secret')
        self.objects[Key] = bytes(Body)

    def get_object(self, *, Bucket, Key):
        if self.fail_download:
            raise RuntimeError('private-provider-error-with-secret')
        return {'Body': io.BytesIO(self.objects[Key])}

    def delete_object(self, *, Bucket, Key):
        self.objects.pop(Key, None)


@pytest.fixture
def cloud(tmp_path, monkeypatch):
    db = tmp_path / 'state.sqlite3'
    with sqlite3.connect(db) as connection:
        persistence.initialize_schema(connection)
    monkeypatch.setattr(persistence, 'connect', lambda path, timeout=10: sqlite3.connect(path, timeout=timeout))
    monkeypatch.setattr(persistence, 'remote', lambda: True)
    monkeypatch.setenv('SKETCHLESS_STORAGE_BUCKET', 'private-test-bucket')
    objects = Objects()
    monkeypatch.setattr(artifacts, 'client', lambda: objects)
    jid = str(uuid.uuid4())
    folder = tmp_path / jid
    folder.mkdir()
    for name in ('spec.json', 'inspection.json', 'part.step', 'part.stl'):
        (folder / name).write_bytes(('saved-' + name).encode())
    return db, jid, folder, objects


def test_cloud_exports_recover_after_local_files_are_lost(cloud, tmp_path):
    db, jid, folder, objects = cloud
    artifacts.publish(db, jid, folder)
    recovered = tmp_path / 'fresh-cache'
    artifacts.materialize(db, jid, recovered, ['part.step', 'part.stl'])
    assert (recovered / 'part.step').read_bytes() == (folder / 'part.step').read_bytes()
    assert artifacts.stored_bytes(db) == sum(len(v) for v in objects.objects.values())
    objects.fail_download = True
    artifacts.materialize(db, jid, recovered, ['part.step'])  # Verified cache needs no network.


def test_partial_upload_is_not_published_or_counted(cloud):
    db, jid, folder, objects = cloud
    objects.fail_upload = True
    with pytest.raises(ValueError, match='previous design is unchanged'):
        artifacts.publish(db, jid, folder)
    assert objects.objects == {} and artifacts.stored_bytes(db) == 0


def test_republishing_cannot_overwrite_accepted_artifacts(cloud):
    db, jid, folder, objects = cloud
    artifacts.publish(db, jid, folder)
    before = dict(objects.objects)
    (folder / 'part.step').write_bytes(b'replacement')
    with pytest.raises(ValueError, match='immutable'):
        artifacts.publish(db, jid, folder)
    assert objects.objects == before


def test_storage_limit_rejects_before_any_object_upload(cloud, monkeypatch):
    db, jid, folder, objects = cloud
    monkeypatch.setenv('SKETCHLESS_MAX_DATA_MB', '1')
    (folder / 'part.stl').write_bytes(b'x' * (2 * 1024**2))
    with pytest.raises(ValueError, match='allowance is full'):
        artifacts.publish(db, jid, folder)
    assert objects.writes == 0 and artifacts.stored_bytes(db) == 0


def test_corrupt_remote_file_never_replaces_a_cached_export(cloud, tmp_path):
    db, jid, folder, objects = cloud
    artifacts.publish(db, jid, folder)
    objects.objects[artifacts.key(jid, 'part.step')] = b'corrupt'
    recovered = tmp_path / 'recovered'
    with pytest.raises(ValueError, match='integrity'):
        artifacts.materialize(db, jid, recovered, ['part.step'])
    assert not (recovered / 'part.step').exists()
    assert not list(recovered.glob('tmp*'))


def test_provider_errors_do_not_expose_secrets(cloud, tmp_path):
    db, jid, folder, objects = cloud
    artifacts.publish(db, jid, folder)
    objects.fail_download = True
    with pytest.raises(ValueError) as error:
        artifacts.materialize(db, jid, tmp_path / 'recovered', ['part.step'])
    assert 'private-provider' not in str(error.value)


@pytest.mark.parametrize('name', ['../outside', '/absolute', 'part.env', 'unknown.json'])
def test_remote_keys_reject_unexpected_files(name):
    with pytest.raises(ValueError):
        artifacts.key(str(uuid.uuid4()), name)


def test_neon_config_requires_attested_free_plan_and_verified_tls(monkeypatch):
    monkeypatch.setenv('SKETCHLESS_STORAGE_MODE', 'neon')
    monkeypatch.delenv('SKETCHLESS_FREE_HOSTING_CONFIRMED', raising=False)
    with pytest.raises(ValueError, match='Free plans'):
        persistence.validate_config()
    monkeypatch.setenv('SKETCHLESS_FREE_HOSTING_CONFIRMED', 'true')
    monkeypatch.setenv('SKETCHLESS_DATABASE_URL', 'postgresql://user:password@ep-test.neon.tech/db?sslmode=require')
    with pytest.raises(ValueError, match='verify-full'):
        persistence.validate_config()
    monkeypatch.setenv('SKETCHLESS_DATABASE_URL', 'postgresql://user:password@ep-test.neon.tech/db?sslmode=verify-full')
    monkeypatch.setenv('SKETCHLESS_STORAGE_ENDPOINT', 'https://br-test.storage.neon.tech')
    for name in ('ACCESS_KEY', 'SECRET_KEY', 'REGION', 'BUCKET'):
        monkeypatch.setenv('SKETCHLESS_STORAGE_' + name, 'offline-test')
    persistence.validate_config()
    monkeypatch.setenv('SKETCHLESS_STORAGE_ENDPOINT', 'https://example.com')
    with pytest.raises(ValueError, match='Neon object-storage'):
        persistence.validate_config()


def test_failed_job_admission_releases_session_and_queue_slots(monkeypatch):
    from fastapi.testclient import TestClient
    from backend import app as server
    from tests.test_sketchless import wait
    monkeypatch.setenv('DEMO_MODE', 'true')
    original = server.save
    def unavailable(job):
        raise sqlite3.OperationalError('test storage outage')
    with TestClient(server.app) as browser:
        sid = browser.post('/api/sessions').json()['session_id']
        monkeypatch.setattr(server, 'save', unavailable)
        for _ in range(6):
            with pytest.raises(sqlite3.OperationalError, match='test storage outage'):
                browser.post('/api/jobs', json={'session_id': sid, 'spec': {'length_mm': 100, 'width_mm': 60, 'height_mm': 35}})
        monkeypatch.setattr(server, 'save', original)
        queued = browser.post('/api/jobs', json={'session_id': sid, 'spec': {'length_mm': 100, 'width_mm': 60, 'height_mm': 35}})
        assert queued.status_code == 202
        assert wait(browser, queued.json()['id'])['status'] == 'succeeded'


def test_hosted_deadline_is_bounded_and_timeout_keeps_accepted_model(monkeypatch):
    import subprocess
    from fastapi.testclient import TestClient
    from backend import app as server
    from tests.test_sketchless import wait
    monkeypatch.setenv('DEMO_MODE', 'true')
    with TestClient(server.app) as browser:
        sid = browser.post('/api/sessions').json()['session_id']
        first = wait(browser, browser.post('/api/jobs', json={'session_id': sid, 'spec': {'length_mm': 100, 'width_mm': 60, 'height_mm': 35}}).json()['id'])
        assert first['status'] == 'succeeded'
        deadlines = []
        def timed_out(command, **options):
            deadlines.append(options['timeout'])
            raise subprocess.TimeoutExpired(command, options['timeout'])
        monkeypatch.setenv('SKETCHLESS_CAD_TIMEOUT_SECONDS', '999999')
        monkeypatch.setattr(server.subprocess, 'run', timed_out)
        failed = wait(browser, browser.post('/api/jobs', json={'session_id': sid, 'edit_length_delta_mm': 12}).json()['id'])
        assert failed['status'] == 'failed' and deadlines == [180]
        assert browser.get('/api/sessions/' + sid).json()['job_id'] == first['id']
