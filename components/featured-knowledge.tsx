import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react"

const resources = [
  {
    title: "Why AI Isn't Recommending Your Business",
    href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business",
    status: "Published",
  },
  { title: "50 AI Ranking Factors", href: "/knowledge/ai-visibility", status: "Coming Soon" },
  { title: "Complete GEO Guide", href: "/knowledge/ai-visibility", status: "Coming Soon" },
  { title: "AI Visibility Checklist", href: "/knowledge/ai-visibility", status: "Coming Soon" },
  { title: "Entity SEO Guide", href: "/knowledge/glossary", status: "Coming Soon" },
]

export function FeaturedKnowledge() {
  return (
    <section className="bg-[#05070d] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Featured Knowledge</p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              AI Visibility resources for businesses that want to be found by people and AI.
            </h2>
          </div>
          <Link href="/knowledge" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/30 px-6 font-heading text-sm font-semibold text-accent hover:bg-accent/10">
            Open knowledge hub
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {resources.map((resource) => (
            <Link key={resource.title} href={resource.href} className="rounded-3xl border border-border/60 bg-[#0d111f] p-5 transition-colors hover:border-accent/40">
              {resource.status === "Published" ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <Clock className="h-5 w-5 text-muted-foreground" />}
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{resource.status}</p>
              <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-foreground">{resource.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
