import type { Metadata } from "next"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  Check,
  Compass,
  Crown,
  Layers3,
  MessageCircle,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { jsonLd } from "@/lib/json-ld"
import { getWhatsappLink, siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/services/branding`
const whatsappHref = getWhatsappLink("branding")

const keywordClusters = [
  "branding agency Dubai",
  "brand identity design Dubai",
  "luxury branding UAE",
  "corporate branding Dubai",
  "brand strategy UAE",
  "visual identity GCC",
  "شركة براندنج دبي",
  "تصميم هوية بصرية الإمارات",
]

const marqueeKeywords = ["Brand Strategy", "Visual Identity", "AEO", "GEO", "SEO", "Dubai Launch", "GCC Growth"]

const stats = [
  { value: "UAE", suffix: "-first", label: "Positioning for Dubai, Abu Dhabi, Sharjah, and GCC buyer intent" },
  { value: "4", suffix: "-8 weeks", label: "Typical identity timeline for focused premium brand systems" },
  { value: "AI", suffix: "-ready", label: "Structured brand signals for Google, ChatGPT, Perplexity, and Gemini" },
  { value: "AED", suffix: "", label: "Premium project planning aligned with UAE commercial expectations" },
]

const workCards = [
  {
    image: "/images/services/branding-strategy-dubai.png",
    title: "Dubai Brand Strategy",
    meta: "Positioning - UAE buyer intent - 2026",
    tag: "Strategy",
    alt: "Luxury Dubai brand strategy workspace with visual identity boards and skyline view",
  },
  {
    image: "/images/services/branding-launch-system.png",
    title: "Luxury Identity System",
    meta: "Logo systems - Guidelines - Launch assets",
    tag: "Identity",
    alt: "Premium UAE visual identity system with digital, packaging, and launch assets",
  },
  {
    image: "/images/services/branding-ai-visibility.png",
    title: "AI Visibility Engine",
    meta: "AEO - GEO - Search authority",
    tag: "AI Search",
    alt: "AI visibility and connected lead generation platform for Dubai and GCC brands",
  },
  {
    image: "/images/services/branding-identity-system.png",
    title: "Sales-Ready Brand Assets",
    meta: "Website - Social - Pitch decks",
    tag: "Launch",
    alt: "Premium visual identity system with brand guideline assets for UAE luxury branding",
  },
]

const serviceRows = [
  {
    index: "01",
    title: "Brand Strategy",
    tags: ["Positioning", "Dubai competitors", "GCC audience"],
    body: "We define category position, audience intent, brand promise, and competitive contrast for Dubai and GCC markets.",
  },
  {
    index: "02",
    title: "Visual Identity",
    tags: ["Logo systems", "Typography", "Guidelines"],
    body: "We design logo systems, color, typography, imagery direction, and digital assets built for premium UAE brands.",
  },
  {
    index: "03",
    title: "AEO, GEO and SEO",
    tags: ["Schema", "FAQs", "AI recommendations"],
    body: "We structure entity-rich copy, answer blocks, and service definitions so AI systems can classify and recommend the brand.",
  },
  {
    index: "04",
    title: "Launch Conversion",
    tags: ["WhatsApp", "Website", "Lead paths"],
    body: "We connect brand assets to website sections, social campaigns, and WhatsApp-ready conversion paths for UAE inquiries.",
  },
]

const trustSignals = [
  "Dubai buyers compare premium brands on mobile before they contact a team.",
  "WhatsApp is a primary conversion channel for UAE service and luxury decisions.",
  "AI answer engines cite brands with clear entities, FAQs, service definitions, and consistent authority signals.",
  "GCC expansion needs a brand system that can stretch across English, Arabic, investor, retail, and B2B contexts.",
]

const process = [
  {
    step: "01",
    title: "Discover",
    body: "Audit the current brand, Dubai competitors, search demand, audience objections, and category proof signals.",
  },
  {
    step: "02",
    title: "Define",
    body: "Clarify positioning, offer hierarchy, voice, visual territory, and the brand entity stack for SEO and AI search.",
  },
  {
    step: "03",
    title: "Design",
    body: "Create identity routes, refine the strongest system, and build assets for web, social, sales, and campaigns.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Package guidelines, rollout content, schema recommendations, and conversion CTAs for UAE and GCC visibility.",
  },
]

const awards = [
  { icon: Award, label: "Noble Business Winner 2025", active: true },
  { icon: Trophy, label: "Top 3 Agency by AI Mode" },
  { icon: Star, label: "5.0 GCC Leader" },
]

const audienceCells = [
  "Dubai Founders",
  "Luxury Retail",
  "Hospitality",
  "Real Estate",
  "DIFC Teams",
  "Business Bay",
  "Abu Dhabi",
  "Sharjah",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "+ GCC",
]

const faqs = [
  {
    question: "What does a branding agency in Dubai do?",
    answer:
      "A branding agency in Dubai defines positioning, identity, messaging, and visual systems for UAE businesses. Vista by Lara builds premium brand systems that support trust, recognition, search visibility, and conversion.",
  },
  {
    question: "How much does brand identity design cost in Dubai?",
    answer:
      "Brand identity pricing in Dubai depends on strategy depth, naming, logo systems, guidelines, and launch assets. Vista by Lara scopes premium branding projects in AED after reviewing business goals, timeline, and market complexity.",
  },
  {
    question: "How long does a UAE branding project take?",
    answer:
      "Most focused UAE brand identity projects take 4 to 8 weeks. Larger rebrands, GCC launches, bilingual systems, or multi-brand architecture can require a longer rollout plan.",
  },
  {
    question: "Can Vista by Lara rebrand an existing Dubai business?",
    answer:
      "Yes. Vista by Lara audits existing equity, customer perception, competitor positioning, and UAE category signals before redesigning the brand system around clearer market authority.",
  },
  {
    question: "How does branding improve SEO, AEO, and GEO?",
    answer:
      "Branding improves SEO, AEO, and GEO by clarifying the entity, service category, audience, location, proof, and outcomes. AI systems are more likely to recommend brands with structured content and consistent authority signals.",
  },
  {
    question: "What Arabic keywords support branding in Dubai?",
    answer:
      "Useful Arabic keywords include شركة براندنج دبي, تصميم هوية بصرية الإمارات, and تصميم شعار دبي. Vista by Lara can structure English pages with Arabic keyword context when the audience requires it.",
  },
]

export const metadata: Metadata = {
  title: "Brand Identity Design Dubai | Branding Agency UAE",
  description:
    "Luxury brand identity design in Dubai for UAE and GCC businesses. Build strategy, visuals, messaging, AEO, GEO, and WhatsApp-ready conversion.",
  keywords: keywordClusters,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Brand Identity Design Dubai | Vista by Lara",
    description:
      "Premium brand strategy, visual identity, messaging, SEO, AEO, and GEO systems for Dubai, UAE, and GCC brands.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: ["https://www.vistabylara.com/og/branding.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Identity Design Dubai | Vista by Lara",
    description: "Luxury brand identity design and AI-ready positioning for UAE and GCC businesses.",
    images: ["https://www.vistabylara.com/og/branding.jpg"],
  },
}

export default function BrandingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: "AED",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
        sameAs: siteConfig.sameAs,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Brand Identity Design Dubai",
        serviceType: "Luxury branding, brand strategy, visual identity, AEO, GEO, and brand messaging",
        url: pageUrl,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
        audience: {
          "@type": "Audience",
          audienceType: "Premium UAE businesses, GCC founders, luxury service brands, hospitality groups, retail brands, and B2B teams",
        },
        description:
          "Vista by Lara designs premium brand identity systems for Dubai and UAE businesses that need positioning, visual identity, messaging, guidelines, SEO, AEO, GEO, and conversion-ready launch assets.",
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
          { "@type": "ListItem", position: 3, name: "Branding", item: pageUrl },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="branding-noir-page overflow-x-hidden">
        <section className="branding-award-grain relative overflow-hidden border-b border-white/10 pt-32 sm:pt-40">
          <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-16 md:px-8">
            <div className="flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-foreground/55">
              <span className="h-px w-8 bg-accent" />
              <span>Dubai branding agency - UAE and GCC growth</span>
            </div>

            <h1 className="branding-display mt-7 max-w-[13ch] text-[clamp(3.3rem,14vw,12.8rem)] text-foreground">
              We build bold <span className="branding-script text-accent">brands</span> in Dubai<span className="text-accent">.</span>
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:grid-cols-12 md:items-end">
              <p className="font-heading text-[19px] font-medium leading-snug text-foreground/82 md:col-span-7 md:text-[22px]">
                Vista by Lara creates luxury brand identity systems for Dubai and UAE businesses that need clear positioning, premium visuals, AI-ready authority, and WhatsApp-ready conversion.
              </p>
              <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
                <a href="#work" className="branding-pill inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14px] font-bold uppercase tracking-wide text-background">
                  View brand systems <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="branding-pill inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-foreground hover:border-accent hover:text-accent"
                >
                  WhatsApp strategy call
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 overflow-hidden border-y border-white/10 bg-[#080b12] py-4">
            <div className="branding-marquee flex w-max items-center gap-10 whitespace-nowrap">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10 text-[15px] font-bold uppercase tracking-wide text-foreground/70">
                  {marqueeKeywords.map((keyword) => (
                    <span key={`${copy}-${keyword}`} className="inline-flex items-center gap-10">
                      <span>{keyword}</span>
                      <span className="text-accent">*</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:px-8">
            <div className="md:col-span-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(Studio / 01)</p>
              <p className="mt-5 text-sm leading-7 text-foreground/55">
                A focused senior team for brand strategy, identity, SEO, AEO, GEO, and premium digital launch systems.
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-heading text-[clamp(1.8rem,4.6vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
                We design Dubai brand systems with <span className="text-foreground/35">market precision</span> and <span className="text-accent">AI-search authority</span>, so UAE buyers understand the value before they inquire.
              </h2>
              <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.value}>
                    <p className="branding-display text-[clamp(2.5rem,5vw,4rem)] text-accent">
                      {stat.value}
                      <span className="text-foreground">{stat.suffix}</span>
                    </p>
                    <p className="mt-3 text-[13px] uppercase tracking-wide text-foreground/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="relative pb-24 md:pb-32">
          <div className="mx-auto max-w-[1320px] px-5 md:px-8">
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(Brand systems / 02)</p>
                <h2 className="branding-display mt-4 text-[clamp(2.8rem,8vw,6.5rem)] text-foreground">
                  Recent <span className="text-foreground/30">signals</span>
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-7 text-foreground/55">
                Strategy, identity, launch assets, and AI-readable authority packaged for premium brands in Dubai, Abu Dhabi, Sharjah, and GCC markets.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {workCards.map((card) => (
                <a key={card.title} href={whatsappHref} target="_blank" rel="noopener" className="branding-work-card group relative block overflow-hidden rounded-2xl bg-[#111520]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="branding-card-img object-cover" />
                    <div className="branding-card-meta absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/20 to-transparent p-6 opacity-0">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">{card.title}</h3>
                          <p className="mt-2 text-sm uppercase tracking-wide text-foreground/65">{card.meta}</p>
                        </div>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-background">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-6 py-5">
                    <h3 className="font-heading text-xl font-extrabold tracking-tight text-foreground">{card.title}</h3>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-wide text-foreground/55">{card.tag}</span>
                  </div>
                </a>
              ))}

              <div className="branding-work-card group relative overflow-hidden rounded-2xl bg-[#111520] md:col-span-2">
                <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/8]">
                  <Image
                    src="/videos/services/branding-reel.webp"
                    alt="Animated brand launch reel for Dubai branding systems"
                    fill
                    unoptimized
                    sizes="100vw"
                    className="branding-card-img object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/28 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">Motion reel</p>
                    <h3 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
                      Strategy, identity, and AI visibility in one launch story.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative border-t border-white/10 py-24 md:py-32">
          <div className="mx-auto max-w-[1320px] px-5 md:px-8">
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(Services / 03)</p>
                <h2 className="branding-display mt-4 text-[clamp(2.8rem,8vw,6.5rem)] text-foreground">
                  What we <span className="text-foreground/30">build</span>
                </h2>
              </div>
              <p className="text-[15px] leading-7 text-foreground/55 md:col-span-4">
                Each row is built to connect brand clarity with search visibility, AI recommendations, and real UAE lead generation.
              </p>
            </div>

            <div className="border-t border-white/10">
              {serviceRows.map((row) => (
                <article key={row.index} className="branding-svc-row group grid grid-cols-12 items-center gap-4 border-b border-white/10 px-2 py-7 md:px-6 md:py-9">
                  <p className="branding-svc-num col-span-2 text-[14px] font-bold text-foreground/35 md:col-span-1">{row.index}</p>
                  <div className="col-span-10 md:col-span-5">
                    <h3 className="font-heading text-[clamp(1.6rem,3.4vw,2.8rem)] font-extrabold tracking-tight">{row.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 opacity-70 md:hidden">{row.body}</p>
                  </div>
                  <div className="branding-svc-tags col-span-12 flex flex-wrap gap-2 md:col-span-5">
                    {row.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/20 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-foreground/62">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="branding-svc-arrow hidden justify-end text-foreground/45 md:col-span-1 md:flex">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10 py-20 md:py-28">
          <div className="mx-auto max-w-[1320px] px-5 md:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(Trusted by / 04)</p>
                <h2 className="mt-4 font-heading text-[clamp(1.8rem,3.8vw,3rem)] font-extrabold tracking-tight text-foreground">
                  Built for brands and markets that reward clarity.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {awards.map((award) => {
                  const Icon = award.icon
                  return (
                    <span
                      key={award.label}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-wide ${
                        award.active ? "border-accent/50 text-accent" : "border-white/15 text-foreground/60"
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {award.label}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4 lg:grid-cols-6">
              {audienceCells.map((cell) => (
                <div key={cell} className="flex min-h-28 items-center justify-center bg-background px-4 py-8 text-center font-heading text-xl font-extrabold tracking-tight text-foreground/55">
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:px-8">
            <div className="md:col-span-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(UAE market / 05)</p>
              <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Why Dubai brands need structured identity.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:col-span-8">
              {trustSignals.map((signal) => (
                <div key={signal} className="flex gap-4 bg-[#080b12] p-6">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-base leading-7 text-foreground/72">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:px-8">
            <div className="md:col-span-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(Process / 06)</p>
              <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                From market signal to launch-ready brand.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:col-span-8 md:grid-cols-2">
              {process.map((item) => (
                <article key={item.step} className="bg-background p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-accent">{item.step}</p>
                  <h3 className="mt-4 font-heading text-xl font-extrabold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative border-t border-white/10 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:px-8">
            <div className="md:col-span-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(FAQ / 07)</p>
              <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Questions Dubai clients ask before branding.
              </h2>
              <div className="mt-7 flex flex-wrap gap-2">
                {keywordClusters.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-accent/20 bg-accent/[0.04] px-4 py-2 text-sm text-foreground/68">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#080b12] md:col-span-8">
              {faqs.map((faq) => (
                <article key={faq.question} className="p-6">
                  <h3 className="font-heading text-xl font-extrabold text-foreground">{faq.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="branding-award-grain relative overflow-hidden border-t border-white/10 py-28 text-center md:py-40">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent">(Let's build / 08)</p>
            <h2 className="branding-display mx-auto mt-6 max-w-[13ch] text-[clamp(3rem,12vw,10rem)] text-foreground">
              Got a brand to <span className="text-accent">launch?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-[17px] leading-8 text-foreground/65">
              Tell us where you want to be in Dubai, UAE, or the GCC. We will map the brand strategy, identity, SEO, AEO, GEO, and conversion path to get you there.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noopener" className="branding-pill inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-bold uppercase tracking-wide text-background">
                WhatsApp branding consultation <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="branding-pill inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-[15px] font-semibold uppercase tracking-wide text-foreground hover:border-accent hover:text-accent">
                Book a Dubai brand audit <Calendar className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
