import Image from "next/image"

export function BrandMark({ priority = false }: { priority?: boolean }) {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden">
      <Image
        src="/vista-logo.png"
        alt=""
        width={32}
        height={32}
        priority={priority}
        className="h-full w-full scale-[1.7] object-contain"
      />
    </span>
  )
}
