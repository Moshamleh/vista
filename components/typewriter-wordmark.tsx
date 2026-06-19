"use client"

import { useEffect, useState } from "react"

const FULL = "vista by lara"
// Number of characters that belong to the muted "by lara" portion (includes leading space).
const MUTED_FROM = "vista".length

export function TypewriterWordmark({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(0)
  const done = count >= FULL.length

  useEffect(() => {
    // Respect users who prefer reduced motion — show the full word immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(FULL.length)
      return
    }

    let i = 0
    const id = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= FULL.length) clearInterval(id)
    }, 110)
    return () => clearInterval(id)
  }, [])

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
          className={`ml-0.5 inline-block w-[2px] -translate-y-0.5 self-center bg-foreground align-middle ${
            done ? "animate-pulse" : ""
          }`}
          style={{ height: "1em" }}
        />
      </span>
    </span>
  )
}
