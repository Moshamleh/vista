import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, RefreshCcw } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  AISummary,
  ActiveTableOfContents,
  ComparisonTable,
  ExecutiveSummary,
  KnowledgeHero,
  ReadingInformation,
  ReadingProgress,
} from "@/components/knowledge"
import { jsonLd } from "@/lib/json-ld"
import { getKnowledgeArticle, getKnowledgeStaticParams } from "@/lib/knowledge/content"
import { generateKnowledgeJsonLd } from "@/lib/schema/knowledge"
import { generateKnowledgeMetadata } from "@/lib/seo/knowledge"

type KnowledgeArticlePageProps = {
  params: Promise<{ pillar: string; slug: string }>
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function getHeadings(markdown: string) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim()
      return { id: slugify(text), text }
    })
}

function parseTable(lines: string[]) {
  const rows = lines
    .filter((line) => line.trim().startsWith("|") && line.trim().endsWith("|"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))

  if (rows.length < 3) return null

  return {
    columns: rows[0],
    rows: rows.slice(2),
  }
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/)
  const blocks = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed || /^#\s+/.test(trimmed)) {
      index += 1
      continue
    }

    if (/^##\s+/.test(trimmed)) {
      const text = trimmed.replace(/^##\s+/, "")
      const id = slugify(text)
      blocks.push(
        <h2 id={id} key={`${index}-${text}`} className="group scroll-mt-28 pt-6 font-heading text-3xl font-medium leading-tight text-foreground sm:text-4xl">
          <a href={`#${id}`} className="focus:outline-none focus:ring-2 focus:ring-accent">
            {text}
            <span className="ml-3 text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">#</span>
          </a>
        </h2>,
      )
      index += 1
      continue
    }

    if (/^\|/.test(trimmed)) {
      const tableLines = []
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index])
        index += 1
      }
      const table = parseTable(tableLines)
      if (table) blocks.push(<ComparisonTable key={`${index}-table`} columns={table.columns} rows={table.rows} />)
      continue
    }

    if (/^-\s+/.test(trimmed)) {
      const items = []
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^-\s+/, ""))
        index += 1
      }
      blocks.push(
        <ul key={`${index}-list`} className="list-disc space-y-3 pl-6 text-foreground/80">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>,
      )
      continue
    }

    const paragraph = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,3}\s+/.test(lines[index].trim()) &&
      !/^\|/.test(lines[index].trim()) &&
      !/^-\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim())
      index += 1
    }

    const text = paragraph.join(" ")
    blocks.push(<p key={`${index}-${text.slice(0, 24)}`}>{text}</p>)
  }

  return blocks
}

export function generateStaticParams() {
  return getKnowledgeStaticParams()
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps): Promise<Metadata> {
  const { pillar, slug } = await params
  const article = getKnowledgeArticle(pillar, slug)

  if (!article) return {}

  return generateKnowledgeMetadata(article)
}

export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { pillar, slug } = await params
  const article = getKnowledgeArticle(pillar, slug)

  if (!article) notFound()

  const headings = getHeadings(article.article)
  const blueprintHeadings = [
    { id: "executive-summary", text: "Executive Summary" },
    { id: "ai-summary", text: "AI Summary" },
    ...headings,
  ]
  const schema = generateKnowledgeJsonLd(article)

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            Back to knowledge index
          </Link>

          <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/10 p-5 text-sm text-foreground/86 sm:flex sm:items-center sm:gap-4">
            <RefreshCcw className="mb-3 h-5 w-5 text-accent sm:mb-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-foreground">Last updated: 30 June 2026</p>
              <p className="mt-1 text-muted-foreground">
                This resource is actively maintained as AI search technologies evolve.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <KnowledgeHero article={article} />
          </div>
          <div className="mt-6">
            <ReadingInformation article={article} />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
            <aside className="space-y-5">
              <ActiveTableOfContents headings={blueprintHeadings} />
            </aside>

            <div className="space-y-8">
              <section id="executive-summary" className="grid scroll-mt-28 gap-5 sm:grid-cols-2">
                <ExecutiveSummary>{article.meta.executiveSummary}</ExecutiveSummary>
                <div id="ai-summary" className="scroll-mt-28">
                  <AISummary>{article.meta.aiSummary}</AISummary>
                </div>
              </section>

              <div className="rounded-3xl border border-accent/10 bg-[#0d111f] p-7 text-lg leading-relaxed text-foreground/85 shadow-[0_30px_70px_-48px_rgba(87,217,255,0.18)] sm:p-10">
                <div className="space-y-7">{renderMarkdown(article.article)}</div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
