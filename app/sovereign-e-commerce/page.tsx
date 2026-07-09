import type { Metadata } from "next"
import { InfrastructureHubPage } from "@/components/infrastructure-hub-page"
import { getHub } from "@/lib/infrastructure-hubs"
import { siteConfig } from "@/lib/site"

const hub = getHub("sovereign-luxury-infrastructure")!

export const metadata: Metadata = {
  title: "Sovereign E-commerce Infrastructure Dubai | Vista",
  description:
    "A Dubai and GCC topic masterclass for sovereign e-commerce, Headless Shopify, machine-readable product data, and AI-search authority.",
  keywords: hub.keywords,
  alternates: { canonical: `${siteConfig.url}/sovereign-e-commerce` },
}

export default function Page() {
  return <InfrastructureHubPage hub={hub} pageSlug="sovereign-e-commerce" />
}
