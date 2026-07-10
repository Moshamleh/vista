import type {
  BuyingSignalDiscoveryRequest,
  BuyingSignalProvider,
  PublicSignalCandidate,
  SignalSourceCategory,
  SignalSourceRecord
} from "./types"

type Fetcher = typeof fetch

interface FeedConfig {
  name: string
  category: SignalSourceCategory
  endpoint: string
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "")
}

function textBetween(value: string, tag: string): string | null {
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "iu").exec(value)
  return match?.[1]?.replace(/<!\[CDATA\[|\]\]>/gu, "").trim() ?? null
}

function parseFeedConfig(raw: string | undefined): FeedConfig[] {
  if (!raw) return []
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, category, endpoint] = line.split("|").map((part) => part.trim())
      if (!name || !category || !endpoint)
        throw new Error("PUBLIC_BUYING_SIGNAL_FEEDS entries must use name|category|endpoint")
      return { name, category: category as SignalSourceCategory, endpoint }
    })
}

function sourceFromConfig(config: FeedConfig): SignalSourceRecord {
  const timestamp = new Date().toISOString()
  return {
    id: slug(`${config.category}-${config.name}`),
    name: config.name,
    category: config.category,
    endpoint: config.endpoint,
    enabled: true,
    metadata: { publicOnly: true },
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

function candidateFromJson(source: SignalSourceRecord, item: Record<string, unknown>): PublicSignalCandidate {
  const title = typeof item.title === "string" ? item.title : "Public business signal"
  const summary =
    typeof item.summary === "string" ? item.summary : typeof item.description === "string" ? item.description : title
  return {
    source,
    organizationName:
      typeof item.organizationName === "string"
        ? item.organizationName
        : typeof item.company === "string"
          ? item.company
          : title.split(" ").slice(0, 3).join(" "),
    organizationWebsiteUrl: typeof item.organizationWebsiteUrl === "string" ? item.organizationWebsiteUrl : null,
    organizationIndustry: typeof item.industry === "string" ? item.industry : null,
    organizationLocation: typeof item.location === "string" ? item.location : null,
    companySize: typeof item.companySize === "string" ? item.companySize : null,
    technologies: Array.isArray(item.technologies)
      ? item.technologies.filter((value): value is string => typeof value === "string")
      : [],
    title,
    summary,
    url: typeof item.url === "string" ? item.url : source.endpoint,
    publishedAt: typeof item.publishedAt === "string" ? item.publishedAt : new Date().toISOString(),
    raw: item
  }
}

function candidatesFromRss(source: SignalSourceRecord, body: string): PublicSignalCandidate[] {
  const items = body.match(/<item[\s\S]*?<\/item>/giu) ?? body.match(/<entry[\s\S]*?<\/entry>/giu) ?? []
  return items.map((item) => {
    const title = textBetween(item, "title") ?? "Public business signal"
    const summary = textBetween(item, "description") ?? textBetween(item, "summary") ?? title
    const link = textBetween(item, "link") ?? source.endpoint
    const publishedAt = textBetween(item, "pubDate") ?? textBetween(item, "updated") ?? new Date().toISOString()
    return {
      source,
      organizationName: title.split(/[|:-]/u)[0]?.trim() ?? title,
      organizationWebsiteUrl: null,
      organizationIndustry: null,
      organizationLocation: summary,
      companySize: null,
      technologies: [],
      title,
      summary,
      url: link,
      publishedAt,
      raw: { title, summary, link, publishedAt }
    }
  })
}

/** Provider SDK implementation for configured public feeds and permitted APIs. */
export class ConfiguredPublicFeedProvider implements BuyingSignalProvider {
  readonly name: string
  readonly category: SignalSourceCategory
  private readonly source: SignalSourceRecord

  constructor(
    config: FeedConfig,
    private readonly fetcher: Fetcher = fetch
  ) {
    this.name = config.name
    this.category = config.category
    this.source = sourceFromConfig(config)
  }

  /** Discovers public buying signals from configured JSON or RSS resources. */
  async discover(request: BuyingSignalDiscoveryRequest): Promise<PublicSignalCandidate[]> {
    const response = await this.fetcher(this.source.endpoint, {
      headers: { accept: "application/json, application/rss+xml, application/xml, text/xml" }
    })
    if (!response.ok) throw new Error(`Public signal feed ${this.name} returned ${String(response.status)}`)
    const contentType = response.headers.get("content-type") ?? ""
    const body = await response.text()
    const candidates = contentType.includes("json")
      ? (JSON.parse(body) as Record<string, unknown>[]).map((item) => candidateFromJson(this.source, item))
      : candidatesFromRss(this.source, body)
    const sinceTime = request.since ? new Date(request.since).getTime() : 0
    return candidates
      .filter((candidate) => new Date(candidate.publishedAt).getTime() >= sinceTime)
      .slice(0, request.limit)
  }
}

/** Registry for replaceable public buying signal providers. */
export class BuyingSignalProviderRegistry {
  private readonly providers = new Map<string, BuyingSignalProvider>()

  /** Registers a provider. */
  register(provider: BuyingSignalProvider): void {
    this.providers.set(provider.name, provider)
  }

  /** Lists providers. */
  list(): BuyingSignalProvider[] {
    return Array.from(this.providers.values())
  }
}

/** Creates providers from configured public feed declarations. */
export function createBuyingSignalProviderRegistry(rawConfig: string | undefined): BuyingSignalProviderRegistry {
  const registry = new BuyingSignalProviderRegistry()
  for (const config of parseFeedConfig(rawConfig)) registry.register(new ConfiguredPublicFeedProvider(config))
  return registry
}
