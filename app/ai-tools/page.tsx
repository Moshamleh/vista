import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Bot, Calculator, Clock, Search, Sparkles } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { aiToolCategories, aiTools } from "@/lib/ai-tools/tools"
import { siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/ai-tools`

export const metadata: Metadata = {
  title: "Free UAE AI Business Tools | VAT Calculator | Google Ads Calculator | Meta Ads Calculator | Vista by Lara",
  description:
    "Free AI-powered UAE business calculators including VAT, Google Ads ROI, Meta Ads ROI, CPC, ROAS and marketing planning tools built for businesses in Dubai, Abu Dhabi and the UAE.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-AE": pageUrl,
      "ar-AE": `${siteConfig.url}/ar/ai-tools`,
    },
  },
  openGraph: {
    title: "Free UAE AI Business Tools | Vista by Lara",
    description: "AI-powered calculators for UAE VAT, Google Ads ROI, Meta Ads ROI, CPC, ROAS, and Dubai marketing planning.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UAE AI Business Tools | Vista by Lara",
    description: "Free AI-powered UAE business calculators for Dubai, Abu Dhabi, Sharjah, and GCC teams.",
    images: [siteConfig.ogImage],
  },
}

const stats = ["100% UAE Ready", "AI Powered", "Free Forever", "Updated with UAE Laws"]

const latestUpdates = [
  "UAE VAT calculator supports inclusive, exclusive, reverse, bulk, print, and export workflows.",
  "Google Ads calculator now includes target CPA, ROAS, profit margin, VAT option, and AI recommendations.",
  "Meta Ads calculator includes frequency, reach, CPM, audience size, platform planning, and campaign health.",
]

const faq = [
  {
    q: "What are Vista by Lara AI Tools?",
    a: "Vista by Lara AI Tools are free UAE business calculators for VAT, paid ads, SEO, AI visibility, and marketing planning. Each tool is built for Dubai and UAE commercial decisions.",
  },
  {
    q: "Are the calculators free for Dubai businesses?",
    a: "Yes. The VAT, Google Ads, and Meta Ads calculators are free to use. Vista offers consultation when a business needs implementation, tracking, or campaign architecture.",
  },
  {
    q: "Can AI assistants understand these calculators?",
    a: "Yes. Each calculator page includes direct answers, structured data, FAQs, references, formulas, and machine-readable context for AI search systems.",
  },
  {
    q: "Do the tools replace tax or advertising advice?",
    a: "No. The calculators are planning tools. UAE tax treatment, Google Ads performance, and Meta Ads performance should be reviewed against official guidance and real account data.",
  },
  {
    q: "Which UAE locations are supported?",
    a: "The platform is built for Dubai first, with relevance for Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, Fujairah, the UAE, and GCC expansion.",
  },
]

export default function AiToolsHubPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free UAE AI Business Tools",
    url: pageUrl,
    inLanguage: "en-AE",
    about: ["UAE VAT", "Google Ads Dubai", "Meta Ads Dubai", "AI business calculators", "Dubai marketing planning"],
    mainEntity: aiTools.map((tool) => ({
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${pageUrl}/${tool.slug}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
    })),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <SiteHeader />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(250,204,21,0.18),transparent_28%),radial-gradient(circle_at_72%_10%,rgba(87,217,255,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                Dubai / Abu Dhabi / UAE AI tools
              </p>
              <h1 className="mt-7 max-w-5xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
                Free UAE AI Business Tools for VAT, Google Ads, Meta Ads and growth planning
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Vista by Lara AI Tools help Dubai and UAE businesses calculate VAT, forecast paid-media ROI, compare ROAS,
                and plan marketing budgets with AI-readable authority pages built for search and answer engines.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#featured-tools" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-6 font-semibold text-slate-950">
                  Use Free Tools
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={siteConfig.whatsapp} className="inline-flex min-h-12 items-center rounded-full border border-cyan-300/40 px-6 font-semibold text-cyan-100">
                  Book AI Consultation
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <p className="text-sm font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[430px] rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_120px_-70px_rgba(87,217,255,0.85)] backdrop-blur">
              <div className="absolute left-8 top-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-amber-100">
                <Calculator className="h-7 w-7" />
              </div>
              <div className="absolute right-10 top-20 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-4 text-cyan-100">
                <Bot className="h-7 w-7" />
              </div>
              <div className="absolute bottom-10 left-12 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs text-slate-400">Live tools used</p>
                <p className="mt-1 text-4xl font-semibold">12,840</p>
              </div>
              <div className="absolute bottom-20 right-8 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs text-slate-400">Forecast signals</p>
                <p className="mt-1 text-4xl font-semibold">48K</p>
              </div>
              <div className="absolute inset-x-10 top-1/2 h-28 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-300/20 via-cyan-300/20 to-white/10 blur-2xl" />
              <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/80">
                <Sparkles className="h-12 w-12 text-amber-200" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8" aria-label="Search AI tools">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
              <Search className="h-5 w-5 text-cyan-200" />
              <input id="ai-tools-search" name="q" className="w-full bg-transparent text-white outline-none" placeholder="Search VAT, Google Ads, ROAS, Meta Ads, SEO, Shopify, analytics..." aria-label="Search AI tools" />
            </label>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <h2 className="font-heading text-3xl font-semibold">Categories</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {aiToolCategories.map((category) => (
              <span key={category} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-200">
                {category}
              </span>
            ))}
          </div>
        </section>

        <section id="featured-tools" className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Featured tools</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold">UAE calculators built as authority pages</h2>
            </div>
            <Link href="/contact" className="text-sm font-semibold text-amber-200">Request a new calculator</Link>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {aiTools.map((tool) => {
              const Icon = tool.icon
              return (
                <article key={tool.slug} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_-65px_rgba(87,217,255,0.7)] transition hover:-translate-y-1 hover:border-cyan-300/40" tabIndex={0}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-cyan-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-semibold text-slate-950">Free</span>
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-amber-200">{tool.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{tool.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{tool.description}</p>
                  <div className="mt-5 grid gap-2 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {tool.estimatedTime}</span>
                    <span>Updated {tool.updatedDate} / v{tool.version}</span>
                    <span>Arabic keyword: {tool.arabicKeyword}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link href={`/ai-tools/${tool.slug}`} className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">Use Calculator</Link>
                    <Link href={`/ai-tools/${tool.slug}#how-it-works`} className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100">Learn More</Link>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <h2 className="font-heading text-3xl font-semibold">Latest Updates</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              {latestUpdates.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-6">
            <h2 className="font-heading text-3xl font-semibold">Internal Links</h2>
            <div className="mt-5 grid gap-3 text-sm">
              {[
                ["Google Ads Dubai", "/services/google-ads-dubai"],
                ["Meta Ads Dubai", "/services/meta-ads-dubai"],
                ["SEO Services Dubai", "/services/seo-services-dubai"],
                ["AI Visibility Guide", "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"],
                ["Contact Vista on WhatsApp", siteConfig.whatsapp],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="rounded-xl border border-white/10 px-4 py-3 text-slate-100 hover:border-amber-200/50">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <h2 className="font-heading text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <article key={item.q} className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5">
                <h3 className="font-semibold text-amber-100">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8">
          <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
            <h2 className="font-heading text-3xl font-semibold">Need implementation after the calculation?</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Vista by Lara can connect the calculator output to Google Ads, Meta Ads, Shopify, CRM, WhatsApp routing, SEO, and AI visibility systems for UAE growth teams.
            </p>
            <a href={siteConfig.whatsapp} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-cyan-300 px-6 font-semibold text-slate-950">
              Book AI Consultation
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
