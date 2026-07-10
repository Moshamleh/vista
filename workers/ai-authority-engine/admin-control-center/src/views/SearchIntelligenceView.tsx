import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEngineClient } from "../api/useEngineClient"
import { ActionButton } from "../components/ActionButton"
import { MetricCard } from "../components/MetricCard"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { LoadingState } from "../components/QueryState"
import { StatusBadge } from "../components/StatusBadge"
import { asRecord, readData, stringifyValue } from "../lib/data"

export function SearchIntelligenceView() {
  const client = useEngineClient()
  const queryClient = useQueryClient()
  const indexStatus = useQuery({ queryKey: ["index-status"], queryFn: () => client.getIndexStatus() })
  const searchConsole = useQuery({
    queryKey: ["search-console-status"],
    queryFn: () => client.getSearchConsoleStatus()
  })
  const bing = useQuery({ queryKey: ["bing-status"], queryFn: () => client.getBingStatus() })
  const sitemap = useMutation({
    mutationFn: () => client.generateSitemap(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["index-status"] })
  })
  const robots = useMutation({
    mutationFn: () => client.generateRobots(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["index-status"] })
  })
  const llms = useMutation({
    mutationFn: () => client.generateLlms(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["index-status"] })
  })
  const status = asRecord(readData(indexStatus.data))
  const latestSitemap = asRecord(status.latestSitemap)
  const latestRobots = asRecord(status.latestRobots)
  const latestLlms = asRecord(status.latestLlms)
  const searchConsoleStatus = asRecord(readData(searchConsole.data))
  const bingStatus = asRecord(readData(bing.data))

  return (
    <>
      <PageHeader
        title="Search Intelligence"
        description="Control indexing resources, sitemap health, RSS readiness, robots.txt, and llms.txt generation."
      />
      {indexStatus.isLoading ? <LoadingState /> : null}
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        <MetricCard
          label="Sitemap"
          value={latestSitemap.version ? `v${stringifyValue(latestSitemap.version)}` : "Not generated"}
          detail={`${stringifyValue(latestSitemap.urlCount, "0")} URLs`}
        />
        <MetricCard
          label="robots.txt"
          value={latestRobots.version ? `v${stringifyValue(latestRobots.version)}` : "Not generated"}
          detail="Version-managed directives"
        />
        <MetricCard
          label="llms.txt"
          value={latestLlms.version ? `v${stringifyValue(latestLlms.version)}` : "Not generated"}
          detail="AI discovery resource"
        />
        <MetricCard
          label="Google"
          value={stringifyValue(searchConsoleStatus.status, "Needs config")}
          detail="Search Console integration"
        />
        <MetricCard label="Bing" value={stringifyValue(bingStatus.status, "Needs config")} detail="Webmaster Tools" />
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <Panel
          title="Index resources"
          action={
            <ResourceActions
              sitemap={() => sitemap.mutate()}
              robots={() => robots.mutate()}
              llms={() => llms.mutate()}
              busy={sitemap.isPending || robots.isPending || llms.isPending}
            />
          }
        >
          <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(status, null, 2)}
          </pre>
        </Panel>
        <Panel title="Google Search Console">
          <div className="mb-3 flex items-center justify-between rounded-md border border-line bg-slate-50 p-3 text-sm">
            <span className="font-medium text-ink">Connection</span>
            <StatusBadge label={stringifyValue(searchConsoleStatus.status, "not configured")} tone="warning" />
          </div>
          <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(readData(searchConsole.data), null, 2)}
          </pre>
        </Panel>
        <Panel title="Bing Webmaster Tools">
          <div className="mb-3 flex items-center justify-between rounded-md border border-line bg-slate-50 p-3 text-sm">
            <span className="font-medium text-ink">Connection</span>
            <StatusBadge label={stringifyValue(bingStatus.status, "not configured")} tone="warning" />
          </div>
          <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(readData(bing.data), null, 2)}
          </pre>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Panel title="IndexNow status" description="Batch URL submission is handled through the indexing endpoints.">
          <StatusBadge label={stringifyValue(status.indexNowStatus, "ready for configured provider")} tone="good" />
        </Panel>
        <Panel title="RSS status" description="RSS health is tracked as part of generated index resources.">
          <StatusBadge label={stringifyValue(status.rssStatus, "monitored")} tone="good" />
        </Panel>
        <Panel
          title="AI discovery endpoints"
          description="llms.txt and machine-readable resources are regenerated from content."
        >
          <StatusBadge
            label={latestLlms.version ? "generated" : "pending generation"}
            tone={latestLlms.version ? "good" : "warning"}
          />
        </Panel>
      </div>
    </>
  )
}

function ResourceActions({
  sitemap,
  robots,
  llms,
  busy
}: {
  readonly sitemap: () => void
  readonly robots: () => void
  readonly llms: () => void
  readonly busy: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton onClick={sitemap} disabled={busy}>
        Sitemap
      </ActionButton>
      <ActionButton onClick={robots} disabled={busy} variant="secondary">
        robots.txt
      </ActionButton>
      <ActionButton onClick={llms} disabled={busy} variant="secondary">
        llms.txt
      </ActionButton>
    </div>
  )
}
