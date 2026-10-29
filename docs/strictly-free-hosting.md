# Strictly free hosting investigation

Requirement: no credit-consuming Azure VM, disk or public IP, no payment method and no automatic paid upgrade. The prepared Azure VM route is not being provisioned. A successful local/Linux test is not a hosted deployment.

## Candidate to validate

- Render Free web service: Python/Docker support, 512 MB RAM and 0.1 CPU. Sleeps after 15 minutes idle; an incoming request starts it again, typically in about one minute. Local files are lost on restart/sleep/redeploy. Without a payment method, included-usage exhaustion suspends services/builds rather than charging for extra usage. Do not use its expiring free PostgreSQL database for lasting designs.
- Neon Free: current official pricing lists 1 GB database storage, 100 CU-hours per project/month and 5 GB object storage, with no time limit or credit card required. Private S3-compatible object storage and PostgreSQL could preserve sessions, quotas and artifacts independently of the web process.
- GitHub Pages: retain the existing saved-example gallery as the immediate public entry point, clearly labeled separately from live generation.

This needs a durable-storage implementation; putting the existing SQLite database on Render's ephemeral filesystem would lose designs. Account eligibility, storage endpoint availability, cold starts, memory/CPU fit and all hosted generation/edit/restore workflows still require verification. Do not describe this candidate as deployment-ready. Quota exhaustion can interrupt any free service; there is no unconditional uptime guarantee.

Before using accounts, implement and offline-test the database/artifact adapter while keeping local SQLite behavior intact. Keep credentials backend-only and privately configured. Never expose private storage buckets, prompts or design files publicly. Preserve owner checks, atomic quotas and successful-version restoration. A sleeping web process must reopen the same external state without overwriting it or forgetting its request budgets.

The Linux check now supports explicit CPU/memory settings; the workflow probes 512 MiB and 0.1 CPU without Gemini. This tests representative sequential CAD only, not hosted capacity or broad prompt quality.

Sources checked 2026-10-29:
- https://render.com/docs/free
- https://render.com/docs/compute-plans
- https://neon.com/pricing
- https://neon.com/docs/storage/get-started
- https://neon.com/docs/storage/authentication

Other checked options: new Hugging Face Docker/Gradio Spaces require a paid subscription even on CPU Basic; static Spaces alone cannot run CAD. Do not silently switch to a paid plan. https://huggingface.co/docs/hub/spaces-overview
