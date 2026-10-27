"""Opt-in generalization smoke test: two custom products + an edit, six API calls maximum."""
import argparse,json,os,tempfile,time
from pathlib import Path


def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--confirm-free-tier',action='store_true')
 parser.add_argument('--max-model-calls',type=int,choices=range(1,7),default=6)
 parser.add_argument('--case',choices=['all','lamp','chair'],default='all')
 parser.add_argument('--skip-edit',action='store_true')
 args=parser.parse_args()
 if not args.confirm_free_tier:parser.error('No calls made. Confirm Free Tier with no linked billing.')
 from dotenv import load_dotenv
 root=Path(__file__).resolve().parents[1];load_dotenv(root/'.env')
 from backend import agent
 agent.require_free_tier();original=agent.create_client;calls=[]
 def factory():
  client=original();generate=client.models.generate_content
  def counted(**kwargs):
   if len(calls)>=args.max_model_calls:raise ValueError('Configured request limit reached; no further API calls made.')
   calls.append(kwargs['model']);return generate(**kwargs)
  client.models.generate_content=counted;return client
 agent.create_client=factory
 from fastapi.testclient import TestClient
 report={'verification':'incomplete','model':agent.model_name(),'cases':[],
 'scope':'Small live smoke test, not a general design-quality benchmark. Explicit approvals below are test-harness actions only.'}
 (root/'data').mkdir(exist_ok=True)
 with tempfile.TemporaryDirectory(prefix='variety-live-',dir=root/'data') as folder:
  os.environ['SKETCHLESS_DATA_DIR']=folder;os.environ['DEMO_MODE']='false'
  from backend import app as server
  try:
   with TestClient(server.app) as http:
    def submit(sid,text):
     response=http.post('/api/jobs',json={'session_id':sid,'description':text,'workflow':'concept'})
     response.raise_for_status();jid=response.json()['id'];deadline=time.monotonic()+150
     while time.monotonic()<deadline:
      job=http.get('/api/jobs/'+jid).json()
      if job['status'] not in ('queued','generating'):
       if job.get('proposed_spec'):
        if http.get('/api/artifacts/'+jid+'/step').status_code==200:raise RuntimeError('Unapproved proposal exposed CAD.')
        response=http.post('/api/jobs',json={'session_id':sid,'confirm_job_id':jid});response.raise_for_status();jid=response.json()['id'];continue
       return job
      time.sleep(.3)
     raise RuntimeError('Job timed out; no further prompts submitted.')
    cases=[('lamp','Create a minimal desk lamp: a round weighted base, vertical stem, angled arm and cone-shaped shade pointing down. About 400 mm tall. Use sensible default dimensions for the other parts; list your assumptions.'),
     ('chair','Create a simple dining chair, 450 mm wide, seat 450 mm above the floor and backrest reaching 850 mm. Include four separate legs, a seat and a backrest. Use sensible defaults for depth and thickness.')]
    for label,prompt in cases:
     if args.case!='all' and args.case!=label:continue
     sid=http.post('/api/sessions').json()['session_id'];job=submit(sid,prompt)
     entry={'case':label,'prompt':prompt,'status':job['status'],'message':job.get('message','')};report['cases'].append(entry)
     if job['status']!='succeeded':raise RuntimeError('Live '+label+' stopped: '+entry['message'])
     if job['spec']['concept']!='custom':raise RuntimeError('Expected a custom product rather than a substituted recipe.')
     entry.update(spec=job['spec'],inspection=job['inspection'])
     bounds=job['inspection']['bounding_box_mm']
     if label=='chair':
      seat=next((c for c in job['spec']['components'] if c['name'].lower()=='seat'),None)
      measured=next((c for c in job['inspection']['components'] if seat and c['id']==seat['id']),None)
      checks={'overall_width_450_mm':abs(bounds[0]-450)<.1,'backrest_top_850_mm':abs(bounds[2]-850)<.1,'seat_top_450_mm':bool(measured and abs(measured['bounds_mm'][1][2]-450)<.1)}
     else:checks={'approximately_400_mm_tall':abs(bounds[2]-400)<=40}
     entry['requested_dimension_checks']=checks
     if not all(checks.values()):raise RuntimeError('Requested dimensions did not match: '+label+'. See report for measurements.')
     if not all(job['inspection']['checks'].values()):raise RuntimeError('Geometry inspection failed.')
     output=root/'examples'/'variety'/label;output.mkdir(parents=True,exist_ok=True)
     for ext in ('step','stl','glb','scene'):
      artifact=http.get('/api/artifacts/'+job['id']+'/'+ext);artifact.raise_for_status()
      if not artifact.content:raise RuntimeError('Empty '+ext+' export')
      (output/('model.'+('json' if ext=='scene' else ext))).write_bytes(artifact.content)
     design=http.get('/api/designs/'+job['id']+'/file');design.raise_for_status();(output/'design.json').write_bytes(design.content)
     entry['exports_verified']=['STEP','STL','GLB','scene JSON','portable design JSON']
     if label=='lamp' and not args.skip_edit:
      edited=submit(sid,'Change only the shade color to red (#c43d32). Keep every component ID, dimension and position unchanged.')
      report['cases'].append({'case':'lamp color edit','status':edited['status'],'message':edited.get('message','')})
      if edited['status']!='succeeded':raise RuntimeError('Live edit stopped: '+edited.get('message',''))
      before={c['id']:c for c in job['spec']['components']};after={c['id']:c for c in edited['spec']['components']}
      if before.keys()!=after.keys():raise RuntimeError('Color edit changed component IDs.')
      changed=[]
      for key in before:
       if {k:v for k,v in before[key].items() if k!='color'}!={k:v for k,v in after[key].items() if k!='color'}:raise RuntimeError('Color edit changed geometry.')
       if before[key]['color']!=after[key]['color']:changed.append(key)
      if not changed or any(after[key]['color'].lower()!='#c43d32' for key in changed):raise RuntimeError('Requested shade color was not applied.')
      if any('shade' not in (before[key]['name']+' '+before[key]['role']+' '+key).lower() for key in changed):raise RuntimeError('Color edit affected a component other than the shade.')
      report['cases'][-1].update(stable_geometry_preserved=True,changed_components=changed)
    report['verification']='passed'
  except (RuntimeError,ValueError) as exc:
   report['verification']='stopped';report['reason']=str(exc)
  finally:
   server.pool.shutdown(wait=True);report['model_requests']=len(calls)
   (root/'docs/live-variety-verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
 print(json.dumps({'verification':report['verification'],'model_requests':len(calls),'cases':[{'case':c['case'],'status':c['status']} for c in report['cases']],**({'reason':report['reason']} if report.get('reason') else {})},indent=2))
 if report['verification']!='passed':raise SystemExit(1)

if __name__=='__main__':main()
