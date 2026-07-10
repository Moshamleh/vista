import Link from "next/link"
import { ArrowUpRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { jsonLd } from "@/lib/json-ld"
import type { LegacyShopifyPage } from "@/lib/legacy-shopify-pages"
import { siteConfig } from "@/lib/site"

type LegacyShopifyPageViewProps = {
  page: LegacyShopifyPage
}

function getSchemaType(kind: LegacyShopifyPage["kind"]) {
  if (kind === "article") return "TechArticle"
  if (kind === "product") return "Product"
  if (kind === "collection") return "CollectionPage"
  return "WebPage"
}

export function LegacyShopifyPageView({ page }: LegacyShopifyPageViewProps) {
  const pageUrl = `${siteConfig.url}${page.path}`
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": getSchemaType(page.kind),
      name: page.title,
      headline: page.title,
      description: page.description,
      url: pageUrl,
      inLanguage: "en-AE",
      datePublished: page.date,
      dateModified: page.date,
      areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      about: [
        { "@type": "Thing", name: page.primaryKeyword },
        { "@type": "Place", name: page.location },
        { "@type": "Thing", name: page.category },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: page.category, item: pageUrl },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-[#030408] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute left-[7%] top-[-12%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[130px]" />
            <div className="absolute bottom-[-15%] right-[-10%] h-[620px] w-[620px] rounded-full bg-[#d6b45f]/10 blur-[160px]" />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
              Vista by Lara
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-stretch">
              <section className="rounded-[2rem] border border-accent/15 bg-[#05070d]/92 p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{page.category}</p>
                <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">{page.description}</p>
                <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                  <span className="rounded-2xl border border-accent/15 bg-[#0d111f] px-4 py-3">Legacy URL restored</span>
                  <span className="rounded-2xl border border-accent/15 bg-[#0d111f] px-4 py-3">Canonical: self</span>
                  <span className="rounded-2xl border border-accent/15 bg-[#0d111f] px-4 py-3">Sitemap-ready</span>
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={siteConfig.whatsapp}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-heading text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {page.ctaLabel}
                  </a>
                  <Link
                    href="/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/30 px-6 font-heading text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
                  >
                    AI visibility guide
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              <aside className="rounded-[2rem] border border-border/60 bg-[#0d111f] p-7">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <h2 className="mt-5 font-heading text-2xl font-semibold text-foreground">Migration status</h2>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Old Shopify path</dt>
                    <dd className="mt-1 break-words font-medium text-foreground">{page.path}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Last known crawl period</dt>
                    <dd className="mt-1 font-medium text-foreground">{page.date}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Primary keyword</dt>
                    <dd className="mt-1 font-medium text-foreground">{page.primaryKeyword}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {page.sections.map((section, index) => (
              <article key={section.title} className="min-h-[280px] rounded-3xl border border-border/60 bg-[#0d111f] p-7">
                <span className="font-mono text-xs text-muted-foreground/70">0{index + 1}</span>
                <CheckCircle2 className="mt-6 h-5 w-5 text-accent" aria-hidden="true" />
                <h2 className="mt-5 font-heading text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#05070d] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">UAE entity stack</p>
              <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground">Connected to the new Vista authority graph.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                This restored page keeps old indexed demand connected to Vista's current services, knowledge platform, sitemap, and AI-readable content graph.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Audience", page.audience],
                ["Offer", page.offer],
                ["Outcome", page.outcome],
                ["Location", page.location],
              ].map(([label, value]) => (
                <article key={label} className="rounded-2xl border border-border/50 bg-[#0d111f] p-5">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{label}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.58fr_0.42fr]">
            <div>
              <h2 className="font-heading text-4xl font-semibold text-foreground">FAQ</h2>
              <div className="mt-8 divide-y divide-border/60 rounded-3xl border border-border/60 bg-[#0d111f]">
                {page.faqs.map((faq) => (
                  <article key={faq.question} className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="rounded-3xl border border-accent/15 bg-accent/10 p-7">
              <h2 className="font-heading text-3xl font-semibold text-foreground">Related Vista paths</h2>
              <div className="mt-6 grid gap-3">
                {page.related.map((item) => {
                  const external = item.href.startsWith("http")
                  const className = "rounded-2xl border border-border/50 bg-background/35 px-4 py-3 text-sm text-foreground/82 hover:border-accent/40 hover:text-accent"
                  return external ? (
                    <a key={item.href} href={item.href} className={className}>
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} href={item.href} className={className}>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
