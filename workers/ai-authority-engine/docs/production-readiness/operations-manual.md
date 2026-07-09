# Operations Manual

## Daily Checks

- Check Worker error rate in Cloudflare.
- Check queue backlog and dead letter queue.
- Check cron execution logs.
- Check provider test endpoints for active providers.
- Review failed AI generation and publisher jobs.

## Weekly Checks

- Verify D1 migration history and backup export.
- Review visibility recommendations.
- Review external indexing jobs if enabled.
- Review buying signal ingestion runs if enabled.
- Rotate or audit provider credentials where needed.

## Key Commands

Backend:

```powershell
cd workers/ai-authority-engine
npm.cmd run build
npm.cmd run lint
npm.cmd run test
npm.cmd run format:check
```

Admin:

```powershell
cd workers/ai-authority-engine/admin-control-center
npm.cmd run build
npm.cmd run lint
npm.cmd run test
npm.cmd run test:e2e
```

Deployment:

```powershell
cd workers/ai-authority-engine
npx.cmd wrangler deploy --dry-run --config wrangler.jsonc
npm.cmd run deploy
```

## Incident Priorities

P1:

- Worker unavailable.
- D1 binding missing.
- Auth bypass or credential leak.
- Queue dead letter growth after deployment.

P2:

- Provider failures.
- Cron skipped.
- Indexing submissions failing.
- Admin cannot authenticate.

P3:

- Recommendations stale.
- Optional provider disabled.
- Non-critical artifact generation errors.
