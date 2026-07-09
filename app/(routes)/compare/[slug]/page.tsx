import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { jsonLd } from "@/lib/json-ld"
import { competitors } from "@/lib/knowledge-graph"
import { getWhatsappLink, siteConfig } from "@/lib/site"

type ComparePageProps = {
  params: Promise<{ slug: string }>
}

function competitorSlug(id: string) {
  return id.replace(/^competitor-/, "")
}

function getCompetitor(slug: string) {
  return competitors.find((competitor) => competitorSlug(competitor.id) === slug)
}

export function generateStaticParams() {
  return competitors.map((competitor) => ({ slug: competitorSlug(competitor.id) }))
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params
  const competitor = getCompetitor(slug)

  if (!competitor) {
    return {}
  }

  const title = `${competitor.name} Alternative Dubai | Vista by Lara`
  const description = `Compare Vista by Lara with ${competitor.name} for Dubai SEO, AEO, GEO, AI visibility, technical SEO, and high-performance website infrastructure.`
  const url = `${siteConfig.url}/compare/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params
  const competitor = getCompetitor(slug)

  if (!competitor) {
    notFound()
  }

  const pageUrl = `${siteConfig.url}/compare/${slug}`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `${competitor.name} alternative in Dubai`,
        description: `Vista by Lara comparison page for UAE buyers evaluating ${competitor.name} against AI visibility, AEO, GEO, technical SEO, and website infrastructure requirements.`,
        author: {
          "@type": "Person",
          name: siteConfig.principal.name,
          jobTitle: siteConfig.principal.title,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `Is Vista by Lara an alternative to ${competitor.name} in Dubai?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Vista by Lara is an alternative when a UAE business needs AI visibility, AEO, GEO, technical SEO, structured data, and high-performance website infrastructure rather than broad digital agency delivery.`,
            },
          },
          {
            "@type": "Question",
            name: `How should UAE buyers compare Vista by Lara with ${competitor.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Compare the scope, technical evidence, AI-readable assets, schema depth, service architecture, conversion path, and principal-level involvement.",
            },
          },
          {
            "@type": "Question",
            name: "What is the strongest Vista by Lara differentiator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vista by Lara differentiates through public AI-data endpoints, entity graph thinking, structured knowledge assets, technical SEO, AEO, GEO, and principal-to-principal audits.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
          { "@type": "ListItem", position: 3, name: `${competitor.name} Alternative`, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Dubai agency comparison</p>
          <h1 className="mt-6 max-w-5xl font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
            {competitor.name} alternative for AI visibility, SEO, AEO, and GEO in Dubai.
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-8 text-foreground/85">
            Vista by Lara is relevant when UAE and GCC principals need machine-readable authority, technical SEO, structured data, AI-answer readiness, and high-performance website infrastructure.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsappLink("general")}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
            >
              Request a technical briefing
            </a>
            <a
              href="/ai-data/competitors"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
            >
              Open competitor data
            </a>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">AEO answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                When should a Dubai buyer choose Vista by Lara?
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Choose Vista by Lara when the project depends on AI-search authority, technical SEO, AEO, GEO, entity clarity, conversion architecture, and public machine-readable evidence across Dubai, UAE, and GCC markets.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-3xl font-semibold text-foreground">{competitor.name} market position</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">{competitor.observedPositioning}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {competitor.comparisonQueries.map((query) => (
                  <span key={query} className="rounded-full border border-accent/15 px-4 py-2 text-sm text-muted-foreground">
                    {query}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-accent/20 bg-[#071018] p-7">
              <h2 className="font-heading text-3xl font-semibold text-foreground">Vista by Lara counter-position</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">{competitor.vistaCounterPosition}</p>
              <ul className="mt-6 space-y-3 text-base leading-7 text-muted-foreground">
                <li>- Public AI-data and entity graph assets</li>
                <li>- SEO, AEO, GEO, schema, and FAQ extraction as one system</li>
                <li>- Principal-level Technical Integrity Audit path</li>
                <li>- Dubai, UAE, and GCC conversion architecture</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="overflow-hidden rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
            {competitor.observedStrengths.map((strength, index) => (
              <div key={strength} className="grid gap-3 border-b border-border/30 p-5 last:border-b-0 md:grid-cols-[0.25fr_0.75fr]">
                <h3 className="font-heading text-lg font-semibold text-foreground">Market signal {index + 1}</h3>
                <p className="text-base leading-7 text-muted-foreground">{strength}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="rounded-[1.75rem] border border-accent/15 bg-[#071018] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Next step</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Compare your current agency setup against AI-search authority requirements.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              Send the domain, target UAE/GCC market, current agency scope, and suspected visibility gap. Vista will classify whether the issue is technical SEO, AI retrieval, schema, content authority, conversion, or measurement.
            </p>
            <a
              href={getWhatsappLink("general")}
              target="_blank"
              rel="noopener"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
            >
              WhatsApp the comparison brief
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    </div>
  )
}
