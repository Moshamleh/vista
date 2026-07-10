# API Documentation

The live OpenAPI 3.1 document is served at:

```text
GET /openapi.json
```

All responses use the envelope:

```json
{
  "ok": true,
  "data": {},
  "meta": {
    "requestId": "string",
    "timestamp": "ISO-8601"
  }
}
```

Errors use:

```json
{
  "ok": false,
  "error": {
    "code": "string",
    "message": "string"
  },
  "meta": {
    "requestId": "string",
    "timestamp": "ISO-8601"
  }
}
```

## Authentication

Public:

- `GET /health`
- `GET /openapi.json`

Authenticated:

- All other endpoints.

Use:

```http
x-api-key: <AUTH_SHARED_SECRET>
```

or a Bearer JWT signed by the configured JWKS with RS256 or ES256. JWTs must include matching `iss` and `aud`, plus `sub`, `exp`, and `jti`.

## Endpoint Groups

Foundation:

- `GET /health`
- `GET /diagnostics`
- `GET /openapi.json`

Question Discovery:

- `GET /questions`
- `POST /questions`
- `GET /questions/{id}`
- `POST /discover/run`
- `GET /discover/status`
- `GET /stats`

Content Repository:

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

AI Generation:

- `POST /generate`
- `POST /generate/{contentId}`
- `GET /generate/jobs`
- `GET /generate/jobs/{id}`
- `POST /generate/jobs/{id}/cancel`
- `GET /generate/providers`
- `POST /generate/providers/test`

Publisher:

- `POST /publish`
- `POST /publish/{contentId}`
- `POST /publish/{contentId}/retry`
- `POST /publish/jobs/{id}/cancel`
- `GET /publish/jobs`
- `GET /publish/jobs/{id}`
- `GET /publish/providers`
- `POST /publish/providers/test`

GEO:

- `GET /geo/status`
- `GET /geo/entities`
- `GET /geo/schema/{contentId}`
- `POST /geo/optimize/{contentId}`
- `POST /geo/validate/{contentId}`
- `GET /geo/report/{contentId}`

Visibility:

- `GET /visibility/status`
- `GET /visibility/score`
- `GET /visibility/history`
- `GET /visibility/recommendations`
- `POST /visibility/scan`

External Search:

- `POST /index/submit`
- `POST /index/batch`
- `GET /index/status`
- `GET /search-console/status`
- `GET /bing/status`
- `POST /sitemap/generate`
- `POST /robots/generate`
- `POST /llms/generate`

Buying Signals:

- `GET /signals`
- `GET /signals/{id}`
- `POST /signals/scan`
- `GET /opportunities`
- `GET /opportunities/{id}`
- `GET /sources`
