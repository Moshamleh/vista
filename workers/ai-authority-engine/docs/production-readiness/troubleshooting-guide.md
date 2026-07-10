# Troubleshooting Guide

## Wrangler Requires Node 22

Symptom:

```text
Wrangler requires at least Node.js v22.0.0. You are using v20.19.0.
```

Fix:

- Install or activate Node 22+.
- Rerun `npx.cmd wrangler deploy --dry-run --config wrangler.jsonc`.

## D1 Binding Missing

Symptom:

```json
{ "code": "d1_not_configured" }
```

Fix:

- Add `d1_databases` with binding `DB` to `wrangler.jsonc`.
- Redeploy.

## KV Binding Missing

Symptom:

```json
{ "code": "kv_not_configured" }
```

Fix:

- Add `kv_namespaces` with binding `CACHE` to `wrangler.jsonc`.
- Redeploy.

## Queue Binding Missing

Symptom:

```json
{ "code": "queue_not_configured" }
```

Fix:

- Create the Cloudflare queue.
- Confirm producer binding `AUTHORITY_QUEUE`.
- Redeploy.

## Authentication Fails

Symptom:

```json
{ "code": "unauthorized" }
```

Fix:

- Confirm `AUTH_SHARED_SECRET` is set as a secret.
- Send `x-api-key` from the admin client.
- Confirm no whitespace or old secret is used.

## Provider Test Fails

Fix by provider:

- OpenAI: set `OPENAI_API_KEY`.
- Anthropic: set `AI_GENERATION_PROVIDER=anthropic` and `ANTHROPIC_API_KEY`.
- Google AI: set `AI_GENERATION_PROVIDER=google-ai` and `GOOGLE_AI_API_KEY`.
- IndexNow: set `INDEXNOW_KEY` and `INDEXNOW_KEY_LOCATION`.
- Search Console: verify site ownership and access token scope.
- Bing Webmaster: verify API key and site registration.
