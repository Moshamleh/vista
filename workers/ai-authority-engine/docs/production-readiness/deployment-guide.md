# Deployment Guide

## Prerequisites

- Node.js 22 or newer.
- npm available as `npm.cmd` on Windows.
- Wrangler authenticated to the target Cloudflare account.
- Cloudflare D1, KV, and Queues provisioned.
- Production secrets configured through `wrangler secret put`.

## Local Verification

Run from `workers/ai-authority-engine`:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run lint
npm.cmd run test
npm.cmd run format:check
```

Run from `workers/ai-authority-engine/admin-control-center`:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run lint
npm.cmd run test
npm.cmd run format:check
npm.cmd run test:e2e
```

## Cloudflare Worker Deployment

1. Upgrade the active shell to Node 22+.
2. Add D1 and KV IDs to `wrangler.jsonc`.
3. Set required secrets.
4. Run a dry run:

```powershell
npx.cmd wrangler deploy --dry-run --config wrangler.jsonc
```

5. Deploy:

```powershell
npm.cmd run deploy
```

## Post-Deploy Verification

Verify:

- `GET /health`
- `GET /openapi.json`
- Authenticated `GET /diagnostics`
- Authenticated `GET /generate/providers`
- Authenticated `GET /publish/providers`
- Authenticated `GET /visibility/status`

Then confirm Cloudflare logs show structured JSON events with request IDs.
