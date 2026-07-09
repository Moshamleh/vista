import { notFound } from "next/navigation"
import { LegacyShopifyPageView } from "@/components/legacy-shopify-page"
import {
  getLegacyShopifyMetadata,
  getLegacyShopifyPage,
  legacyShopifyPages,
} from "@/lib/legacy-shopify-pages"

type ArabicLegacyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return legacyShopifyPages
    .filter((page) => page.path.startsWith("/ar/pages/"))
    .map((page) => ({ slug: page.path.split("/").at(-1) ?? "" }))
}

export async function generateMetadata({ params }: ArabicLegacyPageProps) {
  const { slug } = await params
  const page = getLegacyShopifyPage(`/ar/pages/${slug}`)
  if (!page) return {}
  return getLegacyShopifyMetadata(page)
}

export default async function ArabicLegacyPage({ params }: ArabicLegacyPageProps) {
  const { slug } = await params
  const page = getLegacyShopifyPage(`/ar/pages/${slug}`)

  if (!page) notFound()

  return <LegacyShopifyPageView page={page} />
}
