"use client"

import { type FormEvent, useState } from "react"

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
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function loadLeads(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token.trim()) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/leads", {
        cache: "no-store",
        headers: {
          "x-auth-token": token.trim(),
        },
      })

      const json = (await res.json()) as LeadsResponse & { error?: string }

      if (!res.ok) {
        throw new Error(json.error || "Could not load leads.")
      }

      const nextLeads =
        Array.isArray(json?.leads) ? json.leads : Array.isArray(json?.data) ? json.data : []

      setLeads(nextLeads)
    } catch (caught) {
      setLeads([])
      setError(caught instanceof Error ? caught.message : "Could not load leads.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-white">AI CRM Leads</h1>
        <p className="mt-2 text-white/70">
          Stored AI-generated WhatsApp leads.
        </p>

        <form onSubmit={loadLeads} className="mt-8 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-5 sm:flex-row">
          <input
            id="crm-admin-token"
            name="token"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            type="password"
            autoComplete="off"
            className="min-h-11 flex-1 rounded-lg border border-white/10 bg-black px-4 text-white outline-none focus:border-green-400"
            placeholder="Admin token"
          />
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="min-h-11 rounded-lg bg-green-400 px-5 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load leads"}
          </button>
        </form>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
            {error}
          </div>
        ) : null}

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


