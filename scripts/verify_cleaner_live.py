"""One-prompt Gemini Free Tier cleaner check; at most three model requests including repair."""
import argparse,json,os,tempfile,time
from pathlib import Path

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--confirm-free-tier',action='store_true');args=parser.parse_args()
 if not args.confirm_free_tier:parser.error('No API calls made. Confirm a Free Tier project with no billing linked.')
 from dotenv import load_dotenv
 root=Path(__file__).resolve().parents[1];load_dotenv(root/'.env')
 from backend import agent
 agent.require_free_tier();original=agent.create_client;calls=[]
 def factory():
  client=original();generate=client.models.generate_content
  def counted(**kwargs):
   if len(calls)>=3:raise ValueError('Three-request verification limit reached.')
   calls.append(kwargs['model']);return generate(**kwargs)
  client.models.generate_content=counted;return client
 agent.create_client=factory
 from fastapi.testclient import TestClient
 with tempfile.TemporaryDirectory(prefix='cleaner-live-',dir=root/'data') as folder:
  os.environ['SKETCHLESS_DATA_DIR']=folder;os.environ['DEMO_MODE']='false'
  from backend import app as server
  try:
   with TestClient(server.app) as http:
    sid=http.post('/api/sessions').json()['session_id'];prompt='Create a home robot cleaner with default settings.'
    response=http.post('/api/jobs',json={'session_id':sid,'description':prompt});response.raise_for_status();id=response.json()['id'];deadline=time.monotonic()+180
    while time.monotonic()<deadline:
     job=http.get('/api/jobs/'+id).json()
     if job['status'] not in ('queued','generating'):
      if job.get('proposed_spec'):
       confirmed=http.post('/api/jobs',json={'session_id':sid,'confirm_job_id':job['id'],'description':'Build this concept'});confirmed.raise_for_status();id=confirmed.json()['id'];continue
      break
     time.sleep(.3)
    if job['status']!='succeeded':raise RuntimeError('Cleaner verification stopped: '+job.get('message',job['status']))
    if job['spec']['concept']!='cleaner':raise RuntimeError('Expected the dedicated robot-vacuum design, not a generic walking robot.')
    if not all(job['inspection']['checks'].values()) or not all(job['inspection']['design_review']['checks'].values()):raise RuntimeError('Cleaner geometry/feature checks failed.')
    for ext in ['step','stl','glb','scene']:
     file=http.get('/api/artifacts/'+id+'/'+ext)
     if file.status_code!=200 or not file.content:raise RuntimeError('Missing '+ext+' export.')
    report={'verification':'passed','prompt':prompt,'model':agent.model_name(),'model_requests':len(calls),'workflow':job['workflow'],'spec':job['spec'],'inspection':job['inspection'],'exports_verified':['STEP','STL','GLB','scene JSON'],'scope':'One robot-vacuum request; not a benchmark of arbitrary product-design quality.'}
    (root/'docs/live-cleaner-verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps({'verification':'passed','model_requests':len(calls),'name':job['spec']['name'],'solid_count':job['inspection']['solid_count'],'all_geometry_checks_passed':True,'feature_checks':job['inspection']['design_review'],'exports_verified':report['exports_verified']},indent=2))
  finally:server.pool.shutdown(wait=True)

if __name__=='__main__':
 try:main()
 except (ValueError,RuntimeError) as exc:raise SystemExit(str(exc)) from None
