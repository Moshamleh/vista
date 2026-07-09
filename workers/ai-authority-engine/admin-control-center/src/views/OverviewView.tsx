import { useQuery } from "@tanstack/react-query"
import { useEngineClient } from "../api/useEngineClient"
import { MetricCard } from "../components/MetricCard"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ChartPanel } from "../components/ChartPanel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoJobs, demoVisibilityHistory } from "../lib/demo-data"
import { asRecord, readData, readNumber, readString, toneForStatus } from "../lib/data"

export function OverviewView() {
  const client = useEngineClient()
  const health = useQuery({ queryKey: ["health"], queryFn: () => client.getHealth() })
  const diagnostics = useQuery({ queryKey: ["diagnostics"], queryFn: () => client.getDiagnostics() })
  const visibility = useQuery({ queryKey: ["visibility-score"], queryFn: () => client.getVisibilityScore() })
  const indexStatus = useQuery({ queryKey: ["index-status"], queryFn: () => client.getIndexStatus() })
  const providerStatus = useQuery({
    queryKey: ["overview-providers"],
    queryFn: async () =>
      Promise.all([
        client.listGenerationProviders(),
        client.listPublisherProviders(),
        client.getSearchConsoleStatus(),
        client.getBingStatus()
      ])
  })
  const opsHealth = useQuery({ queryKey: ["ops-health"], queryFn: () => client.getOperationsHealth() })
  const publishJobs = useQuery({ queryKey: ["overview-publish-jobs"], queryFn: () => client.listPublishJobs() })
  const generationJobs = useQuery({
    queryKey: ["overview-generation-jobs"],
    queryFn: () => client.listGenerationJobs()
  })

  if (health.isLoading || diagnostics.isLoading || visibility.isLoading || indexStatus.isLoading)
    return <LoadingState />
  if (health.error) return <ErrorState error={health.error} />
  if (diagnostics.error) return <ErrorState error={diagnostics.error} />

  const healthData = asRecord(readData(health.data))
  const diagnosticsData = asRecord(readData(diagnostics.data))
  const visibilityData = asRecord(readData(visibility.data))
  const snapshot = asRecord(visibilityData.snapshot)
  const indexData = asRecord(readData(indexStatus.data))
  const latestJob = asRecord(indexData.latestJob)
  const publishRows = readArraySafe(readData(publishJobs.data), "jobs")
  const generationRows = readArraySafe(readData(generationJobs.data), "jobs")

  return (
    <>
      <PageHeader
        title="Overview"
        description="Live operating picture for the Vista AI Authority Engine: health, queues, providers, and recent system activity."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Engine health"
          value={readString(healthData.status, "Healthy")}
          detail={readString(healthData.service, "Vista AI Authority Engine")}
        />
        <MetricCard
          label="Queue binding"
          value={readString(diagnosticsData.queue, "Configured")}
          detail="Shared Worker queue diagnostics"
        />
        <MetricCard
          label="AI readiness"
          value={`${String(Math.round(readNumber(snapshot.aggregateScore) * 100))}%`}
          detail="Latest visibility aggregate score"
        />
        <MetricCard
          label="Indexing job"
          value={readString(latestJob.status, "No jobs")}
          detail={readString(latestJob.provider, "External indexing")}
        />
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_380px]">
        <ChartPanel
          title="AI visibility trend"
          description="Demo trend appears until visibility history exists."
          data={demoVisibilityHistory}
        />
        <Panel title="Engine status" description="Health, queue, publishing, and generation status from existing APIs.">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span>Visibility snapshot</span>
              <StatusBadge
                label={readString(snapshot.status, "not scanned")}
                tone={toneForStatus(readString(snapshot.status, "neutral"))}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Indexing pipeline</span>
              <StatusBadge
                label={readString(latestJob.status, "no activity")}
                tone={toneForStatus(readString(latestJob.status, "neutral"))}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Publishing status</span>
              <StatusBadge label={`${String(publishRows.length || demoJobs.length)} jobs`} tone="neutral" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>AI generation status</span>
              <StatusBadge label={`${String(generationRows.length || demoJobs.length)} jobs`} tone="neutral" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Operations health</span>
              <StatusBadge
                label={readString(asRecord(readData(opsHealth.data)).status, "unknown")}
                tone={toneForStatus(readString(asRecord(readData(opsHealth.data)).status, "neutral"))}
              />
            </div>
          </div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <Panel title="Provider status" description="Provider surfaces consumed through engine APIs.">
          {providerStatus.isLoading ? <LoadingState label="Loading provider status" /> : null}
          {providerStatus.error ? <ErrorState error={providerStatus.error} /> : null}
          {providerStatus.data ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {providerStatus.data.map((item, index) => (
                <div key={index} className="rounded-md border border-line bg-slate-50 p-3 text-sm">
                  <p className="font-medium text-ink">Provider group {String(index + 1)}</p>
                  <p className="mt-1 text-slate-600">{JSON.stringify(readData(item)).slice(0, 160)}</p>
                </div>
              ))}
            </div>
          ) : null}
        </Panel>
      </div>
    </>
  )
}

function readArraySafe(value: unknown, key: string): unknown[] {
  const record = asRecord(value)
  return Array.isArray(record[key]) ? record[key] : []
}
