# Free hosting assessment

Checked against official provider documentation on 2026-10-25. No resources have been created, no billing enabled, and no app or keys published. Provider terms and free capacity can change; recheck before signup.

## Findings

- **Hugging Face:** new Docker/Gradio CPU Basic Spaces require a subscription despite the compute being labeled free. It does not meet a completely free new-account deployment requirement. https://huggingface.co/docs/hub/spaces-overview
- **Render:** free web services sleep after 15 minutes and lose local files on restarts, redeploys and sleeping. Free persistent disks are unavailable and free Postgres expires after 30 days. The current SQLite/artifact storage cannot be moved there unchanged while retaining designs. CAD memory fit also remains untested. https://render.com/docs/free
- **Koyeb:** the free instance is 512 MB RAM, 0.1 vCPU, 2 GB disk, with no persistent volumes. This is not a proven fit for the current CAD runtime. https://www.koyeb.com/docs/reference/instances
- **Oracle Always Free:** a possible persistent VM route, subject to signup, region capacity and Linux/architecture verification. Oracle requires card identity verification and can place temporary authorization holds. Do not upgrade to Pay As You Go or use trial-only resources. No always-available capacity is promised. https://www.oracle.com/cloud/free/faq/ and https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- **Cloudflare Quick Tunnel:** a free temporary demo URL to an app on your own computer, without an account/domain. Your computer, server and tunnel must stay running; it is a development/demo option rather than independent cloud hosting. The current docs support email allowlisting with `--allowed-mail`. It must not expose the existing unprotected local app or saved designs without an access-control/isolation pass. https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/

The user requires no credit card at all. Oracle and any card-verified signup are excluded. No free-cloud recommendation is final until no-card account eligibility, runtime fit and storage are verified. Static website hosting alone cannot run this Python/CadQuery backend. No paid fallback or credit-based trial is proposed as a permanent free solution.

## Portable container prepared

The root Dockerfile builds the existing frontend and installs the pinned Python/CAD stack. It copies only app code and project-owned classifier files. The deny-by-default .dockerignore excludes .env, private local designs, caches, virtual environments and unrelated attachments. The runtime runs as UID/GID 10001, uses a writable design directory, constrains math-library threads and starts one ASGI worker. PORT defaults to 8000. Health checking only verifies that the API process responds, not that CAD or Gemini is available.

Docker is not installed in the current Windows environment. The container has **not** been built, Linux-tested, resource-profiled or deployed. A host/container smoke test must verify Python dependencies, actual CAD generation, exports, storage restoration and Gemini region access before publication. Do not describe this package as deployment-verified.

When Docker is available, a local-only smoke run is:

```sh
docker build -t sketchless:demo .
docker volume create sketchless-data
docker run --rm --name sketchless-demo -p 127.0.0.1:8000:8000 --mount source=sketchless-data,target=/app/data -e SKETCHLESS_DEPLOYMENT_MODE=local -e DEMO_MODE=true sketchless:demo
```

Stop the existing Windows server first or use a different local host port. A new named Docker volume inherits the image data-directory ownership; external bind mounts may need permissions for UID 10001. Keep the volume when replacing a container. Export/back up designs separately; a persistent volume is not itself a backup.

Live mode must receive GEMINI_API_KEY through the chosen host's private secret settings, plus GEMINI_FREE_TIER_CONFIRMED=true and DEMO_MODE=false. Never put keys in Dockerfile, frontend variables, image layers, repository files, screenshots or chat. Existing local .env is deliberately absent from the image. No model fallback is enabled.

## Still required before a public deployment

Browser session isolation, durable server-side Gemini budgets, storage admission and private backup/restore are now implemented and offline-tested. See [public deployment configuration](public-deployment.md). Azure eligibility, the Linux image/memory profile, hosted persistence and the complete HTTPS workflow still require verification before exposing the live service.

## No-card follow-up

The user confirmed that even card verification is not acceptable. Render remains a candidate to investigate, not a verified deployment recommendation: its official free-service documentation explicitly describes operation without a payment method and suspension/build disabling at included-usage limits. https://render.com/docs/free

A local representative 23-solid robot CAD build succeeded in 5.2 seconds with a measured 405.2 MiB Windows peak working set inside the actual Python CAD process (GetProcessMemoryInfo). This excludes the separate API process and concurrent workers; it is not a Linux/cgroup memory measurement. A first process-tree attempt sampled only the Windows virtualenv launcher and is not a valid CAD memory measurement. Consequently the current stack is not proven to fit a 512 MB free cloud instance. Linux measurement, lower worker concurrency and storage changes remain prerequisites; do not silently remove the classifier or disable CAD to make a hosted frontend appear to work.

A protected local-computer tunnel is a separate temporary demo option with no card signup; it must be explicitly accepted as such because availability depends on the computer remaining online. No tunnel has been opened, no local designs exposed and no secrets uploaded.

## Updated goal: resume link

The user now wants a durable recruiter-facing link and requested comparison of both card and no-card options before choosing. This reopens card-based options for research only; it does not authorize entering a card or enabling billing. See [the dated comparison](resume-hosting-comparison.md), including the conflicting Northflank signup documentation. A temporary developer-computer tunnel is not an adequate primary deployment for this goal.
