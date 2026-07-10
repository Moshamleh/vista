import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { MetricCard } from "../components/MetricCard"
import { ChartPanel } from "../components/ChartPanel"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { asRecord, formatPercent, readArray, readData, readString } from "../lib/data"
import { demoRecommendations, demoVisibilityHistory, withDemo } from "../lib/demo-data"
import type { VisibilityRecommendation, UnknownRecord } from "../types"

export function VisibilityView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const score = useQuery({ queryKey: ["visibility-score"], queryFn: () => client.getVisibilityScore() })
  const history = useQuery({ queryKey: ["visibility-history"], queryFn: () => client.getVisibilityHistory() })
  const recommendations = useQuery({
    queryKey: ["visibility-recommendations"],
    queryFn: () => client.listVisibilityRecommendations()
  })
  const scan = useMutation({
    mutationFn: () => client.scanVisibility(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["visibility-score"] })
  })
  const snapshot = asRecord(asRecord(readData(score.data)).snapshot)
  const metrics = asRecord(snapshot.metrics)
  const historyRows = readArray<UnknownRecord>(readData(history.data), "snapshots")
  const recommendationRows = withDemo(
    readArray<VisibilityRecommendation>(readData(recommendations.data), "recommendations"),
    demoRecommendations
  )

  return (
    <>
      <PageHeader
        title="Visibility"
        description="Track AI readiness, trend snapshots, and actionable visibility recommendations."
      />
      <div className="mb-4 flex justify-end">
        <ActionButton onClick={() => scan.mutate()} disabled={scan.isPending}>
          {scan.isPending ? "Scanning" : "Run visibility scan"}
        </ActionButton>
      </div>
      {score.isLoading ? <LoadingState /> : null}
      {score.error ? <ErrorState error={score.error} /> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Aggregate"
          value={formatPercent(snapshot.aggregateScore)}
          detail="Latest AI visibility score"
        />
        <MetricCard label="Canonical" value={formatPercent(metrics.canonicalCoverage)} detail="Canonical coverage" />
        <MetricCard label="Schema" value={formatPercent(metrics.schemaCompleteness)} detail="Schema completeness" />
        <MetricCard label="AI readiness" value={formatPercent(metrics.aiReadinessScore)} detail="Retrieval readiness" />
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <ChartPanel
          title="Historical visibility score"
          description="Trend chart backed by snapshots or demo data."
          data={demoVisibilityHistory}
        />
        <Panel title="Trends">
          <DataTable
            rows={historyRows}
            empty="No visibility history is available."
            columns={[
              { header: "Snapshot", render: (row) => readString(row.id, "snapshot") },
              { header: "Status", render: (row) => <StatusBadge label={readString(row.status, "unknown")} /> },
              { header: "Score", render: (row) => formatPercent(row.aggregateScore) }
            ]}
          />
        </Panel>
        <Panel title="Recommendations">
          <DataTable
            rows={recommendationRows}
            empty="No visibility recommendations are available."
            columns={[
              {
                header: "Severity",
                render: (row) => (
                  <StatusBadge label={row.severity} tone={row.severity === "high" ? "danger" : "warning"} />
                )
              },
              { header: "Issue", render: (row) => row.message },
              { header: "Action", render: (row) => row.action }
            ]}
          />
        </Panel>
      </div>
    </>
  )
}
