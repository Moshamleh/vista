"use client"

import { useEffect, useRef, useState } from "react"

const FULL = "vista by lara"
// Number of characters that belong to the muted "by lara" portion (includes leading space).
const MUTED_FROM = "vista".length

const TYPE_MS = 130 // delay between typing each character
const DELETE_MS = 70 // delay between deleting each character
const HOLD_FULL_MS = 1600 // pause once fully typed
const HOLD_EMPTY_MS = 500 // pause once fully deleted

export function TypewriterWordmark({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<"typing" | "deleting">("typing")
  const reduced = useRef(false)

  useEffect(() => {
    // Respect users who prefer reduced motion — show the full word and stop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reduced.current = true
      setTimeout(() => setCount(FULL.length), 0)
    }
  }, [])

  useEffect(() => {
    if (reduced.current) return

    let timeout: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (count < FULL.length) {
        timeout = setTimeout(() => setCount((c) => c + 1), TYPE_MS)
      } else {
        timeout = setTimeout(() => setPhase("deleting"), HOLD_FULL_MS)
      }
    } else {
      if (count > 0) {
        timeout = setTimeout(() => setCount((c) => c - 1), DELETE_MS)
      } else {
        timeout = setTimeout(() => setPhase("typing"), HOLD_EMPTY_MS)
      }
    }

    return () => clearTimeout(timeout)
  }, [count, phase])

  const shown = FULL.slice(0, count)
  const main = shown.slice(0, MUTED_FROM)
  const muted = shown.slice(MUTED_FROM)

  return (
    <span
      className={`font-heading text-2xl font-medium tracking-tight text-foreground ${className}`}
      aria-label={FULL}
    >
      <span aria-hidden="true">
        {main}
        <span className="text-muted-foreground">{muted}</span>
        <span
          className="ml-0.5 inline-block w-[2px] -translate-y-0.5 animate-pulse self-center bg-foreground align-middle"
          style={{ height: "1em" }}
        />
      </span>
    </span>
  )
}
