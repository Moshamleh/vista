import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, CheckCircle2, ExternalLink, FileText, Link2, MessageCircle } from "lucide-react"
import { AiToolCalculator } from "@/components/ai-tools/calculator-client"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { aiTools, getAiTool, getAiToolUrl, type AiToolSlug } from "@/lib/ai-tools/tools"
import { siteConfig } from "@/lib/site"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return aiTools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getAiTool(slug)
  if (!tool) return {}
  const url = getAiToolUrl(tool.slug)
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-AE": url,
        "ar-AE": `${siteConfig.url}/ar/ai-tools/${tool.slug}`,
      },
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

function schemaFor(tool: NonNullable<ReturnType<typeof getAiTool>>) {
  const url = getAiToolUrl(tool.slug)
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: `${siteConfig.url}/ai-tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: url },
    ],
  }
  const application = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: tool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    inLanguage: "en-AE",
    featureList: [
      "Live calculation",
      "Export PDF",
      "Export CSV",
      "Export Excel",
      "Print",
      "Share URL",
      "Copy Results",
      "Save Session",
      "History",
      "Dark Mode",
      "Keyboard accessible",
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: siteConfig.sameAs,
    },
  }
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.name}`,
    step: [
      { "@type": "HowToStep", name: "Enter inputs", text: "Add your UAE business inputs into the calculator fields." },
      { "@type": "HowToStep", name: "Review live results", text: "Read the live results, formula explanation, and AI recommendations." },
      { "@type": "HowToStep", name: "Export or share", text: "Export, print, copy, or share the result with your team." },
    ],
  }
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.name,
    url,
    dateModified: tool.updatedDate,
    author: {
      "@type": "Person",
      name: siteConfig.principal.name,
      jobTitle: siteConfig.principal.title,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".ai-summary", ".direct-answer"],
    },
  }
  return [breadcrumb, application, faq, howTo, webpage]
}

export default async function AiToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getAiTool(slug)
  if (!tool) notFound()

  const Icon = tool.icon
  const schemas = schemaFor(tool)

  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <SiteHeader />
      <main>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}

        <section className="relative overflow-hidden px-5 pb-12 pt-32 sm:px-8 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(250,204,21,0.18),transparent_30%),radial-gradient(circle_at_78%_10%,rgba(87,217,255,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/ai-tools" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <ArrowLeft className="h-4 w-4" />
              AI Tools
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                  {tool.category} / Dubai / UAE / GCC
                </p>
                <h1 className="mt-6 max-w-5xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
                  {tool.name} for Dubai and UAE Businesses
                </h1>
                <p className="direct-answer mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                  {tool.primaryQuestion} {tool.description} Built for Dubai, Abu Dhabi, Sharjah, and UAE teams that need fast calculations, clear formulas, and AI-readable business context.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#calculator" className="inline-flex min-h-12 items-center rounded-full bg-amber-300 px-6 font-semibold text-slate-950">
                    Use Calculator
                  </a>
                  <a href={siteConfig.whatsapp} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cyan-300/40 px-6 font-semibold text-cyan-100">
                    <MessageCircle className="h-4 w-4" />
                    Book AI Consultation
                  </a>
                </div>
              </div>
              <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur">
                <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-4 text-cyan-100">
                  <Icon className="h-8 w-8" />
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Version</dt><dd>{tool.version}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Updated</dt><dd>{tool.updatedDate}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Reading time</dt><dd>6 minutes</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Use time</dt><dd>{tool.estimatedTime}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Arabic keyword</dt><dd className="text-right">{tool.arabicKeyword}</dd></div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8" id="calculator">
          <AiToolCalculator slug={tool.slug} />
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]" id="how-it-works">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <div className="flex items-center gap-3 text-cyan-200">
              <BookOpen className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">How it works</p>
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold">Formula explanation</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{tool.formula}</p>
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-sm font-semibold text-amber-100">AI summary</p>
              <p className="ai-summary mt-2 text-sm leading-6 text-slate-200">{tool.aiSummary}</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <div className="flex items-center gap-3 text-amber-200">
              <FileText className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Examples</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {tool.examples.map((example) => (
                <article key={example.label} className="rounded-2xl border border-white/10 p-4">
                  <h3 className="font-semibold text-white">{example.label}</h3>
                  <p className="mt-1 text-sm font-semibold text-cyan-100">{example.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{example.explanation}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <h2 className="font-heading text-3xl font-semibold">Definitions and machine-readable answers</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Entity stack", `${siteConfig.name} -> ${tool.name} -> Dubai and UAE businesses -> AI-readable commercial planning.`],
              ["Decision tree", "If the forecast is profitable, validate tracking and scale carefully. If not, improve offer, page speed, targeting, and conversion handling before adding spend."],
              ["Context block", `${tool.name} connects UAE business calculation, official references, structured data, internal links, and WhatsApp consultation paths.`],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5">
                <h3 className="font-semibold text-amber-100">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <h2 className="font-heading text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tool.faq.map((item) => (
              <article key={item.q} className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5">
                <h3 className="font-semibold text-amber-100">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <h2 className="font-heading text-2xl font-semibold">Official references</h2>
            <div className="mt-5 grid gap-3">
              {tool.references.map((ref) => (
                <a key={ref.href} href={ref.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-100">
                  {ref.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <h2 className="font-heading text-2xl font-semibold">Related services</h2>
            <div className="mt-5 grid gap-3">
              {tool.relatedServices.map((service) => (
                <Link key={service.href} href={service.href} className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-100">
                  {service.label}
                  <Link2 className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <h2 className="font-heading text-2xl font-semibold">Related tools</h2>
            <div className="mt-5 grid gap-3">
              {tool.relatedTools.map((relatedSlug) => {
                const related = getAiTool(relatedSlug)
                if (!related) return null
                return (
                  <Link key={related.slug} href={`/ai-tools/${related.slug}`} className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-100">
                    {related.name}
                    <Link2 className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8">
          <div className="rounded-[1.5rem] border border-red-300/20 bg-red-300/10 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-red-100" />
              <div>
                <h2 className="font-heading text-2xl font-semibold">Legal disclaimer</h2>
                <p className="mt-2 text-sm leading-6 text-slate-200">{tool.legalDisclaimer}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
