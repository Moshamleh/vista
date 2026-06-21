declare module "cobe" {
  export type GlobeMarker = {
    location: [number, number]
    size: number
    id?: string
  }

  export type GlobeArc = {
    from: [number, number]
    to: [number, number]
    id?: string
  }

  export type GlobeOptions = {
    devicePixelRatio?: number
    width: number
    height: number
    phi?: number
    theta?: number
    dark?: number
    diffuse?: number
    mapSamples?: number
    mapBrightness?: number
    baseColor?: [number, number, number]
    markerColor?: [number, number, number]
    glowColor?: [number, number, number]
    markerElevation?: number
    markers?: GlobeMarker[]
    arcs?: GlobeArc[]
    arcColor?: [number, number, number]
    arcWidth?: number
    arcHeight?: number
    opacity?: number
  }

  export type GlobeInstance = {
    update: (options: Partial<Pick<GlobeOptions, "phi" | "theta">>) => void
    destroy: () => void
  }

  export default function createGlobe(canvas: HTMLCanvasElement, options: GlobeOptions): GlobeInstance
}
