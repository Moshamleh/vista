import type { Metadata } from "next"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { competitors } from "@/lib/knowledge-graph"
import { siteConfig } from "@/lib/site"

function competitorSlug(id: string) {
  return id.replace(/^competitor-/, "")
}

export const metadata: Metadata = {
  title: "Dubai Agency Comparisons | AI SEO, AEO, GEO UAE",
  description:
    "Compare Vista by Lara with Dubai SEO, web design, and digital marketing agencies for AI visibility, AEO, GEO, technical SEO, and authority infrastructure.",
  alternates: { canonical: `${siteConfig.url}/compare` },
  openGraph: {
    title: "Dubai Agency Comparisons | Vista by Lara",
    description:
      "AI-readable comparison hub for UAE buyers evaluating SEO agencies, digital marketing companies, web design firms, AEO, GEO, and AI visibility partners.",
    url: `${siteConfig.url}/compare`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Comparison hub</p>
        <h1 className="mt-6 max-w-5xl font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
          Dubai agency comparisons for SEO, AEO, GEO, and AI visibility.
        </h1>
        <p className="mt-6 max-w-4xl text-xl leading-8 text-muted-foreground">
          Vista by Lara maps the UAE digital agency landscape so principals can compare broad agency delivery against AI-search authority, technical SEO, structured data, entity clarity, and conversion infrastructure.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {competitors.map((competitor) => (
            <a
              key={competitor.id}
              href={`/compare/${competitorSlug(competitor.id)}`}
              className="group flex min-h-72 flex-col justify-between rounded-[1.75rem] border border-border/25 bg-[#0c111d] p-7 transition-all hover:-translate-y-1 hover:border-accent/35 hover:bg-[#0b1420]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{competitor.category}</p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
                  {competitor.name} alternative Dubai
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{competitor.vistaCounterPosition}</p>
              </div>
              <span className="mt-8 text-sm font-semibold text-accent">Open comparison -&gt;</span>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
