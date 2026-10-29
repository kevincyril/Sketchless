# Strictly free hosting investigation

Requirement: no credit-consuming Azure VM, disk or public IP, no payment method and no automatic paid upgrade. The prepared Azure VM route is not being provisioned. A successful local/Linux test is not a hosted deployment.

## Deployed route

- Render Free web service: Python/Docker support, 512 MB RAM and 0.1 CPU. Sleeps after 15 minutes idle; an incoming request starts it again, typically in about one minute. Local files are lost on restart/sleep/redeploy. Without a payment method, included-usage exhaustion suspends services/builds rather than charging for extra usage. Do not use its expiring free PostgreSQL database for lasting designs.
- Neon Free: current official pricing lists 1 GB database storage, 100 CU-hours per project/month and 5 GB object storage, with no time limit or credit card required. Private S3-compatible object storage and PostgreSQL could preserve sessions, quotas and artifacts independently of the web process.
- GitHub Pages: retain the existing saved-example gallery as the immediate public entry point, clearly labeled separately from live generation.

An explicit Neon PostgreSQL/private-object-storage adapter is now implemented; putting the local SQLite database on Render's ephemeral filesystem would still lose designs. The deployed workspace is https://sketchless-cad-7931c5be.onrender.com/. Provider keys, private storage, HTTPS and generation/edit/restore checks were verified. See the measured hosted report; free-plan availability remains an external limit. Quota exhaustion can interrupt any free service; there is no unconditional uptime guarantee.

The database/artifact adapter preserves local SQLite as the default. Its real PostgreSQL integration and hosted setup passed before the workspace was linked publicly. Keep credentials backend-only and privately configured. Never expose private storage buckets, prompts or design files publicly. Preserve owner checks, atomic quotas and successful-version restoration. A sleeping web process must reopen the same external state without overwriting it or forgetting its request budgets.

The Linux check now supports explicit CPU/memory settings; the workflow probes 512 MiB and 0.1 CPU without Gemini. This tests representative sequential CAD only, not hosted capacity or broad prompt quality.

Sources checked 2026-10-29:
- https://render.com/docs/free
- https://render.com/docs/compute-plans
- https://neon.com/pricing
- https://neon.com/docs/storage/get-started
- https://neon.com/docs/storage/authentication

Other checked options: new Hugging Face Docker/Gradio Spaces require a paid subscription even on CPU Basic; static Spaces alone cannot run CAD. Do not silently switch to a paid plan. https://huggingface.co/docs/hub/spaces-overview

## Private setup

Create dedicated management keys named `Sketchless setup` in Render Account Settings > API Keys and Neon user menu > Account settings > API keys. Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\Configure-SketchlessHosting.ps1` from the repository. It reads hidden input, restricts the local file permissions and writes only ignored `data/hosting-credentials.json`. It makes no API requests. Keep accounts on Free plans without a payment method. Management keys must not be installed in the hosted application; revoke these dedicated setup keys when no longer needed.

The [Render blueprint](../render.yaml) declares only a Free web service, with automatic deploys off and no disk or Render database. It is a configuration template, not evidence that hosting is active. Existing services are outside this project's deployment scope. Start in demo mode and verify persistence, ownership and exports before enabling real Gemini calls.

Cloud runtime settings are backend-only: `SKETCHLESS_STORAGE_MODE=neon`, `SKETCHLESS_FREE_HOSTING_CONFIRMED=true`, a **direct/unpooled** `SKETCHLESS_DATABASE_URL` with `sslmode=verify-full`, and `SKETCHLESS_STORAGE_ENDPOINT`, `SKETCHLESS_STORAGE_REGION`, `SKETCHLESS_STORAGE_BUCKET`, `SKETCHLESS_STORAGE_ACCESS_KEY`, `SKETCHLESS_STORAGE_SECRET_KEY`. These are app-scoped database/storage credentials, not provider management keys. Configure a private bucket in a supported Neon region; Ohio (`aws-us-east-2`) matches the prepared Render region. The adapter uses its own PostgreSQL schema, verifies TLS certificates and fails closed instead of falling back to ephemeral SQLite. Quotas remain transactional and durable. Session leases serialize edits during overlapping deployments.

Public startup accepts either attested persistent local storage or the fully configured remote adapter. It still requires the exact HTTPS origin. Set the app's storage budget conservatively (the template uses 256 MiB). Failed uploads never publish a successful version; verified cache downloads restore exports after local files disappear. Storage quotas and provider suspension may still interrupt new work. Any failed cleanup can leave private orphan objects that require operator inspection; the service is not an unlimited archival system.

## Cloud backups

Once the private runtime settings exist locally, export without calling Gemini:

```powershell
.\.venv\Scripts\python -m scripts.backup_cloud --runtime-env data/hosting-runtime.env --output backups/cloud-designs.zip
.\.venv\Scripts\python -m scripts.backup_data restore backups/cloud-designs.zip --target data-restored
```

The exporter reads a consistent database snapshot, downloads verified immutable CAD exports and produces the existing SQLite/artifact ZIP format. Keep the archive private: it contains conversations and designs. Restore targets must be new/empty; this command never overwrites a live cloud database. Local and cloud backups remain separate from API-key configuration. Downloading a backup uses provider transfer allowance.

The 0.1-CPU check exposed intermittent 60-second CAD deadlines. Hosted worker timeouts are therefore configurable with `SKETCHLESS_CAD_TIMEOUT_SECONDS`, capped at 180 seconds; local default remains 60 seconds. The Free blueprint chooses 180. Cold start plus CAD can take several minutes. This is a resource/latency limitation, not a change to modeling interpretation or its bounded repair count. Keep the saved-example gallery as the immediate portfolio entry point.

[Storage verification evidence](cloud-storage-verification.json) separates local regression tests, real PostgreSQL integration and actual private-object-storage roundtrips from pending hosted-runtime checks. No account identifiers, key values, connection strings or billing balances are part of this report.

## Hosted verification

[Actual hosted results](hosted-verification.json): four successful interpretation requests required five SDK attempts including one bounded repair. Both concept builds required explicit harness approval; two restorations required no model call. Selected-component color edits preserved the rest of the scene. The exhausted verification visitor was denied another interpretation before any additional SDK call, while its accepted CAD and downloads remained available. These development examples are not a new held-out accuracy score. Provider 429 handling has separate mocked coverage; the observed hosted limit was the application visitor allowance.

The existing Render service was not modified. Free workspace usage allowances are shared, so account-level exhaustion can suspend the demo. No keep-alive pings, paid upgrades or Azure credit-consuming resources were enabled. The app-scoped secrets were installed only after explicit owner approval. Dedicated local management keys are not part of the hosted environment or public source.
