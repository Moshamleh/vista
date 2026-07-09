const FULL = "vista by lara"
// Number of characters that belong to the muted "by lara" portion (includes leading space).
const MUTED_FROM = "vista".length

export function TypewriterWordmark({ className = "" }: { className?: string }) {
  const main = FULL.slice(0, MUTED_FROM)
  const muted = FULL.slice(MUTED_FROM)

  return (
    <span
      className={`relative inline-block shrink-0 whitespace-nowrap font-heading text-2xl font-medium tracking-tight text-foreground ${className}`}
      aria-label={FULL}
    >
      <span aria-hidden="true" className="invisible">
        {FULL}
        <span
          className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-0.5 self-center align-middle"
        />
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        <span className="vista-typewriter-mask inline-block overflow-hidden whitespace-nowrap align-middle">
          {main}
          <span className="text-muted-foreground">{muted}</span>
        </span>
        <span
          className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-0.5 animate-pulse self-center bg-foreground align-middle"
        />
      </span>
    </span>
  )
}
