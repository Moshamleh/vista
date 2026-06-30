"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

const LOGO_ITEMS = [
  { name: "Next.js", mark: "N", tone: "text-white" },
  { name: "React", mark: "R", tone: "text-cyan-300" },
  { name: "Tailwind", mark: "T", tone: "text-cyan-400" },
  { name: "Motion", mark: "M", tone: "text-violet-300" },
  { name: "Vercel", mark: "V", tone: "text-white" },
  { name: "Shopify", mark: "S", tone: "text-emerald-300" },
  { name: "AWS", mark: "A", tone: "text-amber-300" },
  { name: "Figma", mark: "F", tone: "text-pink-300" },
  { name: "Spline", mark: "3D", tone: "text-sky-300" },
  { name: "GSAP", mark: "G", tone: "text-lime-300" },
  { name: "Stripe", mark: "ST", tone: "text-indigo-300" },
  { name: "OpenAI", mark: "AI", tone: "text-teal-300" },
]

type Pixel = {
  x: number
  y: number
  size: number
  maxSize: number
  color: string
  delay: number
  alpha: number
}

function PixelCanvas({ colors, gap = 7 }: { colors: string[]; gap?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const frameRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  const setup = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const parent = canvas?.parentElement
    if (!canvas || !ctx || !parent) return

    const { width, height } = parent.getBoundingClientRect()
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.max(1, Math.floor(width * ratio))
    canvas.height = Math.max(1, Math.floor(height * ratio))
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

    const columns = Math.ceil(width / gap)
    const rows = Math.ceil(height / gap)

    pixelsRef.current = Array.from({ length: columns * rows }, (_, index) => {
      const column = index % columns
      const row = Math.floor(index / columns)
      const x = column * gap
      const y = row * gap
      const dx = x - width / 2
      const dy = y - height / 2

      return {
        x,
        y,
        size: 0,
        maxSize: Math.random() * 1.8 + 0.6,
        color: colors[index % colors.length],
        delay: Math.sqrt(dx * dx + dy * dy) * 1.2 + Math.random() * 220,
        alpha: 0,
      }
    })
  }, [colors, gap])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!parent) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return

    if (!("IntersectionObserver" in window)) {
      const timeout = globalThis.setTimeout(() => setIsVisible(true), 0)
      return () => globalThis.clearTimeout(timeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting))
      },
      { rootMargin: "220px" },
    )

    observer.observe(parent)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    setup()

    const draw = (time: number) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      for (const pixel of pixelsRef.current) {
        const wave = Math.max(0, Math.sin((time - pixel.delay) / 520))
        pixel.alpha += (wave * 0.65 - pixel.alpha) * 0.06
        if (pixel.alpha < 0.02) continue

        ctx.globalAlpha = pixel.alpha
        ctx.fillStyle = pixel.color
        ctx.fillRect(pixel.x, pixel.y, pixel.maxSize, pixel.maxSize)
      }

      ctx.globalAlpha = 1
      frameRef.current = window.requestAnimationFrame(draw)
    }

    frameRef.current = window.requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(setup)
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [isVisible, setup])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

function LogoMark({ item }: { item: (typeof LOGO_ITEMS)[number] }) {
  return (
    <div className="group/logo flex min-w-max items-center gap-3 text-foreground/70 transition-colors duration-300 hover:text-foreground">
      <span
        className={cn(
          "inline-flex h-10 min-w-10 items-center justify-center border border-white/10 bg-white/[0.035] px-2 font-heading text-sm font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 group-hover/logo:border-accent/40 group-hover/logo:bg-accent/10",
          item.tone,
        )}
      >
        {item.mark}
      </span>
      <span className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{item.name}</span>
    </div>
  )
}

function LogoStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("flex shrink-0 items-center", compact ? "gap-10 pr-10" : "gap-16 pr-16")}>
      {LOGO_ITEMS.map((item) => (
        <LogoMark key={item.name} item={item} />
      ))}
    </div>
  )
}

export function Clients() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative isolate overflow-hidden border-y border-border/40 bg-background px-4 py-24 sm:px-8 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <PixelCanvas colors={["rgba(159,161,181,.35)", "rgba(87,217,255,.55)", "rgba(255,255,255,.18)"]} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.62)_48%,var(--background)_100%)]" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Built with elite digital systems</p>
        <h2
          id="clients-heading"
          className="vista-glass-text mt-7 max-w-5xl font-heading text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Pixel-perfect technology for luxury UAE brands.
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Vista by Lara combines modern design, AI visibility, Shopify, performance engineering, and premium motion
          systems to build websites that feel sharp, fast, and conversion-ready across Dubai and the GCC.
        </p>

        <div className="mt-14 block w-full md:hidden">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Platforms and tools
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_14%,white_86%,transparent)]">
            <div className="flex w-max animate-marquee py-2">
              <LogoStrip compact />
              <LogoStrip compact />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-12 flex items-center justify-center gap-3 transition-all duration-1000",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <a
            href="#work"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-accent/35 bg-accent px-6 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background shadow-[0_22px_55px_rgba(87,217,255,0.22)] transition-transform hover:scale-[1.02]"
          >
            Explore design systems
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 mt-16 hidden transition-all duration-1000 md:block",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Platforms, tools and ecosystems we design around
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
          <div className="flex w-max animate-marquee py-4">
            <LogoStrip />
            <LogoStrip />
          </div>
        </div>
      </div>
    </section>
  )
}
