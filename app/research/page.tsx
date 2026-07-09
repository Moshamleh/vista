import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3, Database, Download } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { datasets, researchReports } from "@/lib/knowledge-graph"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Research Center | Vista by Lara",
  description:
    "Vista by Lara research center for UAE Google Ads benchmarks, Shopify reports, AI Visibility Index, GEO adoption, CRO benchmarks, and AI search studies.",
  alternates: { canonical: `${siteConfig.url}/research` },
  openGraph: {
    title: "Research Center | Vista by Lara",
    description: "Original research, datasets, methodology, and citation assets for UAE digital growth and AI visibility.",
    url: `${siteConfig.url}/research`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <BarChart3 className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Research Center</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Original Research for AI Visibility, Google Ads, Shopify, GEO, and CRO in the UAE
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            The research center stores benchmark reports, datasets, methodology notes, citation formats, and future downloads that strengthen EEAT, topical authority, and AI retrieval.
          </p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          {researchReports.map((report) => (
            <article key={report.uuid} className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Research Roadmap</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-foreground">{report.name}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{report.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Dataset", "Charts", "Methodology"].map((item) => (
                  <span key={item} className="rounded-xl border border-border/50 px-4 py-3 text-sm text-foreground/78">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-[#0d111f] p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Dataset Engine</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {datasets.map((dataset) => (
              <article key={dataset.uuid} className="rounded-2xl border border-border/50 bg-background/35 p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">{dataset.name}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{dataset.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["CSV", "JSON", "Charts", "Version", "Citation"].map((item) => (
                    <span key={item} className="rounded-full border border-accent/20 px-3 py-1 text-xs text-accent">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Link href="/api/research" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <Download className="h-4 w-4" />
            View research API
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
