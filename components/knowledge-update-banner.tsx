import { RefreshCcw } from "lucide-react"

export function KnowledgeUpdateBanner() {
  return (
    <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/10 p-5 text-sm text-foreground/86 sm:flex sm:items-center sm:gap-4">
      <RefreshCcw className="mb-3 h-5 w-5 text-accent sm:mb-0" aria-hidden="true" />
      <div>
        <p className="font-semibold text-foreground">Last updated: 30 June 2026</p>
        <p className="mt-1 text-muted-foreground">
          This resource is actively maintained as AI search technologies evolve.
        </p>
      </div>
    </div>
  )
}
