"""Create dedicated read-only Neon credentials; save only in an ACL-protected local folder."""
import json
from datetime import datetime, timezone
from pathlib import Path
import secrets
from urllib.parse import urlsplit, urlunsplit, quote
import certifi
from dotenv import dotenv_values
import psycopg
from psycopg import sql
import requests

ROOT=Path(__file__).resolve().parents[1]
ROLE='sketchless_backup_reader'
STAGE='private configuration'


def provision():
    global STAGE
    target=ROOT/'data/backup-setup/backup.env'
    if not target.parent.is_dir():
        raise ValueError('Create the protected setup folder first.')
    if target.exists():
        print('Dedicated backup configuration already exists; it was preserved.')
        return
    runtime=dotenv_values(ROOT/'data/hosting-runtime.env')
    management=json.loads((ROOT/'data/hosting-credentials.json').read_text())['neon_api_key']
    STAGE='project metadata'
    project=json.loads((ROOT/'data/neon-project.json').read_text())
    project_id=project.get('project',project)['id']
    branch=json.loads((ROOT/'data/neon-storage-credential.json').read_text())['branch_id']
    password=secrets.token_urlsafe(32)
    STAGE='database read-only role'
    with psycopg.connect(runtime['SKETCHLESS_DATABASE_URL'],sslrootcert=certifi.where(),connect_timeout=15) as db:
        if db.execute('SELECT 1 FROM pg_roles WHERE rolname=%s',(ROLE,)).fetchone():
            raise ValueError('A backup role already exists. Preserve it and recover its protected configuration; no password was rotated.')
        db.execute(sql.SQL('CREATE ROLE {} LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION PASSWORD {}').format(sql.Identifier(ROLE),sql.Literal(password)))
        db.execute(sql.SQL('GRANT CONNECT ON DATABASE {} TO {}').format(sql.Identifier(db.info.dbname),sql.Identifier(ROLE)))
        db.execute(sql.SQL('GRANT USAGE ON SCHEMA sketchless TO {}').format(sql.Identifier(ROLE)))
        for table in ('sessions','jobs','public_usage','public_pauses','artifact_files'):
            db.execute(sql.SQL('GRANT SELECT ON sketchless.{} TO {}').format(sql.Identifier(table),sql.Identifier(ROLE)))
        db.execute(sql.SQL('ALTER ROLE {} SET default_transaction_read_only = on').format(sql.Identifier(ROLE)))
        # Only storage:read is requested. Never change or rotate the app's existing key.
        STAGE='object-download credential'
        response=requests.post('https://console.neon.tech/api/v2/projects/'+project_id+'/branches/'+branch+'/credentials',
            headers={'Authorization':'Bearer '+management},
            json={'name':'Sketchless scheduled backup reader','principal_type':'user','scopes':['storage:read']},timeout=30)
        response.raise_for_status()
        storage=response.json()
        if set(storage.get('scopes',[]))!={'storage:read'}:
            raise ValueError('Download-only storage scope was not confirmed.')
        parsed=urlsplit(runtime['SKETCHLESS_DATABASE_URL'])
        netloc=quote(ROLE,safe='')+':'+quote(password,safe='')+'@'+parsed.hostname
        if parsed.port:netloc+=':'+str(parsed.port)
        values={'SKETCHLESS_STORAGE_MODE':'neon','SKETCHLESS_FREE_HOSTING_CONFIRMED':'true',
            'SKETCHLESS_DATABASE_URL':urlunsplit((parsed.scheme,netloc,parsed.path,parsed.query,'')),
            'SKETCHLESS_STORAGE_ACCESS_KEY':storage['token_id'],
            'SKETCHLESS_STORAGE_SECRET_KEY':storage['s3_secret_access_key']}
        for key in ('SKETCHLESS_STORAGE_ENDPOINT','SKETCHLESS_STORAGE_REGION','SKETCHLESS_STORAGE_BUCKET'):
            values[key]=runtime[key]
        STAGE='protected configuration write'
        with target.open('x',encoding='utf-8') as file:
            file.write('\n'.join(key+'='+value for key,value in values.items())+'\n')
    print('Dedicated SELECT-only database role and storage:read credential saved privately. No keys or passwords printed; no billing settings changed.')


def cleanup_setup_tokens():
    """Revoke only duplicate read tokens from today's failed setup attempts."""
    runtime=dotenv_values(ROOT/'data/backup-setup/backup.env')
    management=json.loads((ROOT/'data/hosting-credentials.json').read_text())['neon_api_key']
    project=json.loads((ROOT/'data/neon-project.json').read_text())
    project_id=project.get('project',project)['id']
    branch=json.loads((ROOT/'data/neon-storage-credential.json').read_text())['branch_id']
    url='https://console.neon.tech/api/v2/projects/'+project_id+'/branches/'+branch+'/credentials'
    headers={'Authorization':'Bearer '+management}
    response=requests.get(url,headers=headers,timeout=30)
    response.raise_for_status()
    body=response.json()
    items=body if isinstance(body,list) else body.get('credentials',[])
    count=0
    today=datetime.now(timezone.utc).date().isoformat()
    for item in items:
        if (item.get('name')=='Sketchless scheduled backup reader'
                and set(item.get('scopes',[]))=={'storage:read'}
                and item.get('created_at','').startswith(today)
                and item.get('token_id')!=runtime['SKETCHLESS_STORAGE_ACCESS_KEY']):
            result=requests.delete(url+'/'+item['token_id'],headers=headers,timeout=30)
            result.raise_for_status()
            count+=1
    print(json.dumps({'duplicate_setup_read_tokens_revoked':count,'active_backup_credential_preserved':True}))


if __name__=='__main__':
    import sys
    try:
        cleanup_setup_tokens() if '--cleanup-setup-tokens' in sys.argv else provision()
    except Exception as error:
        raise SystemExit('Read-only backup provisioning stopped at '+STAGE+' ('+type(error).__name__+'). No secrets were printed and no billing changes were requested.') from None
