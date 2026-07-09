import { existsSync, readdirSync, readFileSync } from "fs"
import path from "path"
import type {
  ArticleMeta,
  Entity,
  FAQItem,
  Framework,
  KnowledgeArticlePackage,
  KnowledgeChangelog,
  KnowledgeEntities,
  KnowledgeFAQ,
  KnowledgeRelated,
  KnowledgeSearchRecord,
} from "./types"

const knowledgeRoot = path.join(process.cwd(), "content", "knowledge")

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T
}

function readText(filePath: string) {
  return readFileSync(filePath, "utf8")
}

function getReadingTime(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\-|`[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

function normalizeEntity(name: string, type: Entity["type"]): Entity {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    type,
  }
}

function normalizeEntities(raw: unknown): KnowledgeEntities {
  const data = raw as Record<string, unknown>

  const list = (key: string, type: Entity["type"]) => {
    const values = Array.isArray(data[key]) ? data[key] : []
    return values.map((value) => (typeof value === "string" ? normalizeEntity(value, type) : (value as Entity)))
  }

  const primaryValue = data.primaryEntity
  const primaryEntity =
    typeof primaryValue === "string"
      ? normalizeEntity(primaryValue, "primary")
      : (primaryValue as Entity)

  return {
    primaryEntity,
    supportingEntities: list("supportingEntities", "supporting").concat(list("secondaryEntities", "supporting")),
    organizations: list("organizations", "organization"),
    people: list("people", "person"),
    geographicEntities: list("geographicEntities", "geographic").concat(list("places", "geographic")),
    technologyEntities: list("technologyEntities", "technology").concat(list("technologies", "technology")),
    serviceEntities: list("serviceEntities", "service").concat(list("services", "service")),
    products: list("products", "product"),
    relatedConcepts: list("relatedConcepts", "concept"),
    relationships: Array.isArray(data.relationships) ? (data.relationships as string[]) : [],
  }
}

function normalizeFaq(raw: KnowledgeFAQ): KnowledgeFAQ {
  return {
    items: raw.items.map((item, index) => ({
      id: item.id ?? `faq-${index + 1}`,
      question: item.question,
      answer: item.answer,
    })),
  }
}

function getArticleFolders() {
  if (!existsSync(knowledgeRoot)) return []

  return readdirSync(knowledgeRoot, { withFileTypes: true }).flatMap((pillar) => {
    if (!pillar.isDirectory()) return []

    const pillarPath = path.join(knowledgeRoot, pillar.name)
    return readdirSync(pillarPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({
        pillar: pillar.name,
        slug: entry.name,
        path: path.join(pillarPath, entry.name),
      }))
  })
}

export function getMarkdownHeadings(markdown: string) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => line.replace(/^#{2,3}\s+/, "").trim())
}

export function getKnowledgeArticle(pillar: string, slug: string): KnowledgeArticlePackage | null {
  const articlePath = path.join(knowledgeRoot, pillar, slug)
  if (!existsSync(articlePath)) return null

  const meta = readJson<ArticleMeta>(path.join(articlePath, "meta.json"))
  const article = readText(path.join(articlePath, "article.mdx"))
  meta.readingTime = getReadingTime(article)
  const faq = normalizeFaq(readJson<KnowledgeFAQ>(path.join(articlePath, "faq.json")))
  const entities = normalizeEntities(readJson<KnowledgeEntities>(path.join(articlePath, "entities.json")))
  const related = readJson<KnowledgeRelated>(path.join(articlePath, "related.json"))
  const changelog = readJson<KnowledgeChangelog>(path.join(articlePath, "changelog.json"))
  const downloadsPath = path.join(articlePath, "downloads.json")
  const downloads = existsSync(downloadsPath) ? readJson<KnowledgeArticlePackage["downloads"]>(downloadsPath) : { items: [] }

  const frameworks: Framework[] = [
    {
      id: "vista-recommendation-confidence-model",
      name: "Vista Recommendation Confidence Model(TM)",
      type: "vista-methodology",
      description:
        "A Vista by Lara methodology for auditing whether AI systems can identify, trust, cite, and recommend a Dubai or UAE business.",
      steps: ["Entity clarity", "Service evidence", "Answer extraction", "Proof density", "Conversion confidence"],
    },
  ]

  return { meta, article, faq, entities, related, changelog, downloads, frameworks }
}

export function getAllKnowledgeArticles() {
  return getArticleFolders()
    .map(({ pillar, slug }) => getKnowledgeArticle(pillar, slug))
    .filter((article): article is KnowledgeArticlePackage => Boolean(article))
}

export function getKnowledgeStaticParams() {
  return getArticleFolders().map(({ pillar, slug }) => ({ pillar, slug }))
}

export function getKnowledgeSearchRecord(article: KnowledgeArticlePackage): KnowledgeSearchRecord {
  const entities = [
    article.entities.primaryEntity,
    ...article.entities.supportingEntities,
    ...article.entities.organizations,
    ...article.entities.people,
    ...article.entities.geographicEntities,
    ...article.entities.technologyEntities,
    ...article.entities.serviceEntities,
    ...article.entities.products,
    ...article.entities.relatedConcepts,
  ].map((entity) => entity.name)

  return {
    id: article.meta.id,
    title: article.meta.title,
    slug: article.meta.slug,
    url: article.meta.path,
    pillar: article.meta.pillar,
    excerpt: article.meta.excerpt,
    audience: article.meta.audience,
    focusKeyword: article.meta.focusKeyword,
    keywords: [article.meta.focusKeyword, ...article.meta.secondaryKeywords, ...article.meta.tags],
    headings: getMarkdownHeadings(article.article),
    entities,
    faqs: article.faq.items.map((item: FAQItem) => item.question),
    services: article.entities.serviceEntities.map((entity) => entity.name),
    frameworks: article.frameworks.map((framework) => framework.name),
    updatedAt: article.meta.updatedAt,
  }
}

export function getKnowledgeSearchIndex() {
  return getAllKnowledgeArticles().map(getKnowledgeSearchRecord)
}
