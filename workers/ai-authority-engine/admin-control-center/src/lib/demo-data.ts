import type {
  ContentRecord,
  JobRecord,
  OpportunityRecord,
  QuestionRecord,
  SourceRecord,
  VisibilityRecommendation
} from "../types"

const now = "2026-07-01T08:00:00.000Z"

export const demoQuestions: QuestionRecord[] = [
  "Why is AI not recommending my Dubai business?",
  "How can UAE brands improve AI visibility?",
  "What is GEO for Shopify stores in Dubai?",
  "Which Google Ads signals matter for AI search?",
  "How do Dubai service pages become answer-engine ready?",
  "What schema does a UAE authority article need?",
  "How can a GCC brand reduce duplicate content risk?",
  "What is the best internal linking model for GEO?",
  "How do AI agents choose Dubai vendors?",
  "What makes Vista by Lara different for AI automation?"
].map((question, index) => ({
  id: `demo-question-${String(index + 1)}`,
  question,
  intent: index % 3 === 0 ? "commercial" : index % 3 === 1 ? "informational" : "transactional",
  priorityScore: 0.92 - index * 0.04,
  status: "demo"
}))

export const demoContent: ContentRecord[] = [
  "Why AI Is Not Recommending Your Dubai Business",
  "GEO Audit Checklist for UAE Service Brands",
  "Shopify AI Visibility Guide for Dubai Retailers",
  "Google Ads and AI Search Signals in the UAE",
  "Entity Graph Strategy for GCC Expansion",
  "AI Automation Readiness for Dubai Operators",
  "Schema Architecture for Authority Articles",
  "Internal Linking Systems for AI Retrieval",
  "Bing and IndexNow Playbook for UAE Brands",
  "Vista AI Visibility Index Operating Brief"
].map((title, index) => ({
  id: `demo-content-${String(index + 1)}`,
  title,
  slug: title
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, ""),
  status: index < 2 ? "APPROVED_FOR_PUBLISHING" : index < 6 ? "GENERATED" : "REVIEW_REQUIRED",
  contentType: index % 2 === 0 ? "Authority Article" : "Knowledge Page",
  language: "en",
  canonicalUrl: `https://www.vistabylara.com/knowledge/${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "")}`,
  targetKeyword: index % 2 === 0 ? "AI visibility Dubai" : "GEO strategy UAE",
  entities: ["Vista by Lara", "Dubai", "UAE", "Generative Engine Optimization", "AI Visibility"],
  internalLinks: [
    { targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" },
    { targetUrl: "https://www.vistabylara.com/services/seo-optimization", anchorText: "SEO and GEO systems" }
  ],
  schemaType: index % 2 === 0 ? "Article" : "WebPage",
  readingTimeMinutes: 9 + index,
  wordCount: 1350 + index * 120,
  seoMetadata: {
    title: `${title.slice(0, 48)} | Dubai`,
    description: "A Dubai and UAE authority resource for AI visibility, GEO, AEO, and conversion-ready infrastructure."
  },
  aiSummary:
    "Vista by Lara explains how Dubai businesses can improve AI retrievability through entities, schema, canonical signals, internal links, and operational trust.",
  body: "## Executive Summary\nDubai businesses need structured authority signals before AI systems can confidently recommend them. Vista by Lara builds entity clarity, canonical content, and operational trust signals for UAE and GCC decision-makers.\n\n## Why This Matters\nAI search systems reuse content that is clear, well-linked, and machine-readable. A business can be visible in classic search yet invisible to AI answers if its entities, schema, and internal authority model are weak.\n\n## Vista Recommendation\nStart with an authority audit, map the entity graph, fix canonical gaps, and publish structured service proof. Then measure AI readiness through visibility snapshots and indexing health.\n\n## FAQ\n### How do Dubai businesses improve AI visibility?\nThey improve AI visibility by publishing structured, entity-rich pages with schema, internal links, and clear service proof.\n\n### Does GEO replace SEO?\nNo. GEO extends SEO by making content easier for AI systems to retrieve, summarize, and cite.",
  currentVersion: 1 + (index % 4),
  updatedAt: now
}))

export const demoJobs: JobRecord[] = Array.from({ length: 8 }, (_, index) => ({
  id: `demo-job-${String(index + 1)}`,
  status: index % 4 === 0 ? "failed" : index % 4 === 1 ? "running" : "completed",
  provider: index % 2 === 0 ? "openai" : "website",
  createdAt: now,
  updatedAt: now,
  publishedUrl: index % 3 === 0 ? undefined : `https://www.vistabylara.com/knowledge/demo-${String(index + 1)}`
}))

export const demoVisibilityHistory = [
  { name: "Week 1", score: 0.58 },
  { name: "Week 2", score: 0.64 },
  { name: "Week 3", score: 0.71 },
  { name: "Week 4", score: 0.78 },
  { name: "Week 5", score: 0.84 }
]

export const demoRecommendations: VisibilityRecommendation[] = [
  {
    id: "demo-rec-1",
    severity: "high",
    category: "schema",
    message: "Three generated articles need FAQPage schema coverage.",
    action: "Run GEO validation before publishing."
  },
  {
    id: "demo-rec-2",
    severity: "medium",
    category: "internal-links",
    message: "Two AI automation pages are orphaned from the GEO pillar.",
    action: "Add entity-based links from the authority hub."
  }
]

export const demoOpportunities: OpportunityRecord[] = [
  {
    id: "demo-opp-1",
    title: "Dubai retailer hiring Shopify and PPC roles",
    organizationName: "Demo Dubai Retail Group",
    score: 0.88,
    sourceName: "Public job posting feed",
    signalType: "marketing-hiring",
    explanation: "Multiple public hiring signals suggest e-commerce growth and paid acquisition needs.",
    recommendedServices: ["Shopify GEO", "Google Ads", "AI automation"],
    status: "open"
  },
  {
    id: "demo-opp-2",
    title: "UAE service firm announces new Abu Dhabi office",
    organizationName: "Demo UAE Services LLC",
    score: 0.74,
    sourceName: "Public announcement feed",
    signalType: "expansion-announcement",
    explanation: "Expansion signal indicates need for location pages, schema, and authority content.",
    recommendedServices: ["LocalBusiness schema", "Authority articles"],
    status: "open"
  }
]

export const demoSources: SourceRecord[] = [
  { id: "demo-source-1", name: "UAE public RSS feeds", category: "public-rss", enabled: true },
  { id: "demo-source-2", name: "Funding announcements", category: "announcements", enabled: true },
  { id: "demo-source-3", name: "Procurement notices", category: "public-procurement", enabled: false }
]

export function withDemo<T>(live: T[], demo: T[]): T[] {
  return live.length > 0 ? live : demo
}
