import { ArrowUpRight, DatabaseZap, FileText, GitBranch, Landmark, ShieldCheck, Trophy } from "lucide-react"

const proofItems = [
  {
    icon: DatabaseZap,
    label: "Public AI Data",
    value: "11 endpoints",
    detail: "Services, entities, FAQ, authors, competitors, and tools exposed for AI retrieval.",
  },
  {
    icon: FileText,
    label: "Knowledge Platform",
    value: "Research-grade",
    detail: "AI summaries, executive answers, FAQs, schema, changelogs, and entity maps.",
  },
  {
    icon: GitBranch,
    label: "Entity Graph",
    value: "Dubai linked",
    detail: "Services, technologies, competitors, proof nodes, and geographic entities connected.",
  },
  {
    icon: ShieldCheck,
    label: "Schema Layer",
    value: "FAQ + Service",
    detail: "Crawlable structured data for service understanding and answer extraction.",
  },
  {
    icon: Landmark,
    label: "UAE/GCC Scope",
    value: "Dubai first",
    detail: "Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman.",
  },
  {
    icon: Trophy,
    label: "Proof Registry",
    value: "Case studies",
    detail: "Technical briefings turn client work into machine-readable credibility signals.",
  },
]

export function HomeProofBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#071018] px-5 py-16 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Proof infrastructure</p>
            <h2 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              The trust layer competitors show with logos, Vista shows with crawlable evidence.
            </h2>
          </div>
          <a
            href="/ai-data"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/30 px-6 font-heading text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            Open AI data index
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {proofItems.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.label} className="min-h-56 bg-[#0b111d]/92 p-6 backdrop-blur">
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
                <h3 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground">{item.value}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
