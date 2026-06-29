"use client"

import { useEffect } from "react"

export function GsapScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false
    let cancelSchedule = () => {}
    let cleanup = () => {}

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.utils
          .toArray('.kinetic-border, main :is(article, aside, div, section, a)[class*="border"]')
          .forEach((element: HTMLElement) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0.72, y: 28, scale: 0.985 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 86%",
                  once: true,
                },
              },
            )
          })
      })

      cleanup = () => ctx.revert()
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const handle = idleWindow.requestIdleCallback(run, { timeout: 2200 })
      cancelSchedule = () => idleWindow.cancelIdleCallback?.(handle)
    } else {
      const timeout = window.setTimeout(run, 1200)
      cancelSchedule = () => window.clearTimeout(timeout)
    }

    return () => {
      cancelled = true
      cancelSchedule()
      cleanup()
    }
  }, [])

  return null
}
