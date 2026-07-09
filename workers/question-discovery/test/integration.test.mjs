import assert from "node:assert/strict"
import { createServer } from "node:http"
import test from "node:test"
import worker from "../src/index.mjs"

class TestKvNamespace {
  /**
   * Creates an isolated in-memory KV implementation for integration tests.
   */
  constructor() {
    this.values = new Map()
  }

  /**
   * Reads a value by key.
   * @param {string} key KV key.
   * @returns {Promise<string|null>}
   */
  async get(key) {
    return this.values.get(key) || null
  }

  /**
   * Writes a value by key.
   * @param {string} key KV key.
   * @param {string} value KV value.
   * @returns {Promise<void>}
   */
  async put(key, value) {
    this.values.set(key, value)
  }
}

/**
 * Starts a real local HTTP suggestion provider for integration tests.
 * @returns {Promise<{origin:string,close:()=>Promise<void>}>}
 */
async function createSuggestionServer() {
  const server = createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1")
    const query = url.searchParams.get("q") || url.searchParams.get("query") || ""
    const suggestions = [
      `what is ${query}`,
      `how much does ${query} cost in Dubai`,
      `which ${query} agency is best in UAE`,
      `${query} services Dubai`
    ]

    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify([query, suggestions]))
  })

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  const address = server.address()
  const origin = `http://127.0.0.1:${address.port}`

  return {
    origin,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  }
}

/**
 * Starts a real local HTTP provider that always returns an upstream error.
 * @returns {Promise<{origin:string,close:()=>Promise<void>}>}
 */
async function createFailingServer() {
  const server = createServer((_request, response) => {
    response.writeHead(503, { "content-type": "application/json" })
    response.end(JSON.stringify({ error: "provider unavailable" }))
  })

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  const address = server.address()
  const origin = `http://127.0.0.1:${address.port}`

  return {
    origin,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  }
}

/**
 * Creates a complete worker environment for integration tests.
 * @param {string} origin Local provider origin.
 * @param {Record<string,string|TestKvNamespace>} [overrides] Environment overrides.
 * @returns {Record<string,string|TestKvNamespace>}
 */
function createEnv(origin, overrides = {}) {
  return {
    QUESTION_DISCOVERY_API_KEYS: "test-key",
    QUESTION_DISCOVERY_RATE_LIMIT_KV: new TestKvNamespace(),
    QUESTION_DISCOVERY_RATE_LIMIT_MAX: "60",
    QUESTION_DISCOVERY_RATE_LIMIT_WINDOW_SECONDS: "60",
    QUESTION_DISCOVERY_PROVIDER_TIMEOUT_MS: "2000",
    GOOGLE_SUGGEST_ENDPOINT: `${origin}/google`,
    BING_SUGGEST_ENDPOINT: `${origin}/bing`,
    ...overrides
  }
}

/**
 * Reads a JSON response body.
 * @param {Response} response Fetch response.
 * @returns {Promise<unknown>}
 */
async function readJson(response) {
  return response.json()
}

test("GET /health returns public worker health", async () => {
  const response = await worker.fetch(new Request("https://worker.test/health"), {})
  const body = await readJson(response)

  assert.equal(response.status, 200)
  assert.equal(body.ok, true)
  assert.equal(body.worker, "question-discovery")
})

test("OPTIONS returns CORS preflight headers", async () => {
  const response = await worker.fetch(new Request("https://worker.test/discover", { method: "OPTIONS" }), {})

  assert.equal(response.status, 204)
  assert.equal(response.headers.get("access-control-allow-methods"), "GET,POST,OPTIONS")
})

test("GET /schema returns request and response JSON schemas", async () => {
  const response = await worker.fetch(new Request("https://worker.test/schema"), {})
  const body = await readJson(response)

  assert.equal(response.status, 200)
  assert.equal(body.ok, true)
  assert.equal(body.schemas.discoverRequest.type, "object")
  assert.equal(body.schemas.discoverResponse.type, "object")
})

test("GET /openapi.json returns OpenAPI 3.1 contract", async () => {
  const response = await worker.fetch(new Request("https://worker.test/openapi.json"), {})
  const body = await readJson(response)

  assert.equal(response.status, 200)
  assert.equal(body.openapi, "3.1.0")
  assert.ok(body.paths["/discover"])
})

test("POST /discover rejects missing authentication", async () => {
  const response = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ seed: "AI website Dubai" })
    }),
    { QUESTION_DISCOVERY_API_KEYS: "test-key" }
  )
  const body = await readJson(response)

  assert.equal(response.status, 401)
  assert.equal(body.error.code, "unauthorized")
})

test("POST /discover rejects invalid request JSON", async () => {
  const response = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "test-key" },
      body: JSON.stringify({ seed: "" })
    }),
    {
      QUESTION_DISCOVERY_API_KEYS: "test-key",
      QUESTION_DISCOVERY_ALLOW_MEMORY_RATE_LIMIT: "true"
    }
  )
  const body = await readJson(response)

  assert.equal(response.status, 400)
  assert.equal(body.error.code, "validation_error")
})

test("POST /discover returns ranked questions from replaceable providers", async (t) => {
  const providerServer = await createSuggestionServer()
  t.after(() => providerServer.close())

  const response = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "test-key" },
      body: JSON.stringify({
        seed: "AI website Dubai",
        market: "AE",
        language: "en-AE",
        limit: 5,
        providers: ["google-suggest", "bing-suggest"]
      })
    }),
    createEnv(providerServer.origin)
  )
  const body = await readJson(response)

  assert.equal(response.status, 200)
  assert.equal(body.ok, true)
  assert.equal(body.data.questions.length, 5)
  assert.equal(body.data.questions[0].market, "AE")
  assert.match(body.data.questions[0].question, /\?$/)
  assert.ok(["google-suggest", "bing-suggest"].includes(body.data.questions[0].sourceProvider))
  assert.equal(response.headers.get("x-ratelimit-limit"), "60")
})

test("POST /discover returns rate-limit errors", async (t) => {
  const providerServer = await createSuggestionServer()
  t.after(() => providerServer.close())
  const env = createEnv(providerServer.origin, {
    QUESTION_DISCOVERY_RATE_LIMIT_MAX: "1",
    QUESTION_DISCOVERY_RATE_LIMIT_WINDOW_SECONDS: "60"
  })

  const requestBody = JSON.stringify({ seed: "AI website Dubai", providers: ["google-suggest"] })
  const first = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "test-key", "cf-connecting-ip": "203.0.113.10" },
      body: requestBody
    }),
    env
  )
  const second = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "test-key", "cf-connecting-ip": "203.0.113.10" },
      body: requestBody
    }),
    env
  )
  const body = await readJson(second)

  assert.equal(first.status, 200)
  assert.equal(second.status, 429)
  assert.equal(body.error.code, "rate_limited")
})

test("POST /discover fails closed when rate limiting is not configured", async (t) => {
  const providerServer = await createSuggestionServer()
  t.after(() => providerServer.close())

  const response = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "test-key" },
      body: JSON.stringify({ seed: "AI website Dubai" })
    }),
    {
      QUESTION_DISCOVERY_API_KEYS: "test-key",
      GOOGLE_SUGGEST_ENDPOINT: `${providerServer.origin}/google`,
      BING_SUGGEST_ENDPOINT: `${providerServer.origin}/bing`
    }
  )
  const body = await readJson(response)

  assert.equal(response.status, 503)
  assert.equal(body.error.code, "rate_limit_not_configured")
})

test("POST /discover reports provider failure when every provider fails", async (t) => {
  const providerServer = await createFailingServer()
  t.after(() => providerServer.close())

  const response = await worker.fetch(
    new Request("https://worker.test/discover", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "test-key" },
      body: JSON.stringify({
        seed: "AI website Dubai",
        providers: ["google-suggest"],
        limit: 5
      })
    }),
    createEnv(providerServer.origin, {
      GOOGLE_SUGGEST_ENDPOINT: `${providerServer.origin}/google`
    })
  )
  const body = await readJson(response)

  assert.equal(response.status, 502)
  assert.equal(body.error.code, "provider_discovery_failed")
  assert.ok(Array.isArray(body.error.details.providerErrors))
})

test("unknown endpoint returns JSON 404", async () => {
  const response = await worker.fetch(new Request("https://worker.test/nope"), {})
  const body = await readJson(response)

  assert.equal(response.status, 404)
  assert.equal(body.error.code, "not_found")
})
