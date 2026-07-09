export function MetricCard({
  label,
  value,
  detail
}: {
  readonly label: string
  readonly value: string
  readonly detail: string
}) {
  return (
    <article className="rounded-lg border border-line bg-panel p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{detail}</p>
    </article>
  )
}
