import { notFound } from "next/navigation"
import { LegacyShopifyPageView } from "@/components/legacy-shopify-page"
import {
  getLegacyShopifyMetadata,
  getLegacyShopifyPage,
  legacyShopifyPages,
} from "@/lib/legacy-shopify-pages"

type ArabicLegacyProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return legacyShopifyPages
    .filter((page) => page.path.startsWith("/ar/products/"))
    .map((page) => ({ slug: page.path.split("/").at(-1) ?? "" }))
}

export async function generateMetadata({ params }: ArabicLegacyProductPageProps) {
  const { slug } = await params
  const page = getLegacyShopifyPage(`/ar/products/${slug}`)
  if (!page) return {}
  return getLegacyShopifyMetadata(page)
}

export default async function ArabicLegacyProductPage({ params }: ArabicLegacyProductPageProps) {
  const { slug } = await params
  const page = getLegacyShopifyPage(`/ar/products/${slug}`)

  if (!page) notFound()

  return <LegacyShopifyPageView page={page} />
}
