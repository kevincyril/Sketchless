# Off-device backup proposal ? implemented

Historical design proposal. The approved GitHub Actions / Google Drive setup is now configured, verified and enabled weekly. Google publishing is In production, and the free-allowance checks passed. See [current setup and status](cloud-backup-setup.md). The access requirements and estimates below describe the original proposal.

Recommended design: a separate private GitHub repository runs a standard Linux GitHub Actions job weekly, independently of the owner's PC. It exports the private Neon database and CAD objects, validates the archive by restoring into temporary local SQLite/artifact storage, uploads the verified archive to an owner-private Google Drive folder, and retains the latest eight successful archives. No backup is uploaded as a GitHub artifact or committed to Git. The schedule should be Sunday 10:17 UTC (Sunday 03:17 in Phoenix), with manual dispatch and a 15-minute job timeout. Scheduled runs can be delayed and are not an exact-time guarantee.

Required owner access:

- GitHub authorization to create/manage one private backup repository, its Actions workflow and encrypted secrets; confirm the account's remaining Actions allowance and a spending budget that blocks paid usage. Runtime workflow token needs repository contents read only.
- A Google OAuth app with Drive API enabled, `drive.file` scope, offline authorization and a one-time owner sign-in. The runner stores the OAuth client credentials and refresh token as encrypted GitHub secrets. This grants management of backup-app files, not full-drive access. Creating the private folder through that app avoids requesting broader existing-folder permissions. The consent configuration must not remain in Testing mode, whose refresh tokens expire after seven days for Drive access.
- Dedicated read-only Neon database and private-object download credentials, stored as encrypted GitHub secrets. No Gemini key, provider management key or database write privilege is needed for the backup job.
- Approval to keep eight successful archives and delete older backup-app archives only after a new upload is verified. The current sample archive is 283,413 bytes; eight comparable archives would use roughly 2.2 MiB, but future size grows with saved designs.

Google Drive is recommended for this setup. OneDrive is an alternative using a registered Microsoft application, delegated `Files.ReadWrite.AppFolder` plus offline access, and one-time account sign-in. Its dedicated app folder avoids full-drive access; actual account compatibility must be tested before relying on the schedule. Do not connect both providers unnecessarily.

Expected added cost is $0 within included allowances. GitHub Free includes 2,000 private-repository runner minutes monthly, shared with other workflows. Four or five weekly jobs capped at 15 minutes consume at most 60–75 minutes if each finishes within that cap, excluding manual retries and other workflows. Archives consume existing Drive/OneDrive storage and Neon reads/transfer. Keep paid overages disabled and do not purchase storage or attach billing. Standard Drive API use is currently available without additional cost, but published quotas/pricing are subject to change; check account quotas at setup. This proposal cannot confirm the owner's remaining allowances.

References checked November 2, 2026:

- [GitHub included usage](https://docs.github.com/en/billing/reference/product-usage-included)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [Public scheduled workflows can disable after inactivity](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/disable-and-enable-workflows)
- [Drive per-file OAuth scope](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- [Drive API usage/pricing](https://developers.google.com/workspace/drive/api/guides/limits)
- [Google refresh-token expiration](https://developers.google.com/identity/protocols/oauth2)
- [OneDrive app folder](https://learn.microsoft.com/graph/onedrive-sharepoint-appfolder)
