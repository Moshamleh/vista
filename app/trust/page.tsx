import type { Metadata } from "next"
import Link from "next/link"
import { Award, BadgeCheck, BookOpen, BriefcaseBusiness, Newspaper } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { knowledgeObjects } from "@/lib/knowledge-graph"
import { siteConfig } from "@/lib/site"

const mediaCoverage = [
  {
    outlet: "Sortlist",
    date: "Agency directory ranking",
    title: "The 10 Best Google Ads Agencies in Abu Dhabi",
    description: "Vista by Lara is listed among Sortlist's top Google Ads agencies in Abu Dhabi, UAE, based on client reviews on the platform.",
    href: "https://www.sortlist.com/s/google-ads/abu-dhabi-ae",
    featured: true,
  },
  {
    outlet: "IssueWire",
    date: "November 12, 2025",
    title: "Vista by Lara Launches Crawl-Truth AI to Protect Brands From Google's New AI-Gen Filters and Hidden Visibility Bans",
    description: "Press-release distribution announcing Vista by Lara's Crawl-Truth AI initiative.",
    href: "https://www.issuewire.com/vista-by-lara-launches-crawl-truth-ai-to-protect-brands-from-googles-new-ai-gen-filters-and-hidden-visibility-bans-1848609555467419",
  },
  {
    outlet: "MENAFN",
    date: "November 14, 2025",
    title: "Lara Eros Warns UAE Businesses: Shortcuts May Fool Google Once, But They Always Betray Your Brand",
    description: "Press-release distribution carrying commentary from Lara Eros Farbactian on UAE SEO practices.",
    href: "https://menafn.com/1110343284/Lara-Eros-Warns-UAE-Businesses-Shortcuts-May-Fool-Google-Once-But-They-Always-Betray-Your-Brand",
  },
  {
    outlet: "Zawya",
    date: "September 20, 2025",
    title: "Vista by Lara Launches AI-Powered Shopify & Growth Studio for UAE Businesses",
    description: "Press-release distribution announcing Vista by Lara's Shopify and growth studio offering.",
    href: "https://www.zawya.com/en/press-release/companies-news/vista-by-lara-launches-ai-powered-shopify-and-growth-studio-for-uae-businesses-bj60npqi",
  },
  {
    outlet: "GoodFirms",
    date: "Company profile",
    title: "Vista by Lara on GoodFirms",
    description: "Listed company profile on the GoodFirms B2B research and reviews platform.",
    href: "https://www.goodfirms.co/company/vista-by-lara",
  },
]

export const metadata: Metadata = {
  title: "Trust Dashboard | Vista by Lara",
  description:
    "Vista by Lara trust dashboard with awards, client proof, case studies, research, verified business information, and EEAT signals.",
  alternates: { canonical: `${siteConfig.url}/trust` },
  openGraph: {
    title: "Trust Dashboard | Vista by Lara",
    description: "A public trust dashboard for Vista by Lara authority, EEAT, case studies, research, awards, and verified business signals.",
    url: `${siteConfig.url}/trust`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

const trustSignals = [
  { label: "Awards", value: "Noble Business Winner 2025 - Business Innovation", icon: Award },
  { label: "Founded", value: `Operating since ${siteConfig.foundingYear}, UAE digital infrastructure specialists`, icon: BadgeCheck },
  { label: "Case Studies", value: "Technical registry for infrastructure, commerce, performance, and resilience work", icon: BriefcaseBusiness },
  { label: "Research", value: "AI Visibility Index, UAE Google Ads benchmarks, and AI recommendation studies in roadmap", icon: BookOpen },
]

export default function TrustPage() {
  const awards = knowledgeObjects.filter((item) => item.type === "Award")
  const research = knowledgeObjects.filter((item) => item.type === "Research")
  const featuredMedia = mediaCoverage.find((item) => item.featured)
  const otherMedia = mediaCoverage.filter((item) => !item.featured)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Trust Dashboard</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Public EEAT Signals for Vista by Lara
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            The trust dashboard centralizes awards, client results, case studies, research, reviewed resources, verified business information, and authority signals for users, search engines, and AI systems.
          </p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-4">
          {trustSignals.map((signal) => {
            const Icon = signal.icon
            return (
              <article key={signal.label} className="rounded-3xl border border-border/60 bg-[#0d111f] p-6">
                <Icon className="h-5 w-5 text-accent" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{signal.label}</p>
                <h2 className="mt-3 font-heading text-xl font-semibold leading-tight text-foreground">{signal.value}</h2>
              </article>
            )
          })}
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Awards and Verified Signals</h2>
            {awards.map((item) => (
              <p key={item.uuid} className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
            ))}
          </article>
          <article className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Research Roadmap</h2>
            <div className="mt-5 grid gap-3">
              {research.map((item) => (
                <Link key={item.uuid} href={item.href} className="rounded-2xl border border-border/50 bg-background/35 p-4 text-foreground/82 hover:border-accent/40 hover:text-accent">
                  {item.name}
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <Newspaper className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Media Coverage</h2>
          </div>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            Press-release distribution and directory listings referencing Vista by Lara. These are distribution
            placements, not editorial coverage or awards.
          </p>

          {featuredMedia && (
            <a
              href={featuredMedia.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-6 flex flex-col gap-4 rounded-3xl border border-accent/40 bg-[#0d111f] p-7 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  <BadgeCheck className="h-4 w-4" /> Featured listing &middot; {featuredMedia.outlet}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-foreground">{featuredMedia.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{featuredMedia.description}</p>
              </div>
            </a>
          )}

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {otherMedia.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-3xl border border-border/60 bg-[#0d111f] p-6 transition-colors hover:border-accent/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.outlet} &middot; {item.date}</p>
                <h3 className="mt-3 font-heading text-lg font-semibold leading-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
