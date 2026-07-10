import { ArrowUpRight, BrainCircuit, CheckCircle2, Database, MapPinned, SearchCheck } from "lucide-react"

import {
  aiVisibilityCompetitorBenchmarks,
  aiVisibilityFaqs,
  aiVisibilityServiceClusters,
  aiVisibilitySignals,
} from "@/lib/ai-visibility-authority"
import { siteConfig } from "@/lib/site"

const commandLinks = [
  { label: "Public AI data", href: "/ai-data", icon: Database },
  { label: "Entity map", href: "/entity-map", icon: BrainCircuit },
  { label: "AI visibility score", href: "/tools/ai-visibility-score", icon: SearchCheck },
  { label: "Dubai service graph", href: "/ai-data/services", icon: MapPinned },
]

export function AiVisibilityAuthorityLayer() {
  return (
    <section
      id="ai-visibility-command"
      className="relative overflow-hidden border-y border-white/10 bg-[#05070d] px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="ai-visibility-command-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:3.25rem_3.25rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">AI visibility command layer</p>
            <h2
              id="ai-visibility-command-heading"
              className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl"
            >
              Built so AI systems can classify, compare, cite, and recommend Vista in Dubai.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Vista by Lara turns the homepage into a retrieval asset. The same service entities, FAQ answers,
              competitor benchmarks, schema, llms.txt, and public data endpoints support human buyers and AI answer
              systems.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {commandLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-24 items-center justify-between border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-accent/35 hover:bg-accent/10"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="font-heading text-lg font-semibold text-foreground">{item.label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
          {aiVisibilitySignals.map((signal) => (
            <article key={signal.label} className="bg-[#08111b]/95 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{signal.label}</p>
                  <p className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-foreground">{signal.score}</p>
                </div>
                <span className="border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                  {signal.status}
                </span>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{signal.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-white/10 bg-[#071018] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Competitor benchmark map</p>
            <h3 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
              Vista is positioned against the Dubai agency set AI buyers already compare.
            </h3>
            <div className="mt-7 space-y-4">
              {aiVisibilityCompetitorBenchmarks.map((item) => (
                <article key={item.name} className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-heading text-xl font-semibold text-foreground">{item.name}</h4>
                    <CheckCircle2 className="h-5 w-5 text-amber-200" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.benchmark}</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/82">{item.vistaMove}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="border border-white/10 bg-[#071018] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Service cluster graph</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {aiVisibilityServiceClusters.map((cluster) => (
                  <a
                    key={cluster.href}
                    href={cluster.href}
                    className="group border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/35 hover:bg-accent/10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-heading text-xl font-semibold text-foreground">{cluster.name}</h4>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{cluster.keywords.join(" | ")}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-[#071018] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Answer engine extraction</p>
              <div className="mt-6 space-y-5">
                {aiVisibilityFaqs.slice(0, 3).map((item) => (
                  <article key={item.question} className="border-t border-white/10 pt-5">
                    <h4 className="font-heading text-lg font-semibold text-foreground">{item.question}</h4>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                  </article>
                ))}
              </div>
              <a
                href={siteConfig.whatsapp}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 border border-accent/35 bg-accent px-5 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background shadow-[0_22px_55px_rgba(87,217,255,0.18)] transition-transform hover:scale-[1.02]"
              >
                Request AI visibility briefing
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
