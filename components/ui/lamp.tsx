import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const LampContainer = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "relative z-0 flex w-full flex-col items-center overflow-hidden bg-[#030408]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 isolate z-0 flex h-[34rem] w-full scale-y-125 items-center justify-center">
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-accent via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-[#030408] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-[#030408] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-accent text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-[#030408] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-[#030408] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#030408] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-accent opacity-40 blur-3xl" />
        <div className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-accent blur-2xl" />
        <div className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-accent" />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#030408]" />
      </div>

      <div className="relative z-50 flex w-full flex-col items-center px-5 pt-56 sm:pt-64">
        {children}
      </div>
    </div>
  )
}
