# Cloudflare Setup Guide

## D1

Create the production database:

```powershell
npx.cmd wrangler d1 create vista-ai-authority-engine-prod
```

Add the returned database ID to `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "vista-ai-authority-engine-prod",
    "database_id": "<cloudflare-d1-database-id>"
  }
]
```

Apply migrations:

```powershell
npx.cmd wrangler d1 migrations apply vista-ai-authority-engine-prod --remote --config wrangler.jsonc
```

## KV

Create the namespace:

```powershell
npx.cmd wrangler kv namespace create CACHE
```

Add the returned ID:

```jsonc
"kv_namespaces": [
  {
    "binding": "CACHE",
    "id": "<cloudflare-kv-namespace-id>"
  }
]
```

## Queues

Create queues:

```powershell
npx.cmd wrangler queues create vista-ai-authority-events
npx.cmd wrangler queues create vista-ai-authority-events-dead
```

The producer and consumer are already declared in `wrangler.jsonc`.

## Observability

Cloudflare Workers observability is enabled in `wrangler.jsonc`. After deployment, verify:

- Request logs include `requestId`.
- Queue failures route to the dead letter queue after retries.
- Cron events appear every 15 minutes.
- Provider failures are logged with provider names and error messages.
