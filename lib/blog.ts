export type BlogBlock = string | { type: "heading"; text: string } | { type: "list"; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  category: string
  tags?: string[]
  content?: string
  readTime: string
  date: string
  featured?: boolean
  image?: string
  imageAlt?: string
  imageCaption?: string
  body: BlogBlock[]
}

export const seedBlogPosts: BlogPost[] = [
  {
    slug: "best-profound-aeo-alternatives-2026",
    title: "10 Best Profound AEO Alternatives for 2026",
    excerpt:
      "A practical comparison of AI visibility and AEO platforms for teams tracking citations, share of voice, and generative search performance.",
    metaTitle: "10 Best Profound AEO Alternatives for 2026 | Vista by Lara",
    metaDescription:
      "Compare the best Profound AEO alternatives for 2026, including AI visibility tools for citations, share of voice, generative search, and answer engine optimization.",
    category: "AEO",
    readTime: "9 min read",
    date: "June 2026",
    featured: true,
    image: "/blog/profound-aeo-alternatives-dubai-ai-visibility-dashboard.webp",
    imageAlt:
      "Vista by Lara team in a Dubai office reviewing an AI visibility dashboard for Profound AEO alternatives, AI citations, share of voice, and generative search performance.",
    imageCaption:
      "Vista by Lara reviews AI visibility, citation tracking, and share-of-voice signals for brands comparing Profound AEO alternatives in 2026.",
    body: [
      "As AI search becomes a major discovery channel, brands need to understand when and why they are mentioned by ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews, and other answer engines.",
      "Profound is one of the best-known AI visibility platforms, but it is not the only option. Many teams now compare Profound with tools that offer different pricing, workflows, analytics depth, and prompt monitoring features.",
      { type: "heading", text: "What to Look for in a Profound Alternative" },
      {
        type: "list",
        items: [
          "AI citation tracking across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews.",
          "Share-of-voice reporting by topic, competitor, market, and prompt cluster.",
          "Prompt monitoring that shows how answers change over time.",
          "Clear recommendations for AEO, GEO, SEO, content, PR, and entity optimization.",
          "Reliable dashboards for marketing teams, founders, and leadership reporting."
        ]
      },
      { type: "heading", text: "1. Peec AI" },
      "Best for enterprise AI visibility monitoring. Peec AI helps teams track brand mentions, competitor visibility, citations, and share of voice across AI answer engines. It is strong for organizations that need executive reporting and market intelligence.",
      { type: "heading", text: "2. Otterly AI" },
      "Best for easy AI search monitoring. Otterly AI is useful for businesses that want a simple way to see how often their brand appears in AI-generated answers and where competitors are winning visibility.",
      { type: "heading", text: "3. AthenaHQ" },
      "Best for strategic AI search analysis. AthenaHQ combines visibility monitoring with deeper analysis around brand authority, market positioning, and AI recommendation patterns.",
      { type: "heading", text: "4. Promptwatch" },
      "Best for prompt-level monitoring. Promptwatch focuses on understanding how different prompts affect AI responses, which helps teams find content gaps and recommendation opportunities.",
      { type: "heading", text: "5. AI Rank Lab" },
      "Best for AI search ranking analysis. AI Rank Lab helps brands measure AI search visibility, benchmark competitors, and track performance trends over time.",
      { type: "heading", text: "6. Scrunch AI" },
      "Best for brand visibility tracking. Scrunch AI gives marketing teams a clear way to monitor brand exposure, mentions, and recommendations across generative search environments.",
      { type: "heading", text: "7. LLM Pulse" },
      "Best for large language model monitoring. LLM Pulse focuses on brand mentions, citation frequency, and competitive positioning across LLM ecosystems.",
      { type: "heading", text: "8. Vismore" },
      "Best for marketing teams. Vismore supports AI visibility reporting, competitor intelligence, and content opportunity analysis for teams building AEO programs.",
      { type: "heading", text: "9. SE Ranking" },
      "Best for businesses combining SEO and AEO. SE Ranking is traditionally an SEO platform, but its broader visibility workflow can support teams connecting classic search with AI discovery.",
      { type: "heading", text: "10. Nightwatch" },
      "Best for visibility analytics. Nightwatch offers analytics and monitoring that can help teams connect traditional SEO performance with emerging AI search visibility.",
      { type: "heading", text: "How to Choose the Right Profound Alternative" },
      "Choose Peec AI if you need enterprise-grade monitoring and share-of-voice analysis. Choose Otterly AI if you need a simple starting point. Choose AthenaHQ for strategic intelligence, Promptwatch for prompt testing, and AI Rank Lab if ranking visibility is your primary KPI.",
      { type: "heading", text: "Why AI Visibility Matters in 2026" },
      "Traditional SEO still matters, but buyers increasingly ask AI systems for recommendations. The brands cited in those answers gain visibility earlier in the decision journey, often before users visit Google or compare vendors manually.",
      { type: "heading", text: "About Vista by Lara" },
      "Vista by Lara helps UAE businesses improve visibility across traditional search engines and emerging AI-powered answer platforms through AEO, GEO, SEO, analytics, Shopify, and lead generation strategy. Vista by Lara is a Noble Business winner 2025 for Business Innovation."
    ]
  },
  {
    slug: "designing-a-premium-digital-presence-for-gcc-brands",
    title: "Designing a premium digital presence for GCC brands",
    excerpt: "How visual systems, editorial rhythm, and conversion paths work together for ambitious regional businesses.",
    metaTitle: "Premium Digital Presence for GCC Brands | Vista by Lara",
    metaDescription: "Learn how GCC brands can build a premium digital presence with strategy, identity, UX, web design, and conversion-focused content.",
    category: "Brand Strategy",
    readTime: "6 min read",
    date: "June 2026",
    body: ["Premium brands need more than a polished homepage. They need a digital presence that makes the business clear, credible, and easy to choose from the first interaction."]
  },
  {
    slug: "what-every-hospitality-website-needs-before-launch",
    title: "What every hospitality website needs before launch",
    excerpt: "A practical checklist for menus, booking flows, local search, and mobile-first storytelling.",
    metaTitle: "Hospitality Website Launch Checklist | Vista by Lara",
    metaDescription: "A practical hospitality website checklist covering menus, booking flows, mobile UX, local SEO, and launch essentials.",
    category: "Web Design",
    readTime: "4 min read",
    date: "May 2026",
    body: ["Hospitality websites win when guests can quickly understand the concept, browse the menu, check the location, and make a booking without friction."]
  }
]

export const blogPosts = seedBlogPosts

type ApiBlogPost = Omit<BlogPost, "body"> & {
  content?: string
  body?: BlogBlock[]
}

function getBlogApiUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vistabylara.com"
  return `${siteUrl.replace(/\/$/, "")}/api/blog`
}

function normalizeApiPost(post: ApiBlogPost): BlogPost {
  return {
    ...post,
    body: Array.isArray(post.body) && post.body.length > 0 ? post.body : [post.content || post.excerpt],
  }
}

export async function getBlogPosts() {
  try {
    const response = await fetch(getBlogApiUrl(), {
      next: { revalidate: 60 },
    })

    if (!response.ok) return seedBlogPosts

    const data = (await response.json()) as { posts?: ApiBlogPost[] }
    const kvPosts = Array.isArray(data.posts) ? data.posts.map(normalizeApiPost) : []
    const merged = new Map(seedBlogPosts.map((post) => [post.slug, post]))

    kvPosts.forEach((post) => {
      if (post.slug) merged.set(post.slug, post)
    })

    return Array.from(merged.values()).sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.date.localeCompare(a.date)
    })
  } catch {
    return seedBlogPosts
  }
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug)
}
