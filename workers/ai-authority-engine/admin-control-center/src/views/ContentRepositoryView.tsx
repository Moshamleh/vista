import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoContent, withDemo } from "../lib/demo-data"
import { readArray, readData, readString, toneForStatus } from "../lib/data"
import type { ContentRecord } from "../types"

export function ContentRepositoryView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const [version, setVersion] = useState("1")
  const content = useQuery({ queryKey: ["content"], queryFn: () => client.listContent() })
  const approve = useMutation({
    mutationFn: (id: string) => client.approveContent({ path: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["content"] })
  })
  const reject = useMutation({
    mutationFn: (id: string) => client.rejectContent({ path: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["content"] })
  })
  const rollback = useMutation({
    mutationFn: (id: string) =>
      client.rollbackContent({ path: { id }, body: { versionNumber: Number.parseInt(version, 10) } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["content"] })
  })
  const rows = withDemo(readArray<ContentRecord>(readData(content.data), "content"), demoContent)

  return (
    <>
      <PageHeader
        title="Content Repository"
        description="Manage content lifecycle, editorial status, immutable versions, and rollback actions."
      />
      <Panel
        title="Content assets"
        description="Only documented content repository endpoints are used."
        action={
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Rollback version
            <input
              className="w-20 rounded-md border border-line px-2 py-1"
              value={version}
              onChange={(event) => setVersion(event.target.value)}
              inputMode="numeric"
            />
          </label>
        }
      >
        {content.isLoading ? <LoadingState /> : null}
        {content.error ? <ErrorState error={content.error} /> : null}
        <DataTable
          rows={rows}
          empty="No content assets are available."
          columns={[
            {
              header: "Title",
              render: (row) => (
                <div>
                  <span className="font-medium text-ink">{row.title}</span>
                  <p className="text-xs text-slate-500">{row.contentType ?? "Authority Article"}</p>
                </div>
              )
            },
            {
              header: "Workflow",
              render: (row) => <StatusBadge label={row.status} tone={toneForStatus(row.status)} />
            },
            { header: "Version", render: (row) => String(row.currentVersion ?? 1) },
            { header: "Updated", render: (row) => readString(row.updatedAt, "not reported") },
            {
              header: "Actions",
              render: (row) => (
                <div className="flex flex-wrap gap-2">
                  <ActionButton variant="secondary" onClick={() => approve.mutate(row.id)} disabled={approve.isPending}>
                    Approve
                  </ActionButton>
                  <ActionButton variant="danger" onClick={() => reject.mutate(row.id)} disabled={reject.isPending}>
                    Reject
                  </ActionButton>
                  <ActionButton onClick={() => rollback.mutate(row.id)} disabled={rollback.isPending}>
                    Rollback
                  </ActionButton>
                  <Link
                    className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white"
                    to={`/content/${row.id}/preview`}
                  >
                    Preview
                  </Link>
                </div>
              )
            }
          ]}
        />
      </Panel>
    </>
  )
}
