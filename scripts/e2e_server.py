"""Private offline browser-test server: isolated storage and no Gemini transport."""
import argparse
import os
from pathlib import Path
import tempfile


def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--port',type=int,default=8001);args=parser.parse_args()
    root=Path(__file__).resolve().parents[1];(root/'data').mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='browser-e2e-',dir=root/'data') as folder:
        os.environ.update(SKETCHLESS_PUBLIC_MODE='false',SKETCHLESS_DATA_DIR=folder,DEMO_MODE='false',GEMINI_API_KEY='offline-e2e-no-provider',GEMINI_MODEL='gemini-3.5-flash-lite',GEMINI_FREE_TIER_CONFIRMED='true')
        from backend import agent
        def forbidden():raise ValueError('Browser tests must mock interpretation; live Gemini transport is disabled.')
        agent.create_client=forbidden
        from backend import app as server
        import uvicorn
        try:uvicorn.run(server.app,host='127.0.0.1',port=args.port,access_log=False)
        finally:server.pool.shutdown(wait=True)


if __name__=='__main__':main()
