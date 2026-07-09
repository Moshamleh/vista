"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type CreateGlobe = typeof import("cobe").default
type GlobeInstance = ReturnType<CreateGlobe>

type Marker = {
  id: string
  location: [number, number]
  region: string
}

type Arc = {
  id: string
  from: [number, number]
  to: [number, number]
}

type GlobeCdnProps = {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  speed?: number
}

const defaultMarkers: Marker[] = [
  { id: "dubai", location: [25.2, 55.27], region: "Dubai" },
  { id: "abu-dhabi", location: [24.45, 54.38], region: "Abu Dhabi" },
  { id: "sharjah", location: [25.35, 55.39], region: "Sharjah" },
  { id: "ajman", location: [25.41, 55.45], region: "Ajman" },
  { id: "rak", location: [25.79, 55.98], region: "RAK" },
  { id: "riyadh", location: [24.71, 46.67], region: "Riyadh" },
  { id: "jeddah", location: [21.49, 39.19], region: "Jeddah" },
  { id: "doha", location: [25.29, 51.53], region: "Doha" },
  { id: "kuwait", location: [29.38, 47.98], region: "Kuwait" },
  { id: "manama", location: [26.22, 50.58], region: "Bahrain" },
  { id: "muscat", location: [23.59, 58.41], region: "Oman" },
]

const defaultArcs: Arc[] = [
  { id: "dubai-abu-dhabi", from: [25.2, 55.27], to: [24.45, 54.38] },
  { id: "dubai-sharjah", from: [25.2, 55.27], to: [25.35, 55.39] },
  { id: "dubai-ajman", from: [25.2, 55.27], to: [25.41, 55.45] },
  { id: "dubai-rak", from: [25.2, 55.27], to: [25.79, 55.98] },
  { id: "dubai-riyadh", from: [25.2, 55.27], to: [24.71, 46.67] },
  { id: "dubai-jeddah", from: [25.2, 55.27], to: [21.49, 39.19] },
  { id: "dubai-doha", from: [25.2, 55.27], to: [25.29, 51.53] },
  { id: "dubai-kuwait", from: [25.2, 55.27], to: [29.38, 47.98] },
  { id: "dubai-manama", from: [25.2, 55.27], to: [26.22, 50.58] },
  { id: "dubai-muscat", from: [25.2, 55.27], to: [23.59, 58.41] },
]

export function GlobeCdn({
  markers = defaultMarkers,
  arcs = defaultArcs,
  className = "",
  speed = 0.002,
}: GlobeCdnProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const [isInView, setIsInView] = useState(false)
  const [traffic, setTraffic] = useState(() =>
    arcs.map((arc, index) => ({ id: arc.id, value: [88, 76, 64, 52, 49, 42, 38][index] || 30 }))
  )

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setTraffic((data) =>
        data.map((item) => ({
          ...item,
          value: Math.max(24, item.value + Math.floor(Math.random() * 7) - 3),
        }))
      )
    }, 450)

    return () => clearInterval(interval)
  }, [isInView])

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return

    if (!("IntersectionObserver" in window)) {
      const timeout = globalThis.setTimeout(() => setIsInView(true), 0)
      return () => globalThis.clearTimeout(timeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(Boolean(entry?.isIntersecting))
      },
      { rootMargin: "280px" },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }

    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (event.clientX - pointerInteracting.current.x) / 300,
          theta: (event.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!isInView || !canvasRef.current) return

    const canvas = canvasRef.current
    let globe: GlobeInstance | null = null
    let animationId = 0
    let phi = -0.85
    let cancelled = false
    let resizeObserver: ResizeObserver | null = null

    const init = async () => {
      const createGlobe = (await import("cobe")).default
      if (cancelled) return

      const start = () => {
      if (cancelled) return
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi,
        theta: 0.12,
        dark: 1,
        diffuse: 1.35,
        mapSamples: 18000,
        mapBrightness: 5,
        baseColor: [0.1, 0.16, 0.22],
        markerColor: [0.34, 0.85, 1],
        glowColor: [0.08, 0.22, 0.32],
        markerElevation: 0.04,
        markers: markers.map((marker) => ({ location: marker.location, size: marker.id === "dubai" ? 0.065 : 0.035, id: marker.id })),
        arcs: arcs.map((arc) => ({ from: arc.from, to: arc.to, id: arc.id })),
        arcColor: [0.34, 0.85, 1],
        arcWidth: 0.75,
        arcHeight: 0.35,
        opacity: 0.95,
      })

      const animate = () => {
        if (!isPausedRef.current) phi += speed
        globe?.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }

      animate()
      setTimeout(() => {
        canvas.style.opacity = "1"
      })
    }

    if (canvas.offsetWidth > 0) {
      start()
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver?.disconnect()
          start()
        }
      })
      resizeObserver.observe(canvas)
    }
    }

    init()

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      if (animationId) cancelAnimationFrame(animationId)
      globe?.destroy()
      canvas.style.opacity = "0"
    }
  }, [markers, arcs, speed, isInView])

  return (
    <div ref={wrapperRef} className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="h-full w-full rounded-full opacity-0 transition-opacity duration-1000"
        style={{ cursor: "grab", touchAction: "none" }}
        aria-label="Interactive globe showing Vista by Lara's Dubai and GCC digital growth network"
      />
      {markers.map((marker) => (
        <div
          key={marker.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${marker.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            opacity: `var(--cobe-visible-${marker.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
          }}
          className="pointer-events-none flex flex-col items-center gap-2 transition-[opacity,filter] duration-300"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_22px_rgba(87,217,255,0.9)]" />
          <span className="rounded-full border border-accent/20 bg-[#030408]/85 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur">
            {marker.region}
          </span>
        </div>
      ))}
      {traffic.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-arc-${item.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            opacity: `var(--cobe-visible-arc-${item.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-arc-${item.id}, 0)) * 8px))`,
          }}
          className="pointer-events-none rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/80 backdrop-blur transition-[opacity,filter] duration-300"
        >
          {item.value} leads/signal
        </div>
      ))}
    </div>
  )
}
