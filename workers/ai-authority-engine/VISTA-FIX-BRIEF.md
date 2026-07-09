# Vista by Lara — Website Fix Brief (for Claude Code)

## Context
This is the codebase for vistabylara.com, a Dubai-based AI visibility / digital growth agency.
A full SEO/AEO/GEO audit was completed on 2026-07-09. This brief contains the required changeset.
IMPORTANT: The GitHub repo `Moshamleh/vista` (main branch) may NOT be the production codebase.
Production has ~102 routes including /knowledge, /ai-data, /geo-services-dubai, /aeo-agency-dubai, /ar.
Before making changes, confirm with the user which codebase actually deploys to vistabylara.com.
If working on the production export (from v0.dev), apply ALL sections. If working on the stale
`vista` repo, apply sections 3–5 only (1–2 don't exist there).

## Guiding rule
Only claims that survive third-party verification may appear on the site. AI answer engines
(ChatGPT, Perplexity, Google AI Overviews) cross-check entity claims; one detectable fabrication
discounts every real claim on the domain.

## 1. Remove fabricated trust signals (CRITICAL)
- Delete case studies / portfolio entries for: **Ounass, Stylishop, Liu Jo**. These are not clients.
  Add 301 redirects from their URLs to /work.
- Remove "25 years of expertise" (footer and anywhere else).
- Remove "serving GCC e-commerce market since 2010".
- Remove "Top 3 Agency by AI Mode" from any schema `award` arrays (self-invented).
- Remove the literal placeholder text "[specific free zone if applicable]" and stray "etc.]"
  from homepage/FAQ/credentials content. Search the whole codebase for "[" placeholders.
- Remove unverified claims of "publications in Khaleej Times, Entrepreneur Middle East" unless
  the user provides actual article URLs.
- Fix future-dated blog posts (posts dated after 2026-07-09 must get real past dates).
- Keep: "Noble Business Winner 2025 – Business Innovation" (user states it is real).

## 2. Rebuild case studies around REAL clients
Real client list (user-confirmed): Smokey Oud, Musk Al Khulood, Provance UAE, Inside Home Studio,
Wabel Real Estate, 88 Studies, Plato Health Clinic, Covent Clinic, Fayy Health, Harbor Dubai,
ICS Real Estate, LC Official, Bouguessa, By Noor, Opel Home, Klekktic, Room Envy.
- Anchor the /work registry on 5: Smokey Oud, Musk Al Khulood, Provance, Inside Home Studio, Wabel.
- Each case study must state: real scope, real dates, ONE honest metric. No invented numbers.
- Do NOT publish client quotes/testimonials until the user confirms written permission per client.

## 3. Unify the entity definition (use this exact description everywhere)
"Vista by Lara is a Dubai-based AI visibility and digital growth agency helping UAE and GCC
businesses get found in Google and recommended by AI answer engines through SEO, AEO/GEO,
Shopify optimization, and conversion-focused design."
Apply to: lib/site.ts description, Organization/ProfessionalService schema, homepage hero/meta,
About page, llms.txt, llms-full.txt. One founding year everywhere: **2020**. Delete all other
experience-duration claims (20/25 years, since 2010). Personal experience belongs on LinkedIn only.

## 4. Consolidate doorway pages
Production has ~100 near-duplicate keyword-swap pages (chatgpt-seo-dubai, perplexity-seo-dubai,
ai-seo-dubai, google-ai-overview-optimization-dubai, etc.). Consolidate to ~10 real service pages:
SEO, AEO/GEO (one authoritative page with platform-specific H2 sections), Web Design, Web
Development, Shopify/E-commerce, UI/UX, Branding, AI & Automation, Google Ads, Digital Marketing.
301-redirect every removed page to its surviving parent. Update sitemap accordingly.

## 5. Technical hygiene
- llms.txt: use the rewritten version (entity block, services, key pages, pricing) — already
  committed pattern exists in the repo patch from 2026-07-09.
- Keep robots.ts as-is (AI bots correctly allowed).
- Ensure every blog post has a unique meta description (currently identical boilerplate).
- Verify schema `award`, `foundingDate`, and descriptions match the unified entity data exactly.

## Do NOT
- Do not invent metrics, testimonials, awards, client names, or credentials.
- Do not add new keyword-variant pages.
- Do not deploy; produce changes on a branch (e.g. fix/trust-signals) for the user to review.
