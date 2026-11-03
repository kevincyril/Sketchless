"""Opt-in hosted synthetic feature smoke: explicit specs only, never Gemini or personal sessions."""
import argparse
import hashlib
import json
from pathlib import Path
import time
import requests
from backend.feature_parts import FeatureRequest,feature_scene
from scripts.evaluate_features import inspect_exports,ROOT


def verify(origin,commit):
    if origin!='https://sketchless-cad-7931c5be.onrender.com':raise ValueError('Use the verified Sketchless HTTPS origin.')
    session=requests.Session()
    class Client:
        def get(self,path):
            response=session.get(origin+path,timeout=120);response.raise_for_status();return response
        def post(self,path,data):
            response=session.post(origin+path,json=data,timeout=30);response.raise_for_status();return response.json()
    http=Client();config=http.get('/api/config').json()
    if config.get('build_revision')!=commit or config.get('modeling_contract_version')!=3 or not config.get('public_mode'):
        raise ValueError('Hosted release revision/contract/public isolation does not match.')
    inputs=json.loads((ROOT/'evaluation/feature_inputs_v3.json').read_text())['designs']
    result={'commit':commit,'provider_calls':0,'scope':'Explicit synthetic JSON/CAD, not hosted Gemini interpretation or a load guarantee.','checks':{},'latencies_seconds':{}}
    def build(sid,spec,label):
        started=time.monotonic();job=http.post('/api/jobs',{'session_id':sid,'spec':spec});deadline=time.monotonic()+210
        while time.monotonic()<deadline:
            job=http.get('/api/jobs/'+job['id']).json()
            if job['status'] in ('succeeded','failed'):break
            time.sleep(2)
        if job['status']!='succeeded':raise ValueError('Hosted synthetic CAD did not succeed.')
        result['latencies_seconds'][label]=round(time.monotonic()-started,3)
        return job
    for kind in ('enclosure','slotted_tray'):
        sid=http.post('/api/sessions',{})['session_id']
        spec=feature_scene(FeatureRequest(design=inputs[kind])).model_dump(mode='json')
        first=build(sid,spec,kind)
        checks=inspect_exports(http,first,kind)
        checks['reopened_spec_preserved']=http.get('/api/sessions/'+sid).json()['spec']==first['spec']
        if kind=='slotted_tray':
            initial_step=hashlib.sha256(http.get('/api/artifacts/'+first['id']+'/step').content).hexdigest()
            changed=feature_scene(FeatureRequest(design={**inputs[kind],'height_mm':45,'corner_radius_mm':5})).model_dump(mode='json')
            edited=build(sid,changed,'tray_edited')
            checks.update({'edit_'+key:value for key,value in inspect_exports(http,edited,kind,True).items()})
            http.post('/api/sessions/'+sid+'/restore',{'job_id':first['id']})
            checks['restore_exact_spec']=http.get('/api/sessions/'+sid).json()['spec']==first['spec']
            checks['restore_original_export']=hashlib.sha256(http.get('/api/artifacts/'+first['id']+'/step').content).hexdigest()==initial_step
        result['checks'][kind]=checks
        if not all(checks.values()):raise ValueError('Hosted feature predicate failed; inspect synthetic geometry privately.')
        print(json.dumps({'family':kind,'checks_passed':True}),flush=True)
    result['passed']=True
    (ROOT/'docs/hosted-features-verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
    session.close()
    print(json.dumps(result),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--origin',default='https://sketchless-cad-7931c5be.onrender.com');parser.add_argument('--commit',required=True);args=parser.parse_args()
    try:verify(args.origin,args.commit)
    except Exception as error:
        print(json.dumps({'error_type':type(error).__name__,'http_status':getattr(getattr(error,'response',None),'status_code',None),'note':'Hosted synthetic verification failed. No cookies, keys, private designs or raw response bodies printed.'}))
        raise SystemExit(1) from None
