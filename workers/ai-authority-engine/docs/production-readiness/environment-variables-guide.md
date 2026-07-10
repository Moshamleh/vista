# Environment Variables Guide

## Required Runtime Variables

| Name                        | Purpose                              | Production Source |
| --------------------------- | ------------------------------------ | ----------------- |
| `NODE_ENV`                  | Runtime mode.                        | Wrangler vars     |
| `SERVICE_NAME`              | Logger and diagnostics service name. | Wrangler vars     |
| `SERVICE_VERSION`           | Logger and diagnostics version.      | Wrangler vars     |
| `AUTH_ISSUER`               | Accepted JWT issuer.                 | Wrangler vars     |
| `AUTH_AUDIENCE`             | Accepted JWT audience.               | Wrangler vars     |
| `LOG_LEVEL`                 | `debug`, `info`, `warn`, or `error`. | Wrangler vars     |
| `RATE_LIMIT_MAX`            | Max requests per window.             | Wrangler vars     |
| `RATE_LIMIT_WINDOW_SECONDS` | Rate limit window.                   | Wrangler vars     |
| `OPENAPI_TITLE`             | OpenAPI title.                       | Wrangler vars     |
| `OPENAPI_VERSION`           | OpenAPI version.                     | Wrangler vars     |

## Required Bindings

| Binding           | Type                      | Status                        |
| ----------------- | ------------------------- | ----------------------------- |
| `DB`              | Cloudflare D1             | Missing from `wrangler.jsonc` |
| `CACHE`           | Cloudflare KV             | Missing from `wrangler.jsonc` |
| `AUTHORITY_QUEUE` | Cloudflare Queue producer | Declared                      |

## Required Secrets

| Secret               | Purpose                                        | Status  |
| -------------------- | ---------------------------------------------- | ------- |
| `AUTH_SHARED_SECRET` | API key auth path for admin and operations.    | Missing |
| `OPENAI_API_KEY`     | Required for current active provider `openai`. | Missing |

Set secrets with:

```powershell
npx.cmd wrangler secret put AUTH_SHARED_SECRET --config wrangler.jsonc
npx.cmd wrangler secret put OPENAI_API_KEY --config wrangler.jsonc
```

## Optional Provider Variables

| Name                                 | Purpose                                 |
| ------------------------------------ | --------------------------------------- |
| `BING_AUTOSUGGEST_ENDPOINT`          | Bing Autosuggest official API endpoint. |
| `BING_AUTOSUGGEST_KEY`               | Bing Autosuggest credential.            |
| `YOUTUBE_SUGGEST_ENDPOINT`           | Replaceable YouTube Suggest endpoint.   |
| `GOOGLE_SEARCH_CONSOLE_ENDPOINT`     | Google Search Console API endpoint.     |
| `GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN` | Search Console access token.            |
| `GOOGLE_SEARCH_CONSOLE_SITE_URL`     | Verified site URL.                      |
| `BING_WEBMASTER_ENDPOINT`            | Bing Webmaster API endpoint.            |
| `BING_WEBMASTER_API_KEY`             | Bing Webmaster API key.                 |
| `INDEXNOW_KEY`                       | IndexNow key.                           |
| `INDEXNOW_KEY_LOCATION`              | Public key location URL.                |
| `ANTHROPIC_API_KEY`                  | Anthropic generation provider key.      |
| `GOOGLE_AI_API_KEY`                  | Google AI generation provider key.      |
| `PUBLISHER_SHARED_TOKEN`             | Shared publisher endpoint token.        |
| `PUBLIC_BUYING_SIGNAL_FEEDS`         | JSON config for permitted public feeds. |

## Feature Flags

| Name                                | Current Value         | Effect                                   |
| ----------------------------------- | --------------------- | ---------------------------------------- |
| `VISIBILITY_SCAN_CRON_ENABLED`      | `true`                | Scheduled visibility scans run.          |
| `EXTERNAL_INDEXING_CRON_ENABLED`    | `false`               | External indexing scheduler is disabled. |
| `PUBLIC_BUYING_SIGNAL_CRON_ENABLED` | `false`               | Buying signal scheduler is disabled.     |
| `QUESTION_DISCOVERY_CRON_SEED`      | `AI visibility Dubai` | Internal seed discovery runs on cron.    |
