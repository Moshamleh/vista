import type { Metadata } from "next"
import Link from "next/link"
import { Bot, Code2, Database, Wrench } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { apiCatalog, services, tools } from "@/lib/knowledge-graph"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"


export const metadata: Metadata = {
  title: "AI Agent Index | Vista by Lara",
  description:
    "Machine-readable AI map for Vista by Lara: APIs, knowledge endpoints, service registry, tool catalog, FAQ, prompt library, and contact methods.",
  alternates: { canonical: `${siteConfig.url}/ai` },
  openGraph: {
    title: "AI Agent Index | Vista by Lara",
    description: "Curated AI discovery page for Vista by Lara knowledge infrastructure, APIs, tools, services, and contact methods.",
    url: `${siteConfig.url}/ai`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

export default function AIIndexPage() {
  const url = `${siteConfig.url}/ai`

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: "AI Agent Index | Vista by Lara",
        description:
          "Machine-readable AI map for Vista by Lara: APIs, knowledge endpoints, service registry, tool catalog, FAQ, prompt library, and contact paths.",
        isPartOf: {
          "@type": "WebSite",
          "@id": siteConfig.url,
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#ai-agent-index`,
        url,
        name: "AI Agent Index",
        description:
          "Discovery map for AI agents: knowledge APIs, service registry, and tool catalog.",
        mainEntity: [
          {
            "@type": "ItemList",
            "@id": `${url}#knowledge-api`,
            name: "Knowledge API",
            itemListElement: apiCatalog.slice(0, 6).map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.url}${item.href}`,
              name: item.href,
            })),
          },
          {
            "@type": "ItemList",
            "@id": `${url}#service-registry`,
            name: "Service Registry",
            itemListElement: services.slice(0, 6).map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.url}${item.href}`,
              name: item.name,
            })),
          },
          {
            "@type": "ItemList",
            "@id": `${url}#tool-catalog`,
            name: "Tool Catalog",
            itemListElement: tools.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.url}${item.href}`,
              name: item.name,
            })),
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <Bot className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">AI Agent Index</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Machine-Readable Discovery Map for Vista by Lara
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            This index helps AI agents, crawlers, and technical evaluators discover Vista by Lara services, knowledge endpoints, tool catalog, entity graph, research center, prompt/template roadmap, FAQ, and contact paths.
          </p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
            <Code2 className="h-5 w-5 text-accent" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">Knowledge API</h2>
            <div className="mt-5 grid gap-3">
              {apiCatalog.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl border border-border/50 px-4 py-3 text-sm text-foreground/78 hover:border-accent/40 hover:text-accent">
                  {item.href}
                </Link>
              ))}
            </div>
          </article>
          <article className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
            <Database className="h-5 w-5 text-accent" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">Service Registry</h2>
            <div className="mt-5 grid gap-3">
              {services.slice(0, 6).map((item) => (
                <Link key={item.uuid} href={item.href} className="rounded-xl border border-border/50 px-4 py-3 text-sm text-foreground/78 hover:border-accent/40 hover:text-accent">
                  {item.name}
                </Link>
              ))}
            </div>
          </article>
          <article className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
            <Wrench className="h-5 w-5 text-accent" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">Tool Catalog</h2>
            <div className="mt-5 grid gap-3">
              {tools.map((item) => (
                <Link key={item.uuid} href={item.href} className="rounded-xl border border-border/50 px-4 py-3 text-sm text-foreground/78 hover:border-accent/40 hover:text-accent">
                  {item.name}
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-12 rounded-3xl border border-accent/15 bg-accent/10 p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Contact Methods</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <a href={`mailto:${siteConfig.email}`} className="rounded-2xl border border-border/50 bg-background/35 p-5 text-foreground/82 hover:border-accent/40 hover:text-accent">{siteConfig.email}</a>
            <a href={siteConfig.whatsapp} className="rounded-2xl border border-border/50 bg-background/35 p-5 text-foreground/82 hover:border-accent/40 hover:text-accent">WhatsApp routing</a>
            <Link href="/contact" className="rounded-2xl border border-border/50 bg-background/35 p-5 text-foreground/82 hover:border-accent/40 hover:text-accent">Technical briefing</Link>
          </div>
        </section>
      </main>

      {/* Page-specific machine-readable index for AI features (AI crawling-friendly) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />

      <SiteFooter />
    </div>
  )
}

