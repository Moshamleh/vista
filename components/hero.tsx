"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, Award, Bot, Sparkles, Star } from "lucide-react"

import { SplineScene } from "@/components/ui/splite"
import { getWhatsappLink, siteConfig } from "@/lib/site"

const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"

const heroSignals = [
  { label: "Public AI data", value: "/ai-data", detail: "crawlable entity graph" },
  { label: "Knowledge assets", value: "102", detail: "indexed routes in production" },
  { label: "Schema layer", value: "FAQ + Service", detail: "answer-ready markup" },
]

const robotSignals = [
  "AI Visibility",
  "Entity Graph",
  "AEO / GEO",
  "Dubai + GCC",
]

function LazyRobotFrame() {
  return (
    <div className="relative h-full w-full bg-[#030408]">
      <SplineScene scene={ROBOT_SCENE} className="h-full w-full" />
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#030408] px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40 md:pt-48"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
        <div className="absolute left-[8%] top-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(87,217,255,0.1),transparent_70%)] blur-[130px]" />
        <div className="absolute bottom-[-14%] right-[-5%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_72%)] blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="order-2 flex flex-col items-start text-left lg:order-1">
          <div className="vista-reveal-in vista-delay-80 mb-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-md">
              <Award className="h-3.5 w-3.5" />
              Noble Business Winner 2025
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              SEO / AEO / GEO Dubai
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400/90 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 fill-current" />
              5.0 GCC Leader
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-5xl font-heading text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground text-balance sm:text-6xl lg:text-[5.35rem]"
          >
            Research-backed AI visibility, high-performance websites, and{" "}
            <span className="italic text-accent">
              growth systems
            </span>{" "}
            for Dubai brands
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground/92 sm:text-xl"
          >
            <strong className="text-foreground">Vista by Lara</strong> is a Dubai-based AI visibility and digital
            growth agency helping UAE and GCC businesses get found in Google and recommended by AI answer engines
            through SEO, AEO/GEO, Shopify optimization, and conversion-focused design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <a
              href={siteConfig.whatsapp}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-background shadow-[0_24px_60px_rgba(87,217,255,0.28)] transition-transform hover:scale-[1.02]"
            >
              Request technical briefing
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={getWhatsappLink("generative-ai")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-8 text-base font-semibold text-accent transition-colors hover:bg-accent/15"
            >
              Generate AI visibility plan
            </a>
            <a
              href="/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-8 text-base font-semibold text-foreground/82 backdrop-blur-md transition-colors hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
            >
              Read the AI visibility guide
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="mt-10 grid w-full max-w-3xl gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3"
          >
            {heroSignals.map((signal) => (
              <div key={signal.label} className="bg-[#071018]/88 p-4 backdrop-blur-md sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {signal.label}
                </p>
                <p className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-foreground">
                  {signal.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-accent/90">{signal.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="vista-reveal-in vista-delay-140 order-1 lg:order-2">
          <div className="relative mx-auto flex h-[420px] w-full max-w-[720px] items-center justify-center overflow-visible sm:h-[540px] lg:h-[700px]">
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
              <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-[95px]" />
              <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-accent/15 bg-[radial-gradient(circle_at_center,rgba(87,217,255,0.18),rgba(3,4,8,0.1)_58%,transparent_76%)]" />
              <div className="absolute left-[10%] top-[12%] h-24 w-24 rounded-full border border-accent/20 bg-accent/10 blur-sm" />
              <div className="absolute bottom-[12%] right-[8%] h-32 w-32 rounded-[2rem] border border-accent/16 bg-accent/8 rotate-12" />
            </div>

            <div className="absolute right-3 top-6 z-20 hidden rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl sm:block">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                <Bot className="h-4 w-4" />
                AI-ready
              </p>
            </div>

            <div className="absolute left-2 top-20 z-20 hidden max-w-[14rem] rounded-2xl border border-accent/15 bg-[#05070d]/78 p-4 shadow-[0_24px_80px_-50px_rgba(87,217,255,0.8)] backdrop-blur-xl md:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Command center</p>
              <div className="mt-4 space-y-2">
                {robotSignals.map((signal) => (
                  <div key={signal} className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-foreground/72">{signal}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(87,217,255,0.8)]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-10 right-0 z-20 hidden w-[16rem] rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl md:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">AI retrieval path</p>
              <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs text-foreground/72">
                <span className="text-accent">01</span><span>Service entity defined</span>
                <span className="text-accent">02</span><span>FAQ answers extracted</span>
                <span className="text-accent">03</span><span>Proof linked to briefing</span>
              </div>
            </div>

            <div className="relative z-10 h-full w-full scale-[1.08] drop-shadow-[0_0_55px_rgba(87,217,255,0.22)]">
              <LazyRobotFrame />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
