import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Wrench } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { tools } from "@/lib/knowledge-graph"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Tools Lab | Vista by Lara",
  description:
    "Vista by Lara AI tools lab for AI Visibility Score, GEO auditor, SEO auditor, schema validator, content cluster builder, and conversion calculators.",
  alternates: { canonical: `${siteConfig.url}/tools` },
  openGraph: {
    title: "AI Tools Lab | Vista by Lara",
    description: "Interactive AI, SEO, GEO, Shopify, Google Ads, and CRO tools for UAE digital growth.",
    url: `${siteConfig.url}/tools`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

const roadmap = [
  "Google Ads Auditor",
  "SEO Auditor",
  "GEO Auditor",
  "Entity Scanner",
  "Schema Validator",
  "JSON-LD Generator",
  "FAQ Generator",
  "Google Ads Budget Calculator",
  "Shopify Speed Checker",
  "Authority Score",
  "AI Citation Checker",
  "Internal Link Builder",
  "Content Cluster Builder",
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <Wrench className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Interactive AI Tools</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Vista AI Tools Lab
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            The tools lab will turn Vista research and knowledge graph entities into interactive audits, calculators, scanners, validators, and builders for UAE digital growth teams.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.uuid} href={tool.href} className="rounded-3xl border border-border/60 bg-[#0d111f] p-6 transition-colors hover:border-accent/40">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Tool</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">{tool.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Open
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-[#0d111f] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Tool Roadmap</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item) => (
              <span key={item} className="rounded-2xl border border-border/50 bg-background/35 px-4 py-3 text-sm text-foreground/82">
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
