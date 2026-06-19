"use client"

import { Reveal } from "@/components/reveal"
import { ArrowRight } from "lucide-react"

const CLIENTS = [
  "coinbase",
  "Uber",
  "SONY",
  "slack",
  "amazon",
  "Pinterest",
  "Mastercard",
  "Spotify",
]

function Strip() {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {CLIENTS.map((name) => (
        <span
          key={name}
          className="font-heading text-2xl font-semibold tracking-tight text-muted-foreground/60 sm:text-3xl"
        >
          {name}
        </span>
      ))}
    </div>
  )
}

export function Clients() {
  return (
    <section id="clients" className="border-y border-border bg-card py-20 sm:py-24">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by category leaders
        </p>
      </Reveal>

      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee">
          <Strip />
          <Strip />
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="#work"
          className="inline-flex items-center gap-2 text-base font-medium text-foreground"
        >
          <span className="border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground">
            View all clients
          </span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
