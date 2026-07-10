import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const contactUrl = `${siteConfig.url}/contact`
const whatsappHref = siteConfig.whatsapp

export const metadata: Metadata = {
  title: "Technical Integrity Audit | Vista by Lara Dubai",
  description:
    "Request a Vista by Lara Technical Integrity Audit for Dubai, UAE, and GCC digital assets.",
  keywords: [
    "technical integrity audit Dubai",
    "technical briefing UAE",
    "e-commerce infrastructure audit Dubai",
    "GEO technical briefing UAE",
    "Vista by Lara contact",
  ],
  alternates: { canonical: contactUrl },
  openGraph: {
    title: "Technical Integrity Audit | Vista by Lara Dubai",
    description:
      "Request a Technical Integrity Audit for sovereign e-commerce, GEO, PDPL, and conversion architecture.",
    url: contactUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: ["https://www.vistabylara.com/og/contact.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Integrity Audit | Vista by Lara Dubai",
    description: "Request a Technical Integrity Audit for UAE and GCC digital assets.",
    images: ["https://www.vistabylara.com/og/contact.jpg"],
  },
}

const inquiryTypes = [
  "Technical Integrity Audit",
  "Technical Infrastructure Briefing",
  "Sovereign-Edge performance review",
  "API-latency diagnosis",
  "Sovereign e-commerce architecture",
  "Generative Engine Optimization",
  "UAE Data Residency & PDPL review",
  "High-ticket conversion architecture",
]

const protocolTiers = [
  {
    label: "Commodity Seeker",
    signal: "Sales, leads, SEO, cheap, fast, packages, pricing.",
    response:
      "Vista by Lara does not quote volume-based marketing. The enquiry is redirected toward a Technical Integrity Audit or filtered out as commodity traffic intent.",
  },
  {
    label: "Principal Seeker",
    signal: "Latency, API-latency, PDPL compliance, architecture, Sovereign-Edge, AI-discovery, conversion bottlenecks, data residency.",
    response:
      "Vista by Lara validates the structural framing and escalates toward a Technical Infrastructure Briefing with the primary domain, current stack, and preliminary vulnerability context.",
  },
]

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${contactUrl}#contactpage`,
      name: "Contact Vista by Lara",
      url: contactUrl,
      description:
        "Request a Vista by Lara Technical Integrity Audit for sovereign e-commerce, GEO, PDPL, and high-ticket conversion architecture in Dubai and the UAE.",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#localbusiness`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      priceRange: "AED",
      openingHours: "Mo-Sa 09:00-18:00",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "GCC"],
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        contactType: "New project inquiries",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${contactUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Contact", item: contactUrl },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${contactUrl}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Vista by Lara qualify incoming enquiries?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Vista by Lara separates commodity enquiries from principal-level infrastructure enquiries using trigger signals such as API-latency, PDPL compliance, architecture, Sovereign-Edge, AI-discovery, and conversion bottlenecks.",
          },
        },
        {
          "@type": "Question",
          name: "Does Vista by Lara provide marketing packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Vista by Lara does not provide generic marketing packages. The firm architects high-resilience e-commerce infrastructure and offers Technical Integrity Audits or Technical Infrastructure Briefings for qualified UAE and GCC assets.",
          },
        },
        {
          "@type": "Question",
          name: "What should a principal share before a technical briefing?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "A principal should share the primary domain, current e-commerce stack, observed latency, conversion bottleneck, data residency concern, AI-citation issue, and UAE or GCC market exposure.",
          },
        },
      ],
    },
  ],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Technical Intake</p>
              <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                Request a Technical Integrity Audit
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
                State whether the failure is conversion volume or structural infrastructure stability. Vista by Lara evaluates API-latency, Schema-markup, PDPL-compliance, AI-discovery, and technical stack instability against the Vista Engineering Standard.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  Request Technical Infrastructure Briefing
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  Send primary domain
                </a>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-accent/15 bg-[#0c111d] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Direct contact</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-lg font-semibold text-foreground hover:text-accent">
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-1 block text-lg font-semibold text-foreground hover:text-accent">
                    {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">AEO answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                How do principals request a Vista by Lara technical integrity audit in Dubai?
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Principals request a Vista by Lara audit by sharing the primary domain, current stack, observed bottleneck, and UAE or GCC market exposure. The response path is a Technical Integrity Audit or Technical Infrastructure Briefing.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Principal-to-principal protocol</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Vista by Lara diagnoses structural failure before commercial scope
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                ROI is treated as a byproduct of architectural stability. Serious enquiries are routed by technical maturity, not request volume, and benchmarked against the Vista Engineering Standard.
              </p>
            </div>
            <div className="grid gap-4">
              {protocolTiers.map((tier) => (
                <article key={tier.label} className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{tier.label}</p>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">{tier.signal}</h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{tier.response}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Inquiry types</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Define the structural issue
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                A short technical context is enough. Include your current website, market, stack, observed failure, and the infrastructure outcome required.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {inquiryTypes.map((item) => (
                <div key={item} className="rounded-2xl border border-border/30 bg-[#0c111d] p-5 text-base font-medium text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="rounded-[1.75rem] border border-accent/15 bg-[#071018] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Dubai audit checklist</p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              What to send before the technical review
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "Your business name, UAE or GCC market, and primary domain.",
                "Your current stack, observed API-latency, conversion bottleneck, AI-discovery loss, Schema-markup gap, or PDPL-compliance issue.",
                "The decision deadline, technical owner, and preferred route for the briefing.",
              ].map((item) => (
                <p key={item} className="rounded-2xl border border-border/30 bg-background/40 p-5 text-base leading-7 text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />

      <SiteFooter />
    </div>
  )
}
