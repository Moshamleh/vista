import type { Metadata } from "next"
import { InfrastructureHubPage } from "@/components/infrastructure-hub-page"
import { getHub } from "@/lib/infrastructure-hubs"
import { siteConfig } from "@/lib/site"

const hub = getHub("high-ticket-conversion-architecture")!

export const metadata: Metadata = {
  title: "High-Ticket Conversion Architecture Dubai | Vista",
  description: hub.description,
  keywords: hub.keywords,
  alternates: { canonical: `${siteConfig.url}/${hub.slug}` },
}

export default function Page() {
  return <InfrastructureHubPage hub={hub} />
}
