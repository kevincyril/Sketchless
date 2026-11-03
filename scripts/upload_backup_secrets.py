"""Encrypt private setup files to GitHub's repository key; never echo secret values."""
import argparse
import base64
import json
from pathlib import Path
from nacl.public import PublicKey, SealedBox
from scripts.publish_backup_runner import github_session, OWNER, REPO, ROOT
from scripts.configure_drive_backup import Diagnostics


def encrypted_value(public_key, value):
    return base64.b64encode(SealedBox(PublicKey(base64.b64decode(public_key))).encrypt(value.encode())).decode()


def upload(neon_only=False,diagnostics=None):
    diagnostic=diagnostics or Diagnostics(ROOT/'data/backup-setup')
    diagnostic.path=ROOT/'data/backup-setup/backup-secret-upload-diagnostics.json'
    diagnostic.start('github_sign_in')
    session=github_session()
    path='https://api.github.com/repos/'+OWNER+'/'+REPO
    diagnostic.start('repository_privacy')
    response=session.get(path,timeout=30)
    response.raise_for_status()
    if response.json().get('private') is not True:
        raise ValueError('Backup repository must remain private.')
    diagnostic.start('repository_encryption_key')
    key=session.get(path+'/actions/secrets/public-key',timeout=30)
    key.raise_for_status()
    public=key.json()
    folder=ROOT/'data/backup-setup'
    files={'SKETCHLESS_BACKUP_ENV':folder/'backup.env'}
    if not neon_only:
        files.update({'GOOGLE_DRIVE_OAUTH_JSON':folder/'drive-oauth.json','GOOGLE_DRIVE_FOLDER_ID':folder/'drive-folder.txt'})
    # Read all requested files before changing any repository secrets.
    diagnostic.start('private_setup_read')
    values={name:file.read_text(encoding='utf-8').strip() for name,file in files.items()}
    if not all(values.values()):
        raise ValueError('A setup value is empty.')
    if 'GOOGLE_DRIVE_OAUTH_JSON' in values:
        oauth=json.loads(values['GOOGLE_DRIVE_OAUTH_JSON'])
        if not all(oauth.get(key) for key in ('client_id','client_secret','refresh_token')):
            raise ValueError('Incomplete Google offline authorization.')
    for name,value in values.items():
        diagnostic.start('local_secret_encryption')
        encrypted=encrypted_value(public['key'],value)
        diagnostic.start('encrypted_secret_upload')
        response=session.put(path+'/actions/secrets/'+name,
            json={'key_id':public['key_id'],'encrypted_value':encrypted},timeout=30)
        response.raise_for_status()
    diagnostic.report.update(status='passed',stage='complete',explanation='Setup secrets uploaded encrypted. No runner gate was enabled.')
    diagnostic.save()
    print(json.dumps({'secret_names_uploaded':list(values),'schedule_enabled':False,'note':'Secret values were encrypted locally and never printed. Enablement still requires the free-allowance check and a successful first run.'}))


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--neon-only',action='store_true')
    args=parser.parse_args()
    diagnostic=Diagnostics(ROOT/'data/backup-setup')
    diagnostic.path=ROOT/'data/backup-setup/backup-secret-upload-diagnostics.json'
    try:upload(args.neon_only,diagnostic)
    except Exception as error:
        print('Encrypted secret upload failed: '+json.dumps(diagnostic.failure(error)),flush=True)
        raise SystemExit(1) from None
