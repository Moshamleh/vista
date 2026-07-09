# Vista AI Knowledge Platform Master Specification

Version: Parts 1-6
Status: Active foundation standard
Primary market: Dubai, UAE, and GCC

## Purpose

The Vista AI Knowledge Platform is a research-grade authority system, not a traditional blog. Every article must work as a standalone technical resource for UAE decision-makers and as an extractable source for AI search, answer engines, and generative engines.

## Core Objective

Build an AI-readable knowledge platform where each article provides original insight, structured evidence, reusable decision tools, and conversion paths for Vista by Lara's Dubai and GCC audience.

## Platform Principles

- Accuracy: state only claims that can be supported by Vista evidence, reputable UAE/GCC sources, or clearly labeled expert analysis.
- Originality: publish proprietary frameworks, decision trees, comparisons, and diagnostic models.
- Technical depth: explain root causes, implementation implications, and operational risk.
- Reusable components: use consistent article modules that can be rendered, reused, and extended.
- Accessibility: meet WCAG AA expectations with readable hierarchy, descriptive alt text, and keyboard-friendly page structure.
- Performance: favor server-rendered content, optimized images, and stable layouts.
- Semantic architecture: connect every article to a hub, service, proof node, and CTA.
- AI readability: expose direct answers, entity relationships, FAQs, tables, and schema recommendations in crawlable HTML.

## Knowledge Hub Architecture

```text
Knowledge Hub
|-- AI Visibility
|-- GEO
|-- AI Search
|-- AI Websites
|-- Google Ads
|-- Shopify
|-- AI Automation
|-- CRO
|-- UX/UI
`-- Research
```

Every article must belong to one primary hub and may reference secondary hubs when the content naturally crosses topics.

## Article Standard

Each article package must include:

- SEO package: title, meta description, canonical URL, semantic H1/H2/H3 structure, internal links, alt text, and structured data recommendations.
- GEO package: entity map, retrieval keywords, semantic keyword coverage, knowledge graph alignment, and AI-citable summary.
- Executive summary: direct, decision-maker-oriented, and under 90 words.
- AI summary: 40-60 words that can stand alone in an AI answer.
- Table of contents: generated from research sections and decision modules.
- Research sections: source-grounded, UAE/GCC-specific, and written with direct answers first.
- Proprietary Vista framework: named diagnostic model or implementation standard.
- Decision tree: clear routing logic for buyers and operators.
- Tables: comparisons, benchmarks, scoring models, or implementation checklists.
- FAQs: at least five AEO-ready questions and answers.
- CTA: specific local action such as WhatsApp, Technical Briefing, or Infrastructure Integrity Audit.
- Schema recommendations: TechArticle or BlogPosting, FAQPage, BreadcrumbList, Service where applicable.
- Internal links: homepage, hub, service page, case-study proof node, and contact path.
- Image prompts: one hero image prompt and optional in-article visual prompts.
- Publishing checklist: metadata, links, schema, accessibility, performance, and AI readability.

## Reusable Components

- Hero: article headline, category, date, executive summary, and optional visual.
- Sticky TOC: hub context, article sections, read time, and retrieval keywords.
- Insight Box: research-grade claim with supporting context.
- Expert Recommendation: Vista action guidance for UAE/GCC operators.
- Common Mistake: risk pattern and corrected practice.
- Comparison Table: structured difference between market standard and Vista standard.
- Checklist: implementation or publishing tasks.
- Decision Tree: conditional routing logic with recommended next action.
- FAQ: AEO-ready question and answer blocks.
- Related Resources: links to service pages, hubs, case studies, and related articles.
- CTA: WhatsApp, Technical Briefing, or Infrastructure Integrity Audit.

## SEO Requirements

- Use one unique title and one meta description per article.
- Include a canonical URL for every published route.
- Use semantic headings in order; do not skip directly from H1 to unrelated H3 content.
- Link to relevant internal hub, service, case-study, and conversion pages.
- Recommend structured data in the article package.
- Use descriptive alt text that states the subject, location, and purpose of the image.

## GEO Requirements

- Map entities: Vista by Lara, service category, Dubai/UAE, target buyer, differentiator, outcome, and related hubs.
- Include an AI summary designed for retrieval.
- Include an executive summary for principal-level readers.
- Add retrieval keywords and semantic keyword coverage.
- Align every article with the Vista knowledge graph: hub, services, proof nodes, FAQs, and CTA.
- Write FAQs that answer exact Dubai/UAE buyer questions in three sentences or fewer.

## Performance And Accessibility

- Use responsive layouts across mobile and desktop.
- Lazy-load non-critical images and optimize hero assets.
- Keep layouts stable to support Core Web Vitals.
- Render core article content server-side where practical.
- Meet WCAG AA contrast and readable typography expectations.
- Avoid visual-only claims; important content must exist as text.

## Publishing Workflow

1. Update this master specification when platform rules change.
2. Produce the full article package.
3. Review metadata, canonical URL, headings, and internal links.
4. Generate or select visuals with descriptive alt text.
5. Publish the article.
6. Link it into the knowledge graph, `llms.txt`, related hubs, and relevant service pages.

## Flagship Roadmap

Article #001 is `Why AI Isn't Recommending Your Business`. It must establish the platform standard for AI Visibility, GEO, AI Search, and AI Websites in Dubai and the UAE.

## Part 2: Implementation Standards

Part 2 defines the article package, metadata, AI optimization, reusable frameworks, and development workflow required for future Vista AI Knowledge Platform publishing.

## Article Package Blueprint

Each article package must contain:

- SEO title.
- Meta title.
- Meta description.
- URL slug and canonical URL.
- Open Graph and Twitter metadata.
- Executive summary.
- AI summary.
- Table of contents.
- Full article body.
- Proprietary Vista framework.
- Comparison tables.
- UAE examples.
- FAQs.
- CTA.
- Internal linking map.
- Schema recommendations.
- Image or diagram prompts.
- Publishing checklist.

## Knowledge Graph Model

Every article must define:

- Primary entity.
- Secondary entities.
- Related services.
- Related guides.
- Geographic entities.
- Technologies.
- Organization references.
- Entity relationships.

The knowledge graph must connect the article to Vista by Lara, the primary UAE/GCC location target, the relevant service category, the proof or guide layer, and the conversion path.

## Reusable Vista Frameworks

Reserve these branded frameworks for consistent use across the platform:

- Vista AI Visibility Index(TM).
- Vista GEO Pyramid(TM).
- Vista Entity Confidence Model(TM).
- Vista Digital Trust Matrix(TM).
- Vista Recommendation Confidence Model(TM).

Clearly identify each framework as a Vista by Lara methodology. Do not present these as external industry standards.

## Implementation Guidance For Next.js

- Use MDX or structured content for articles.
- Keep metadata separate from the article body.
- Generate JSON-LD dynamically from article metadata and body blocks.
- Support reusable React components for hero, TOC, FAQ, callouts, tables, checklists, related content, and CTAs.
- Keep article content server-rendered where practical.

## Content Quality Rules

- Avoid filler.
- Support claims with evidence where possible.
- Separate facts from opinions.
- Use clear headings, concise paragraphs, comparison tables, and actionable guidance.
- Keep UAE and GCC intent visible in headings, summaries, examples, FAQs, and CTAs.

## Publishing Workflow Detail

Use this workflow for every article:

1. Draft.
2. Technical review.
3. Metadata review.
4. Internal linking.
5. Schema validation.
6. Performance review.
7. Publish.
8. Monitor.

## Article Completion Checklist

- Metadata complete.
- Internal links added.
- Entity map reviewed.
- FAQ complete.
- Image prompts written.
- Schema reviewed.
- Accessibility reviewed.
- Performance reviewed.
- CTA included.

## Part 3: Engineering Specification

Part 3 defines the recommended Next.js and Vercel architecture for the long-term Vista AI Knowledge Platform. The current `lib/blog.ts` path may remain active during migration, but new evergreen knowledge assets should follow this structure when practical.

## Recommended Project Structure

```text
app/
  (marketing)/
  knowledge/
    [pillar]/
      [slug]/
        page.tsx
        loading.tsx
        opengraph-image.tsx
components/
  knowledge/
content/
  knowledge/
    ai-visibility/
      article-name/
        article.mdx
        meta.json
        faq.json
        entities.json
        related.json
        changelog.json
        downloads.json
public/
  diagrams/
  downloads/
lib/
  seo/
  schema/
  entities/
  search/
```

## Structured Content Model

Store article content separately from metadata. Each article folder should include:

- `article.mdx`: the full article body.
- `meta.json`: title, SEO, canonical, publishing, audience, and keyword data.
- `faq.json`: AEO-ready FAQ questions and answers.
- `entities.json`: knowledge graph entities and relationships.
- `related.json`: manually curated and entity-derived related resources.
- `changelog.json`: version history for long-lived assets.
- `downloads.json`: optional diagrams, PDFs, worksheets, or reference files.

## Metadata Schema

`meta.json` must define:

- `title`
- `seoTitle`
- `metaDescription`
- `excerpt`
- `slug`
- `canonical`
- `publishedAt`
- `updatedAt`
- `readingTime`
- `author`
- `pillar`
- `tags`
- `focusKeyword`
- `secondaryKeywords`
- `image`
- `difficulty`
- `audience`

## Entity Schema

`entities.json` must define:

- `primaryEntity`
- `secondaryEntities`
- `organizations`
- `people`
- `places`
- `technologies`
- `services`
- `products`
- `relatedConcepts`

## Rendering Pipeline

1. Read MDX.
2. Read metadata.
3. Generate Next.js metadata.
4. Generate JSON-LD.
5. Build table of contents.
6. Resolve related articles.
7. Render reusable components.
8. Inject FAQ schema.
9. Export RSS and search index records.

## Reusable React Components

The knowledge platform should standardize these components under `components/knowledge/`:

- `KnowledgeHero`
- `StickyTOC`
- `ExecutiveSummary`
- `AISummary`
- `VistaFramework`
- `InsightBox`
- `ComparisonTable`
- `Checklist`
- `DecisionTree`
- `FAQ`
- `RelatedArticles`
- `AuthorCard`
- `CTA`

## Performance Standards

- Use Server Components where practical.
- Use dynamic imports for heavy widgets.
- Use responsive images with explicit dimensions.
- Preload the hero image for featured articles.
- Use static generation for evergreen articles.
- Target excellent Core Web Vitals.

## Search And Discovery

- Build a local search index from structured article metadata.
- Support filtering by pillar, entity, technology, audience, and service.
- Prefer automatic `related by entity` recommendations over simple tag matching.
- Preserve curated related links when an editor has specified them.

## Versioning

- Maintain `changelog.json` for each long-lived knowledge asset.
- Display `Last Updated` on article pages.
- Track major revisions when frameworks, recommendations, evidence, or platform standards change.

## Part 4: SEO, GEO, AEO, And AI Retrieval Standards

Part 4 defines the governance rules for search visibility, generative engine retrieval, answer engine extraction, entity consistency, and editorial review across the Vista AI Knowledge Platform.

## SEO Governance

Every knowledge asset must include:

- Unique SEO title between 50 and 60 characters.
- Meta description between 140 and 160 characters.
- Canonical URL.
- Open Graph metadata.
- Twitter metadata.
- Descriptive slug.
- Breadcrumbs.
- XML sitemap inclusion.

## Generative Engine Optimization Governance

Each knowledge page must include:

- Executive summary.
- AI summary.
- Clearly defined entities.
- Comprehensive topic coverage.
- FAQ section.
- Original insights and proprietary Vista frameworks where relevant.
- Consistent terminology across headings, body copy, schemas, and related resources.
- Contextual internal links to the knowledge graph, service layer, and proof layer.

## Answer Engine Optimization Governance

Knowledge assets must answer common questions concisely before expanding into deeper explanation.

- Use question-based headings where they reflect real Dubai, UAE, or GCC buyer questions.
- Place direct answers before supporting context.
- Keep structured FAQ answers suitable for answer engines.
- Include FAQ content in crawlable HTML and corresponding JSON-LD.
- Keep FAQ answers to three sentences or fewer.

## Entity Strategy

Every article must define:

- Primary entity.
- Supporting entities.
- Geographic entities.
- Technology entities.
- Organization entities.
- Service entities.

Map relationships consistently across the site so AI systems can connect Vista by Lara, the article topic, UAE/GCC locations, relevant services, proof nodes, technologies, and conversion paths.

## Knowledge Graph Strategy

- Maintain a central entity registry.
- Reference entities consistently across article metadata, schema, body content, and related resources.
- Link articles through concepts, entities, services, and proof nodes, not only categories.
- Preserve entity names exactly unless a documented alias or transliteration is required.

## Internal Linking Rules

Each article should link to:

- 3-5 pillar pages.
- 5-10 supporting resources.
- Relevant service pages.
- Related case studies or proof nodes.

Anchor text must be descriptive, contextually relevant, and useful without surrounding text.

## Originality Standard

Do not rewrite competitor articles. Vista knowledge assets must provide proprietary frameworks, practical implementation guidance, decision trees, checklists, original diagrams, comparison tables, and operational recommendations for Dubai, UAE, and GCC decision-makers.

## Editorial Review Checklist

Before publication, confirm:

- Technical accuracy.
- Metadata reviewed.
- Links verified.
- Accessibility checked.
- Facts distinguished from opinion.
- Images have descriptive alt text.
- CTA present.
- Version updated.

## Part 5: Data Architecture, Governance, Indexing, Analytics, And Automation

Part 5 defines the structured data foundation, content governance model, indexing requirements, analytics strategy, quality gates, and automation pipeline for the Vista AI Knowledge Platform.

## Content Database Model

Treat every knowledge asset as structured data rather than a standalone page. Content must remain separate from presentation so article data can support pages, search, recommendations, schemas, downloads, and future API endpoints.

Core objects:

- Article.
- Author.
- Entity.
- Service.
- Category or Pillar.
- FAQ.
- Framework.
- Diagram.
- Download.
- Case Study.
- Tool.

Each object should have a stable identifier and explicit relationships to other objects.

## Suggested TypeScript Interfaces

Create and maintain interfaces for:

- `ArticleMeta`.
- `Entity`.
- `FAQItem`.
- `Framework`.
- `RelatedArticle`.
- `DownloadAsset`.
- `AuthorProfile`.
- `ServiceReference`.

Keep content, metadata, relationships, and presentation concerns separated.

## Search Index

Generate a search index during build time.

Index:

- Titles.
- Headings.
- Excerpts.
- Entities.
- Keywords.
- FAQs.
- Services.
- Framework names.

The search layer should support autocomplete and semantic filtering by pillar, entity, technology, audience, service, and framework where practical.

## Recommendation Engine

Recommend content using weighted relationships:

1. Shared entities.
2. Same pillar.
3. Same service.
4. Similar audience.
5. Related technologies.

Avoid simple tag-only recommendations. Prefer entity-derived relationships and preserve curated editorial links when they exist.

## Analytics Strategy

Track aggregated behavior signals for knowledge assets:

- Scroll depth.
- TOC clicks.
- CTA clicks.
- Internal link clicks.
- PDF downloads.
- Calculator usage.
- Time on page.
- Search queries.

Use aggregated analytics to improve content coverage, internal links, CTA placement, FAQs, downloads, and retrieval pathways.

## Content Governance

Assign every knowledge asset one of these statuses:

- Draft.
- Technical Review.
- SEO Review.
- Published.
- Updated.
- Archived.

Record reviewer and last review date. Long-lived assets must keep revision history through changelog data.

## Automation Pipeline

Use this suggested workflow for knowledge platform publishing:

```text
Content commit
-> Validation
-> Metadata validation
-> Schema generation
-> Internal link validation
-> Build
-> Performance checks
-> Deploy to Vercel
```

## Quality Gates

Publishing should fail if any required knowledge asset is missing:

- Metadata.
- Valid internal links.
- Canonical URL.
- FAQ content.
- Image alt text.
- Entity map.
- Valid schema.

## Future Expansion

The platform should support:

- Interactive calculators.
- AI-assisted glossary.
- Research reports.
- Download center.
- API endpoints for knowledge assets.
- Multi-language content.
- Versioned documentation.

## Part 6: Article Production System, Editorial Workflow, And AI Optimization

Part 6 defines the article production system, editorial workflow, AI-specific optimization, diagram standards, and implementation guidance for every flagship knowledge asset.

## Article Production Pipeline

Every knowledge asset must follow this sequence:

1. Topic validation.
2. Search intent mapping.
3. Entity identification.
4. Outline approval.
5. Metadata creation.
6. Content drafting.
7. Technical review.
8. SEO/GEO review.
9. Diagram creation.
10. QA.
11. Publish.
12. Monitor and update.

## Required Deliverables Per Article

Each article package must include:

- SEO metadata.
- GEO package.
- Executive summary.
- AI summary.
- Featured image prompt.
- Diagram prompts.
- FAQ.
- Internal link map.
- JSON-LD recommendation.
- Publishing checklist.
- Codex implementation notes.

## Diagram Standards

Every flagship article should include:

- Architecture diagram.
- Process flow.
- Decision tree.
- Comparison matrix.
- Entity relationship map.
- Checklist infographic.

Keep a consistent visual style across the platform so diagrams feel like part of one Vista by Lara knowledge system.

## Codex Implementation Notes

For each article, include:

- Required React components.
- Expected folder structure.
- Metadata file example.
- Required schema blocks.
- Suggested reusable UI components.
- Performance considerations.

## Editorial Standards

Use:

- Clear headings.
- Evidence-based explanations where possible.
- Practical examples.
- Clear separation between Vista methodologies and established industry practices.
- No unsupported claims.
- Regular refresh cycles for evergreen content.

## Content Lifecycle

Use this lifecycle for every long-lived knowledge asset:

```text
Idea -> Outline -> Draft -> Review -> Published -> Monitored -> Updated -> Archived
```

Record version number and last review date for each article.

## Maintenance Policy

Review flagship resources every 6-12 months, or sooner when major industry changes occur. Document substantial revisions in the changelog.

## Success Metrics

Track:

- Organic traffic.
- AI referral traffic where measurable.
- Engagement.
- Conversions.
- Internal link usage.
- Content freshness.
- Search impressions.

Use these metrics to prioritize updates, improve internal linking, refresh diagrams, revise FAQs, and strengthen conversion paths.
