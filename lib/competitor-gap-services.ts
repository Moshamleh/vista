import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"

export type CompetitorGapService = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  subtitle: string
  intro: string
  serviceName: string
  serviceType: string
  keywords: string[]
  deliverables: string[]
  process: string[]
  outcomes: string[]
  districts: string[]
  faqs: { question: string; answer: string }[]
}

export const competitorGapServices: CompetitorGapService[] = []

export function getCompetitorGapService(slug: string) {
  return competitorGapServices.find((service) => service.slug === slug)
}

export function getCompetitorGapServiceMetadata(service: CompetitorGapService): Metadata {
  const url = `${siteConfig.url}/services/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [siteConfig.ogImage],
    },
  }
}
