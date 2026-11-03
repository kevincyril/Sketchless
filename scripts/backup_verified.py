"""Create a private cloud backup and prove it restores into an isolated directory."""
import argparse
import json
from pathlib import Path
import tempfile
from dotenv import load_dotenv
from backend import persistence
from scripts.backup_cloud import export_cloud
from scripts.backup_data import restore


def verified_backup(runtime_env, output):
    load_dotenv(runtime_env, override=True)
    persistence.validate_config()
    manifest = export_cloud(output)
    with tempfile.TemporaryDirectory(prefix='sketchless-backup-drill-') as folder:
        recovered = restore(output, Path(folder)/'restored')
        if recovered['files'] != manifest['files']:
            raise ValueError('Restored manifest differs from backup.')
    return {'verified': True, 'successful_versions': manifest['successful_versions'],
            'scope': 'Private archive integrity and isolated local restore; live database unchanged.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime-env', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    try:
        result = verified_backup(args.runtime_env, args.output)
    except Exception:
        raise SystemExit('Verified backup failed. Inspect private configuration, storage access and archive path; existing archives are never overwritten.') from None
    print(json.dumps(result))


if __name__ == '__main__':
    main()
