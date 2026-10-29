# Public deployment and recovery

Current live workspace: **https://sketchless-cad-7931c5be.onrender.com/**. It runs on Render Free with private Neon PostgreSQL/object storage. See the [current hosting runbook](strictly-free-hosting.md) and [actual hosted checks](hosted-verification.json). The VM instructions below remain an alternative; no Azure VM, disk or public IP was provisioned.

Published gallery: **https://kevincyril.github.io/Sketchless/**. It was anonymously checked for all five STEP downloads, no JavaScript errors, no API requests and a mobile layout without horizontal overflow.

The saved-example gallery is independent of Python, Gemini and Azure. Build with `npm --prefix frontend run build:gallery` and publish **only `frontend/gallery-dist/`**. It contains five public example designs, actual CAD meshes and downloads. It does not generate designs. An optional build-time `VITE_LIVE_WORKSPACE_URL` can link to a separately verified HTTPS workspace. No key belongs in a Vite variable. The main workspace also offers this gallery if its API cannot be reached.

## Live workspace configuration

No Azure resource or persistent cloud disk has been verified. The Linux image passed the isolated container check linked below. The container entrypoint defaults to public mode and refuses startup without public isolation, an HTTPS origin and a persistent-storage confirmation. `deploy/public.env.example` lists nonsecret settings. Supply `GEMINI_API_KEY` separately through backend secret settings; never upload a local `.env`. Enable live Gemini only with `DEMO_MODE=false` and `GEMINI_FREE_TIER_CONFIRMED=true`, after confirming the project has no billing linked. The model remains configurable. No paid fallback is implemented.

Serve the browser and API at the same HTTPS origin. Use one ASGI worker and one instance, backed by a persistent **local/block disk** or Docker named volume. SQLite and local artifacts are not a horizontally scalable or generic network-filesystem architecture. Do not assume an Azure Files SMB mount is suitable. The confirmation flag attests that storage was provisioned; it does not create it. Put backups outside the live data directory. Use a trusted reverse proxy; do not configure wildcard trusted forwarding headers. Network limits use the ASGI client address; an unconfigured proxy may conservatively group visitors together.

Public mode uses a random HttpOnly/Secure/SameSite browser cookie, stores its hash with sessions and filters private sessions, jobs and exports by ownership. Earlier ownerless local sessions stay hidden in public mode. This is anonymous browser isolation, not user accounts: clearing cookies loses access. Export design JSON for portability. Conversation and current design context go to Gemini when you send a live request; prompts and designs persist on the host. Do not submit sensitive material to a public portfolio demo.

## Bounded usage

The SQLite database durably reserves model calls before each actual SDK request, including repair attempts. Defaults: 20 total Gemini calls per UTC day, five per browser per day and three per network per minute. These are application budgets, **not a guarantee of Google's remaining quota**. A provider 429 pauses new Gemini calls globally for five minutes without automatic retry. Existing downloads, saved examples and version restoration remain available. Session and job creation also have separate limits. Storage admission stops new work at a configurable threshold (512 MiB by default); a single in-flight build can exceed that threshold. Anonymous controls reduce abuse, but do not provide account-level authentication or a full denial-of-service defense.

## Backup and recovery

From the repository, with Python dependencies installed:

```powershell
.\.venv\Scripts\python -m scripts.backup_data create --data-dir data --output backups/designs.zip
.\.venv\Scripts\python -m scripts.backup_data restore backups/designs.zip --target data-restored
```

The tool snapshots SQLite and successful immutable CAD artifacts, hashes archive members and excludes environment files and unrelated data. ZIPs contain **private prompts and designs**: retain them privately outside the repository. Failed/in-flight artifact directories are not retained. Restoration rejects unsafe/corrupt archives and requires a new or empty target; it never replaces live data. Stop the app, verify the restored data, then point `SKETCHLESS_DATA_DIR` at it and restart. Keep the old directory until recovery is checked. Browser ownership survives in the database, but access still requires the original cookie. Portable design JSON can rebuild without that cookie or any model call.

Restarts preserve accepted models, history, ownership and budgets when the disk persists. In-flight generation is interrupted and is not resumed automatically. `/healthz` checks the API/database only, not Gemini or CAD readiness.

## Alternative VM release checklist

1. Confirm eligible free resources and account spending controls; do not silently enable paid billing.
2. Build the Linux image, measure CAD memory and verify an actual STEP/STL/GLB build.
3. Mount persistent local storage and test restart plus backup/restore on the host.
4. Configure HTTPS, public origin, private Gemini secret and conservative budgets.
5. Verify two-browser isolation, quota messaging, description-to-CAD, selected-component editing and restoration on the hosted service.
6. Link the verified workspace from the gallery and README. Keep saved examples available during provider quota exhaustion.

Docker remains unavailable on the Windows machine. The [Linux runner check](https://github.com/kevincyril/Sketchless/actions/runs/40788052590) built the image and passed actual enclosure/robot CAD, exports, edits, restoration and named-volume persistence across restart with no Gemini calls. Measured peak container memory was 372,973,568 bytes (355.7 MiB), under a 2 GiB/one-CPU test cap. This is a sequential sample workload, not a concurrent-load guarantee or a measurement of host OS/build/proxy overhead. [Raw report](linux-container-report.json). Hosted Azure persistence, HTTPS and live Gemini access remain pending.

A subsequent [640 MiB / no-swap Linux check](linux-container-small-report.json) also passed the same CAD/export/edit/restore/restart workflow. Public-mode startup now uses one CAD worker, with local-mode worker behavior preserved; 20 deployment/public-access tests passed. The generic [VM template](../deploy/azure-vm.json) and [host bootstrap](../deploy/bootstrap-vm.sh) are prepared. They do not by themselves establish a running cloud deployment.
