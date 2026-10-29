"""Disposable Linux Docker verification; never reads keys or personal storage."""
import json
import os
from pathlib import Path
import subprocess
import threading
import time
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parents[1]


def main():
    name = 'sketchless-check-' + uuid.uuid4().hex[:10]
    volume = name + '-data'
    memory = os.getenv('SKETCHLESS_CHECK_MEMORY', '640m')
    cpus = os.getenv('SKETCHLESS_CHECK_CPUS', '1')
    report = {'provider_calls': 0, 'passed': False, 'peak_container_bytes': 0,
              'limits': {'container_memory': memory, 'cpu': cpus, 'swap': 'disabled'}}
    stop = threading.Event()

    def docker(*args):
        return subprocess.check_output(['docker', *args], text=True).strip()

    def sample_memory():
        while not stop.wait(.5):
            try:
                # Linux cgroup high-water mark includes CAD subprocesses, unlike API RSS.
                result = docker('exec', name, 'sh', '-c', 'cat /sys/fs/cgroup/memory.peak 2>/dev/null || echo 0')
                report['peak_container_bytes'] = max(report['peak_container_bytes'], int(result))
            except (subprocess.CalledProcessError, ValueError):
                pass

    try:
        docker('volume', 'create', volume)
        docker('run', '-d', '--name', name, '--memory=' + memory, '--memory-swap=' + memory, '--cpus=' + cpus, '-p', '127.0.0.1::8000',
               '--mount', 'source=' + volume + ',target=/app/data',
               '-e', 'DEMO_MODE=true', '-e', 'SKETCHLESS_DEPLOYMENT_MODE=local', 'sketchless:check')
        port = docker('port', name, '8000/tcp').rsplit(':', 1)[1]
        base = 'http://127.0.0.1:' + port

        def request(path, body=None, raw=False):
            data = None if body is None else json.dumps(body).encode()
            req = urllib.request.Request(base + path, data=data, headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=30) as response:
                content = response.read()
                return content if raw else json.loads(content)

        def ready():
            for _ in range(90):
                try:
                    request('/healthz')
                    return
                except (OSError, ValueError):
                    time.sleep(1)
            raise RuntimeError('Container health check timed out.')

        def build(sid, **action):
            started = time.monotonic()
            job = request('/api/jobs', {'session_id': sid, **action})
            while time.monotonic() - started < 180:
                job = request('/api/jobs/' + job['id'])
                if job['status'] == 'succeeded':
                    return job, round(time.monotonic() - started, 3)
                if job['status'] not in ('queued', 'generating'):
                    raise RuntimeError('CAD job did not succeed: ' + job['status'])
                time.sleep(.5)
            raise RuntimeError('CAD job timed out.')

        ready()
        thread = threading.Thread(target=sample_memory, daemon=True)
        thread.start()
        sessions = []
        for label, relative in [('enclosure', 'spec.json'), ('robot', 'robot/spec.json')]:
            sid = request('/api/sessions', {})['session_id']
            spec = json.loads((ROOT / 'examples' / relative).read_text(encoding='utf-8'))
            job, latency = build(sid, spec=spec)
            assert all(job['inspection']['checks'].values())
            step = request('/api/artifacts/' + job['id'] + '/step', raw=True)
            assert step.startswith(b'ISO-10303-21')
            assert len(request('/api/artifacts/' + job['id'] + '/stl', raw=True)) > 84
            if label == 'robot':
                assert request('/api/artifacts/' + job['id'] + '/glb', raw=True)[:4] == b'glTF'
            request('/api/sessions/' + sid + '/name', {'name': 'Container ' + label})
            report[label + '_seconds'] = latency
            sessions.append((sid, job['id']))
        sid, original = sessions[0]
        edited, latency = build(sid, edit_length_delta_mm=12)
        assert edited['spec']['length_mm'] == 112
        request('/api/sessions/' + sid + '/restore', {'job_id': original})
        assert request('/api/sessions/' + sid)['job_id'] == original
        report['edit_seconds'] = latency
        docker('restart', name)
        # Docker may allocate a new ephemeral host port when a container restarts.
        port = docker('port', name, '8000/tcp').rsplit(':', 1)[1]
        base = 'http://127.0.0.1:' + port
        ready()
        for sid, jid in sessions:
            assert request('/api/sessions/' + sid)['job_id'] == jid
            assert request('/api/artifacts/' + jid + '/step', raw=True).startswith(b'ISO-10303-21')
        report['restart_restoration'] = True
        report['passed'] = True
    finally:
        stop.set()
        docker('rm', '-f', name)
        docker('volume', 'rm', volume)
        (ROOT / 'container-report.json').write_text(json.dumps(report, indent=2) + '\n')
        print(json.dumps(report))


if __name__ == '__main__':
    main()
