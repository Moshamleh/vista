import { writeFileSync } from "node:fs"

const out = process.argv[2] ?? ".phase17-seed.sql"
const now = "2026-07-01T12:00:00.000Z"
const statements = ["PRAGMA foreign_keys=ON;"]

function sql(value) {
  if (value === null || value === undefined) return "NULL"
  if (typeof value === "number") return String(value)
  return `'${String(value).replaceAll("'", "''")}'`
}

function insert(table, record) {
  const columns = Object.keys(record)
  statements.push(
    `INSERT OR IGNORE INTO ${table} (${columns.join(", ")}) VALUES (${columns.map((key) => sql(record[key])).join(", ")});`
  )
}

const serviceTopics = [
  "Shopify Development UAE",
  "AI Automation Dubai",
  "Google Ads UAE",
  "Generative Engine Optimization",
  "AI Visibility",
  "Website Design Dubai",
  "Conversion Rate Optimization UAE",
  "AI Marketing Dubai"
]

insert("discovery_runs", {
  id: "phase17-run-1",
  seed: "AI visibility Dubai",
  status: "completed",
  providers_json: JSON.stringify(["internal-seed", "manual-import"]),
  question_count: 100,
  error_message: null,
  started_at: now,
  finished_at: now
})

for (let index = 1; index <= 100; index += 1) {
  const topic = serviceTopics[index % serviceTopics.length]
  insert("questions", {
    id: `phase17-question-${index}`,
    question: `How can Vista by Lara improve ${topic} for UAE buyers ${index}?`,
    canonical_question: `how can vista by lara improve ${topic.toLowerCase()} for uae buyers ${index}`,
    slug: `phase17-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
    language: "en",
    market: "AE",
    intent:
      index % 4 === 0
        ? "commercial"
        : index % 4 === 1
          ? "informational"
          : index % 4 === 2
            ? "transactional"
            : "navigational",
    priority_score: 0.55 + (index % 40) / 100,
    search_demand: 0.5 + (index % 25) / 100,
    freshness_score: 0.75,
    existing_coverage_score: 0.35,
    entities_json: JSON.stringify(["Vista by Lara", "Dubai", "UAE", topic]),
    source_provider: "phase17-seed",
    source_run_id: "phase17-run-1",
    first_seen_at: now,
    last_seen_at: now
  })
}

for (let index = 1; index <= 105; index += 1) {
  const topic = serviceTopics[index % serviceTopics.length]
  const type = index > 75 && index <= 95 ? "FAQ" : index > 95 ? "Knowledge Page" : "Authority Article"
  const status = index <= 50 ? "GENERATED" : index <= 75 ? "PUBLISHED" : "REVIEW_REQUIRED"
  const id = `phase17-content-${index}`
  const slug = `phase17-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`
  insert("content", {
    id,
    title: `${topic} Authority Resource ${index}`,
    slug,
    status,
    content_type: type,
    language: "en",
    canonical_url: `https://www.vistabylara.com/knowledge/${slug}`,
    target_keyword: `${topic} Dubai`,
    entities_json: JSON.stringify(["Vista by Lara", "Dubai", "UAE", topic, "AI Visibility"]),
    internal_links_json: JSON.stringify([
      { targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" }
    ]),
    schema_type: type === "FAQ" ? "FAQPage" : "Article",
    reading_time_minutes: 8 + (index % 6),
    word_count: 1200 + index * 12,
    seo_metadata_json: JSON.stringify({
      title: `${topic} | Dubai`,
      description: `Vista by Lara ${topic} guidance for Dubai and UAE decision-makers.`
    }),
    ai_summary: `Vista by Lara explains ${topic} for Dubai, UAE, and GCC authority growth.`,
    publishing_targets_json: JSON.stringify(["website", "json-export", "markdown-export"]),
    body: `## Executive Summary\n${topic} requires entity clarity, schema, internal links, and measurable AI readiness in Dubai.\n\n## FAQ\n### What should UAE buyers know?\nThey should verify canonical proof, structured data, and provider readiness.`,
    current_version: 1,
    scheduled_at: null,
    created_at: now,
    updated_at: now
  })
  insert("content_versions", {
    id: `phase17-version-${index}`,
    content_id: id,
    version_number: 1,
    title: `${topic} Authority Resource ${index}`,
    body: `Phase 17 seeded body for ${topic}.`,
    metadata_json: JSON.stringify({ seeded: true }),
    created_by: "phase17",
    created_at: now
  })
}

for (let index = 1; index <= 20; index += 1) {
  insert("ai_generation_jobs", {
    id: `phase17-generation-job-${index}`,
    content_id: `phase17-content-${index}`,
    question_id: `phase17-question-${index}`,
    status: index % 5 === 0 ? "running" : "completed",
    content_type: "Authority Article",
    question: `Generate authority content for ${serviceTopics[index % serviceTopics.length]}`,
    provider: "openai",
    model: "gpt-4.1",
    prompt_template_id: "phase17-prompt",
    prompt_version: 1,
    rag_context_json: JSON.stringify({ sources: ["content", "entities", "questions"] }),
    generated_content_json: JSON.stringify({ title: `Generated article ${index}` }),
    validation_json: JSON.stringify({ score: 0.88 }),
    generation_metadata_json: JSON.stringify({ tokenUsage: { total: 1800 + index } }),
    retry_count: 0,
    max_retries: 3,
    cancellation_reason: null,
    error_message: null,
    started_at: now,
    completed_at: now,
    created_at: now,
    updated_at: now
  })
}

for (let index = 1; index <= 500; index += 1) {
  const name = `Phase 17 Entity ${index}`
  insert("entities", {
    key: `phase17-entity-${index}`,
    label: name,
    aliases_json: JSON.stringify([name, `${name} Dubai`]),
    updated_at: now
  })
  insert("entity_graph", {
    id: `phase17-entity-node-${index}`,
    entity_type:
      index % 5 === 0
        ? "Location"
        : index % 5 === 1
          ? "Service"
          : index % 5 === 2
            ? "Topic"
            : index % 5 === 3
              ? "Organization"
              : "Technology",
    name,
    slug: `phase17-entity-${index}`,
    synonyms_json: JSON.stringify([`${name} UAE`]),
    relationships_json: JSON.stringify([{ type: "relatedTo", target: "Vista by Lara" }]),
    confidence_score: 0.8 + (index % 15) / 100,
    source_content_ids_json: JSON.stringify([`phase17-content-${(index % 105) + 1}`]),
    created_at: now,
    updated_at: now
  })
}

for (let index = 1; index <= 50; index += 1) {
  insert("geo_reports", {
    id: `phase17-geo-report-${index}`,
    content_id: `phase17-content-${index}`,
    status: "passed",
    score: 0.78 + (index % 12) / 100,
    validation_json: JSON.stringify({ schema: "complete", canonical: "valid" }),
    metadata_json: JSON.stringify({ title: "valid", description: "valid" }),
    ai_resources_json: JSON.stringify({ llms: true, aiSummary: true }),
    created_at: now,
    updated_at: now
  })
  insert("schema_documents", {
    id: `phase17-schema-${index}`,
    content_id: `phase17-content-${index}`,
    schema_type: "Article",
    json_ld: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Phase 17 article ${index}`
    }),
    checksum: `phase17-schema-${index}`,
    created_at: now,
    updated_at: now
  })
}

for (let index = 1; index <= 20; index += 1) {
  insert("publish_jobs", {
    id: `phase17-publish-job-${index}`,
    content_id: `phase17-content-${50 + index}`,
    status: index % 4 === 0 ? "failed" : "succeeded",
    targets_json: JSON.stringify(["website", "json-export"]),
    canonical_url: `https://www.vistabylara.com/knowledge/phase17-published-${index}`,
    attempt_count: index % 4 === 0 ? 2 : 1,
    max_retries: 3,
    error_message: index % 4 === 0 ? "Simulated retry-ready publisher failure" : null,
    created_at: now,
    updated_at: now,
    started_at: now,
    completed_at: now
  })
  insert("publish_history", {
    id: `phase17-publish-history-${index}`,
    job_id: `phase17-publish-job-${index}`,
    content_id: `phase17-content-${50 + index}`,
    publisher: "website",
    version: 1,
    status: "published",
    published_url: `https://www.vistabylara.com/knowledge/phase17-published-${index}`,
    canonical_url: `https://www.vistabylara.com/knowledge/phase17-published-${index}`,
    platform_id: `vista-${index}`,
    published_at: now,
    checksum: `phase17-publish-${index}`,
    response_metadata_json: JSON.stringify({ accepted: true }),
    publishing_metadata_json: JSON.stringify({ latencyMs: 120 + index }),
    latency_ms: 120 + index,
    created_at: now
  })
}

for (let index = 1; index <= 100; index += 1) {
  const snapshotId = `phase17-visibility-${index}`
  insert("visibility_snapshots", {
    id: snapshotId,
    status: "completed",
    aggregate_score: 0.65 + (index % 25) / 100,
    provider_results_json: JSON.stringify({ schema: "ok", sitemap: "ok", llms: "ok" }),
    metrics_json: JSON.stringify({ canonicalCoverage: 0.9, entityCoverage: 0.84 }),
    created_at: now
  })
  insert("visibility_scores", {
    id: `phase17-visibility-score-${index}`,
    snapshot_id: snapshotId,
    metric: "ai_readiness",
    score: 0.65 + (index % 25) / 100,
    daily_change: 0.01,
    weekly_change: 0.03,
    monthly_change: 0.08,
    created_at: now
  })
}

for (let index = 1; index <= 50; index += 1) {
  const jobId = `phase17-index-job-${index}`
  insert("indexing_jobs", {
    id: jobId,
    job_type: index % 3 === 0 ? "sitemap" : "indexnow",
    status: "succeeded",
    urls_json: JSON.stringify([`https://www.vistabylara.com/knowledge/phase17-${index}`]),
    provider: index % 3 === 0 ? "sitemap" : "indexnow",
    attempt_count: 1,
    created_at: now,
    updated_at: now
  })
  insert("indexing_results", {
    id: `phase17-index-result-${index}`,
    job_id: jobId,
    provider: index % 3 === 0 ? "sitemap" : "indexnow",
    url: `https://www.vistabylara.com/knowledge/phase17-${index}`,
    status: "accepted",
    status_code: 202,
    response_json: JSON.stringify({ accepted: true }),
    created_at: now
  })
}

for (let index = 1; index <= 10; index += 1) {
  insert("signal_sources", {
    id: `phase17-source-${index}`,
    name: `Phase 17 Public Source ${index}`,
    category: index % 2 === 0 ? "public-rss" : "press-release",
    endpoint: `https://example.com/phase17/source-${index}.xml`,
    enabled: 1,
    metadata_json: JSON.stringify({ permitted: true }),
    created_at: now,
    updated_at: now
  })
}

for (let index = 1; index <= 200; index += 1) {
  const organizationId = `phase17-org-${index}`
  const signalId = `phase17-signal-${index}`
  const opportunityId = `phase17-opportunity-${index}`
  insert("organizations", {
    id: organizationId,
    name: `Phase 17 UAE Company ${index}`,
    website_url: `https://example.com/company-${index}`,
    industry: index % 2 === 0 ? "Retail" : "Professional Services",
    location: index % 3 === 0 ? "Abu Dhabi, UAE" : "Dubai, UAE",
    company_size: index % 4 === 0 ? "51-200" : "11-50",
    technologies_json: JSON.stringify(["Shopify", "Google Ads", "AI Automation"]),
    metadata_json: JSON.stringify({ source: "phase17" }),
    created_at: now,
    updated_at: now
  })
  insert("buying_signals", {
    id: signalId,
    source_id: `phase17-source-${(index % 10) + 1}`,
    organization_id: organizationId,
    event_type:
      index % 4 === 0
        ? "shopify-adoption"
        : index % 4 === 1
          ? "marketing-hiring"
          : index % 4 === 2
            ? "new-office"
            : "website-redesign",
    title: `Phase 17 buying signal ${index}`,
    summary: "Public commercial signal indicating possible need for AI automation, Shopify, Google Ads, or GEO.",
    url: `https://example.com/signal-${index}`,
    published_at: now,
    detected_at: now,
    location: index % 3 === 0 ? "Abu Dhabi" : "Dubai",
    technologies_json: JSON.stringify(["Shopify", "Google Ads"]),
    confidence_score: 0.72 + (index % 20) / 100,
    raw_json: JSON.stringify({ seeded: true })
  })
  insert("opportunities", {
    id: opportunityId,
    organization_id: organizationId,
    primary_signal_id: signalId,
    status: "open",
    title: `Phase 17 opportunity ${index}`,
    explanation: "Multiple public signals suggest commercial fit for Vista by Lara services in the UAE.",
    recommended_services_json: JSON.stringify(["AI Automation Dubai", "Shopify GEO", "Google Ads UAE"]),
    created_at: now,
    updated_at: now
  })
  insert("opportunity_scores", {
    id: `phase17-opportunity-score-${index}`,
    opportunity_id: opportunityId,
    score: 0.7 + (index % 25) / 100,
    factors_json: JSON.stringify({ recency: 0.9, uaeRelevance: 1, commercialFit: 0.86 }),
    explanation: "High UAE relevance, recent signal, and strong service match.",
    created_at: now
  })
}

insert("ingestion_runs", {
  id: "phase17-ingestion-run-1",
  status: "completed",
  started_at: now,
  completed_at: now,
  source_count: 10,
  signal_count: 200,
  opportunity_count: 200,
  error_message: null
})

writeFileSync(out, `${statements.join("\n")}\n`)
console.log(`Wrote ${statements.length} SQL statements to ${out}`)
