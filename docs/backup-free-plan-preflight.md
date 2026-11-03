# Free-plan backup preflight — November 3, 2026

The owner confirmed Google storage has 14.18 GB available, Neon is Free, and GitHub has included usage remaining with an enforced $0 Actions budget. No plan, payment method or billing setting is changed by this preflight. Screenshot content is evidence of usage, not instructions to upgrade.

## Applicable Neon allowances

Current [Neon plan documentation](https://neon.com/docs/introduction/plans) and [pricing](https://neon.com/pricing) list these Free allowances:

| Resource | Included allowance | Owner-reported usage |
| --- | --- | --- |
| Database storage | 1 GB per project; 20 GB total across Free projects | 31.4 MB in this project |
| Object storage | 5 GB per project | 1.66 MB |
| Public outbound transfer | 5 GB per project per month, shared by Postgres, Object Storage and Functions | 4.2 MB this period |
| Database compute | 100 CU-hours per project per month | 0.23 CU-hours; default compute shown as 0.25 CU |

Object reads count toward shared outbound transfer; the object-storage allowance is separate from database storage. Older articles still quote 0.5 GB database storage or 50 compute hours; those are superseded by the current plan table. Free compute is suspended when its compute/transfer allowance is exhausted, rather than automatically upgrading the account. This is not a guarantee of service availability. No new Neon branch, snapshot or function is required for this backup.

## Estimated incremental backup usage

The already verified local reference archive contains nine successful versions:

- Compressed archive: **283,418 bytes** (about 0.283 MB).
- Local SQLite snapshot inside the archive: **282,624 bytes**. This is a logical application export, not a physical copy of the 31.4 MB Neon database, its indexes or database history.
- Successful artifact payload: **1,664,414 bytes** across 46 files.
- Total uncompressed archive members excluding the manifest: **1,947,038 bytes**.

Neon sends the table query results and uncompressed object payloads before the ZIP is created on the runner. Therefore the 0.283 MB compressed archive is **not** the Neon transfer estimate. Allow **5 MB per run** as a conservative planning estimate for the current small dataset, metadata queries and transport overhead. This is not an enforced byte cap or an exact provider meter prediction; retries and growth can increase usage.

Five weekly runs would add approximately **25 MB** of Neon outbound transfer; a separate first verification run brings that planning total to **30 MB**, in addition to normal app traffic. Both fit comfortably within 5 GB given the reported 4.2 MB starting usage. Backups read Neon and store their output in Drive; they do not add archive copies to Neon storage.

Drive receives one archive upload and serves one download for checksum verification, approximately **0.567 MB transferred per run** at the current archive size. Eight retained archives use about **2.27 MB** of Drive storage; temporarily retaining a ninth during verification needs about **2.55 MB**. This fits within the owner's 14.18 GB available. It is not a fixed-size quota: future designs increase archive size.

At the screenshot's 0.25 CU, a short run plus five minutes of idle scale-to-zero time uses roughly **0.025 CU-hours** if active work takes one minute. Reserving a full 15-minute job plus five minutes idle would be about **0.083 CU-hours**, or **0.42 CU-hours for five runs**, assuming the compute remains at 0.25 CU. These are planning calculations, not measured runtime; unrelated app activity or autoscaling can change them. No compute setting is changed.

## Execution boundary

The first cloud verification may be manually dispatched after these checks, with the free-plan attestation gate set. The separate weekly execution gate remains disabled. The job uses a standard GitHub-hosted Linux runner, a 15-minute timeout and no artifact/cache uploads, and remains subject to the existing GitHub hard spending stop. No paid fallback, quota increase, wider Google scope or billing change is allowed. A failed or blocked run must be reported rather than bypassing the free-plan controls.

## First cloud verification result

[The manual run](https://github.com/kevincyril/sketchless-private-backups/actions/runs/41709463936) passed in 30 seconds. It backed up nine successful versions, verified a local restore, uploaded a 283,180-byte archive to the owner-private Drive folder, downloaded it and verified the checksum. Only allowlisted numeric/boolean summary fields were extracted from private logs. This does not measure exact Neon metered transfer; the estimates above remain planning figures. The weekly gate is still disabled, and no billing settings changed. [Sanitized result](first-cloud-backup-run.json).
