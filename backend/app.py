import json, os, sqlite3, subprocess, sys, time, uuid, threading, re, contextvars
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager
from pathlib import Path
from typing import Literal
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi import Request as HTTPRequest
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, Field, ValidationError, field_validator, model_validator
from backend.schemas import Spec, BracketSpec, parse_spec
from backend.scene_schema import SceneSpec, RestoreAction
from backend.routing import route_workflow, concept_clarification
from backend.agent import interpret, require_free_tier, FREE_MODELS, DEFAULT_MODEL
from ml.model import classify
from backend import public_access, persistence, artifacts
ROOT=Path(__file__).resolve().parents[1]
load_dotenv(ROOT/'.env')
DATA=Path(os.getenv('SKETCHLESS_DATA_DIR',str(ROOT/'data'))).resolve(); DATA.mkdir(parents=True,exist_ok=True)
DB=DATA/'sketchless.sqlite3'
with persistence.connect(DB) as c:
    persistence.initialize_schema(c)
c.close()
app=FastAPI(title='Sketchless')
public_access.install(app,lambda:DB)
pool=ThreadPoolExecutor(max_workers=1 if public_access.enabled() else 2)
slots=threading.BoundedSemaphore(4)
lock=threading.Lock(); active=set()

@contextmanager
def db():
    connection=persistence.connect(DB)
    try:
        with connection:
            yield connection
    finally:
        connection.close()
def save(job):
    with db() as c: c.execute('INSERT OR REPLACE INTO jobs VALUES (?,?)',(job['id'],json.dumps(job)))
def session(sid):
    with db() as c: row=c.execute('SELECT spec,job,name FROM sessions WHERE id=?',(sid,)).fetchone()
    if not row: raise ValueError('Unknown session')
    return {'spec':json.loads(row[0]) if row[0] else None,'job_id':row[1],'name':row[2]}

def session_jobs(sid):
    with db() as c:
        rows=c.execute("SELECT payload FROM jobs WHERE json_extract(payload,'$.session_id')=? ORDER BY rowid DESC LIMIT 30",(sid,)).fetchall()
    return [json.loads(row[0]) for row in reversed(rows)]

class Request(BaseModel):
    model_config=ConfigDict(extra='forbid')
    session_id: uuid.UUID
    description: str=Field(default='',max_length=3000)
    spec: Spec|BracketSpec|SceneSpec|None=None
    confirm_job_id: uuid.UUID|None=None
    workflow: Literal["auto","precise","concept"]="auto"
    selected_component_id: str|None=Field(default=None,max_length=64)
    selection_only: bool=False
    base_version_id: uuid.UUID|None=None
    edit_length_delta_mm: float|None=Field(default=None,ge=-500,le=500)

    @model_validator(mode='after')
    def validate_action(self):
        self.description=self.description.strip()
        actions=sum(value is not None for value in (self.spec,self.confirm_job_id,self.edit_length_delta_mm))
        if actions>1:
            raise ValueError('Choose one action: build a specification, confirm a proposal, or change length.')
        if not actions and not self.description:
            raise ValueError('Describe your design or choose a build action.')
        if self.selection_only and not (self.selected_component_id or '').strip():
            raise ValueError('Choose a component before requesting a selection-only edit.')
        return self

@app.get('/healthz')
def health():
    try:
        with db() as connection:connection.execute('SELECT 1 FROM sessions LIMIT 1').fetchone()
    except sqlite3.Error:raise HTTPException(503,'Storage is unavailable.') from None
    return JSONResponse({'service':'Sketchless','status':'ok'},headers={'Cache-Control':'no-store'})

@app.get('/api/config')
def config():
    return {'name':'Sketchless','mode':'DEMO_MODE' if os.getenv('DEMO_MODE','true').lower()=='true' else 'LIVE_AGENT','defaults':{'wall_thickness_mm':3,'base_thickness_mm':3,'open_top':True,'bracket':{'thickness_mm':3,'hole_diameter_mm':5,'holes_per_face':2}},'families':['enclosure','tray','bracket'],'workflows':['precise','concept'],'concept_examples':['cleaner','robot','table','stand'],'public_mode':public_access.enabled(),'ai_configured':os.getenv('DEMO_MODE','true').lower()!='true' and bool(os.getenv('GEMINI_API_KEY', '').strip()) and os.getenv('GEMINI_FREE_TIER_CONFIRMED','').lower()=='true' and os.getenv('GEMINI_MODEL',DEFAULT_MODEL).strip() in FREE_MODELS}
@app.post('/api/sessions')
def create_session():
    sid=str(uuid.uuid4())
    with db() as c: c.execute('INSERT INTO sessions (id,spec,job,owner) VALUES (?,NULL,NULL,?)',(sid,public_access.owner_for_request()))
    return {'session_id':sid}
@app.get('/api/sessions/{sid}')
def get_session(sid:uuid.UUID):
    try: return session(str(sid))
    except ValueError as e: raise HTTPException(404,str(e))
@app.get('/api/sessions/{sid}/jobs')
def get_session_jobs(sid:uuid.UUID):
    try: session(str(sid))
    except ValueError as e: raise HTTPException(404,str(e))
    return session_jobs(str(sid))

class DesignName(BaseModel):
    model_config=ConfigDict(extra='forbid',str_strip_whitespace=True)
    name: str=Field(min_length=1,max_length=64)

class RestoreRequest(BaseModel):
    model_config=ConfigDict(extra='forbid')
    job_id: uuid.UUID

class DesignDocument(BaseModel):
    model_config=ConfigDict(extra='forbid',str_strip_whitespace=True)
    format: Literal['sketchless-design']
    version: Literal[1]
    name: str=Field(min_length=1,max_length=64)
    spec: Spec|BracketSpec|SceneSpec

    @field_validator('version',mode='before')
    @classmethod
    def supported_version(cls,value):
        if type(value) is not int or value!=1:
            raise ValueError('This design-file version is not supported. Use version 1.')
        return value

@app.get('/api/designs')
def designs():
    with db() as c:
        rows=c.execute('SELECT id,name,spec,job FROM sessions WHERE name IS NOT NULL'+(' AND owner=?' if public_access.enabled() else '')+' ORDER BY rowid DESC LIMIT 100',(public_access.owner_for_request(),) if public_access.enabled() else ()).fetchall()
    return [{'session_id':r[0],'name':r[1],'spec':json.loads(r[2]) if r[2] else None,'job_id':r[3]} for r in rows]

@app.post('/api/sessions/{sid}/name')
def name_design(sid:uuid.UUID,request:DesignName):
    get_session(sid)
    with db() as c: c.execute('UPDATE sessions SET name=? WHERE id=?',(request.name,str(sid)))
    return session(str(sid))

@app.post('/api/designs/validate')
async def validate_design(request:HTTPRequest):
    body=bytearray()
    async for chunk in request.stream():
        if len(body)+len(chunk)>65536: raise HTTPException(413,'Design files must be smaller than 64 KB.')
        body.extend(chunk)
    try:
        return DesignDocument.model_validate_json(bytes(body)).model_dump()
    except ValidationError as exc:
        raise HTTPException(422,[{'msg':e['msg']} for e in exc.errors(include_input=False)]) from None

@app.get('/api/sessions/{sid}/design')
def download_design(sid:uuid.UUID):
    current=get_session(sid)
    if not current['spec']: raise HTTPException(409,'Create a model before downloading its design.')
    document=DesignDocument(format='sketchless-design',version=1,name=current['name'] or 'My design',spec=parse_spec(current['spec']))
    return JSONResponse(document.model_dump(),headers={'Content-Disposition':'attachment; filename="sketchless-design.json"'})

@app.get('/api/designs/{jid}/file')
def download_version_design(jid:uuid.UUID):
    target=get_job(jid)
    if target['status']!='succeeded': raise HTTPException(409,'Create a model before downloading its design.')
    current=session(target['session_id'])
    document=DesignDocument(format='sketchless-design',version=1,name=current['name'] or 'My design',spec=parse_spec(target['spec']))
    return JSONResponse(document.model_dump(),headers={'Content-Disposition':'attachment; filename="sketchless-design.json"'})

@app.post('/api/sessions/{sid}/restore')
def restore_design(sid:uuid.UUID,request:RestoreRequest):
    get_session(sid)
    with lock:
        if str(sid) in active:raise HTTPException(409,'Wait for the current model to finish before restoring a version.')
        return activate_version(str(sid),str(request.job_id))

def activate_version(sid,jid):
    target=get_job(uuid.UUID(str(jid)))
    if target['session_id']!=sid:raise HTTPException(404,'This version does not belong to this design.')
    if target['status']!='succeeded':raise HTTPException(409,'Only successful versions can be restored.')
    spec=parse_spec(target['spec']);folder=DATA/str(jid)
    formats=['part.step','part.stl']+(['part.glb','scene.json'] if isinstance(spec,SceneSpec) else [])
    try:artifacts.materialize(DB,str(jid),folder,formats)
    except ValueError as exc:raise HTTPException(503,str(exc)) from None
    if not all((folder/name).is_file() and 0<(folder/name).stat().st_size<20_000_000 for name in formats):raise HTTPException(409,'This version’s files are missing. Recreate it from its specification.')
    if not target.get('inspection',{}).get('checks') or not all(target['inspection']['checks'].values()):raise HTTPException(409,'This version has no passing geometry inspection.')
    with db() as c:c.execute('UPDATE sessions SET spec=?,job=? WHERE id=?',(spec.model_dump_json(),str(jid),sid))
    return target
@app.post('/api/jobs',status_code=202)
def submit(req:Request):
    sid=str(req.session_id)
    try: session(sid)
    except ValueError as e: raise HTTPException(404,str(e))
    if public_access.enabled():
        if not public_access.owns(DB,sid,public_access.owner_for_request() or ''):raise HTTPException(404,'Design not found in this browser.')
        try:public_access.admit_job(DB,uses_storage=not bool(re.fullmatch(r'\s*(?:please )?restore (?:the )?previous version[.!]?\s*',req.description,re.I)))
        except ValueError as exc:raise HTTPException(429,str(exc),headers={'Retry-After':'60'}) from None
    with lock:
        if sid in active: raise HTTPException(409,'A generation is already running for this session.')
        if not slots.acquire(False): raise HTTPException(429,'Generation queue full. Try again shortly.')
        active.add(sid)
    summary=('Chat: '+req.description) if not req.spec and req.edit_length_delta_mm is None else ('Change length by '+str(req.edit_length_delta_mm)+' mm') if req.edit_length_delta_mm is not None else ('Generate '+req.spec.name+' concept') if isinstance(req.spec,SceneSpec) else ('Generate '+req.spec.part_type+' · '+str(req.spec.length_mm)+' × '+str(req.spec.width_mm)+' × '+str(req.spec.height_mm)+' mm')
    job={'id':str(uuid.uuid4()),'session_id':sid,'status':'queued','events':[], 'request_summary':summary,'description':req.description if not req.spec else ''}
    save(job); pool.submit(contextvars.copy_context().run,run,job,req)
    return job

def run(job,req):
    def emit(tool,summary,result,start):
        job['events'].append({'tool':tool,'input':summary,'result':result,'seconds':round(time.perf_counter()-start,3)}); save(job)
    try:
        job['status']='generating'; save(job); start=time.perf_counter()
        current=session(job['session_id']);job['base_version_id']=current['job_id']
        if req.base_version_id and str(req.base_version_id)!=current['job_id']:raise ValueError('The active version changed. Reload the design before editing.')
        if req.selected_component_id and (not current['spec'] or current['spec'].get('part_type')!='assembly' or req.selected_component_id not in {n['id'] for n in current['spec']['components']}):raise ValueError('The selected component is not in the active scene.')
        emit('get_current_spec',{'session_id':job['session_id']},current,start)
        previous=[j for j in session_jobs(job['session_id']) if j['id']!=job['id']]
        if current['job_id']:
            accepted_index=next((i for i,j in enumerate(previous) if j['id']==current['job_id']),None)
            if accepted_index is None:
                previous=[] # The accepted version is older than the bounded history window.
            elif any(j['status']=='succeeded' for j in previous[accepted_index+1:]):
                # Restoring an older version must not replay later, abandoned design changes.
                previous=previous[:accepted_index+1]+[j for j in previous[accepted_index+1:] if j['status']!='succeeded' and j.get('base_version_id')==current['job_id']]
        if current['job_id']:
            ancestors=set();cursor=current['job_id']
            while cursor and cursor not in ancestors and len(ancestors)<100:
                ancestors.add(cursor);entry=get_job(uuid.UUID(cursor));cursor=entry.get('base_version_id')
            previous=[j for j in previous if (j['status']=='succeeded' and j['id'] in ancestors) or (j['status']!='succeeded' and (j.get('base_version_id') in ancestors or not j.get('base_version_id')))]
        context=[]
        for earlier in previous[-8:]:
            if earlier.get('description'):
                context.append({'role':'user','content':earlier['description']})
                if earlier.get('message'): context.append({'role':'assistant','content':earlier['message']})
        from backend.requirements import effective_context
        context=effective_context(req.description,context)
        recent_requests=[j for j in session_jobs(job['session_id']) if j['id']!=job['id']]
        latest=recent_requests[-1] if recent_requests else {}
        # A pending proposal is an edit baseline, never an accepted CAD version.
        candidate=latest
        for entry in reversed(recent_requests):
            candidate=entry
            if entry.get('status')!='failed' or entry.get('base_version_id')!=current['job_id']:break
        pending=candidate if (candidate.get('status')=='clarification' and candidate.get('proposed_spec')
            and candidate.get('base_version_id')==current['job_id'] and not req.selected_component_id
            and req.workflow!='precise') else None
        working_spec=pending['proposed_spec'] if pending else current['spec']
        workflow='concept' if req.confirm_job_id or isinstance(req.spec,SceneSpec) else 'precise' if req.spec else route_workflow(req.description,working_spec,context,req.workflow)
        job['workflow']=workflow
        emit('route_workflow',{'requested':req.workflow},{'workflow':workflow,'classifier_scope':'enclosure, tray, bracket only'},time.perf_counter())
        routing=None
        if workflow=='precise' and not current['spec'] and req.edit_length_delta_mm is None:
            routing_text=req.spec.part_type if req.spec else ' '.join([m['content'] for m in context if m['role']=='user']+[req.description])[-3000:]
            start=time.perf_counter(); routing=classify(routing_text)
            emit('classify_part',{'characters':len(req.description)},routing,start)
            if not req.spec and routing['abstained']:
                job.update(status='clarification',message='Please choose an open box, tray, or L-shaped bracket and provide length, width and height.'); return
        # An explicit restore command needs no model call and never rebuilds geometry.
        if re.fullmatch(r'\s*(?:please )?restore (?:the )?previous version[.!]?\s*',req.description,re.I) and not req.spec:
            versions=[j for j in session_jobs(job['session_id']) if j['status']=='succeeded']
            active_version=get_job(uuid.UUID(current['job_id'])) if current['job_id'] else {}
            parent=active_version.get('base_version_id')
            index=next((i for i,v in enumerate(versions) if v['id']==current['job_id']),-1)
            if not parent and ('base_version_id' in active_version or index<=0):raise ValueError('There is no earlier successful version to restore.')
            target=activate_version(job['session_id'],parent or versions[index-1]['id'])
            emit('restore_version',{'version_id':target['id']},'Activated saved geometry without rebuilding',time.perf_counter())
            job.update(status='restored',restored_job_id=target['id'],message='Previous version restored. Subsequent edits use that version.');return
        affirm=bool(re.fullmatch(r'\s*(?:yes(?:[, ]+(?:please|build|go ahead|that is right|that\'s right|build it))?|confirm|confirmed|build it|build this concept|go ahead)[.!]?\s*',req.description,re.I))
        confirmation_id=req.confirm_job_id or (uuid.UUID(latest['id']) if affirm and latest.get('proposed_spec') and latest['status']=='clarification' else None)
        if req.edit_length_delta_mm is not None:
            if not current['spec']: raise ValueError('Generate a part before applying a relative edit.')
            if current['spec'].get('part_type')=='assembly':raise ValueError('Use a component edit for concept assemblies rather than a whole-part length delta.')
            proposed=dict(current['spec']); proposed['length_mm']+=req.edit_length_delta_mm; spec=parse_spec(proposed)
            message='Applied the explicit length delta; other dimensions were preserved.'
        elif req.spec:
            spec=req.spec; message='Generated from explicit structured inputs.'
        elif confirmation_id:
            proposal=get_job(confirmation_id)
            if proposal['session_id']!=job['session_id']:raise ValueError('This proposal belongs to another design.')
            if proposal.get('base_version_id')!=current['job_id']:raise ValueError('The model changed after this proposal. Request a new proposal before building.')
            if latest.get('id')!=proposal['id']:raise ValueError('That proposal has been superseded. Review the latest requirements before building.')
            if not proposal.get('proposed_spec') or proposal['status']!='clarification':raise ValueError('There is no pending concept proposal to confirm.')
            spec=parse_spec(proposal['proposed_spec']);job['workflow']='concept';job['confirmed_proposal_id']=proposal['id']
            message='Built the concept you explicitly confirmed.'
        elif config()['mode']=='DEMO_MODE':
            job.update(status='clarification',message='DEMO_MODE does not interpret chat. Use the dimension form or explicit length delta.'); return
        else:
            if workflow=='concept':
                question=concept_clarification(req.description,working_spec,context)
                if question:
                    from backend.requirements import clarification_help
                    help=clarification_help(req.description,working_spec,context)
                    emit('clarify_request',{'workflow':'concept'},question,time.perf_counter());job.update(status='clarification',message=question,clarification=help);return
            require_free_tier()
            if workflow=='concept':
                versions=[{'id':v['id'],'name':v.get('spec',{}).get('name',v.get('spec',{}).get('part_type'))} for v in session_jobs(job['session_id']) if v['status']=='succeeded']
                spec,message=interpret(req.description,working_spec,routing,emit,context=context,scene=True,selected_id=req.selected_component_id,selection_only=req.selection_only,versions=versions,provisional=bool(pending))
            else:spec,message=interpret(req.description,current['spec'],routing,emit,context=context)
            if isinstance(spec,RestoreAction):
                target=activate_version(job['session_id'],spec.version_id)
                emit('restore_version',{'version_id':target['id']},'Activated saved geometry without rebuilding',time.perf_counter())
                job.update(status='restored',restored_job_id=target['id'],message=message);return
            if spec is None: job.update(status='clarification',message=message); return
            if isinstance(spec,SceneSpec):
                from backend.brief import concept_brief,brief_message
                brief=concept_brief(spec,req.description,context,previous_spec=working_spec);emit('propose_concept',{'components':len(spec.components)},brief,time.perf_counter())
                job.update(status='clarification',message=brief_message(brief),proposed_spec=spec.model_dump(),brief=brief)
                if pending:job['revises_proposal_id']=pending['id']
                return
        start=time.perf_counter(); spec=parse_spec(spec.model_dump()); emit('validate_scene' if isinstance(spec,SceneSpec) else 'validate_spec',spec.model_dump(),'passed',start)
        folder=DATA/job['id']; folder.mkdir(); (folder/'spec.json').write_text(spec.model_dump_json(),encoding='utf-8')
        start=time.perf_counter()
        process=subprocess.run([sys.executable,'-m','backend.cad',str(folder/'spec.json')],cwd=ROOT,capture_output=True,text=True,timeout=60)
        if process.returncode: raise ValueError('CAD worker failed: '+process.stderr[-1200:])
        emit('build_scene' if isinstance(spec,SceneSpec) else 'build_part',{'components':len(spec.components)} if isinstance(spec,SceneSpec) else spec.model_dump(),'STEP, STL, GLB and CAD tessellation generated' if isinstance(spec,SceneSpec) else 'STEP and STL generated',start)
        start=time.perf_counter(); inspection=json.loads((folder/'inspection.json').read_text(encoding='utf-8')); emit('inspect_artifact',{'job_id':job['id']},inspection,start)
        if not all(inspection['checks'].values()): raise ValueError('Geometry inspection failed')
        changes=[]
        if isinstance(spec,SceneSpec):
            before={c['id']:c for c in (current['spec'] or {}).get('components',[])};after={c.id:c.model_dump(mode='json') for c in spec.components}
            changes=[f'{len(after.keys()-before.keys())} components added',f'{len(before.keys()-after.keys())} components removed',f'{sum(before[k]!=after[k] for k in before.keys() & after.keys())} components updated']
        elif current['spec']:
            for key,value in spec.model_dump().items():
                old=current['spec'].get(key)
                if old!=value:
                    label=key.removesuffix('_mm').replace('_',' ').capitalize()
                    unit=' mm' if key.endswith('_mm') else ''
                    changes.append(f'{label}: {old:g} → {value:g}{unit}' if isinstance(old,(int,float)) and isinstance(value,(int,float)) and not isinstance(value,bool) else f'{label}: {old if old is not None else "default"} → {value}{unit}')
        artifacts.publish(DB,job['id'],folder)
        with db() as c:version_number=1+c.execute("SELECT count(*) FROM jobs WHERE json_extract(payload,'$.session_id')=? AND json_extract(payload,'$.status')='succeeded'",(job['session_id'],)).fetchone()[0]
        job.update(status='succeeded',spec=spec.model_dump(),inspection=inspection,message=message,changes=changes,base_version_id=current['job_id'],version_number=version_number)
        # Publish the accepted specification and successful job atomically.
        with db() as c:
            c.execute('INSERT OR REPLACE INTO jobs VALUES (?,?)',(job['id'],json.dumps(job)))
            c.execute('UPDATE sessions SET spec=?,job=? WHERE id=?',(spec.model_dump_json(),job['id'],job['session_id']))
    except Exception as exc:
        job.update(status='failed',message=str(exc)[:2000])
    finally:
        save(job)
        with lock: active.discard(job['session_id'])
        slots.release()
@app.get('/api/jobs/{jid}')
def get_job(jid:uuid.UUID):
    with db() as c: row=c.execute('SELECT payload FROM jobs WHERE id=?',(str(jid),)).fetchone()
    if not row: raise HTTPException(404,'Unknown job')
    return json.loads(row[0])
@app.get('/api/artifacts/{jid}/{ext}')
def artifact(jid:uuid.UUID,ext:Literal['step','stl','glb','scene']):
    job=get_job(jid)
    if job['status']!='succeeded': raise HTTPException(409,'Artifact is not accepted')
    file=DATA/str(jid)/('scene.json' if ext=='scene' else f'part.{ext}')
    try:artifacts.materialize(DB,str(jid),file.parent,[file.name])
    except ValueError as exc:raise HTTPException(503,str(exc)) from None
    if not file.is_file():raise HTTPException(404,'This export format is not available for this model.')
    return FileResponse(file,filename=f'sketchless-{jid}.json' if ext=='scene' else f'sketchless-{jid}.{ext}')
# Interrupted work cannot be resumed after restart; accepted sessions stay intact.
with db() as c:
    for jid,payload in c.execute('SELECT id,payload FROM jobs').fetchall():
        j=json.loads(payload)
        if j['status'] in ('queued','generating'):
            j.update(status='failed',message='Server restarted. Please retry.'); c.execute('UPDATE jobs SET payload=? WHERE id=?',(json.dumps(j),jid))
if (ROOT/'frontend/dist').exists(): app.mount('/',StaticFiles(directory=ROOT/'frontend/dist',html=True),name='frontend')
