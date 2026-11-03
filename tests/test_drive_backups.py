from pathlib import Path
import pytest
from scripts import backup_to_drive as drive


class Response:
    def __init__(self, data=None, content=b'', headers=None):
        self.data=data
        self.content=content
        self.headers=headers or {}
        self.status_code=200
    def raise_for_status(self):pass
    def json(self):return self.data
    def __enter__(self):return self
    def __exit__(self,*args):pass
    def iter_content(self,size):yield self.content


def fake_session(monkeypatch, *, shared=False, corrupt=False):
    calls=[]
    class Session:
        headers={}
        def post(self,url,**kwargs):return Response({'access_token':'test-token'})
        def request(self,method,url,**kwargs):
            calls.append((method,url,kwargs))
            if method=='GET' and url.endswith('/folder'):
                return Response({'mimeType':'application/vnd.google-apps.folder','shared':shared,'ownedByMe':True})
            if method=='POST':
                return Response(headers={'Location':'https://www.googleapis.com/upload/drive/v3/files?upload_id=test'})
            if method=='PUT':
                assert kwargs['data'].read()==b'archive'
                return Response({'id':'new'})
            if method=='GET' and url.endswith('/new'):
                return Response(content=b'bad' if corrupt else b'archive')
            if method=='GET':
                return Response({'files':[{'id':x,'name':'sketchless-'+x+'.zip','ownedByMe':True} for x in ['new']+[str(i) for i in range(9)]]+[
                    {'id':'unrelated','name':'family.zip','ownedByMe':True}]})
            return Response()
    monkeypatch.setattr(drive.requests,'Session',Session)
    return calls


def test_retention_only_after_download_verification(monkeypatch,tmp_path):
    calls=fake_session(monkeypatch)
    archive=tmp_path/'sketchless-test.zip';archive.write_bytes(b'archive')
    result=drive.upload_verified(archive,dict(client_id='test',client_secret='test',refresh_token='test'),'folder')
    deleted=[url.rsplit('/',1)[-1] for method,url,_ in calls if method=='DELETE']
    assert result['uploaded_and_download_verified'] and deleted==['7','8']
    assert any(method=='PATCH' and kwargs['json']['appProperties']['verified']=='true' for method,_,kwargs in calls)
    assert any("key='verified'" in kwargs.get('params',{}).get('q','') for method,_,kwargs in calls)
    assert all('unrelated' not in url for method,url,_ in calls if method=='DELETE')


@pytest.mark.parametrize('shared,corrupt',[(True,False),(False,True)])
def test_shared_destination_or_corrupt_upload_never_deletes_existing_backups(monkeypatch,tmp_path,shared,corrupt):
    calls=fake_session(monkeypatch,shared=shared,corrupt=corrupt)
    archive=tmp_path/'sketchless-test.zip';archive.write_bytes(b'archive')
    with pytest.raises(ValueError):
        drive.upload_verified(archive,dict(client_id='test',client_secret='test',refresh_token='test'),'folder')
    assert not any(method=='DELETE' for method,_,_ in calls)
    assert not any(method=='PATCH' for method,_,_ in calls)


def test_github_secret_payload_is_encrypted():
    pytest.importorskip('nacl.public')
    from nacl.public import PrivateKey, SealedBox
    from scripts.upload_backup_secrets import encrypted_value
    import base64
    private=PrivateKey.generate()
    public=base64.b64encode(bytes(private.public_key)).decode()
    value='test-only-secret-do-not-log'
    encrypted=encrypted_value(public,value)
    assert value not in encrypted
    assert SealedBox(private).decrypt(base64.b64decode(encrypted)).decode()==value
