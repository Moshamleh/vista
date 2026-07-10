import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { useEngineClient } from "../api/useEngineClient"
import { PageHeader } from "../components/PageHeader"
import { ErrorState, LoadingState } from "../components/QueryState"
import { demoContent } from "../lib/demo-data"
import { asRecord, readData, readString } from "../lib/data"
import type { ContentRecord } from "../types"

export function ContentPreviewView() {
  const { id = "" } = useParams()
  const client = useEngineClient()
  const detail = useQuery({
    queryKey: ["content-preview", id],
    queryFn: () => client.getContent({ path: { id } }),
    retry: false
  })
  const live = asRecord(readData(detail.data)).content as ContentRecord | undefined
  const fallbackArticle = demoContent[0]
  const article = live ?? demoContent.find((item) => item.id === id) ?? fallbackArticle
  const headings = extractHeadings(article.body ?? "")

  return (
    <>
      <PageHeader
        title="Article Preview"
        description="Vista by Lara publication preview using the content repository shape and documented content API."
      />
      {detail.isLoading ? <LoadingState /> : null}
      {detail.error ? <ErrorState error={detail.error} /> : null}
      <article className="overflow-hidden rounded-lg border border-slate-800 bg-[#04050b] text-white shadow-xl">
        <header className="relative bg-[radial-gradient(circle_at_top_left,_rgba(47,111,115,0.45),_transparent_34%),linear-gradient(135deg,_#04050b,_#101827)] px-6 py-10 sm:px-10">
          <nav className="mb-8 text-sm text-slate-300" aria-label="Breadcrumbs">
            <Link className="hover:text-white" to="/content">
              Content Library
            </Link>
            <span className="mx-2">/</span>
            <span>Preview</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ec9c2]">
            {readString(article.contentType, "Authority Article")} | {readString(article.language, "en-AE")}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{article.aiSummary}</p>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <span>{String(article.readingTimeMinutes ?? 9)} min read</span>
            <span>{String(article.wordCount ?? 1400)} words</span>
            <span>{readString(article.targetKeyword, "AI visibility Dubai")}</span>
          </div>
        </header>
        <div className="grid gap-8 bg-white px-6 py-8 text-slate-900 lg:grid-cols-[260px_1fr] lg:px-10">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Table of contents</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {headings.map((heading) => (
                  <li key={heading}>
                    <a className="text-[#2f6f73] hover:underline" href={`#${slugify(heading)}`}>
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div className="min-w-0">
            <div className="mb-8 aspect-[16/7] rounded-lg bg-[linear-gradient(135deg,_#dce9e6,_#f7faf9)] p-8">
              <div className="flex h-full items-center justify-center rounded-md border border-dashed border-[#2f6f73]/40 text-center text-[#2f6f73]">
                Vista by Lara knowledge image placeholder
              </div>
            </div>
            <div className="prose prose-slate max-w-none">{renderMarkdownLike(article.body ?? "")}</div>
            <section className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold">Schema preview</h2>
              <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">
                {JSON.stringify(
                  {
                    "@context": "https://schema.org",
                    "@type": article.schemaType ?? "Article",
                    headline: article.title,
                    description: article.seoMetadata?.description,
                    about: article.entities,
                    mainEntityOfPage: article.canonicalUrl
                  },
                  null,
                  2
                )}
              </pre>
            </section>
            <section className="mt-8">
              <h2 className="text-lg font-semibold">Internal links</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(article.internalLinks ?? []).map((link) => (
                  <a
                    key={link.targetUrl}
                    className="rounded-md bg-[#e6f0ee] px-3 py-2 text-sm text-[#245b5f]"
                    href={link.targetUrl}
                  >
                    {link.anchorText}
                  </a>
                ))}
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-lg font-semibold">Related articles</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {demoContent
                  .filter((item) => item.id !== article.id)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.id}
                      className="rounded-md border border-slate-200 p-4 hover:border-[#2f6f73]"
                      to={`/content/${item.id}/preview`}
                    >
                      <span className="text-sm font-medium text-slate-900">{item.title}</span>
                      <span className="mt-1 block text-xs text-slate-500">{item.targetKeyword}</span>
                    </Link>
                  ))}
              </div>
            </section>
            <section className="mt-8 rounded-md border border-slate-200 p-5">
              <h2 className="text-lg font-semibold">Metadata preview</h2>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">SEO title</dt>
                  <dd>{article.seoMetadata?.title}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Canonical</dt>
                  <dd className="break-all">{article.canonicalUrl}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">Description</dt>
                  <dd>{article.seoMetadata?.description}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}

function extractHeadings(body: string): string[] {
  const headings = body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace(/^## /u, ""))
  return headings.length > 0 ? headings : ["Executive Summary", "Vista Recommendation", "FAQ"]
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "")
}

function renderMarkdownLike(body: string) {
  return body.split("\n").map((line, index) => {
    if (line.startsWith("### "))
      return (
        <h3 key={index} id={slugify(line.replace(/^### /u, ""))}>
          {line.replace(/^### /u, "")}
        </h3>
      )
    if (line.startsWith("## ")) {
      const text = line.replace(/^## /u, "")
      return (
        <h2 key={index} id={slugify(text)}>
          {text}
        </h2>
      )
    }
    if (line.trim().length === 0) return null
    return <p key={index}>{line}</p>
  })
}
