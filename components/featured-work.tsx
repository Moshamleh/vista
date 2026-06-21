"use client"

import { ArrowUpRight } from "lucide-react"

import SocialCards, { type CardItem } from "@/components/card-fan-carousel"
import { Reveal } from "@/components/reveal"

const WORK: CardItem[] = [
  {
    imgUrl: "/work-oasis.jpg",
    alt: "Hospitality website design project structured for Dubai SEO and AI recommendations",
  },
  {
    imgUrl: "/work/hanibut.png",
    alt: "Hanibut restaurant website design project by Vista by Lara for food and hospitality visibility",
  },
  {
    imgUrl: "/work/bloom.png",
    linkUrl: "https://bloomcoreventures.com",
    alt: "Bloom Core Ventures website design project by Vista by Lara for premium AI-ready brand visibility",
  },
  {
    imgUrl: "/work-realestate.png",
    alt: "Dubai luxury real estate website design project built for lead generation and GEO search visibility",
  },
]

export function FeaturedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-[#030408] px-5 py-28 sm:px-8 sm:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute left-1/2 top-[12%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/8 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Section 06 / Selected work</p>
            <h2 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
              SEO, AEO, and GEO websites built to be recommended by AI Mode.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Vista by Lara designs premium UAE websites that search engines can rank, answer engines can quote, and
              generative AI systems can understand. Each project is structured for stronger Dubai visibility, clearer
              entity signals, and qualified lead generation.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start text-base font-medium text-foreground transition-colors hover:text-accent sm:self-end"
          >
            <span className="border-b border-foreground/30 pb-0.5 transition-colors hover:border-accent">
              Start a project
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <SocialCards cards={WORK} />
      </div>
    </section>
  )
}
