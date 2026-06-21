import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const aboutUrl = `${siteConfig.url}/about`
const whatsappHref = siteConfig.whatsapp

const faqs = [
  {
    question: "What is Vista by Lara?",
    answer:
      "Vista by Lara is a Dubai-based luxury branding, UX design, website, and generative AI agency serving UAE and GCC businesses.",
  },
  {
    question: "Where is Vista by Lara based?",
    answer:
      "Vista by Lara is based in Dubai and works with clients across Abu Dhabi, Sharjah, Ajman, RAK, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
  },
  {
    question: "Who does Vista by Lara work with in the UAE?",
    answer:
      "Vista by Lara works with founders, family offices, luxury service brands, real estate firms, hospitality groups, and growth companies that need premium digital presence in the UAE.",
  },
  {
    question: "What makes Vista by Lara different from other Dubai agencies?",
    answer:
      "Vista by Lara combines brand strategy, high-end visual design, UX, full-stack development, and AI product thinking in one senior creative team.",
  },
  {
    question: "How can I start a project with Vista by Lara?",
    answer:
      "You can start a project by emailing solution@vistabylara.com or messaging the Dubai team on WhatsApp for a focused consultation.",
  },
]

export const metadata: Metadata = {
  title: "About Vista by Lara | Dubai Branding Agency UAE",
  description:
    "Vista by Lara is a Dubai luxury branding, UX design, website, and generative AI agency for UAE and GCC brands. Noble Business Winner 2025.",
  keywords: [
    "branding agency Dubai",
    "UX design agency UAE",
    "luxury branding Dubai",
    "digital agency UAE",
    "creative agency GCC",
    "وكالة تصميم دبي",
    "شركة تصميم علامات تجارية دبي",
    "تصميم تجربة المستخدم الإمارات",
  ],
  alternates: { canonical: aboutUrl },
  openGraph: {
    title: "About Vista by Lara | Dubai Branding Agency",
    description:
      "Dubai luxury branding, UX design, website, and generative AI agency for UAE and GCC businesses.",
    url: aboutUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: ["https://www.vistabylara.com/og/about.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vista by Lara | Dubai Branding Agency",
    description:
      "Dubai luxury branding, UX design, website, and generative AI agency for UAE and GCC businesses.",
    images: ["https://www.vistabylara.com/og/about.jpg"],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${aboutUrl}#aboutpage`,
      name: "About Vista by Lara",
      url: aboutUrl,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
      description:
        "Vista by Lara is a Dubai-based luxury branding, UX design, website, and generative AI agency for UAE and GCC businesses.",
      inLanguage: "en-AE",
    },
    {
      "@type": "FAQPage",
      "@id": `${aboutUrl}#faq`,
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
      "@id": `${aboutUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: aboutUrl,
        },
      ],
    },
  ],
}

const proofPoints = [
  { value: "Dubai", label: "Primary market and strategic location" },
  { value: "UAE + GCC", label: "Regional delivery across premium markets" },
  { value: "2025", label: "Noble Business Winner recognition" },
  { value: "5%", label: "UAE VAT context for compliant B2B planning" },
]

const entityStack = [
  ["Business name", "Vista by Lara"],
  ["Service category", "Luxury branding, UX design, websites, and generative AI"],
  ["Primary location", "Dubai, United Arab Emirates"],
  ["Target audience", "Premium UAE and GCC brands, founders, and growth teams"],
  ["Key differentiator", "Strategy, design, engineering, and AI in one senior team"],
  ["Outcome delivered", "Sharper positioning, higher-trust websites, and conversion-ready digital experiences"],
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">About Vista by Lara</p>
              <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                Dubai Branding Agency for UAE and GCC Growth
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
                Vista by Lara is a Dubai-based luxury branding, UX design, website, and generative AI agency. We help UAE and GCC businesses build trusted brands, premium digital experiences, and conversion-ready platforms.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  Start a Dubai project
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  WhatsApp the team
                </a>
              </div>
            </div>

            <div className="grid gap-3 rounded-[1.75rem] border border-accent/15 bg-[#0c111d] p-5 sm:grid-cols-2 sm:p-6">
              {proofPoints.map((item) => (
                <div key={item.value} className="rounded-2xl border border-border/30 bg-background/45 p-5">
                  <p className="font-heading text-3xl font-semibold text-foreground">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">AEO answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What does Vista by Lara do in Dubai?
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Vista by Lara creates luxury brand identities, UX/UI systems, high-performance websites, and AI-enabled digital products for Dubai and UAE businesses. Our work connects brand strategy, premium design, and scalable technology for companies competing in the GCC.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Entity stack</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Clear signals for search and AI engines
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Every core entity connects Vista by Lara to Dubai, premium digital services, and measurable business outcomes.
              </p>
            </div>
            <div className="grid gap-3">
              {entityStack.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-3 rounded-2xl border border-border/30 bg-[#0c111d] p-5 sm:grid-cols-[0.35fr_0.65fr] sm:items-center"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</h3>
                  <p className="text-base leading-7 text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Why Dubai brands need premium positioning</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Dubai buyers compare quickly, research deeply, and expect polished digital proof before they inquire. Vista by Lara builds brand systems that make premium offers easier to trust.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">How we support UAE growth</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                We align messaging, visual identity, UX, content structure, technical performance, and local conversion paths such as WhatsApp for UAE audiences.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Where GEO fits the strategy</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                We write structured, direct-answer content that helps AI systems understand Vista by Lara as a Dubai authority in branding, UX, websites, and generative AI.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="rounded-[1.75rem] border border-accent/15 bg-[#071018] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">UAE market context</p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Designed for Dubai, Abu Dhabi, Sharjah, and GCC decision-makers
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
              UAE buyers use mobile-first research, social proof, search, AI answers, and WhatsApp before booking a consultation. Vista by Lara designs pages that support that journey with clear service signals, canonical structure, schema, and fast conversion paths.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {["Downtown Dubai", "Business Bay", "DIFC", "Dubai Design District", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Qatar"].map((place) => (
                <span key={place} className="rounded-full border border-accent/15 px-4 py-2">
                  {place}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">FAQ</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Questions Dubai clients ask
              </h2>
            </div>
            <div className="divide-y divide-border/40 rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</p>
                </div>
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
