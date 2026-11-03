# Operations and recovery

Run one readiness check before sharing the demo or after a release:

```powershell
.\.venv\Scripts\python -m scripts.check_service https://sketchless-cad-7931c5be.onrender.com
```

This reads health, public configuration and the gallery once, with no Gemini calls or new visitor sessions. Health covers the database, not geometry or provider readiness. The first request can take a minute while the free service wakes. Do not schedule frequent keep-alive traffic to defeat free-host sleeping. Use provider incident notifications for continuous outage awareness.

Create a private backup and verify an isolated local restore:

```powershell
.\.venv\Scripts\python -m scripts.backup_verified --runtime-env data/hosting-runtime.env --output backups/cloud-YYYYMMDD.zip
```

Use a unique filename each time. The command never overwrites archives, changes the live database or calls Gemini. It verifies every member checksum and SQLite integrity through the existing restore tool, then removes its temporary restore directory. It cannot restore cloud ownership without the original browser cookies. Backups contain conversations and designs; keep them private and copy them to an owner-controlled location outside this machine. An archive on this machine alone is not disaster recovery.

Run a verified backup before releases and weekly while the demo is actively used. A reliable unattended schedule requires a machine that stays on and access to a private off-device destination. Keep cloud credentials only in the private repository Actions secrets, never in workflow source or logs. The private GitHub runner is enabled after Google authorization, verified free allowances and a successful manual backup. It runs Sundays at 03:17 Phoenix time and keeps eight verified archives. See [secure cloud backup setup](cloud-backup-setup.md).

The service uses one worker and a bounded queue. Existing sequential Linux reports are not load guarantees. Do not stress the public free service or consume provider quotas for a load test. Use offline TestClient/browser regression for isolation, contention and preservation, and the existing Linux container workflow for constrained-memory CAD checks.

Release verification requires the full backend suite, frontend build, browser suite, Linux container CI, and a fresh one-shot hosted readiness check after deployment. Keep frozen v1 benchmark evidence tied to its original implementation. The user acceptance v2 assessment reports capability gaps separately from completed geometry.

The offline admission-burst regression sends sixteen requests concurrently: four are admitted, twelve receive queue-full responses, a same-session duplicate is refused, and capacity recovers after simulated CAD failures. It uses no model calls or public-service load and does not establish production throughput.
