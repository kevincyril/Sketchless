"""Development acceptance: real API/CAD/exports with scripted or opt-in bounded Gemini interpretation."""
import argparse
from datetime import datetime,timezone
import hashlib
import io
import json
import math
import os
from pathlib import Path
import struct
import tempfile
import time
from types import SimpleNamespace
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
KINDS={'enclosure-posts':'enclosure','bracket-offset-holes':'bracket','sloped-phone-stand':'phone_stand','stepped-shaft':'shaft','six-compartments':'organizer','mixed-unit-plate':'plate','tray-edit-preservation':'slotted_tray'}


def response(name,args):
    from google.genai import types
    return types.GenerateContentResponse(candidates=[types.Candidate(finish_reason='STOP',content=types.Content(role='model',parts=[types.Part.from_function_call(name=name,args=args)]))])


def inspect_exports(http,job,kind,edited=False):
    import cadquery as cq
    import numpy as np
    checks={}
    with tempfile.TemporaryDirectory(prefix='sketchless-export-review-') as folder:
        exported={ext:http.get('/api/artifacts/'+job['id']+'/'+ext) for ext in ('step','stl','glb','scene')}
        checks['downloads_open']=all(r.status_code==200 and len(r.content)>100 for r in exported.values())
        file=Path(folder)/'model.step';file.write_bytes(exported['step'].content)
        model=cq.importers.importStep(str(file));shape=model.val();bounds=shape.BoundingBox()
        actual=[bounds.xlen,bounds.ylen,bounds.zlen]
        checks['valid_connected_solid']=shape.isValid() and len(model.solids().vals())==1
        expected={'enclosure':[120,80,45],'bracket':[70,50,80],'shaft':[100,20,20],'organizer':[180,120,35],'plate':[152.4,101.6,5],'slotted_tray':[160,100,45 if edited else 30]}.get(kind)
        if expected:checks['requested_overall_dimensions']=bool(np.allclose(actual,expected,atol=.02,rtol=0))
        inside=lambda x,y,z:shape.isInside(cq.Vector(x,y,z),1e-6)
        if kind=='enclosure':
            checks['hollow_with_floor']=not inside(60,40,24) and inside(60,40,1.5)
            checks['four_bored_connected_posts']=all(not inside(x,y,z) for x,y in ((10,10),(110,10),(10,70),(110,70)) for z in (.5,5,44.5)) and all(inside(x+3,y,24) for x,y in ((10,10),(110,10),(10,70),(110,70)))
        elif kind=='bracket':
            checks['four_corner_referenced_through_holes']=all(not inside(v,0,2.5) and not inside(2.5,0,v) for v in (20,45))
            checks['plate_thickness_and_volume']=abs(shape.Volume()-(50*5*(70+80-5)-4*math.pi*3**2*5))<.01
        elif kind=='phone_stand':
            normals=[face.normalAt() for face in shape.Faces() if face.geomType()=='PLANE' and face.Area()>4000]
            checks['support_angle']=any(abs(math.degrees(math.atan2(abs(n.y),abs(n.z)))-65)<.01 for n in normals)
            checks['cable_notch_and_retaining_bridge']=not inside(0,8,10) and inside(0,8,16)
        elif kind=='shaft':
            checks['coaxial_section_diameters']=all(inside(x,r-.1,10) and not inside(x,r+.1,10) for x,r in ((15,10),(50,7),(85,5)))
            checks['transverse_hole']=all(not inside(15,0,z) for z in (.5,10,19.5))
        elif kind=='organizer':
            expected_volume=180*120*35-6*((174-4)/3)*((114-2)/2)*32
            checks['six_equal_compartments_and_dividers']=abs(shape.Volume()-expected_volume)<.01 and all(not inside(3+(174-4)/6+col*((174-4)/3+2),3+28+row*58,20) for col in range(3) for row in range(2))
        elif kind=='plate':
            checks['inch_conversion_and_hole_offsets']=all(not inside(x,y,2.5) for x,y in ((12.7,12.7),(139.7,12.7),(12.7,88.9),(139.7,88.9)))
        else:
            checks['two_real_floor_slots']=all(not inside(x,50,1.5) for x in (40,120)) and inside(80,50,1.5)
            radius=5 if edited else 0;inner=max(0,radius-3);height=45 if edited else 30
            volume=(160*100-(4-math.pi)*radius**2)*height-(154*94-(4-math.pi)*inner**2)*(height-3)-2*20*8*3
            checks['floor_walls_and_corner_radii']=abs(shape.Volume()-volume)<.01
        # The actual tessellation must agree across every offered preview/download.
        raw=exported['stl'].content;count=struct.unpack_from('<I',raw,80)[0]
        checks['stl_parses']=len(raw)==84+50*count
        vertices=np.array([struct.unpack_from('<9f',raw,84+i*50+12) for i in range(count)]).reshape(-1,3)
        checks['stl_matches_step']=bool(np.allclose(np.ptp(vertices,axis=0),actual,atol=.5,rtol=0))
        raw=exported['glb'].content;magic,version,length=struct.unpack_from('<4sII',raw,0);chunk=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+chunk])
        access=[doc['accessors'][primitive['attributes']['POSITION']] for mesh in doc['meshes'] for primitive in mesh['primitives']]
        extent=np.max([a['max'] for a in access],axis=0)-np.min([a['min'] for a in access],axis=0)
        checks['glb_parses_and_matches_step']=magic==b'glTF' and version==2 and length==len(raw) and bool(np.allclose(extent[[0,2,1]]*1000,actual,atol=.5,rtol=0))
        scene=json.loads(exported['scene'].content);points=np.concatenate([np.array(mesh['positions']).reshape(-1,3) for mesh in scene['meshes']])
        checks['preview_matches_exports']=bool(np.allclose(np.ptp(points,axis=0),actual,atol=.5,rtol=0))
    return checks


def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--live',action='store_true');parser.add_argument('--confirm-free-tier',action='store_true');parser.add_argument('--max-model-calls',type=int,default=12);parser.add_argument('--case',choices=list(KINDS));args=parser.parse_args()
    if not 1<=args.max_model_calls<=12:raise SystemExit('Model request cap must be between 1 and 12.')
    if args.live and not args.confirm_free_tier:raise SystemExit('Real Gemini requires explicit Free Tier confirmation.')
    from dotenv import load_dotenv
    load_dotenv(ROOT/'.env')
    storage=tempfile.TemporaryDirectory(prefix='sketchless-feature-evaluation-')
    os.environ.update(SKETCHLESS_DATA_DIR=storage.name,SKETCHLESS_STORAGE_MODE='local',SKETCHLESS_PUBLIC_MODE='false',DEMO_MODE='false')
    if not args.live:os.environ.update(GEMINI_API_KEY='offline-placeholder',GEMINI_FREE_TIER_CONFIRMED='true',GEMINI_MODEL='gemini-3.5-flash-lite')
    from fastapi.testclient import TestClient
    from backend import app as server,agent
    from backend.feature_parts import FeatureRequest,feature_scene
    from backend.runtime import MODELING_SOURCE_DIGEST
    suite_path=ROOT/'evaluation/user_acceptance_v2.json';suite=json.loads(suite_path.read_text(encoding='utf-8'));designs=json.loads((ROOT/'evaluation/feature_inputs_v3.json').read_text())['designs']
    results=[];calls=[];last=[0.0];budget_blocked=[False]
    real_factory=agent.create_client
    current_script=[]
    def generate(**kwargs):
        if len(calls)>=args.max_model_calls:budget_blocked[0]=True;raise ValueError('Evaluation model-request cap reached.')
        if args.live:
            delay=max(0,20-(time.monotonic()-last[0]));time.sleep(delay);last[0]=time.monotonic()
        calls.append({'ordinal':len(calls)+1,'live':args.live})
        if not args.live:
            if not current_script:raise ValueError('Unexpected scripted SDK repair request; no response was invented.')
            return current_script.pop(0)
        try:
            with real_factory() as client:return client.models.generate_content(**kwargs)
        except Exception:
            budget_blocked[0]=True
            raise
    factory=lambda:SimpleNamespace(models=SimpleNamespace(generate_content=generate),close=lambda:None)
    with patch.object(agent,'create_client',factory),TestClient(server.app) as http:
        def send(sid,**payload):
            job=http.post('/api/jobs',json={'session_id':sid,**payload}).json();deadline=time.monotonic()+210
            while time.monotonic()<deadline:
                job=http.get('/api/jobs/'+job['id']).json()
                if job['status'] in ('failed','clarification','succeeded','restored'):return job
                time.sleep(.1)
            raise ValueError('Timed out waiting for CAD job.')
        for case in suite['cases']:
            if args.case and case['id']!=args.case:continue
            if budget_blocked[0]:
                results.append({'id':case['id'],'status':'not_run','reason':'Provider failure or bounded request cap stopped further live work.'});continue
            started=time.monotonic();checks={};evidence={};initial_calls=len(calls)
            try:
                sid=http.post('/api/sessions').json()['session_id'];kind=KINDS.get(case['id'])
                current_script[:]=[response('create_feature_part',{'design':designs[kind]})] if kind else []
                job=send(sid,description=case['prompt'])
                if not kind:
                    checks['clarification_without_geometry']=job['status']=='clarification' and not job.get('proposed_spec') and len(calls)==initial_calls
                    if case['id']=='conflicting-cap-fit':checks['explicit_fit_conflict']='54 mm' in job.get('message','') and '54.6 mm' in job.get('message','')
                    if case['id']=='scanner-clarification':checks['essential_questions']=all(word in job.get('message','') for word in ('dimensions','orientation','clearance','mounting'))
                    if case['id']=='hinged-box':checks['explicit_limit']='hinge' in job.get('message','') and 'cannot' in job.get('message','')
                else:
                    checks['explicit_proposal_approval_required']=job['status']=='clarification' and bool(job.get('proposed_spec')) and http.get('/api/sessions/'+sid).json()['spec'] is None
                    if not checks['explicit_proposal_approval_required']:raise ValueError('No reviewable proposal: '+job.get('message',''))
                    checks['proposal_survives_reopen']=any(j['id']==job['id'] and j.get('proposed_spec')==job['proposed_spec'] for j in http.get('/api/sessions/'+sid+'/jobs').json())
                    built=send(sid,confirm_job_id=job['id'])
                    if built['status']!='succeeded':raise ValueError('Approved CAD failed: '+built.get('message',''))
                    evidence['accepted_spec']=built['spec']
                    checks.update(inspect_exports(http,built,kind))
                    checks['accepted_design_survives_reopen']=http.get('/api/sessions/'+sid).json()['spec']==built['spec']
                    if case.get('follow_up'):
                        changed=feature_scene(FeatureRequest(design={**designs[kind],'height_mm':45,'corner_radius_mm':5}))
                        component=changed.components[0]
                        current_script[:]=[response('edit_feature_part',{'design':{**designs[kind],'height_mm':45,'corner_radius_mm':5}})]
                        revised=send(sid,description=case['follow_up'])
                        if not revised.get('proposed_spec'):raise ValueError('Follow-up did not produce a proposal: '+revised.get('message',''))
                        updated=send(sid,confirm_job_id=revised['id'])
                        if updated['status']!='succeeded':raise ValueError('Follow-up CAD failed: '+updated.get('message',''))
                        evidence['edited_spec']=updated['spec'];evidence['edited_inspection']=updated['inspection']
                        checks.update({'edit_'+key:value for key,value in inspect_exports(http,updated,kind,True).items()})
                        before_calls=len(calls);restored=send(sid,description='Restore the previous version')
                        checks['exact_zero_model_restore']=restored.get('restored_job_id')==built['id'] and len(calls)==before_calls and http.get('/api/sessions/'+sid).json()['spec']==built['spec']
                results.append({'id':case['id'],'status':'passed' if all(checks.values()) else 'failed','checks':checks,'evidence':evidence,'model_requests':len(calls)-initial_calls,'seconds':round(time.monotonic()-started,3)})
            except Exception as error:
                results.append({'id':case['id'],'status':'failed','checks':checks,'error_type':type(error).__name__,'message':str(error)[:1600],'model_requests':len(calls)-initial_calls,'seconds':round(time.monotonic()-started,3)})
            print(json.dumps({'id':results[-1]['id'],'status':results[-1]['status'],'model_requests':results[-1].get('model_requests',0)}),flush=True)
    report={'scope':'User-authored development acceptance, not an untouched held-out benchmark or manufacturing guarantee. Offline uses scripted SDK responses with real API/CAD; live uses bounded real Gemini requests.',
        'mode':'live' if args.live else 'offline','implementation_digest':MODELING_SOURCE_DIGEST,'suite_sha256':hashlib.sha256(suite_path.read_bytes()).hexdigest(),'model_requests':len(calls),'passed':sum(r['status']=='passed' for r in results),'cases':results}
    output=ROOT/'evaluation/results'/(datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')+'-features-v3-'+report['mode']+'.json')
    with output.open('x',encoding='utf-8') as file:json.dump(report,file,indent=2)
    print(json.dumps({'report':str(output),'passed':report['passed'],'total':len(results),'model_requests':len(calls)}),flush=True)
    if report['passed']!=len(results):raise SystemExit(1)


if __name__=='__main__':main()
