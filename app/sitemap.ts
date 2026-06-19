import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

/**
 * XML sitemap. Includes the homepage plus its primary in-page sections
 * as anchored entries so crawlers and answer engines understand the
 * site's information architecture.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const sections = [
    { path: "/", priority: 1 },
    { path: "/#work", priority: 0.9 },
    { path: "/#services", priority: 0.9 },
    { path: "/#clients", priority: 0.7 },
    { path: "/#about", priority: 0.7 },
    { path: "/#faq", priority: 0.8 },
    { path: "/#contact", priority: 0.6 },
  ]

  return sections.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }))
}
