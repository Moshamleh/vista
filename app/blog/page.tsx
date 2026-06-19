import type { Metadata } from "next"
import { ArrowUpRight, Clock, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { blogPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site"

const blogTitle = "Branding, UX, Web Design & AI Growth Blog"
const blogDescription =
  "Read Vista by Lara insights on branding, UX, web design, AI, SEO, AEO, and digital growth for Dubai, UAE, and GCC businesses."

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${blogTitle} - ${siteConfig.name}`,
    description: blogDescription,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${blogTitle} - ${siteConfig.name}`,
    description: blogDescription,
    images: [siteConfig.ogImage],
  },
}

export default function BlogPage() {
  const [featured, ...posts] = blogPosts
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-foreground" />
                Vista journal
              </p>
              <h1 className="mt-6 font-heading text-5xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-7xl">
                Ideas for sharper digital brands
              </h1>
            </div>
            <div className="max-w-xl lg:justify-self-end">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Practical articles on branding, websites, UX, AI, AEO, Shopify, and digital growth for companies across Dubai, the UAE, and the GCC.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a href={`/blog/${featured.slug}`} className="group mt-14 grid overflow-hidden rounded-3xl bg-foreground text-background shadow-2xl shadow-foreground/10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-sm text-background/70">
                <span className="rounded-full border border-background/20 px-4 py-1.5">{featured.category}</span>
                <span>{featured.date}</span>
              </div>
              <h2 className="mt-10 max-w-3xl font-heading text-4xl font-medium leading-tight tracking-tight text-balance sm:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/70">{featured.excerpt}</p>
            </div>
            <div className="flex flex-col justify-between gap-12 border-t border-background/15 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="rounded-3xl border border-background/15 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-background/50">Featured article</p>
                <div className="mt-8 flex items-center gap-3 text-sm font-medium text-background/80">
                  <Clock className="h-4 w-4" />
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-8">
                <span className="max-w-44 text-sm leading-relaxed text-background/60">Open the full article page for an indexable URL.</span>
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </a>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="group flex min-h-80 flex-col justify-between rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/40">
                <div>
                  <p className="text-sm text-muted-foreground">{post.category} · {post.date}</p>
                  <h2 className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground">{post.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm font-medium text-foreground">
                  <span>{post.readTime}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
