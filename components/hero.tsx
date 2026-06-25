"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, Award, Bot, Sparkles, Star } from "lucide-react"

import { SplineScene } from "@/components/ui/splite"
import { siteConfig } from "@/lib/site"

const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"

export function Hero() {
  const callAI = async () => {
    const res = await fetch(
      "https://vista-ai-visibility.workers.dev/recommend?q=need%20more%20leads"
    )

    const data = await res.json()

    if (data?.whatsappLink) {
      window.open(data.whatsappLink, "_blank")
    }
  }

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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex flex-wrap gap-2.5"
          >
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
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-5xl font-heading text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground text-balance sm:text-6xl lg:text-[5.35rem]"
          >
            Dubai Branding, UX, and{" "}
            <span className="italic text-accent">
              AI Visibility
            </span>{" "}
            for Premium Brands
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground/92 sm:text-xl"
          >
            <strong className="text-foreground">Vista by Lara</strong> builds conversion-ready websites, premium brand
            systems, and SEO/AEO/GEO content engines for Dubai, UAE, and GCC companies that need to be found, trusted,
            and chosen.
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
              Speak to an expert
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={callAI}
              className="bg-black text-white border border-yellow-500 px-6 py-3 rounded-lg hover:opacity-80 transition"
            >
              Get AI Growth Plan
            </button>
            <a
              href="#automation-growth"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-8 text-base font-semibold text-foreground/82 backdrop-blur-md transition-colors hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
            >
              See the lead system
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
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

            <div className="relative z-10 h-full w-full scale-[1.08] drop-shadow-[0_0_55px_rgba(87,217,255,0.22)]">
              <SplineScene scene={ROBOT_SCENE} className="h-full w-full brightness-110 contrast-110" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
