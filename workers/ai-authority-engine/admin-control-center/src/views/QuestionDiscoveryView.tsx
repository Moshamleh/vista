import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { ErrorState, LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { demoQuestions, withDemo } from "../lib/demo-data"
import { readArray, readData, readNumber, readString } from "../lib/data"
import type { QuestionRecord } from "../types"

export function QuestionDiscoveryView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const [intent, setIntent] = useState("all")
  const [search, setSearch] = useState("")
  const [priorityOverrides, setPriorityOverrides] = useState<Record<string, number>>({})
  const [decisions, setDecisions] = useState<Partial<Record<string, "approved" | "rejected">>>({})
  const questions = useQuery({ queryKey: ["questions"], queryFn: () => client.listQuestions() })
  const stats = useQuery({ queryKey: ["question-stats"], queryFn: () => client.getQuestionStats() })
  const scan = useMutation({
    mutationFn: () =>
      client.runDiscovery({
        body: {
          seed: "AI visibility Dubai",
          market: "AE",
          language: "en",
          providers: ["internal-seed"],
          limit: 25,
          manualQuestions: []
        }
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] })
    }
  })
  const rows = useMemo(() => {
    const all = withDemo(readArray<QuestionRecord>(readData(questions.data), "questions"), demoQuestions)
    return all
      .filter((question) => (intent === "all" ? true : question.intent === intent))
      .filter((question) => question.question.toLowerCase().includes(search.toLowerCase()))
  }, [questions.data, intent, search])

  return (
    <>
      <PageHeader
        title="Question Discovery"
        description="Review discovered Dubai and UAE market questions, filter by intent, and run permitted discovery providers."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Panel
          title="Question queue"
          description="Questions are loaded from the engine's discovery API."
          action={
            <div className="flex flex-wrap gap-2">
              <select
                className="rounded-md border border-line bg-white px-3 py-2 text-sm"
                value={intent}
                onChange={(event) => setIntent(event.target.value)}
                aria-label="Filter by intent"
              >
                <option value="all">All intents</option>
                <option value="informational">Informational</option>
                <option value="commercial">Commercial</option>
                <option value="transactional">Transactional</option>
                <option value="navigational">Navigational</option>
              </select>
              <input
                className="w-56 rounded-md border border-line bg-white px-3 py-2 text-sm"
                placeholder="Search questions"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <ActionButton onClick={() => scan.mutate()} disabled={scan.isPending}>
                {scan.isPending ? "Scanning" : "Run discovery"}
              </ActionButton>
            </div>
          }
        >
          {questions.isLoading ? <LoadingState /> : null}
          {questions.error ? <ErrorState error={questions.error} /> : null}
          <DataTable
            rows={rows}
            empty="No discovered questions match this filter."
            columns={[
              { header: "Question", render: (row) => <span className="font-medium text-ink">{row.question}</span> },
              { header: "Intent", render: (row) => <StatusBadge label={readString(row.intent, "unclassified")} /> },
              {
                header: "Priority",
                render: (row) => (
                  <input
                    aria-label={`Priority for ${row.question}`}
                    className="w-20 rounded-md border border-line px-2 py-1"
                    type="number"
                    min="0"
                    max="100"
                    value={priorityOverrides[row.id] ?? Math.round(readNumber(row.priorityScore) * 100)}
                    onChange={(event) =>
                      setPriorityOverrides((current) => ({ ...current, [row.id]: Number(event.target.value) }))
                    }
                  />
                )
              },
              {
                header: "Review",
                render: (row) => {
                  const decision = decisions[row.id]
                  return (
                    <div className="flex gap-2">
                      <ActionButton
                        variant="secondary"
                        onClick={() => setDecisions((current) => ({ ...current, [row.id]: "approved" }))}
                      >
                        Approve
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        onClick={() => setDecisions((current) => ({ ...current, [row.id]: "rejected" }))}
                      >
                        Reject
                      </ActionButton>
                      {decision ? (
                        <StatusBadge label={decision} tone={decision === "approved" ? "good" : "danger"} />
                      ) : null}
                    </div>
                  )
                }
              }
            ]}
          />
        </Panel>
        <Panel title="Discovery stats" description="Priority and coverage signals from the discovery engine.">
          {stats.isLoading ? <LoadingState /> : null}
          {stats.data ? (
            <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(readData(stats.data), null, 2)}
            </pre>
          ) : null}
        </Panel>
      </div>
    </>
  )
}
