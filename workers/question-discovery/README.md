# Question Discovery Worker

The Question Discovery Worker discovers UAE and GCC search questions from replaceable external suggestion providers.

## Endpoints

- `GET /health` - public health check.
- `GET /schema` - public JSON Schema bundle for discovery request and response payloads.
- `GET /openapi.json` - public OpenAPI 3.1 contract for the worker.
- `POST /discover` - authenticated question discovery endpoint.
- `OPTIONS *` - CORS preflight.

## Authentication

`POST /discover` requires one configured API key supplied by either:

- `Authorization: Bearer <key>`
- `x-api-key: <key>`

Configure keys with `QUESTION_DISCOVERY_API_KEYS` as a comma-separated secret. The worker fails closed with `503 authentication_not_configured` when no keys are configured.

## Rate Limiting

Production rate limiting requires a Cloudflare KV binding named `QUESTION_DISCOVERY_RATE_LIMIT_KV`.

The worker fails closed with `503 rate_limit_not_configured` when the binding is missing. Local tests may set `QUESTION_DISCOVERY_ALLOW_MEMORY_RATE_LIMIT=true` to use the in-memory test path.

Recommended production variables:

- `QUESTION_DISCOVERY_RATE_LIMIT_MAX=60`
- `QUESTION_DISCOVERY_RATE_LIMIT_WINDOW_SECONDS=60`

## Providers

Every external provider is abstracted behind a provider adapter.

Included providers:

- `google-suggest`
- `bing-suggest`

Provider endpoints can be replaced through environment variables:

- `GOOGLE_SUGGEST_ENDPOINT`
- `BING_SUGGEST_ENDPOINT`

Timeout is controlled by `QUESTION_DISCOVERY_PROVIDER_TIMEOUT_MS`.

## Request Example

```json
{
  "seed": "AI website Dubai",
  "market": "AE",
  "language": "en-AE",
  "limit": 25,
  "providers": ["google-suggest", "bing-suggest"]
}
```

## Test Command

```bash
npm run test:question-discovery
```
