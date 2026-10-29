#!/usr/bin/env bash
# Generic host setup; no keys, account identifiers or private .env files belong here.
set -euo pipefail
if [[ $EUID -ne 0 || $# -ne 2 ]]; then
  echo 'Run as root with: bootstrap-vm.sh <40-character source commit> <Azure DNS hostname>' >&2
  exit 2
fi
revision=$1
hostname=$2
[[ $revision =~ ^[0-9a-f]{40}$ ]] || exit 2
[[ $hostname =~ ^[a-z0-9-]+\.[a-z0-9]+\.cloudapp\.azure\.com$ ]] || exit 2
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq docker.io caddy git
systemctl enable --now docker
install -d -m 700 /etc/sketchless
if [[ ! -d /opt/sketchless/.git ]]; then
  git clone https://github.com/kevincyril/Sketchless.git /opt/sketchless
fi
git -C /opt/sketchless fetch origin main
git -C /opt/sketchless checkout --detach "$revision"
docker build -t sketchless:release /opt/sketchless
docker volume create sketchless-data >/dev/null
# The private runtime.env is supplied separately, root-readable only. Never echo it.
cat >/etc/systemd/system/sketchless.service <<'UNIT'
[Unit]
Description=Sketchless bounded CAD service
After=docker.service network-online.target
Requires=docker.service
[Service]
Restart=always
RestartSec=10
TimeoutStartSec=120
TimeoutStopSec=45
ExecStartPre=-/usr/bin/docker rm -f sketchless
ExecStart=/usr/bin/docker run --rm --name sketchless --memory=640m --memory-swap=640m --cpus=1 --pids-limit=256 --cap-drop=ALL --security-opt=no-new-privileges --env-file=/etc/sketchless/runtime.env --mount=source=sketchless-data,target=/app/data -p 127.0.0.1:8000:8000 sketchless:release
ExecStop=/usr/bin/docker stop -t 30 sketchless
[Install]
WantedBy=multi-user.target
UNIT
cat >/etc/caddy/Caddyfile <<CADDY
$hostname {
    encode gzip
    reverse_proxy 127.0.0.1:8000
}
CADDY
caddy validate --config /etc/caddy/Caddyfile
systemctl daemon-reload
# Do not publish the workspace until the private configuration is installed and tested.
echo 'Host prepared. Install the private runtime configuration before starting Sketchless and reloading Caddy.'
