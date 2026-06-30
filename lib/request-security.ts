import { timingSafeEqual } from "node:crypto"

const ALLOWED_ORIGIN_HOSTS = new Set([
  "vistabylara.com",
  "www.vistabylara.com",
  "localhost:3000",
  "127.0.0.1:3000",
])

export function hasAllowedOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false

  const origin = request.headers.get("origin")
  if (!origin) return true

  try {
    const requestHost = new URL(request.url).host
    const originHost = new URL(origin).host

    return originHost === requestHost || ALLOWED_ORIGIN_HOSTS.has(originHost)
  } catch {
    return false
  }
}

export function getRequestToken(request: Request) {
  return request.headers.get("x-auth-token") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || ""
}

export function hasValidToken(suppliedToken: string, expectedToken: string | undefined) {
  if (!expectedToken || !suppliedToken) return false

  const supplied = Buffer.from(suppliedToken)
  const expected = Buffer.from(expectedToken)

  if (supplied.length !== expected.length) return false

  return timingSafeEqual(supplied, expected)
}
