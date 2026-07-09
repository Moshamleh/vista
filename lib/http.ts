type FetchWithTimeoutInit = RequestInit & {
  timeoutMs?: number
}

export async function fetchWithTimeout(input: RequestInfo | URL, init: FetchWithTimeoutInit = {}) {
  const { timeoutMs = 8_000, ...fetchInit } = init
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(input, {
      ...fetchInit,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

export async function readJsonWithLimit<T = unknown>(response: Response, maxBytes = 64_000): Promise<T> {
  const text = await response.text()

  if (text.length > maxBytes) {
    throw new Error("Response body is too large.")
  }

  return JSON.parse(text) as T
}
