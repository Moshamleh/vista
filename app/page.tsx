import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Clients } from "@/components/clients"
import { FeaturedWork } from "@/components/featured-work"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Clients />
      <Services />
      <FeaturedWork />
      <Stats />
      <CTA />
      <SiteFooter />
    </main>
  )
}
