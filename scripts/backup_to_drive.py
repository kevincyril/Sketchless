"""Verified cloud backup to owner-private Drive; only eight app-tagged archives retained."""
import hashlib
import json
import os
from pathlib import Path
import tempfile
from datetime import datetime, timezone
from urllib.parse import urlsplit
import requests
from scripts.backup_verified import verified_backup

API = 'https://www.googleapis.com/drive/v3/files'
TAG = {'sketchless_backup': 'v1'}


def upload_verified(archive, credentials, folder, keep=8):
    if not 1 <= keep <= 52:
        raise ValueError('Invalid retention count.')
    session = requests.Session()
    token = session.post('https://oauth2.googleapis.com/token', data={
        'client_id': credentials['client_id'], 'client_secret': credentials['client_secret'],
        'refresh_token': credentials['refresh_token'], 'grant_type': 'refresh_token'}, timeout=30)
    token.raise_for_status()
    session.headers['Authorization'] = 'Bearer '+token.json()['access_token']

    def call(method, url, **kwargs):
        response = session.request(method, url, timeout=120, allow_redirects=False, **kwargs)
        response.raise_for_status()
        if response.status_code >= 300:
            raise ValueError('Unexpected Drive redirect.')
        return response

    metadata = call('GET', API+'/'+folder, params={'fields': 'id,mimeType,shared,ownedByMe'}).json()
    if metadata.get('mimeType') != 'application/vnd.google-apps.folder' or metadata.get('shared') is not False or metadata.get('ownedByMe') is not True:
        raise ValueError('Backup folder must be owned by this account and unshared.')
    archive = Path(archive)
    digest = hashlib.sha256()
    with archive.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024**2), b''):
            digest.update(chunk)
    started = call('POST', 'https://www.googleapis.com/upload/drive/v3/files',
        params={'uploadType': 'resumable', 'fields': 'id'},
        headers={'X-Upload-Content-Type': 'application/zip', 'X-Upload-Content-Length': str(archive.stat().st_size)},
        json={'name': archive.name, 'parents': [folder], 'appProperties': TAG})
    location = started.headers['Location']
    parsed = urlsplit(location)
    if parsed.scheme != 'https' or parsed.netloc != 'www.googleapis.com' or not parsed.path.startswith('/upload/drive/v3/'):
        raise ValueError('Unexpected upload endpoint.')
    with archive.open('rb') as stream:
        uploaded = call('PUT', location, data=stream, headers={'Content-Type': 'application/zip', 'Content-Length': str(archive.stat().st_size)}).json()
    file_id = uploaded['id']
    remote = hashlib.sha256()
    size = 0
    with call('GET', API+'/'+file_id, params={'alt': 'media'}, stream=True) as response:
        for chunk in response.iter_content(1024**2):
            size += len(chunk)
            if size > archive.stat().st_size:
                raise ValueError('Uploaded archive exceeds expected size.')
            remote.update(chunk)
    if size != archive.stat().st_size or remote.digest() != digest.digest():
        raise ValueError('Uploaded backup checksum mismatch; existing backups retained.')
    call('PATCH', API+'/'+file_id, json={'appProperties': {**TAG, 'verified': 'true'}})
    # Only this OAuth app's tagged ZIPs in the dedicated folder are eligible.
    files = []
    page = None
    while True:
        params = {'q': "'"+folder+"' in parents and trashed = false and appProperties has { key='sketchless_backup' and value='v1' } and appProperties has { key='verified' and value='true' }",
                  'fields': 'nextPageToken,files(id,name,createdTime,ownedByMe)', 'pageSize': 100,
                  'orderBy': 'createdTime desc'}
        if page:
            params['pageToken'] = page
        result = call('GET', API, params=params).json()
        files.extend(result.get('files', []))
        page = result.get('nextPageToken')
        if not page:
            break
    candidates = [f for f in files if f.get('ownedByMe') is True and f.get('name','').startswith('sketchless-') and f['name'].endswith('.zip')]
    if not any(f['id'] == file_id for f in candidates):
        raise ValueError('Uploaded backup not visible; retention was not applied.')
    # Always keep the just-verified upload, including when timestamps tie.
    older = [f for f in candidates if f['id'] != file_id]
    for item in older[keep-1:]:
        call('DELETE', API+'/'+item['id'])
    return {'uploaded_and_download_verified': True, 'bytes': size, 'retention': keep}


def main():
    try:
        if os.getenv('BACKUP_FREE_PLANS_CONFIRMED') != 'true':
            raise ValueError('Free-plan check is required.')
        credentials = json.loads(os.environ['GOOGLE_DRIVE_OAUTH_JSON'])
        folder = os.environ['GOOGLE_DRIVE_FOLDER_ID']
        if not folder.replace('-','').replace('_','').isalnum():
            raise ValueError('Invalid Drive folder ID.')
        with tempfile.TemporaryDirectory(prefix='sketchless-offsite-') as directory:
            root = Path(directory)
            runtime = root/'runtime.env'
            runtime.write_text(os.environ['SKETCHLESS_BACKUP_ENV'], encoding='utf-8')
            runtime.chmod(0o600)
            archive = root/('sketchless-'+datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')+'.zip')
            local = verified_backup(runtime, archive)
            remote = upload_verified(archive, credentials, folder)
        print(json.dumps({'successful_versions': local['successful_versions'], **remote}))
    except Exception:
        raise SystemExit('Offsite backup failed; inspect account access and private configuration. Existing backups are retained unless a new upload has already been verified. No credentials or provider response bodies were printed.') from None


if __name__ == '__main__':
    main()
