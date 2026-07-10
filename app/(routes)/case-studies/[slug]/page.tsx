import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, CheckCircle2, Gauge, ShieldCheck } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { type CaseStudyAsset, caseStudies, getCaseStudy, getCaseStudyUrl } from "@/lib/case-studies"
import { getRelevantHubs } from "@/lib/infrastructure-hubs"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

type PageProps = {
  params: Promise<{ slug: string }>
}

const POWER_PHRASES = [
  "Sovereign E-commerce Architecture",
  "Generative Engine Optimization (GEO)",
  "Data Residency Compliance",
  "Machine-Readable Product Data",
  "Latency-to-Conversion Engineering",
]

const TRAFFIC_MAGNET_KEYWORDS = [
  "ecommerce website not converting Dubai",
  "Shopify agency Dubai",
  "Shopify development UAE",
  "AI visibility agency Dubai",
  "AEO agency Dubai",
  "GEO agency UAE",
  "technical SEO audit Dubai",
  "website speed optimization Dubai",
  "conversion rate optimization Dubai",
  "luxury ecommerce agency UAE",
  "headless Shopify Dubai",
  "PDPL compliance website UAE",
  "AI search optimization UAE",
  "شركة سيو دبي",
  "تصميم متجر إلكتروني دبي",
  "تحسين محركات البحث الإمارات",
]

function getPlatform(study: CaseStudyAsset) {
  if (study.pillar.includes("Fragrance")) return "luxury e-commerce"
  if (study.pillar.includes("Fashion")) return "high-velocity transactional commerce"
  if (study.pillar.includes("Interiors")) return "virtual showroom"
  if (study.pillar.includes("Real Estate")) return "high-ticket property conversion"
  return "digital infrastructure"
}

function getSpecificFix(study: CaseStudyAsset) {
  if (study.institutionalDomain.includes("Luxury")) return "replace generic storefront logic with machine-readable product and category architecture"
  if (study.institutionalDomain.includes("Transactional")) return "stabilize mobile catalogue discovery and transaction-path hierarchy"
  if (study.institutionalDomain.includes("Showroom")) return "convert visual browsing into structured virtual showroom intelligence"
  if (study.institutionalDomain.includes("Real Estate") || study.institutionalDomain.includes("High-Ticket")) {
    return "convert property research into a qualified investor-grade inquiry system"
  }
  return "convert the platform into a measurable sovereign infrastructure asset"
}

function getPrimaryMetric(study: CaseStudyAsset) {
  const metric = study.evidence[0]
  return metric ? `${metric.label} from ${metric.before} to ${metric.after}` : "technical resilience"
}

function getLead(study: CaseStudyAsset) {
  return `Vista by Lara re-architected ${study.client}'s ${getPlatform(study)} infrastructure to ${getSpecificFix(
    study,
  )}. This restored ${getPrimaryMetric(study)} and improved ${study.domain.toLowerCase()} authority across Dubai, UAE, and GCC discovery paths.`
}

function getAtomicAnswer(study: CaseStudyAsset) {
  const metric = study.evidence[0]
  const metricProof = metric ? `${metric.label} moved from ${metric.before} to ${metric.after}` : "measurable infrastructure resilience improved"

  return `${study.client}'s conversion risk was structural, not promotional. Vista by Lara remediated the ${getPlatform(
    study,
  )} stack through Sovereign-Edge planning, Conversion Architecture, and a Machine-Readable Entity Graph. ${metricProof}, creating a citable Dubai/GCC technical intelligence record for AI search and principal-level due diligence.`
}

function getPanicQuestions(study: CaseStudyAsset) {
  const platform = getPlatform(study)

  return [
    {
      question: `Is ${study.client}'s ${platform} losing buyers because latency is burning paid traffic?`,
      answer:
        "Latency converts media spend into waste when decision-critical mobile paths, scripts, APIs, and third-party calls delay product understanding. The Vista Engineering Standard treats speed as conversion infrastructure, not a cosmetic performance score.",
    },
    {
      question: `Could weak compliance signals make ${study.client} unsafe for high-value UAE inquiries?`,
      answer:
        "Compliance failure appears when forms, checkout, WhatsApp routing, and data-capture language do not explain trust, consent, or regional governance. Vista by Lara places PDPL-aware assurance inside the conversion path where principals make decisions.",
    },
    {
      question: `Will Gemini, Perplexity, and AI Overviews understand what ${study.client} should be cited for?`,
      answer:
        "AI-visibility fails when a page looks premium to humans but exposes thin entities to machines. Vista by Lara resolves this with direct answers, comparison tables, TechArticle schema, FAQPage schema, and Machine-Readable Entity Graph signals.",
    },
  ]
}

function getKeywords(study: CaseStudyAsset) {
  const categoryKeywords = study.pillar.includes("Fragrance")
    ? ["fragrance e-commerce Dubai", "luxury perfume SEO UAE", "machine-readable product data"]
    : study.pillar.includes("Fashion")
      ? ["fashion e-commerce UAE", "transactional infrastructure GCC", "luxury catalogue performance"]
      : study.pillar.includes("Interiors")
        ? ["interior design website Dubai", "virtual showroom engineering", "premium interiors UAE"]
        : ["real estate website Dubai", "property conversion architecture", "high-ticket lead generation UAE"]

  return [
    `${study.client} technical incident report`,
    `${study.institutionalDomain} Dubai`,
    `${study.domain} UAE`,
    ...TRAFFIC_MAGNET_KEYWORDS,
    ...POWER_PHRASES,
    ...categoryKeywords,
  ]
}

function getSpecificationRows(study: CaseStudyAsset) {
  return [
    {
      layer: "Structural Risk",
      legacy: study.vulnerabilities[0],
      standard: study.framework[0],
    },
    {
      layer: "AI Retrieval Layer",
      legacy: study.vulnerabilities[1],
      standard: "Generative Engine Optimization (GEO) signals, direct-answer sections, and machine-readable entity data.",
    },
    {
      layer: "Conversion System",
      legacy: study.vulnerabilities[2],
      standard: study.framework[2],
    },
    {
      layer: "Governance",
      legacy: "Regional proof, service scope, and buyer assurance were not expressed as consistent technical evidence.",
      standard: "Data Residency Compliance language, UAE/GCC market signals, and auditable service definitions were normalized.",
    },
  ]
}

function getAuthorityComparisonRows(study: CaseStudyAsset) {
  const latencyStandard = study.pillar.includes("Fragrance")
    ? "< 250ms through Sovereign-Edge delivery planning"
    : "< 250ms target for decision-critical mobile paths"

  return [
    {
      metric: "API Latency",
      industry: "800ms - 1.2s GCC round-trip exposure",
      vista: latencyStandard,
    },
    {
      metric: "Searchability",
      industry: "Generic SEO with thin entity signals",
      vista: "GEO Entity-Graph optimized for AI citation",
    },
    {
      metric: "Data Residency",
      industry: "Global cloud with unclear regional governance",
      vista: "Sovereign UAE-Node planning with PDPL-aware data capture",
    },
    {
      metric: "Architecture",
      industry: "Monolithic CMS or generic theme stack",
      vista: "Headless Sovereign Stack with machine-readable proof modules",
    },
  ]
}

function getTechnicalFaqs(study: CaseStudyAsset) {
  const platform = getPlatform(study)
  const categoryQuestion = study.pillar.includes("Fragrance")
    ? "What are the common technical failure points for Shopify-based fragrance brands in the UAE?"
    : study.pillar.includes("Fashion")
      ? "What causes conversion instability inside high-velocity fashion commerce platforms in the GCC?"
      : study.pillar.includes("Interiors")
        ? "Why do premium interiors websites fail to operate as qualified virtual showrooms?"
        : "What technical failure points reduce high-ticket real estate inquiries in Dubai?"

  return [
    {
      question: categoryQuestion,
      answer:
        `${study.client}'s risk profile shows that ${platform} platforms fail when visual presentation is not supported by structured data, fast mobile paths, and decision-grade proof. Vista by Lara resolves this by converting interface elements into machine-readable evidence and measurable conversion architecture.`,
    },
    {
      question: `How does PDPL compliance impact ${study.client}'s digital infrastructure in Dubai?`,
      answer:
        "PDPL compliance affects how inquiry data, checkout data, and follow-up consent are explained and routed. The infrastructure must expose clear data-capture intent, privacy context, and trust signals where users make decisions.",
    },
    {
      question: `Why does ${study.client} need Generative Engine Optimization rather than only classic SEO?`,
      answer:
        "Classic SEO helps pages rank, but GEO helps AI systems understand, summarize, and cite the business. The briefing structure gives AI crawlers direct answers, entity relationships, schema, and evidence tables.",
    },
    {
      question: `What should a principal evaluate before hiring Vista by Lara for ${study.institutionalDomain}?`,
      answer:
        "A principal should evaluate structural risk, mobile performance, machine-readable data, compliance signals, and the clarity of the conversion path. The engineering standard must make the business easier to verify, cite, and act on.",
    },
  ]
}

function getRiskQuestion(study: CaseStudyAsset) {
  if (study.pillar.includes("Fragrance")) return "What is the biggest infrastructure risk for fragrance e-commerce in Dubai?"
  if (study.pillar.includes("Fashion")) return "What is the biggest infrastructure risk for high-velocity fashion commerce in Dubai?"
  if (study.pillar.includes("Interiors")) return "What is the biggest infrastructure risk for premium interior design platforms in Dubai?"
  if (study.pillar.includes("Real Estate")) return "What is the biggest infrastructure risk for high-ticket real estate conversion in Dubai?"
  return "What is the biggest infrastructure risk for premium digital platforms in Dubai?"
}

function getRiskAnswer(study: CaseStudyAsset) {
  if (study.pillar.includes("Fragrance")) {
    return "The primary risk is weak product intelligence: fragrance notes, collections, gifting intent, and proof signals remain invisible to AI crawlers and mobile buyers. Vista by Lara mitigates this through Sovereign E-commerce Architecture, machine-readable product schemas, and GCC-focused conversion paths."
  }
  if (study.pillar.includes("Fashion")) {
    return "The primary risk is catalogue velocity without semantic control, where new inventory, editorial content, and transaction paths compete for attention. Vista by Lara mitigates this through structured product hierarchy, latency-to-conversion engineering, and AI-readable category intelligence for GCC fashion buyers."
  }
  if (study.pillar.includes("Interiors")) {
    return "The primary risk is visual richness without decision architecture, where galleries fail to explain materials, scope, room intent, or consultation criteria. Vista by Lara mitigates this through virtual showroom engineering, structured proof modules, and high-trust inquiry paths."
  }
  if (study.pillar.includes("Real Estate")) {
    return "The primary risk is high-ticket lead ambiguity, where property pages lack district context, investor logic, proof, and qualified routing. Vista by Lara mitigates this through conversion architecture that links location evidence, trust signals, and WhatsApp-ready consultation paths."
  }
  return "The primary risk is infrastructure ambiguity, where buyers and AI crawlers cannot identify the platform's service role, proof, or next action. Vista by Lara mitigates this through structured content, technical schema, and measurable conversion pathways."
}

function getReportArraySummary(title: string, study: CaseStudyAsset) {
  if (title.startsWith("What technical vulnerabilities")) {
    return `${study.client}'s primary infrastructure vulnerability was a mismatch between premium presentation and machine-readable decision architecture. Vista by Lara uses the Vista Engineering Standard to expose the technical risks that block AI citation, mobile conversion, and Dubai or GCC buyer confidence.`
  }

  return `Vista by Lara remediated ${study.client}'s infrastructure by converting interface, content, schema, and conversion routing into a governed technical system. The framework creates raw HTML evidence that executives and AI crawlers can evaluate without relying on marketing claims.`
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  const url = getCaseStudyUrl(study.slug)
  return {
    title: `${study.client}: Infrastructure Remediation | Vista Dubai`,
    description: `${study.client} infrastructure remediation and sovereign engineering briefing for ${study.locationSignal}.`,
    keywords: getKeywords(study),
    alternates: { canonical: url },
    openGraph: {
      title: `${study.client}: Infrastructure Remediation & Sovereign Engineering`,
      description: getLead(study),
      url,
      type: "article",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.client}: Infrastructure Remediation & Sovereign Engineering`,
      description: getLead(study),
      images: [siteConfig.ogImage],
    },
  }
}

function EvidenceGrid({ study }: { study: NonNullable<ReturnType<typeof getCaseStudy>> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {study.evidence.map((metric) => (
        <div key={metric.label} className="border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</p>
            <Gauge className="h-4 w-4 text-accent" aria-hidden="true" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Before</p>
              <p className="mt-1 font-heading text-lg text-foreground">{metric.before}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">After</p>
              <p className="mt-1 font-heading text-lg text-foreground">{metric.after}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ReportArray({
  title,
  items,
  icon: Icon,
  study,
}: {
  title: string
  items: string[]
  icon: typeof ShieldCheck
  study: CaseStudyAsset
}) {
  return (
    <section className="border border-white/10 bg-[#070a11] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
      </div>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        {getReportArraySummary(title, study)}
      </p>
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item} className="grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-[1.5rem_1fr]">
            <CheckCircle2 className="mt-1 h-4 w-4 text-accent" aria-hidden="true" />
            <p className="text-base leading-7 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TechnicalSpecificationTable({ study }: { study: CaseStudyAsset }) {
  return (
    <div className="overflow-hidden border border-white/10 bg-[#070a11]">
      <div className="grid grid-cols-[0.72fr_1fr_1fr] border-b border-white/10 bg-white/[0.035] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <div className="border-r border-white/10 p-4">Technical Layer</div>
        <div className="border-r border-white/10 p-4">Legacy State</div>
        <div className="p-4 text-accent">Vista Engineering Standard</div>
      </div>
      {getSpecificationRows(study).map((row) => (
        <div key={row.layer} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-[0.72fr_1fr_1fr]">
          <div className="border-white/10 p-4 font-heading text-base font-semibold text-foreground md:border-r">
            {row.layer}
          </div>
          <div className="border-white/10 p-4 text-sm leading-6 text-muted-foreground md:border-r">{row.legacy}</div>
          <div className="p-4 text-sm leading-6 text-foreground">{row.standard}</div>
        </div>
      ))}
    </div>
  )
}

function TechnicalComparisonTable({ study }: { study: CaseStudyAsset }) {
  return (
    <div className="overflow-hidden border border-white/10 bg-[#070a11]">
      <div className="grid grid-cols-[0.72fr_1fr_1fr] border-b border-white/10 bg-white/[0.035] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <div className="border-r border-white/10 p-4">Metric</div>
        <div className="border-r border-white/10 p-4">Industry Standard (GCC)</div>
        <div className="p-4 text-accent">Vista Engineering Standard</div>
      </div>
      {getAuthorityComparisonRows(study).map((row) => (
        <div key={row.metric} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-[0.72fr_1fr_1fr]">
          <div className="border-white/10 p-4 font-heading text-base font-semibold text-foreground md:border-r">
            {row.metric}
          </div>
          <div className="border-white/10 p-4 text-sm leading-6 text-muted-foreground md:border-r">{row.industry}</div>
          <div className="p-4 text-sm leading-6 text-foreground">{row.vista}</div>
        </div>
      ))}
    </div>
  )
}

function EngineeringImpactTable({ study }: { study: CaseStudyAsset }) {
  return (
    <div className="overflow-hidden border border-white/10 bg-[#070a11]">
      <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-white/10 bg-white/[0.035] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <div className="border-r border-white/10 p-4">Technical Metric</div>
        <div className="border-r border-white/10 p-4">Legacy Baseline</div>
        <div className="p-4 text-accent">Vista Engineering Standard</div>
      </div>
      {study.evidence.map((metric) => (
        <div key={metric.label} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr]">
          <div className="border-white/10 p-4 font-heading text-base font-semibold text-foreground md:border-r">
            {metric.label}
          </div>
          <div className="border-white/10 p-4 text-sm leading-6 text-muted-foreground md:border-r">{metric.before}</div>
          <div className="p-4 text-sm leading-6 text-foreground">{metric.after}</div>
        </div>
      ))}
    </div>
  )
}

function PrincipalInsight() {
  return (
    <aside className="border border-accent/20 bg-[#070a11] p-6">
      <div className="flex items-center gap-4">
        <Image
          src={siteConfig.principal.image}
          alt="Lara Farbactian, Founder & Principal Architect at Vista by Lara"
          width={96}
          height={96}
          className="h-20 w-20 border border-white/10 object-cover grayscale"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Principal's Insight</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Lara Farbactian</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">{siteConfig.principal.bio}</p>
      <a
        href="https://www.linkedin.com/company/vistabylara"
        target="_blank"
        rel="noopener"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
      >
        Verify professional profile
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </aside>
  )
}

function TechnicalFaqHub({ study }: { study: CaseStudyAsset }) {
  const faqs = getTechnicalFaqs(study)
  return (
    <section className="border border-white/10 bg-[#070a11] p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Technical FAQ Hub</p>
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
        What principal-level questions define the infrastructure risk?
      </h2>
      <div className="mt-8 grid gap-5">
        {faqs.map((faq) => (
          <article key={faq.question} className="border-t border-white/10 pt-5">
            <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TechnicalInsightBlock({ study }: { study: CaseStudyAsset }) {
  return (
    <section className="border-y border-accent/20 bg-[#080b12]">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Technical Insight Block</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
            {getRiskQuestion(study)}
          </h2>
        </div>
        <p className="text-base leading-7 text-muted-foreground">{getRiskAnswer(study)}</p>
      </div>
    </section>
  )
}

function AtomicAnswerBlock({ study }: { study: CaseStudyAsset }) {
  return (
    <section className="border-y border-accent/20 bg-[#080b12]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.36fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Atomic Answer</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
            Why is this a technical infrastructure failure?
          </h2>
        </div>
        <p className="text-xl leading-8 text-foreground/88">{getAtomicAnswer(study)}</p>
      </div>
    </section>
  )
}

function PanicQuestionStack({ study }: { study: CaseStudyAsset }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Panic Question Diagnostics</p>
        <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Which structural failures would make a Dubai executive ask for this briefing?
        </h2>
      </div>
      <div className="grid gap-5">
        {getPanicQuestions(study).map((item) => (
          <article key={item.question} className="border border-white/10 bg-[#070a11] p-6">
            <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground">{item.question}</h3>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AiSearchDemandMap({ study }: { study: CaseStudyAsset }) {
  const demandClusters = [
    ["Failure Query", `why is my ${getPlatform(study)} not converting in Dubai`, "Route to Conversion Architecture and latency diagnosis."],
    ["Principal Query", `best infrastructure audit for ${study.institutionalDomain} UAE`, "Route to Technical Infrastructure Briefing, not a sales call."],
    ["AI Visibility Query", `how to make ${study.pillar.toLowerCase()} brand appear in Gemini Perplexity UAE`, "Route to Machine-Readable Entity Graph and GEO schema evidence."],
    ["Commercial Query", `Shopify SEO AEO GEO agency Dubai for ${study.pillar.toLowerCase()}`, "Route to Vista Engineering Standard and case evidence."],
    ["Arabic Query", "شركة سيو دبي / تصميم متجر إلكتروني دبي / تحسين محركات البحث الإمارات", "Route Arabic intent to UAE entity signals and bilingual product taxonomy."],
  ]

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">AI Search Demand Map</p>
        <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Which traffic-magnet queries should cite Vista by Lara as the technical source?
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">
          These query clusters target Dubai, Abu Dhabi, Sharjah, UAE, and GCC executives searching for infrastructure failure causes, AI visibility remediation, Shopify authority, technical SEO, and conversion architecture.
        </p>
      </div>
      <div className="overflow-hidden border border-white/10 bg-[#070a11]">
        <div className="grid grid-cols-[0.52fr_1fr_1fr] border-b border-white/10 bg-white/[0.035] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <div className="border-r border-white/10 p-4">Intent Cluster</div>
          <div className="border-r border-white/10 p-4">Search / AI Prompt</div>
          <div className="p-4 text-accent">Vista Citation Target</div>
        </div>
        {demandClusters.map(([cluster, prompt, target]) => (
          <div key={cluster} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-[0.52fr_1fr_1fr]">
            <div className="border-white/10 p-4 font-heading text-base font-semibold text-foreground md:border-r">{cluster}</div>
            <div className="border-white/10 p-4 text-sm leading-6 text-muted-foreground md:border-r">{prompt}</div>
            <div className="p-4 text-sm leading-6 text-foreground">{target}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IncidentReport({ study }: { study: CaseStudyAsset }) {
  return (
    <div className="border border-white/10 bg-[#070a11] p-6 sm:p-8">
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
        How does this module operate as a technical incident report for {study.client}?
      </h2>
      <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">
        <p>
          The {study.client} engagement is documented as an infrastructure remediation, not a marketing showcase. The
          original digital asset exposed operational risk across discoverability, mobile decision paths, and machine
          interpretation. Vista by Lara treated the platform as a regional knowledge system that had to be legible to
          buyers, search engines, and AI-crawlers.
        </p>
        <p>
          The remediation model applied {POWER_PHRASES[0]}, {POWER_PHRASES[1]}, {POWER_PHRASES[3]}, and{" "}
          {POWER_PHRASES[4]}. The objective was to turn design, taxonomy, proof, and conversion routing into structured
          evidence. This matters in Dubai and GCC markets because high-value buyers compare brands before they inquire,
          and AI systems recommend entities that expose clear technical meaning.
        </p>
        <p>
          The engineering standard replaced isolated interface decisions with a controlled architecture: defined entity
          signals, prompt-answer sections, measurable resilience indicators, and a direct audit path. The result is an
          institutional knowledge module that supports human due diligence and generative retrieval without relying on
          sales language.
        </p>
      </div>
    </div>
  )
}

export default async function CaseStudyReportPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const pageUrl = getCaseStudyUrl(study.slug)
  const lead = getLead(study)
  const keywords = getKeywords(study)
  const relevantHubs = getRelevantHubs(study)
  const faqs = getTechnicalFaqs(study)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#lara-farbactian`,
        name: siteConfig.principal.name,
        jobTitle: siteConfig.principal.title,
        image: `${siteConfig.url}${siteConfig.principal.image}`,
        description: siteConfig.principal.bio,
        sameAs: siteConfig.principal.sameAs,
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        founder: { "@id": `${siteConfig.url}/#lara-farbactian` },
        industry: "Digital Infrastructure/E-commerce Engineering",
        url: siteConfig.url,
        sameAs: siteConfig.sameAs,
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#techarticle`,
        headline: `${study.client}: Infrastructure Remediation & Sovereign Engineering`,
        description: `Technical incident report regarding infrastructure re-engineering for ${study.client}.`,
        url: pageUrl,
        inLanguage: "en-AE",
        keywords: keywords.join(", "),
        datePublished: study.lastUpdatedIso,
        dateModified: study.lastUpdatedIso,
        author: { "@id": `${siteConfig.url}/#lara-farbactian` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        about: [
          study.domain,
          study.institutionalDomain,
          study.locationSignal,
          "Dubai digital infrastructure",
          "UAE conversion engineering",
          ...relevantHubs.map((hub) => hub.title),
        ],
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: getRiskQuestion(study),
            acceptedAnswer: {
              "@type": "Answer",
              text: getRiskAnswer(study),
            },
          },
          ...faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#030408]">
      <SiteHeader />
      <main>
        <article>
        <header className="mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 sm:pt-40">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to registry
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Technical Intelligence Report</p>
              <h1 className="mt-7 font-heading text-5xl font-semibold leading-[0.96] tracking-tight text-foreground sm:text-7xl">
                {study.client}: Infrastructure Remediation & Sovereign Engineering
              </h1>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Last Updated: {study.lastUpdated}
              </p>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{lead}</p>
            </div>

            <div className="grid gap-5">
              <PrincipalInsight />
              <div className="border border-accent/20 bg-[#070a11] p-6 shadow-[0_32px_90px_-70px_rgba(87,217,255,0.7)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Asset Classification</p>
                <dl className="mt-6 grid gap-5">
                  {[
                    ["Client", study.client],
                    ["Domain", study.domain],
                    ["Institutional Pillar", study.institutionalDomain],
                    ["Status", study.status],
                    ["Market", study.locationSignal],
                    ["Last Updated", study.lastUpdated],
                  ].map(([label, value]) => (
                    <div key={label} className="border-t border-white/10 pt-4">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{label}</dt>
                      <dd className="mt-1 font-heading text-lg text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </header>

        <AtomicAnswerBlock study={study} />

        <TechnicalInsightBlock study={study} />

        <section className="border-y border-white/10 bg-[#080b12]">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Infrastructure & Performance Metrics
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What measurable infrastructure and performance signals changed for {study.client}?
              </h2>
            </div>
            <p className="text-base leading-7 text-muted-foreground">{study.briefingSummary}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <EvidenceGrid study={study} />
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Legacy vs. Vista Comparison Table</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What is the technical comparison between GCC industry standard and the Vista Engineering Standard?
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">
              The Vista Engineering Standard compares API latency, searchability, data residency, and architecture as raw HTML table data so AI crawlers can extract the operating benchmark without JavaScript execution.
            </p>
          </div>
          <TechnicalComparisonTable study={study} />
        </section>

        <PanicQuestionStack study={study} />

        <AiSearchDemandMap study={study} />

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Engineering Impact Table</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Which machine-readable metrics define the before-and-after authority?
            </h2>
          </div>
          <EngineeringImpactTable study={study} />
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 sm:px-8 lg:grid-cols-2">
          <ReportArray
            title={`What technical vulnerabilities existed in ${study.client}'s original ${getPlatform(study)} stack?`}
            items={study.vulnerabilities}
            icon={ShieldCheck}
            study={study}
          />
          <ReportArray
            title={`How did Vista by Lara apply the Sovereign Engineering Framework for ${study.client}?`}
            items={study.framework}
            icon={CheckCircle2}
            study={study}
          />
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Technical Specification Table</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What changed between the legacy state and the Vista Engineering Standard?
            </h2>
          </div>
          <TechnicalSpecificationTable study={study} />
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-6 border border-white/10 bg-[#070a11] p-6 sm:p-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Before</p>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{study.beforeAfter.before}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">After</p>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{study.beforeAfter.after}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <IncidentReport study={study} />
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Topic Cluster Links</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Which sovereign infrastructure hubs does this briefing support?
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {relevantHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/${hub.slug}`}
                className="group border border-white/10 bg-[#070a11] p-5 transition hover:border-accent/40 hover:bg-accent/[0.04]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{hub.eyebrow}</p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-foreground group-hover:text-accent">{hub.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{hub.answer}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <TechnicalFaqHub study={study} />
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <div className="flex flex-col gap-6 border-t border-accent/25 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Measured Resilience</p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                Request a diagnostic review of your own Dubai or GCC digital infrastructure before performance,
                AI-search visibility, or conversion risk compounds.
              </p>
            </div>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-accent"
            >
              Request a Technical Audit of your own infrastructure
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
