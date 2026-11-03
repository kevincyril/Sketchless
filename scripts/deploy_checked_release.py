"""Deploy a tested commit to the existing Free Sketchless service without configuration changes."""
import argparse
from datetime import datetime,timezone
import json
from pathlib import Path
import re
import requests
from scripts.publish_backup_runner import github_session,ROOT


def deploy(commit,ci_run):
    if not re.fullmatch(r'[0-9a-f]{40}',commit):raise ValueError('Use an exact source commit.')
    github=github_session()
    check=github.get('https://api.github.com/repos/kevincyril/Sketchless/actions/runs/'+str(ci_run),timeout=30)
    check.raise_for_status();result=check.json()
    if result['head_sha']!=commit or result['conclusion']!='success':
        raise ValueError('The exact commit has not passed the required Linux verification.')
    private=json.loads((ROOT/'data/hosting-credentials.json').read_text())
    if private.get('free_plans_confirmed') is not True:raise ValueError('Existing Free-plan confirmation is required.')
    saved=json.loads((ROOT/'data/render-service.json').read_text());service_id=saved.get('service',saved)['id']
    session=requests.Session();session.headers['Authorization']='Bearer '+private['render_api_key']
    base='https://api.render.com/v1/services/'+service_id
    response=session.get(base,timeout=30);response.raise_for_status();service=response.json();details=service.get('serviceDetails',{})
    if (details.get('plan')!='free' or details.get('url')!='https://sketchless-cad-7931c5be.onrender.com'
            or service.get('repo')!='https://github.com/kevincyril/Sketchless' or service.get('branch')!='main'):
        raise ValueError('Existing service does not match the approved Free Sketchless target.')
    record_path=ROOT/'data'/('render-release-'+commit[:12]+'.json')
    if record_path.exists():
        record=json.loads(record_path.read_text())
        if record.get('deploy_id'):
            response=session.get(base+'/deploys/'+record['deploy_id'],timeout=30);response.raise_for_status();deployment=response.json()
        else:
            response=session.get(base+'/deploys',params={'limit':20},timeout=30);response.raise_for_status()
            matches=[item.get('deploy',item) for item in response.json() if item.get('deploy',item).get('commit',{}).get('id')==commit]
            if not matches:raise ValueError('A deploy request may have been sent. Inspect provider state before retrying; no duplicate request was issued.')
            deployment=matches[0]
    else:
        record={'commit':commit,'ci_run':ci_run,'requested_utc':datetime.now(timezone.utc).isoformat()}
        record_path.write_text(json.dumps(record,indent=2),encoding='utf-8')
        response=session.post(base+'/deploys',json={'commitId':commit,'clearCache':'do_not_clear'},timeout=45)
        response.raise_for_status();deployment=response.json()
    record.update(deploy_id=deployment['id'],status=deployment['status'],free_plan=True,billing_changes=False,service_configuration_changed=False)
    record_path.write_text(json.dumps(record,indent=2),encoding='utf-8')
    print(json.dumps({key:record[key] for key in ('commit','ci_run','status','free_plan','billing_changes','service_configuration_changed')}))


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--commit',required=True);parser.add_argument('--ci-run',type=int,required=True);args=parser.parse_args()
    try:deploy(args.commit,args.ci_run)
    except Exception as error:
        print(json.dumps({'error_type':type(error).__name__,'http_status':getattr(getattr(error,'response',None),'status_code',None),'note':'Deployment did not finish. Exact-commit CI, Free target and credentials must pass; no settings, keys or response bodies printed. No billing change requested.'}))
        raise SystemExit(1) from None
