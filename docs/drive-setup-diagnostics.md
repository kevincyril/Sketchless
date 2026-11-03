# Local Drive setup investigation — November 3, 2026

The original helper caught all exceptions and replaced them with one generic message. It retained no original exception or stage, so the exact historical failure cannot be established from that message alone. The owner confirmed that no browser opened and that the supplied path was unquoted. A quoted-path error was reproduced as a separate robustness check, but is not attributed to the reported incident.

The downloaded Desktop client was inspected without printing its filename, identifiers or values. It has the `installed` object and the required client, Google endpoint and loopback settings. A separate Web client download is also present; it is not interchangeable with the Desktop client. The valid Desktop file reaches browser launch under the owner's Windows account. Dependency loading, output-folder create/read/write/delete and local listener binding pass. ACL inheritance is disabled and no Everyone, Authenticated Users or Builtin Users allow rules were found on the protected folder.

## Instrumented result

The normal retry completed dependencies, client reading/validation, output permission checks, loopback binding, browser launch, valid state-checked callback, PKCE token exchange, existing `drive.file` grant validation, Drive folder creation/privacy checks and exclusive credential-file writes. Local encrypted upload of all three setup secrets also passed. The actual PowerShell wrapper then returned exit code 0 in check-only mode and recognized the existing saved authorization.

No failing stage remains in the observed retry. This does not prove what caused the unlogged earlier failure. No wider Google scope, billing change, workflow dispatch or execution-gate enablement was performed. Both remote gates were confirmed false after setup; the first scheduled/cloud backup remains unverified.

## Diagnostics and safeguards added

- Named stages in console output and private JSON reports, with exception type and fixed explanations instead of raw exception text.
- Whitelisted Google reasons and numeric HTTP/OS error codes; provider messages, response bodies, URLs and input values are never reflected.
- Desktop/Web/service-account distinction, required-field validation, BOM support and safe quoted-path normalization.
- A folder permission probe before consent; partial existing authorization files are preserved and reported rather than overwritten or silently skipped.
- Immediate failure if the browser launcher returns false, explicit callback timeout, state checking and callback logging suppression.
- Exclusive output-file creation and cleanup of this attempt's partially written files if saving fails.
- Separate check-only report, with no browser launch, Google request, secret upload or runner enablement.
- Stage diagnostics for local encryption and GitHub secret upload as well as Google authorization.

Verification: **45 targeted tests passed** across Drive setup/redaction, encrypted secret payloads, upload verification/retention, archive restore and cloud storage. PowerShell parsing and Python compilation passed. Tests exercise real local callback sockets with mocked provider responses; the separate owner-authorized retry used real Google consent and API responses. No credential or authorization-code values are included in this report.

Diagnostic files remain in the protected, Git-ignored `data/backup-setup` folder. They contain safe status fields only; the actual authorization and runtime configuration files beside them remain private.
