import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, Clock, Download, Share2 } from "lucide-react"
import type { ReactNode } from "react"
import type { DownloadAsset, FAQItem, KnowledgeArticlePackage, RelatedArticle } from "@/lib/knowledge/types"
import { siteConfig } from "@/lib/site"
import { ReadingProgress } from "./reading-progress"
export { ActiveTableOfContents, AIVisibilityCalculator, ExpandableDecisionTree, FAQAccordion, InteractiveChecklist } from "./interactive"

type SectionProps = {
  title?: string
  eyebrow?: string
  children: ReactNode
}

export { ReadingProgress }

export function KnowledgeHero({ article }: { article: KnowledgeArticlePackage }) {
  return (
    <header className="relative overflow-hidden border border-accent/15 bg-[#07111a] p-6 sm:p-8 lg:p-10">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-accent/10 bg-[linear-gradient(#57d9ff12_1px,transparent_1px),linear-gradient(90deg,#57d9ff12_1px,transparent_1px)] bg-[size:32px_32px] lg:block" aria-hidden="true">
        <svg className="h-full w-full opacity-70" viewBox="0 0 420 520" role="presentation">
          <g fill="none" stroke="rgba(87,217,255,0.35)" strokeWidth="1">
            <path d="M72 108 184 74 312 132 246 248 118 288 72 108" />
            <path d="M184 74 246 248 348 344 206 424 118 288" />
            <path d="M312 132 348 344 246 248" />
          </g>
          {[["72", "108"], ["184", "74"], ["312", "132"], ["246", "248"], ["118", "288"], ["348", "344"], ["206", "424"]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#57d9ff" className="animate-pulse" />
          ))}
        </svg>
      </div>
      <div className="relative grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
        <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Vista AI Knowledge Platform</p>
        <h1 className="mt-5 max-w-5xl font-heading text-5xl font-medium leading-tight text-foreground sm:text-7xl">
          {article.meta.title}
        </h1>
        <p className="mt-5 max-w-4xl text-2xl leading-tight text-foreground/80">{article.meta.subtitle}</p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{article.meta.excerpt}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={siteConfig.whatsapp} className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 text-sm font-semibold text-background">
            Free AI Visibility Assessment
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-accent/25 px-5 py-3 text-sm font-semibold text-accent">
            Book Strategy Session
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="border border-accent/15 bg-[#0d111f] p-5">
        <dl className="grid gap-4 text-sm">
          <MetaItem label="Author" value={article.meta.author} />
          <MetaItem label="Category" value={article.meta.pillar.replaceAll("-", " ")} />
          <MetaItem label="Difficulty" value={article.meta.difficulty} />
          <div>
            <dt className="text-muted-foreground">Reading time</dt>
            <dd className="mt-1 inline-flex items-center gap-2 font-medium text-foreground">
              <Clock className="h-4 w-4 text-accent" />
              {article.meta.readingTime}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Last updated</dt>
            <dd className="mt-1 inline-flex items-center gap-2 font-medium text-foreground">
              <CalendarDays className="h-4 w-4 text-accent" />
              {new Date(article.meta.updatedAt).toLocaleDateString("en-AE")}
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-accent/10 pt-5">
          <ShareToolbar url={article.meta.canonical} title={article.meta.title} />
        </div>
      </div>
      </div>
    </header>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium capitalize text-foreground">{value}</dd>
    </div>
  )
}

export function StickyTableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  return (
    <nav className="border border-accent/15 bg-[#0d111f] p-5 lg:sticky lg:top-28" aria-label="Knowledge article table of contents">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Article map</p>
      <ol className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link href={`#${heading.id}`} className="transition-colors hover:text-accent">
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ExecutiveSummary({ children }: SectionProps) {
  return (
    <Panel eyebrow="Executive summary" title="What you will learn">
      <div className="space-y-4">
        <div>{children}</div>
        <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
          <li>- Why AI recommendations affect discovery before a buyer clicks.</li>
          <li>- Who should use this guide: founders, principals, marketers, and operators.</li>
          <li>- Expected outcome: a practical model for improving AI recommendation readiness.</li>
        </ul>
      </div>
    </Panel>
  )
}

export function AISummary({ children }: SectionProps) {
  return <Panel eyebrow="AI summary">{children}</Panel>
}

export function VistaFramework({ title, children }: SectionProps) {
  return (
    <Panel eyebrow="Vista by Lara methodology" title={title}>
      {children}
    </Panel>
  )
}

export function VistaRecommendationConfidenceModel() {
  const layers = [
    ["Entity Clarity", "Can AI systems identify the business, category, location, audience, and offer without ambiguity?"],
    ["Technical Foundation", "Can crawlers access stable pages, metadata, schema, canonical URLs, performance signals, and structured content?"],
    ["Digital Trust", "Can the brand prove legitimacy through reviews, policies, author data, contact routes, and consistent business profiles?"],
    ["Authority", "Does the site publish deep, useful, original resources that answer buyer questions and support service claims?"],
    ["Knowledge Graph", "Are services, entities, locations, proof nodes, and related resources connected across the site?"],
    ["Recommendation Confidence", "Can AI systems describe the business accurately enough to recommend it for a relevant Dubai or UAE query?"],
  ]

  return (
    <section id="vista-framework" className="border border-accent/20 bg-[#07111a] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Vista Framework(TM)</p>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-foreground">Vista Recommendation Confidence Model(TM)</h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        This Vista by Lara methodology explains factors affecting how confidently AI systems can identify and describe businesses. It is an educational model, not an official AI ranking algorithm.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {layers.map(([title, description], index) => (
          <div key={title} className="border border-accent/10 bg-[#0d111f] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Layer {index + 1}</p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ReadingInformation({ article }: { article: KnowledgeArticlePackage }) {
  const items = [
    ["Difficulty", article.meta.difficulty],
    ["Estimated reading time", article.meta.readingTime],
    ["Audience", article.meta.audience],
    ["Updated date", new Date(article.meta.updatedAt).toLocaleDateString("en-AE")],
    ["Topic", article.entities.primaryEntity.name],
    ["Pillar", article.meta.pillar.replaceAll("-", " ")],
  ]

  return (
    <section className="grid gap-4 border border-accent/15 bg-[#0d111f] p-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Reading information">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
        </div>
      ))}
    </section>
  )
}

export function DiagramGallery() {
  const diagrams = [
    "Recommendation Confidence Model",
    "Entity Relationships",
    "Knowledge Graph",
    "Authority Pyramid",
    "Decision Tree",
    "Internal Linking Graph",
  ]

  return (
    <section id="diagrams" className="scroll-mt-28 border border-accent/15 bg-[#07111a] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Diagram system</p>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-foreground">AI Visibility Diagrams</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {diagrams.map((diagram) => (
          <div key={diagram} className="min-h-44 border border-accent/10 bg-[#0d111f] p-4">
            <div className="flex h-24 items-center justify-center border border-dashed border-accent/20 bg-[#07111a] text-center text-sm text-accent">
              {diagram}
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Visual module for explaining {diagram.toLowerCase()} within the AI visibility handbook.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function VistaWarning({ title, children }: SectionProps) {
  return (
    <aside className="border border-amber-300/30 bg-amber-300/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Vista warning</p>
      {title && <h2 className="mt-4 font-heading text-2xl font-medium leading-tight text-foreground">{title}</h2>}
      <div className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  )
}

export function VistaInsight({ title, children }: SectionProps) {
  return (
    <Panel eyebrow="Vista insight" title={title}>
      {children}
    </Panel>
  )
}

export function VistaExpertRecommendation({ title, children }: SectionProps) {
  return (
    <Panel eyebrow="Expert recommendation" title={title}>
      {children}
    </Panel>
  )
}

export function VistaCommonMistake({ mistake, correction }: { mistake: string; correction: string }) {
  return (
    <section className="grid gap-4 border border-accent/15 bg-[#0a0a0a] p-5 sm:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Common mistake</p>
        <p className="mt-4 text-lg leading-relaxed text-foreground">{mistake}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Correction</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{correction}</p>
      </div>
    </section>
  )
}

export function ComparisonTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-accent/15">
      <table className="w-full min-w-[720px] border-collapse text-left text-base">
        <thead className="bg-[#07111a] text-xs uppercase tracking-[0.16em] text-accent">
          <tr>{columns.map((column, index) => <th key={column} className={`border-b border-accent/15 px-4 py-4 font-semibold ${index === 0 ? "sticky left-0 bg-[#07111a]" : ""}`}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="border-b border-accent/10 last:border-0">
              {row.map((cell, index) => <td key={cell} className={`px-4 py-4 align-top text-muted-foreground ${index === 0 ? "sticky left-0 bg-[#0d111f] font-medium text-foreground" : ""}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DecisionTree({ items }: { items: { condition: string; action: string }[] }) {
  return (
    <section className="border border-accent/15 bg-[#0a0f1c] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Decision tree</p>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item.condition} className="border border-accent/10 bg-[#0d111f] p-4">
            <p className="font-medium text-foreground">If {item.condition}</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">Then {item.action}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border border-accent/15 bg-[#07111a] p-5">
      <h2 className="font-heading text-3xl font-medium leading-tight text-foreground">{title}</h2>
      <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground sm:grid-cols-2">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </section>
  )
}

export function StatisticsCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-accent/15 bg-[#0d111f] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
      <p className="mt-4 font-heading text-4xl text-foreground">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
    </div>
  )
}

export function Callout({ title, children }: SectionProps) {
  return <Panel eyebrow="Callout" title={title}>{children}</Panel>
}

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section id="faq" className="border border-accent/15 bg-[#07111a] p-5">
      <h2 className="font-heading text-3xl font-medium leading-tight text-foreground">FAQ for Dubai and UAE AI Visibility</h2>
      <div className="mt-6 divide-y divide-accent/10">
        {items.map((item) => (
          <div key={item.id} className="py-5 first:pt-0 last:pb-0">
            <h3 className="text-xl font-semibold leading-tight text-foreground">{item.question}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function RelatedKnowledgeAssets({ curated, generated }: { curated: RelatedArticle[]; generated: KnowledgeArticlePackage[] }) {
  const generatedItems: RelatedArticle[] = generated.map((article) => ({
    label: article.meta.title,
    href: article.meta.path,
    type: "guide",
    relationship: "Entity-derived related knowledge asset",
  }))
  const items = [...curated, ...generatedItems]

  return (
    <section className="border border-accent/15 bg-[#0a0f1c] p-5">
      <h2 className="font-heading text-3xl font-medium leading-tight text-foreground">Related knowledge assets</h2>
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <Link key={`${item.href}-${item.relationship}`} href={item.href} className="group block border border-accent/10 bg-[#0d111f] p-4 transition-colors hover:border-accent/35">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {item.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.relationship}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function AuthorCard({ article }: { article: KnowledgeArticlePackage }) {
  return (
    <section className="border border-accent/15 bg-[#0d111f] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Author</p>
      <div className="mt-5 flex gap-4">
        <Image src={siteConfig.principal.image} alt={siteConfig.principal.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">{article.meta.author}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{siteConfig.principal.bio}</p>
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="border border-accent/25 bg-[#07111a] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Qualified next step</p>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-foreground">Free AI Visibility Assessment for Dubai and UAE Businesses</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Vista by Lara reviews entity clarity, AI-search evidence, schema readiness, and WhatsApp-ready conversion paths for UAE and GCC operators.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={siteConfig.whatsapp} className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 text-sm font-semibold text-background">
          Free AI Visibility Assessment
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <Link href="/contact" className="inline-flex items-center gap-2 border border-accent/25 px-5 py-3 text-sm font-semibold text-accent">
          Book Strategy Session
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

export function NewsletterSection() {
  return (
    <section className="border border-accent/15 bg-[#0d111f] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Research updates</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Future Vista knowledge releases will expand AI visibility, GEO, Shopify, Google Ads, and automation intelligence for UAE and GCC decision-makers.
      </p>
    </section>
  )
}

export function ShareToolbar({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex flex-wrap gap-3" aria-label="Share article">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} className="inline-flex items-center gap-2 border border-accent/20 px-4 py-2 text-sm text-accent">
        <Share2 className="h-4 w-4" />
        LinkedIn
      </a>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} className="inline-flex items-center gap-2 border border-accent/20 px-4 py-2 text-sm text-accent">
        <Share2 className="h-4 w-4" />
        Email
      </a>
    </div>
  )
}

export function DownloadCenter({ items }: { items: DownloadAsset[] }) {
  return (
    <section className="border border-accent/15 bg-[#0a0f1c] p-5">
      <h2 className="font-heading text-3xl font-medium leading-tight text-foreground">Download center</h2>
      <div className="mt-5 grid gap-4">
        {items.length === 0 ? (
          <p className="text-base leading-relaxed text-muted-foreground">Downloadable diagrams and worksheets are reserved in the platform model for this flagship asset.</p>
        ) : (
          items.map((item) => (
            <Link key={item.id} href={item.href} className="flex items-start gap-3 border border-accent/10 bg-[#0d111f] p-4 text-accent">
              <Download className="mt-1 h-4 w-4 shrink-0" />
              <span>
                <span className="block font-semibold">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                <span className="mt-3 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {item.fileSize ?? "File"} | Updated {item.lastUpdated ?? "recently"}
                </span>
                <span className="mt-4 inline-flex text-sm font-semibold text-accent">Download</span>
              </span>
            </Link>
          ))
        )}
      </div>
    </section>
  )
}

export function PreviousNextNavigation() {
  return (
    <nav className="grid gap-4 border border-accent/15 bg-[#0d111f] p-5 sm:grid-cols-2" aria-label="Previous and next knowledge assets">
      <Link href="/ai-search-authority-engineering" className="border border-accent/10 p-4 text-accent">
        <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">Previous</span>
        <span className="mt-2 block font-semibold">AI Search Authority Engineering</span>
      </Link>
      <Link href="/services/seo-optimization" className="border border-accent/10 p-4 text-accent sm:text-right">
        <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">Next</span>
        <span className="mt-2 block font-semibold">SEO Optimization Service Path</span>
      </Link>
    </nav>
  )
}

function Panel({ eyebrow, title, children }: SectionProps) {
  return (
    <aside className="border border-accent/20 bg-[#07111a] p-5">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>}
      {title && <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-foreground">{title}</h2>}
      <div className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  )
}
