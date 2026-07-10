"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import type { FAQItem } from "@/lib/knowledge/types"

export function ActiveTableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observers = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (observers.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 0.4, 0.8] },
    )

    observers.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  return (
    <nav className="border border-accent/15 bg-[#0d111f] p-5 lg:sticky lg:top-28" aria-label="Knowledge article table of contents">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.22em] text-accent lg:pointer-events-none"
        aria-expanded={open}
      >
        Quick navigation
        <ChevronDown className={`h-4 w-4 transition-transform lg:hidden ${open ? "rotate-180" : ""}`} />
      </button>
      <ol className={`mt-5 space-y-2 text-sm leading-6 ${open ? "block" : "hidden lg:block"}`}>
        {headings.map((heading) => {
          const active = activeId === heading.id
          return (
            <li key={heading.id}>
              <Link
                href={`#${heading.id}`}
                onClick={() => setOpen(false)}
                aria-current={active ? "location" : undefined}
                className={`block border-l-2 py-1 pl-3 transition-colors ${
                  active ? "border-accent text-accent" : "border-accent/10 text-muted-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                {heading.text}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

const calculatorFields = [
  "Structured data",
  "Business profile",
  "Reviews",
  "Content depth",
  "Internal linking",
  "Mentions",
  "Entity consistency",
  "Performance",
  "Authority",
]

export function AIVisibilityCalculator() {
  const [scores, setScores] = useState(() => Object.fromEntries(calculatorFields.map((field) => [field, 3])))
  const overallScore = useMemo(() => {
    const total = Object.values(scores).reduce((sum, value) => sum + value, 0)
    return Math.round((total / (calculatorFields.length * 5)) * 100)
  }, [scores])

  const priorities = Object.entries(scores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([field]) => field)

  return (
    <section id="ai-visibility-calculator" className="border border-accent/20 bg-[#07111a] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Interactive calculator placeholder</p>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-foreground">AI Visibility Calculator</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="grid gap-4">
          {calculatorFields.map((field) => (
            <label key={field} className="grid gap-2 text-sm text-muted-foreground">
              <span className="flex items-center justify-between">
                <span>{field}</span>
                <span className="text-accent">{scores[field]}/5</span>
              </span>
              <input
                id={`readiness-${field.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                name={`readiness-${field.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                type="range"
                min="0"
                max="5"
                value={scores[field]}
                onChange={(event) => setScores((current) => ({ ...current, [field]: Number(event.target.value) }))}
                className="w-full accent-cyan-300"
              />
            </label>
          ))}
        </div>
        <div className="border border-accent/15 bg-[#0d111f] p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Overall score</p>
          <p className="mt-4 font-heading text-6xl text-foreground">{overallScore}</p>
          <p className="mt-1 text-sm text-muted-foreground">out of 100</p>
          <h3 className="mt-6 font-semibold text-foreground">Priority improvements</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            {priorities.map((priority) => <li key={priority}>- {priority}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function ExpandableDecisionTree({ items }: { items: { condition: string; action: string }[] }) {
  const [open, setOpen] = useState(items[0]?.condition ?? "")

  return (
    <section id="decision-tree" className="border border-accent/15 bg-[#0a0f1c] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Decision tree</p>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-foreground">AI Recommendation Diagnosis Decision Tree</h2>
      <div className="mt-5 divide-y divide-accent/10">
        {items.map((item) => {
          const expanded = open === item.condition
          return (
            <div key={item.condition} className="py-4">
              <button
                type="button"
                onClick={() => setOpen(expanded ? "" : item.condition)}
                className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-foreground"
                aria-expanded={expanded}
              >
                <span>If {item.condition}</span>
                <ChevronDown className={`h-5 w-5 text-accent transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded && <p className="mt-3 text-base leading-relaxed text-muted-foreground">Then {item.action}</p>}
              {expanded && (
                <a href="#call-to-action" className="mt-4 inline-flex text-sm font-semibold text-accent">
                  Continue to recommended action
                </a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function InteractiveChecklist({ title, items }: { title: string; items: string[] }) {
  const storageKey = `vista-checklist-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  const [checked, setChecked] = useState<string[]>([])

  useEffect(() => {
    try {
      setChecked(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as string[])
    } catch {
      setChecked([])
    }
  }, [storageKey])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [checked, storageKey])

  return (
    <section id="checklist" className="border border-accent/15 bg-[#07111a] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-3xl font-medium leading-tight text-foreground">{title}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => setChecked([])} className="border border-accent/20 px-3 py-2 text-xs font-semibold text-accent">
            Reset
          </button>
          <button type="button" onClick={() => window.print()} className="border border-accent/20 px-3 py-2 text-xs font-semibold text-accent">
            Print
          </button>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const selected = checked.includes(item)
          return (
            <label key={item} className="flex cursor-pointer items-start gap-3 border border-accent/10 bg-[#0d111f] p-4 text-base leading-6 text-muted-foreground">
              <input
                id={`checklist-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}`}
                name={`checklist-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}`}
                type="checkbox"
                checked={selected}
                onChange={() => setChecked((current) => (selected ? current.filter((value) => value !== item) : [...current, item]))}
                className="sr-only"
              />
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${selected ? "border-accent bg-accent text-background" : "border-accent/30"}`}>
                {selected && <Check className="h-3.5 w-3.5" />}
              </span>
              <span>{item}</span>
            </label>
          )
        })}
      </div>
    </section>
  )
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(items[0]?.id ?? "")
  const allOpen = open === "__all__"

  return (
    <section id="faq" className="border border-accent/15 bg-[#07111a] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-3xl font-medium leading-tight text-foreground">FAQ for AI Visibility, Digital Trust, and GEO</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => setOpen("__all__")} className="border border-accent/20 px-3 py-2 text-xs font-semibold text-accent">
            Expand all
          </button>
          <button type="button" onClick={() => setOpen("")} className="border border-accent/20 px-3 py-2 text-xs font-semibold text-accent">
            Collapse all
          </button>
        </div>
      </div>
      <div className="mt-6 divide-y divide-accent/10">
        {items.map((item) => {
          const expanded = allOpen || open === item.id
          return (
            <div id={item.id} key={item.id} className="scroll-mt-28 py-4">
              <button
                type="button"
                onClick={() => setOpen(open === item.id ? "" : item.id)}
                className="flex w-full items-center justify-between gap-4 text-left text-xl font-semibold leading-tight text-foreground"
                aria-expanded={expanded}
              >
                <span>{item.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-accent transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded && (
                <div className="mt-3">
                  <p className="text-base leading-relaxed text-muted-foreground">{item.answer}</p>
                  <a href={`#${item.id}`} className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Copy answer link
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
