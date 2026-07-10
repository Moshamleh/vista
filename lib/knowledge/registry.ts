export { getAllKnowledgeArticles, getKnowledgeArticle, getKnowledgeSearchIndex, getKnowledgeStaticParams } from "./content"

export const knowledgePillars = [
  "ai-visibility",
  "geo",
  "ai-search",
  "ai-websites",
  "google-ads",
  "shopify",
  "ai-automation",
  "cro",
  "ux-ui",
  "research",
] as const

export type KnowledgePillar = (typeof knowledgePillars)[number]

export const knowledgePackageFiles = [
  "article.mdx",
  "meta.json",
  "faq.json",
  "entities.json",
  "related.json",
  "changelog.json",
  "downloads.json",
] as const
