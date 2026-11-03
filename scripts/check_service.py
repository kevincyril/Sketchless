"""One-shot public readiness check; no model requests, visitor sessions or keep-alive loop."""
import argparse
import json
import time
from urllib.parse import urlsplit
from urllib.request import urlopen


def check(origin, timeout=120):
    parsed = urlsplit(origin)
    if parsed.scheme not in ('http', 'https') or not parsed.netloc or parsed.username or parsed.password or parsed.query or parsed.fragment or parsed.path not in ('', '/'):
        raise ValueError('Supply a plain HTTP(S) origin without credentials or query parameters.')
    results = []
    for path in ('/healthz', '/api/config', '/gallery.html'):
        started = time.monotonic()
        with urlopen(origin.rstrip('/') + path, timeout=timeout) as response:
            body = response.read(1024 * 1024)
            status = response.status
        if status != 200:
            raise ValueError('Service returned an unexpected status.')
        item = {'path': path, 'status': status, 'seconds': round(time.monotonic()-started, 3)}
        if path == '/healthz':
            data = json.loads(body)
            if data.get('service') != 'Sketchless' or data.get('status') != 'ok':
                raise ValueError('Unexpected health response.')
        elif path == '/api/config':
            data = json.loads(body)
            if data.get('name') != 'Sketchless':
                raise ValueError('Unexpected application configuration.')
            item.update({key: data.get(key) for key in ('build_revision', 'modeling_contract_version', 'public_mode', 'ai_configured')})
        elif b'<html' not in body.lower():
            raise ValueError('Gallery did not return HTML.')
        results.append(item)
    return {'passed': True, 'checks': results, 'scope': 'HTTP/database readiness only; no CAD, Gemini or load guarantee.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('origin')
    parser.add_argument('--timeout', type=float, default=120)
    args = parser.parse_args()
    try:
        result = check(args.origin, args.timeout)
    except Exception:
        raise SystemExit('Readiness check failed; inspect service status privately. No response bodies or credentials were printed.') from None
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
