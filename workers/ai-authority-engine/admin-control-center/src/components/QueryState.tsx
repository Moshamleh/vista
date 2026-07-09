import type { ReactNode } from "react"

export function LoadingState({ label = "Loading engine data" }: { readonly label?: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4 text-sm text-slate-600" role="status">
      {label}
    </div>
  )
}

export function ErrorState({ error }: { readonly error: Error }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
      {error.message}
    </div>
  )
}

export function EmptyState({ children }: { readonly children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-slate-50 p-4 text-sm text-slate-600">{children}</div>
  )
}
