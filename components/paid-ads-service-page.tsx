import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle2, LineChart, Megaphone, MousePointerClick, ShieldCheck, Sparkles, Target, Workflow } from "lucide-react"

import { jsonLd } from "@/lib/json-ld"
import { getWhatsappLink, siteConfig } from "@/lib/site"

type Faq = {
  question: string
  answer: string
}

type Feature = {
  title: string
  body: string
}

type PaidAdsServicePageProps = {
  platform: "Google Ads" | "Meta Ads"
  eyebrow: string
  title: string
  subtitle: string
  intro: string
  slug: string
  serviceName: string
  primaryCta: string
  secondaryHref: string
  secondaryLabel: string
  keywords: string[]
  serviceBlocks: Feature[]
  setupBlocks: Feature[]
  industries: Feature[]
  proofPoints: Feature[]
  faqs: Faq[]
}

const sharedLinks = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Google Ads Dubai", href: "/services/google-ads-dubai" },
  { label: "Meta Ads Dubai", href: "/services/meta-ads-dubai" },
  { label: "UAE AI Agent", href: "/services/uae-ai-agent" },
  { label: "SEO Services Dubai", href: "/services/seo-services-dubai" },
  { label: "AI Visibility Hub", href: "/knowledge/ai-visibility" },
  { label: "AI Visibility Guide", href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" },
]

const comparisonRows = [
  ["Tracking", "Clicks, forms, and messages are counted loosely.", "GA4, GTM, conversion events, pixel/CAPI, CRM fields, and lead quality checks are aligned."],
  ["Landing pages", "Campaign traffic lands on generic pages.", "Dedicated pages match UAE intent, platform promise, audience, and conversion action."],
  ["Management", "Budgets are adjusted without a documented operating rhythm.", "Search terms, creative, audience, funnel stage, and sales feedback are reviewed in a repeatable cadence."],
  ["Sales proof", "Reports show platform metrics only.", "Reports connect spend, inquiries, qualified leads, sales notes, and press/media-ready growth evidence where verified."],
]

export function PaidAdsServicePage({
  platform,
  eyebrow,
  title,
  subtitle,
  intro,
  slug,
  serviceName,
  primaryCta,
  secondaryHref,
  secondaryLabel,
  keywords,
  serviceBlocks,
  setupBlocks,
  industries,
  proofPoints,
  faqs,
}: PaidAdsServicePageProps) {
  const pageUrl = `${siteConfig.url}/services/${slug}`
  const whatsappHref = getWhatsappLink(slug)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        serviceType: `${platform} management, paid media tracking, conversion optimization, sales growth reporting`,
        url: pageUrl,
        description: intro,
        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          telephone: siteConfig.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
        },
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
        audience: {
          "@type": "BusinessAudience",
          audienceType: "UAE businesses, real estate teams, clinics, e-commerce brands, restaurants, education providers, and service companies",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${platform} deliverables`,
          itemListElement: [...serviceBlocks, ...setupBlocks].map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.body,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
          { "@type": "ListItem", position: 3, name: serviceName, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="absolute left-1/2 top-16 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[140px]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.28em] text-accent">
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                {eyebrow}
              </p>
              <h1 className="mt-6 max-w-5xl font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground/84">{subtitle}</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  {primaryCta}
                </a>
                <Link
                  href={secondaryHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-accent/15 bg-[#071018]/88 p-6 shadow-[0_40px_100px_-72px_rgba(87,217,255,0.55)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">AEO direct answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground">
                What does {platform} management deliver?
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {platform} management in Dubai should connect campaign setup, tracking, landing pages, audience intent, budget control, and sales feedback into one measurable growth system.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {keywords.slice(0, 8).map((keyword) => (
                  <span key={keyword} className="rounded-full border border-accent/15 px-3 py-1.5 text-xs text-muted-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-4">
            {["Account architecture", "Application and event setup", "Pixel and conversion accuracy", "Sales growth reporting"].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-base leading-7 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Paid media operating system</p>
            <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Campaigns are only useful when tracking, landing pages, and sales feedback agree.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Vista by Lara manages paid media as a documented revenue system. The work covers campaign architecture, application and event setup, conversion pixels, creative testing, landing page alignment, and reporting that connects ad spend to qualified inquiries and sales signals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceBlocks.map((block, index) => {
              const icons = [Target, MousePointerClick, LineChart, BarChart3, ShieldCheck, Sparkles]
              const Icon = icons[index % icons.length]
              return (
                <article key={block.title} className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-foreground">{block.title}</h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{block.body}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Tracking setup</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Application, pixel, event, and conversion management.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Accurate management starts before the first ad launches. We define what a qualified lead means, then configure the measurement stack so campaigns can optimize toward real business outcomes.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {setupBlocks.map((block) => (
                <article key={block.title} className="rounded-[1.35rem] border border-accent/15 bg-[#0c111d] p-6">
                  <Workflow className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">{block.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{block.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Industries</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Built for UAE industries where lead quality matters.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {industries.map((industry) => (
                <article key={industry.title} className="rounded-[1.25rem] border border-border/30 bg-[#0c111d] p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{industry.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Management quality</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                What accurate paid media management means.
              </h2>
            </div>
            <div className="overflow-x-auto rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
              <table className="min-w-[780px] text-left text-sm">
                <thead className="bg-accent/10 text-foreground">
                  <tr>
                    <th className="px-5 py-4 font-heading text-base">Area</th>
                    <th className="px-5 py-4 font-heading text-base">Weak setup</th>
                    <th className="px-5 py-4 font-heading text-base">Vista management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  {comparisonRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell} className="px-5 py-4 leading-6">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Proof and media</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Sales growth should be documented, not guessed.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We structure reporting so performance can be reviewed internally, shared with leadership, and used as a credible proof layer for press, media, investor updates, or public growth narratives when the figures are verified.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <article key={point.title} className="rounded-[1.35rem] border border-accent/15 bg-[#0c111d] p-6">
                  <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">FAQ</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Questions Dubai clients ask about {platform}.
              </h2>
            </div>
            <div className="divide-y divide-border/40 rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
              {faqs.map((faq) => (
                <article key={faq.question} className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="grid gap-8 rounded-[1.75rem] border border-accent/20 bg-[#071018] p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Internal growth links</p>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Connect ads with the rest of your UAE growth system.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                Paid media works harder when the website, SEO, AI visibility, CRM, and lead qualification journey are connected. Use these internal resources to plan the full system.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {sharedLinks
                  .filter((link) => !link.href.endsWith(slug))
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-full border border-accent/20 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    </>
  )
}
