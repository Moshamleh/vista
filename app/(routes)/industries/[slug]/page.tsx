import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IndustryPage } from "@/components/industry-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getIndustry, industries } from "@/lib/industries"
import { siteConfig } from "@/lib/site"

type IndustryRouteProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: IndustryRouteProps): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) return {}

  const url = `${siteConfig.url}/industries/${industry.slug}`

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle,
      description: industry.metaDescription,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function IndustryRoute({ params }: IndustryRouteProps) {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) notFound()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <IndustryPage {...industry} />
      <SiteFooter />
    </div>
  )
}
