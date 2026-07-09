import type { StatusTone } from "../types"

const tones: Record<StatusTone, string> = {
  neutral: "border-slate-300 bg-slate-100 text-slate-700",
  good: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800"
}

export function StatusBadge({ label, tone = "neutral" }: { readonly label: string; readonly tone?: StatusTone }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{label}</span>
  )
}
