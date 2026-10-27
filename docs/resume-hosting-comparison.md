# Recruiter-facing free hosting comparison

Research date: 2026-10-25. Goal: a stable public README/resume link that works while the developer's computer is off. The user requested comparison of both card and no-card options before choosing; this does not authorize billing, signup, publication or a hosting choice. No deployment was performed.

The current Python/CadQuery backend is a container/server workload with asynchronous jobs, SQLite and filesystem artifacts. A Windows CAD worker reached 405.2 MiB peak memory; that is not a Linux measurement or total API-plus-worker footprint. Linux architecture, memory, persistence, restart and Gemini access must be tested on the selected host.

## Backend candidates

| Provider | Payment setup | Free offer and suitability |
| --- | --- | --- |
| Northflank Sandbox | Conflicting official statements | Pricing advertises cardless signup, always-on services and $20/month resources; billing docs require payment for every plan. Promising if actual account eligibility and sufficient memory/persistent disk are confirmed. Do not assume verification is settled. |
| Oracle Always Free | Card verification | ARM allocation currently up to 2 OCPUs/12 GB across eligible instances, plus included block storage. More room for CAD, but capacity shortages and idle reclamation can interrupt a low-traffic portfolio. Need ARM dependency checks and VM maintenance. Stay Free Tier; no paid upgrade. |
| Render Free | Can operate without payment method | 512 MB service sleeps after 15 minutes, wakes in roughly a minute, loses local data on restart/sleep. Needs Linux memory verification and a replacement for local-only persistence. Suitable only with visible wake-up handling and fallback samples. |
| Railway Free | No card | Small recurring $1/month allowance after the introductory trial; 0.5 GB maximum memory per service and 0.5 GB volume. Not a promise of continuously available CAD compute. |
| Azure for Students | No card, verified student eligibility | $100 for 12 months and annual renewal while eligible. Can support a larger VM/container, but the entitlement/credit period must be monitored; not unconditional lifetime-free hosting. |
| Modal Starter | Payment method required | $30/month included compute with metered excess/other charges. Potentially suitable for on-demand CAD with more memory; needs platform integration and durable state. Treat as usage-funded, not a guaranteed zero-bill service. |
| Google Cloud Run | Cloud Billing/payment setup | Recurring compute allowance, excess and other services can bill. Can allocate enough RAM, but current background jobs and SQLite cannot be moved unchanged. Request-based CPU allocation can suspend work after HTTP responses. |
| Azure Container Apps | Billing subscription; student exception | Monthly compute/request grant with metered excess. Requires container lifecycle/job/storage adaptation and complete cost accounting. |
| Koyeb Free | Card required by billing FAQ | 512 MB, 0.1 vCPU and no persistent volume for free instance; sleeps after an hour. Signup FAQ also describes charging for the selected plan, so do not treat signup as verification-only or assume a zero invoice. |

## Static frontend and sample gallery

Cloudflare Pages/Workers static assets, GitHub Pages, Vercel Hobby and Netlify Free can serve a persistent project frontend/sample viewer without running the CAD backend. Their provider URLs avoid buying a custom domain. They are not substitutes for live CAD generation. A separate sample mode must be clearly labeled and work without backend startup; the current app needs changes to do this.

Cloudflare is the strongest frontend candidate here: official Pages marketing permits no-card start, and Workers static-asset docs list free unmetered static requests. Vercel Hobby is for personal/noncommercial use. Netlify Free currently has a monthly 300-credit ceiling and pauses projects at exhaustion. GitHub Pages is static hosting available for public repositories under GitHub Free.

## Other options screened out for long-term full-backend hosting

- Hugging Face: current new Docker/Gradio CPU Basic Spaces need a subscription. Static Spaces remain an option for the gallery only.
- Fly.io: current new-account trial is short, not an ongoing free server plan.
- AWS: current new-account free plan/credits expire within six months; individual ongoing free services do not provide an unchanged always-on version of this stack.
- Google Compute Engine: eligible e2-micro compute and standard disk have recurring free quotas, but standard public IPv4 incurs separate charges. A naive VM setup is not entirely free; alternative networking and all other usage require verification.
- PythonAnywhere Free: 512 MiB disk and tight CPU limits make the installed CAD stack an unsuitable target without major redesign.
- Cloudflare Quick Tunnel: computer-dependent temporary sharing is not the independent hosting requested for a resume.
- Supabase: useful database/auth/file-storage component, not a host for CadQuery. Free projects can pause after low activity; it cannot be assumed to solve unattended storage availability on its own.

## Recommended selection order

1. Verify Northflank Sandbox's real signup rules, memory selection, recurring resource allowance and persistent-volume eligibility. Treat conflicting docs as unresolved.
2. If card verification is acceptable, consider Oracle Always Free for an ordinary server deployment, acknowledging idle-reclamation/capacity risks.
3. If cardless access is mandatory and Northflank is unavailable, assess Render with external persistence and a backend-independent sample gallery. Full CAD fit is not yet established.
4. If usage-based billing is acceptable with careful limits, consider Modal or Cloud Run; these are not equivalent to guaranteed free hosting.

For every route, keep the main README URL on a static frontend with genuine pre-generated interactive CAD examples. Live generation should show actual service status and quota failures and never pass sample output off as newly AI-generated. Add anonymous-session isolation, server-side request limits, durable storage/backups, error handling, deployed verification, a concise technical README and a short walkthrough. A free host cannot guarantee every live Gemini request succeeds. Hosting billing must not change the existing Gemini Free Tier project.

## Official sources

- Northflank pricing: https://northflank.com/pricing
- Northflank billing contradiction: https://northflank.com/docs/v1/application/billing/pricing-on-northflank
- Oracle resources: https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- Oracle verification: https://www.oracle.com/cloud/free/faq/
- Render: https://render.com/docs/free and https://render.com/pricing
- Railway: https://railway.com/pricing
- Azure Students: https://azure.microsoft.com/en-us/free/students/
- Modal: https://modal.com/pricing and https://modal.com/docs/guide/billing
- Cloud Run: https://cloud.google.com/run/pricing and https://docs.cloud.google.com/run/docs/configuring/billing-settings
- Azure containers: https://learn.microsoft.com/en-us/azure/container-apps/billing
- Koyeb: https://www.koyeb.com/docs/reference/instances and https://www.koyeb.com/docs/faqs/pricing
- Cloudflare: https://www.cloudflare.com/products/pages/ and https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Vercel: https://vercel.com/docs/plans/hobby
- Netlify: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- Hugging Face: https://huggingface.co/docs/hub/spaces-overview
- Fly.io: https://fly.io/docs/about/free-trial/
- AWS: https://aws.amazon.com/free/free-tier-faqs/
- Google VM networking: https://cloud.google.com/vpc/pricing
- PythonAnywhere: https://help.pythonanywhere.com/pages/FreeAccountsFeatures
- Supabase: https://supabase.com/docs/guides/platform/free-project-pausing
