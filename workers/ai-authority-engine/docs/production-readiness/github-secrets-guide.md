# GitHub Secrets Guide

The current repository does not include a CI/deployment workflow for the AI Authority Engine. Add these secrets before creating the workflow.

## Required CI Secrets

| Secret                  | Purpose                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Deploy Worker, manage D1 migrations, and read deployment status. |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account target.                                       |
| `AUTH_SHARED_SECRET`    | Production admin/API authentication secret.                      |
| `OPENAI_API_KEY`        | Active AI provider key if `AI_GENERATION_PROVIDER=openai`.       |

## Optional Integration Secrets

| Secret                               | Purpose                                            |
| ------------------------------------ | -------------------------------------------------- |
| `ANTHROPIC_API_KEY`                  | Anthropic provider.                                |
| `GOOGLE_AI_API_KEY`                  | Google AI provider.                                |
| `BING_AUTOSUGGEST_KEY`               | Bing Autosuggest provider.                         |
| `GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN` | Google Search Console imports and indexing status. |
| `BING_WEBMASTER_API_KEY`             | Bing Webmaster imports and URL submission.         |
| `INDEXNOW_KEY`                       | IndexNow submission.                               |
| `PUBLISHER_SHARED_TOKEN`             | Website publisher endpoint authentication.         |

## Recommended Workflow Gates

- Install Node 22.
- Backend install, build, lint, test, format check.
- Admin install, build, lint, test, format check, e2e.
- Wrangler dry-run.
- D1 migration apply on protected deployment branch.
- Wrangler deploy after all checks pass.
