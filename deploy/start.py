"""Single-process container entrypoint; never print environment secrets."""
import os
from pathlib import Path
import sys
import tempfile
from urllib.parse import urlsplit


def main():
    try:
        port=int(os.getenv('PORT','8000'))
        if not 1<=port<=65535:raise ValueError
    except ValueError:
        raise SystemExit('PORT must be an integer between 1 and 65535.') from None
    mode=os.getenv('SKETCHLESS_DEPLOYMENT_MODE','public')
    public=os.getenv('SKETCHLESS_PUBLIC_MODE','false').lower()=='true'
    if mode not in ('public','local'):raise SystemExit('SKETCHLESS_DEPLOYMENT_MODE must be public or local.')
    if mode=='public' and not public:raise SystemExit('Public deployment requires SKETCHLESS_PUBLIC_MODE=true. Use local mode only with a loopback host port.')
    if public:
        origin=urlsplit(os.getenv('SKETCHLESS_PUBLIC_ORIGIN',''))
        if origin.scheme!='https' or not origin.netloc or origin.username or origin.path not in ('','/') or origin.query or origin.fragment:
            raise SystemExit('Public deployment requires SKETCHLESS_PUBLIC_ORIGIN set to its HTTPS origin.')
        if os.getenv('SKETCHLESS_STORAGE_MODE','local')=='neon':
            sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
            from backend.persistence import validate_config
            validate_config()
        elif os.getenv('SKETCHLESS_PERSISTENT_STORAGE_CONFIRMED','false').lower()!='true':
            raise SystemExit('Confirm a persistent local disk/volume before public deployment: SKETCHLESS_PERSISTENT_STORAGE_CONFIRMED=true. This flag does not create storage.')
    folder=Path(os.getenv('SKETCHLESS_DATA_DIR','/app/data'))
    try:
        folder.mkdir(parents=True,exist_ok=True)
        with tempfile.TemporaryFile(dir=folder) as check:check.write(b'ok')
    except OSError:
        raise SystemExit('The design storage folder is not writable. Check the mounted volume permissions for UID 10001.') from None
    # Queue limits, active sessions and SQLite coordination currently require ONE ASGI worker.
    os.execv(sys.executable,[sys.executable,'-m','uvicorn','backend.app:app',
        '--host','0.0.0.0','--port',str(port),'--workers','1','--no-access-log'])


if __name__=='__main__':main()
