import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoJobs, withDemo } from "../lib/demo-data"
import { readArray, readData, readString, toneForStatus } from "../lib/data"
import type { JobRecord } from "../types"

export function PublishingView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const jobs = useQuery({ queryKey: ["publish-jobs"], queryFn: () => client.listPublishJobs() })
  const providers = useQuery({ queryKey: ["publisher-providers"], queryFn: () => client.listPublisherProviders() })
  const providerHealth = useMutation({ mutationFn: () => client.testPublisherProviders() })
  const retry = useMutation({
    mutationFn: (contentId: string) => client.retryPublish({ path: { contentId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["publish-jobs"] })
  })
  const rows = withDemo(readArray<JobRecord & { contentId?: string }>(readData(jobs.data), "jobs"), demoJobs)

  return (
    <>
      <PageHeader
        title="Publishing"
        description="Monitor publish jobs, retry failed content, and inspect published URL status."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Panel title="Publish jobs">
          {jobs.isLoading ? <LoadingState /> : null}
          {jobs.error ? <ErrorState error={jobs.error} /> : null}
          <DataTable
            rows={rows}
            empty="No publish jobs are available."
            columns={[
              { header: "Job", render: (row) => row.id },
              {
                header: "Status",
                render: (row) => <StatusBadge label={row.status} tone={toneForStatus(row.status)} />
              },
              { header: "Published URL", render: (row) => readString(row.publishedUrl, "not published") },
              {
                header: "Retry",
                render: (row) => (
                  <ActionButton
                    disabled={!row.contentId || retry.isPending}
                    onClick={() => row.contentId && retry.mutate(row.contentId)}
                  >
                    Retry
                  </ActionButton>
                )
              }
            ]}
          />
        </Panel>
        <Panel
          title="Publisher health"
          description="Configured publisher adapters from the engine."
          action={
            <ActionButton onClick={() => providerHealth.mutate()} disabled={providerHealth.isPending}>
              Test publishers
            </ActionButton>
          }
        >
          {providers.isLoading ? <LoadingState /> : null}
          {providers.data ? (
            <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(readData(providers.data), null, 2)}
            </pre>
          ) : null}
          {providerHealth.data ? (
            <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(readData(providerHealth.data), null, 2)}
            </pre>
          ) : null}
        </Panel>
      </div>
    </>
  )
}
