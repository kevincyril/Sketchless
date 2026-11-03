# Secure cloud backup setup

Private runner repository: https://github.com/kevincyril/sketchless-private-backups

**Setup status, November 3, 2026:** the owner confirmed the Google consent app is **In production**. the instrumented local Google authorization completed, the owner-private folder was created, and all three configuration secrets were encrypted locally and uploaded to the private repository. The first manual cloud verification has now passed after the owner supplied free-allowance and hard-stop evidence. Both gates are now enabled after the successful manual run and owner approval to complete setup. Weekly backups run Sundays at 03:17 Phoenix time, retaining eight verified archives. See [allowance preflight](backup-free-plan-preflight.md) and [first cloud result](first-cloud-backup-run.json). See [safe setup diagnostics](drive-setup-diagnostics.md).

Scheduled runs are enabled after Google authorization, free-plan checks and a successful manual verification. No billing settings, paid plans or payment methods have been changed. The scheduled workflow is weekly at Sunday 10:17 UTC (03:17 Phoenix), on a standard Linux runner with a 15-minute timeout. No archives or secrets are committed or published as Actions artifacts.

## What is already prepared

- A separate `sketchless_backup_reader` PostgreSQL login with SELECT on the five application tables, schema USAGE and database CONNECT. It has no inherited role, superuser, role-creation, database-creation or replication privilege, and defaults to read-only transactions.
- A dedicated Neon `storage:read` credential. This authorizes downloads/listing of objects on the source branch and its descendants; it does not authorize uploads or deletion and is not limited to one bucket. It is separate from the app's existing read/write credential. No AWS account is required.
- A private restore drill using those dedicated credentials recovered nine saved versions. `SKETCHLESS_BACKUP_ENV` was encrypted locally to GitHub's repository public key and uploaded as an Actions secret.
- Duplicate read-only tokens from failed local setup attempts were revoked; the active backup key and existing app keys were preserved.

**The object-download credential belongs to Neon Object Storage.** Google Drive receives the archive through Google OAuth. GitHub stores the encrypted credentials and runs the job. Neither the Google account nor GitHub needs a Gemini key, Neon management key or database write privilege.

## Your Google step

### Public OAuth Branding pages

The following informational pages are published on the owner's free GitHub Pages domain. They contain no backups, credentials, Google sign-in controls, analytics or forms. The private runner repository remains private, and no billing settings were changed.

| Branding field | Exact value |
| --- | --- |
| App name | `Sketchless Private Backups` |
| Application home page | `https://kevincyril.github.io/sketchless-backup/` |
| Application privacy policy link | `https://kevincyril.github.io/sketchless-backup/privacy.html` |
| Application terms of service link | `https://kevincyril.github.io/sketchless-backup/terms.html` |
| Authorized domain | `kevincyril.github.io` |

Enter the authorized domain without `https://`, a slash or a path. Do not enter the shared parent `github.io`. Select your actual support email and developer contact email in Branding; no email address has been invented or published by this setup. The support email you choose is the contact route referenced by the public pages.

If Google requests domain ownership verification, use the same Google account that is an Owner or Editor of the OAuth project. Add the **URL-prefix** property `https://kevincyril.github.io/` in [Search Console](https://search.google.com/search-console), then choose the HTML tag or HTML file method. A DNS-based Domain property is inappropriate here because GitHub controls the parent domain's DNS. The root homepage is published and can receive Google's public verification tag, or a verification HTML file can be published at the required root URL. Publishing the pages alone does not complete Google account ownership verification.

These values are **Branding links**, not OAuth redirect URIs. Keep the client type **Desktop app** for the existing local loopback/PKCE setup; do not replace it with a Web application client or point its callback at these static pages. Other required Branding fields still need to be completed in your Google account before Publish app becomes available.

Publication source: `public-backup-site/`. Only its explicitly allowlisted public HTML/CSS files are published to `kevincyril/kevincyril.github.io`. Anonymous HTTPS/source checks are recorded in [backup-branding-verification.json](backup-branding-verification.json).

### Finish authorization

1. Open [Google Cloud Console](https://console.cloud.google.com/). Select or create a project without attaching a billing account, and enable **Google Drive API**. Do not enable paid quota increases.
2. In **Google Auth Platform**, complete Branding and Audience for your own account. Request only `https://www.googleapis.com/auth/drive.file` under Data Access. Set the consent app to **In production**, because Drive refresh tokens from an external app left in Testing expire after seven days. This consent publishing does not make your backup folder public.
3. Under **Clients**, create an OAuth client with application type **Desktop app**. Download its JSON file to your PC. Do not send the JSON, client secret, authorization code or refresh token to chat.
4. From `C:\Users\cyril\Sketchless`, run:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\Configure-SketchlessBackups.ps1
   ```

   Enter the downloaded JSON file's local path when prompted. The script opens your browser for Google sign-in and consent. It uses a loopback callback, state validation and PKCE; it never prints authorization tokens. If Google blocks the personal OAuth app, stop and report the nonsecret error wording rather than granting broader permissions.

The script creates **Sketchless private backups** in your Drive, confirms that it is owner-private, and stores local authorization files in the ACL-protected, Git-ignored `data/backup-setup` directory. It uploads `GOOGLE_DRIVE_OAUTH_JSON` and `GOOGLE_DRIVE_FOLDER_ID` as locally encrypted GitHub Actions secrets using the existing GitHub sign-in. It also preserves/reuploads the dedicated Neon backup secret. Do not run it from a recorded terminal session or turn on PowerShell transcription/debug tracing during setup.

If the local encryption helper is missing after a fresh install, install its setup-only dependency with `.\.venv\Scripts\python -m pip install -r deploy/backup-runner/setup-requirements.txt`.

For a noninteractive-auth preflight, run the wrapper with `-CheckOnly` (it still prompts for the local JSON path). This checks the Desktop JSON, dependencies, protected-folder access and local listener without opening a browser, contacting Google or uploading secrets:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\Configure-SketchlessBackups.ps1 -CheckOnly
```

The helper now prints the current stage and, on failure, the error type and a fixed sanitized explanation. It never prints exception text, the client filename, provider response bodies, callback URLs, codes, tokens or connection strings. Known Google error reasons and numeric HTTP/OS error codes may be shown. Reports in the protected folder are `drive-preflight-diagnostics.json`, `drive-setup-diagnostics.json` and `backup-secret-upload-diagnostics.json`. Preflight does not overwrite the normal setup report. Check-only mode reapplies the wrapper's folder protection and writes its redacted diagnostic file, but does not modify saved authorization files or enable the runner.

## Free usage check — view only

Open [GitHub billing overview](https://github.com/settings/billing) and inspect your current plan, remaining included Actions minutes, and whether paid Actions overage is already blocked. This setup does not change any billing setting. GitHub Free includes 2,000 private-repository runner minutes monthly, shared with other workflows. Five weekly jobs capped at 15 minutes would consume at most 75 minutes, excluding retries and unrelated workflows.

Confirm available Google Drive space and existing Neon Free read/transfer allowances. Do not attach billing, upgrade a plan or enable paid overages. If the existing account settings permit charges or the included allowance is exhausted, leave the runner disabled and report that nonsecret status.

After the script succeeds, tell the assistant **“Drive authorized; free allowances available and paid overages blocked”**, only if those checks are true. No key values are needed. Manual verification requires `BACKUP_FREE_PLANS_CONFIRMED=true`; scheduled execution separately requires `BACKUP_ENABLED=true`. The first manual verification can run while the weekly gate stays disabled. A successful first cloud upload, download checksum and restore check were verified on November 3, 2026; weekly execution is now enabled.

## Backup behavior

Each run exports the database and CAD, verifies a local restore, uploads to the owner-private folder, downloads the uploaded file and compares SHA-256. Only then is it tagged verified. Retention keeps the eight newest verified backup-app ZIPs; unrelated Drive files and incomplete uploads are not eligible for deletion. An upload/checksum failure preserves existing backups. Partial uploads may need private operator cleanup. Schedules can be delayed and should be checked periodically through GitHub's run status/failure notifications.

References: [Neon storage authentication and scopes](https://neon.com/docs/storage/authentication), [Drive per-file OAuth scope](https://developers.google.com/workspace/drive/api/guides/api-specific-auth), [Google refresh-token expiration](https://developers.google.com/identity/protocols/oauth2), [GitHub encrypted secrets](https://docs.github.com/en/rest/actions/secrets), [included Actions usage](https://docs.github.com/en/billing/reference/product-usage-included).
