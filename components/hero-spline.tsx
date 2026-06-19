"use client"

import { Suspense } from "react"
import Spline from "@splinetool/react-spline"

const SCENE_URL = "https://my.spline.design/nexbotrobotcharacterconcept-9MPQONdqkHCXpsKu2RFEDUMc/scene.splinecode"

export function HeroSpline() {
  return (
    <Suspense
      fallback={
        <div aria-hidden className="flex h-full w-full items-center justify-center">
          <span className="h-12 w-12 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
        </div>
      }
    >
      <Spline scene={SCENE_URL} className="!h-full !w-full" />
    </Suspense>
  )
}
