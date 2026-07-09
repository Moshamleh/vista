# Backup and Recovery Guide

## D1 Backup

Before every production deployment:

1. Export production D1 data.
2. Store the export in a restricted backup location.
3. Record migration version and deployment hash.

Recommended command pattern:

```powershell
npx.cmd wrangler d1 export vista-ai-authority-engine-prod --remote --output backup.sql --config wrangler.jsonc
```

## KV Backup

KV is used for cached JSON. Treat it as recoverable cache unless production usage changes.

Recovery approach:

- Clear stale keys if cache corruption is suspected.
- Rebuild data from D1 and provider scans.

## Queue Recovery

If the main queue stalls:

1. Check Worker logs for repeated provider errors.
2. Inspect dead letter queue.
3. Requeue only idempotent messages after the underlying error is fixed.
4. Avoid replaying publishing jobs without checking `publish_history`.

## Rollback

1. Redeploy the previous Worker version from Git.
2. Do not roll back D1 migrations unless a tested down migration exists.
3. If a bad migration was applied, restore from D1 backup into a new database and switch the `DB` binding.
