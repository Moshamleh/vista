# Go-Live Checklist

## Before Deploy

- [ ] Confirm production domain or `workers.dev` target.
- [ ] Confirm Node 22+.
- [ ] Confirm Cloudflare account and project.
- [ ] Confirm D1 database ID.
- [ ] Confirm KV namespace ID.
- [ ] Confirm queues and dead letter queue.
- [ ] Confirm required secrets.
- [ ] Confirm disabled integrations are intentional.
- [ ] Run backend checks.
- [ ] Run admin checks.
- [ ] Run Wrangler dry-run.

## Deploy

- [ ] Apply D1 migrations remotely.
- [ ] Deploy Worker.
- [ ] Deploy Admin Control Center.
- [ ] Confirm no DNS changes are made unless explicitly approved.

## After Deploy

- [ ] `GET /health` returns success.
- [ ] `GET /openapi.json` returns OpenAPI 3.1.
- [ ] Authenticated `GET /diagnostics` returns configured bindings.
- [ ] Admin can authenticate.
- [ ] `POST /generate/providers/test` succeeds for active provider.
- [ ] `POST /publish/providers/test` succeeds for configured publishers.
- [ ] Queue accepts a test async generation job.
- [ ] Queue accepts a test async publish job.
- [ ] Cron logs appear after the next 15-minute window.
- [ ] D1 records are created by a safe test run.
- [ ] No messages enter the dead letter queue.
