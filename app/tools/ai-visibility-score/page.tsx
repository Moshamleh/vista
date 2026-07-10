import type { Metadata } from "next"
import Link from "next/link"
import { Gauge, MessageCircle } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { KnowledgeUpdateBanner } from "@/components/knowledge-update-banner"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Visibility Score | Coming Soon",
  description:
    "Coming soon: Vista by Lara's AI Visibility Score tool for structured data, content depth, digital trust, internal linking, authority, and AI search readiness.",
  alternates: {
    canonical: `${siteConfig.url}/tools/ai-visibility-score`,
  },
  openGraph: {
    title: "AI Visibility Score | Coming Soon",
    description: "Request a manual AI visibility audit while the Vista AI Visibility Score tool is being prepared.",
    url: `${siteConfig.url}/tools/ai-visibility-score`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

const measures = [
  "Structured data",
  "Business profile clarity",
  "Review and trust signals",
  "Content depth",
  "Internal linking",
  "Mentions and citations",
  "Entity consistency",
  "Performance",
  "Authority",
]

export default function AIVisibilityScorePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <Gauge className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Coming Soon</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            AI Visibility Score
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            The AI Visibility Score will help businesses evaluate whether AI systems can identify, trust, and explain their brand. The tool will measure technical foundations, entity clarity, content depth, trust signals, internal links, and authority.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.whatsapp} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-heading text-sm font-semibold text-background">
              <MessageCircle className="h-4 w-4" />
              Request a manual audit
            </a>
            <Link href="/knowledge/ai-visibility" className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-6 font-heading text-sm font-semibold text-accent">
              View AI Visibility Hub
            </Link>
          </div>
        </section>
        <KnowledgeUpdateBanner />

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {measures.map((item) => (
            <article key={item} className="rounded-3xl border border-border/60 bg-[#0d111f] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Signal</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">{item}</h2>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
