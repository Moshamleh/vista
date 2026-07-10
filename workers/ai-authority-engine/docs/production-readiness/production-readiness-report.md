# Vista AI Authority Engine Production Readiness Report

Date: 2026-07-01  
Scope: Foundation, Question Discovery, Content Repository, AI Generation, Publisher Engine, GEO Optimization, AI Visibility Intelligence, External Search Indexing, Public Buying Signals, and React Admin Control Center.

## Executive Summary

The Vista AI Authority Engine codebase is functionally implemented and locally verified. TypeScript compilation, linting, formatting, backend tests, admin tests, and admin browser e2e tests pass after excluding generated admin build artifacts from root checks.

The engine is not yet production deployable. The main blockers are operational configuration, not missing domain code:

- Wrangler cannot be dry-run verified on this machine because the active Node runtime is `v20.19.0`; Wrangler 4 requires Node 22 or newer.
- `wrangler.jsonc` does not declare the required D1 binding `DB`.
- `wrangler.jsonc` does not declare the required KV binding `CACHE`.
- Production authentication still needs `AUTH_SHARED_SECRET` or `AUTH_JWKS_URL` configured.
- Required provider credentials are absent for the active OpenAI provider and optional search/indexing integrations.
- There is no GitHub Actions CI/deployment workflow for this Worker; the only workflow currently pings an older Vista Guardian automation endpoint.

Production Readiness Score: **76%**

The score reflects a complete, tested application surface with unresolved Cloudflare provisioning, deployment runtime, secrets, and integration enablement tasks.

## Verification Results

| Check                    | Result     | Evidence                                                                                  |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------- |
| Backend TypeScript build | Pass       | `npm.cmd run build`                                                                       |
| Backend ESLint           | Pass       | `npm.cmd run lint`                                                                        |
| Backend Prettier         | Pass       | `npm.cmd run format:check`                                                                |
| Backend tests            | Pass       | `75 passed` across 9 test files                                                           |
| Admin build              | Pass       | `npm.cmd run build`                                                                       |
| Admin ESLint             | Pass       | `npm.cmd run lint`                                                                        |
| Admin Prettier           | Pass       | `npm.cmd run format:check`                                                                |
| Admin tests              | Pass       | `5 passed` across 2 test files                                                            |
| Admin e2e                | Pass       | `1 passed` in Chromium                                                                    |
| Wrangler dry-run         | Blocked    | Wrangler requires Node 22+, current shell uses Node `v20.19.0`                            |
| GitHub Actions           | Incomplete | Only `.github/workflows/daily-task.yml` exists; no AI Authority Engine CI/deploy workflow |

Vitest checks required escalation outside the filesystem sandbox because esbuild could not read the Windows path from inside the restricted sandbox. The commands passed once run with normal filesystem access.

## Implemented Domain Inventory

| Domain                                    | Status           | Notes                                                                                                         |
| ----------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Shared foundation                         | Verified         | Config loader, DI, D1/KV/Queue abstractions, auth, validation, logging, health, diagnostics, OpenAPI.         |
| Question Discovery                        | Verified         | Providers, normalization, entity extraction, intent classification, scoring, D1 repositories, API, cron path. |
| Content Repository and Editorial Pipeline | Verified         | Lifecycle workflow, versioning, templates, queues, repositories, audit trail, API.                            |
| AI Content Generation                     | Verified         | OpenAI, Anthropic, Google AI abstractions, RAG, prompt templates, validation, queue jobs, API.                |
| Publisher Engine                          | Verified         | Publisher registry, eight providers, transformations, retries, artifacts, history, API, queue path.           |
| GEO and AI Optimization                   | Verified         | Entity graph, schema generation, canonical validation, metadata, AI resources, internal links, reports, API.  |
| AI Visibility Intelligence                | Verified         | Ten signal providers, trend scoring, recommendations, cron path, API.                                         |
| External Search Intelligence and Indexing | Verified         | GSC, Bing, IndexNow, sitemap, RSS, robots, llms resources, cron path, API.                                    |
| Public Buying Signal Intelligence         | Verified         | Public feed provider SDK, classification, scoring, recommendations, cron path, API.                           |
| React Admin Control Center                | Verified locally | Vite app, generated API client, auth settings, responsive views, tests, e2e. Deployment target still manual.  |

## API Endpoint Verification

OpenAPI 3.1 documents the following endpoints:

- `GET /health`
- `GET /diagnostics`
- `GET /openapi.json`
- `GET /questions`
- `POST /questions`
- `GET /questions/{id}`
- `POST /discover/run`
- `GET /discover/status`
- `GET /stats`
- `GET /content`
- `POST /content`
- `GET /content/{id}`
- `PATCH /content/{id}`
- `DELETE /content/{id}`
- `POST /content/{id}/approve`
- `POST /content/{id}/reject`
- `POST /content/{id}/schedule`
- `POST /content/{id}/rollback`
- `GET /editorial/queue`
- `GET /publication/queue`
- `POST /generate`
- `POST /generate/{contentId}`
- `GET /generate/jobs`
- `GET /generate/jobs/{id}`
- `POST /generate/jobs/{id}/cancel`
- `GET /generate/providers`
- `POST /generate/providers/test`
- `POST /publish`
- `POST /publish/{contentId}`
- `POST /publish/{contentId}/retry`
- `POST /publish/jobs/{id}/cancel`
- `GET /publish/jobs`
- `GET /publish/jobs/{id}`
- `GET /publish/providers`
- `POST /publish/providers/test`
- `GET /geo/status`
- `GET /geo/entities`
- `GET /geo/schema/{contentId}`
- `POST /geo/optimize/{contentId}`
- `POST /geo/validate/{contentId}`
- `GET /geo/report/{contentId}`
- `GET /visibility/status`
- `GET /visibility/score`
- `GET /visibility/history`
- `GET /visibility/recommendations`
- `POST /visibility/scan`
- `POST /index/submit`
- `POST /index/batch`
- `GET /index/status`
- `GET /search-console/status`
- `GET /bing/status`
- `POST /sitemap/generate`
- `POST /robots/generate`
- `POST /llms/generate`
- `GET /signals`
- `GET /signals/{id}`
- `POST /signals/scan`
- `GET /opportunities`
- `GET /opportunities/{id}`
- `GET /sources`

All domain test suites include API tests for their endpoints.

## D1 Migration Verification

Eight migrations exist and include the required tables:

- `0001_question_discovery.sql`: `questions`, `discovery_runs`, `providers`, `entities`
- `0002_content_repository.sql`: `content`, `content_versions`, `content_templates`, `editorial_queue`, `review_queue`, `publication_queue`, `tags`, `categories`, `internal_links`, `content_audit_events`
- `0003_ai_generation.sql`: `ai_generation_jobs`, `ai_prompt_templates`, `ai_provider_checks`
- `0004_publisher_engine.sql`: `publish_jobs`, `publish_targets`, `publish_history`, `publish_failures`, `publish_artifacts`
- `0005_geo_ai_optimization.sql`: `entity_graph`, `schema_documents`, `geo_reports`, `internal_link_graph`, `optimization_history`
- `0006_ai_visibility_intelligence.sql`: `visibility_snapshots`, `visibility_scores`, `visibility_recommendations`, `validation_runs`
- `0007_external_search_indexing.sql`: `indexing_jobs`, `indexing_results`, `search_console_imports`, `bing_imports`, `sitemap_versions`, `robots_versions`, `llms_versions`
- `0008_public_buying_signal_intelligence.sql`: `signal_sources`, `organizations`, `buying_signals`, `opportunities`, `opportunity_scores`, `ingestion_runs`

Migration tests exist for every domain and passed.

## Repositories

Repository pattern coverage is present for every D1 domain table. Shared generic storage exists in `src/repositories`, and each domain owns its table repositories under `src/domains/*/repositories.ts`.

Verified repository families:

- Foundation: generic D1 JSON repository and KV JSON store.
- Question Discovery: questions, discovery runs, providers, entities.
- Content Pipeline: content, versions, templates, editorial queue, review queue, publication queue, tags, categories, internal links, audit.
- AI Generation: jobs, prompt templates, provider checks.
- Publisher: jobs, targets, history, failures, artifacts.
- GEO: entity graph, schema documents, reports, internal link graph, history.
- Visibility: snapshots, scores, recommendations, validation runs, context repository.
- External Search: indexing jobs/results, GSC imports, Bing imports, sitemap, robots, llms versions.
- Buying Signals: signal sources, organizations, signals, opportunities, scores, ingestion runs.

## Queue Verification

Configured binding:

- Producer binding: `AUTHORITY_QUEUE`
- Queue name: `vista-ai-authority-events`
- Dead letter queue: `vista-ai-authority-events-dead`
- Consumer retries: `max_retries: 3`
- Batch size: `10`
- Batch timeout: `30`

Runtime behavior:

- `publisher.run` messages call the Publisher service and retry after 120 seconds on failure.
- `ai-generation.run` messages call the AI Generation service and retry after 60 seconds on failure.
- Unknown messages are acknowledged.

Gap:

- Queues are declared in `wrangler.jsonc`, but Cloudflare queue creation was not verified.

## Cron Verification

Wrangler cron trigger:

- `*/15 * * * *`

Scheduled tasks:

- Question discovery runs when `QUESTION_DISCOVERY_CRON_SEED` is set.
- Visibility scanning runs when `VISIBILITY_SCAN_CRON_ENABLED=true`.
- External indexing runs when `EXTERNAL_INDEXING_CRON_ENABLED=true`.
- Public buying signal ingestion runs when `PUBLIC_BUYING_SIGNAL_CRON_ENABLED=true`.

Currently enabled:

- Question discovery internal seed.
- Visibility scanning.

Currently disabled:

- External indexing cron.
- Public buying signal cron.

## Provider Readiness

| Provider Area                       | Runtime Status         | Production Configuration Status                                     |
| ----------------------------------- | ---------------------- | ------------------------------------------------------------------- |
| Internal Seed Discovery             | Ready                  | Configured through `INTERNAL_SEED_QUESTIONS`.                       |
| Manual Import Discovery             | Ready                  | API-driven; no credential needed.                                   |
| YouTube Suggest                     | Ready                  | Endpoint optional; no credential currently configured.              |
| Bing Autosuggest                    | Awaiting config        | Needs `BING_AUTOSUGGEST_ENDPOINT` and `BING_AUTOSUGGEST_KEY`.       |
| Google Search Console Discovery     | Awaiting config        | Needs GSC endpoint, token, and site URL.                            |
| OpenAI Generation                   | Awaiting credential    | Active provider is `openai`; needs `OPENAI_API_KEY`.                |
| Anthropic Generation                | Inactive               | Needs provider switch and `ANTHROPIC_API_KEY`.                      |
| Google AI Generation                | Inactive               | Needs provider switch and `GOOGLE_AI_API_KEY`.                      |
| Website Publisher                   | Ready by abstraction   | Confirm receiving endpoint/auth before enabling live publishing.    |
| RSS/JSON/Markdown Export            | Ready                  | Artifact generation path available.                                 |
| GitHub/Blogger/Medium/VistaNewsWire | Artifact/adapter ready | Confirm platform endpoint and auth strategy before live automation. |
| Visibility Providers                | Ready                  | Use internal repository signals.                                    |
| Google Search Console Indexing      | Awaiting config        | Needs official API credentials.                                     |
| Bing Webmaster Tools                | Awaiting config        | Needs official API credentials.                                     |
| IndexNow                            | Awaiting config        | Needs `INDEXNOW_KEY` and `INDEXNOW_KEY_LOCATION`.                   |
| Public Buying Signal Feeds          | Awaiting config        | Needs `PUBLIC_BUYING_SIGNAL_FEEDS`.                                 |

## Authentication and Permissions

Current flow:

- `GET /health` and `GET /openapi.json` are public.
- `GET /diagnostics` and all domain endpoints require authentication.
- Authentication accepts `x-api-key` when `AUTH_SHARED_SECRET` is configured.
- Authentication verifies RS256/ES256 JWTs through JWKS, validates issuer/audience/expiration, applies clock skew, and rejects replayed JWT IDs.

Production blocker:

- No production shared secret or JWKS URL is configured in `wrangler.jsonc`.

Security note:

- JWT authentication now requires a signed token from `AUTH_JWKS_URL` using RS256 or ES256, and each accepted JWT must include `sub`, `exp`, and `jti`.

## Environment Variable Readiness

Required base variables are present in `wrangler.jsonc` except for runtime secrets and bindings.

Critical missing production items:

- `AUTH_SHARED_SECRET` or a production-ready auth gateway.
- D1 binding `DB`.
- KV binding `CACHE`.
- Active AI provider credential: `OPENAI_API_KEY` for current config.
- Cloudflare-created queues.

Optional but required for full integrations:

- `BING_AUTOSUGGEST_ENDPOINT`
- `BING_AUTOSUGGEST_KEY`
- `YOUTUBE_SUGGEST_ENDPOINT`
- `GOOGLE_SEARCH_CONSOLE_ENDPOINT`
- `GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN`
- `GOOGLE_SEARCH_CONSOLE_SITE_URL`
- `BING_WEBMASTER_ENDPOINT`
- `BING_WEBMASTER_API_KEY`
- `INDEXNOW_KEY`
- `INDEXNOW_KEY_LOCATION`
- `PUBLIC_BUYING_SIGNAL_FEEDS`
- `PUBLISHER_SHARED_TOKEN`

## Deployment Configuration

`wrangler.jsonc` includes:

- Worker name.
- Entrypoint.
- Compatibility date.
- `nodejs_compat`.
- Observability.
- Cron trigger.
- Queue producer/consumer.
- Production vars.

Missing:

- `d1_databases` binding for `DB`.
- `kv_namespaces` binding for `CACHE`.
- Route/custom domain configuration if `workers_dev` is not the final target.
- Verified production Cloudflare resource IDs.

Blocked verification:

- `npx.cmd wrangler deploy --dry-run --config wrangler.jsonc` did not run because Node is `v20.19.0` and Wrangler 4 requires Node 22 or newer.

## GitHub Actions Verification

Current workflow:

- `.github/workflows/daily-task.yml` pings `https://vista-automation-engine.vistabylara.workers.dev/automation`.

Missing:

- No workflow for `workers/ai-authority-engine` build, lint, test, format, Wrangler dry-run, or deployment.
- No admin control center CI workflow.
- No Cloudflare deployment job for this Worker.

## Remaining Manual Steps Before Production

1. Upgrade the deployment runtime to Node 22 or newer.
2. Create the Cloudflare D1 database.
3. Add the D1 `DB` binding and database IDs to `wrangler.jsonc`.
4. Apply migrations `0001` through `0008` to the production D1 database.
5. Create the Cloudflare KV namespace for `CACHE`.
6. Add the KV namespace ID to `wrangler.jsonc`.
7. Create `vista-ai-authority-events` and `vista-ai-authority-events-dead` queues.
8. Set `AUTH_SHARED_SECRET` as a Wrangler secret or configure Cloudflare Access.
9. Set `OPENAI_API_KEY` or switch `AI_GENERATION_PROVIDER` and set the matching key.
10. Configure Search Console, Bing Webmaster, IndexNow, and buying-signal feed credentials when those integrations should run.
11. Decide whether to keep `workers_dev=true` or add a custom Cloudflare route.
12. Add GitHub Actions CI/deployment for the Worker and admin app.
13. Deploy the admin app to its selected static hosting target.
14. Configure admin app engine URL and API key storage policy.
15. Run Wrangler dry-run successfully after Node 22 is active.
16. Deploy to Cloudflare.
17. Verify `/health`, `/openapi.json`, `/diagnostics`, queue processing, and cron logs in Cloudflare.
18. Run provider test endpoints after secrets are configured.

## Production Decision

Current decision: **Do not deploy to production yet.**

The code is ready enough for staging once Cloudflare resources and secrets are created. Production should wait until Wrangler dry-run passes under Node 22+, D1/KV bindings are present, auth is configured, and provider credentials are intentionally enabled or documented as disabled.
