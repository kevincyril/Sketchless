"""Public deployment provenance, limited to version IDs and source fingerprints."""
import hashlib
import os
from pathlib import Path

MODELING_CONTRACT_VERSION = 2
_files = ('app.py','agent.py','requirements.py','measurements.py','scene_review.py','scene_schema.py','brief.py','concepts.py')
_root = Path(__file__).parent
MODELING_SOURCE_DIGEST = hashlib.sha256(b''.join((_root/name).read_bytes() for name in _files)).hexdigest()[:16]
BUILD_REVISION = os.getenv('RENDER_GIT_COMMIT', os.getenv('SKETCHLESS_BUILD_REVISION', 'local')).strip()[:64]
