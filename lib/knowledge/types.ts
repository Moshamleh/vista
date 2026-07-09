export type KnowledgeStatus = "Idea" | "Outline" | "Draft" | "Review" | "Published" | "Monitored" | "Updated" | "Archived"

export type ArticleMeta = {
  id: string
  title: string
  subtitle: string
  seoTitle: string
  metaTitle: string
  metaDescription: string
  ogTitle?: string
  ogDescription?: string
  excerpt: string
  executiveSummary: string
  aiSummary: string
  slug: string
  path: string
  canonical: string
  publishedAt: string
  updatedAt: string
  version: string
  status: KnowledgeStatus
  lastReviewDate: string
  reviewer: string
  readingTime: string
  author: string
  pillar: string
  tags: string[]
  focusKeyword: string
  secondaryKeywords: string[]
  image: {
    src: string
    alt: string
  }
  difficulty: string
  audience: string
  targetAudience: string[]
  featuredImagePrompt: string
  diagramPrompts: string[]
  requiredComponents: string[]
  schemaBlocks: string[]
  performanceNotes: string[]
}

export type Entity = {
  id: string
  name: string
  type: "primary" | "supporting" | "geographic" | "technology" | "organization" | "person" | "service" | "concept" | "product"
  aliases?: string[]
  description?: string
  sameAs?: string[]
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}

export type Framework = {
  id: string
  name: string
  type: "vista-methodology" | "industry-practice"
  description: string
  steps?: string[]
}

export type RelatedArticle = {
  id?: string
  label: string
  href: string
  type: "pillar" | "hub" | "service" | "proof" | "guide" | "download" | "tool"
  relationship: string
  entities?: string[]
}

export type DownloadAsset = {
  id: string
  label: string
  href: string
  type: "pdf" | "diagram" | "worksheet" | "data"
  description: string
  fileSize?: string
  lastUpdated?: string
}

export type AuthorProfile = {
  id: string
  name: string
  title: string
  bio: string
  image?: string
  sameAs?: string[]
}

export type ServiceReference = {
  id: string
  name: string
  href: string
  description: string
}

export type KnowledgeFAQ = {
  items: FAQItem[]
}

export type KnowledgeEntities = {
  primaryEntity: Entity
  supportingEntities: Entity[]
  organizations: Entity[]
  people: Entity[]
  geographicEntities: Entity[]
  technologyEntities: Entity[]
  serviceEntities: Entity[]
  products: Entity[]
  relatedConcepts: Entity[]
  relationships: string[]
}

export type KnowledgeRelated = {
  items: RelatedArticle[]
}

export type KnowledgeChangelog = {
  items: {
    version: string
    date: string
    summary: string
    reviewer?: string
  }[]
}

export type KnowledgeArticlePackage = {
  meta: ArticleMeta
  article: string
  faq: KnowledgeFAQ
  entities: KnowledgeEntities
  related: KnowledgeRelated
  changelog: KnowledgeChangelog
  downloads?: {
    items: DownloadAsset[]
  }
  frameworks: Framework[]
}

export type KnowledgeSearchRecord = {
  id: string
  title: string
  slug: string
  url: string
  pillar: string
  excerpt: string
  audience: string
  focusKeyword: string
  keywords: string[]
  headings: string[]
  entities: string[]
  faqs: string[]
  services: string[]
  frameworks: string[]
  updatedAt: string
}
