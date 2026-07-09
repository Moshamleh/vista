import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getBlogPost, getBlogPosts, type BlogPost } from "@/lib/blog"
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
  if (monthYear.includes("May")) return "2026-05-01T00:00:00+04:00"
  return "2026-06-01T00:00:00+04:00"
}

function getArticleKeywords(post: BlogPost) {
  if (post.slug === "best-profound-aeo-alternatives-2026") {
    return [
      "AEO alternatives",
      "Profound alternatives",
      "AI visibility tools",
      "answer engine optimization",
      "share of voice AI",
      "Dubai agency",
      "UAE AI search",
    ]
  }

  return [
    post.category,
    "Dubai agency",
    "UAE digital strategy",
    "GCC brand visibility",
    "Vista by Lara",
  ]
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
  const post = await getBlogPost(slug)

  if (!post) notFound()

  const pageUrl = `${siteConfig.url}/blog/${post.slug}`
  const imageUrl = post.image ? `${siteConfig.url}${post.image}` : `${siteConfig.url}${siteConfig.ogImage}`
  const publishedDate = getIsoDate(post.date)
  const keywords = getArticleKeywords(post)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    url: pageUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    articleSection: post.category,
    keywords,
    inLanguage: "en-AE",
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
      { "@type": "Thing", name: "Answer Engine Optimization" },
      { "@type": "Thing", name: "Generative Engine Optimization" },
      { "@type": "Place", name: "Dubai, United Arab Emirates" },
      { "@type": "Organization", name: "Vista by Lara" },
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
                Back to blog
              </Link>
              <div className="mt-10 rounded-3xl border border-accent/15 bg-[#0d111f] p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Article</p>
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
                </dl>
              </div>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Answer block</p>
                  <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
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

              <div className="mt-14 rounded-3xl border border-accent/10 bg-[#0d111f] p-7 sm:p-10 shadow-[0_30px_70px_-48px_rgba(87,217,255,0.18)]">
                <div className="mb-10 border-b border-accent/15 pb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Supportive list</p>
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground sm:grid-cols-3">
                    <li>- Schema markup</li>
                    <li>- WebP images</li>
                    <li>- Server-side rendering</li>
                  </ul>
                </div>
                <div className="space-y-7 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                  {post.body.map((block, index) => {
                    if (typeof block === "string") return <p key={`${index}-${block}`}>{block}</p>

                    switch (block.type) {
                      case "heading":
                        return (
                          <h2 key={`${index}-${block.text}`} className="pt-5 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
                            {block.text}
                          </h2>
                        )
                      case "list":
                      case "checklist":
                        return (
                          <div key={index}>
                            {"title" in block && block.title && (
                              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{block.title}</p>
                            )}
                            <ul className="list-disc space-y-3 pl-6 text-foreground/80">
                              {block.items.map((item: string) => <li key={item}>{item}</li>)}
                            </ul>
                          </div>
                        )
                      case "evidence":
                        return (
                          <div key={index} className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-base leading-7 text-foreground/85">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Data Fact</p>
                            <p className="mt-2">{block.fact}</p>
                            <Link href={block.href} className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                              Source: {block.source}
                            </Link>
                          </div>
                        )
                      case "insight":
                      case "recommendation":
                        return (
                          <div key={index} className="rounded-2xl border border-border/40 bg-[#0c111d] p-6">
                            <h3 className="font-heading text-xl font-semibold text-foreground">{block.title}</h3>
                            <p className="mt-2 text-base leading-7 text-foreground/80">{block.text}</p>
                          </div>
                        )
                      case "mistake":
                        return (
                          <div key={index} className="rounded-2xl border border-border/40 bg-[#0c111d] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Common mistake</p>
                            <p className="mt-2 text-base leading-7 text-foreground/80">{block.mistake}</p>
                            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">Correction</p>
                            <p className="mt-2 text-base leading-7 text-foreground/80">{block.correction}</p>
                          </div>
                        )
                      case "table":
                        return (
                          <div key={index} className="overflow-x-auto rounded-2xl border border-border/40">
                            <table className="min-w-full text-left text-sm">
                              <thead className="bg-[#0c111d] text-foreground">
                                <tr>
                                  {block.columns.map((column: string) => (
                                    <th key={column} className="px-5 py-3 font-heading text-base">{column}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/40 text-muted-foreground">
                                {block.rows.map((row: string[], rowIndex: number) => (
                                  <tr key={rowIndex}>
                                    {row.map((cell: string, cellIndex: number) => (
                                      <td key={cellIndex} className="px-5 py-4 leading-6">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )
                      case "decision-tree":
                        return (
                          <div key={index} className="rounded-2xl border border-border/40 bg-[#0c111d] p-6">
                            <h3 className="font-heading text-xl font-semibold text-foreground">{block.title}</h3>
                            <div className="mt-4 space-y-3">
                              {block.branches.map((branch) => (
                                <div key={branch.condition} className="text-base leading-7 text-foreground/80">
                                  <span className="font-semibold text-foreground">{branch.condition}</span> → {branch.action}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      case "faq":
                        return (
                          <div key={index} className="space-y-4">
                            {block.questions.map((qa) => (
                              <div key={qa.question} className="rounded-2xl border border-border/40 bg-[#0c111d] p-6">
                                <h3 className="font-heading text-lg font-semibold text-foreground">{qa.question}</h3>
                                <p className="mt-2 text-base leading-7 text-foreground/80">{qa.answer}</p>
                              </div>
                            ))}
                          </div>
                        )
                      case "related":
                        return (
                          <div key={index}>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{block.title}</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {block.links.map((link) => (
                                <Link key={link.href} href={link.href} className="rounded-2xl border border-border/40 bg-[#0c111d] p-4 hover:border-accent/40">
                                  <p className="font-heading text-base font-semibold text-foreground">{link.label}</p>
                                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{link.summary}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      case "cta":
                        return (
                          <div key={index} className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                            <h3 className="font-heading text-xl font-semibold text-foreground">{block.title}</h3>
                            <p className="mt-2 text-base leading-7 text-foreground/80">{block.text}</p>
                            <Link href={block.href} className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:scale-[1.02]">
                              {block.label}
                            </Link>
                          </div>
                        )
                      case "case-link":
                        return (
                          <Link key={index} href={block.href} className="block rounded-2xl border border-accent/20 bg-accent/5 p-6 hover:border-accent/40">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{block.label}</p>
                            <p className="mt-2 text-base leading-7 text-foreground/80">{block.summary}</p>
                          </Link>
                        )
                      case "conclusion":
                        return (
                          <div key={index} className="rounded-2xl border border-border/40 bg-[#0c111d] p-6">
                            <h3 className="font-heading text-xl font-semibold text-foreground">{block.question}</h3>
                            <p className="mt-2 text-base leading-7 text-foreground/80">{block.answer}</p>
                          </div>
                        )
                      default:
                        return null
                    }
                  })}
                </div>
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
