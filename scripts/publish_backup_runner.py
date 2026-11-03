"""Publish only allowlisted backup code to an owner-private repository using Git's stored login."""
import base64
import json
import os
from pathlib import Path
import subprocess
import requests

ROOT=Path(__file__).resolve().parents[1]
OWNER='kevincyril'
REPO='sketchless-private-backups'
MARKER='Sketchless private backup runner v1\n'


def github_session():
    result=subprocess.run(['git','credential','fill'],input='protocol=https\nhost=github.com\n\n',
        text=True,capture_output=True,timeout=20,
        env=dict(os.environ,GIT_TERMINAL_PROMPT='0',GCM_INTERACTIVE='never'))
    fields=dict(line.split('=',1) for line in result.stdout.splitlines() if '=' in line)
    if result.returncode or not fields.get('password'):
        raise ValueError('A GitHub sign-in is required in Git Credential Manager.')
    session=requests.Session()
    session.headers.update({'Authorization':'Bearer '+fields['password'],
        'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'})
    return session


def publish():
    session=github_session()
    def call(method,path,**kwargs):
        response=session.request(method,'https://api.github.com'+path,timeout=30,**kwargs)
        response.raise_for_status()
        return response.json() if response.content else {}
    user=call('GET','/user')
    if user.get('login','').lower()!=OWNER:
        raise ValueError('Stored GitHub account does not match the Sketchless owner.')
    path='/repos/'+OWNER+'/'+REPO
    existing=session.get('https://api.github.com'+path,timeout=30)
    if existing.status_code==404:
        repository=call('POST','/user/repos',json={'name':REPO,'private':True,'auto_init':True,
            'description':'Owner-private verified Sketchless backups to Google Drive; no backup archives committed.'})
    else:
        existing.raise_for_status()
        repository=existing.json()
        if not repository.get('private'):
            raise ValueError('Refusing to use a public backup repository.')
        marker=call('GET',path+'/contents/.sketchless-backup-runner')
        if base64.b64decode(marker['content']).decode()!=MARKER:
            raise ValueError('Existing repository is not this managed backup runner.')
    if not repository.get('private'):
        raise ValueError('Repository privacy was not confirmed.')
    branch=repository['default_branch']
    ref=call('GET',path+'/git/ref/heads/'+branch)
    parent=ref['object']['sha']
    commit=call('GET',path+'/git/commits/'+parent)
    files={'.sketchless-backup-runner':MARKER.encode(),
        '.gitignore':b'*.env\n*.zip\n__pycache__/\n*.json\n',
        '.github/workflows/backup.yml':(ROOT/'deploy/backup-runner/backup.yml').read_bytes(),
        'backup-requirements.txt':(ROOT/'deploy/backup-runner/backup-requirements.txt').read_bytes()}
    files['README.md']=(ROOT/'deploy/backup-runner/README.md').read_bytes()
    for name in ('backend/__init__.py','backend/persistence.py','backend/artifacts.py',
                 'scripts/__init__.py','scripts/backup_cloud.py','scripts/backup_data.py',
                 'scripts/backup_verified.py','scripts/backup_to_drive.py'):
        files[name]=(ROOT/name).read_bytes()
    tree=[]
    for name,data in files.items():
        blob=call('POST',path+'/git/blobs',json={'content':base64.b64encode(data).decode(),'encoding':'base64'})
        tree.append({'path':name,'mode':'100644','type':'blob','sha':blob['sha']})
    created=call('POST',path+'/git/trees',json={'base_tree':commit['tree']['sha'],'tree':tree})
    saved=call('POST',path+'/git/commits',json={'message':'Prepare verified owner-private Drive backups; execution gated by setup variables',
        'tree':created['sha'],'parents':[parent]})
    call('PATCH',path+'/git/refs/heads/'+branch,json={'sha':saved['sha'],'force':False})
    variables=call('GET',path+'/actions/variables')
    flags={item['name']:item['value'] for item in variables.get('variables',[])}
    report={'url':repository['html_url'],'private':True,'commit':saved['sha'],
            'account_plan':user.get('plan',{}).get('name','not available'),
            'schedule_enabled':flags.get('BACKUP_ENABLED')=='true' and flags.get('BACKUP_FREE_PLANS_CONFIRMED')=='true',
            'note':'Set secrets and confirm free-plan allowances before enabling BACKUP_ENABLED. No billing settings changed.'}
    (ROOT/'data').mkdir(exist_ok=True)
    (ROOT/'data/backup-repository.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report))


if __name__=='__main__':
    try:
        publish()
    except Exception:
        raise SystemExit('Private runner publication did not finish. GitHub sign-in or repository/workflow write access may be needed. No secrets or provider response bodies were printed; no billing settings were changed.') from None
