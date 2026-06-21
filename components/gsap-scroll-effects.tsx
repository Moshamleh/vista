"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function GsapScrollEffects() {
  useEffect(() => {
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

    return () => ctx.revert()
  }, [])

  return null
}
