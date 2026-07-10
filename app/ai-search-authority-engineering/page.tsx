import type { Metadata } from "next"
import { InfrastructureHubPage } from "@/components/infrastructure-hub-page"
import { getHub } from "@/lib/infrastructure-hubs"
import { siteConfig } from "@/lib/site"

const hub = getHub("ai-search-authority-engineering")!

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  keywords: hub.keywords,
  alternates: { canonical: `${siteConfig.url}/${hub.slug}` },
}

export default function Page() {
  return <InfrastructureHubPage hub={hub} />
}
