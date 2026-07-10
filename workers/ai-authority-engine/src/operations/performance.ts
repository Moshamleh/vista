import type { AppContainer } from "../di/container"

export interface PerformanceFinding {
  area: string
  severity: "info" | "warn" | "critical"
  message: string
}

/**
 * Produces a static performance review from known migrations and runtime configuration.
 */
export function reviewPerformance(container: AppContainer): { score: number; findings: PerformanceFinding[] } {
  const findings: PerformanceFinding[] = [
    {
      area: "database",
      severity: "info",
      message: "Primary list, status, job, provider, and date indexes are present in migrations."
    },
    {
      area: "queue",
      severity: "info",
      message: "Queue batch size is 10 with retry and dead-letter behavior configured."
    },
    {
      area: "cron",
      severity: "warn",
      message: "One 15-minute cron fans out multiple operational tasks; monitor duration after production data grows."
    },
    {
      area: "cache",
      severity: "info",
      message: "KV-backed caching and rate windows are available through CACHE binding."
    },
    {
      area: "ai",
      severity: container.config.aiDailyTokenLimit ? "info" : "warn",
      message: "AI budget limits should be configured before high-volume generation."
    }
  ]
  const penalty = findings.filter((finding) => finding.severity === "warn").length * 8
  return { score: Math.max(0, 100 - penalty), findings }
}
