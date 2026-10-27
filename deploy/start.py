"""Single-process container entrypoint; never print environment secrets."""
import os
from pathlib import Path
import sys
import tempfile


def main():
    try:
        port=int(os.getenv('PORT','8000'))
        if not 1<=port<=65535:raise ValueError
    except ValueError:
        raise SystemExit('PORT must be an integer between 1 and 65535.') from None
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
