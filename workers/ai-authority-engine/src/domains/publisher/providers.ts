import { AppError } from "../../errors/app-error"
import { checksum, toJson, toMarkdown, toPlainText, toRss } from "./transform"
import type { PublishArtifactInput, PublishPackage, PublishResult, PublisherName, PublisherProvider } from "./types"

/**
 * Runs publisher requests with timeout protection.
 */
export async function withPublishTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new AppError({ status: 504, code: "publisher_timeout", message: "Publisher timed out" }))
    }, timeoutMs)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

abstract class ArtifactPublisher implements PublisherProvider {
  abstract readonly name: PublisherName

  constructor(
    protected readonly endpoint: string | null = null,
    protected readonly fetcher: typeof fetch = fetch
  ) {}

  /**
   * Publishes or generates artifacts for one target.
   */
  async publish(input: { package: PublishPackage; attemptCount: number; timeoutMs: number }): Promise<PublishResult> {
    const started = Date.now()
    const artifact = await this.artifact(input.package)
    if (this.endpoint) {
      const response = await withPublishTimeout(
        this.fetcher(this.endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            publisher: this.name,
            canonicalUrl: input.package.canonicalUrl,
            artifact: artifact.body
          })
        }),
        input.timeoutMs
      )
      if (!response.ok)
        throw new AppError({
          status: 502,
          code: "publisher_error",
          message: `${this.name} returned ${String(response.status)}`
        })
    }
    return this.result(input.package, input.attemptCount, Date.now() - started, artifact)
  }

  /**
   * Tests publisher availability.
   */
  async test(timeoutMs: number): Promise<{ ok: boolean; latencyMs: number; errorMessage: string | null }> {
    const started = Date.now()
    try {
      if (this.endpoint) {
        await withPublishTimeout(this.fetcher(this.endpoint, { method: "OPTIONS" }), timeoutMs)
      }
      return { ok: true, latencyMs: Date.now() - started, errorMessage: null }
    } catch (error) {
      return {
        ok: false,
        latencyMs: Date.now() - started,
        errorMessage: error instanceof Error ? error.message : "Publisher check failed"
      }
    }
  }

  protected abstract artifact(pkg: PublishPackage): Promise<PublishArtifactInput>

  private async result(
    pkg: PublishPackage,
    attemptCount: number,
    latencyMs: number,
    artifact: PublishArtifactInput
  ): Promise<PublishResult> {
    const id = `${this.name}:${await checksum(`${pkg.canonicalUrl}:${artifact.checksum}`)}`
    const externalUrl =
      this.name === "website" ? pkg.canonicalUrl : `${pkg.canonicalUrl}?publisher=${encodeURIComponent(this.name)}`
    return {
      publisher: this.name,
      publishedUrl: externalUrl,
      canonicalUrl: pkg.canonicalUrl,
      platformId: id,
      publishedAt: new Date().toISOString(),
      checksum: artifact.checksum,
      responseMetadata: { artifactOnly: !this.endpoint, format: artifact.format },
      publishingMetadata: {
        publisher: this.name,
        version: pkg.content.currentVersion,
        attemptCount,
        latencyMs,
        status: this.endpoint ? "succeeded" : "artifact-generated"
      },
      artifacts: [artifact]
    }
  }
}

/**
 * Website canonical publisher.
 */
export class WebsitePublisher extends ArtifactPublisher {
  readonly name = "website" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = pkg.canonicalHtml
    return { publisher: this.name, format: "canonical-html", body, checksum: await checksum(body) }
  }
}

/**
 * RSS publisher.
 */
export class RssPublisher extends ArtifactPublisher {
  readonly name = "rss" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = toRss(pkg.content, pkg.canonicalUrl)
    return { publisher: this.name, format: "rss", body, checksum: await checksum(body) }
  }
}

/**
 * GitHub knowledge repository publisher that generates markdown unless an endpoint is configured.
 */
export class GitHubKnowledgePublisher extends ArtifactPublisher {
  readonly name = "github-knowledge-repository" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = toMarkdown(pkg.content, pkg.canonicalUrl, "GitHub Knowledge Repository")
    return { publisher: this.name, format: "markdown", body, checksum: await checksum(body) }
  }
}

/**
 * Blogger publisher that generates adapted HTML unless an endpoint is configured.
 */
export class BloggerPublisher extends ArtifactPublisher {
  readonly name = "blogger" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = `${pkg.canonicalHtml}<p>Originally published by Vista by Lara: <a href="${pkg.canonicalUrl}">${pkg.canonicalUrl}</a></p>`
    return { publisher: this.name, format: "platform", body, checksum: await checksum(body) }
  }
}

/**
 * Medium publisher that generates adapted markdown unless an endpoint is configured.
 */
export class MediumPublisher extends ArtifactPublisher {
  readonly name = "medium" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = toMarkdown(pkg.content, pkg.canonicalUrl, "Medium").replace(
      pkg.content.body,
      `${pkg.content.aiSummary}\n\n${pkg.content.body}`
    )
    return { publisher: this.name, format: "markdown", body, checksum: await checksum(body) }
  }
}

/**
 * VistaNewsWire publisher that generates a release-style artifact.
 */
export class VistaNewsWirePublisher extends ArtifactPublisher {
  readonly name = "vistanewswire" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = `VistaNewsWire\n\n${toPlainText(pkg.content, pkg.canonicalUrl, "VistaNewsWire")}`
    return { publisher: this.name, format: "plain-text", body, checksum: await checksum(body) }
  }
}

/**
 * JSON export publisher.
 */
export class JsonExportPublisher extends ArtifactPublisher {
  readonly name = "json-export" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = toJson(pkg.content, pkg.canonicalUrl)
    return { publisher: this.name, format: "json", body, checksum: await checksum(body) }
  }
}

/**
 * Markdown export publisher.
 */
export class MarkdownExportPublisher extends ArtifactPublisher {
  readonly name = "markdown-export" as const

  protected async artifact(pkg: PublishPackage): Promise<PublishArtifactInput> {
    const body = toMarkdown(pkg.content, pkg.canonicalUrl, "Markdown Export")
    return { publisher: this.name, format: "markdown", body, checksum: await checksum(body) }
  }
}

/**
 * Replaceable registry for publisher providers.
 */
export class PublisherRegistry {
  private readonly providers = new Map<PublisherName, PublisherProvider>()

  /**
   * Registers one publisher provider.
   */
  register(provider: PublisherProvider): void {
    this.providers.set(provider.name, provider)
  }

  /**
   * Resolves one publisher provider.
   */
  resolve(name: PublisherName): PublisherProvider {
    const provider = this.providers.get(name)
    if (!provider)
      throw new AppError({ status: 500, code: "publisher_missing", message: `${name} publisher is not registered` })
    return provider
  }

  /**
   * Lists publisher identifiers.
   */
  list(): PublisherName[] {
    return Array.from(this.providers.keys())
  }
}

/**
 * Creates the default publisher registry.
 */
export function createPublisherRegistry(): PublisherRegistry {
  const registry = new PublisherRegistry()
  registry.register(new WebsitePublisher())
  registry.register(new RssPublisher())
  registry.register(new GitHubKnowledgePublisher())
  registry.register(new BloggerPublisher())
  registry.register(new MediumPublisher())
  registry.register(new VistaNewsWirePublisher())
  registry.register(new JsonExportPublisher())
  registry.register(new MarkdownExportPublisher())
  return registry
}
