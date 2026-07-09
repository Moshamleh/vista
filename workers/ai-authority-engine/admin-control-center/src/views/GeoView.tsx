import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { MetricCard } from "../components/MetricCard"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoContent, withDemo } from "../lib/demo-data"
import { asRecord, formatPercent, readArray, readData, readString, stringifyValue } from "../lib/data"
import type { UnknownRecord } from "../types"

export function GeoView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const [contentId, setContentId] = useState("")
  const status = useQuery({ queryKey: ["geo-status"], queryFn: () => client.getGeoStatus() })
  const entities = useQuery({ queryKey: ["geo-entities"], queryFn: () => client.listGeoEntities() })
  const report = useQuery({
    queryKey: ["geo-report", contentId],
    queryFn: () => client.getGeoReport({ path: { contentId } }),
    enabled: contentId.length > 0
  })
  const optimize = useMutation({
    mutationFn: () => client.optimizeGeo({ path: { contentId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["geo-report", contentId] })
  })
  const demoEntities = demoContent.flatMap((content) =>
    (content.entities ?? []).map((name) => ({
      id: `${content.id}-${name}`,
      name,
      entityType: name === "Dubai" || name === "UAE" ? "Location" : "Topic",
      confidenceScore: 0.86
    }))
  )
  const rows = withDemo(readArray<UnknownRecord>(readData(entities.data), "entities"), demoEntities)
  const selectedContent = demoContent.find((item) => item.id === contentId) ?? demoContent[0]
  const reportData = asRecord(readData(report.data))
  const score = reportData.score ?? reportData.geoScore ?? reportData.aiReadinessScore ?? 0.82

  return (
    <>
      <PageHeader
        title="GEO"
        description="Inspect entity graph coverage, schema readiness, and optimization reports."
      />
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <MetricCard
          label="GEO validation score"
          value={formatPercent(score)}
          detail="Schema, entities, canonical signals"
        />
        <MetricCard
          label="Entities tracked"
          value={String(rows.length)}
          detail="Organization, location, topic, service"
        />
        <MetricCard label="Internal link suggestions" value="6" detail="Related services, FAQs, and articles" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Panel title="Entity graph">
          {entities.isLoading ? <LoadingState /> : null}
          {entities.error ? <ErrorState error={entities.error} /> : null}
          <DataTable
            rows={rows}
            empty="No entity graph records are available."
            columns={[
              { header: "Entity", render: (row) => readString(row.name, "unnamed entity") },
              { header: "Type", render: (row) => readString(row.entityType ?? row.entity_type, "not reported") },
              { header: "Confidence", render: (row) => stringifyValue(row.confidenceScore ?? row.confidence_score) },
              { header: "Status", render: () => <StatusBadge label="mapped" tone="good" /> }
            ]}
          />
        </Panel>
        <Panel
          title="Schema and optimization report"
          description="Enter a content ID to inspect or optimize a GEO report."
          action={
            <ActionButton onClick={() => optimize.mutate()} disabled={contentId.length === 0 || optimize.isPending}>
              Optimize
            </ActionButton>
          }
        >
          <label className="block text-sm font-medium text-slate-700">
            Content ID
            <input
              className="mt-2 w-full rounded-md border border-line px-3 py-2"
              value={contentId}
              onChange={(event) => setContentId(event.target.value)}
            />
          </label>
          <div className="mt-4 rounded-md border border-line bg-slate-50 p-3 text-sm">
            <p className="font-medium text-ink">Schema preview</p>
            <p className="mt-1 text-slate-600">
              {selectedContent.schemaType ?? "Article"} schema for {selectedContent.title} with Organization, WebPage,
              BreadcrumbList, and FAQPage support where available.
            </p>
          </div>
          <div className="mt-3 rounded-md border border-line bg-slate-50 p-3 text-sm">
            <p className="font-medium text-ink">Internal linking suggestions</p>
            <ul className="mt-2 space-y-2 text-slate-600">
              {(selectedContent.internalLinks ?? []).map((link) => (
                <li key={link.targetUrl}>
                  <span className="font-medium text-ink">{link.anchorText}</span> to {link.targetUrl}
                </li>
              ))}
            </ul>
          </div>
          {status.data ? (
            <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(readData(status.data), null, 2)}
            </pre>
          ) : null}
          {report.data ? (
            <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(readData(report.data), null, 2)}
            </pre>
          ) : null}
        </Panel>
      </div>
    </>
  )
}
