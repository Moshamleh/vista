import assert from "node:assert/strict"
import test from "node:test"
import { requireApiKey, readApiKey } from "../src/auth.mjs"
import { ApiError } from "../src/errors.mjs"
import { classifyIntent, isQuestionLike, normalizeQuestion, rankQuestions } from "../src/question-engine.mjs"
import { validateDiscoveryRequest } from "../src/validation.mjs"

test("readApiKey supports Bearer and x-api-key authentication", () => {
  const bearer = new Request("https://worker.test/discover", { headers: { authorization: "Bearer secret-one" } })
  const header = new Request("https://worker.test/discover", { headers: { "x-api-key": "secret-two" } })

  assert.equal(readApiKey(bearer), "secret-one")
  assert.equal(readApiKey(header), "secret-two")
})

test("requireApiKey fails closed when authentication is not configured", () => {
  const request = new Request("https://worker.test/discover")

  assert.throws(() => requireApiKey(request, {}), (error) => {
    assert.ok(error instanceof ApiError)
    assert.equal(error.status, 503)
    assert.equal(error.code, "authentication_not_configured")
    return true
  })
})

test("validateDiscoveryRequest normalizes valid requests", () => {
  const result = validateDiscoveryRequest({
    seed: "  AI   website Dubai ",
    market: "ae",
    language: "en-AE",
    limit: 10,
    providers: ["google-suggest", "google-suggest", "bing-suggest"]
  })

  assert.deepEqual(result, {
    seed: "AI website Dubai",
    market: "AE",
    language: "en-AE",
    limit: 10,
    providers: ["google-suggest", "bing-suggest"],
    includeSeedQuestions: false
  })
})

test("validateDiscoveryRequest rejects invalid providers and limits", () => {
  assert.throws(() => validateDiscoveryRequest({ seed: "AI", providers: ["unknown"] }), /providers may only include/)
  assert.throws(() => validateDiscoveryRequest({ seed: "AI", limit: 101 }), /limit must be/)
})

test("question normalization and intent classification are deterministic", () => {
  assert.equal(normalizeQuestion("  what is AI website Dubai?? "), "what is AI website Dubai")
  assert.equal(isQuestionLike("what is AI website Dubai"), true)
  assert.equal(isQuestionLike("AI website Dubai agency"), false)
  assert.equal(classifyIntent("which AI website agency in Dubai"), "commercial")
  assert.equal(classifyIntent("how does GEO work"), "informational")
})

test("rankQuestions deduplicates and ranks question-like provider suggestions", () => {
  const questions = rankQuestions(
    [
      { suggestion: "what is AI website Dubai", provider: "google-suggest", sourceQuery: "AI website Dubai" },
      { suggestion: "what is AI website Dubai?", provider: "bing-suggest", sourceQuery: "AI website Dubai" },
      { suggestion: "AI website Dubai agency", provider: "google-suggest", sourceQuery: "AI website Dubai" },
      { suggestion: "how much does AI website cost in Dubai", provider: "bing-suggest", sourceQuery: "cost of AI website Dubai" }
    ],
    { market: "AE", language: "en-AE", limit: 10 }
  )

  assert.equal(questions.length, 2)
  assert.equal(questions[0].question, "how much does AI website cost in Dubai?")
  assert.equal(questions[0].intent, "commercial")
})
