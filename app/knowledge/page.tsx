import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Clock, Sparkles } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { KnowledgeUpdateBanner } from "@/components/knowledge-update-banner"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Knowledge Hub | Vista by Lara",
  description:
    "Explore Vista by Lara knowledge resources on AI visibility, GEO, AEO, entity SEO, digital trust, structured data, and AI search for UAE businesses.",
  alternates: {
    canonical: `${siteConfig.url}/knowledge`,
  },
  openGraph: {
    title: "AI Knowledge Hub | Vista by Lara",
    description: "Research-grade AI visibility, GEO, AEO, and digital trust resources for Dubai, UAE, and GCC decision-makers.",
    url: `${siteConfig.url}/knowledge`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

const featured = [
  {
    title: "Why AI Isn't Recommending Your Business",
    href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business",
    status: "Published",
    description: "The flagship guide to AI visibility, digital trust, and recommendation confidence.",
  },
  { title: "50 AI Ranking Factors", href: "/knowledge/ai-visibility", status: "Coming Soon", description: "A practical factor map for AI-assisted discovery." },
  { title: "Complete GEO Guide", href: "/knowledge/ai-visibility", status: "Coming Soon", description: "A full guide to Generative Engine Optimization." },
  { title: "AI Visibility Checklist", href: "/knowledge/ai-visibility", status: "Coming Soon", description: "A field checklist for improving AI-readiness." },
  { title: "Entity SEO Guide", href: "/knowledge/glossary", status: "Coming Soon", description: "A clear guide to entity clarity, schema, and knowledge graphs." },
]

const infrastructure = [
  ["Entity Map", "/entity-map", "Live semantic graph of services, technologies, topics, research, tools, and trust signals."],
  ["Research Center", "/research", "Original research roadmap, methodology, datasets, and citation-ready reports."],
  ["Knowledge API", "/api", "Machine-readable JSON endpoints for entities, services, FAQs, tools, research, and glossary."],
  ["Trust Dashboard", "/trust", "Awards, expertise, case studies, research, and verified authority signals."],
  ["AI Agent Index", "/ai", "Curated discovery page for AI agents, APIs, tools, services, and contact paths."],
  ["Datasets", "/datasets", "Dataset registry for AI recommendation indexes, Google Ads CPC, and benchmark records."],
]

export default function KnowledgeHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Vista AI Knowledge Platform</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Featured Knowledge for AI Visibility, GEO, AEO, and Digital Trust
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            Research-backed resources for Dubai, UAE, and GCC businesses that want to be discoverable by people, search engines, and AI answer systems.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/knowledge/ai-visibility" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-heading text-sm font-semibold text-background">
              Explore AI Visibility
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/knowledge/glossary" className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-6 font-heading text-sm font-semibold text-accent">
              Open glossary
            </Link>
          </div>
        </section>
        <KnowledgeUpdateBanner />

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Featured Knowledge</h2>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-5">
            {featured.map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-3xl border border-border/60 bg-[#0d111f] p-5 transition-colors hover:border-accent/35">
                {item.status === "Published" ? (
                  <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden="true" />
                ) : (
                  <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                )}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.status}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-foreground group-hover:text-accent">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-[#0d111f] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">AI Knowledge Infrastructure</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            Vista by Lara is evolving from a marketing site into a connected knowledge graph for digital growth, Shopify, Google Ads, GEO, AI visibility, automation, and UAE business growth.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map(([title, href, description]) => (
              <Link key={href} href={href} className="rounded-2xl border border-border/50 bg-background/35 p-5 transition-colors hover:border-accent/40">
                <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
