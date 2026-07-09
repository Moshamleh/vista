import { AppError } from "../errors/app-error"

export interface ObjectSchema<T> {
  parse(value: unknown): T
}

/**
 * Reads and parses a JSON request body.
 */
export async function readJson(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new AppError({
      status: 415,
      code: "unsupported_media_type",
      message: "Content-Type must be application/json"
    })
  }
  try {
    return await request.json()
  } catch {
    throw new AppError({ status: 400, code: "invalid_json", message: "Request body must be valid JSON" })
  }
}

/**
 * Validates a value with a typed schema wrapper.
 */
export function validate<T>(schema: ObjectSchema<T>, value: unknown): T {
  return schema.parse(value)
}

/**
 * Asserts that a value is a non-null object.
 */
export function assertRecord(value: unknown, code = "validation_error"): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code, message: "Expected a JSON object" })
  }
  return value as Record<string, unknown>
}
