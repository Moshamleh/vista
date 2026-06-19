import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { blogPosts, getBlogPost } from "@/lib/blog"
import { siteConfig } from "@/lib/site"

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.legalName],
      images: post.image
        ? [{ url: post.image, width: 1400, height: 700, alt: post.imageAlt ?? post.title }]
        : [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image ?? siteConfig.ogImage],
    },
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </a>
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
                <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
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
                <div className="space-y-7 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                  {post.body.map((block, index) => {
                    if (typeof block === "string") return <p key={`${index}-${block}`}>{block}</p>
                    if (block.type === "heading") {
                      return <h2 key={`${index}-${block.text}`} className="pt-5 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">{block.text}</h2>
                    }
                    return (
                      <ul key={index} className="list-disc space-y-3 pl-6 text-foreground/80">
                        {block.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
