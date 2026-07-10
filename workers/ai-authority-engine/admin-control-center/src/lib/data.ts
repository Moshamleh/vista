import type { ApiEnvelope } from "../api/generated/client"
import type { UnknownRecord } from "../types"

export function asRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as UnknownRecord) : {}
}

export function readData<T = UnknownRecord>(envelope: ApiEnvelope | undefined): T {
  return (envelope?.data ?? {}) as T
}

export function readArray<T>(value: unknown, key: string): T[] {
  const record = asRecord(value)
  const nested = record[key]
  return Array.isArray(nested) ? (nested as T[]) : []
}

export function readNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

export function readString(value: unknown, fallback = "Not reported"): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback
}

export function stringifyValue(value: unknown, fallback = "not reported"): string {
  if (typeof value === "string" && value.length > 0) return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return fallback
}

export function formatPercent(value: unknown): string {
  const number = readNumber(value)
  return `${String(Math.round(number * 100))}%`
}

export function toneForStatus(status: string | undefined): "neutral" | "good" | "warning" | "danger" {
  const normalized = (status ?? "").toLowerCase()
  if (["healthy", "ready", "succeeded", "completed", "published", "open"].includes(normalized)) return "good"
  if (["pending", "running", "review_required", "retry"].includes(normalized)) return "warning"
  if (["failed", "cancelled", "rejected"].includes(normalized)) return "danger"
  return "neutral"
}
