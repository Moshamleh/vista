# Phase 17 Production Certification Report

Generated: 2026-07-01

## Executive Result

The Vista AI Authority Engine passed local build, lint, unit, integration, migration, seed, cron, Worker startup, admin dashboard, and website build validation after one critical configuration defect was fixed.

The platform is not yet fully production-certified because external provider credentials and a real Cloudflare staging deployment were not available during this validation run. Provider success for Google Search Console, Bing Webmaster Tools, IndexNow, AI providers, and publisher targets must not be claimed until those services return acceptance responses in staging or production.

## Changes Made During Validation

- Added required Cloudflare bindings to `wrangler.jsonc`:
  - D1 binding `DB` with database name `vista-ai-authority-engine`.
  - KV binding `CACHE`.
- Added `.wrangler` to Prettier and ESLint ignores so generated Wrangler bundles do not break source checks.
- Added `scripts/phase17-generate-seed.mjs`, an operational seed generator that emits idempotent D1 SQL for staging-scale validation data.

No backend domain behavior, frontend product behavior, or architecture was redesigned.

## Validation Evidence

### Backend

| Check                            | Result                                             |
| -------------------------------- | -------------------------------------------------- |
| `npm.cmd run build`              | Passed                                             |
| `npm.cmd run lint`               | Passed                                             |
| `npm.cmd run format:check`       | Passed                                             |
| `npm.cmd run test`               | Passed: 78 tests across 9 files                    |
| Wrangler dry run                 | Passed                                             |
| Local Worker startup             | Passed                                             |
| `/health`                        | 200 OK                                             |
| `/openapi.json`                  | 200 OK                                             |
| Protected endpoints without auth | 401 as expected                                    |
| Cron local trigger               | 200 OK; ran question discovery and visibility scan |

### Admin Control Center

| Check                      | Result                             |
| -------------------------- | ---------------------------------- |
| `npm.cmd run build`        | Passed                             |
| `npm.cmd run lint`         | Passed                             |
| `npm.cmd run format:check` | Passed                             |
| `npm.cmd run test`         | Passed: 5 tests across 2 files     |
| `npm.cmd run test:e2e`     | Passed: 1 Chromium Playwright test |

### Vista Website

| Check                                 | Result                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| `npm.cmd run build` from website root | Passed                                                                         |
| Static/dynamic routes generated       | 102 static pages generated                                                     |
| Warnings                              | Upstash Redis env vars missing; one local TLS certificate warning during fetch |

## Database Certification

### Migration Validation

All 8 D1 migrations were applied successfully to local D1 using Wrangler.

Second local migration pass returned: `No migrations to apply`.

Independent SQLite compatibility check applied all migrations twice and produced:

| Object     | Count |
| ---------- | ----: |
| Migrations |     8 |
| Tables     |    44 |
| Indexes    |    44 |

### Seed Data Validation

The Phase 17 seed generator produced 2,583 idempotent SQL commands and applied them successfully to local D1.

| Required Dataset      | Required | Verified |
| --------------------- | -------: | -------: |
| Discovery Questions   |      100 |      100 |
| AI Generated Articles |       50 |       50 |
| Published Articles    |       25 |       25 |
| FAQ Pages             |       20 |       20 |
| Knowledge Pages       |       10 |       10 |
| Entities              |      500 |      500 |
| Buying Signals        |      200 |      200 |
| Visibility Reports    |      100 |      100 |
| GEO Reports           |       50 |       50 |
| Publishing Jobs       |       20 |       20 |
| AI Generation Jobs    |       20 |       20 |
| Search Index Jobs     |       50 |       50 |

## Workflow Validation

| Workflow                                                                                                    | Evidence                                                                         | Status                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Question Discovery -> Editorial -> Approval -> AI Generation -> GEO -> Publishing -> Visibility -> Indexing | Unit/integration coverage plus seeded D1 records across every table              | Passed locally through tests and data-shape validation |
| Buying Signal Discovery -> Classification -> Opportunity Score -> Recommendation                            | `public-buying-signals.test.ts` passed and 200 opportunities seeded              | Passed locally                                         |
| Publisher Queue -> Retry -> Success -> History                                                              | `publisher.test.ts` passed; seeded jobs and history records exist                | Passed locally                                         |
| Cron scheduled processing                                                                                   | Local scheduled handler returned 200; logs confirm discovery and visibility scan | Passed locally                                         |

## Security Validation

| Control                                     | Status                                                                |
| ------------------------------------------- | --------------------------------------------------------------------- |
| JWT library verification                    | Passed in tests using JOSE/JWKS                                       |
| RS256 / ES256 support                       | Implemented through JOSE allowed algorithms                           |
| JWKS                                        | Implemented and tested                                                |
| Audience and issuer validation              | Implemented and tested                                                |
| Expiration and clock skew                   | Implemented                                                           |
| JWT replay protection                       | Implemented and tested via KV                                         |
| API key path                                | Implemented, but production secret not configured in `wrangler.jsonc` |
| Request signing and nonce replay protection | Implemented and tested when `REQUEST_SIGNING_SECRET` is configured    |
| Rate limiting                               | Implemented through KV-backed limiter                                 |
| Input validation                            | Covered by domain validators and tests                                |
| SQL injection posture                       | Repository code uses prepared statements                              |
| Secret leakage                              | No secret values were written to config or report                     |

## Performance Validation

| Area                        | Evidence                                                  |
| --------------------------- | --------------------------------------------------------- |
| Worker local health latency | `/health` returned 200 in 27 ms during local smoke        |
| OpenAPI local latency       | `/openapi.json` returned 200 in 26 ms during local smoke  |
| D1 count query duration     | 3 ms for seeded aggregate count query                     |
| Cron local execution        | Discovery and visibility completed in local scheduled run |
| Admin production bundle     | Built successfully; JS chunk warning at about 680 kB      |

Performance recommendation: code-split the admin dashboard after production certification if first-load performance becomes a priority. The bundle warning is not a go-live blocker.

## Cloudflare Readiness

| Resource          | Binding                          | Status                                                                                |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| D1 database       | `DB`                             | Configured locally in Wrangler; remote database still needs creation/ID confirmation  |
| KV namespace      | `CACHE`                          | Configured locally in Wrangler; remote namespace still needs creation/ID confirmation |
| Queue             | `AUTHORITY_QUEUE`                | Configured in Wrangler                                                                |
| Dead-letter queue | `vista-ai-authority-events-dead` | Referenced in Wrangler; remote resource still needs confirmation                      |
| Cron trigger      | `*/15 * * * *`                   | Configured and locally triggerable                                                    |
| Observability     | `observability.enabled`          | Configured                                                                            |

Wrangler dry-run now lists `CACHE`, `DB`, and `AUTHORITY_QUEUE`.

## Website Integration Status

The Vista website builds successfully, but it is not currently proven to consume the AI Authority Engine APIs for:

- Latest articles.
- Knowledge pages.
- FAQ pages.
- Related articles.
- Entity graph.
- AI summaries.
- RSS.
- Dynamic sitemap.
- `llms.txt`.
- Structured data.
- Internal linking.
- Canonical URLs.

Current evidence shows the website still primarily uses local/static knowledge, blog, sitemap, and llms resources. This is a production integration blocker for the Phase 17 “consume the engine through APIs only” requirement.

## External Provider Status

| Provider                   | Status                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| OpenAI                     | Waiting for `OPENAI_API_KEY` production/staging secret                                     |
| Anthropic                  | Optional; waiting for `ANTHROPIC_API_KEY` if selected                                      |
| Google AI                  | Optional; waiting for `GOOGLE_AI_API_KEY` if selected                                      |
| Google Search Console      | Endpoint and site URL configured; access token secret must be verified against provider    |
| Bing Webmaster Tools       | Waiting for endpoint/API key configuration                                                 |
| IndexNow                   | Endpoint configured; key and key location not configured                                   |
| Publisher shared token     | Waiting for `PUBLISHER_SHARED_TOKEN` if website publisher requires authenticated ingestion |
| Public buying signal feeds | Waiting for `PUBLIC_BUYING_SIGNAL_FEEDS` if cron ingestion is enabled                      |

Provider success was not claimed because no external provider acceptance responses were available in this run.

## Scores

| Area                  | Score |
| --------------------- | ----: |
| Infrastructure        |   82% |
| Backend               |   94% |
| Frontend Admin        |   95% |
| Database              |   94% |
| Security              |   88% |
| Publishing            |   78% |
| GEO / AI Optimization |   88% |
| Search Integration    |   65% |
| Buying Signals        |   86% |
| Performance           |   84% |
| Reliability           |   86% |
| Maintainability       |   91% |
| Deployment            |   76% |
| Overall Go-Live Score |   84% |

## Remaining Blockers

1. Real Cloudflare staging deployment was not completed in this run.
2. Remote D1 database and KV namespace IDs need to be created/confirmed and bound for staging/production.
3. Required secrets are not all configured or verified:
   - `AUTH_JWKS_URL` or `AUTH_SHARED_SECRET`.
   - `REQUEST_SIGNING_SECRET` if signed requests are required.
   - Active AI provider key.
   - Google Search Console access token.
   - Bing Webmaster API key.
   - IndexNow key and key-location URL.
   - Publisher shared token if needed.
4. Vista website API consumption is not implemented/proven for engine-backed latest articles, entity graph, RSS, sitemap, llms, and related content.
5. External provider validation cannot be certified without live acceptance responses.
6. Website build warns that Upstash Redis URL/token are missing.
7. Local Wrangler emits a certificate-chain warning while fetching `Request.cf` metadata; local dev falls back safely, but the Windows CA setup should be fixed for cleaner tooling.

## Exact Remediation Plan

1. Create remote Cloudflare resources:
   - `wrangler d1 create vista-ai-authority-engine`
   - `wrangler kv namespace create CACHE`
   - `wrangler queues create vista-ai-authority-events`
   - `wrangler queues create vista-ai-authority-events-dead`
2. Add returned D1/KV IDs to `wrangler.jsonc` for production, or environment-specific config.
3. Configure secrets using `wrangler secret put`, never by committing values:
   - `AUTH_JWKS_URL` as a var or `AUTH_SHARED_SECRET` as a secret.
   - `REQUEST_SIGNING_SECRET`
   - `OPENAI_API_KEY` or selected AI provider key.
   - `GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN`
   - `BING_WEBMASTER_API_KEY`
   - `INDEXNOW_KEY`
   - `PUBLISHER_SHARED_TOKEN`
4. Apply remote D1 migrations:
   - `wrangler d1 migrations apply vista-ai-authority-engine --remote --config wrangler.jsonc`
5. Seed staging only:
   - `node scripts/phase17-generate-seed.mjs .phase17-seed.sql`
   - `wrangler d1 execute vista-ai-authority-engine --remote --config wrangler.jsonc --file .phase17-seed.sql`
   - Delete `.phase17-seed.sql` immediately after use.
6. Deploy Worker to staging or production:
   - `wrangler deploy --config wrangler.jsonc`
7. Run smoke tests against the deployed Worker:
   - `GET /health`
   - `GET /openapi.json`
   - Authenticated `GET /ops/health`
   - Authenticated `GET /ops/readiness`
   - Authenticated `GET /questions`
   - Authenticated `GET /content`
   - Authenticated `GET /publish/jobs`
   - Authenticated `GET /visibility/score`
8. Wire the Vista website to consume documented engine APIs for content, entities, AI summaries, RSS, sitemap, llms resources, and related content.
9. Re-run website build and public smoke checks.
10. Validate provider responses and store response metadata/audit logs.

## Production Deployment Checklist

1. Confirm Node 22+ is first in PATH for Wrangler.
2. Confirm Cloudflare API token is active.
3. Create/confirm D1, KV, queue, and dead-letter queue.
4. Add remote resource IDs to Wrangler config.
5. Add all required secrets.
6. Run `npm.cmd run build`.
7. Run `npm.cmd run lint`.
8. Run `npm.cmd run test`.
9. Run `wrangler deploy --dry-run --config wrangler.jsonc`.
10. Run remote D1 migrations.
11. Deploy Worker.
12. Run authenticated smoke tests.
13. Deploy Admin Control Center.
14. Wire Vista website API consumption.
15. Publish one controlled article through the full pipeline.
16. Submit one URL through IndexNow and verify provider acceptance.
17. Verify sitemap, RSS, robots.txt, and llms.txt.
18. Monitor logs for 24 hours.

## Rollback Procedure

1. Stop cron triggers if the deployed Worker starts failing.
2. Use `wrangler versions list` to identify the previous healthy Worker version.
3. Run `wrangler rollback`.
4. If a migration caused the issue, restore the last D1 export into a new database and switch the `DB` binding.
5. Replay only idempotent queue/dead-letter messages after the root cause is fixed.

## Final Certification

Local certification is passed.

Production certification is conditionally blocked by remote Cloudflare setup, provider credentials, provider acceptance checks, and website API-consumption integration.

Final Go-Live Score: 84%.
