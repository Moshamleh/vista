import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Database, Layers3, ShieldCheck } from "lucide-react"
import { ClientShowcase } from "@/components/client-showcase"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { caseStudies, caseStudyDomains } from "@/lib/case-studies"
import { infrastructureHubs } from "@/lib/infrastructure-hubs"
import { jsonLd } from "@/lib/json-ld"
import { showcaseClients } from "@/lib/showcase-clients"
import { siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/case-studies`

export const metadata: Metadata = {
  title: "Technical Intelligence Registry Dubai | Vista",
  description:
    "Technical Intelligence registry for Dubai e-commerce failures, AI visibility, Shopify infrastructure, technical SEO, AEO, GEO, and conversion architecture.",
  keywords: [
    "ecommerce website not converting Dubai",
    "Shopify agency Dubai",
    "technical SEO audit Dubai",
    "AI visibility agency Dubai",
    "AEO agency Dubai",
    "GEO agency UAE",
    "conversion rate optimization Dubai",
    "website speed optimization Dubai",
    "luxury ecommerce agency UAE",
    "PDPL compliance website UAE",
    "شركة سيو دبي",
    "تصميم متجر إلكتروني دبي",
    "تحسين محركات البحث الإمارات",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Technical Intelligence Registry | Vista by Lara Dubai",
    description:
      "Institutional technical briefings across luxury e-commerce, fashion, interiors, and real estate infrastructure in UAE and GCC markets.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Intelligence Registry Dubai | Vista by Lara",
    description: "Digital sovereignty and infrastructure assets engineered for UAE and GCC brands.",
    images: [siteConfig.ogImage],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Vista by Lara Technical Intelligence Registry",
  url: pageUrl,
  description:
    "A Dubai Technical Intelligence registry for AI-search sovereignty, conversion architecture, Shopify infrastructure, technical SEO, AEO, GEO, and infrastructure resilience.",
  inLanguage: "en-AE",
  about: {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
  },
  hasPart: caseStudies.map((study) => ({
    "@type": "CreativeWork",
    name: `${study.client}: Infrastructure Remediation & Sovereign Engineering`,
    url: `${pageUrl}/${study.slug}`,
    about: study.technicalImpact,
  })),
  significantLink: infrastructureHubs.map((hub) => `${siteConfig.url}/${hub.slug}`),
}

function RegistryMesh() {
  return (
    <div className="relative min-h-[360px] overflow-hidden border border-accent/15 bg-[#05070d] shadow-[0_38px_110px_-72px_rgba(87,217,255,0.7)] [perspective:1100px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-60" />
      <div className="absolute inset-x-8 top-14 h-px bg-accent/50" />
      <div className="absolute bottom-10 left-1/2 h-56 w-[82%] -translate-x-1/2 rotate-x-[64deg] border border-accent/25 bg-[linear-gradient(90deg,rgba(87,217,255,0.16)_1px,transparent_1px),linear-gradient(rgba(87,217,255,0.14)_1px,transparent_1px)] bg-[size:2rem_2rem] shadow-[0_0_70px_rgba(87,217,255,0.18)]" />
      <div className="absolute left-[12%] top-24 h-36 w-28 rotate-y-[-28deg] border border-white/15 bg-white/[0.035] shadow-[18px_24px_70px_rgba(0,0,0,0.45)]" />
      <div className="absolute left-[38%] top-16 h-44 w-32 rotate-y-[-18deg] border border-accent/30 bg-accent/[0.055] shadow-[22px_28px_80px_rgba(87,217,255,0.12)]" />
      <div className="absolute right-[13%] top-28 h-32 w-24 rotate-y-[24deg] border border-white/15 bg-white/[0.035] shadow-[18px_24px_70px_rgba(0,0,0,0.45)]" />
      <div className="absolute inset-x-8 bottom-8 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-accent/80">
        <span>Engineering Registry</span>
        <span>Dubai / UAE / GCC</span>
      </div>
      <div className="absolute left-8 top-8 max-w-xs">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Digital Sovereignty</p>
        <p className="mt-4 font-heading text-3xl font-semibold leading-tight text-foreground">
          Institutional knowledge modules, not gallery tiles.
        </p>
      </div>
    </div>
  )
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#030408]">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Technical Intelligence Registry</p>
            <h1 className="mt-7 font-heading text-5xl font-semibold leading-[0.96] tracking-tight text-foreground sm:text-7xl">
              Technical Intelligence Registry for Sovereign Digital Infrastructure
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Vista by Lara documents client projects as Technical Intelligence for Dubai, UAE, and GCC principals. Each briefing starts with an Atomic Answer, maps the Legacy vs. Vista standard, and diagnoses latency, compliance, AI-visibility, and conversion architecture failures.
            </p>
          </div>
          <RegistryMesh />
        </section>

        <section className="border-y border-white/10 bg-[#080b12]">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Atomic Answer</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
                Why does Vista treat poor conversion as infrastructure failure?
              </h2>
            </div>
            <p className="text-xl leading-8 text-foreground/88">
              Poor Dubai e-commerce conversion is usually an infrastructure failure: latency burns media spend, weak compliance reduces trust, and non-machine-readable content blocks AI recommendations. Vista by Lara repairs this through Sovereign-Edge planning, Conversion Architecture, and Machine-Readable Entity Graphs.
            </p>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#080b12]">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 sm:px-8 md:grid-cols-3">
            {caseStudyDomains.map((domain, index) => {
              const icons = [ShieldCheck, Database, Layers3]
              const Icon = icons[index] ?? ShieldCheck
              return (
                <div key={domain} className="flex items-center gap-3 border border-white/10 bg-white/[0.025] p-4">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    {domain}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Technical Infrastructure Hubs</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Topic clusters that govern the individual technical briefings
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {infrastructureHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/${hub.slug}`}
                className="group border border-white/10 bg-[#070a11] p-5 transition hover:border-accent/40 hover:bg-accent/[0.04]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{hub.eyebrow}</p>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground group-hover:text-accent">{hub.title}</h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{hub.answer}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group relative min-h-[370px] overflow-hidden border border-white/10 bg-[#070a11] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-[#09101a]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {study.domain}
                    </p>
                    <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground grayscale transition group-hover:text-accent">
                      {study.client}
                    </h2>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-accent" />
                </div>

                <p className="mt-8 text-xl leading-7 text-foreground">{study.technicalImpact}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {study.status}
                  </span>
                  <span className="border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {study.institutionalDomain}
                  </span>
                </div>

                <div className="absolute inset-x-6 bottom-6 border-t border-white/10 pt-5">
                  <p className="text-sm leading-6 text-muted-foreground">{study.locationSignal}</p>
                  <p className="mt-4 text-sm font-semibold text-foreground transition group-hover:text-accent">
                    Request Technical Briefing
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#080b12]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Client Roster</p>
              <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Brands Vista by Lara has worked with
              </h2>
            </div>
            <ClientShowcase clients={showcaseClients} />
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
