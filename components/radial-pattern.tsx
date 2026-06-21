"use client"

import { useEffect, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"

type PixelCanvasProps = {
  colors: string[]
  gap?: number
  speed?: number
  className?: string
}

type VisibilityTile = {
  key: string
  label: string
  title: string
  copy: string
  colors: string[]
}

const VISIBILITY_TILES: VisibilityTile[] = [
  {
    key: "aeo",
    label: "AEO",
    title: "Answer Engine Optimization",
    copy:
      "Direct answers, FAQ structure, and entity-rich sections help ChatGPT, Gemini, Perplexity, and Google AI understand Vista by Lara for Dubai service searches.",
    colors: ["#57d9ff", "#8aefff", "#ffffff"],
  },
  {
    key: "geo",
    label: "GEO",
    title: "Generative Engine Optimization",
    copy:
      "Citation-ready UAE content connects Vista by Lara with Dubai, Abu Dhabi, Sharjah, and GCC searches for premium branding, UX, and digital growth.",
    colors: ["#57d9ff", "#84ffc9", "#ffffff"],
  },
  {
    key: "seo",
    label: "SEO",
    title: "Search Engine Optimization",
    copy:
      "Technical metadata, crawlable routes, internal links, and keyword clusters help Google index the site for high-intent UAE clients.",
    colors: ["#57d9ff", "#7c8cff", "#ffffff"],
  },
  {
    key: "schema",
    label: "JSON-LD",
    title: "Structured Data Signals",
    copy:
      "LocalBusiness, Service, FAQPage, and Breadcrumb schema make the brand easier for search engines and AI systems to classify.",
    colors: ["#57d9ff", "#f6f0c8", "#ffffff"],
  },
  {
    key: "uae",
    label: "UAE",
    title: "Dubai Market Relevance",
    copy:
      "Every page reinforces location intent across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, and GCC expansion markets.",
    colors: ["#57d9ff", "#a9ff68", "#ffffff"],
  },
  {
    key: "cvr",
    label: "CVR",
    title: "WhatsApp Conversion Path",
    copy:
      "The content does not stop at ranking. It guides visitors into audit requests, project inquiries, and direct WhatsApp conversations.",
    colors: ["#57d9ff", "#ff8bd1", "#ffffff"],
  },
  {
    key: "ae",
    label: "AI",
    title: "AI Indexing Readiness",
    copy:
      "Clear page architecture, llms-ready signals, and direct answer blocks help AI systems parse Vista by Lara without guessing.",
    colors: ["#57d9ff", "#bda8ff", "#ffffff"],
  },
  {
    key: "ux",
    label: "UX",
    title: "Luxury UX Clarity",
    copy:
      "Premium layouts, short decision paths, and mobile-first hierarchy help UAE clients understand the offer faster and take action.",
    colors: ["#57d9ff", "#ffd166", "#ffffff"],
  },
]

function PixelCanvas({ colors, gap = 5, speed = 22, className }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const colorStops = useMemo(() => colors.map((color) => color.trim()).filter(Boolean), [colors])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let animationFrame = 0
    let width = 0
    let height = 0
    let pixels: Array<{
      x: number
      y: number
      size: number
      color: string
      delay: number
      alpha: number
    }> = []

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)

      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const size = 3
      const columns = Math.ceil(width / (size + gap))
      const rows = Math.ceil(height / (size + gap))

      pixels = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns
        const row = Math.floor(index / columns)
        const distance = Math.hypot(column - columns / 2, row - rows / 2)

        return {
          x: column * (size + gap),
          y: row * (size + gap),
          size,
          color: colorStops[index % colorStops.length] || "#57d9ff",
          delay: distance * speed + Math.random() * 220,
          alpha: 0,
        }
      })
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)

      for (const pixel of pixels) {
        const wave = Math.sin((time - pixel.delay) / 360)
        const targetAlpha = Math.max(0, wave) * 0.72
        pixel.alpha += (targetAlpha - pixel.alpha) * 0.08

        if (pixel.alpha <= 0.01) continue

        context.globalAlpha = pixel.alpha
        context.fillStyle = pixel.color
        context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      }

      context.globalAlpha = 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrame = window.requestAnimationFrame(draw)

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [colorStops, gap, speed])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100", className)} />
}

function VisibilityCard({ tile }: { tile: VisibilityTile }) {
  return (
    <article className="group relative min-h-[260px] overflow-hidden bg-background p-6 transition-colors duration-300 hover:bg-[#050707] sm:p-7">
      <PixelCanvas colors={tile.colors} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(87,217,255,0.1),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between gap-10">
        <div>
          <p className="font-heading text-5xl font-semibold tracking-tight text-accent sm:text-6xl">{tile.label}</p>
          <h3 className="mt-5 text-lg font-semibold text-foreground">{tile.title}</h3>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">{tile.copy}</p>
      </div>
    </article>
  )
}

export function RadialPattern() {
  const leftTiles = VISIBILITY_TILES.slice(0, 4)
  const rightTiles = VISIBILITY_TILES.slice(4)

  return (
    <section aria-labelledby="visibility-engine-heading" className="relative overflow-hidden bg-background px-5 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(87,217,255,0.04)_46%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1fr_1.25fr_1fr]">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-1">
            {leftTiles.map((tile) => (
              <VisibilityCard key={tile.key} tile={tile} />
            ))}
          </div>

          <div className="relative order-first bg-background p-7 sm:p-10 lg:order-none lg:min-h-[640px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(87,217,255,0.14),transparent_34%),radial-gradient(circle_at_90%_90%,rgba(87,217,255,0.08),transparent_32%)]" />
            <div className="relative flex h-full flex-col justify-center gap-12 text-center lg:text-left">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-accent">AI visibility engine</p>
                <h2
                  id="visibility-engine-heading"
                  className="mt-7 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                >
                  AEO, GEO and SEO visibility for Dubai brands.
                </h2>
              </div>
              <div className="mx-auto max-w-2xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
                <p>
                  Vista by Lara builds UAE-focused visibility systems that help search engines and AI answer tools find,
                  cite, and recommend your brand.
                </p>
                <p>
                  This section connects Answer Engine Optimization, Generative Engine Optimization, and Search Engine
                  Optimization into one premium growth layer for Dubai, UAE, and GCC clients.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-1">
            {rightTiles.map((tile) => (
              <VisibilityCard key={tile.key} tile={tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
