"""Local SQLite or explicitly configured Neon PostgreSQL; never an automatic fallback."""
import os
import re
import sqlite3
from urllib.parse import urlsplit, parse_qs


def remote():
    mode = os.getenv('SKETCHLESS_STORAGE_MODE', 'local')
    if mode not in ('local', 'neon'):
        raise ValueError('SKETCHLESS_STORAGE_MODE must be local or neon.')
    return mode == 'neon'


def validate_config():
    if not remote():
        return
    if os.getenv('SKETCHLESS_FREE_HOSTING_CONFIRMED', '').lower() != 'true':
        raise ValueError('Confirm Render and Neon Free plans without payment methods before enabling cloud storage.')
    url = urlsplit(os.getenv('SKETCHLESS_DATABASE_URL', ''))
    if (url.scheme not in ('postgres', 'postgresql') or not url.hostname
            or not url.hostname.endswith('.neon.tech') or not url.username or not url.password
            or parse_qs(url.query).get('sslmode') != ['verify-full']):
        raise ValueError('Set the private Neon database URL with sslmode=verify-full. No local or provider fallback is used.')
    if '-pooler.' in url.hostname:
        raise ValueError('Use the direct, unpooled Neon URL for this single-instance storage adapter.')
    endpoint = urlsplit(os.getenv('SKETCHLESS_STORAGE_ENDPOINT', ''))
    if (endpoint.scheme != 'https' or not endpoint.hostname
            or not endpoint.hostname.endswith('.neon.tech') or endpoint.username
            or endpoint.path not in ('', '/') or endpoint.query or endpoint.fragment):
        raise ValueError('Set the HTTPS Neon object-storage endpoint.')
    for name in ('SKETCHLESS_STORAGE_ACCESS_KEY', 'SKETCHLESS_STORAGE_SECRET_KEY', 'SKETCHLESS_STORAGE_REGION', 'SKETCHLESS_STORAGE_BUCKET'):
        if not os.getenv(name, '').strip():
            raise ValueError('Cloud storage configuration is incomplete; configure it privately before starting.')


def postgres_sql(statement):
    """Translate only the fixed SQL dialect used by Sketchless, never user SQL."""
    if statement == 'PRAGMA table_info(sessions)':
        return "SELECT ordinal_position,column_name FROM information_schema.columns WHERE table_schema=current_schema() AND table_name='sessions'"
    if statement == 'BEGIN IMMEDIATE':
        return 'SELECT pg_advisory_xact_lock(734195201)'
    statement = statement.replace('rowid', 'created_seq')
    statement = re.sub(r"json_extract\(payload,'\$\.([a-z_]+)'\)", r"(payload::jsonb->>'\1')", statement)
    if statement.startswith('CREATE TABLE IF NOT EXISTS sessions '):
        statement = statement[:-1] + ', created_seq BIGSERIAL)'
    if statement.startswith('CREATE TABLE IF NOT EXISTS jobs '):
        statement = statement[:-1] + ', created_seq BIGSERIAL)'
    if statement.startswith('CREATE TABLE IF NOT EXISTS public_pauses '):
        statement = statement.replace('until REAL', 'until DOUBLE PRECISION')
    if statement.startswith('INSERT OR REPLACE INTO jobs VALUES '):
        statement = statement.replace('INSERT OR REPLACE INTO jobs VALUES', 'INSERT INTO jobs (id,payload) VALUES')
        statement += ' ON CONFLICT(id) DO UPDATE SET payload=excluded.payload'
    if statement.startswith('INSERT OR REPLACE INTO public_pauses VALUES '):
        statement = statement.replace('INSERT OR REPLACE INTO public_pauses VALUES', 'INSERT INTO public_pauses (name,until) VALUES')
        statement += ' ON CONFLICT(name) DO UPDATE SET until=excluded.until'
    statement = statement.replace('DO UPDATE SET count=count+1', 'DO UPDATE SET count=public_usage.count+1')
    return statement.replace('%', '%%').replace('?', '%s')


class PostgresConnection:
    def __init__(self, connection):
        self.connection = connection

    def execute(self, statement, parameters=()):
        try:
            return self.connection.execute(postgres_sql(statement), parameters)
        except Exception:
            raise sqlite3.OperationalError('Persistent database is unavailable. Try again later; no local fallback was used.') from None

    def __enter__(self):
        return self

    def __exit__(self, kind, value, traceback):
        try:
            if kind is None:
                self.connection.commit()
            else:
                self.connection.rollback()
        except Exception:
            raise sqlite3.OperationalError('Persistent database transaction did not complete.') from None

    def close(self):
        self.connection.close()


def connect(path, timeout=10):
    if not remote():
        return sqlite3.connect(path, timeout=timeout)
    validate_config()
    try:
        import psycopg
        import certifi
        connection = psycopg.connect(os.environ['SKETCHLESS_DATABASE_URL'],
                                    connect_timeout=10, sslrootcert=certifi.where(),
                                    options='-c search_path=sketchless -c statement_timeout=30000 -c lock_timeout=10000')
        return PostgresConnection(connection)
    except Exception:
        raise sqlite3.OperationalError('Neon connection failed. Check the private configuration; no fallback was used.') from None


def initialize_schema(connection):
    if remote():
        connection.execute('CREATE SCHEMA IF NOT EXISTS sketchless')
    connection.execute('CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, spec TEXT, job TEXT)')
    connection.execute('CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, payload TEXT)')
    for name in ('name', 'owner'):
        if name not in {row[1] for row in connection.execute('PRAGMA table_info(sessions)')}:
            connection.execute('ALTER TABLE sessions ADD COLUMN ' + name + ' TEXT')
    connection.execute('CREATE TABLE IF NOT EXISTS public_usage (kind TEXT, scope TEXT, bucket INTEGER, count INTEGER NOT NULL, PRIMARY KEY(kind,scope,bucket))')
    connection.execute('CREATE TABLE IF NOT EXISTS public_pauses (name TEXT PRIMARY KEY, until REAL NOT NULL)')
    connection.execute('CREATE TABLE IF NOT EXISTS artifact_files (job TEXT, name TEXT, bytes INTEGER NOT NULL, sha256 TEXT NOT NULL, PRIMARY KEY(job,name))')
