import { siteConfig } from "@/lib/site"

type Outcome = {
  current: string
  goal: string
  result: string
}

type ConversionPageProps = {
  eyebrow: string
  title: string
  subtitle: string
  problem: string
  solution: string
  outcome: Outcome
  keywords: string[]
}

function Hero({ eyebrow, title, subtitle }: Pick<ConversionPageProps, "eyebrow" | "title" | "subtitle">) {
  return (
    <section className="mx-auto max-w-[800px] text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 text-xl leading-8 text-muted-foreground">{subtitle}</p>
    </section>
  )
}

export function ConversionPage({ eyebrow, title, subtitle, problem, solution, outcome, keywords }: ConversionPageProps) {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <Hero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="mt-16 grid gap-8">
        <section className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">The Problem</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{problem}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span key={keyword} className="rounded-full border border-accent/15 px-4 py-2 text-sm text-muted-foreground">
                {keyword}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-accent/20 bg-[#07131d] p-7 shadow-[0_30px_90px_-70px_rgba(87,217,255,0.4)] sm:p-9">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">The Vista Solution</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{solution}</p>
        </section>

        <section className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7 sm:p-9">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">The Outcome</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/30 bg-background/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Current State</p>
              <p className="mt-3 text-base leading-7 text-foreground/85">{outcome.current}</p>
            </div>
            <div className="rounded-2xl border border-border/30 bg-background/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Goal</p>
              <p className="mt-3 text-base leading-7 text-foreground/85">{outcome.goal}</p>
            </div>
            <div className="rounded-2xl border border-accent/25 bg-accent/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Vista Result</p>
              <p className="mt-3 text-base leading-7 text-foreground/85">{outcome.result}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-accent/25 bg-accent/10 p-7 sm:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">Ready to scale?</h2>
              <p className="mt-3 text-lg leading-7 text-muted-foreground">Let&apos;s audit your store.</p>
            </div>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              Request Growth Audit
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
