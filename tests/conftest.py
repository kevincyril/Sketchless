"""Keep test jobs and startup recovery separate from the developer's active sessions."""
import os
import tempfile
from pathlib import Path
os.environ['SKETCHLESS_PUBLIC_MODE']='false'
os.environ['SKETCHLESS_STORAGE_MODE']='local'
os.environ['SKETCHLESS_DATA_DIR']=str(Path(tempfile.mkdtemp(prefix='sketchless-tests-')))

import pytest
@pytest.fixture(autouse=True)
def offline_gemini_defaults(monkeypatch):
    # Tests never use local credentials or permit ambient paid/Vertex configuration.
    monkeypatch.setenv('GEMINI_API_KEY','offline-test-placeholder')
    monkeypatch.setenv('GEMINI_FREE_TIER_CONFIRMED','true')
    monkeypatch.setenv('GEMINI_MODEL','gemini-3.5-flash-lite')
