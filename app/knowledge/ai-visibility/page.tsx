import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Clock, Wrench } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { KnowledgeUpdateBanner } from "@/components/knowledge-update-banner"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Visibility Hub | Vista by Lara",
  description:
    "Learn what AI visibility means, why it matters, and how UAE businesses can build digital trust, GEO, AEO, entity SEO, and AI search readiness.",
  alternates: {
    canonical: `${siteConfig.url}/knowledge/ai-visibility`,
  },
  openGraph: {
    title: "AI Visibility Hub | Vista by Lara",
    description: "The parent hub for Vista by Lara resources on AI visibility, GEO, AEO, knowledge graphs, and digital trust.",
    url: `${siteConfig.url}/knowledge/ai-visibility`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

const series = [
  { title: "Why AI Isn't Recommending Your Business", status: "Published", href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" },
  { title: "50 AI Ranking Factors", status: "Coming Soon", href: "/knowledge/ai-visibility" },
  { title: "Complete GEO Guide", status: "Coming Soon", href: "/knowledge/ai-visibility" },
  { title: "AI Visibility Checklist", status: "Coming Soon", href: "/knowledge/ai-visibility" },
  { title: "Entity SEO", status: "Coming Soon", href: "/knowledge/glossary" },
  { title: "Knowledge Graph Guide", status: "Coming Soon", href: "/knowledge/glossary" },
]

const faqs = [
  {
    q: "What does AI visibility mean?",
    a: "AI visibility is the ability of AI systems to identify, understand, trust, and mention a business when answering relevant questions.",
  },
  {
    q: "Why does AI visibility matter for UAE businesses?",
    a: "Dubai and UAE buyers increasingly use AI tools before contacting providers. If AI systems cannot understand your business, you may be excluded from early consideration.",
  },
  {
    q: "Is AI visibility the same as SEO?",
    a: "No. SEO remains important, but AI visibility also includes entity clarity, answer-ready content, structured data, digital trust, knowledge graph signals, and content freshness.",
  },
]

const connectedResources = [
  ["Entity Map", "/entity-map"],
  ["AI Visibility Score", "/tools/ai-visibility-score"],
  ["Research Center", "/research"],
  ["Knowledge API", "/api/entities"],
  ["Trust Dashboard", "/trust"],
  ["Knowledge Timeline", "/knowledge/timeline"],
]

export default function AIVisibilityHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">AI Visibility Hub</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            AI Visibility Resources for Businesses That Want to Be Recommended by AI
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            AI visibility means making your business clear, trustworthy, and machine-readable enough for AI search systems to identify and explain it. This hub connects the flagship guides, glossary, tools, services, and roadmap for the Vista AI Knowledge Platform.
          </p>
        </section>
        <KnowledgeUpdateBanner />

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            ["What AI Visibility Means", "It connects SEO, AEO, GEO, entity SEO, structured data, reviews, authority, and technical performance into one discoverability system."],
            ["Why It Matters", "AI answers can shape a buyer's shortlist before the buyer visits your website. Clearer businesses are easier to retrieve, compare, and recommend."],
            ["Latest Update", "Knowledge Asset #001 is live as Version 1.0 and will expand as the 2026 AI Visibility series continues."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-border/60 bg-[#0d111f] p-6">
              <h2 className="font-heading text-2xl font-semibold text-foreground">{title}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-[#0d111f] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">AI Visibility Series</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {series.map((item) => (
              <Link key={item.title} href={item.href} className="rounded-2xl border border-border/50 bg-background/35 p-5 transition-colors hover:border-accent/40">
                {item.status === "Published" ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <Clock className="h-5 w-5 text-muted-foreground" />}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.status}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[0.7fr_0.3fr]">
          <div className="rounded-3xl border border-border/60 bg-[#0d111f] p-7 sm:p-9">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Featured Tools</h2>
            <Link href="/tools/ai-visibility-score" className="mt-6 flex rounded-2xl border border-accent/20 bg-accent/10 p-5 transition-colors hover:border-accent/50">
              <Wrench className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div className="ml-4">
                <p className="font-heading text-xl font-semibold text-foreground">AI Visibility Score</p>
                <p className="mt-2 text-muted-foreground">Coming soon: a scoring tool for structured data, digital trust, content depth, authority, and internal linking.</p>
              </div>
            </Link>
          </div>
          <div className="rounded-3xl border border-border/60 bg-[#0d111f] p-7 sm:p-9">
            <h2 className="font-heading text-2xl font-semibold text-foreground">Related Services</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Generative AI", "/services/generative-ai"],
                ["SEO Optimization", "/services/seo-optimization"],
                ["SEO Services Dubai", "/services/seo-services-dubai"],
                ["Websites", "/services/websites"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="inline-flex items-center justify-between rounded-xl border border-border/50 px-4 py-3 text-foreground/78 hover:border-accent/40 hover:text-accent">
                  {label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-[#0d111f] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Connected AI Visibility Objects</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            The AI Visibility hub connects guides, tools, datasets, APIs, trust signals, and timeline updates so future resources strengthen the same semantic graph.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {connectedResources.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-2xl border border-border/50 bg-background/35 px-4 py-3 text-foreground/82 hover:border-accent/40 hover:text-accent">
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-border/60 bg-[#0d111f] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-2xl border border-border/50 bg-background/35 p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">{item.q}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
