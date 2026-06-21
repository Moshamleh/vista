"use client"

import { useEffect, useState } from "react"
import Spline from "@splinetool/react-spline"

interface SplineSceneProps {
  scene: string
  className?: string
}

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

  useEffect(() => {
    setWebglAvailable(canCreateWebGLContext())
  }, [])

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
    return <SplineUnavailable />
  }

  if (webglAvailable === null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loader h-10 w-10 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
      </div>
    )
  }

  return <Spline scene={scene} className={className} />
}
