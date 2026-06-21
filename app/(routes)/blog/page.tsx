import type { Metadata } from "next"
import { ArrowUpRight, Clock, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getBlogPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog | Branding, Design & AI Insights for UAE Businesses — Vista by Lara",
  description:
    "Insights on branding, UX design, digital products, and generative AI from Vista by Lara — Dubai's luxury design agency serving UAE and GCC markets.",
  keywords: "branding blog Dubai, design insights UAE, UX blog GCC, AI design blog Dubai",
  alternates: { canonical: "https://www.vistabylara.com/blog" },
  openGraph: {
    title: "Blog | Vista by Lara — Design & Branding Insights",
    description:
      "Branding, UX design, and AI insights from Dubai's award-winning design agency.",
    url: "https://www.vistabylara.com/blog",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/blog.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Vista by Lara — Design & Branding Insights",
    description:
      "Branding, UX design, and AI insights from Dubai's award-winning design agency.",
    images: ["https://www.vistabylara.com/og/blog.jpg"],
  },
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const [featured, ...posts] = blogPosts
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  if (!featured) return null

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0c1221] px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4 text-accent" />
                Vista knowledge hub
              </p>
              <h1 className="mt-6 font-heading text-5xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-7xl">
                How do UAE brands win AI-driven search?
              </h1>
            </div>
            <div className="max-w-xl lg:justify-self-end">
              <div className="border border-accent/20 bg-[#0a0a0a] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Answer block</p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  UAE brands win AI-driven search by publishing direct answers, structured data, fast Shopify pages, local Dubai entity signals, and service content that connects buyer questions to credible outcomes.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="rounded-full border border-accent/15 bg-[#0f1321] px-4 py-2 text-sm font-medium text-muted-foreground">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a href={`/blog/${featured.slug}`} className="group mt-14 grid overflow-hidden rounded-3xl bg-[#0d111f] text-foreground shadow-[0_40px_120px_-72px_rgba(87,217,255,0.2)] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground/70">
                <span className="rounded-full border border-accent/20 bg-[#0f1321] px-4 py-1.5 text-accent">{featured.category}</span>
                <span>{featured.date}</span>
              </div>
              <h2 className="mt-10 max-w-3xl font-heading text-4xl font-medium leading-tight tracking-tight text-balance sm:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground/80">{featured.excerpt}</p>
            </div>
            <div className="flex flex-col justify-between gap-12 border-t border-accent/15 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="rounded-3xl border border-accent/15 bg-[#0d111f] p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/70">Featured answer</p>
                <div className="mt-8 flex items-center gap-3 text-sm font-medium text-muted-foreground/80">
                  <Clock className="h-4 w-4" />
                  <span>{featured.readTime}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  <li>- Schema markup</li>
                  <li>- WebP and fast media</li>
                  <li>- Server-side rendering</li>
                </ul>
              </div>
              <div className="flex items-end justify-between gap-8">
                <span className="max-w-44 text-sm leading-relaxed text-muted-foreground/60">Open the full article page for an indexable URL.</span>
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#0d111f] text-accent transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </a>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="group flex min-h-80 flex-col justify-between rounded-3xl border border-border/20 bg-[#0f1422] p-6 transition-all hover:-translate-y-1 hover:border-accent/30">
                <div>
                  <p className="text-sm text-muted-foreground/70">{post.category} · {post.date}</p>
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
