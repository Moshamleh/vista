"use client"

import { ArrowRight } from "lucide-react"

import { siteConfig } from "@/lib/site"

const orbSplineUrl = "https://my.spline.design/reactiveorb-Kw1phhRs7MjUy8BdmdVCeA0b/"

export function ReactiveOrbSection() {
  return (
    <section
      id="ai-integration"
      aria-labelledby="ai-integration-heading"
      className="relative overflow-hidden bg-[#020407] px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(87,217,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(87,217,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(0,188,188,0.11),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(87,217,255,0.08),transparent_35%),linear-gradient(180deg,rgba(2,4,7,0.42),#020407_88%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] border-y border-cyan-300/20 bg-black/80 shadow-[0_0_0_1px_rgba(87,217,255,0.06),0_42px_120px_-80px_rgba(0,255,255,0.62)]">
        <div className="grid min-h-[640px] items-center gap-8 px-6 py-16 sm:px-10 md:min-h-[620px] md:grid-cols-[0.86fr_1fr] md:px-16 lg:px-24">
          <div className="relative z-10 max-w-xl text-left">
            <h1
              id="ai-integration-heading"
              className="font-heading text-[clamp(2.7rem,7vw,4.95rem)] font-normal leading-[0.96] tracking-normal text-white"
            >
              Effortless
              <br />
              AI integration
              <br />
              <span className="text-[#00a7a4]">for business</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/45 sm:text-base">
              No extra setup, just smart automation when you need it. Handle the heavy lifting while you stay in control.
            </p>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#004f52] px-7 text-xs font-bold uppercase tracking-wide text-white shadow-[0_0_26px_rgba(0,188,188,0.2)] transition hover:-translate-y-0.5 hover:bg-[#00666a] focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
            >
              Join us now
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="relative z-10 flex min-h-[320px] items-center justify-center md:min-h-[460px]">
            <div className="group/orb relative h-[min(76vw,540px)] min-h-[320px] w-full max-w-[620px] overflow-hidden bg-black transition-transform duration-500 ease-out hover:scale-[1.015]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_50%,rgba(0,191,191,0.2),transparent_56%)] blur-2xl" />
              <iframe
                src={orbSplineUrl}
                title="Vista by Lara Spline AI integration orb"
                className="absolute left-1/2 top-1/2 h-[clamp(780px,88vw,1080px)] w-[clamp(1470px,168vw,1920px)] border-0 bg-black"
                style={{ transform: "translate(-72.5%, -50%)" }}
                loading="eager"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_50%,transparent_42%,rgba(2,4,7,0.1)_68%,rgba(2,4,7,0.55)_100%)]" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-cyan-300/10 transition group-hover/orb:ring-cyan-300/25" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] overflow-hidden" aria-hidden="true">
          <svg className="absolute inset-x-0 bottom-[-1px] h-full w-full" viewBox="0 0 1280 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="vistaWave" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#003c41" stopOpacity="0" />
                <stop offset="38%" stopColor="#00a7a4" stopOpacity="0.28" />
                <stop offset="72%" stopColor="#00666a" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#003c41" stopOpacity="0" />
              </linearGradient>
              <filter id="vistaWaveBlur">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <path
              d="M0 138 C140 150 230 112 354 100 C500 86 554 132 690 120 C824 108 870 78 1008 82 C1126 86 1164 102 1280 92 L1280 180 L0 180 Z"
              fill="url(#vistaWave)"
              filter="url(#vistaWaveBlur)"
            />
            <path
              d="M0 122 C130 138 250 86 390 96 C532 106 594 130 710 112 C852 90 920 82 1036 96 C1142 108 1190 112 1280 102"
              fill="none"
              stroke="#00a7a4"
              strokeOpacity="0.42"
              strokeWidth="2"
              filter="url(#vistaWaveBlur)"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
