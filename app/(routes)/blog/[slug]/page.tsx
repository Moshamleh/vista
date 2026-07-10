import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getBlogPost, getBlogPosts, type BlogBlock, type BlogPost } from "@/lib/blog"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts()
  return blogPosts.map((post) => ({ slug: post.slug }))
}

function getIsoDate(monthYear: string) {
  const monthMap: Record<string, string> = {
    May: "05",
    June: "06",
    July: "07",
  }
  const month = Object.keys(monthMap).find((item) => monthYear.includes(item))
  const year = monthYear.match(/\b20\d{2}\b/u)?.[0] ?? "2026"
  const day = monthYear.match(/\b([1-9]|[12]\d|3[01])\b/u)?.[1]?.padStart(2, "0") ?? "01"

  return `${year}-${month ? monthMap[month] : "06"}-${day}T00:00:00+04:00`
}

function getArticleKeywords(post: BlogPost) {
  return [
    post.category,
    "Technical Intelligence Briefing",
    "Dubai AI citation",
    "UAE digital infrastructure",
    "GCC e-commerce evidence",
    "Vista Engineering Standard",
    ...(post.tags ?? []),
  ]
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function getHeadingBlocks(body: BlogBlock[]) {
  return body.filter((block): block is Extract<BlogBlock, { type: "heading" }> => {
    return typeof block !== "string" && block.type === "heading"
  })
}

function getConclusionBlocks(body: BlogBlock[]) {
  return body.filter((block): block is Extract<BlogBlock, { type: "conclusion" }> => {
    return typeof block !== "string" && block.type === "conclusion"
  })
}

function getFaqBlocks(body: BlogBlock[]) {
  return body.filter((block): block is Extract<BlogBlock, { type: "faq" }> => {
    return typeof block !== "string" && block.type === "faq"
  })
}

function renderBlock(block: BlogBlock, index: number) {
  if (typeof block === "string") return <p key={`${index}-${block}`}>{block}</p>

  if (block.type === "heading") {
    return (
      <h2 id={slugifyHeading(block.text)} key={`${index}-${block.text}`} className="scroll-mt-28 pt-5 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
        {block.text}
      </h2>
    )
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="list-disc space-y-3 pl-6 text-foreground/80">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.type === "insight") {
    return (
      <aside key={`${index}-${block.title}`} className="border-l-4 border-accent bg-[#07111a] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Insight box</p>
        <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{block.text}</p>
      </aside>
    )
  }

  if (block.type === "evidence") {
    return (
      <aside key={`${index}-${block.source}`} className="border border-accent/25 bg-[#07111a] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Evidence block</p>
        <p className="mt-4 text-xl leading-relaxed text-foreground">{block.fact}</p>
        <Link href={block.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          {block.source}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </aside>
    )
  }

  if (block.type === "recommendation") {
    return (
      <aside key={`${index}-${block.title}`} className="border border-accent/25 bg-[#0a0f1c] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Expert recommendation</p>
        <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{block.text}</p>
      </aside>
    )
  }

  if (block.type === "mistake") {
    return (
      <aside key={`${index}-${block.mistake}`} className="grid gap-4 border border-accent/15 bg-[#0a0a0a] p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Common mistake</p>
          <p className="mt-4 text-lg leading-relaxed text-foreground">{block.mistake}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Correction</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{block.correction}</p>
        </div>
      </aside>
    )
  }

  if (block.type === "table") {
    return (
      <div key={index} className="overflow-x-auto border border-accent/15">
        <table className="w-full min-w-[680px] border-collapse text-left text-base">
          <thead className="bg-[#07111a] text-sm uppercase tracking-[0.16em] text-accent">
            <tr>
              {block.columns.map((column) => (
                <th key={column} scope="col" className="border-b border-accent/15 px-4 py-4 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("-")} className="border-b border-accent/10 last:border-0">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-4 align-top text-muted-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (block.type === "checklist") {
    return (
      <section key={`${index}-${block.title}`} className="border border-accent/15 bg-[#07111a] p-5">
        <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.title}</h2>
        <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>
    )
  }

  if (block.type === "decision-tree") {
    return (
      <section key={`${index}-${block.title}`} className="border border-accent/15 bg-[#0a0f1c] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Decision tree</p>
        <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.title}</h2>
        <div className="mt-6 grid gap-4">
          {block.branches.map((branch) => (
            <div key={branch.condition} className="border border-accent/10 bg-[#0d111f] p-4">
              <p className="font-medium text-foreground">If {branch.condition}</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">Then {branch.action}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (block.type === "faq") {
    return (
      <section key={index} className="border border-accent/15 bg-[#07111a] p-5">
        <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">FAQ</h2>
        <div className="mt-6 divide-y divide-accent/10">
          {block.questions.map((faq) => (
            <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
              <h3 className="text-xl font-semibold leading-tight text-foreground">{faq.question}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (block.type === "related") {
    return (
      <section key={`${index}-${block.title}`} className="border border-accent/15 bg-[#0a0f1c] p-5">
        <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.title}</h2>
        <div className="mt-6 grid gap-4">
          {block.links.map((resource) => (
            <Link key={resource.href} href={resource.href} className="group block border border-accent/10 bg-[#0d111f] p-4 transition-colors hover:border-accent/35">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {resource.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{resource.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  if (block.type === "cta") {
    const isExternal = block.href.startsWith("http")

    return (
      <section key={`${index}-${block.title}`} className="border border-accent/25 bg-[#07111a] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Conversion path</p>
        <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{block.text}</p>
        {isExternal ? (
          <a href={block.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            {block.label}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <Link href={block.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            {block.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </section>
    )
  }

  if (block.type === "case-link") {
    return (
      <Link key={`${index}-${block.href}`} href={block.href} className="group block border border-accent/15 bg-[#0a0f1c] p-5 transition-colors hover:border-accent/35">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {block.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{block.summary}</p>
      </Link>
    )
  }

  return (
    <section key={`${index}-${block.question}`} className="border border-accent/25 bg-[#0a0a0a] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Citable conclusion</p>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{block.question}</h2>
      <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{block.answer}</p>
    </section>
  )
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article" as const,
      publishedTime: post.date,
      authors: [siteConfig.legalName],
      images: post.image
        ? [{ url: post.image, width: 1400, height: 700, alt: post.imageAlt ?? post.title }]
        : [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image ?? siteConfig.ogImage],
    },
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params

  if (slug === "why-ai-isnt-recommending-your-business") {
    permanentRedirect("/knowledge/ai-visibility/why-ai-isnt-recommending-your-business")
  }

  const post = await getBlogPost(slug)

  if (!post) notFound()

  const pageUrl = `${siteConfig.url}/blog/${post.slug}`
  const imageUrl = post.image ? `${siteConfig.url}${post.image}` : `${siteConfig.url}${siteConfig.ogImage}`
  const publishedDate = getIsoDate(post.date)
  const keywords = getArticleKeywords(post)
  const tocHeadings = getHeadingBlocks(post.body)
  const conclusions = getConclusionBlocks(post.body)
  const faqQuestions = getFaqBlocks(post.body).flatMap((block) => block.questions)
  const knowledgeGraphMentions = post.knowledgeGraph
    ? [
        post.knowledgeGraph.primaryEntity,
        ...post.knowledgeGraph.secondaryEntities,
        ...post.knowledgeGraph.technologies,
        ...post.knowledgeGraph.organizationReferences,
      ]
    : post.entityMap ?? []
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.metaDescription,
    url: pageUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    articleSection: post.category,
    keywords,
    inLanguage: "en-AE",
    proficiencyLevel: "Expert",
    dependencies: "Vista Engineering Standard, UAE/GCC luxury commerce evidence, case-study proof nodes",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/vista-logo.png`,
        width: 512,
        height: 512,
      },
    },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1400,
      height: 700,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    about: [
      { "@type": "Thing", name: "Technical Intelligence Briefing" },
      { "@type": "Thing", name: "Answer Engine Optimization" },
      { "@type": "Thing", name: "Generative Engine Optimization" },
      { "@type": "Place", name: "Dubai, United Arab Emirates" },
      { "@type": "Organization", name: "Vista by Lara" },
    ],
    mentions: knowledgeGraphMentions.map((entity) => ({
      "@type": "Thing",
      name: entity,
    })),
    mainEntity: [
      ...conclusions.map((conclusion) => ({
        "@type": "Question",
        name: conclusion.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: conclusion.answer,
        },
      })),
      ...faqQuestions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
                <ArrowLeft className="h-4 w-4" />
                Back to intelligence
              </Link>
              <div className="mt-10 rounded-3xl border border-accent/15 bg-[#0d111f] p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Technical briefing</p>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="mt-1 font-medium text-foreground">{post.category}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Published</dt>
                    <dd className="mt-1 font-medium text-foreground">{post.date}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Reading time</dt>
                    <dd className="mt-1 inline-flex items-center gap-2 font-medium text-foreground">
                      <Clock className="h-4 w-4 text-accent" />
                      {post.readTime}
                    </dd>
                  </div>
                  {post.hub && (
                    <div>
                      <dt className="text-muted-foreground">Knowledge hub</dt>
                      <dd className="mt-1 font-medium text-foreground">{post.hub}</dd>
                    </div>
                  )}
                  {post.vistaFramework && (
                    <div>
                      <dt className="text-muted-foreground">Vista framework</dt>
                      <dd className="mt-1 font-medium text-foreground">{post.vistaFramework.name}</dd>
                    </div>
                  )}
                </dl>
              </div>
              {tocHeadings.length > 0 && (
                <nav className="mt-5 rounded-3xl border border-accent/15 bg-[#0d111f] p-6" aria-label="Article table of contents">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Table of contents</p>
                  <ol className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                    {tocHeadings.map((heading) => (
                      <li key={heading.text}>
                        <Link href={`#${slugifyHeading(heading.text)}`} className="transition-colors hover:text-accent">
                          {heading.text}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              {post.retrievalKeywords && (
                <div className="mt-5 rounded-3xl border border-accent/15 bg-[#0d111f] p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Retrieval keywords</p>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                    {post.retrievalKeywords.slice(0, 5).map((keyword) => (
                      <li key={keyword}>- {keyword}</li>
                    ))}
                  </ul>
                </div>
              )}
              {post.knowledgeGraph && (
                <div className="mt-5 rounded-3xl border border-accent/15 bg-[#0d111f] p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Knowledge graph</p>
                  <dl className="mt-5 space-y-4 text-sm leading-6">
                    <div>
                      <dt className="text-muted-foreground">Primary entity</dt>
                      <dd className="mt-1 font-medium text-foreground">{post.knowledgeGraph.primaryEntity}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Geographic entities</dt>
                      <dd className="mt-1 text-muted-foreground">{post.knowledgeGraph.geographicEntities.slice(0, 5).join(", ")}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </aside>

            <div>
              <header>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full border border-accent/20 bg-[#0f1321] px-4 py-1.5 text-accent">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h1 className="mt-8 max-w-4xl font-heading text-5xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-7xl">
                  {post.title}
                </h1>
                <div className="mt-8 max-w-3xl border border-accent/20 bg-[#0a0a0a] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Data-first lead</p>
                  <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
                {(post.executiveSummary || post.aiSummary) && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {post.executiveSummary && (
                      <section className="border border-accent/15 bg-[#0d111f] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Executive summary</p>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.executiveSummary}</p>
                      </section>
                    )}
                    {post.aiSummary && (
                      <section className="border border-accent/15 bg-[#0d111f] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">AI summary</p>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.aiSummary}</p>
                      </section>
                    )}
                  </div>
                )}
                {post.vistaFramework && (
                  <section className="mt-6 border border-accent/15 bg-[#0d111f] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Vista by Lara methodology</p>
                    <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{post.vistaFramework.name}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.vistaFramework.description}</p>
                  </section>
                )}
              </header>

              {post.image && (
                <figure className="mt-12">
                  <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-accent/10 bg-[#0d111f] shadow-[0_30px_70px_-48px_rgba(87,217,255,0.25)]">
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      fill
                      priority={post.featured}
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover"
                    />
                  </div>
                  {post.imageCaption && <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.imageCaption}</figcaption>}
                </figure>
              )}

              <div className="mt-14 rounded-3xl border border-accent/10 bg-[#0d111f] p-7 shadow-[0_30px_70px_-48px_rgba(87,217,255,0.18)] sm:p-10">
                <div className="mb-10 border-b border-accent/15 pb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Briefing requirements</p>
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground sm:grid-cols-3">
                    <li>- Data-first lead</li>
                    <li>- Decision framework</li>
                    <li>- AEO FAQ schema</li>
                  </ul>
                </div>
                <div className="space-y-7 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                  {post.body.map((block, index) => renderBlock(block, index))}
                </div>
                {(post.internalLinkingMap || post.schemaRecommendations || post.publishingChecklist) && (
                  <section className="mt-10 border-t border-accent/15 pt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Article package controls</p>
                    {post.internalLinkingMap && (
                      <div className="mt-6 overflow-x-auto border border-accent/15">
                        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                          <thead className="bg-[#07111a] uppercase tracking-[0.16em] text-accent">
                            <tr>
                              <th scope="col" className="border-b border-accent/15 px-4 py-4 font-semibold">Link</th>
                              <th scope="col" className="border-b border-accent/15 px-4 py-4 font-semibold">Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            {post.internalLinkingMap.map((item) => (
                              <tr key={`${item.href}-${item.role}`} className="border-b border-accent/10 last:border-0">
                                <td className="px-4 py-4 align-top">
                                  {item.href.startsWith("http") ? (
                                    <a href={item.href} className="text-accent">{item.label}</a>
                                  ) : (
                                    <Link href={item.href} className="text-accent">{item.label}</Link>
                                  )}
                                </td>
                                <td className="px-4 py-4 align-top text-muted-foreground">{item.role}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {post.schemaRecommendations && (
                        <div>
                          <h2 className="font-heading text-2xl font-medium leading-tight text-foreground">Schema recommendations</h2>
                          <ul className="mt-4 space-y-2 text-base leading-7 text-muted-foreground">
                            {post.schemaRecommendations.map((item) => (
                              <li key={item}>- {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {post.publishingChecklist && (
                        <div>
                          <h2 className="font-heading text-2xl font-medium leading-tight text-foreground">Publishing checklist</h2>
                          <ul className="mt-4 space-y-2 text-base leading-7 text-muted-foreground">
                            {post.publishingChecklist.map((item) => (
                              <li key={item}>- {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <SiteFooter />
    </div>
  )
}
