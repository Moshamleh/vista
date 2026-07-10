import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoJobs, withDemo } from "../lib/demo-data"
import { readArray, readData, readString, toneForStatus } from "../lib/data"
import type { JobRecord, UnknownRecord } from "../types"

export function AIGenerationView() {
  const client = useEngineClient()
  const [question, setQuestion] = useState("Why is AI not recommending my Dubai business?")
  const [contentType, setContentType] = useState("Authority Article")
  const jobs = useQuery({ queryKey: ["generation-jobs"], queryFn: () => client.listGenerationJobs() })
  const providers = useQuery({ queryKey: ["generation-providers"], queryFn: () => client.listGenerationProviders() })
  const providerTest = useMutation({ mutationFn: () => client.testGenerationProvider() })
  const generate = useMutation({
    mutationFn: () => client.createGeneration({ body: { question, contentType, async: true, minWordCount: 900 } })
  })
  const rows = withDemo(readArray<JobRecord>(readData(jobs.data), "jobs"), demoJobs)

  return (
    <>
      <PageHeader
        title="AI Generation"
        description="Track generation jobs, active providers, token metadata, and validation outcomes."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Panel
          title="Generate new content"
          description="Creates an async generation job through the existing /generate API."
          action={
            <ActionButton onClick={() => generate.mutate()} disabled={generate.isPending}>
              Generate
            </ActionButton>
          }
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
            <input
              className="rounded-md border border-line px-3 py-2"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <select
              className="rounded-md border border-line px-3 py-2"
              value={contentType}
              onChange={(event) => setContentType(event.target.value)}
            >
              <option>Authority Article</option>
              <option>FAQ</option>
              <option>Knowledge Page</option>
              <option>Service Page</option>
              <option>Landing Page</option>
              <option>Case Study</option>
            </select>
          </div>
          {generate.data ? <ProviderJson payload={readData(generate.data)} /> : null}
        </Panel>
        <Panel title="Generation jobs">
          {jobs.isLoading ? <LoadingState /> : null}
          {jobs.error ? <ErrorState error={jobs.error} /> : null}
          <DataTable
            rows={rows}
            empty="No generation jobs are available."
            columns={[
              { header: "Job", render: (row) => row.id },
              {
                header: "Status",
                render: (row) => <StatusBadge label={row.status} tone={toneForStatus(row.status)} />
              },
              { header: "Provider", render: (row) => readString(row.provider, "provider not reported") },
              {
                header: "Tokens",
                render: (row) => JSON.stringify(row.generationMetadata ?? {}).slice(0, 42)
              },
              { header: "Updated", render: (row) => readString(row.updatedAt ?? row.createdAt, "not reported") }
            ]}
          />
        </Panel>
        <Panel
          title="Provider and validation"
          description="Provider checks use the documented provider test endpoint."
          action={
            <ActionButton onClick={() => providerTest.mutate()} disabled={providerTest.isPending}>
              Test provider
            </ActionButton>
          }
        >
          {providers.isLoading ? <LoadingState label="Loading providers" /> : null}
          {providers.data ? <ProviderJson payload={readData(providers.data)} /> : null}
          {providerTest.data ? <ProviderJson payload={readData(providerTest.data)} /> : null}
        </Panel>
      </div>
    </>
  )
}

function ProviderJson({ payload }: { readonly payload: UnknownRecord }) {
  return (
    <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
      {JSON.stringify(payload, null, 2)}
    </pre>
  )
}
