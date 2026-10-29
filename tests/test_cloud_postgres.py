"""Real PostgreSQL transaction tests on the isolated Linux runner; no Neon credentials."""
import os
import sqlite3
import time
import uuid
from contextlib import closing
from concurrent.futures import ThreadPoolExecutor
import pytest
from backend import persistence, public_access, artifacts
from tests.test_cloud_storage import Objects

DSN = os.getenv('SKETCHLESS_TEST_POSTGRES', '')
pytestmark = pytest.mark.skipif(not DSN, reason='Isolated PostgreSQL integration service is not configured.')


@pytest.fixture
def postgres(monkeypatch, tmp_path):
    import psycopg
    from psycopg import sql
    schema = 'test_' + uuid.uuid4().hex
    with psycopg.connect(DSN, autocommit=True) as admin:
        admin.execute(sql.SQL('CREATE SCHEMA {}').format(sql.Identifier(schema)))
    def connect(path, timeout=10):
        return persistence.PostgresConnection(psycopg.connect(DSN, options='-c search_path=' + schema))
    monkeypatch.setattr(persistence, 'connect', connect)
    monkeypatch.setattr(persistence, 'remote', lambda: True)
    with closing(connect(None)) as db, db:
        persistence.initialize_schema(db)
    objects = Objects()
    monkeypatch.setattr(artifacts, 'client', lambda: objects)
    monkeypatch.setenv('SKETCHLESS_STORAGE_BUCKET', 'private-test-bucket')
    yield connect, tmp_path, objects
    with psycopg.connect(DSN, autocommit=True) as admin:
        admin.execute(sql.SQL('DROP SCHEMA {} CASCADE').format(sql.Identifier(schema)))


def test_atomic_postgres_budgets_under_concurrent_requests(postgres):
    connect, path, _ = postgres
    day = int(time.time() // 86400)
    def reserve(_):
        try:
            public_access.consume(path, [('test_day', 'global', day, 3, 'used')])
            return True
        except ValueError:
            return False
    with ThreadPoolExecutor(max_workers=8) as pool:
        assert sum(pool.map(reserve, range(12))) == 3
    with closing(connect(None)) as db, db:
        assert db.execute('SELECT count FROM public_usage').fetchone()[0] == 3


def test_upsert_keeps_version_order_and_json_filters(postgres):
    connect, _, _ = postgres
    with closing(connect(None)) as db, db:
        db.execute('INSERT OR REPLACE INTO jobs VALUES (?,?)', ('a', '{"session_id":"session","status":"queued"}'))
        db.execute('INSERT OR REPLACE INTO jobs VALUES (?,?)', ('b', '{"session_id":"session","status":"succeeded"}'))
        db.execute('INSERT OR REPLACE INTO jobs VALUES (?,?)', ('a', '{"session_id":"session","status":"failed"}'))
        rows = db.execute("SELECT id FROM jobs WHERE json_extract(payload,'$.session_id')=? ORDER BY rowid DESC", ('session',)).fetchall()
        assert rows == [('b',), ('a',)]
        assert db.execute("SELECT count(*) FROM jobs WHERE json_extract(payload,'$.status')='succeeded'").fetchone()[0] == 1


def test_postgres_rollback_preserves_other_scope_counts(postgres):
    connect, path, _ = postgres
    day = int(time.time() // 86400)
    public_access.consume(path, [('test_day', 'a', day, 1, 'used')])
    with pytest.raises(ValueError):
        public_access.consume(path, [('test_day', 'b', day, 10, 'used'), ('test_day', 'a', day, 1, 'used')])
    with closing(connect(None)) as db, db:
        assert db.execute("SELECT count FROM public_usage WHERE scope='b'").fetchone() is None


def test_remote_api_restores_versions_after_cache_loss(postgres, monkeypatch, tmp_path):
    from fastapi.testclient import TestClient
    from backend import app as server
    from tests.test_sketchless import wait
    _, _, _objects = postgres
    monkeypatch.setattr(server, 'DATA', tmp_path / 'cache')
    server.DATA.mkdir()
    monkeypatch.setattr(server, 'DB', tmp_path / 'unused.sqlite3')
    monkeypatch.setenv('DEMO_MODE', 'true')
    monkeypatch.setenv('SKETCHLESS_PUBLIC_MODE', 'true')
    monkeypatch.setenv('SKETCHLESS_VISITOR_JOB_MINUTE_LIMIT', '20')
    monkeypatch.delenv('SKETCHLESS_PUBLIC_ORIGIN', raising=False)
    with TestClient(server.app, base_url='https://testserver') as owner:
        sid = owner.post('/api/sessions').json()['session_id']
        first = wait(owner, owner.post('/api/jobs', json={'session_id': sid, 'spec': {'length_mm': 100, 'width_mm': 60, 'height_mm': 35}}).json()['id'])
        assert first['status'] == 'succeeded', first.get('message')
        edited = wait(owner, owner.post('/api/jobs', json={'session_id': sid, 'edit_length_delta_mm': 12}).json()['id'])
        assert edited['status'] == 'succeeded', edited.get('message')
        cookies = dict(owner.cookies)
    # Replace the local folder with a fresh empty cache, as on a sleeping/redeployed service.
    fresh = tmp_path / 'after-restart'
    fresh.mkdir()
    monkeypatch.setattr(server, 'DATA', fresh)
    with TestClient(server.app, base_url='https://testserver') as reopened:
        reopened.cookies.update(cookies)
        assert reopened.get('/api/sessions/' + sid).json()['job_id'] == edited['id']
        assert reopened.get('/api/artifacts/' + first['id'] + '/step').content.startswith(b'ISO-10303-21')
        restored = reopened.post('/api/sessions/' + sid + '/restore', json={'job_id': first['id']})
        assert restored.status_code == 200, restored.text
        assert reopened.get('/api/sessions/' + sid).json()['job_id'] == first['id']
    with TestClient(server.app, base_url='https://testserver') as stranger:
        assert stranger.get('/api/artifacts/' + first['id'] + '/step').status_code == 404
    from scripts.backup_cloud import export_cloud
    from scripts.backup_data import restore
    archive = tmp_path / 'private-cloud-backup.zip'
    export_cloud(archive)
    restored_folder = tmp_path / 'local-recovery'
    restore(archive, restored_folder)
    with sqlite3.connect(restored_folder / 'sketchless.sqlite3') as local:
        assert local.execute('SELECT job FROM sessions WHERE id=?', (sid,)).fetchone()[0] == first['id']
    assert (restored_folder / first['id'] / 'part.step').read_bytes().startswith(b'ISO-10303-21')
