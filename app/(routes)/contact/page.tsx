import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const contactUrl = `${siteConfig.url}/contact`
const whatsappHref = siteConfig.whatsapp

export const metadata: Metadata = {
  title: "Contact Vista by Lara | Dubai Branding Agency UAE",
  description:
    "Contact Vista by Lara in Dubai for branding, website design, UX/UI, development, and generative AI projects across UAE and GCC markets.",
  keywords: [
    "contact branding agency Dubai",
    "Dubai web design consultation",
    "UX design agency UAE contact",
    "branding consultation Dubai",
    "Vista by Lara contact",
  ],
  alternates: { canonical: contactUrl },
  openGraph: {
    title: "Contact Vista by Lara | Dubai Branding Agency",
    description:
      "Book a Dubai consultation for luxury branding, website design, UX/UI, development, and generative AI projects.",
    url: contactUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: ["https://www.vistabylara.com/og/contact.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Vista by Lara | Dubai Branding Agency",
    description: "Book a Dubai consultation for premium branding, web, UX, and AI projects.",
    images: ["https://www.vistabylara.com/og/contact.jpg"],
  },
}

const inquiryTypes = [
  "Brand identity or rebrand",
  "Luxury website design",
  "Digital product or app UX/UI",
  "Full-stack website development",
  "Generative AI product or workflow",
  "Ongoing design and growth support",
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
        "Contact Vista by Lara for luxury branding, website design, digital product design, development, and generative AI services in Dubai and the UAE.",
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
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Contact Vista by Lara</p>
              <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                Start a Dubai Branding, Web, UX, or AI Project
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
                Contact Vista by Lara in Dubai to plan a premium brand identity, website, digital product, full-stack build, or generative AI experience for UAE and GCC growth.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  WhatsApp the team
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  WhatsApp now
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
                How do I contact Vista by Lara in Dubai?
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              You can contact Vista by Lara by emailing solution@vistabylara.com or messaging the Dubai team on WhatsApp. Share your service, timeline, budget range, and target market so we can recommend the right UAE project scope.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Inquiry types</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Tell us what you want to build
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                A short brief is enough. Include your current website, business location, launch date, and the outcome you need.
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
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Dubai consultation checklist</p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              What to send before we speak
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "Your business name, location, and current website or social profile.",
                "The service you need: branding, website, UX/UI, development, or AI.",
                "Your timeline, launch pressure, and preferred contact channel.",
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
