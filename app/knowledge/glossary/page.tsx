import type { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { KnowledgeUpdateBanner } from "@/components/knowledge-update-banner"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Visibility Glossary | Vista by Lara",
  description:
    "A practical glossary of AI visibility, GEO, AEO, entity SEO, structured data, knowledge graph, and semantic search terms for UAE businesses.",
  alternates: {
    canonical: `${siteConfig.url}/knowledge/glossary`,
  },
  openGraph: {
    title: "AI Visibility Glossary | Vista by Lara",
    description: "Definitions for AI visibility, GEO, AEO, entity SEO, structured data, knowledge graphs, and AI search.",
    url: `${siteConfig.url}/knowledge/glossary`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

const terms = [
  ["AI Visibility", "The ability of AI systems to identify, understand, trust, and mention a business in relevant answers."],
  ["Generative Engine Optimization (GEO)", "The practice of making content easier for generative AI systems to retrieve, interpret, summarize, and cite."],
  ["Entity", "A distinct thing such as a business, person, service, product, place, or concept that search and AI systems can identify."],
  ["Knowledge Graph", "A structured map of entities and relationships that helps systems understand how people, places, services, and topics connect."],
  ["Structured Data", "Machine-readable markup, often Schema.org JSON-LD, that clarifies page meaning for search engines and AI systems."],
  ["Semantic Search", "Search that interprets meaning and intent rather than matching only exact keywords."],
  ["Vector Search", "A retrieval method that compares information based on mathematical representations of meaning."],
  ["Retrieval", "The process of finding relevant information from documents, databases, indexes, or sources before generating an answer."],
  ["Topical Authority", "The perceived depth and credibility of a website or business around a specific topic area."],
  ["Digital Trust", "The combined evidence that a business is real, consistent, credible, maintained, and relevant."],
  ["AI Search", "Search experiences that use AI to summarize, compare, or answer questions directly."],
  ["LLM", "A large language model that can process and generate text based on learned language patterns and retrieved context."],
  ["Embedding", "A numerical representation of text, images, or data used to compare semantic similarity."],
  ["Schema", "A structured vocabulary used to label content such as organizations, articles, FAQs, services, and breadcrumbs."],
  ["Canonical URL", "The preferred URL for a page when duplicate or similar versions may exist."],
  ["Crawlability", "The ability of search engines and other crawlers to access, read, and follow content on a website."],
  ["Internal Linking", "Links between pages on the same website that help users and crawlers understand relationships."],
  ["Answer Engine Optimization (AEO)", "The practice of formatting content so answer engines can extract concise, direct responses."],
  ["Content Freshness", "Signals that show content is reviewed, updated, and maintained as a topic evolves."],
  ["Search Intent", "The underlying goal behind a query, such as learning, comparing, buying, or finding a specific brand."],
]

export default function KnowledgeGlossaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Knowledge Glossary</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            AI Visibility Glossary
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            A living glossary for AI visibility, GEO, AEO, entity SEO, semantic search, structured data, and digital trust. Built for Dubai, UAE, and GCC teams that need precise language before implementation.
          </p>
        </section>
        <KnowledgeUpdateBanner />

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {terms.map(([term, definition]) => (
            <article key={term} id={term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-28 rounded-3xl border border-border/60 bg-[#0d111f] p-6">
              <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">{term}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{definition}</p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
