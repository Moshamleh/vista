"use client"

import { useEffect, useState } from "react"

type Lead = {
  query?: string
  service?: string
  timestamp?: string
}

type LeadsResponse = {
  leads?: Lead[]
  data?: Lead[]
} & Record<string, unknown>

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/leads", { cache: "no-store" })
        const json = (await res.json()) as LeadsResponse

        const nextLeads =
          Array.isArray(json?.leads) ? json.leads : Array.isArray(json?.data) ? json.data : []

        if (!cancelled) setLeads(nextLeads)
      } catch {
        if (!cancelled) setLeads([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-white">AI CRM Leads</h1>
        <p className="mt-2 text-white/70">
          Stored AI-generated WhatsApp leads (fetched via frontend proxy).
        </p>

        <section className="mt-8">
          {loading ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-6 text-white/70">
              Loading leads...
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-6 text-white/70">
              No leads found yet. Click the Hero CTA to generate a WhatsApp lead.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {leads.map((lead, idx) => (
                <article
                  key={`${lead.timestamp ?? "t"}-${idx}`}
                  className="rounded-lg border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="flex flex-col gap-3">
                    <div className="text-sm text-white/70">Query</div>
                    <div className="text-white">{lead.query ?? "—"}</div>

                    <div className="flex items-baseline gap-2">
                      <div className="text-sm text-white/70">Service</div>
                      <div className="text-sm font-semibold text-green-400">
                        {lead.service ?? "—"}
                      </div>
                    </div>

                    <div className="text-sm text-white/70">Timestamp</div>
                    <div className="text-white">{lead.timestamp ?? "—"}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}


