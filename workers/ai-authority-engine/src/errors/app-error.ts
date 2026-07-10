/**
 * Structured application error converted into JSON API responses.
 */
export class AppError extends Error {
  readonly status: number
  readonly code: string
  readonly expose: boolean
  readonly details: Record<string, unknown> | undefined

  /**
   * Creates a structured application error.
   */
  constructor(input: {
    status: number
    code: string
    message: string
    expose?: boolean
    details?: Record<string, unknown>
  }) {
    super(input.message)
    this.name = "AppError"
    this.status = input.status
    this.code = input.code
    this.expose = input.expose ?? input.status < 500
    this.details = input.details
  }
}

/**
 * Converts unknown thrown values to safe AppError instances.
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error
  if (error instanceof Error) {
    return new AppError({ status: 500, code: "internal_error", message: error.message, expose: false })
  }
  return new AppError({ status: 500, code: "internal_error", message: "Unexpected server error", expose: false })
}
