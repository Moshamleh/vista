import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog"
import { caseStudies } from "@/lib/case-studies"
import { industries } from "@/lib/industries"
import { infrastructureHubs } from "@/lib/infrastructure-hubs"
import { getAllKnowledgeArticles } from "@/lib/knowledge/content"
import { legacyShopifyPages } from "@/lib/legacy-shopify-pages"
import { competitors } from "@/lib/knowledge-graph"
import { aiTools } from "@/lib/ai-tools/tools"
import { siteConfig } from "@/lib/site"

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
type PageEntry = {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const blogPosts = await getBlogPosts()
  const knowledgeArticles = getAllKnowledgeArticles()

  const pages: PageEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/ar", priority: 0.96, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/seo-optimization", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/aeo-geo", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/web-design-dubai", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/web-development-dubai", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/shopify-development-dubai", priority: 0.94, changeFrequency: "monthly" },
    { path: "/services/ui-ux-design-dubai", priority: 0.94, changeFrequency: "monthly" },
    { path: "/services/branding", priority: 0.94, changeFrequency: "monthly" },
    { path: "/services/uae-ai-agent", priority: 0.94, changeFrequency: "monthly" },
    { path: "/services/google-ads-dubai", priority: 0.94, changeFrequency: "monthly" },
    { path: "/services/digital-marketing", priority: 0.94, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.88, changeFrequency: "monthly" },
    { path: "/industries/fragrance", priority: 0.88, changeFrequency: "monthly" },
    { path: "/industries/retail", priority: 0.88, changeFrequency: "monthly" },
    { path: "/industries/building-maintenance", priority: 0.88, changeFrequency: "monthly" },
    ...industries.map((industry) => ({
      path: `/industries/${industry.slug}`,
      priority: 0.88,
      changeFrequency: "monthly" as const,
    })),
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sovereign-e-commerce", priority: 0.93, changeFrequency: "monthly" },
    ...infrastructureHubs.map((hub) => ({
      path: `/${hub.slug}`,
      priority: 0.92,
      changeFrequency: "monthly" as const,
    })),
    { path: "/case-studies", priority: 0.86, changeFrequency: "monthly" },
    ...caseStudies.map((study) => ({
      path: `/case-studies/${study.slug}`,
      priority: 0.78,
      changeFrequency: "monthly" as const,
    })),
    { path: "/clients", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/compare", priority: 0.86, changeFrequency: "monthly" },
    ...competitors.map((competitor) => ({
      path: `/compare/${competitor.id.replace(/^competitor-/, "")}`,
      priority: 0.84,
      changeFrequency: "monthly" as const,
    })),
    { path: "/pricing", priority: 0.74, changeFrequency: "monthly" },
    { path: "/knowledge", priority: 0.9, changeFrequency: "weekly" },
    { path: "/knowledge/ai-visibility", priority: 0.92, changeFrequency: "weekly" },
    { path: "/knowledge/glossary", priority: 0.82, changeFrequency: "monthly" },
    { path: "/knowledge/timeline", priority: 0.76, changeFrequency: "monthly" },
    { path: "/entity-map", priority: 0.86, changeFrequency: "weekly" },
    { path: "/research", priority: 0.86, changeFrequency: "weekly" },
    { path: "/datasets", priority: 0.78, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.82, changeFrequency: "monthly" },
    { path: "/tools/ai-visibility-score", priority: 0.78, changeFrequency: "monthly" },
    { path: "/ai-tools", priority: 0.9, changeFrequency: "weekly" },
    { path: "/dashboard", priority: 0.9, changeFrequency: "weekly" },
    ...aiTools.map((tool) => ({
      path: `/ai-tools/${tool.slug}`,
      priority: 0.88,
      changeFrequency: "weekly" as const,
    })),
    { path: "/trust", priority: 0.82, changeFrequency: "monthly" },
    { path: "/ai", priority: 0.84, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.72,
      changeFrequency: "weekly" as const,
    })),
    ...knowledgeArticles.map((article) => ({
      path: article.meta.path,
      priority: 0.86,
      changeFrequency: "monthly" as const,
    })),
    ...knowledgeArticles.map((article) => ({
      path: `/ar${article.meta.path}`,
      priority: 0.82,
      changeFrequency: "monthly" as const,
    })),
    ...legacyShopifyPages.map((page) => ({
      path: page.path,
      priority: page.kind === "article" ? 0.66 : 0.62,
      changeFrequency: "monthly" as const,
    })),
    { path: "/careers", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ]

  const arabicPages: PageEntry[] = pages
    .filter((page) => page.path !== "/" && !page.path.startsWith("/ar"))
    .map((page) => ({
      path: `/ar${page.path}`,
      priority: Math.max(0.5, page.priority - 0.04),
      changeFrequency: page.changeFrequency,
    }))

  const uniquePages = new Map<string, PageEntry>()
  for (const page of [...pages, ...arabicPages]) {
    uniquePages.set(page.path, page)
  }

  return Array.from(uniquePages.values()).map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
