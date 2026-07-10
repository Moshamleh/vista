import { describe, expect, it } from "vitest"
import { exportJWK, generateKeyPair, SignJWT } from "jose"
import { authenticateRequest } from "../src/auth/auth-middleware"
import { loadConfig, type AppBindings } from "../src/config/env"
import { handleScheduled } from "../src/cron/cron"
import { AppError } from "../src/errors/app-error"
import { failureResponse, successResponse } from "../src/http/response"
import type { RequestContext } from "../src/http/request-context"
import { Logger } from "../src/logger/logger"
import { generateOpenApi } from "../src/openapi/openapi"
import { hmacSha256Hex } from "../src/operations/api-protection"
import { QueueClient, type AuthorityQueueMessage } from "../src/queues/queue-client"
import { D1JsonRepository } from "../src/repositories/d1-repository"
import { routeRequest } from "../src/router"
import { KvJsonStore } from "../src/storage/kv-store"
import type { D1Database, D1PreparedStatement, KVNamespace, Queue } from "../src/types/cloudflare"
import { assertRecord, readJson } from "../src/validation/validator"

interface TestRecord {
  id: string
  createdAt: string
  updatedAt: string
  name: string
}

class MemoryStatement implements D1PreparedStatement {
  private values: unknown[] = []

  constructor(
    private readonly table: Map<string, string>,
    private readonly query: string
  ) {}

  bind(...values: unknown[]): D1PreparedStatement {
    this.values = values
    return this
  }

  async first<T>(): Promise<T | null> {
    if (this.query.startsWith("select 1")) return { ok: 1 } as T
    const id = String(this.values[0])
    const document = this.table.get(id)
    return document ? ({ document } as T) : null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const id = String(this.values[0])
    if (this.query.startsWith("delete")) this.table.delete(id)
    else this.table.set(id, String(this.values[1]))
    return { success: true }
  }
}

class MemoryD1 implements D1Database {
  readonly table = new Map<string, string>()

  prepare(query: string): D1PreparedStatement {
    return new MemoryStatement(this.table, query)
  }
}

class MemoryKv implements KVNamespace {
  readonly values = new Map<string, string>()

  async get(key: string): Promise<string | null> {
    return this.values.get(key) ?? null
  }

  async put(key: string, value: string): Promise<void> {
    this.values.set(key, value)
  }

  async delete(key: string): Promise<void> {
    this.values.delete(key)
  }
}

class MemoryQueue implements Queue<AuthorityQueueMessage> {
  readonly messages: AuthorityQueueMessage[] = []

  async send(message: AuthorityQueueMessage): Promise<void> {
    this.messages.push(message)
  }
}

function createEnv(
  overrides: Partial<Record<keyof AppBindings, AppBindings[keyof AppBindings] | undefined>> = {}
): AppBindings {
  return {
    NODE_ENV: "test",
    SERVICE_NAME: "vista-ai-authority-engine",
    SERVICE_VERSION: "1.0.0",
    AUTH_ISSUER: "issuer",
    AUTH_AUDIENCE: "audience",
    AUTH_SHARED_SECRET: "secret",
    LOG_LEVEL: "debug",
    RATE_LIMIT_MAX: "120",
    RATE_LIMIT_WINDOW_SECONDS: "60",
    OPENAPI_TITLE: "Vista AI Authority Engine",
    OPENAPI_VERSION: "1.0.0",
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  } as AppBindings
}

describe("configuration", () => {
  it("loads typed environment configuration", () => {
    const config = loadConfig(createEnv())
    expect(config.serviceName).toBe("vista-ai-authority-engine")
    expect(config.rateLimitMax).toBe(120)
  })

  it("rejects invalid environment configuration", () => {
    expect(() => loadConfig(createEnv({ RATE_LIMIT_MAX: "0" }))).toThrow("positive integer")
  })
})

describe("logging", () => {
  it("emits structured JSON logs", () => {
    const originalLog = console.log
    const lines: string[] = []
    console.log = (value?: unknown) => {
      lines.push(String(value))
    }
    const logger = new Logger(loadConfig(createEnv()))

    logger.info("foundation-ready", { route: "/health" }, "request-1")

    expect(lines).toHaveLength(1)
    const payload = JSON.parse(lines[0] ?? "") as { message: string; requestId: string }
    expect(payload.message).toBe("foundation-ready")
    expect(payload.requestId).toBe("request-1")
    console.log = originalLog
  })
})

describe("responses and validation", () => {
  it("formats success and failure responses", async () => {
    const ok = (await successResponse({ status: "healthy" }, "req").json()) as { ok: boolean }
    const failed = (await failureResponse(
      new AppError({ status: 400, code: "bad", message: "Bad request" }),
      "req"
    ).json()) as {
      ok: boolean
      error: { code: string }
    }

    expect(ok).toMatchObject({ ok: true })
    expect(failed).toMatchObject({ ok: false, error: { code: "bad" } })
  })

  it("reads JSON and asserts object input", async () => {
    const request = new Request("https://worker.test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true })
    })
    expect(assertRecord(await readJson(request))).toEqual({ ok: true })
  })
})

describe("authentication", () => {
  it("authenticates shared secret keys", async () => {
    const request = new Request("https://worker.test/diagnostics", { headers: { "x-api-key": "secret" } })
    const context: RequestContext = { requestId: "req", startedAt: Date.now(), auth: null }
    const principal = await authenticateRequest(
      request,
      loadConfig(createEnv()),
      context,
      new KvJsonStore(new MemoryKv())
    )

    expect(principal.subject).toBe("api-key")
    expect(context.auth?.scopes).toContain("foundation:read")
  })

  it("authenticates signed JWTs through JWKS and rejects replay", async () => {
    const originalFetch = globalThis.fetch
    const { publicKey, privateKey } = await generateKeyPair("RS256")
    const jwk = await exportJWK(publicKey)
    const jwks = { keys: [{ ...jwk, kid: "test-key", alg: "RS256", use: "sig" }] }
    globalThis.fetch = async () =>
      new Response(JSON.stringify(jwks), { headers: { "content-type": "application/json" } })

    const token = await new SignJWT({ scope: "foundation:read" })
      .setProtectedHeader({ alg: "RS256", kid: "test-key" })
      .setIssuer("issuer")
      .setAudience("audience")
      .setSubject("client")
      .setJti("jwt-1")
      .setExpirationTime("2m")
      .sign(privateKey)
    const request = new Request("https://worker.test/diagnostics", { headers: { authorization: `Bearer ${token}` } })
    const context: RequestContext = { requestId: "req", startedAt: Date.now(), auth: null }
    const cache = new KvJsonStore(new MemoryKv())
    const config = loadConfig(
      createEnv({ AUTH_SHARED_SECRET: undefined, AUTH_JWKS_URL: "https://issuer.test/.well-known/jwks.json" })
    )
    const principal = await authenticateRequest(request, config, context, cache)

    expect(principal.subject).toBe("client")
    expect(principal.scopes).toEqual(["foundation:read"])
    await expect(authenticateRequest(request, config, context, cache)).rejects.toThrow("already been used")
    globalThis.fetch = originalFetch
  })
})

describe("storage and repositories", () => {
  it("stores JSON in KV", async () => {
    const kv = new MemoryKv()
    const store = new KvJsonStore(kv)

    await store.putJson("key", { value: 1 })
    expect(await store.getJson<{ value: number }>("key")).toEqual({ value: 1 })
  })

  it("saves and deletes records through the repository pattern", async () => {
    const db = new MemoryD1()
    const repository = new D1JsonRepository<TestRecord>(db, "records")
    const record = { id: "rec-1", createdAt: "2026-06-30T00:00:00Z", updatedAt: "2026-06-30T00:00:00Z", name: "Vista" }

    await repository.save(record)
    expect(await repository.findById("rec-1")).toEqual(record)
    await repository.delete("rec-1")
    expect(await repository.findById("rec-1")).toBeNull()
  })
})

describe("queues and cron", () => {
  it("sends typed queue messages", async () => {
    const queue = new MemoryQueue()
    const client = new QueueClient(queue)

    await client.send({ id: "msg-1", type: "foundation.event", payload: { ok: true } })

    expect(queue.messages[0]?.timestamp).toBeDefined()
    expect(queue.messages[0]?.type).toBe("foundation.event")
  })

  it("accepts cron triggers", () => {
    const logger = new Logger(loadConfig(createEnv()))
    const result = handleScheduled({ cron: "*/15 * * * *", scheduledTime: 1782813600000 }, logger)

    expect(result.status).toBe("accepted")
  })
})

describe("OpenAPI and routing", () => {
  it("generates OpenAPI for shared endpoints", () => {
    const spec = generateOpenApi(loadConfig(createEnv()), "https://worker.test")
    expect(spec).toMatchObject({ openapi: "3.1.0" })
  })

  it("routes health, diagnostics, and unknown endpoints", async () => {
    const env = createEnv()
    const health = await routeRequest(new Request("https://worker.test/health"), env)
    const diagnostics = await routeRequest(
      new Request("https://worker.test/diagnostics", { headers: { "x-api-key": "secret" } }),
      env
    )
    const missing = await routeRequest(
      new Request("https://worker.test/missing", { headers: { "x-api-key": "secret" } }),
      env
    )

    expect(health.status).toBe(200)
    expect(diagnostics.status).toBe(200)
    expect(missing.status).toBe(404)
  })

  it("routes operations health and readiness endpoints", async () => {
    const env = createEnv()
    const headers = { "x-api-key": "secret" }
    const health = await routeRequest(new Request("https://worker.test/ops/health", { headers }), env)
    const readiness = await routeRequest(new Request("https://worker.test/ops/readiness", { headers }), env)
    const openApi = generateOpenApi(loadConfig(env), "https://worker.test")

    expect(health.status).toBe(200)
    expect(readiness.status).toBe(200)
    expect(JSON.stringify(openApi)).toContain("/ops/health")
  })

  it("enforces global rate limits", async () => {
    const env = createEnv({ RATE_LIMIT_MAX: "1", RATE_LIMIT_WINDOW_SECONDS: "60" })
    const headers = { "x-api-key": "secret", "cf-connecting-ip": "203.0.113.10" }
    const first = await routeRequest(new Request("https://worker.test/diagnostics", { headers }), env)
    const second = await routeRequest(new Request("https://worker.test/diagnostics", { headers }), env)

    expect(first.status).toBe(200)
    expect(second.status).toBe(429)
  })

  it("enforces signed requests and nonce replay protection when configured", async () => {
    const env = createEnv({ REQUEST_SIGNING_SECRET: "signing-secret" })
    const timestamp = String(Math.floor(Date.now() / 1000))
    const nonce = "nonce-1"
    const signature = await hmacSha256Hex("signing-secret", `GET\n/diagnostics\n${timestamp}\n${nonce}`)
    const headers = {
      "x-api-key": "secret",
      "x-signature": signature,
      "x-signature-timestamp": timestamp,
      "x-nonce": nonce,
      "cf-connecting-ip": "203.0.113.11"
    }
    const first = await routeRequest(new Request("https://worker.test/diagnostics", { headers }), env)
    const replayed = await routeRequest(new Request("https://worker.test/diagnostics", { headers }), env)

    expect(first.status).toBe(200)
    expect(replayed.status).toBe(401)
  })

  it("fails closed when required bindings are absent", async () => {
    const response = await routeRequest(new Request("https://worker.test/health"), createEnv({ DB: undefined }))
    const body = (await response.json()) as { error: { code: string } }

    expect(response.status).toBe(503)
    expect(body.error.code).toBe("d1_not_configured")
  })
})
