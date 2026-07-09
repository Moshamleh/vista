import { CheckCircle2, MinusCircle } from "lucide-react"

const rows = [
  {
    area: "Primary positioning",
    market: "Broad digital marketing, web design, SEO, PPC, social, CRM, and production.",
    vista: "AI visibility, machine-readable authority, technical SEO, AEO, GEO, and conversion infrastructure.",
  },
  {
    area: "Proof style",
    market: "Client logos, awards, large team counts, and portfolio snapshots.",
    vista: "Public AI data, entity graph, schema, knowledge assets, technical briefings, and case-study registry.",
  },
  {
    area: "AI-search readiness",
    market: "Often presented as a service label or SEO subcategory.",
    vista: "Built into llms.txt, /ai-data, schema, FAQ architecture, knowledge articles, and internal links.",
  },
  {
    area: "Buyer path",
    market: "Quote forms, contact pages, and campaign CTAs.",
    vista: "Principal-to-principal technical briefing, WhatsApp routing, entity-led service pages, and audit workflows.",
  },
]

const competitors = ["Nexa", "Digital Gravity", "Global Media Insight", "United SEO"]

export function CompetitorComparison() {
  return (
    <section className="relative overflow-hidden bg-[#030408] px-5 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(87,217,255,0.12),transparent_34%),radial-gradient(circle_at_88%_70%,rgba(99,102,241,0.12),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Competitive design position</p>
          <h2 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
            Built to compete with Dubai agencies without looking like another agency template.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Nexa, Digital Gravity, Global Media Insight, and United SEO present scale through broad services, logos,
            and case studies. Vista should keep its robot and globe, then surround them with stronger evidence systems,
            sharper service grouping, and machine-readable proof.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {competitors.map((name) => (
            <span key={name} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-muted-foreground">
              Compared against {name}
            </span>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10">
          <div className="grid bg-[#0b111d] text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground md:grid-cols-[0.8fr_1.1fr_1.1fr]">
            <div className="border-b border-white/10 p-5 md:border-r">Design layer</div>
            <div className="border-b border-white/10 p-5 md:border-r">Typical competitor pattern</div>
            <div className="border-b border-white/10 p-5">Vista upgrade direction</div>
          </div>
          {rows.map((row) => (
            <div key={row.area} className="grid bg-[#071018]/95 md:grid-cols-[0.8fr_1.1fr_1.1fr]">
              <div className="border-b border-white/10 p-5 font-heading text-xl font-semibold text-foreground md:border-r">{row.area}</div>
              <div className="border-b border-white/10 p-5 text-sm leading-7 text-muted-foreground md:border-r">
                <div className="flex gap-3">
                  <MinusCircle className="mt-1 h-4 w-4 shrink-0 text-foreground/35" />
                  <span>{row.market}</span>
                </div>
              </div>
              <div className="border-b border-white/10 p-5 text-sm leading-7 text-foreground/80">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span>{row.vista}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
