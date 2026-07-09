import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"
import {
  competitorGapServices,
  getCompetitorGapService,
  getCompetitorGapServiceMetadata,
} from "@/lib/competitor-gap-services"

type ServiceSlugPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return competitorGapServices.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServiceSlugPageProps) {
  const { slug } = await params
  const service = getCompetitorGapService(slug)

  if (!service) {
    return {}
  }

  return getCompetitorGapServiceMetadata(service)
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { slug } = await params
  const service = getCompetitorGapService(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage {...service} />
      <SiteFooter />
    </div>
  )
}
