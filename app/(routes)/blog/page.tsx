import type { Metadata } from "next"
import { ArrowUpRight, Clock, Network, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { blogPillarClusters, getBlogPosts, plannedPillarArticleCount, plannedSupportingArticleCount } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Technical Intelligence Briefings Dubai | Vista",
  description:
    "Evidence-led technical intelligence briefings on Dubai AI citation, GCC e-commerce infrastructure, and UAE high-ticket conversion architecture.",
  keywords: "technical intelligence Dubai, AI citation UAE, e-commerce infrastructure GCC, high-ticket conversion Dubai",
  alternates: { canonical: "https://www.vistabylara.com/blog" },
  openGraph: {
    title: "Technical Intelligence Briefings | Vista by Lara",
    description: "Evidence-led infrastructure briefings for UAE and GCC luxury commerce leaders.",
    url: "https://www.vistabylara.com/blog",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/blog.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Intelligence Briefings | Vista by Lara",
    description: "Evidence-led infrastructure briefings for UAE and GCC luxury commerce leaders.",
    images: ["https://www.vistabylara.com/og/blog.jpg"],
  },
}

function getPostHref(slug: string) {
  if (slug === "why-ai-isnt-recommending-your-business") {
    return "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
  }

  return `/blog/${slug}`
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
                Vista technical intelligence
              </p>
              <h1 className="mt-6 font-heading text-5xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-7xl">
                Evidence-led briefings for UAE AI authority.
              </h1>
            </div>
            <div className="max-w-xl lg:justify-self-end">
              <div className="border border-accent/20 bg-[#0a0a0a] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Evidence block</p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Vista by Lara publishes Technical Intelligence Briefings that convert project evidence into AI-citable data points, verification tables, and proof-linked conclusions for Dubai and GCC infrastructure decisions.
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

          <a href={getPostHref(featured.slug)} className="group mt-14 grid overflow-hidden rounded-3xl bg-[#0d111f] text-foreground shadow-[0_40px_120px_-72px_rgba(87,217,255,0.2)] lg:grid-cols-[1.15fr_0.85fr]">
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
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/70">Featured briefing</p>
                <div className="mt-8 flex items-center gap-3 text-sm font-medium text-muted-foreground/80">
                  <Clock className="h-4 w-4" />
                  <span>{featured.readTime}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  <li>- Data Fact blocks</li>
                  <li>- Verification tables</li>
                  <li>- Case-study proof nodes</li>
                </ul>
              </div>
              <div className="flex items-end justify-between gap-8">
                <span className="max-w-44 text-sm leading-relaxed text-muted-foreground/60">Open the full briefing for the proof graph.</span>
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#0d111f] text-accent transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </a>

          <section className="mt-16 border border-accent/15 bg-[#0b101c] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  <Network className="h-4 w-4" />
                  Content pillar map
                </p>
                <h2 className="mt-5 font-heading text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
                  Six UAE authority pillars with every supporting article connected.
                </h2>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  The July blog plan is published as a crawlable topic web, not isolated posts. Each pillar links to its service path, support articles, UAE search term, and AI-readable article page.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="border border-accent/15 bg-[#0f1422] p-4">
                    <p className="font-heading text-3xl text-foreground">{plannedPillarArticleCount}</p>
                    <p className="mt-1 text-sm text-muted-foreground">planned articles live</p>
                  </div>
                  <div className="border border-accent/15 bg-[#0f1422] p-4">
                    <p className="font-heading text-3xl text-foreground">{blogPillarClusters.length}</p>
                    <p className="mt-1 text-sm text-muted-foreground">pillar hubs</p>
                  </div>
                  <div className="border border-accent/15 bg-[#0f1422] p-4">
                    <p className="font-heading text-3xl text-foreground">{plannedSupportingArticleCount}</p>
                    <p className="mt-1 text-sm text-muted-foreground">supporting articles</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {blogPillarClusters.map((cluster) => (
                  <article key={cluster.slug} className="border border-border/20 bg-[#0f1422] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{cluster.category}</p>
                        <a href={`/blog/${cluster.slug}`} className="mt-3 block font-heading text-2xl font-medium leading-tight text-foreground transition-colors hover:text-accent">
                          {cluster.title}
                        </a>
                      </div>
                      <a href={cluster.serviceHref} className="shrink-0 rounded-full border border-accent/20 p-2 text-accent transition-colors hover:bg-accent hover:text-background" aria-label={`${cluster.service} service page`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{cluster.service}</p>
                    <div className="mt-5 space-y-3">
                      {cluster.articles.map((article) => (
                        <a key={article.slug} href={`/blog/${article.slug}`} className="block border-l border-accent/25 pl-3 transition-colors hover:border-accent">
                          <span className="block text-sm font-medium leading-5 text-foreground">
                            {article.isPillar ? "Pillar: " : ""}
                            {article.title}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                            {article.date} | Search term: {article.searchTerm}
                          </span>
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <a key={post.slug} href={getPostHref(post.slug)} className="group flex min-h-80 flex-col justify-between rounded-3xl border border-border/20 bg-[#0f1422] p-6 transition-all hover:-translate-y-1 hover:border-accent/30">
                <div>
                  <p className="text-sm text-muted-foreground/70">{post.category} | {post.date}</p>
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
