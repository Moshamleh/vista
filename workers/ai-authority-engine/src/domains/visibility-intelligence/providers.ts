import type { VisibilityContext, VisibilityProvider, VisibilityProviderName, VisibilityProviderResult } from "./types"

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? 1 : Number(Math.max(0, Math.min(1, numerator / denominator)).toFixed(4))
}

function result(
  provider: VisibilityProviderName,
  score: number,
  signals: Record<string, number | string | boolean>,
  message: string | null
): VisibilityProviderResult {
  return {
    provider,
    score,
    signals,
    recommendations: message
      ? [
          {
            contentId: null,
            severity: score < 0.6 ? "high" : "medium",
            category: provider,
            message,
            action: "Improve the measured visibility signal."
          }
        ]
      : []
  }
}

/** Website index readiness provider. */
export class WebsiteIndexStatusProvider implements VisibilityProvider {
  readonly name = "website-index-status" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const published = context.content.filter((item) => item.status === "PUBLISHED" || item.status === "UPDATED")
    const score = ratio(published.length, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { publishedContentCount: published.length },
        score < 1 ? "Some content is not published yet." : null
      )
    )
  }
}

/** Sitemap status provider. */
export class SitemapStatusProvider implements VisibilityProvider {
  readonly name = "sitemap-status" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const canonical = context.content.filter((item) => item.canonicalUrl || item.slug.length > 0)
    const score = ratio(canonical.length, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { sitemapEligible: canonical.length },
        score < 1 ? "Add canonical URLs or valid slugs for all content." : null
      )
    )
  }
}

/** RSS validation provider. */
export class RssValidationProvider implements VisibilityProvider {
  readonly name = "rss-validation" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const news = context.content.filter(
      (item) => item.contentType === "News Article" || item.contentType === "Press Release"
    )
    const score = ratio(news.filter((item) => item.aiSummary.length > 0).length, news.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { rssItems: news.length },
        score < 1 ? "Ensure every news item has an RSS-ready summary." : null
      )
    )
  }
}

/** Structured data validation provider. */
export class StructuredDataValidationProvider implements VisibilityProvider {
  readonly name = "structured-data-validation" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const score = ratio(new Set(context.schemaContentIds).size, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { schemaContentCount: context.schemaContentIds.length },
        score < 1 ? "Run GEO optimization for content missing schema." : null
      )
    )
  }
}

/** llms.txt validation provider. */
export class LlmsTxtValidationProvider implements VisibilityProvider {
  readonly name = "llms-txt-validation" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const score = ratio(context.aiResourceContentIds.length, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { aiResourceCount: context.aiResourceContentIds.length },
        score < 1 ? "Generate AI resource bundles for all published assets." : null
      )
    )
  }
}

/** Internal link coverage provider. */
export class InternalLinkCoverageProvider implements VisibilityProvider {
  readonly name = "internal-link-coverage" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const linked = context.content.filter((item) => item.internalLinks.length > 0)
    const score = ratio(linked.length, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { linkedContentCount: linked.length },
        score < 0.8 ? "Add internal links to orphaned pages." : null
      )
    )
  }
}

/** Entity graph coverage provider. */
export class EntityGraphCoverageProvider implements VisibilityProvider {
  readonly name = "entity-graph-coverage" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const score = ratio(new Set(context.entityContentIds).size, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { entityMappedContentCount: context.entityContentIds.length },
        score < 1 ? "Add missing entities to the entity graph." : null
      )
    )
  }
}

/** Publisher verification provider. */
export class PublisherVerificationProvider implements VisibilityProvider {
  readonly name = "publisher-verification" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const score = ratio(new Set(context.publishedContentIds).size, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { verifiedPublications: context.publishedContentIds.length },
        score < 1 ? "Verify publisher history for all public assets." : null
      )
    )
  }
}

/** Canonical validation provider. */
export class CanonicalValidationProvider implements VisibilityProvider {
  readonly name = "canonical-validation" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const valid = context.content.filter((item) =>
      (item.canonicalUrl ?? `${context.websiteBaseUrl}/knowledge/${item.slug}`).startsWith("https://")
    )
    const score = ratio(valid.length, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { canonicalValidCount: valid.length },
        score < 1 ? "Fix invalid canonical references." : null
      )
    )
  }
}

/** AI resource validation provider. */
export class AiResourceValidationProvider implements VisibilityProvider {
  readonly name = "ai-resource-validation" as const
  measure(context: VisibilityContext): Promise<VisibilityProviderResult> {
    const ready = context.geoReports.filter((report) => report.validation.aiRetrievalReady === true)
    const score = ratio(ready.length, context.content.length)
    return Promise.resolve(
      result(
        this.name,
        score,
        { aiReadyReports: ready.length },
        score < 0.8 ? "Improve AI retrieval readiness in GEO reports." : null
      )
    )
  }
}

/** Registry for replaceable visibility providers. */
export class VisibilityProviderRegistry {
  private readonly providers = new Map<VisibilityProviderName, VisibilityProvider>()

  /** Registers a provider. */
  register(provider: VisibilityProvider): void {
    this.providers.set(provider.name, provider)
  }

  /** Lists providers. */
  list(): VisibilityProvider[] {
    return Array.from(this.providers.values())
  }
}

/** Creates the default visibility provider registry. */
export function createVisibilityProviderRegistry(): VisibilityProviderRegistry {
  const registry = new VisibilityProviderRegistry()
  registry.register(new WebsiteIndexStatusProvider())
  registry.register(new SitemapStatusProvider())
  registry.register(new RssValidationProvider())
  registry.register(new StructuredDataValidationProvider())
  registry.register(new LlmsTxtValidationProvider())
  registry.register(new InternalLinkCoverageProvider())
  registry.register(new EntityGraphCoverageProvider())
  registry.register(new PublisherVerificationProvider())
  registry.register(new CanonicalValidationProvider())
  registry.register(new AiResourceValidationProvider())
  return registry
}
