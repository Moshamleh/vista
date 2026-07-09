/**
 * Base application error used to convert expected failures into JSON responses.
 */
export class ApiError extends Error {
  /**
   * @param {number} status HTTP status code.
   * @param {string} code Stable machine-readable error code.
   * @param {string} message Human-readable error message.
   * @param {Record<string, unknown>} [details] Optional structured details.
   */
  constructor(status, code, message, details = undefined) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.details = details
  }
}

/**
 * Creates a 400 validation error.
 * @param {string} message Validation message.
 * @param {Record<string, unknown>} [details] Optional field-level details.
 * @returns {ApiError}
 */
export function validationError(message, details = undefined) {
  return new ApiError(400, "validation_error", message, details)
}

/**
 * Converts an unknown thrown value to a safe API error.
 * @param {unknown} error Unknown thrown value.
 * @returns {ApiError}
 */
export function toApiError(error) {
  if (error instanceof ApiError) return error
  return new ApiError(500, "internal_error", "Unexpected server error.")
}
