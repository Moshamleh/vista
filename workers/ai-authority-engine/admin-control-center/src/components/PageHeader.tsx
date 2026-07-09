export function PageHeader({ title, description }: { readonly title: string; readonly description: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
    </div>
  )
}
