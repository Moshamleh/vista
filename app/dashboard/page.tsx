import type { Metadata } from "next"
import Link from "next/link"
import { AiAuthorityBookletForm } from "@/components/ai-authority-booklet-form"
import { siteConfig } from "@/lib/site"

const liveDashboardUrl = "https://admin.vistabylara.com/"
const pageUrl = "https://www.vistabylara.com/dashboard"

export const metadata: Metadata = {
  title: "AI Authority Engine Dubai | SEO AEO GEO UAE",
  description:
    "Request AI Authority Engine access in Dubai. Download the free booklet for UAE SEO, AEO, GEO, entity trust, and AI visibility.",
  keywords: [
    "AI Authority Engine Dubai",
    "AI visibility Dubai",
    "AEO services UAE",
    "GEO agency Dubai",
    "AI SEO Dubai",
    "ChatGPT SEO UAE",
    "Perplexity SEO Dubai",
    "AI recommendation readiness UAE",
    "تحسين محركات البحث بالذكاء الاصطناعي دبي",
    "شركة سيو دبي",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "AI Authority Engine Dubai | Vista by Lara",
    description:
      "Request Vista AI Authority Engine access and download the free booklet for Dubai AI visibility, SEO, AEO, GEO, entity trust, and recommendation readiness.",
    url: pageUrl,
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["/og-vista-ai-visibility.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Authority Engine Dubai | SEO AEO GEO UAE",
    description:
      "Download the Vista AI Authority Engine booklet and request access for Dubai and UAE AI visibility.",
    images: ["/og-vista-ai-visibility.png"],
  },
}

const scoreBreakdown = [
  "AI Readiness",
  "Authority",
  "Technical SEO",
  "Trust",
  "Entity Coverage",
  "Knowledge Graph",
  "Content Quality",
  "Business Profile",
  "Citations",
  "Internal Linking",
  "Schema",
  "Performance",
]

const scannerChecks = [
  "Website",
  "Services",
  "Products",
  "Team",
  "Trust Signals",
  "Reviews",
  "Business Information",
  "FAQ",
  "Structured Data",
  "Internal Links",
  "Images",
  "Videos",
  "Local Presence",
]

const premiumModules = [
  "AI Authority Score with measurable readiness components.",
  "AI Discovery Scanner modeled on AI assistant behavior.",
  "AI Recommendation Engine with business-impact prioritization.",
  "AI Recommendation Probability with transparent uplift tracking.",
  "Competitor Authority Intelligence with actionable gap analysis.",
  "Entity Knowledge Graph Builder for machine understanding.",
  "Executive Dashboard for authority, trust, and visibility trends.",
  "Continuous Monitoring with meaningful change alerts.",
  "Industry-Specific Authority Models by vertical.",
  "AI Content Planner for authority pages, FAQs, and resource hubs.",
]

const processFlow = [
  { title: "Discover", description: "Scan digital assets and identify AI discoverability gaps." },
  { title: "Analyze", description: "Quantify technical, entity, trust, and authority weaknesses." },
  { title: "Recommend", description: "Generate high-impact improvements with implementation order." },
  { title: "Generate", description: "Produce structured, people-first authority assets." },
  { title: "Publish", description: "Deploy pages, schema, and trust documentation." },
  { title: "Monitor", description: "Track meaningful changes in authority and recommendation signals." },
  { title: "Improve", description: "Iterate continuously to strengthen business recommendation readiness." },
]

const faqs = [
  {
    q: "What is the AI Authority Engine for Dubai businesses?",
    a: "The AI Authority Engine is Vista by Lara's AI visibility system for Dubai and UAE businesses. It measures SEO, AEO, GEO, entity trust, schema, content quality, and recommendation readiness.",
  },
  {
    q: "How can I download the free AI Authority Engine booklet?",
    a: "Complete the booklet access form with your business details and consent. The page unlocks the PDF after the request is submitted to Vista by Lara.",
  },
  {
    q: "Is AEO or GEO separate from SEO?",
    a: "Google's latest guidance supports that AI visibility is built on strong SEO fundamentals. Vista operationalizes that foundation through technical quality, people-first content, authority signals, and measurable implementation.",
  },
  {
    q: "Why does this matter immediately in 2026?",
    a: "More buyers rely on AI Overviews, AI Mode, and assistant recommendations. Businesses with stronger machine-readable trust and authority architecture are more likely to be surfaced and recommended.",
  },
  {
    q: "What makes Vista AI Authority Engine defensible?",
    a: "It combines diagnostics, business intelligence, and execution roadmaps in one system with recommendation probability modeling, entity graph intelligence, and trust-centered implementation priorities.",
  },
  {
    q: "Who is this for?",
    a: "Founders, executive teams, growth teams, and agencies that need measurable AI discoverability readiness instead of isolated SEO reports.",
  },
  {
    q: "How do I request full access in Dubai or the UAE?",
    a: "Use the booklet access form or WhatsApp access request button to start a qualified review. Vista by Lara confirms the business case, dashboard scope, and implementation path before access is issued.",
  },
  {
    q: "What business data is collected for booklet access?",
    a: "Vista by Lara collects name, email, phone, company, website, market, priority, consent status, and business context. This supports UAE access review, follow-up, and relevant AI Authority Engine communications.",
  },
]

export default function DashboardPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Vista AI Authority Engine",
    serviceType: "AI visibility, SEO, AEO, and GEO authority platform",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.countryCode,
      },
      areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
      priceRange: "AED",
      openingHours: "Mo-Sa 09:00-18:00",
    },
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
    audience: {
      "@type": "Audience",
      audienceType: "Dubai and UAE business leaders, founders, growth teams, and agencies",
    },
    url: pageUrl,
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "GCC"],
    priceRange: "AED",
    openingHours: "Mo-Sa 09:00-18:00",
    sameAs: siteConfig.sameAs,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "AI Authority Engine", item: pageUrl },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040a12] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(250,204,21,0.14),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(20,184,166,0.14),transparent_38%),radial-gradient(circle_at_50%_88%,rgba(245,158,11,0.11),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.65),rgba(2,6,23,0.95))]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-24">
        <p className="text-xs uppercase tracking-[0.32em] text-amber-300">Vista by Lara / AI Authority Engine</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
          AI Authority Engine for Dubai and UAE Businesses
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-slate-300 md:text-xl">
          Vista AI Authority Engine helps Dubai and UAE businesses measure, improve, and monitor readiness for AI-powered
          discovery, recommendations, Google Search, AEO, GEO, and entity-led trust.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="#booklet-access"
            className="rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_26px_rgba(251,191,36,0.32)] transition hover:scale-[1.02]"
          >
            Download Free Booklet
          </Link>
          <Link
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-amber-300/50 bg-amber-300/10 px-6 py-3 font-semibold text-amber-100 transition hover:border-amber-200 hover:bg-amber-300/20"
          >
            Request Access on WhatsApp
          </Link>
          <Link
            href={liveDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-emerald-400/50 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-500/20"
          >
            AI Authority Engine Login
          </Link>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-8 backdrop-blur">
          <h2 className="text-2xl font-bold md:text-3xl">AI SEO, AEO, and GEO platform for UAE authority</h2>
          <p className="mt-4 max-w-5xl text-slate-300">
            For Google Search, AEO and GEO are not isolated systems. AI visibility grows from strong SEO foundations:
            crawlability, technical quality, helpful content, authority, and trustworthy business information.
          </p>
          <p className="mt-4 max-w-5xl text-sm text-slate-400">
            Arabic search relevance includes terms such as شركة سيو دبي, تحسين محركات البحث بالذكاء الاصطناعي دبي,
            and خدمات GEO في الإمارات for bilingual Dubai and GCC discovery.
          </p>
        </div>
      </section>

      <AiAuthorityBookletForm />

      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-2xl font-bold md:text-3xl">AI Authority Score breakdown</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {scoreBreakdown.map((item) => (
            <article key={item} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <h3 className="font-semibold text-amber-200">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-8">
            <h2 className="text-2xl font-bold md:text-3xl">AI Discovery Scanner</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {scannerChecks.map((item) => (
                <li key={item} className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                  OK {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-8">
            <h2 className="text-2xl font-bold md:text-3xl">Premium platform modules</h2>
            <div className="mt-5 grid gap-2">
              {premiumModules.map((item) => (
                <p key={item} className="text-sm text-slate-300">
                  - {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-amber-300/25 bg-gradient-to-b from-slate-900/70 to-[#0b1220] p-8">
          <h2 className="text-2xl font-bold md:text-3xl">Automation flow (live process narrative)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processFlow.map((step, index) => (
              <article
                key={step.title}
                className="group rounded-2xl border border-slate-700 bg-slate-900/60 p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-300/50"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Stage {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <article key={item.q} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <h3 className="font-semibold text-amber-200">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
