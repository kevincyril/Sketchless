"""Export private cloud state and immutable CAD into the existing portable backup format."""
import argparse
from contextlib import closing
import json
from pathlib import Path
import sqlite3
import tempfile
from dotenv import load_dotenv
from backend import artifacts, persistence
from scripts.backup_data import backup

TABLES = {
    'sessions': ('id,spec,job,name,owner', 'id TEXT PRIMARY KEY,spec TEXT,job TEXT,name TEXT,owner TEXT'),
    'jobs': ('id,payload', 'id TEXT PRIMARY KEY,payload TEXT'),
    'public_usage': ('kind,scope,bucket,count', 'kind TEXT,scope TEXT,bucket INTEGER,count INTEGER NOT NULL,PRIMARY KEY(kind,scope,bucket)'),
    'public_pauses': ('name,until', 'name TEXT PRIMARY KEY,until REAL NOT NULL'),
    'artifact_files': ('job,name,bytes,sha256', 'job TEXT,name TEXT,bytes INTEGER NOT NULL,sha256 TEXT NOT NULL,PRIMARY KEY(job,name)'),
}


def export_cloud(output):
    if not persistence.remote():
        raise ValueError('Cloud export requires explicitly configured Neon storage.')
    with tempfile.TemporaryDirectory(prefix='sketchless-cloud-backup-') as folder:
        source = Path(folder)
        with closing(persistence.connect(None)) as cloud, cloud:
            cloud.execute('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY')
            with closing(sqlite3.connect(source / 'sketchless.sqlite3')) as local, local:
                for table, (columns, schema) in TABLES.items():
                    local.execute('CREATE TABLE ' + table + ' (' + schema + ')')
                    order = ' ORDER BY rowid' if table in ('sessions', 'jobs') else ''
                    rows = cloud.execute('SELECT ' + columns + ' FROM ' + table + order).fetchall()
                    placeholders = ','.join('?' for _ in columns.split(','))
                    local.executemany('INSERT INTO ' + table + ' VALUES (' + placeholders + ')', rows)
                jobs = [json.loads(row[0]) for row in local.execute("SELECT payload FROM jobs WHERE json_extract(payload,'$.status')='succeeded'")]
        for job in jobs:
            names = ['spec.json', 'inspection.json', 'part.step', 'part.stl']
            if job['spec'].get('part_type') == 'assembly':
                names += ['part.glb', 'scene.json']
            artifacts.materialize(None, job['id'], source / job['id'], names)
        return backup(source, output)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime-env', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    load_dotenv(args.runtime_env, override=True)
    try:
        persistence.validate_config()
        result = export_cloud(args.output)
    except Exception:
        raise SystemExit('Cloud backup failed. Check private configuration, provider access and output path; no credentials were printed.') from None
    print(json.dumps({'successful_versions': result['successful_versions'], 'note': 'Private backup; keep outside Git. Contains conversations and designs, not configuration keys.'}))


if __name__ == '__main__':
    main()
