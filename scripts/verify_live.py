"""Free-tier only, opt-in live verification. Never run by the ordinary test suite."""
import argparse
import json
import os
from pathlib import Path
import tempfile
import time


def main():
    parser=argparse.ArgumentParser(description='Verify two real Sketchless AI requests using your configured Gemini Free Tier project. At most six model requests (two prompts, up to two repairs each), 1500 output tokens per request. Requires a project with no linked billing. Stops on quota errors without retry or fallback.')
    parser.add_argument('--confirm-free-tier',action='store_true',help='Confirm the Google AI Studio project is Free Tier with no billing linked.')
    args=parser.parse_args()
    if not args.confirm_free_tier:
        parser.error('No API calls made. Re-run with --confirm-free-tier only for a Free Tier project with no billing linked.')
    from dotenv import load_dotenv
    root=Path(__file__).resolve().parents[1]
    load_dotenv(root/'.env')
    if not os.getenv('GEMINI_API_KEY'):
        parser.error('No API calls made. Configure GEMINI_API_KEY in the backend .env first.')
    from backend.agent import require_free_tier
    try:
        require_free_tier()
    except ValueError as exc:
        parser.error(str(exc))
    from fastapi.testclient import TestClient
    (root/'data').mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='live-check-',dir=root/'data') as temporary:
        os.environ['SKETCHLESS_DATA_DIR']=temporary
        os.environ['DEMO_MODE']='false'
        from backend import app as server
        try:
            with TestClient(server.app) as client:
                sid=client.post('/api/sessions').json()['session_id']
                def generate(prompt):
                    response=client.post('/api/jobs',json={'session_id':sid,'description':prompt})
                    response.raise_for_status()
                    jid=response.json()['id']; deadline=time.monotonic()+180
                    while time.monotonic()<deadline:
                        job=client.get('/api/jobs/'+jid).json()
                        if job['status'] not in ('queued','generating'):
                            if job['status']!='succeeded': raise RuntimeError('Live verification did not generate a model: '+job.get('message',job['status']))
                            if not all(job['inspection']['checks'].values()): raise RuntimeError('Actual CAD inspection failed.')
                            for ext in ('step','stl'):
                                artifact=client.get('/api/artifacts/'+jid+'/'+ext)
                                if artifact.status_code!=200 or not artifact.content: raise RuntimeError('Missing '+ext+' export.')
                            return job
                        time.sleep(.25)
                    raise RuntimeError('Live verification timed out. No additional requests were submitted.')
                first=generate('Make an open-top electronics enclosure 100 mm long, 60 mm wide, and 35 mm high, with 3 mm walls and a 3 mm base.')
                expected={'part_type':'enclosure','length_mm':100,'width_mm':60,'height_mm':35,'wall_thickness_mm':3,'base_thickness_mm':3,'open_top':True}
                if first['spec']!=expected: raise RuntimeError('Initial live specification differs from the explicit requested dimensions.')
                second=generate('Make it 20 mm longer. Keep every other dimension unchanged.')
                if second['spec']!=expected|{'length_mm':120}: raise RuntimeError('Relative live edit did not preserve the other parameters.')
                if not any(e['tool']=='classify_part' for e in first['events']): raise RuntimeError('Initial request did not use the trained classifier.')
                print(json.dumps({'live_verification':'passed','initial_spec':first['spec'],'edited_spec':second['spec'],'initial_geometry_checks':first['inspection'],'edited_geometry_checks':second['inspection']},indent=2))
        finally:
            server.pool.shutdown(wait=True)

if __name__=='__main__':
    try:
        main()
    except RuntimeError as exc:
        raise SystemExit(str(exc)) from None
