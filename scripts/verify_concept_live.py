"""Small opt-in free-tier concept check: three prompts + deterministic restore, six model calls maximum."""
import argparse,json,os,tempfile,time
from pathlib import Path

def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--confirm-free-tier',action='store_true')
 args=parser.parse_args()
 if not args.confirm_free_tier:parser.error('No API calls made. Confirm a Free Tier project with no billing linked using --confirm-free-tier.')
 from dotenv import load_dotenv
 root=Path(__file__).resolve().parents[1];load_dotenv(root/'.env')
 from backend import agent
 agent.require_free_tier()
 original=agent.create_client;counter={'calls':0}
 def limited_client():
  client=original();generate=client.models.generate_content
  def limited(**kwargs):
   if counter['calls']>=6:raise ValueError('Live concept verification reached its six-request budget. No further API calls made.')
   counter['calls']+=1
   return generate(**kwargs)
  client.models.generate_content=limited
  return client
 agent.create_client=limited_client
 from fastapi.testclient import TestClient
 (root/'data').mkdir(exist_ok=True)
 with tempfile.TemporaryDirectory(prefix='concept-live-',dir=root/'data') as folder:
  os.environ['SKETCHLESS_DATA_DIR']=folder;os.environ['DEMO_MODE']='false'
  from backend import app as server
  try:
   with TestClient(server.app) as http:
    sid=http.post('/api/sessions').json()['session_id']
    def prompt(text):
     response=http.post('/api/jobs',json={'session_id':sid,'description':text});response.raise_for_status();id=response.json()['id'];deadline=time.monotonic()+180
     while time.monotonic()<deadline:
      result=http.get('/api/jobs/'+id).json()
      if result['status'] not in ('queued','generating'):
       if result.get('proposed_spec'):
        confirmed=http.post('/api/jobs',json={'session_id':sid,'confirm_job_id':result['id'],'description':'Build this concept'});confirmed.raise_for_status();id=confirmed.json()['id'];continue
       return result
      time.sleep(.3)
     raise RuntimeError('Concept verification timed out; no further prompts submitted.')
    question=prompt('Build a cube-shaped robot with legs.')
    if question['status']!='clarification':raise RuntimeError('Expected a useful clarification before generating the ambiguous robot. Received '+question['status']+': '+question.get('message',''))
    first=prompt('Four articulated legs, a 200 mm cube body, and two camera eyes. Use sensible defaults for all remaining visual details and state the assumptions.')
    if first['status']!='succeeded':raise RuntimeError('Robot generation stopped: '+first.get('message',first['status']))
    nodes={c['id']:c for c in first['spec']['components']};body=next(c for c in nodes.values() if c['role']=='body');legs=[c for c in nodes.values() if c['primitive']=='group' and c['symmetry_group']=='legs'];eyes=[c for c in nodes.values() if c['role']=='eye']
    if body['dimensions']['x_mm']!=200 or body['dimensions']['y_mm']!=200 or body['dimensions']['z_mm']!=200 or len(legs)!=4 or len(eyes)!=2:raise RuntimeError('Live robot specification did not match the requested body/legs/eyes.')
    second=prompt('Make all four legs 30 mm longer. Keep the body dimensions, eyes, foot sizes, segment widths and stable component IDs unchanged. Use the lengthen_legs_mm operation.')
    if second['status']!='succeeded':raise RuntimeError('Robot edit stopped: '+second.get('message',second['status']))
    edited={c['id']:c for c in second['spec']['components']}
    if edited.keys()!=nodes.keys() or next(c for c in edited.values() if c['role']=='body')['dimensions']!=body['dimensions']:raise RuntimeError('Live edit changed stable IDs or body dimensions.')
    for id in nodes:
     if nodes[id]['role']=='lower_leg' and edited[id]['dimensions']['z_mm']!=nodes[id]['dimensions']['z_mm']+15:raise RuntimeError('Expected 30 mm total leg extension split across segments.')
    for result in (first,second):
     if not all(result['inspection']['checks'].values()):raise RuntimeError('Actual concept inspection failed.')
     for ext in ('step','stl','glb','scene'):
      response=http.get('/api/artifacts/'+result['id']+'/'+ext)
      if response.status_code!=200 or not response.content:raise RuntimeError('Missing '+ext+' export.')
    restored=prompt('Restore the previous version')
    if restored['status']!='restored' or http.get('/api/sessions/'+sid).json()['job_id']!=first['id']:raise RuntimeError('Conversational version restoration failed.')
    report={'verification':'passed','provider':'Gemini Developer API','model':agent.model_name(),'model_requests':counter['calls'],'clarification':question['message'],'body_dimensions_mm':body['dimensions'],'leg_groups':len(legs),'eyes':len(eyes),'initial_solid_count':first['inspection']['solid_count'],'initial_bounds_mm':first['inspection']['bounding_box_mm'],'edited_bounds_mm':second['inspection']['bounding_box_mm'],'all_geometry_checks_passed':True,'stable_component_ids_preserved':True,'body_dimensions_preserved':True,'exports_verified':['STEP','STL','GLB','scene JSON'],'restore_verified':True,'assumptions':first['spec']['assumptions'],'initial_spec':first['spec'],'edited_spec':second['spec']}
    (root/'docs/live-concept-verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps({k:v for k,v in report.items() if k not in ('initial_spec','edited_spec')},indent=2))
  finally:server.pool.shutdown(wait=True)

if __name__=='__main__':
 try:main()
 except (RuntimeError,ValueError) as exc:raise SystemExit(str(exc)) from None
