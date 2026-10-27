"""Private SQLite/artifact backups; restore only into a new empty directory."""
from contextlib import closing
import argparse
from datetime import datetime,timezone
import hashlib
import json
import os
from pathlib import Path,PurePosixPath
import re
import shutil
import sqlite3
import stat
import tempfile
import zipfile

FILES={'spec.json','inspection.json','part.step','part.stl','part.glb','scene.json'}
MAX_BYTES=2*1024**3


def checksum(path):
    digest=hashlib.sha256()
    with Path(path).open('rb') as file:
        for chunk in iter(lambda:file.read(1024**2),b''):digest.update(chunk)
    return digest.hexdigest()


def allowed(name):
    if name=='sketchless.sqlite3':return True
    if '\\' in name or ':' in name:return False
    parts=PurePosixPath(name).parts
    return len(parts)==2 and bool(re.fullmatch(r'[0-9a-f-]{36}',parts[0])) and parts[1] in FILES


def backup(source,output):
    source=Path(source).resolve();output=Path(output).resolve()
    if not (source/'sketchless.sqlite3').is_file():raise ValueError('No Sketchless database found in the source directory.')
    if output.exists():raise ValueError('Backup output already exists; choose a new filename.')
    output.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='sketchless-backup-') as folder:
        snapshot=Path(folder)/'sketchless.sqlite3'
        with closing(sqlite3.connect(f'file:{(source/"sketchless.sqlite3").as_posix()}?mode=ro',uri=True)) as current,closing(sqlite3.connect(snapshot)) as saved:current.backup(saved,pages=64,sleep=.05)
        entries={'sketchless.sqlite3':snapshot}
        with closing(sqlite3.connect(snapshot)) as db,db:
            jobs=[json.loads(row[0]) for row in db.execute("SELECT payload FROM jobs WHERE json_extract(payload,'$.status')='succeeded'")]
        for job in jobs:
            jid=job['id']
            if not re.fullmatch(r'[0-9a-f-]{36}',jid):raise ValueError('Invalid saved artifact ID.')
            directory=source/jid
            if directory.is_symlink() or directory.resolve().parent!=source:raise ValueError('Artifact directory escapes the data directory.')
            required={'spec.json','inspection.json','part.step','part.stl'}|({'part.glb','scene.json'} if job.get('spec',{}).get('part_type')=='assembly' else set())
            for name in required:
                file=directory/name
                if not file.is_file() or file.is_symlink():raise ValueError('A successful version has missing or unsafe artifacts.')
                entries[jid+'/'+name]=file
        if sum(p.stat().st_size for p in entries.values())>MAX_BYTES:raise ValueError('Backup exceeds the 2 GiB tool limit.')
        manifest={'format':'sketchless-backup','version':1,'created_utc':datetime.now(timezone.utc).isoformat(),'successful_versions':len(jobs),'files':{name:{'bytes':p.stat().st_size,'sha256':checksum(p)} for name,p in entries.items()}}
        with output.open('xb') as raw,zipfile.ZipFile(raw,'w',compression=zipfile.ZIP_DEFLATED) as archive:
            archive.writestr('manifest.json',json.dumps(manifest,indent=2))
            for name,file in entries.items():archive.write(file,name)
    return manifest


def restore(archive_path,target):
    target=Path(target).resolve()
    if target.exists() and (not target.is_dir() or any(target.iterdir())):raise ValueError('Restore requires a new or empty directory. Existing data will not be overwritten.')
    with zipfile.ZipFile(archive_path) as archive:
        info=archive.infolist();names=[i.filename for i in info]
        if len(names)!=len(set(names)) or 'manifest.json' not in names:raise ValueError('Duplicate files or missing backup manifest.')
        if archive.getinfo('manifest.json').file_size>1024**2:raise ValueError('Backup manifest is too large.')
        manifest=json.loads(archive.read('manifest.json'))
        if manifest.get('format')!='sketchless-backup' or type(manifest.get('version')) is not int or manifest['version']!=1:raise ValueError('Unsupported backup format.')
        files=manifest.get('files',{})
        if set(files)!=(set(names)-{'manifest.json'}) or 'sketchless.sqlite3' not in files:raise ValueError('Backup file list does not match its manifest.')
        if any(not allowed(name) for name in files):raise ValueError('Backup contains an unexpected or unsafe path.')
        if any(stat.S_ISLNK(i.external_attr>>16) for i in info):raise ValueError('Symlinks are not allowed in a backup.')
        if sum(i.file_size for i in info)>MAX_BYTES:raise ValueError('Backup exceeds the 2 GiB restore limit.')
        with tempfile.TemporaryDirectory(prefix='sketchless-restore-') as folder:
            staging=Path(folder)
            for name,expected in files.items():
                file=staging/name;file.parent.mkdir(parents=True,exist_ok=True);digest=hashlib.sha256();size=0
                with archive.open(name) as source,file.open('xb') as output:
                    for chunk in iter(lambda:source.read(1024**2),b''):
                        size+=len(chunk)
                        if size>expected['bytes'] or size>MAX_BYTES:raise ValueError('Backup file exceeds its declared size.')
                        digest.update(chunk);output.write(chunk)
                if size!=expected['bytes'] or digest.hexdigest()!=expected['sha256']:raise ValueError('Backup integrity check failed.')
            with closing(sqlite3.connect(f'file:{(staging/"sketchless.sqlite3").as_posix()}?mode=ro',uri=True)) as db,db:
                if db.execute('PRAGMA quick_check').fetchone()[0]!='ok':raise ValueError('Restored database failed its integrity check.')
                tables={r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table'")}
                if not {'sessions','jobs'}<=tables:raise ValueError('Backup has no Sketchless session/job tables.')
            target.mkdir(parents=True,exist_ok=True)
            if any(target.iterdir()):raise ValueError('Restore target became nonempty; nothing will be overwritten.')
            for name in files:
                file=target/name;file.parent.mkdir(parents=True,exist_ok=True)
                with (staging/name).open('rb') as source,file.open('xb') as output:shutil.copyfileobj(source,output)
    return manifest


def main():
    parser=argparse.ArgumentParser(description=__doc__);sub=parser.add_subparsers(dest='action',required=True)
    create=sub.add_parser('create');create.add_argument('--data-dir',type=Path,default=Path(os.getenv('SKETCHLESS_DATA_DIR','data')));create.add_argument('--output',type=Path,required=True)
    recover=sub.add_parser('restore');recover.add_argument('archive',type=Path);recover.add_argument('--target',type=Path,required=True)
    args=parser.parse_args()
    try:
        result=backup(args.data_dir,args.output) if args.action=='create' else restore(args.archive,args.target)
    except (ValueError,OSError,sqlite3.Error,zipfile.BadZipFile,KeyError,TypeError):raise SystemExit('Backup operation failed. Check the archive, storage permissions and empty restore target; no existing target files are overwritten.') from None
    print(json.dumps({'operation':args.action,'successful_versions':result['successful_versions'],'note':'Backup contains private designs/conversations. Keep it private; it does not copy .env or configuration keys.'}))


if __name__=='__main__':main()
