import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Network } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { knowledgeObjects, semanticRelationships } from "@/lib/knowledge-graph"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Entity Map | Vista AI Knowledge Graph",
  description:
    "Explore the Vista by Lara entity map connecting AI visibility, Shopify, Google Ads, GA4, Performance Max, CRO, Dubai, research, tools, and services.",
  alternates: { canonical: `${siteConfig.url}/entity-map` },
  openGraph: {
    title: "Entity Map | Vista AI Knowledge Graph",
    description: "Interactive knowledge graph map for Vista by Lara digital growth entities and semantic relationships.",
    url: `${siteConfig.url}/entity-map`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

function label(uuid: string) {
  return knowledgeObjects.find((object) => object.uuid === uuid)?.name || uuid
}

export default function EntityMapPage() {
  const featuredObjects = knowledgeObjects.filter((object) =>
    ["Service", "Technology", "Guide", "Research", "Tool", "Dataset", "City", "Industry"].includes(object.type),
  )

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <Network className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Live Entity Graph</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Vista Entity Map for AI-Readable Digital Growth
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            This page visualizes the semantic relationship engine connecting Google Ads, Performance Max, GA4, Shopify, CRO, AI Visibility, Dubai, research, FAQs, tools, templates, and case-study infrastructure.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredObjects.map((object) => (
            <Link key={object.uuid} href={object.href} className="rounded-3xl border border-border/60 bg-[#0d111f] p-6 transition-colors hover:border-accent/40">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{object.type}</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">{object.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{object.machineSummary}</p>
              <p className="mt-5 text-xs text-muted-foreground">Confidence {object.confidenceScore} | Authority {object.authorityScore}</p>
            </Link>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-[#0d111f] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Semantic Relationship Chain</h2>
          <div className="mt-6 grid gap-3">
            {semanticRelationships.map((edge) => (
              <div key={`${edge.source}-${edge.target}`} className="grid gap-3 rounded-2xl border border-border/50 bg-background/35 p-4 md:grid-cols-[0.32fr_0.24fr_0.32fr_0.12fr] md:items-center">
                <span className="font-semibold text-foreground">{label(edge.source)}</span>
                <span className="text-sm text-muted-foreground">{edge.relationship}</span>
                <span className="font-semibold text-accent">{label(edge.target)}</span>
                <span className="text-xs text-muted-foreground">Strength {edge.strength}</span>
              </div>
            ))}
          </div>
          <Link href="/api/entities" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            View machine-readable entity JSON
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
