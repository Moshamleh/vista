"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site"

const PLANS = [
  {
    name: "Starter",
    tag: "For early-stage brands",
    price: { monthly: 3500, annual: 2900 },
    description: "Everything you need to establish a credible presence and start converting visitors into customers.",
    features: [
      "Brand identity (logo, colours, typography)",
      "Up to 5-page marketing website",
      "Mobile-first, responsive design",
      "CMS integration",
      "Basic SEO setup",
      "2 rounds of revisions",
      "14-day post-launch support",
    ],
    highlight: false,
    cta: "Get started",
  },
  {
    name: "Growth",
    tag: "Most popular",
    price: { monthly: 8500, annual: 7200 },
    description: "Full-scale branding and product design for teams ready to scale - shipped with speed and precision.",
    features: [
      "Everything in Starter",
      "Full brand guidelines & design system",
      "Up to 15-page website or web app",
      "UX research & wireframing",
      "Framer Motion animations",
      "Analytics & conversion setup",
      "4 rounds of revisions",
      "60-day post-launch support",
      "Monthly performance report",
    ],
    highlight: true,
    cta: "Start your project",
  },
  {
    name: "Enterprise",
    tag: "For category leaders",
    price: { monthly: null, annual: null },
    description: "Bespoke engagements for complex organisations. Strategy, design, engineering, and AI - at scale.",
    features: [
      "Everything in Growth",
      "Dedicated design team",
      "Multi-brand or multi-market systems",
      "Custom AI-powered features",
      "Full-stack development",
      "Ongoing retainer available",
      "Unlimited revisions",
      "Priority SLA",
      "Quarterly brand audits",
    ],
    highlight: false,
    cta: "Talk to us",
  },
]

const ADDONS = [
  { name: "Extra revision round", price: "AED 900" },
  { name: "Additional inner page", price: "AED 600" },
  { name: "Content & copywriting", price: "AED 2,400" },
  { name: "Motion & micro-animations pack", price: "AED 1,800" },
  { name: "Generative AI feature", price: "From AED 4,000" },
  { name: "Brand photography art direction", price: "AED 3,200" },
]

function PlanCard({ plan, annual }: { plan: (typeof PLANS)[number]; annual: boolean }) {
  return (
    <Reveal>
      <div
        className={`relative flex h-full flex-col rounded-3xl border p-8 transition-shadow duration-300 hover:shadow-lg sm:p-10 ${
          plan.highlight
            ? "border-accent bg-accent text-background shadow-[0_30px_80px_-50px_rgba(87,217,255,0.35)]"
            : "border-border bg-card text-foreground"
        }`}
      >
        {plan.highlight ? (
          <span className="mb-6 inline-flex w-fit rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
            {plan.tag}
          </span>
        ) : (
          <span className="mb-6 inline-flex w-fit rounded-full border border-border px-4 py-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {plan.tag}
          </span>
        )}

        <h3 className="font-heading text-3xl font-medium tracking-tight">{plan.name}</h3>

        <div className="mt-6">
          {plan.price.monthly !== null ? (
            <p className="font-heading text-5xl font-medium tracking-tight">
              AED {annual ? plan.price.annual!.toLocaleString() : plan.price.monthly!.toLocaleString()}
              <span className={`ml-2 text-base font-normal ${plan.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                / mo
              </span>
            </p>
          ) : (
            <p className="font-heading text-5xl font-medium tracking-tight">Custom AED</p>
          )}
          {plan.price.monthly !== null && annual && (
            <p className={`mt-1 text-sm ${plan.highlight ? "text-background/60" : "text-muted-foreground"}`}>
              Billed annually - save {Math.round(((plan.price.monthly! - plan.price.annual!) / plan.price.monthly!) * 100)}%
            </p>
          )}
        </div>

        <p className={`mt-6 text-base leading-relaxed ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}>
          {plan.description}
        </p>

        <ul className="mt-8 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-background/80" : "text-accent"}`} />
              <span className={plan.highlight ? "text-background/80" : "text-foreground/80"}>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-base font-medium transition-transform hover:scale-[1.02] ${
            plan.highlight ? "bg-background text-foreground hover:bg-background/90" : "bg-accent text-background hover:bg-accent/90"
          }`}
        >
          {plan.cta}
        </a>
      </div>
    </Reveal>
  )
}

export function PricingPlans() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="plans" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Our plans</p>
          <h2 className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-4xl">
            Pick the package that fits where you are - and where you want to go.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col justify-end gap-6">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              All plans are delivered by the same senior team. No juniors, no outsourcing - just focused execution on
              your brief.
            </p>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                onClick={() => setAnnual((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors ${
                  annual ? "border-accent bg-accent/20" : "border-border bg-[#101526]"
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className={`inline-block h-4 w-4 rounded-full ${annual ? "bg-accent" : "bg-accent/70"}`}
                  style={{ marginLeft: annual ? "calc(100% - 1.25rem)" : "0.125rem" }}
                />
              </button>
              <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual
                <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                  Save 15%
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard key={plan.name} plan={plan} annual={annual} />
        ))}
      </div>

      <Reveal className="mt-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Optional add-ons</p>
        <h2 className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-4xl">
          Extend any plan.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-[#0d111f]">
          {ADDONS.map((addon) => (
            <div key={addon.name} className="flex items-center justify-between gap-6 px-8 py-5 transition-colors hover:bg-[#101526]">
              <span className="font-medium text-foreground">{addon.name}</span>
              <span className="shrink-0 rounded-full border border-accent/15 bg-[#0c1221] px-4 py-1.5 text-sm font-medium text-accent">
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
