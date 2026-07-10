import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useEngineClient } from "../api/useEngineClient"
import { adminOpenApiEndpoints } from "../api/admin-openapi"
import { ActionButton } from "../components/ActionButton"
import { DataTable } from "../components/DataTable"
import { MetricCard } from "../components/MetricCard"
import { PageHeader } from "../components/PageHeader"
import { Panel } from "../components/Panel"
import { StatusBadge } from "../components/StatusBadge"
import { useAuth } from "../auth/AuthContext"
import { asRecord, readData, stringifyValue } from "../lib/data"

export function SettingsView() {
  const { session, updateSession } = useAuth()
  const [baseUrl, setBaseUrl] = useState(session.baseUrl)
  const [apiKey, setApiKey] = useState(session.apiKey)
  const client = useEngineClient()
  const generationProviders = useQuery({
    queryKey: ["settings-generation-providers"],
    queryFn: () => client.listGenerationProviders()
  })
  const publisherProviders = useQuery({
    queryKey: ["settings-publisher-providers"],
    queryFn: () => client.listPublisherProviders()
  })
  const opsHealth = useQuery({ queryKey: ["settings-ops-health"], queryFn: () => client.getOperationsHealth() })
  const readiness = useQuery({ queryKey: ["settings-readiness"], queryFn: () => client.getOperationsReadiness() })
  const infrastructure = useQuery({
    queryKey: ["settings-infrastructure"],
    queryFn: () => client.getOperationsInfrastructure()
  })
  const healthData = asRecord(readData(opsHealth.data))
  const readinessData = asRecord(readData(readiness.data))
  const infrastructureData = asRecord(readData(infrastructure.data))

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure admin authentication, inspect provider surfaces, review feature flags, and confirm cron-controlled capabilities."
      />
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <MetricCard
          label="API key"
          value={apiKey.length > 0 ? "Configured" : "Missing"}
          detail="Stored in this browser session"
        />
        <MetricCard
          label="Environment"
          value={stringifyValue(healthData.status, "Unknown")}
          detail="Operations health endpoint"
        />
        <MetricCard
          label="Readiness"
          value={stringifyValue(readinessData.status, "Unknown")}
          detail="Deployment checks"
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel
          title="Engine authentication"
          description="The admin app authenticates with the engine's existing API key header."
        >
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Engine API URL
              <input
                className="mt-2 w-full rounded-md border border-line px-3 py-2"
                value={baseUrl}
                onChange={(event) => setBaseUrl(event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              API key
              <input
                className="mt-2 w-full rounded-md border border-line px-3 py-2"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                type="password"
              />
            </label>
            <ActionButton onClick={() => updateSession({ baseUrl, apiKey })}>Save connection</ActionButton>
          </div>
        </Panel>
        <Panel title="Documented API coverage" description="Routes consumed by the generated admin API client.">
          <DataTable
            rows={[...adminOpenApiEndpoints]}
            empty="No endpoints are registered."
            columns={[
              { header: "Operation", render: (row) => row.operationId },
              { header: "Method", render: (row) => row.method },
              { header: "Path", render: (row) => row.path }
            ]}
          />
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel title="Providers">
          <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(
              { generation: readData(generationProviders.data), publishing: readData(publisherProviders.data) },
              null,
              2
            )}
          </pre>
        </Panel>
        <Panel
          title="Feature flags and cron schedules"
          description="Backend flags are controlled by Worker environment variables and Wrangler Cron Triggers."
        >
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <SettingItem label="Question discovery" value="QUESTION_DISCOVERY_CRON_SEED" />
            <SettingItem label="Visibility scans" value="VISIBILITY_SCAN_CRON_ENABLED" />
            <SettingItem label="Search indexing" value="EXTERNAL_INDEXING_CRON_ENABLED" />
            <SettingItem label="Buying signals" value="PUBLIC_BUYING_SIGNAL_CRON_ENABLED" />
          </dl>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel title="Environment health">
          <div className="mb-3 flex items-center justify-between rounded-md border border-line bg-slate-50 p-3 text-sm">
            <span className="font-medium text-ink">Operations status</span>
            <StatusBadge label={stringifyValue(healthData.status, "not reported")} tone="good" />
          </div>
          <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify({ health: healthData, readiness: readinessData }, null, 2)}
          </pre>
        </Panel>
        <Panel title="Cloudflare bindings">
          <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(infrastructureData, null, 2)}
          </pre>
        </Panel>
      </div>
    </>
  )
}

function SettingItem({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="rounded-md border border-line bg-slate-50 p-3">
      <dt className="font-medium text-ink">{label}</dt>
      <dd className="mt-1 break-all text-slate-600">{value}</dd>
    </div>
  )
}
