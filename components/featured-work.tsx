import Link from "next/link"
import { ArrowUpRight, DatabaseZap } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"

const featured = caseStudies.slice(0, 6)

export function FeaturedWork() {
  return (
    <section id="case-studies" className="relative overflow-hidden bg-[#030408] px-5 py-28 sm:px-8 sm:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">
              Section 06 / Digital Infrastructure Registry
            </p>
            <h2 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
              Engineering registry modules built like technical incident reports.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Vista by Lara classifies each client as a sovereign digital asset across AI-search sovereignty,
              infrastructure resilience, and conversion engineering for Dubai, UAE, and GCC markets.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 self-start text-base font-medium text-foreground transition-colors hover:text-accent lg:self-end"
          >
            <span className="border-b border-foreground/30 pb-0.5 transition-colors hover:border-accent">
              Access Engineering Registry
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group min-h-[320px] border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-accent/[0.055]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {study.domain}
                  </p>
                  <h3 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground transition group-hover:text-accent">
                    {study.client}
                  </h3>
                </div>
                <DatabaseZap className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <p className="mt-8 text-lg leading-7 text-foreground">{study.technicalImpact}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {study.status}
                </span>
                <span className="border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {study.institutionalDomain}
                </span>
              </div>
              <p className="mt-8 text-sm font-semibold text-foreground transition group-hover:text-accent">
                Access Incident Report
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
