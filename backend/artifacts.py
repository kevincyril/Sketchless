"""Immutable CAD exports in local folders or private Neon object storage."""
from contextlib import closing
from functools import lru_cache
import hashlib
import os
from pathlib import Path
import tempfile
import threading
import uuid
from backend import persistence

FILES = {'spec.json', 'inspection.json', 'part.step', 'part.stl', 'part.glb', 'scene.json'}
MAX_FILE_BYTES = 20_000_000
_downloads = threading.Lock()


@lru_cache(maxsize=1)
def client():
    persistence.validate_config()
    import boto3
    from botocore.config import Config
    return boto3.client('s3', endpoint_url=os.environ['SKETCHLESS_STORAGE_ENDPOINT'],
                        region_name=os.environ['SKETCHLESS_STORAGE_REGION'],
                        aws_access_key_id=os.environ['SKETCHLESS_STORAGE_ACCESS_KEY'],
                        aws_secret_access_key=os.environ['SKETCHLESS_STORAGE_SECRET_KEY'],
                        config=Config(signature_version='s3v4', s3={'addressing_style': 'path'},
                                      connect_timeout=10, read_timeout=30, retries={'max_attempts': 1},
                                      request_checksum_calculation='when_required',
                                      response_checksum_validation='when_required'))


def key(jid, name):
    if str(uuid.UUID(str(jid))) != str(jid) or name not in FILES:
        raise ValueError('Invalid artifact identifier.')
    return 'versions/' + str(jid) + '/' + name


def stored_bytes(database):
    with closing(persistence.connect(database)) as db, db:
        return db.execute('SELECT coalesce(sum(bytes),0) FROM artifact_files').fetchone()[0]


def publish(database, jid, folder):
    if not persistence.remote():
        return
    records = []
    for name in sorted(FILES):
        file = Path(folder) / name
        if file.exists():
            if file.is_symlink() or not 0 < file.stat().st_size < MAX_FILE_BYTES:
                raise ValueError('An export is unsafe or exceeds the storage limit.')
            data = file.read_bytes()
            records.append((name, data, hashlib.sha256(data).hexdigest()))
    if not {'spec.json', 'inspection.json', 'part.step', 'part.stl'} <= {r[0] for r in records}:
        raise ValueError('The model has incomplete exports; nothing was published.')
    uploaded = []
    try:
        with closing(persistence.connect(database)) as db, db:
            # Serialize reservations globally, including builds on overlapping deployments.
            db.execute('BEGIN IMMEDIATE')
            if db.execute('SELECT 1 FROM artifact_files WHERE job=? LIMIT 1', (str(jid),)).fetchone():
                raise ValueError('Saved versions are immutable; create a new version instead.')
            total = db.execute('SELECT coalesce(sum(bytes),0) FROM artifact_files').fetchone()[0]
            maximum = int(os.getenv('SKETCHLESS_MAX_DATA_MB', '256')) * 1024**2
            if total + sum(len(data) for _, data, _ in records) > maximum:
                raise ValueError('The demo storage allowance is full. Existing designs remain available.')
            for name, data, digest in records:
                client().put_object(Bucket=os.environ['SKETCHLESS_STORAGE_BUCKET'], Key=key(jid, name), Body=data)
                uploaded.append(name)
                db.execute('INSERT INTO artifact_files (job,name,bytes,sha256) VALUES (?,?,?,?)', (str(jid), name, len(data), digest))
    except Exception as exc:
        for name in uploaded:
            try:
                client().delete_object(Bucket=os.environ['SKETCHLESS_STORAGE_BUCKET'], Key=key(jid, name))
            except Exception:
                pass  # An orphan remains private; never publish a pointer to incomplete exports.
        if isinstance(exc, ValueError):
            raise
        raise ValueError('CAD exports could not be saved to private storage. Your previous design is unchanged.') from None


def materialize(database, jid, folder, names):
    if not persistence.remote():
        return
    with _downloads:
        with closing(persistence.connect(database)) as db, db:
            records = {row[0]: row[1:] for row in db.execute('SELECT name,bytes,sha256 FROM artifact_files WHERE job=?', (str(jid),)).fetchall()}
        for name in names:
            object_key = key(jid, name)
            if name not in records:
                raise ValueError('This saved version has no verified export in persistent storage.')
            size, digest = records[name]
            if not 0 < size < MAX_FILE_BYTES:
                raise ValueError('Saved export exceeds the supported limit.')
            file = Path(folder) / name
            if file.is_file() and file.stat().st_size == size and hashlib.sha256(file.read_bytes()).hexdigest() == digest:
                continue
            file.parent.mkdir(parents=True, exist_ok=True)
            temporary = None
            try:
                body = client().get_object(Bucket=os.environ['SKETCHLESS_STORAGE_BUCKET'], Key=object_key)['Body']
                try:
                    data = body.read(size + 1)
                finally:
                    body.close()
                if len(data) != size or hashlib.sha256(data).hexdigest() != digest:
                    raise ValueError('Saved export failed its integrity check.')
                with tempfile.NamedTemporaryFile(dir=file.parent, delete=False) as output:
                    temporary = Path(output.name)
                    output.write(data)
                temporary.replace(file)
            except ValueError:
                raise
            except Exception:
                raise ValueError('Saved exports are temporarily unavailable. Try again later.') from None
            finally:
                if temporary is not None and temporary.exists():
                    temporary.unlink()
