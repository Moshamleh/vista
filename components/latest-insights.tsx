import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LampContainer } from "@/components/ui/lamp"
import { getBlogPosts, type BlogPost } from "@/lib/blog"

function getTextPreview(post: BlogPost) {
  const source = post.body.find((block): block is string => typeof block === "string") || post.excerpt
  const sentences = source.match(/[^.!?]+[.!?]+/g)

  if (sentences && sentences.length > 0) {
    return sentences.slice(0, 2).join(" ").trim()
  }

  return source
}

function ArticleVisual({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  if (post.image) {
    return (
      <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#0b101c]">
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          fill
          priority={priority}
          quality={100}
          className={priority ? "object-contain p-4 sm:p-5" : "object-cover"}
          sizes={priority ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 34vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030408]/45 via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[18rem] flex-col justify-between rounded-[1.5rem] border border-accent/15 bg-[radial-gradient(circle_at_top,rgba(87,217,255,0.16),rgba(12,17,29,0.92)_45%,rgba(6,8,14,1))] p-6">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">{post.category}</p>
      <p className="mt-8 text-lg leading-8 text-foreground/85">{getTextPreview(post)}</p>
    </div>
  )
}

function FeaturedArticle({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid min-h-[30rem] overflow-hidden rounded-[2rem] border border-accent/15 bg-[#0b101c]/85 p-3 shadow-[0_40px_140px_-90px_rgba(87,217,255,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 lg:grid-cols-[1.08fr_0.92fr]"
    >
      <ArticleVisual post={post} priority />
      <div className="flex flex-col justify-between p-6 sm:p-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">
            Featured article / {post.category}
          </p>
          <h3 className="mt-6 font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h3>
          <p className="mt-5 text-base leading-8 text-muted-foreground">{post.excerpt}</p>
        </div>
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border/30 pt-5">
          <p className="text-sm text-muted-foreground">
            {post.date} / {post.readTime}
          </p>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 text-accent transition-colors group-hover:bg-accent group-hover:text-background">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function InsightCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/25 bg-[#0b101c]/80 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35"
    >
      <ArticleVisual post={post} />
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground/75">
            {post.category} / {post.date}
          </p>
          <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground">{post.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{post.image ? post.excerpt : getTextPreview(post)}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Read insight <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export async function LatestInsights() {
  const posts = await getBlogPosts()
  const [featured, ...latest] = posts.slice(0, 3)

  if (!featured) return null

  return (
    <section id="blog-preview" className="relative overflow-hidden bg-[#030408]">
      <LampContainer className="pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent">Latest insights</p>
            <h2 className="mt-6 bg-gradient-to-br from-white via-accent to-[#6f8dff] bg-clip-text font-heading text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-6xl">
              AI-search strategy for brands that want to be cited, ranked, and chosen.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Practical UAE and GCC guidance on SEO, AEO, GEO, premium websites, and content systems that make brands
              easier for Google, AI Mode, ChatGPT, Gemini, and Perplexity to recommend.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <FeaturedArticle post={featured} />
            <div className="grid gap-6">
              {latest.map((post) => (
                <InsightCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/25 px-7 font-heading text-sm font-semibold uppercase tracking-[0.06em] text-accent transition-colors hover:bg-accent hover:text-background"
            >
              View all articles
            </Link>
          </div>
        </div>
      </LampContainer>
    </section>
  )
}
