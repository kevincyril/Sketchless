# Private Sketchless backup runner

Owner-private runner source only. No design archives or credentials belong in this repository.

Weekly schedule: Sunday 10:17 UTC (03:17 Phoenix). Standard Linux runner, 15-minute job timeout, no artifact uploads and no cache. Every job requires `BACKUP_FREE_PLANS_CONFIRMED=true` and a private repository. Scheduled jobs additionally require `BACKUP_ENABLED=true`; owner-dispatched manual verification can run while the weekly gate is disabled.

Required Actions secrets: `SKETCHLESS_BACKUP_ENV` (SELECT-only Neon database and storage:read credential), `GOOGLE_DRIVE_OAUTH_JSON` (Desktop OAuth client ID, client secret and offline refresh token), `GOOGLE_DRIVE_FOLDER_ID` (owner-private folder created by that OAuth app).

Do not enable the job before checking the existing included Actions/Drive/Neon allowances and confirming paid overages are blocked. No billing changes or plan upgrades are part of this setup. The backup needs no Gemini or provider-management key.

Each run verifies a local restore, uploads an archive, downloads it to verify SHA-256, and then retains eight verified app-tagged backups in the dedicated Drive folder. Secrets are not printed. Check GitHub run status and failure notifications periodically; a schedule is not an availability guarantee.
