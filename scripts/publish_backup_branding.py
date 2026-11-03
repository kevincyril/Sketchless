"""Publish only public information pages to the owner's free GitHub Pages site."""
import base64
import json
from pathlib import Path
import re
from scripts.publish_backup_runner import github_session, OWNER, ROOT

REPO=OWNER+'.github.io'
MARKER='Sketchless public information pages v1\n'
DESCRIPTION='Public information pages for Sketchless and its owner-operated backup utility. No private data.'
STAGE='source validation'
FILES=('.nojekyll','index.html','sketchless-backup/index.html',
       'sketchless-backup/privacy.html','sketchless-backup/terms.html','sketchless-backup/site.css')


def publish():
    global STAGE
    source=ROOT/'public-backup-site'
    # No traversal or directory upload: only these authored informational files.
    files={name:(source/name).read_bytes() for name in FILES}
    for name,data in files.items():
        if len(data)>64000 or re.search(rb'(?:ghp_[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{25,}|nsk_live_|nt_live_|postgres(?:ql)?://)',data):
            raise ValueError('Unexpected content in a public page.')
    files['.sketchless-public-info']=MARKER.encode()
    session=github_session()
    STAGE='GitHub publication'
    def call(method,path,**kwargs):
        response=session.request(method,'https://api.github.com'+path,timeout=30,**kwargs)
        response.raise_for_status()
        return response.json() if response.content else {}
    if call('GET','/user').get('login','').lower()!=OWNER:
        raise ValueError('GitHub account does not match the site owner.')
    path='/repos/'+OWNER+'/'+REPO
    response=session.get('https://api.github.com'+path,timeout=30)
    if response.status_code==404:
        repository=call('POST','/user/repos',json={'name':REPO,'private':False,'auto_init':True,
            'description':DESCRIPTION})
    else:
        response.raise_for_status()
        repository=response.json()
        if repository.get('private'):
            raise ValueError('Refusing to change repository visibility.')
        marker_response=session.get('https://api.github.com'+path+'/contents/.sketchless-public-info',timeout=30)
        if marker_response.status_code==404 and repository.get('description')==DESCRIPTION:
            # Recover this task's auto-initialized repository after an interrupted first upload.
            initial=call('GET',path+'/git/trees/'+repository['default_branch'])
            if {item['path'] for item in initial.get('tree',[])}!={'README.md'}:
                raise ValueError('Unrecognized partial publication; existing content preserved.')
        else:
            marker_response.raise_for_status()
            if base64.b64decode(marker_response.json()['content']).decode()!=MARKER:
                raise ValueError('Existing user site is not this managed information site; nothing overwritten.')
    branch=repository['default_branch']
    parent=call('GET',path+'/git/ref/heads/'+branch)['object']['sha']
    previous=call('GET',path+'/git/commits/'+parent)
    tree=[]
    for name,data in files.items():
        blob=call('POST',path+'/git/blobs',json={'content':base64.b64encode(data).decode(),'encoding':'base64'})
        tree.append({'path':name,'mode':'100644','type':'blob','sha':blob['sha']})
    created=call('POST',path+'/git/trees',json={'base_tree':previous['tree']['sha'],'tree':tree})
    commit=call('POST',path+'/git/commits',json={'message':'Publish backup tool homepage privacy policy and terms without private data',
        'tree':created['sha'],'parents':[parent]})
    call('PATCH',path+'/git/refs/heads/'+branch,json={'sha':commit['sha'],'force':False})
    STAGE='Pages configuration'
    pages=session.get('https://api.github.com'+path+'/pages',timeout=30)
    if pages.status_code==404:
        hosting=call('POST',path+'/pages',json={'build_type':'legacy','source':{'branch':branch,'path':'/'}})
    else:
        pages.raise_for_status()
        hosting=pages.json()
        if hosting.get('cname') or hosting.get('source')!={'branch':branch,'path':'/'}:
            raise ValueError('Existing Pages configuration differs; hosting settings preserved.')
        call('POST',path+'/pages/builds')
    report={'repository':repository['html_url'],'public_information_only':True,
        'commit':commit['sha'],'hosting_url':hosting.get('html_url'),
        'homepage':'https://'+OWNER+'.github.io/sketchless-backup/',
        'privacy_policy':'https://'+OWNER+'.github.io/sketchless-backup/privacy.html',
        'terms':'https://'+OWNER+'.github.io/sketchless-backup/terms.html',
        'authorized_domain':OWNER+'.github.io','billing_changes':False,
        'note':'Publication requested; verify anonymous HTTPS responses before entering OAuth Branding URLs.'}
    (ROOT/'data').mkdir(exist_ok=True)
    (ROOT/'data/backup-branding-publication.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report))


if __name__=='__main__':
    try:publish()
    except Exception as error:
        raise SystemExit('Public information publication stopped at '+STAGE+' ('+type(error).__name__+'). No secrets, backups, visibility changes to existing repositories or billing changes were requested.') from None
