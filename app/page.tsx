import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { RadialPattern } from "@/components/radial-pattern"
import { Services } from "@/components/services"
import { Clients } from "@/components/clients"
import { FeaturedWork } from "@/components/featured-work"
import { Stats } from "@/components/stats"
import { Faq } from "@/components/faq"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <RadialPattern />
        <Clients />
        <Services />
        <FeaturedWork />
        <Stats />
        <Faq />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
