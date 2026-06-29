"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineUnavailable />,
})

function canCreateWebGLContext() {
  if (typeof window === "undefined") return false

  const canvas = document.createElement("canvas")
  const options: WebGLContextAttributes = {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "default",
    stencil: false,
  }

  return Boolean(
    canvas.getContext("webgl2", options) ||
      canvas.getContext("webgl", options) ||
      canvas.getContext("experimental-webgl", options),
  )
}

function SplineUnavailable() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="absolute h-[62%] w-[62%] rounded-full bg-accent/[0.08] blur-[80px]" />
      <div className="absolute h-[48%] w-[48%] rounded-[2rem] border border-accent/10 bg-black/[0.04] rotate-12" />
      <div className="absolute h-24 w-24 rounded-full border border-accent/15 bg-accent/[0.035] blur-2xl" />
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const desktop3d = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const available = desktop3d && !reducedMotion && !saveData && canCreateWebGLContext()

    const timeout = window.setTimeout(() => setWebglAvailable(available), 0)

    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (webglAvailable !== true) return

    const element = containerRef.current
    let cancelLoad = () => {}

    const scheduleLoad = () => {
      const idleWindow = window as Window & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
        cancelIdleCallback?: (handle: number) => void
      }

      if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
        const handle = idleWindow.requestIdleCallback(() => setShouldLoad(true), { timeout: 1800 })
        return () => idleWindow.cancelIdleCallback?.(handle)
      }

      const timeout = window.setTimeout(() => setShouldLoad(true), 900)
      return () => window.clearTimeout(timeout)
    }

    if (!element || !("IntersectionObserver" in window)) {
      cancelLoad = scheduleLoad()
      return () => cancelLoad()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          cancelLoad = scheduleLoad()
        }
      },
      { rootMargin: "240px" },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelLoad()
    }
  }, [webglAvailable])

  useEffect(() => {
    const handleWebGLFailure = (event: ErrorEvent | PromiseRejectionEvent) => {
      const reason = "reason" in event ? event.reason : event.error
      const fallbackMessage = "message" in event ? event.message : ""
      const message = reason instanceof Error ? reason.message : String(reason || fallbackMessage || "")

      if (message.includes("WebGL context") || message.includes("Error creating WebGL context")) {
        event.preventDefault()
        setWebglAvailable(false)
      }
    }

    window.addEventListener("error", handleWebGLFailure)
    window.addEventListener("unhandledrejection", handleWebGLFailure)

    return () => {
      window.removeEventListener("error", handleWebGLFailure)
      window.removeEventListener("unhandledrejection", handleWebGLFailure)
    }
  }, [])

  if (webglAvailable === false) {
    return (
      <div ref={containerRef} className={className}>
        <SplineUnavailable />
      </div>
    )
  }

  if (webglAvailable === null || !shouldLoad) {
    return (
      <div ref={containerRef} className={className}>
        <SplineUnavailable />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      <Spline scene={scene} className="h-full w-full" />
    </div>
  )
}
