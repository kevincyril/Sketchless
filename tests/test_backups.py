import hashlib,json,shutil,sqlite3,uuid,zipfile
from pathlib import Path
import pytest
from scripts.backup_data import backup,restore


@pytest.fixture
def data(tmp_path):
 source=tmp_path/'source';source.mkdir();sid=str(uuid.uuid4());jid=str(uuid.uuid4());folder=source/jid;folder.mkdir()
 for name in ('spec.json','inspection.json','part.step','part.stl'):shutil.copyfile(Path('examples')/name,folder/name)
 spec=json.loads((folder/'spec.json').read_text());inspection=json.loads((folder/'inspection.json').read_text())
 job={'id':jid,'session_id':sid,'status':'succeeded','spec':spec,'inspection':inspection,'base_version_id':None,'version_number':1}
 with sqlite3.connect(source/'sketchless.sqlite3') as db:
  db.execute('CREATE TABLE sessions(id TEXT PRIMARY KEY,spec TEXT,job TEXT,name TEXT,owner TEXT)')
  db.execute('CREATE TABLE jobs(id TEXT PRIMARY KEY,payload TEXT)')
  db.execute('INSERT INTO sessions VALUES (?,?,?,?,?)',(sid,json.dumps(spec),jid,'Private design',hashlib.sha256(('X'*43).encode()).hexdigest()))
  db.execute('INSERT INTO jobs VALUES (?,?)',(jid,json.dumps(job)))
 (source/'.env').write_text('PRIVATE_TEST_KEY=must-not-be-in-archive')
 return source,sid,jid


def test_backup_is_consistent_private_and_restores_models(data,tmp_path):
 source,sid,jid=data;archive=tmp_path/'snapshot.zip';manifest=backup(source,archive)
 with zipfile.ZipFile(archive) as file:
  assert '.env' not in file.namelist()
  assert all('must-not-be-in-archive' not in file.read(name).decode(errors='ignore') for name in file.namelist())
  assert manifest['successful_versions']==1
 with sqlite3.connect(source/'sketchless.sqlite3') as db:db.execute('UPDATE sessions SET name=? WHERE id=?',('Changed after snapshot',sid))
 target=tmp_path/'recovered';restore(archive,target)
 with sqlite3.connect(target/'sketchless.sqlite3') as db:assert db.execute('SELECT name,job FROM sessions').fetchone()==('Private design',jid)
 assert (target/jid/'part.step').read_bytes()==(source/jid/'part.step').read_bytes()
 with pytest.raises(ValueError,match='already exists'):backup(source,archive)
 with pytest.raises(ValueError,match='empty directory'):restore(archive,target)


def test_corrupt_archive_fails_without_populating_target(data,tmp_path):
 source,_,jid=data;archive=tmp_path/'good.zip';backup(source,archive)
 broken=tmp_path/'broken.zip'
 with zipfile.ZipFile(archive) as original,zipfile.ZipFile(broken,'w') as output:
  for name in original.namelist():output.writestr(name,b'corrupted' if name==jid+'/part.step' else original.read(name))
 target=tmp_path/'target'
 with pytest.raises(ValueError,match='integrity'):restore(broken,target)
 assert not target.exists()


@pytest.mark.parametrize('name',['../outside.txt','/outside.txt','a/../../outside.txt','C:/outside.txt','a\\..\\outside.txt','.env'])
def test_unsafe_backup_paths_rejected(tmp_path,name):
 archive=tmp_path/'unsafe.zip'
 files={'sketchless.sqlite3':{'bytes':1,'sha256':'x'},name:{'bytes':1,'sha256':'x'}}
 with zipfile.ZipFile(archive,'w') as output:
  output.writestr('manifest.json',json.dumps({'format':'sketchless-backup','version':1,'files':files}))
  for key in files:output.writestr(key,'x')
 with pytest.raises(ValueError):restore(archive,tmp_path/'target')
 assert not (tmp_path/'target').exists()


def test_restored_private_design_is_available_in_a_fresh_process(data,tmp_path):
 import os,subprocess,sys
 source,sid,jid=data;archive=tmp_path/'snapshot.zip';backup(source,archive);target=tmp_path/'recovered';restore(archive,target)
 code="""
import os
from fastapi.testclient import TestClient
from backend import app as server
with TestClient(server.app,base_url='https://testserver') as client:
 client.cookies.set('__Host-sketchless-visitor','X'*43)
 assert client.get('/api/sessions/'+os.environ['TEST_SID']).json()['job_id']==os.environ['TEST_JID']
 assert client.get('/api/artifacts/'+os.environ['TEST_JID']+'/step').status_code==200
server.pool.shutdown(wait=True)
print('Restored private CAD and ownership verified in a fresh backend process.')
"""
 result=subprocess.run([sys.executable,'-c',code],env=dict(os.environ,SKETCHLESS_DATA_DIR=str(target),SKETCHLESS_PUBLIC_MODE='true',DEMO_MODE='true',TEST_SID=sid,TEST_JID=jid),capture_output=True,text=True,timeout=30)
 assert result.returncode==0,result.stdout+result.stderr
