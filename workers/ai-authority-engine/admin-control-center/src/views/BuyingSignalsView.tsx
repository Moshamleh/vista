import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { MetricCard } from "../components/MetricCard"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoOpportunities, demoSources, withDemo } from "../lib/demo-data"
import { formatPercent, readArray, readData, readNumber, readString } from "../lib/data"
import type { OpportunityRecord, SourceRecord } from "../types"

export function BuyingSignalsView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("score")
  const [page, setPage] = useState(1)
  const opportunities = useQuery({ queryKey: ["opportunities"], queryFn: () => client.listOpportunities() })
  const sources = useQuery({ queryKey: ["signal-sources"], queryFn: () => client.listSources() })
  const scan = useMutation({
    mutationFn: () => client.scanSignals(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["opportunities"] })
  })
  const opportunityRows = readArray<OpportunityRecord>(readData(opportunities.data), "opportunities")
  const sourceRows = readArray<SourceRecord>(readData(sources.data), "sources")
  const displayedOpportunities = withDemo(opportunityRows, demoOpportunities)
  const displayedSources = withDemo(sourceRows, demoSources)
  const pageSize = 25
  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase()
    const rows = displayedOpportunities.filter((row) => {
      const matchesStatus = statusFilter === "all" || row.status === statusFilter
      const haystack = [row.title, row.organizationName, row.sourceName, row.signalType, row.explanation]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return matchesStatus && (query.length === 0 || haystack.includes(query))
    })
    return [...rows].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "updated") return readString(b.updatedAt, "").localeCompare(readString(a.updatedAt, ""))
      return readNumber(b.score, 0) - readNumber(a.score, 0)
    })
  }, [displayedOpportunities, search, sortBy, statusFilter])
  const totalPages = Math.max(1, Math.ceil(filteredOpportunities.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedOpportunities = filteredOpportunities.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const firstOpportunity = filteredOpportunities.length > 0 ? filteredOpportunities[0] : undefined
  const selected: OpportunityRecord | undefined =
    filteredOpportunities.find((row) => row.id === selectedId) ?? firstOpportunity
  const activeSources = displayedSources.filter((source) => source.enabled).length
  const chartData = useMemo(() => {
    const counts = new Map<string, number>()
    for (const row of filteredOpportunities) {
      const key = readString(row.sourceName, "Public source")
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return [...counts.entries()].slice(0, 6).map(([name, count]) => ({ name, count }))
  }, [filteredOpportunities])

  return (
    <>
      <PageHeader
        title="Buying Signals"
        description="Review public commercial signals, scored opportunities, service fit, explanations, and configured sources."
      />
      <div className="mb-4 flex justify-end">
        <ActionButton onClick={() => scan.mutate()} disabled={scan.isPending}>
          {scan.isPending ? "Scanning" : "Scan public sources"}
        </ActionButton>
      </div>
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Open opportunities"
          value={String(displayedOpportunities.length)}
          detail="Public buying signals"
        />
        <MetricCard
          label="Active sources"
          value={`${String(activeSources)}/${String(displayedSources.length)}`}
          detail="Permitted public feeds"
        />
        <MetricCard label="Top score" value={formatPercent(selected?.score ?? 0)} detail="Commercial fit and recency" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Panel title="Opportunities">
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_150px_160px]">
            <label className="text-sm font-medium text-slate-700">
              Search
              <input
                className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Company, source, signal"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Status
              <select
                className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value)
                  setPage(1)
                }}
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="reviewed">Reviewed</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Sort
              <select
                className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="score">Highest score</option>
                <option value="updated">Recently updated</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
          {opportunities.isLoading ? <LoadingState /> : null}
          {opportunities.error ? <ErrorState error={opportunities.error} /> : null}
          <DataTable
            rows={paginatedOpportunities}
            empty="No buying-signal opportunities are available."
            columns={[
              {
                header: "Opportunity",
                render: (row) => (
                  <button
                    className="text-left font-medium text-ink hover:text-brand"
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                  >
                    {row.title}
                  </button>
                )
              },
              { header: "Company", render: (row) => readString(row.organizationName, "Not identified") },
              { header: "Score", render: (row) => formatPercent(readNumber(row.score, 0.72)) },
              {
                header: "Status",
                render: (row) => <StatusBadge label={readString(row.status, "open")} tone="good" />
              },
              { header: "Source", render: (row) => readString(row.sourceName, "Public source") }
            ]}
          />
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-600">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <ActionButton onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>
                Previous
              </ActionButton>
              <ActionButton
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </ActionButton>
            </div>
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Source coverage">
            {chartData.length > 0 ? (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <LoadingState label="No chart data available" />
            )}
          </Panel>
          <Panel title="Opportunity details">
            {selected ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Company</p>
                  <p className="font-medium text-ink">{readString(selected.organizationName, "Not identified")}</p>
                </div>
                <div>
                  <p className="text-slate-500">Signal</p>
                  <p className="font-medium text-ink">{readString(selected.signalType, "public commercial signal")}</p>
                </div>
                <div>
                  <p className="text-slate-500">Reasoning</p>
                  <p className="text-slate-700">{selected.explanation}</p>
                </div>
                <div>
                  <p className="text-slate-500">Recommended services</p>
                  <p className="text-slate-700">{(selected.recommendedServices ?? []).join(", ")}</p>
                </div>
              </div>
            ) : (
              <LoadingState label="Select an opportunity to inspect" />
            )}
          </Panel>
          <Panel title="Sources">
            <DataTable
              rows={displayedSources}
              empty="No public signal sources are configured."
              columns={[
                { header: "Name", render: (row) => row.name },
                { header: "Category", render: (row) => row.category },
                {
                  header: "State",
                  render: (row) => (
                    <StatusBadge label={row.enabled ? "enabled" : "disabled"} tone={row.enabled ? "good" : "warning"} />
                  )
                }
              ]}
            />
          </Panel>
        </div>
      </div>
    </>
  )
}
