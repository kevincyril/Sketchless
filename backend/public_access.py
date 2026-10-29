"""Anonymous browser isolation and durable admission limits for public deployments."""
from contextlib import closing
from contextvars import ContextVar
from dataclasses import dataclass
import hashlib
import os
import re
import secrets
import sqlite3
import time
from pathlib import Path
from fastapi.responses import JSONResponse
from backend import persistence

COOKIE='__Host-sketchless-visitor'
context=ContextVar('sketchless_visitor',default=None)


def enabled():return os.getenv('SKETCHLESS_PUBLIC_MODE','false').lower()=='true'


@dataclass(frozen=True)
class Visitor:
    database:Path
    owner:str
    network:str


def limit(name,default):
    try:
        value=int(os.getenv(name,str(default)))
        if value<1:raise ValueError
        return value
    except ValueError:raise ValueError(name+' must be a positive integer.') from None


def consume(database,rules):
    """Reserve every budget atomically, or reserve none. Counts survive restarts."""
    with closing(persistence.connect(database,timeout=10)) as db,db:
        db.execute('CREATE TABLE IF NOT EXISTS public_usage (kind TEXT, scope TEXT, bucket INTEGER, count INTEGER NOT NULL, PRIMARY KEY(kind,scope,bucket))')
        db.execute('BEGIN IMMEDIATE')
        for kind,scope,bucket,maximum,message in rules:
            row=db.execute('SELECT count FROM public_usage WHERE kind=? AND scope=? AND bucket=?',(kind,scope,bucket)).fetchone()
            if row and row[0]>=maximum:raise ValueError(message)
        for kind,scope,bucket,_,_ in rules:
            db.execute('INSERT INTO public_usage VALUES (?,?,?,1) ON CONFLICT(kind,scope,bucket) DO UPDATE SET count=count+1',(kind,scope,bucket))
        # Windows are epoch-minute or epoch-day numbers. Retain a bounded history.
        db.execute("DELETE FROM public_usage WHERE (kind LIKE '%minute' AND bucket<?) OR (kind NOT LIKE '%minute' AND bucket<?)",(int(time.time()//60)-120,int(time.time()//86400)-31))


def before_model_request():
    if not enabled():return
    visitor=context.get()
    if visitor is None:raise ValueError('Gemini public requests require a visitor context.')
    minute=int(time.time()//60);day=int(time.time()//86400)
    with closing(persistence.connect(visitor.database)) as db,db:
        db.execute('CREATE TABLE IF NOT EXISTS public_pauses (name TEXT PRIMARY KEY, until REAL NOT NULL)')
        pause=db.execute("SELECT until FROM public_pauses WHERE name='gemini'").fetchone()
        if pause and pause[0]>time.time():raise ValueError('Gemini is temporarily paused after a quota error. Try later; samples and existing downloads remain available.')
    consume(visitor.database,[
      ('gemini_day','global',day,limit('SKETCHLESS_AI_DAILY_LIMIT',20),'Gemini demo limit reached for today. Explore the samples or return later; your existing model is unchanged.'),
      ('gemini_day',visitor.owner,day,limit('SKETCHLESS_AI_VISITOR_DAILY_LIMIT',5),'Gemini demo allowance for this browser is used for today. Your saved models and exports remain available.'),
      ('gemini_minute',visitor.network,minute,limit('SKETCHLESS_AI_NETWORK_MINUTE_LIMIT',3),'Gemini demo is receiving too many requests from this network. Wait a minute before trying again.'),
    ])


def pause_on_quota():
    visitor=context.get()
    if not enabled() or visitor is None:return
    with closing(persistence.connect(visitor.database)) as db,db:
        db.execute('CREATE TABLE IF NOT EXISTS public_pauses (name TEXT PRIMARY KEY, until REAL NOT NULL)')
        db.execute("INSERT OR REPLACE INTO public_pauses VALUES ('gemini',?)",(time.time()+limit('SKETCHLESS_AI_QUOTA_COOLDOWN_SECONDS',300),))


def owner_for_request():
    visitor=context.get()
    return visitor.owner if visitor else None


def owns(database,sid,owner):
    with closing(persistence.connect(database)) as db,db:row=db.execute('SELECT owner FROM sessions WHERE id=?',(str(sid),)).fetchone()
    return bool(row and row[0] is not None and secrets.compare_digest(row[0],owner))


def install(app,database):
    @app.middleware('http')
    async def private_browser(request,call_next):
        if not enabled():return await call_next(request)
        if not request.url.path.startswith('/api/'):
            response=await call_next(request)
            response.headers['X-Frame-Options']='DENY'
            response.headers['X-Content-Type-Options']='nosniff'
            response.headers['Referrer-Policy']='same-origin'
            return response
        if request.method not in ('GET','HEAD','OPTIONS'):
            origin=request.headers.get('origin')
            if origin and origin!=os.getenv('SKETCHLESS_PUBLIC_ORIGIN',str(request.base_url).rstrip('/')).rstrip('/'):
                return JSONResponse({'detail':'Open Sketchless directly to make changes.'},status_code=403)
            content=bytearray()
            async for chunk in request.stream():
                if len(content)+len(chunk)>131072:return JSONResponse({'detail':'Request is too large. Use a smaller design.'},status_code=413)
                content.extend(chunk)
            request._body=bytes(content)
        value=request.cookies.get(COOKIE,'')
        if not re.fullmatch(r'[A-Za-z0-9_-]{43}',value):value=secrets.token_urlsafe(32)
        owner=hashlib.sha256(value.encode()).hexdigest()
        # Only trust the ASGI client address, never a user-supplied X-Forwarded-For.
        network=hashlib.sha256((request.client.host if request.client else 'unknown').encode()).hexdigest()
        visitor=Visitor(Path(database()),owner,network)
        token=context.set(visitor)
        try:
            path=request.url.path
            sid=None
            match=re.match(r'^/api/sessions/([^/]+)(?:/|$)',path)
            if match:sid=match[1]
            else:
                match=re.match(r'^/api/(?:jobs|artifacts|designs)/([^/]+)(?:/|$)',path)
                if match and not (path=='/api/designs/validate'):
                    with closing(persistence.connect(visitor.database)) as db,db:row=db.execute('SELECT payload FROM jobs WHERE id=?',(match[1],)).fetchone()
                    sid=__import__('json').loads(row[0]).get('session_id') if row else ''
            if sid is not None and not owns(visitor.database,sid,owner):
                response=JSONResponse({'detail':'Design not found in this browser.'},status_code=404)
            else:
                if request.method=='POST' and path=='/api/sessions':
                    day=int(time.time()//86400)
                    consume(visitor.database,[('session_day',network,day,limit('SKETCHLESS_NETWORK_SESSION_DAILY_LIMIT',30),'This network has started too many designs today. Return later.'),('session_day','global',day,limit('SKETCHLESS_SESSION_DAILY_LIMIT',200),'The demo has reached its daily design limit. Samples remain available.')])
                response=await call_next(request)
        except ValueError as exc:
            response=JSONResponse({'detail':str(exc)},status_code=429,headers={'Retry-After':'60'})
        finally:context.reset(token)
        response.headers['Cache-Control']='no-store'
        response.headers['X-Content-Type-Options']='nosniff'
        response.headers['Referrer-Policy']='same-origin'
        if not request.cookies.get(COOKIE) or request.cookies.get(COOKIE)!=value or request.url.path=='/api/config':
            response.set_cookie(COOKIE,value,httponly=True,secure=True,samesite='lax',max_age=7776000,path='/')
        return response


def admit_job(database,uses_storage=True):
    if not enabled():return
    visitor=context.get()
    if visitor is None:raise ValueError('Public requests require a browser session.')
    minute=int(time.time()//60)
    consume(database,[('jobs_minute',visitor.owner,minute,limit('SKETCHLESS_VISITOR_JOB_MINUTE_LIMIT',5),'Too many design requests. Wait a minute before trying again.'),('jobs_minute',visitor.network,minute,limit('SKETCHLESS_NETWORK_JOB_MINUTE_LIMIT',15),'Too many requests from this network. Wait a minute before trying again.')])
    if not uses_storage:return
    maximum=limit('SKETCHLESS_MAX_DATA_MB',512)*1024**2
    if persistence.remote():
        from backend.artifacts import stored_bytes
        size=stored_bytes(database)
    else:size=sum(p.stat().st_size for p in Path(database).parent.rglob('*') if p.is_file())
    if size>=maximum:raise ValueError('The demo storage allowance is full. Existing designs and downloads remain available; explore the samples instead.')
