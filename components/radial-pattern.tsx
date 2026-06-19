"use client"

import { useState } from "react"

const SCENE_URL = "https://my.spline.design/radialpattern-N0fw0rpparLGWOLmxjEhBXX1/"

export function RadialPattern() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section aria-labelledby="radial-pattern-heading" className="overflow-hidden">
      <div className="relative h-[420px] w-full sm:h-[560px] lg:h-[720px]">
        <div className="pointer-events-none absolute inset-x-0 top-10 z-10 px-5 text-center text-white mix-blend-difference sm:top-14 sm:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] sm:text-sm">
            Interactive design
          </p>
          <h2
            id="radial-pattern-heading"
            className="font-heading text-4xl font-medium leading-none tracking-tight sm:text-6xl lg:text-8xl"
          >
            Try the difference.
          </h2>
        </div>

        {!loaded && (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-background">
            <span className="h-12 w-12 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
          </div>
        )}

        <iframe
          src={SCENE_URL}
          title="Interactive radial pattern"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0 bg-transparent"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        />
      </div>
    </section>
  )
}
