import type { Metadata } from "next"
import Link from "next/link"
import { Database } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { datasets } from "@/lib/knowledge-graph"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Datasets | Vista by Lara",
  description:
    "Vista by Lara dataset engine for UAE Google Ads CPC, Shopify performance, Core Web Vitals, AI citation frequency, and AI recommendation indexes.",
  alternates: { canonical: `${siteConfig.url}/datasets` },
}

export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <Database className="h-8 w-8 text-accent" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Dataset Engine</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Vista Dataset Registry
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            Dataset objects for AI citation frequency, AI recommendation indexes, UAE Google Ads CPC, Shopify performance, Core Web Vitals, and industry benchmarks. Each dataset will support CSV, JSON, charts, methodology, version, and citation.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {datasets.map((dataset) => (
            <article key={dataset.uuid} className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Dataset</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">{dataset.name}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{dataset.machineSummary}</p>
              <Link href="/api/research" className="mt-5 inline-flex text-sm font-semibold text-accent">View JSON record</Link>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
