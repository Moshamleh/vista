import { notFound } from "next/navigation"
import { LegacyShopifyPageView } from "@/components/legacy-shopify-page"
import {
  getLegacyShopifyMetadata,
  getLegacyShopifyPage,
  legacyShopifyPages,
} from "@/lib/legacy-shopify-pages"

type LegacyRouteProps = {
  params: Promise<{ legacy?: string[] }>
}

function getPath(legacy?: string[]) {
  return `/${(legacy ?? []).join("/")}`.replace(/\/$/u, "") || "/"
}

export function generateStaticParams() {
  return legacyShopifyPages
    .filter((page) => !page.path.startsWith("/ar/"))
    .map((page) => ({ legacy: page.path.split("/").filter(Boolean) }))
}

export async function generateMetadata({ params }: LegacyRouteProps) {
  const { legacy } = await params
  const page = getLegacyShopifyPage(getPath(legacy))
  if (!page) return {}
  return getLegacyShopifyMetadata(page)
}

export default async function LegacyRoutePage({ params }: LegacyRouteProps) {
  const { legacy } = await params
  const page = getLegacyShopifyPage(getPath(legacy))

  if (!page) notFound()

  return <LegacyShopifyPageView page={page} />
}
