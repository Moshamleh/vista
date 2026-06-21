declare module "gsap" {
  const gsap: any
  export default gsap
}

declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: any
}

declare module "@gsap/react" {
  export function useGSAP(callback: () => void | (() => void), config?: any): void
}

declare module "@vercel/speed-insights/react" {
  export function SpeedInsights(): JSX.Element
}
