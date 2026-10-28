# Azure student deployment preflight

Confirm the student benefit privately in Education Hub before deploying. Never put account-specific balances, expiry dates, identifiers or billing details in public deployment notes. Never select a subscription by display name alone.

## Authentication and subscription checks

Azure CLI is installed in ignored `.bootstrap/azure-cli/`, separate from application dependencies. Its config/token cache is in ignored `data/azure-cli/`. Authenticate privately using Microsoft device login; never put credentials in source, chat or command arguments. With `AZURE_CONFIG_DIR` pointing to that directory, inspect the signed-in subscriptions and then use an explicit subscription ID for every Azure operation. Before creating resources, verify the student quota/offer, `subscriptionPolicies.spendingLimit`, ownership, existing resource inventory and allowed regions/VM quotas. Do not remove the spending limit or upgrade to Pay-As-You-Go. If the benefit cannot be distinguished programmatically, resolve it with the account owner before provisioning.

## Candidate architecture, not yet deployed

A single x86-64 Ubuntu VM with Docker and a persistent managed OS/data disk fits the existing one-process SQLite/artifact architecture. Serve only through an HTTPS reverse proxy, keep port 8000 bound to loopback and limit SSH to the administrator. Use a dedicated Sketchless resource group and no marketplace services, paid Defender plans, managed registry or paid support. Keep the public static gallery independent of Azure and link the workspace only after hosted validation. Free-tier eligibility and regional capacity must be checked on the actual subscription.

The advertised student free VM sizes are small. The current stack must pass measured Linux memory checks before choosing one; do not substitute a larger charged VM automatically. The container workflow builds without secrets and exercises enclosure/robot CAD, STEP/STL/GLB downloads, edits, version restoration and persistent restart. It does not establish hosted Gemini access, TLS correctness, concurrent-load capacity or long-term availability. Run results: https://github.com/kevincyril/Sketchless/actions/workflows/container-check.yml

## Cost evidence and limits

Public Azure Retail Prices API lookup on 2026-10-28, East US, USD: Linux Standard_B2ats_v2 compute USD 0.0094/hour before any free allowance; Standard static public IPv4 USD 0.005/hour; E4 LRS Standard SSD disk USD 2.40/month. At 730 hours/month, IP plus that disk is approximately USD 6.05/month, excluding disk transactions, bandwidth, backups and other services. A student free-compute allowance, if confirmed, does not make the IP/disk free. Without compute allowance that example totals approximately USD 12.91/month before extras. Region/account prices and eligibility can differ; these figures do not authorize creating resources or guarantee a year within credit.

Spending limits protect included credit for covered services but are not custom monthly caps. Budget alerts are notifications, not automatic hard stops. Preserve the credit limit, verify actual consumption after deployment, keep private backups and decommission resources before credit expiry if renewal is unavailable. No paid provider fallback or automatic billing upgrade is allowed.

Official references:
- https://azure.microsoft.com/en-us/free/students/
- https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit
- https://azure.microsoft.com/en-us/pricing/details/ip-addresses/
- https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices
