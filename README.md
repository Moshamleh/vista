# Vista by Lara

Next.js website for Vista by Lara, a Dubai branding, UX, web, and AI visibility studio.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Checks

Run these before shipping:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm audit --prod
pnpm build
```

## Environment Variables

Copy `.env.example` and fill production values in your hosting provider.

- `GMAIL_USER`: Gmail account used by the contact form.
- `GMAIL_APP_PASSWORD`: Gmail app password for contact-form delivery.
- `LEADS_ADMIN_TOKEN`: Admin token for `/crm` and `/api/leads`.
- `BLOG_ADMIN_TOKEN`: Admin token for blog publishing.
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL for blog/rate-limit storage.
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token.
- `NEXT_PUBLIC_SITE_URL`: Public site origin, for example `https://www.vistabylara.com`.

## GitHub Secrets

- `VISTA_AUTOMATION_TOKEN`: Sent by the scheduled workflow to the automation worker. The worker must validate this bearer token.

## Security Notes

- Public API routes enforce origin checks and rate limits.
- `/api/*` and `/crm` are marked `noindex` and `no-store`.
- Security headers, including CSP and HSTS, are configured in `next.config.mjs`.
- JSON-LD output must use `jsonLd()` from `lib/json-ld.ts`.

## Deployment

The app is intended to deploy from `main`. After deployment, verify:

- Homepage returns `200`.
- `/api/contact` rejects invalid JSON with `400`.
- Cross-site API probes return `403`.
- Admin routes require their configured tokens.
