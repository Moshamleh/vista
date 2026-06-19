"use client"

import { useState } from "react"

const SCENE_URL = "https://my.spline.design/nexbotrobotcharacterconcept-9MPQONdqkHCXpsKu2RFEDUMc/"

export function HeroSpline() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          <span className="h-12 w-12 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
        </div>
      )}

      <iframe
        src={SCENE_URL}
        title="Interactive 3D robot character"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="h-full w-full border-0 bg-transparent"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      />

      {/* Cover the Spline watermark badge in the bottom-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-14 w-36 bg-background"
      />
    </div>
  )
}
