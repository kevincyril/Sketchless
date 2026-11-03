"""Compatibility entry point for the current development feature acceptance runner.

The earlier preflight-only snapshot is retained in docs/acceptance-v2-results.json.
"""
from scripts.evaluate_features import main

if __name__=="__main__":
    main()
