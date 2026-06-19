"use client"

import { Reveal } from "@/components/reveal"
import { ArrowRight } from "lucide-react"

const CLIENTS = [
  "Al Safa Grill",
  "Falcon Gulf Logistics",
  "Al Zahra Legal",
  "Najd Construction",
  "Palm Horizon Properties",
  "Al Noor Family Clinic",
  "Desert Pearl Interiors",
  "Elite Auto Care",
  "Sapphire Beauty Lounge",
  "Oasis Living",
  "Crescent Financial",
  "Arabian Cloud Solutions",
]

function Strip() {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {CLIENTS.map((name) => (
        <span
          key={name}
          className="whitespace-nowrap font-heading text-2xl font-semibold tracking-tight text-muted-foreground/70 sm:text-3xl"
        >
          {name}
        </span>
      ))}
    </div>
  )
}

export function Clients() {
  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="border-y border-border/20 bg-[#0d111f] py-28 sm:py-32"
    >
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          id="clients-heading"
          className="text-center text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          Trusted by category leaders
        </h2>
      </Reveal>

      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee">
          <Strip />
          <div aria-hidden>
            <Strip />
          </div>
        </div>
      </div>

      <div className="mt-14 text-center">
        <a
          href="#work"
          className="inline-flex items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent/90"
        >
          <span className="border-b border-accent/30 pb-0.5 transition-colors hover:border-accent">
            View all clients
          </span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
