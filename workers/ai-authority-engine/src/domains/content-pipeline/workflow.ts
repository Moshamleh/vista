import { AppError } from "../../errors/app-error"
import type { ContentStatus } from "./types"

const allowedTransitions: ReadonlyMap<ContentStatus, readonly ContentStatus[]> = new Map([
  ["DISCOVERED", ["APPROVED", "ARCHIVED"]],
  ["APPROVED", ["PLANNED", "ARCHIVED"]],
  ["PLANNED", ["GENERATING", "ARCHIVED"]],
  ["GENERATING", ["GENERATED", "ARCHIVED"]],
  ["GENERATED", ["REVIEW_REQUIRED", "PLANNED", "ARCHIVED"]],
  ["REVIEW_REQUIRED", ["APPROVED_FOR_PUBLISHING", "PLANNED", "ARCHIVED"]],
  ["APPROVED_FOR_PUBLISHING", ["PUBLISHED", "REVIEW_REQUIRED", "ARCHIVED"]],
  ["PUBLISHED", ["UPDATED", "ARCHIVED"]],
  ["UPDATED", ["REVIEW_REQUIRED", "ARCHIVED"]],
  ["ARCHIVED", []]
])

/**
 * Validates whether a lifecycle transition is allowed.
 */
export function assertValidTransition(from: ContentStatus, to: ContentStatus): void {
  if (from === to) return
  if (!(allowedTransitions.get(from) ?? []).includes(to)) {
    throw new AppError({
      status: 409,
      code: "invalid_content_transition",
      message: `Cannot transition content from ${from} to ${to}`
    })
  }
}

/**
 * Computes the approve action target for the current content status.
 */
export function approvalTarget(status: ContentStatus): ContentStatus {
  if (status === "DISCOVERED") return "APPROVED"
  if (status === "REVIEW_REQUIRED") return "APPROVED_FOR_PUBLISHING"
  throw new AppError({
    status: 409,
    code: "content_not_approvable",
    message: `Content in ${status} cannot be approved by this action`
  })
}

/**
 * Computes the reject action target for the current content status.
 */
export function rejectionTarget(status: ContentStatus): ContentStatus {
  if (status === "REVIEW_REQUIRED" || status === "APPROVED_FOR_PUBLISHING" || status === "GENERATED") return "PLANNED"
  throw new AppError({
    status: 409,
    code: "content_not_rejectable",
    message: `Content in ${status} cannot be rejected by this action`
  })
}

/**
 * Verifies a content asset can enter the publication queue.
 */
export function assertSchedulable(status: ContentStatus): void {
  if (status !== "APPROVED_FOR_PUBLISHING") {
    throw new AppError({
      status: 409,
      code: "content_not_schedulable",
      message: "Only content approved for publishing can be scheduled"
    })
  }
}
