import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog"
import { industries } from "@/lib/industries"
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

  const pages: PageEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/ai-ecommerce", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/seo-optimization", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/digital-marketing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/maintenance-management", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/web-design-dubai", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/web-development-dubai", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/ecommerce-development-dubai", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/shopify-development-dubai", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/ui-ux-design-dubai", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/seo-services-dubai", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/branding", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/digital-products", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/websites", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/development", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/generative-ai", priority: 0.9, changeFrequency: "monthly" },
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
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/clients", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.72,
      changeFrequency: "weekly" as const,
    })),
    { path: "/careers", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
