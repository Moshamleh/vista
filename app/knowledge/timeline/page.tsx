import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Knowledge Timeline | Vista by Lara",
  description:
    "Vista by Lara knowledge timeline for AI search updates, Google updates, topic history, and versioned resource changes.",
  alternates: { canonical: `${siteConfig.url}/knowledge/timeline` },
}

const events = [
  {
    date: "30 June 2026",
    title: "AI Knowledge Infrastructure Foundation",
    body: "Published the AI Visibility hub, glossary, tool placeholder, entity map, research center, API endpoints, trust dashboard, and AI agent index.",
  },
  {
    date: "30 June 2026",
    title: "Knowledge Asset #001 Version 1.0",
    body: "Published the first partial flagship guide: Why AI Isn't Recommending Your Business.",
  },
  {
    date: "Roadmap",
    title: "AI Search Change Tracking",
    body: "Future timeline entries will track Google updates, AI search platform changes, Vista research revisions, and resource version history.",
  },
]

export default function KnowledgeTimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <section className="rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
          <Clock className="h-8 w-8 text-accent" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Knowledge Timeline</p>
          <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Topic History, AI Updates, and Versioned Knowledge Changes
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
            The timeline records how AI visibility, search, GEO, tooling, datasets, and Vista resources evolve over time.
          </p>
        </section>

        <section className="mt-10 grid gap-5">
          {events.map((event) => (
            <article key={`${event.date}-${event.title}`} className="rounded-3xl border border-border/60 bg-[#0d111f] p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{event.date}</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">{event.title}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{event.body}</p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
