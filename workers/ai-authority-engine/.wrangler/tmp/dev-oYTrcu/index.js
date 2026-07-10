var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/cron/cron.ts
function handleScheduled(controller, logger) {
  const execution = { cron: controller.cron, scheduledTime: controller.scheduledTime, status: "accepted" };
  logger.info("Cron trigger accepted", execution);
  return execution;
}
__name(handleScheduled, "handleScheduled");

// src/config/env.ts
var logLevels = /* @__PURE__ */ new Set(["debug", "info", "warn", "error"]);
function readRequiredString(env, key) {
  const value = env[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value.trim();
}
__name(readRequiredString, "readRequiredString");
function readOptionalString(env, key) {
  const value = env[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
__name(readOptionalString, "readOptionalString");
function readPositiveInteger(env, key) {
  const raw = readRequiredString(env, key);
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Environment variable ${key} must be a positive integer`);
  }
  return value;
}
__name(readPositiveInteger, "readPositiveInteger");
function loadConfig(env) {
  const nodeEnv = readRequiredString(env, "NODE_ENV");
  if (nodeEnv !== "production" && nodeEnv !== "development" && nodeEnv !== "test") {
    throw new Error("NODE_ENV must be production, development, or test");
  }
  const logLevel = readRequiredString(env, "LOG_LEVEL");
  if (!logLevels.has(logLevel)) {
    throw new Error("LOG_LEVEL must be debug, info, warn, or error");
  }
  return {
    nodeEnv,
    serviceName: readRequiredString(env, "SERVICE_NAME"),
    serviceVersion: readRequiredString(env, "SERVICE_VERSION"),
    authIssuer: readRequiredString(env, "AUTH_ISSUER"),
    authAudience: readRequiredString(env, "AUTH_AUDIENCE"),
    authJwksUrl: readOptionalString(env, "AUTH_JWKS_URL"),
    authSharedSecret: readOptionalString(env, "AUTH_SHARED_SECRET"),
    requestSigningSecret: readOptionalString(env, "REQUEST_SIGNING_SECRET"),
    apiVersion: readOptionalString(env, "API_VERSION") ?? "2026-07-01",
    logLevel,
    rateLimitMax: readPositiveInteger(env, "RATE_LIMIT_MAX"),
    rateLimitWindowSeconds: readPositiveInteger(env, "RATE_LIMIT_WINDOW_SECONDS"),
    rateLimitBanSeconds: readOptionalPositiveInteger(env, "RATE_LIMIT_BAN_SECONDS") ?? 900,
    aiDailyTokenLimit: readOptionalPositiveInteger(env, "AI_DAILY_TOKEN_LIMIT"),
    aiMonthlyTokenLimit: readOptionalPositiveInteger(env, "AI_MONTHLY_TOKEN_LIMIT"),
    aiProviderDailyTokenLimit: readOptionalPositiveInteger(env, "AI_PROVIDER_DAILY_TOKEN_LIMIT"),
    openApiTitle: readRequiredString(env, "OPENAPI_TITLE"),
    openApiVersion: readRequiredString(env, "OPENAPI_VERSION"),
    bingAutosuggestEndpoint: readOptionalString(env, "BING_AUTOSUGGEST_ENDPOINT"),
    bingAutosuggestKey: readOptionalString(env, "BING_AUTOSUGGEST_KEY"),
    youtubeSuggestEndpoint: readOptionalString(env, "YOUTUBE_SUGGEST_ENDPOINT"),
    internalSeedQuestions: readOptionalString(env, "INTERNAL_SEED_QUESTIONS"),
    googleSearchConsoleEndpoint: readOptionalString(env, "GOOGLE_SEARCH_CONSOLE_ENDPOINT"),
    googleSearchConsoleAccessToken: readOptionalString(env, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN"),
    googleSearchConsoleSiteUrl: readOptionalString(env, "GOOGLE_SEARCH_CONSOLE_SITE_URL"),
    bingWebmasterEndpoint: readOptionalString(env, "BING_WEBMASTER_ENDPOINT"),
    bingWebmasterApiKey: readOptionalString(env, "BING_WEBMASTER_API_KEY"),
    indexNowEndpoint: readOptionalString(env, "INDEXNOW_ENDPOINT") ?? "https://api.indexnow.org/indexnow",
    indexNowKey: readOptionalString(env, "INDEXNOW_KEY"),
    indexNowKeyLocation: readOptionalString(env, "INDEXNOW_KEY_LOCATION"),
    externalIndexingCronEnabled: readOptionalString(env, "EXTERNAL_INDEXING_CRON_ENABLED") === "true",
    publicBuyingSignalFeeds: readOptionalString(env, "PUBLIC_BUYING_SIGNAL_FEEDS"),
    publicBuyingSignalCronEnabled: readOptionalString(env, "PUBLIC_BUYING_SIGNAL_CRON_ENABLED") === "true",
    questionDiscoveryCronSeed: readOptionalString(env, "QUESTION_DISCOVERY_CRON_SEED"),
    aiGenerationProvider: readAiGenerationProvider(env),
    aiGenerationModel: readOptionalString(env, "AI_GENERATION_MODEL") ?? "gpt-4.1",
    aiGenerationTimeoutMs: readOptionalPositiveInteger(env, "AI_GENERATION_TIMEOUT_MS") ?? 3e4,
    openAiEndpoint: readOptionalString(env, "OPENAI_ENDPOINT") ?? "https://api.openai.com/v1/chat/completions",
    openAiApiKey: readOptionalString(env, "OPENAI_API_KEY"),
    anthropicEndpoint: readOptionalString(env, "ANTHROPIC_ENDPOINT") ?? "https://api.anthropic.com/v1/messages",
    anthropicApiKey: readOptionalString(env, "ANTHROPIC_API_KEY"),
    googleAiEndpoint: readOptionalString(env, "GOOGLE_AI_ENDPOINT") ?? "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    googleAiApiKey: readOptionalString(env, "GOOGLE_AI_API_KEY"),
    publisherWebsiteBaseUrl: readOptionalString(env, "PUBLISHER_WEBSITE_BASE_URL") ?? "https://www.vistabylara.com",
    publisherDefaultTargets: (readOptionalString(env, "PUBLISHER_DEFAULT_TARGETS") ?? "website,json-export,markdown-export").split(",").map((value) => value.trim()).filter(Boolean),
    publisherTimeoutMs: readOptionalPositiveInteger(env, "PUBLISHER_TIMEOUT_MS") ?? 15e3,
    publisherSharedToken: readOptionalString(env, "PUBLISHER_SHARED_TOKEN"),
    visibilityScanCronEnabled: readOptionalString(env, "VISIBILITY_SCAN_CRON_ENABLED") === "true"
  };
}
__name(loadConfig, "loadConfig");
function readOptionalPositiveInteger(env, key) {
  const raw = readOptionalString(env, key);
  if (!raw) return void 0;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Environment variable ${key} must be a positive integer`);
  }
  return value;
}
__name(readOptionalPositiveInteger, "readOptionalPositiveInteger");
function readAiGenerationProvider(env) {
  const value = readOptionalString(env, "AI_GENERATION_PROVIDER") ?? "openai";
  if (value !== "openai" && value !== "anthropic" && value !== "google-ai") {
    throw new Error("AI_GENERATION_PROVIDER must be openai, anthropic, or google-ai");
  }
  return value;
}
__name(readAiGenerationProvider, "readAiGenerationProvider");

// src/errors/app-error.ts
var AppError = class extends Error {
  static {
    __name(this, "AppError");
  }
  status;
  code;
  expose;
  details;
  /**
   * Creates a structured application error.
   */
  constructor(input) {
    super(input.message);
    this.name = "AppError";
    this.status = input.status;
    this.code = input.code;
    this.expose = input.expose ?? input.status < 500;
    this.details = input.details;
  }
};
function toAppError(error) {
  if (error instanceof AppError) return error;
  if (error instanceof Error) {
    return new AppError({ status: 500, code: "internal_error", message: error.message, expose: false });
  }
  return new AppError({ status: 500, code: "internal_error", message: "Unexpected server error", expose: false });
}
__name(toAppError, "toAppError");

// src/logger/logger.ts
var severity = { debug: 10, info: 20, warn: 30, error: 40 };
var Logger = class {
  static {
    __name(this, "Logger");
  }
  config;
  /**
   * Creates a logger with service metadata.
   */
  constructor(config) {
    this.config = config;
  }
  /**
   * Emits a debug event when debug logging is enabled.
   */
  debug(message2, context, requestId) {
    this.write({ level: "debug", message: message2, context, requestId });
  }
  /**
   * Emits an informational event.
   */
  info(message2, context, requestId) {
    this.write({ level: "info", message: message2, context, requestId });
  }
  /**
   * Emits a warning event.
   */
  warn(message2, context, requestId) {
    this.write({ level: "warn", message: message2, context, requestId });
  }
  /**
   * Emits an error event.
   */
  error(message2, context, requestId) {
    this.write({ level: "error", message: message2, context, requestId });
  }
  /**
   * Writes a structured log line when allowed by log level.
   */
  write(event) {
    if (severity[event.level] < severity[this.config.logLevel]) return;
    const payload = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      service: this.config.serviceName,
      version: this.config.serviceVersion,
      environment: this.config.nodeEnv,
      ...event
    };
    const line = JSON.stringify(payload);
    if (event.level === "error") console.error(line);
    else if (event.level === "warn") console.warn(line);
    else console.log(line);
  }
};

// src/queues/queue-client.ts
var QueueClient = class {
  static {
    __name(this, "QueueClient");
  }
  queue;
  /**
   * Creates a queue client.
   */
  constructor(queue) {
    this.queue = queue;
  }
  /**
   * Sends a structured message to the configured queue.
   */
  async send(message2) {
    await this.queue.send({ ...message2, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  }
};

// src/storage/kv-store.ts
var KvJsonStore = class {
  static {
    __name(this, "KvJsonStore");
  }
  kv;
  /**
   * Creates a KV JSON store.
   */
  constructor(kv) {
    this.kv = kv;
  }
  /**
   * Reads and parses a JSON value.
   */
  async getJson(key) {
    const raw = await this.kv.get(key, { type: "text" });
    return raw ? JSON.parse(raw) : null;
  }
  /**
   * Serializes and writes a JSON value.
   */
  async putJson(key, value, expirationTtl) {
    await this.kv.put(key, JSON.stringify(value), expirationTtl ? { expirationTtl } : void 0);
  }
  /**
   * Deletes a JSON value.
   */
  async delete(key) {
    await this.kv.delete(key);
  }
};

// src/di/container.ts
function requireD1(env) {
  if (!env.DB) throw new AppError({ status: 503, code: "d1_not_configured", message: "D1 binding is not configured" });
  return env.DB;
}
__name(requireD1, "requireD1");
function requireKv(env) {
  if (!env.CACHE)
    throw new AppError({ status: 503, code: "kv_not_configured", message: "KV binding is not configured" });
  return env.CACHE;
}
__name(requireKv, "requireKv");
function requireQueue(env) {
  if (!env.AUTHORITY_QUEUE) {
    throw new AppError({ status: 503, code: "queue_not_configured", message: "Queue binding is not configured" });
  }
  return env.AUTHORITY_QUEUE;
}
__name(requireQueue, "requireQueue");
function createContainer(env) {
  const config = loadConfig(env);
  return {
    env,
    config,
    logger: new Logger(config),
    db: requireD1(env),
    cache: new KvJsonStore(requireKv(env)),
    queue: new QueueClient(requireQueue(env))
  };
}
__name(createContainer, "createContainer");

// src/http/response.ts
function securityHeaders() {
  return {
    "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
    "referrer-policy": "no-referrer",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY"
  };
}
__name(securityHeaders, "securityHeaders");
function mergeHeaders(headers) {
  const merged = new Headers(securityHeaders());
  merged.set("content-type", "application/json; charset=utf-8");
  new Headers(headers).forEach((value, key) => {
    merged.set(key, value);
  });
  return merged;
}
__name(mergeHeaders, "mergeHeaders");
function successResponse(data, requestId, status = 200, headers = {}) {
  const body = { ok: true, data, meta: { requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() } };
  return new Response(JSON.stringify(body), {
    status,
    headers: mergeHeaders(headers)
  });
}
__name(successResponse, "successResponse");
function failureResponse(error, requestId, headers = {}) {
  const body = {
    ok: false,
    error: {
      code: error.code,
      message: error.expose ? error.message : "Unexpected server error",
      ...error.details ? { details: error.details } : {}
    },
    meta: { requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
  };
  return new Response(JSON.stringify(body), {
    status: error.status,
    headers: mergeHeaders(headers)
  });
}
__name(failureResponse, "failureResponse");

// src/operations/cost-management.ts
var AiBudgetManager = class {
  constructor(cache2, config, logger) {
    this.cache = cache2;
    this.config = config;
    this.logger = logger;
  }
  cache;
  config;
  logger;
  static {
    __name(this, "AiBudgetManager");
  }
  /**
   * Checks configured budgets before a generation call.
   */
  async assertBudgetAvailable(provider, subject) {
    await this.assertLimit("daily", this.config.aiDailyTokenLimit, `ai:budget:daily:${this.day()}:user:${subject}`);
    await this.assertLimit(
      "monthly",
      this.config.aiMonthlyTokenLimit,
      `ai:budget:monthly:${this.month()}:user:${subject}`
    );
    await this.assertLimit(
      "provider_daily",
      this.config.aiProviderDailyTokenLimit,
      `ai:budget:daily:${this.day()}:provider:${provider}`
    );
  }
  /**
   * Records returned token usage after a provider call.
   */
  async recordUsage(input, requestId) {
    if (input.totalTokens <= 0) return;
    await this.increment(`ai:budget:daily:${this.day()}:user:${input.subject}`, input.totalTokens, 172800);
    await this.increment(`ai:budget:monthly:${this.month()}:user:${input.subject}`, input.totalTokens, 5356800);
    await this.increment(`ai:budget:daily:${this.day()}:provider:${input.provider}`, input.totalTokens, 172800);
    this.logger.info(
      "AI token usage recorded",
      { provider: input.provider, subject: input.subject, totalTokens: input.totalTokens },
      requestId
    );
  }
  /**
   * Returns configured budget state for diagnostics.
   */
  getConfiguration() {
    return {
      dailyTokenLimit: this.config.aiDailyTokenLimit ?? null,
      monthlyTokenLimit: this.config.aiMonthlyTokenLimit ?? null,
      providerDailyTokenLimit: this.config.aiProviderDailyTokenLimit ?? null
    };
  }
  async assertLimit(name, limit, key) {
    if (!limit) return;
    const current = await this.cache.getJson(key) ?? { tokens: 0, window: key };
    if (current.tokens >= limit) {
      throw new AppError({
        status: 429,
        code: "ai_budget_exceeded",
        message: "AI generation budget has been exceeded",
        details: { budget: name, limit, used: current.tokens }
      });
    }
  }
  async increment(key, tokens, expirationTtl) {
    const current = await this.cache.getJson(key) ?? { tokens: 0, window: key };
    await this.cache.putJson(key, { ...current, tokens: current.tokens + tokens }, expirationTtl);
  }
  day() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  }
  month() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  }
};

// src/validation/validator.ts
async function readJson(request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new AppError({
      status: 415,
      code: "unsupported_media_type",
      message: "Content-Type must be application/json"
    });
  }
  try {
    return await request.json();
  } catch {
    throw new AppError({ status: 400, code: "invalid_json", message: "Request body must be valid JSON" });
  }
}
__name(readJson, "readJson");
function assertRecord(value, code = "validation_error") {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code, message: "Expected a JSON object" });
  }
  return value;
}
__name(assertRecord, "assertRecord");

// src/domains/content-pipeline/repositories.ts
function mapContentRow(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    contentType: row.content_type,
    language: row.language,
    canonicalUrl: row.canonical_url,
    targetKeyword: row.target_keyword,
    entities: JSON.parse(row.entities_json),
    internalLinks: JSON.parse(row.internal_links_json),
    schemaType: row.schema_type,
    readingTimeMinutes: row.reading_time_minutes,
    wordCount: row.word_count,
    seoMetadata: JSON.parse(row.seo_metadata_json),
    aiSummary: row.ai_summary,
    publishingTargets: JSON.parse(row.publishing_targets_json),
    body: row.body,
    currentVersion: row.current_version,
    scheduledAt: row.scheduled_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
__name(mapContentRow, "mapContentRow");
var ContentRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "ContentRepository");
  }
  /**
   * Lists content records ordered by newest edit.
   */
  async list(limit, offset) {
    const result2 = await this.db.prepare("select * from content order by updated_at desc limit ? offset ?").bind(limit, offset).all();
    return result2.results.map(mapContentRow);
  }
  /**
   * Finds one content record by ID.
   */
  async findById(id) {
    const row = await this.db.prepare("select * from content where id = ?").bind(id).first();
    return row ? mapContentRow(row) : null;
  }
  /**
   * Inserts one content record.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      `insert into content (
          id, title, slug, status, content_type, language, canonical_url, target_keyword, entities_json,
          internal_links_json, schema_type, reading_time_minutes, word_count, seo_metadata_json, ai_summary,
          publishing_targets_json, body, current_version, scheduled_at, created_at, updated_at
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      record.id,
      record.title,
      record.slug,
      record.status,
      record.contentType,
      record.language,
      record.canonicalUrl,
      record.targetKeyword,
      JSON.stringify(record.entities),
      JSON.stringify(record.internalLinks),
      record.schemaType,
      record.readingTimeMinutes,
      record.wordCount,
      JSON.stringify(record.seoMetadata),
      record.aiSummary,
      JSON.stringify(record.publishingTargets),
      record.body,
      record.currentVersion,
      record.scheduledAt,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Content create failed");
  }
  /**
   * Updates one content record.
   */
  async update(record) {
    const result2 = await this.db.prepare(
      `update content set title = ?, slug = ?, status = ?, content_type = ?, language = ?, canonical_url = ?,
          target_keyword = ?, entities_json = ?, internal_links_json = ?, schema_type = ?, reading_time_minutes = ?,
          word_count = ?, seo_metadata_json = ?, ai_summary = ?, publishing_targets_json = ?, body = ?,
          current_version = ?, scheduled_at = ?, updated_at = ? where id = ?`
    ).bind(
      record.title,
      record.slug,
      record.status,
      record.contentType,
      record.language,
      record.canonicalUrl,
      record.targetKeyword,
      JSON.stringify(record.entities),
      JSON.stringify(record.internalLinks),
      record.schemaType,
      record.readingTimeMinutes,
      record.wordCount,
      JSON.stringify(record.seoMetadata),
      record.aiSummary,
      JSON.stringify(record.publishingTargets),
      record.body,
      record.currentVersion,
      record.scheduledAt,
      record.updatedAt,
      record.id
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Content update failed");
  }
};
var ContentVersionRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "ContentVersionRepository");
  }
  /**
   * Creates a version snapshot.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into content_versions (id, content_id, version_number, title, body, metadata_json, created_by, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.contentId,
      record.versionNumber,
      record.title,
      record.body,
      JSON.stringify(record.metadata),
      record.createdBy,
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Content version create failed");
  }
  /**
   * Finds a version snapshot by content ID and version number.
   */
  async find(contentId, versionNumber) {
    const row = await this.db.prepare("select * from content_versions where content_id = ? and version_number = ?").bind(contentId, versionNumber).first();
    return row ? {
      id: row.id,
      contentId: row.content_id,
      versionNumber: row.version_number,
      title: row.title,
      body: row.body,
      metadata: JSON.parse(row.metadata_json),
      createdBy: row.created_by,
      createdAt: row.created_at
    } : null;
  }
};
var EditorialQueueRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "EditorialQueueRepository");
  }
  /**
   * Upserts an editorial queue item.
   */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into editorial_queue (id, content_id, status, priority, assigned_to, due_at, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set status = excluded.status, priority = excluded.priority, assigned_to = excluded.assigned_to, due_at = excluded.due_at, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.contentId,
      record.status,
      record.priority,
      record.assignedTo,
      record.dueAt,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Editorial queue upsert failed");
  }
  /**
   * Lists open editorial queue items.
   */
  async list(limit) {
    const result2 = await this.db.prepare("select * from editorial_queue order by priority desc, created_at asc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      contentId: row.content_id,
      status: row.status,
      priority: row.priority,
      assignedTo: row.assigned_to,
      dueAt: row.due_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
};
var ReviewQueueRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "ReviewQueueRepository");
  }
  /**
   * Upserts a review queue item.
   */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into review_queue (id, content_id, status, reviewer, decision, notes, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set status = excluded.status, reviewer = excluded.reviewer, decision = excluded.decision, notes = excluded.notes, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.contentId,
      record.status,
      record.reviewer,
      record.decision,
      record.notes,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Review queue upsert failed");
  }
};
var PublicationQueueRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PublicationQueueRepository");
  }
  /**
   * Creates a publication queue item.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into publication_queue (id, content_id, status, targets_json, scheduled_at, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.contentId,
      record.status,
      JSON.stringify(record.targets),
      record.scheduledAt,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publication queue create failed");
  }
  /**
   * Lists publication queue items.
   */
  async list(limit) {
    const result2 = await this.db.prepare("select * from publication_queue order by scheduled_at asc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      contentId: row.content_id,
      status: row.status,
      targets: JSON.parse(row.targets_json),
      scheduledAt: row.scheduled_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
};
var InternalLinkRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "InternalLinkRepository");
  }
  /**
   * Replaces all internal links for one content asset.
   */
  async replaceForContent(contentId, records) {
    const deleted = await this.db.prepare("delete from internal_links where source_content_id = ?").bind(contentId).run();
    if (!deleted.success) throw new Error(deleted.error ?? "Internal link delete failed");
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into internal_links (id, source_content_id, target_content_id, target_url, anchor_text, created_at) values (?, ?, ?, ?, ?, ?)"
      ).bind(
        record.id,
        record.sourceContentId,
        record.targetContentId ?? null,
        record.targetUrl,
        record.anchorText,
        record.createdAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Internal link create failed");
    }
  }
};
var ContentAuditRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "ContentAuditRepository");
  }
  /**
   * Creates an audit event.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into content_audit_events (id, content_id, action, from_status, to_status, actor, metadata_json, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.contentId,
      record.action,
      record.fromStatus,
      record.toStatus,
      record.actor,
      JSON.stringify(record.metadata),
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Content audit create failed");
  }
};

// src/domains/content-pipeline/workflow.ts
var allowedTransitions = /* @__PURE__ */ new Map([
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
]);
function assertValidTransition(from, to) {
  if (from === to) return;
  if (!(allowedTransitions.get(from) ?? []).includes(to)) {
    throw new AppError({
      status: 409,
      code: "invalid_content_transition",
      message: `Cannot transition content from ${from} to ${to}`
    });
  }
}
__name(assertValidTransition, "assertValidTransition");
function approvalTarget(status) {
  if (status === "DISCOVERED") return "APPROVED";
  if (status === "REVIEW_REQUIRED") return "APPROVED_FOR_PUBLISHING";
  throw new AppError({
    status: 409,
    code: "content_not_approvable",
    message: `Content in ${status} cannot be approved by this action`
  });
}
__name(approvalTarget, "approvalTarget");
function rejectionTarget(status) {
  if (status === "REVIEW_REQUIRED" || status === "APPROVED_FOR_PUBLISHING" || status === "GENERATED") return "PLANNED";
  throw new AppError({
    status: 409,
    code: "content_not_rejectable",
    message: `Content in ${status} cannot be rejected by this action`
  });
}
__name(rejectionTarget, "rejectionTarget");
function assertSchedulable(status) {
  if (status !== "APPROVED_FOR_PUBLISHING") {
    throw new AppError({
      status: 409,
      code: "content_not_schedulable",
      message: "Only content approved for publishing can be scheduled"
    });
  }
}
__name(assertSchedulable, "assertSchedulable");

// src/domains/content-pipeline/service.ts
var ContentPipelineService = class {
  constructor(content, versions, editorialQueue, reviewQueue, publicationQueue, internalLinks, audit, logger) {
    this.content = content;
    this.versions = versions;
    this.editorialQueue = editorialQueue;
    this.reviewQueue = reviewQueue;
    this.publicationQueue = publicationQueue;
    this.internalLinks = internalLinks;
    this.audit = audit;
    this.logger = logger;
  }
  content;
  versions;
  editorialQueue;
  reviewQueue;
  publicationQueue;
  internalLinks;
  audit;
  logger;
  static {
    __name(this, "ContentPipelineService");
  }
  /**
   * Lists content assets.
   */
  async listContent(limit, offset) {
    return this.content.list(limit, offset);
  }
  /**
   * Gets one content asset.
   */
  async getContent(id) {
    const record = await this.content.findById(id);
    if (!record) throw new AppError({ status: 404, code: "content_not_found", message: "Content was not found" });
    return record;
  }
  /**
   * Creates a content asset and its initial immutable version.
   */
  async createContent(input, actor2, requestId) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const record = {
      id: crypto.randomUUID(),
      title: input.title,
      slug: input.slug,
      status: input.status ?? "DISCOVERED",
      contentType: input.contentType,
      language: input.language,
      canonicalUrl: input.canonicalUrl,
      targetKeyword: input.targetKeyword,
      entities: input.entities,
      internalLinks: input.internalLinks,
      schemaType: input.schemaType,
      readingTimeMinutes: input.readingTimeMinutes,
      wordCount: input.wordCount,
      seoMetadata: input.seoMetadata,
      aiSummary: input.aiSummary,
      publishingTargets: input.publishingTargets,
      body: input.body,
      currentVersion: 1,
      scheduledAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    await this.content.create(record);
    await this.versions.create(this.toVersion(record, actor2, timestamp));
    await this.replaceInternalLinks(record, timestamp);
    await this.editorialQueue.upsert(this.toEditorialQueue(record, timestamp));
    await this.audit.create(this.toAudit(record.id, "content.created", null, record.status, actor2, {}, timestamp));
    this.logger.info("Content asset created", { contentId: record.id, status: record.status }, requestId);
    return record;
  }
  /**
   * Edits a content asset and records a new immutable version.
   */
  async updateContent(id, input, actor2, requestId) {
    const existing = await this.getContent(id);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const nextStatus = existing.status === "PUBLISHED" ? "UPDATED" : existing.status;
    const updated = {
      ...existing,
      ...input,
      status: nextStatus,
      currentVersion: existing.currentVersion + 1,
      updatedAt: timestamp
    };
    if (existing.status !== nextStatus) assertValidTransition(existing.status, nextStatus);
    await this.content.update(updated);
    await this.versions.create(this.toVersion(updated, actor2, timestamp));
    await this.replaceInternalLinks(updated, timestamp);
    await this.audit.create(
      this.toAudit(
        id,
        "content.updated",
        existing.status,
        updated.status,
        actor2,
        { version: updated.currentVersion },
        timestamp
      )
    );
    this.logger.info("Content asset updated", { contentId: id, version: updated.currentVersion }, requestId);
    return updated;
  }
  /**
   * Archives a content asset.
   */
  async archiveContent(id, actor2, requestId) {
    return this.transition(id, "ARCHIVED", actor2, requestId, "content.archived");
  }
  /**
   * Approves content based on the current lifecycle stage.
   */
  async approveContent(id, actor2, requestId) {
    const existing = await this.getContent(id);
    return this.transition(id, approvalTarget(existing.status), actor2, requestId, "content.approved");
  }
  /**
   * Rejects content back into planning.
   */
  async rejectContent(id, actor2, requestId, notes) {
    const existing = await this.getContent(id);
    const updated = await this.transition(id, rejectionTarget(existing.status), actor2, requestId, "content.rejected");
    await this.reviewQueue.upsert(
      this.toReviewQueue(updated.id, "rejected", actor2, "rejected", notes, (/* @__PURE__ */ new Date()).toISOString())
    );
    return updated;
  }
  /**
   * Schedules content for a future publisher domain.
   */
  async scheduleContent(id, scheduledAt, targets, actor2, requestId) {
    const existing = await this.getContent(id);
    assertSchedulable(existing.status);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const updated = { ...existing, scheduledAt, updatedAt: timestamp };
    await this.content.update(updated);
    const queued = {
      id: crypto.randomUUID(),
      contentId: id,
      status: "scheduled",
      targets,
      scheduledAt,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    await this.publicationQueue.create(queued);
    await this.audit.create(
      this.toAudit(
        id,
        "content.scheduled",
        existing.status,
        existing.status,
        actor2,
        { scheduledAt, targets },
        timestamp
      )
    );
    this.logger.info("Content asset scheduled", { contentId: id, scheduledAt, targets }, requestId);
    return queued;
  }
  /**
   * Rolls content back to a previous immutable version.
   */
  async rollbackContent(id, versionNumber, actor2, requestId) {
    const existing = await this.getContent(id);
    const version = await this.versions.find(id, versionNumber);
    if (!version)
      throw new AppError({ status: 404, code: "content_version_not_found", message: "Content version was not found" });
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const restored = {
      ...existing,
      ...version.metadata,
      title: version.title,
      body: version.body,
      currentVersion: existing.currentVersion + 1,
      updatedAt: timestamp
    };
    await this.content.update(restored);
    await this.versions.create(this.toVersion(restored, actor2, timestamp));
    await this.replaceInternalLinks(restored, timestamp);
    await this.audit.create(
      this.toAudit(id, "content.rolled_back", existing.status, restored.status, actor2, { versionNumber }, timestamp)
    );
    this.logger.info("Content asset rolled back", { contentId: id, versionNumber }, requestId);
    return restored;
  }
  /**
   * Lists editorial queue records.
   */
  async listEditorialQueue(limit) {
    return this.editorialQueue.list(limit);
  }
  /**
   * Lists publication queue records.
   */
  async listPublicationQueue(limit) {
    return this.publicationQueue.list(limit);
  }
  async transition(id, to, actor2, requestId, action) {
    const existing = await this.getContent(id);
    assertValidTransition(existing.status, to);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const updated = { ...existing, status: to, updatedAt: timestamp };
    await this.content.update(updated);
    if (to === "REVIEW_REQUIRED")
      await this.reviewQueue.upsert(this.toReviewQueue(id, "pending", null, null, null, timestamp));
    await this.audit.create(this.toAudit(id, action, existing.status, to, actor2, {}, timestamp));
    this.logger.info("Content lifecycle transition completed", { contentId: id, from: existing.status, to }, requestId);
    return updated;
  }
  toVersion(record, actor2, timestamp) {
    return {
      id: crypto.randomUUID(),
      contentId: record.id,
      versionNumber: record.currentVersion,
      title: record.title,
      body: record.body,
      metadata: {
        title: record.title,
        slug: record.slug,
        status: record.status,
        contentType: record.contentType,
        language: record.language,
        canonicalUrl: record.canonicalUrl,
        targetKeyword: record.targetKeyword,
        entities: record.entities,
        internalLinks: record.internalLinks,
        schemaType: record.schemaType,
        readingTimeMinutes: record.readingTimeMinutes,
        wordCount: record.wordCount,
        seoMetadata: record.seoMetadata,
        aiSummary: record.aiSummary,
        publishingTargets: record.publishingTargets,
        body: record.body,
        scheduledAt: record.scheduledAt
      },
      createdBy: actor2,
      createdAt: timestamp
    };
  }
  toEditorialQueue(record, timestamp) {
    return {
      id: crypto.randomUUID(),
      contentId: record.id,
      status: "open",
      priority: record.status === "DISCOVERED" ? 50 : 25,
      assignedTo: null,
      dueAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    };
  }
  toReviewQueue(contentId, status, reviewer, decision, notes, timestamp) {
    return {
      id: crypto.randomUUID(),
      contentId,
      status,
      reviewer,
      decision,
      notes,
      createdAt: timestamp,
      updatedAt: timestamp
    };
  }
  toAudit(contentId, action, fromStatus, toStatus, actor2, metadata, timestamp) {
    return { id: crypto.randomUUID(), contentId, action, fromStatus, toStatus, actor: actor2, metadata, createdAt: timestamp };
  }
  async replaceInternalLinks(record, timestamp) {
    const links = record.internalLinks.map((link) => ({
      id: crypto.randomUUID(),
      sourceContentId: record.id,
      ...link.targetContentId ? { targetContentId: link.targetContentId } : {},
      targetUrl: link.targetUrl,
      anchorText: link.anchorText,
      createdAt: timestamp
    }));
    await this.internalLinks.replaceForContent(record.id, links);
  }
};

// src/domains/question-discovery/repositories.ts
function mapQuestionRow(row) {
  return {
    id: row.id,
    question: row.question,
    canonicalQuestion: row.canonical_question,
    slug: row.slug,
    language: row.language,
    market: row.market,
    intent: row.intent,
    priorityScore: row.priority_score,
    searchDemand: row.search_demand,
    freshnessScore: row.freshness_score,
    existingCoverageScore: row.existing_coverage_score,
    entities: JSON.parse(row.entities_json),
    sourceProvider: row.source_provider,
    sourceRunId: row.source_run_id,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at
  };
}
__name(mapQuestionRow, "mapQuestionRow");
var QuestionRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "QuestionRepository");
  }
  /**
   * Lists questions ordered by priority.
   */
  async list(limit, offset) {
    const result2 = await this.db.prepare("select * from questions order by priority_score desc, last_seen_at desc limit ? offset ?").bind(limit, offset).all();
    return result2.results.map(mapQuestionRow);
  }
  /**
   * Finds a question by ID.
   */
  async findById(id) {
    const row = await this.db.prepare("select * from questions where id = ?").bind(id).first();
    return row ? mapQuestionRow(row) : null;
  }
  /**
   * Upserts one question using canonical question uniqueness.
   */
  async upsert(record) {
    const result2 = await this.db.prepare(
      `insert into questions (
          id, question, canonical_question, slug, language, market, intent, priority_score, search_demand,
          freshness_score, existing_coverage_score, entities_json, source_provider, source_run_id, first_seen_at, last_seen_at
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        on conflict(canonical_question) do update set
          question = excluded.question,
          priority_score = excluded.priority_score,
          search_demand = excluded.search_demand,
          freshness_score = excluded.freshness_score,
          existing_coverage_score = excluded.existing_coverage_score,
          entities_json = excluded.entities_json,
          source_provider = excluded.source_provider,
          source_run_id = excluded.source_run_id,
          last_seen_at = excluded.last_seen_at`
    ).bind(
      record.id,
      record.question,
      record.canonicalQuestion,
      record.slug,
      record.language,
      record.market,
      record.intent,
      record.priorityScore,
      record.searchDemand,
      record.freshnessScore,
      record.existingCoverageScore,
      JSON.stringify(record.entities),
      record.sourceProvider,
      record.sourceRunId,
      record.firstSeenAt,
      record.lastSeenAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Question upsert failed");
  }
};
var DiscoveryRunRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "DiscoveryRunRepository");
  }
  /**
   * Creates a discovery run.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into discovery_runs (id, seed, status, providers_json, question_count, error_message, started_at, finished_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.seed,
      record.status,
      JSON.stringify(record.providers),
      record.questionCount,
      record.errorMessage,
      record.startedAt,
      record.finishedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Discovery run create failed");
  }
  /**
   * Updates a discovery run.
   */
  async update(record) {
    const result2 = await this.db.prepare(
      "update discovery_runs set status = ?, question_count = ?, error_message = ?, finished_at = ? where id = ?"
    ).bind(record.status, record.questionCount, record.errorMessage, record.finishedAt, record.id).run();
    if (!result2.success) throw new Error(result2.error ?? "Discovery run update failed");
  }
  /**
   * Lists latest discovery runs.
   */
  async listLatest(limit) {
    const result2 = await this.db.prepare("select * from discovery_runs order by started_at desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      seed: row.seed,
      status: row.status,
      providers: JSON.parse(row.providers_json),
      questionCount: row.question_count,
      errorMessage: row.error_message,
      startedAt: row.started_at,
      finishedAt: row.finished_at
    }));
  }
};
var ProviderRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "ProviderRepository");
  }
  /**
   * Upserts provider metadata.
   */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into providers (name, enabled, last_run_at) values (?, ?, ?) on conflict(name) do update set enabled = excluded.enabled, last_run_at = excluded.last_run_at"
    ).bind(record.name, record.enabled ? 1 : 0, record.lastRunAt).run();
    if (!result2.success) throw new Error(result2.error ?? "Provider upsert failed");
  }
};
var EntityRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "EntityRepository");
  }
  /**
   * Upserts entity definitions.
   */
  async upsertMany(records) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into entities (key, label, aliases_json, updated_at) values (?, ?, ?, ?) on conflict(key) do update set label = excluded.label, aliases_json = excluded.aliases_json, updated_at = excluded.updated_at"
      ).bind(record.key, record.label, JSON.stringify(record.aliases), timestamp).run();
      if (!result2.success) throw new Error(result2.error ?? "Entity upsert failed");
    }
  }
};

// src/domains/ai-generation/providers.ts
async function withGenerationTimeout(promise, timeoutMs) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new AppError({ status: 504, code: "ai_provider_timeout", message: "AI provider timed out" }));
    }, timeoutMs);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
__name(withGenerationTimeout, "withGenerationTimeout");
function parseDraft(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({
      status: 502,
      code: "invalid_ai_response",
      message: "AI provider returned an invalid content object"
    });
  }
  const body = value;
  const title = typeof body.title === "string" ? body.title : "";
  const slug3 = typeof body.slug === "string" ? body.slug : "";
  const content = typeof body.body === "string" ? body.body : "";
  if (title.length === 0 || slug3.length === 0 || content.length === 0) {
    throw new AppError({
      status: 502,
      code: "invalid_ai_response",
      message: "AI provider response is missing title, slug, or body"
    });
  }
  return {
    title,
    slug: slug3,
    body: content,
    outline: Array.isArray(body.outline) ? body.outline.filter((item) => typeof item === "string") : [],
    seoTitle: typeof body.seoTitle === "string" ? body.seoTitle : title,
    seoDescription: typeof body.seoDescription === "string" ? body.seoDescription : "",
    aiSummary: typeof body.aiSummary === "string" ? body.aiSummary : "",
    schemaType: typeof body.schemaType === "string" ? body.schemaType : "TechArticle",
    entities: Array.isArray(body.entities) ? body.entities.filter((item) => typeof item === "string") : [],
    internalLinks: Array.isArray(body.internalLinks) ? body.internalLinks.filter(
      (item) => typeof item === "object" && item !== null && !Array.isArray(item)
    ).map((item) => ({
      targetUrl: typeof item.targetUrl === "string" ? item.targetUrl : "",
      anchorText: typeof item.anchorText === "string" ? item.anchorText : "",
      ...typeof item.targetContentId === "string" ? { targetContentId: item.targetContentId } : {}
    })).filter((item) => item.targetUrl.length > 0 && item.anchorText.length > 0) : [],
    wordCount: typeof body.wordCount === "number" ? body.wordCount : content.split(/\s+/u).filter(Boolean).length,
    readingTimeMinutes: typeof body.readingTimeMinutes === "number" ? body.readingTimeMinutes : Math.max(1, Math.ceil(content.split(/\s+/u).filter(Boolean).length / 220))
  };
}
__name(parseDraft, "parseDraft");
function tokenUsage(inputTokens, outputTokens, totalTokens) {
  return {
    ...typeof inputTokens === "number" ? { inputTokens } : {},
    ...typeof outputTokens === "number" ? { outputTokens } : {},
    ...typeof totalTokens === "number" ? { totalTokens } : {}
  };
}
__name(tokenUsage, "tokenUsage");
var HttpAiProvider = class {
  constructor(endpoint, apiKey, fetcher = fetch) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.fetcher = fetcher;
  }
  endpoint;
  apiKey;
  fetcher;
  static {
    __name(this, "HttpAiProvider");
  }
  /**
   * Tests provider credentials with a lightweight request.
   */
  async test(model, timeoutMs) {
    const started = Date.now();
    try {
      await this.generate({
        model,
        timeoutMs,
        systemPrompt: "Return a compact JSON object for a provider health check.",
        userPrompt: '{"title":"Health Check","slug":"health-check","body":"Provider health check.","outline":["Health Check"],"seoTitle":"Health Check","seoDescription":"Provider health check.","aiSummary":"Provider health check.","schemaType":"TechArticle","entities":[],"internalLinks":[],"wordCount":3,"readingTimeMinutes":1}'
      });
      return { ok: true, latencyMs: Date.now() - started, errorMessage: null };
    } catch (error) {
      return {
        ok: false,
        latencyMs: Date.now() - started,
        errorMessage: error instanceof Error ? error.message : "Provider check failed"
      };
    }
  }
  requireConfig() {
    if (!this.endpoint || !this.apiKey) {
      throw new AppError({ status: 503, code: "ai_provider_not_configured", message: `${this.name} is not configured` });
    }
    return { endpoint: this.endpoint, apiKey: this.apiKey };
  }
};
var OpenAiGenerationProvider = class extends HttpAiProvider {
  static {
    __name(this, "OpenAiGenerationProvider");
  }
  name = "openai";
  async generate(request) {
    const { endpoint, apiKey } = this.requireConfig();
    const response = await withGenerationTimeout(
      this.fetcher(endpoint, {
        method: "POST",
        headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          model: request.model,
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt }
          ],
          response_format: { type: "json_object" }
        })
      }),
      request.timeoutMs
    );
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "ai_provider_error",
        message: `OpenAI returned ${String(response.status)}`
      });
    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content)
      throw new AppError({ status: 502, code: "invalid_ai_response", message: "OpenAI did not return content" });
    return {
      draft: parseDraft(JSON.parse(content)),
      model: request.model,
      provider: this.name,
      tokenUsage: tokenUsage(json.usage?.prompt_tokens, json.usage?.completion_tokens, json.usage?.total_tokens)
    };
  }
};
var AnthropicGenerationProvider = class extends HttpAiProvider {
  static {
    __name(this, "AnthropicGenerationProvider");
  }
  name = "anthropic";
  async generate(request) {
    const { endpoint, apiKey } = this.requireConfig();
    const response = await withGenerationTimeout(
      this.fetcher(endpoint, {
        method: "POST",
        headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({
          model: request.model,
          max_tokens: 6e3,
          system: request.systemPrompt,
          messages: [{ role: "user", content: request.userPrompt }]
        })
      }),
      request.timeoutMs
    );
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "ai_provider_error",
        message: `Anthropic returned ${String(response.status)}`
      });
    const json = await response.json();
    const content = json.content?.find((item) => item.type === "text")?.text;
    if (!content)
      throw new AppError({ status: 502, code: "invalid_ai_response", message: "Anthropic did not return content" });
    return {
      draft: parseDraft(JSON.parse(content)),
      model: request.model,
      provider: this.name,
      tokenUsage: tokenUsage(
        json.usage?.input_tokens,
        json.usage?.output_tokens,
        json.usage?.input_tokens && json.usage.output_tokens ? json.usage.input_tokens + json.usage.output_tokens : void 0
      )
    };
  }
};
var GoogleAiGenerationProvider = class extends HttpAiProvider {
  static {
    __name(this, "GoogleAiGenerationProvider");
  }
  name = "google-ai";
  async generate(request) {
    const { endpoint, apiKey } = this.requireConfig();
    const url = new URL(endpoint.replace("{model}", encodeURIComponent(request.model)));
    url.searchParams.set("key", apiKey);
    const response = await withGenerationTimeout(
      this.fetcher(url.toString(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: request.systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: request.userPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }),
      request.timeoutMs
    );
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "ai_provider_error",
        message: `Google AI returned ${String(response.status)}`
      });
    const json = await response.json();
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content)
      throw new AppError({ status: 502, code: "invalid_ai_response", message: "Google AI did not return content" });
    return {
      draft: parseDraft(JSON.parse(content)),
      model: request.model,
      provider: this.name,
      tokenUsage: tokenUsage(
        json.usageMetadata?.promptTokenCount,
        json.usageMetadata?.candidatesTokenCount,
        json.usageMetadata?.totalTokenCount
      )
    };
  }
};
var AiProviderRegistry = class {
  static {
    __name(this, "AiProviderRegistry");
  }
  providers = /* @__PURE__ */ new Map();
  /**
   * Registers one provider.
   */
  register(provider) {
    this.providers.set(provider.name, provider);
  }
  /**
   * Resolves one provider by name.
   */
  resolve(name) {
    const provider = this.providers.get(name);
    if (!provider)
      throw new AppError({ status: 500, code: "ai_provider_missing", message: `${name} is not registered` });
    return provider;
  }
  /**
   * Lists provider identifiers.
   */
  list() {
    return Array.from(this.providers.keys());
  }
};
function createAiProviderRegistry(config, fetcher = fetch) {
  const registry = new AiProviderRegistry();
  registry.register(new OpenAiGenerationProvider(config.openAiEndpoint, config.openAiApiKey, fetcher));
  registry.register(new AnthropicGenerationProvider(config.anthropicEndpoint, config.anthropicApiKey, fetcher));
  registry.register(new GoogleAiGenerationProvider(config.googleAiEndpoint, config.googleAiApiKey, fetcher));
  return registry;
}
__name(createAiProviderRegistry, "createAiProviderRegistry");

// src/domains/ai-generation/repositories.ts
function mapGenerationJobRow(row) {
  return {
    id: row.id,
    contentId: row.content_id,
    questionId: row.question_id,
    status: row.status,
    contentType: row.content_type,
    question: row.question,
    provider: row.provider,
    model: row.model,
    promptTemplateId: row.prompt_template_id,
    promptVersion: row.prompt_version,
    ragContext: JSON.parse(row.rag_context_json),
    generatedContent: row.generated_content_json ? JSON.parse(row.generated_content_json) : null,
    validation: row.validation_json ? JSON.parse(row.validation_json) : null,
    generationMetadata: row.generation_metadata_json ? JSON.parse(row.generation_metadata_json) : null,
    retryCount: row.retry_count,
    maxRetries: row.max_retries,
    cancellationReason: row.cancellation_reason,
    errorMessage: row.error_message,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
__name(mapGenerationJobRow, "mapGenerationJobRow");
function mapPromptRow(row) {
  return {
    id: row.id,
    name: row.name,
    version: row.version,
    contentType: row.content_type,
    parentId: row.parent_id,
    systemPrompt: row.system_prompt,
    userPrompt: row.user_prompt,
    variables: JSON.parse(row.variables_json),
    active: row.active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
__name(mapPromptRow, "mapPromptRow");
var GenerationJobRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "GenerationJobRepository");
  }
  /**
   * Creates one generation job.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      `insert into ai_generation_jobs (
          id, content_id, question_id, status, content_type, question, provider, model, prompt_template_id,
          prompt_version, rag_context_json, generated_content_json, validation_json, generation_metadata_json,
          retry_count, max_retries, cancellation_reason, error_message, started_at, completed_at, created_at, updated_at
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      record.id,
      record.contentId,
      record.questionId,
      record.status,
      record.contentType,
      record.question,
      record.provider,
      record.model,
      record.promptTemplateId,
      record.promptVersion,
      JSON.stringify(record.ragContext),
      record.generatedContent ? JSON.stringify(record.generatedContent) : null,
      record.validation ? JSON.stringify(record.validation) : null,
      record.generationMetadata ? JSON.stringify(record.generationMetadata) : null,
      record.retryCount,
      record.maxRetries,
      record.cancellationReason,
      record.errorMessage,
      record.startedAt,
      record.completedAt,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Generation job create failed");
  }
  /**
   * Updates one generation job.
   */
  async update(record) {
    const result2 = await this.db.prepare(
      `update ai_generation_jobs set content_id = ?, status = ?, rag_context_json = ?, generated_content_json = ?,
          validation_json = ?, generation_metadata_json = ?, retry_count = ?, cancellation_reason = ?, error_message = ?,
          started_at = ?, completed_at = ?, updated_at = ? where id = ?`
    ).bind(
      record.contentId,
      record.status,
      JSON.stringify(record.ragContext),
      record.generatedContent ? JSON.stringify(record.generatedContent) : null,
      record.validation ? JSON.stringify(record.validation) : null,
      record.generationMetadata ? JSON.stringify(record.generationMetadata) : null,
      record.retryCount,
      record.cancellationReason,
      record.errorMessage,
      record.startedAt,
      record.completedAt,
      record.updatedAt,
      record.id
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Generation job update failed");
  }
  /**
   * Finds one generation job by ID.
   */
  async findById(id) {
    const row = await this.db.prepare("select * from ai_generation_jobs where id = ?").bind(id).first();
    return row ? mapGenerationJobRow(row) : null;
  }
  /**
   * Lists generation jobs.
   */
  async list(limit) {
    const result2 = await this.db.prepare("select * from ai_generation_jobs order by created_at desc limit ?").bind(limit).all();
    return result2.results.map(mapGenerationJobRow);
  }
};
var PromptTemplateRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PromptTemplateRepository");
  }
  /**
   * Upserts a prompt template.
   */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into ai_prompt_templates (id, name, version, content_type, parent_id, system_prompt, user_prompt, variables_json, active, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(content_type, version) do update set name = excluded.name, parent_id = excluded.parent_id, system_prompt = excluded.system_prompt, user_prompt = excluded.user_prompt, variables_json = excluded.variables_json, active = excluded.active, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.name,
      record.version,
      record.contentType,
      record.parentId,
      record.systemPrompt,
      record.userPrompt,
      JSON.stringify(record.variables),
      record.active ? 1 : 0,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Prompt template upsert failed");
  }
  /**
   * Finds the active prompt for a content type.
   */
  async findActive(contentType) {
    const row = await this.db.prepare("select * from ai_prompt_templates where content_type = ? and active = 1 order by version desc limit 1").bind(contentType).first();
    return row ? mapPromptRow(row) : null;
  }
  /**
   * Finds a prompt by ID.
   */
  async findById(id) {
    const row = await this.db.prepare("select * from ai_prompt_templates where id = ?").bind(id).first();
    return row ? mapPromptRow(row) : null;
  }
};
var AiProviderCheckRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "AiProviderCheckRepository");
  }
  /**
   * Stores a provider check result.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into ai_provider_checks (id, provider, status, latency_ms, model, error_message, checked_at) values (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.provider,
      record.status,
      record.latencyMs,
      record.model,
      record.errorMessage,
      record.checkedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Provider check create failed");
  }
};

// src/domains/ai-generation/prompts.ts
function createDefaultPromptTemplate(contentType, timestamp) {
  return {
    id: crypto.randomUUID(),
    name: `${contentType} Authority Prompt`,
    version: 1,
    contentType,
    parentId: null,
    active: true,
    variables: ["question", "ragContext", "minWordCount", "targetKeyword", "language"],
    systemPrompt: "You are Vista by Lara's internal AI content engine. Generate only from supplied internal context. Do not invent external facts. Return valid JSON only.",
    userPrompt: "Create a {contentType} for question {question}. Use target keyword {targetKeyword}. Minimum words: {minWordCount}. Language: {language}. Internal RAG context: {ragContext}. Return JSON with title, slug, body, outline, seoTitle, seoDescription, aiSummary, schemaType, entities, internalLinks, wordCount, readingTimeMinutes.",
    createdAt: timestamp,
    updatedAt: timestamp
  };
}
__name(createDefaultPromptTemplate, "createDefaultPromptTemplate");
function inheritPrompt(child, parent) {
  if (!parent) return child;
  return {
    ...child,
    systemPrompt: child.systemPrompt.length > 0 ? child.systemPrompt : parent.systemPrompt,
    userPrompt: child.userPrompt.length > 0 ? child.userPrompt : parent.userPrompt,
    variables: Array.from(/* @__PURE__ */ new Set([...parent.variables, ...child.variables]))
  };
}
__name(inheritPrompt, "inheritPrompt");
function renderPrompt(template, variables) {
  return template.replace(/\{([a-zA-Z0-9_]+)\}/gu, (_match, key) => {
    const value = variables[key];
    if (value === void 0) {
      throw new AppError({ status: 500, code: "prompt_variable_missing", message: `Prompt variable ${key} is missing` });
    }
    return value;
  });
}
__name(renderPrompt, "renderPrompt");
function serializeRagContext(context) {
  return JSON.stringify(context);
}
__name(serializeRagContext, "serializeRagContext");

// src/domains/question-discovery/config.ts
var defaultEntityDefinitions = [
  { key: "vista-by-lara", label: "Vista by Lara", aliases: ["vista by lara", "vista"] },
  { key: "dubai", label: "Dubai", aliases: ["dubai", "dxb"] },
  { key: "uae", label: "UAE", aliases: ["uae", "united arab emirates", "emirates"] },
  { key: "shopify", label: "Shopify", aliases: ["shopify", "shopify plus"] },
  { key: "google-ads", label: "Google Ads", aliases: ["google ads", "ppc", "performance max"] },
  { key: "ai-automation", label: "AI Automation", aliases: ["ai automation", "automation", "ai agent"] },
  {
    key: "geo",
    label: "Generative Engine Optimization (GEO)",
    aliases: ["generative engine optimization", "geo", "ai search optimization"]
  },
  { key: "ai-visibility", label: "AI Visibility", aliases: ["ai visibility", "ai discovery", "ai citation"] },
  { key: "brand-identity", label: "Brand Identity", aliases: ["brand identity", "branding", "brand strategy"] },
  { key: "ux-ui", label: "UX/UI", aliases: ["ux/ui", "ui ux", "ux design", "ui design", "user experience"] }
];
var defaultScoringWeights = {
  commercialIntent: 0.24,
  uaeRelevance: 0.22,
  aiRelevance: 0.22,
  searchDemand: 0.16,
  freshness: 0.08,
  existingCoverageGap: 0.08
};

// src/domains/ai-generation/rag.ts
var approvedContentStatuses = /* @__PURE__ */ new Set([
  "APPROVED",
  "PLANNED",
  "GENERATED",
  "REVIEW_REQUIRED",
  "APPROVED_FOR_PUBLISHING",
  "PUBLISHED",
  "UPDATED"
]);
var RagContextBuilder = class {
  constructor(questions, content) {
    this.questions = questions;
    this.content = content;
  }
  questions;
  content;
  static {
    __name(this, "RagContextBuilder");
  }
  /**
   * Retrieves related internal context for one generation question.
   */
  async build(question) {
    const [questions, content] = await Promise.all([this.questions.list(25, 0), this.content.list(50, 0)]);
    const related = this.relatedContent(question, content);
    return {
      question,
      approvedQuestions: questions.slice(0, 10).map((item) => item.question),
      relatedContent: related.slice(0, 10).map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        status: item.status,
        summary: item.aiSummary,
        entities: item.entities
      })),
      entities: this.entitiesFor(question, related),
      existingFaqs: content.filter((item) => item.contentType === "FAQ").slice(0, 10).map((item) => item.title),
      servicePages: content.filter((item) => item.contentType === "Service Page").slice(0, 10).map((item) => ({ id: item.id, title: item.title, slug: item.slug })),
      previousArticles: content.filter((item) => item.contentType === "Authority Article" || item.contentType === "Knowledge Page").slice(0, 10).map((item) => ({ id: item.id, title: item.title, slug: item.slug })),
      templates: [
        {
          contentType: "Authority Article",
          schemaType: "TechArticle",
          requiredFields: ["title", "body", "seoMetadata", "aiSummary"]
        },
        { contentType: "FAQ", schemaType: "FAQPage", requiredFields: ["title", "body", "entities"] },
        { contentType: "Service Page", schemaType: "Service", requiredFields: ["title", "body", "internalLinks"] }
      ]
    };
  }
  relatedContent(question, content) {
    const query = question.toLowerCase();
    return content.filter((item) => approvedContentStatuses.has(item.status)).map((item) => ({
      item,
      score: (query.includes(item.targetKeyword.toLowerCase()) ? 3 : 0) + item.entities.filter((entity) => query.includes(entity.toLowerCase())).length + (query.includes(item.title.toLowerCase()) ? 2 : 0)
    })).sort((left, right) => right.score - left.score).map(({ item }) => item);
  }
  entitiesFor(question, content) {
    const query = question.toLowerCase();
    const configured = defaultEntityDefinitions.filter((entity) => entity.aliases.some((alias) => query.includes(alias.toLowerCase()))).map((entity) => entity.label);
    return Array.from(/* @__PURE__ */ new Set([...configured, ...content.flatMap((item) => item.entities)])).slice(0, 20);
  }
};

// src/domains/ai-generation/types.ts
function toContentRepositoryType(contentType) {
  if (contentType === "Comparison Article") return "Comparison Page";
  if (contentType === "Glossary Page") return "Knowledge Page";
  return contentType;
}
__name(toContentRepositoryType, "toContentRepositoryType");

// src/domains/ai-generation/validation.ts
function validateGeneratedDraft(input) {
  const errors = [];
  const warnings = [];
  const body = input.draft.body;
  const headingLevels = Array.from(body.matchAll(/^#{1,6}\s/gmu)).map((match) => match[0].trim().length);
  const duplicateDetected = input.existingContent.some(
    (item) => item.slug === input.draft.slug || item.title.toLowerCase() === input.draft.title.toLowerCase()
  );
  if (input.draft.wordCount < input.minWordCount) errors.push("Minimum word count was not met");
  if (duplicateDetected) errors.push("Duplicate content detected");
  if (headingLevels.some((level, index) => index > 0 && level - (headingLevels[index - 1] ?? level) > 1)) {
    errors.push("Heading hierarchy skips a level");
  }
  if (input.draft.seoTitle.length === 0 || input.draft.seoDescription.length === 0)
    errors.push("Required SEO metadata is missing");
  if (input.draft.schemaType.length === 0) errors.push("Required schema type is missing");
  if (input.draft.entities.length === 0) errors.push("Entity coverage is missing");
  if (input.draft.internalLinks.length === 0) warnings.push("Internal link suggestions are missing");
  if (averageSentenceWords(body) > 24) warnings.push("Reading level may be too dense");
  const entityHits = input.ragContext.entities.filter((entity) => input.draft.entities.includes(entity)).length;
  const contentScore = Math.max(0, 1 - errors.length * 0.2 - warnings.length * 0.05);
  const entityScore = input.ragContext.entities.length === 0 ? 1 : entityHits / input.ragContext.entities.length;
  return {
    score: Number(Math.max(0, contentScore * 0.75 + entityScore * 0.25).toFixed(4)),
    contentScore: Number(contentScore.toFixed(4)),
    errors,
    warnings,
    duplicateDetected
  };
}
__name(validateGeneratedDraft, "validateGeneratedDraft");
function averageSentenceWords(value) {
  const sentences = value.split(/[.!?]+/u).map((item) => item.trim()).filter(Boolean);
  if (sentences.length === 0) return 0;
  const words = sentences.reduce((total, sentence) => total + sentence.split(/\s+/u).filter(Boolean).length, 0);
  return words / sentences.length;
}
__name(averageSentenceWords, "averageSentenceWords");

// src/domains/ai-generation/service.ts
var AiGenerationService = class {
  constructor(providerRegistry, jobs, prompts, providerChecks, questions, content, contentPipeline, activeProvider, activeModel, timeoutMs, logger, budgets) {
    this.providerRegistry = providerRegistry;
    this.jobs = jobs;
    this.prompts = prompts;
    this.providerChecks = providerChecks;
    this.questions = questions;
    this.content = content;
    this.contentPipeline = contentPipeline;
    this.activeProvider = activeProvider;
    this.activeModel = activeModel;
    this.timeoutMs = timeoutMs;
    this.logger = logger;
    this.budgets = budgets;
  }
  providerRegistry;
  jobs;
  prompts;
  providerChecks;
  questions;
  content;
  contentPipeline;
  activeProvider;
  activeModel;
  timeoutMs;
  logger;
  budgets;
  static {
    __name(this, "AiGenerationService");
  }
  /**
   * Creates a generation job and optionally executes it immediately.
   */
  async createJob(input, actor2, requestId) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const ragContext = await new RagContextBuilder(this.questions, this.content).build(input.question);
    const prompt = await this.resolvePrompt(input.contentType, timestamp);
    const job = {
      id: crypto.randomUUID(),
      contentId: input.contentId,
      questionId: input.questionId,
      status: "queued",
      contentType: input.contentType,
      question: input.question,
      provider: this.activeProvider,
      model: this.activeModel,
      promptTemplateId: prompt.id,
      promptVersion: prompt.version,
      ragContext,
      generatedContent: null,
      validation: null,
      generationMetadata: null,
      retryCount: 0,
      maxRetries: 2,
      cancellationReason: null,
      errorMessage: null,
      startedAt: null,
      completedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    await this.jobs.create(job);
    this.logger.info("AI generation job created", { jobId: job.id, contentType: job.contentType }, requestId);
    if (!input.async) return this.processJob(job.id, actor2, requestId, input.minWordCount);
    return job;
  }
  /**
   * Executes a queued generation job.
   */
  async processJob(jobId, actor2, requestId, minWordCount = 800) {
    const job = await this.getJob(jobId);
    if (job.status === "cancelled") return job;
    if (job.status === "completed") return job;
    const started = Date.now();
    const running = {
      ...job,
      status: "running",
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.jobs.update(running);
    try {
      const prompt = await this.getPrompt(running.promptTemplateId);
      const rendered = this.renderJobPrompt(prompt, running, minWordCount);
      const provider = this.providerRegistry.resolve(running.provider);
      await this.budgets.assertBudgetAvailable(running.provider, actor2);
      const providerResult = await provider.generate({
        model: running.model,
        systemPrompt: rendered.systemPrompt,
        userPrompt: rendered.userPrompt,
        timeoutMs: this.timeoutMs
      });
      await this.budgets.recordUsage(
        {
          provider: running.provider,
          subject: actor2,
          totalTokens: providerResult.tokenUsage?.totalTokens ?? 0
        },
        requestId
      );
      const existingContent = await this.content.list(100, 0);
      const validation = validateGeneratedDraft({
        draft: providerResult.draft,
        minWordCount,
        ragContext: running.ragContext,
        existingContent
      });
      if (validation.errors.length > 0) {
        throw new AppError({
          status: 422,
          code: "generation_quality_failed",
          message: "Generated draft failed quality validation",
          details: { errors: validation.errors }
        });
      }
      const contentId = await this.storeDraft(running, providerResult.draft, actor2, requestId);
      const metadata = {
        model: providerResult.model,
        provider: providerResult.provider,
        promptVersion: running.promptVersion,
        generationTimeMs: Date.now() - started,
        tokenUsage: providerResult.tokenUsage ?? null,
        validationScore: validation.score,
        contentScore: validation.contentScore
      };
      const completed = {
        ...running,
        contentId,
        status: "completed",
        generatedContent: providerResult.draft,
        validation,
        generationMetadata: metadata,
        completedAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.jobs.update(completed);
      this.logger.info(
        "AI generation job completed",
        { jobId, contentId, validationScore: validation.score },
        requestId
      );
      return completed;
    } catch (error) {
      const message2 = error instanceof Error ? error.message : "Generation job failed";
      const retryCount = running.retryCount + 1;
      const failed = {
        ...running,
        status: retryCount <= running.maxRetries ? "queued" : "failed",
        retryCount,
        errorMessage: message2,
        completedAt: retryCount <= running.maxRetries ? null : (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.jobs.update(failed);
      this.logger.error("AI generation job failed", { jobId, retryCount, message: message2 }, requestId);
      if (failed.status === "queued") return failed;
      throw error;
    }
  }
  /**
   * Cancels a generation job that has not completed.
   */
  async cancelJob(id, reason, requestId) {
    const job = await this.getJob(id);
    if (job.status === "completed") {
      throw new AppError({
        status: 409,
        code: "generation_job_completed",
        message: "Completed generation jobs cannot be cancelled"
      });
    }
    const cancelled = {
      ...job,
      status: "cancelled",
      cancellationReason: reason,
      completedAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.jobs.update(cancelled);
    this.logger.info("AI generation job cancelled", { jobId: id, reason }, requestId);
    return cancelled;
  }
  /**
   * Lists generation jobs.
   */
  async listJobs(limit) {
    return this.jobs.list(limit);
  }
  /**
   * Gets one generation job.
   */
  async getJob(id) {
    const job = await this.jobs.findById(id);
    if (!job)
      throw new AppError({ status: 404, code: "generation_job_not_found", message: "Generation job was not found" });
    return job;
  }
  /**
   * Lists configured provider names.
   */
  listProviders() {
    return { active: this.activeProvider, providers: this.providerRegistry.list(), model: this.activeModel };
  }
  /**
   * Tests the active provider and records the check.
   */
  async testProvider(requestId) {
    const provider = this.providerRegistry.resolve(this.activeProvider);
    const result2 = await provider.test(this.activeModel, this.timeoutMs);
    await this.providerChecks.create({
      id: crypto.randomUUID(),
      provider: this.activeProvider,
      status: result2.ok ? "ok" : "failed",
      latencyMs: result2.latencyMs,
      model: this.activeModel,
      errorMessage: result2.errorMessage,
      checkedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    this.logger.info("AI provider check completed", { provider: this.activeProvider, ok: result2.ok }, requestId);
    return result2;
  }
  async resolvePrompt(contentType, timestamp) {
    const existing = await this.prompts.findActive(contentType);
    if (existing) return existing;
    const created = createDefaultPromptTemplate(contentType, timestamp);
    await this.prompts.upsert(created);
    return created;
  }
  async getPrompt(id) {
    const prompt = await this.prompts.findById(id);
    if (!prompt)
      throw new AppError({ status: 404, code: "prompt_template_not_found", message: "Prompt template was not found" });
    if (!prompt.parentId) return prompt;
    return inheritPrompt(prompt, await this.prompts.findById(prompt.parentId));
  }
  renderJobPrompt(prompt, job, minWordCount) {
    const variables = {
      question: job.question,
      contentType: job.contentType,
      targetKeyword: job.question,
      minWordCount: String(minWordCount),
      language: "en",
      ragContext: serializeRagContext(job.ragContext)
    };
    return {
      systemPrompt: renderPrompt(prompt.systemPrompt, variables),
      userPrompt: renderPrompt(prompt.userPrompt, variables)
    };
  }
  async storeDraft(job, draft, actor2, requestId) {
    if (!draft) throw new AppError({ status: 500, code: "draft_missing", message: "Generated draft is missing" });
    const input = {
      title: draft.title,
      slug: draft.slug,
      status: "GENERATED",
      contentType: toContentRepositoryType(job.contentType),
      language: "en",
      canonicalUrl: null,
      targetKeyword: job.question,
      entities: draft.entities,
      internalLinks: draft.internalLinks,
      schemaType: draft.schemaType,
      readingTimeMinutes: draft.readingTimeMinutes,
      wordCount: draft.wordCount,
      seoMetadata: { title: draft.seoTitle, description: draft.seoDescription },
      aiSummary: draft.aiSummary,
      publishingTargets: ["content-repository"],
      body: draft.body
    };
    if (job.contentId) {
      await this.contentPipeline.updateContent(job.contentId, input, actor2, requestId);
      return job.contentId;
    }
    const created = await this.contentPipeline.createContent(input, actor2, requestId);
    return created.id;
  }
};

// src/domains/ai-generation/api.ts
var generationContentTypes = [
  "Authority Article",
  "FAQ",
  "Knowledge Page",
  "Service Page",
  "Landing Page",
  "News Article",
  "Press Release",
  "Comparison Article",
  "Case Study",
  "Glossary Page"
];
function createAiGenerationService(container) {
  const content = new ContentRepository(container.db);
  return new AiGenerationService(
    createAiProviderRegistry(container.config),
    new GenerationJobRepository(container.db),
    new PromptTemplateRepository(container.db),
    new AiProviderCheckRepository(container.db),
    new QuestionRepository(container.db),
    content,
    new ContentPipelineService(
      content,
      new ContentVersionRepository(container.db),
      new EditorialQueueRepository(container.db),
      new ReviewQueueRepository(container.db),
      new PublicationQueueRepository(container.db),
      new InternalLinkRepository(container.db),
      new ContentAuditRepository(container.db),
      container.logger
    ),
    container.config.aiGenerationProvider,
    container.config.aiGenerationModel,
    container.config.aiGenerationTimeoutMs,
    container.logger,
    new AiBudgetManager(container.cache, container.config, container.logger)
  );
}
__name(createAiGenerationService, "createAiGenerationService");
function validateGenerateRequest(value, contentId) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code: "validation_error", message: "Request body must be a JSON object" });
  }
  const body = value;
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (question.length < 5)
    throw new AppError({ status: 400, code: "validation_error", message: "question is required" });
  const contentType = typeof body.contentType === "string" ? body.contentType : "Authority Article";
  if (!generationContentTypes.includes(contentType)) {
    throw new AppError({ status: 400, code: "validation_error", message: "contentType is not supported" });
  }
  const language = typeof body.language === "string" ? body.language : "en";
  if (language !== "en" && language !== "ar") {
    throw new AppError({ status: 400, code: "validation_error", message: "language must be en or ar" });
  }
  const minWordCount = typeof body.minWordCount === "number" && Number.isInteger(body.minWordCount) ? body.minWordCount : 800;
  if (minWordCount < 50 || minWordCount > 1e4) {
    throw new AppError({ status: 400, code: "validation_error", message: "minWordCount must be between 50 and 10000" });
  }
  return {
    question,
    questionId: typeof body.questionId === "string" ? body.questionId : null,
    contentId,
    contentType,
    minWordCount,
    language,
    targetKeyword: typeof body.targetKeyword === "string" ? body.targetKeyword : question,
    async: body.async === true
  };
}
__name(validateGenerateRequest, "validateGenerateRequest");
function readLimit(url) {
  const raw = url.searchParams.get("limit");
  if (!raw) return 50;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 1 || value > 100) {
    throw new AppError({ status: 400, code: "invalid_query", message: "limit must be between 1 and 100" });
  }
  return value;
}
__name(readLimit, "readLimit");
function actor(context) {
  return context.auth?.subject ?? "api-key";
}
__name(actor, "actor");
async function routeAiGenerationRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createAiGenerationService(container);
  if (request.method === "POST" && url.pathname === "/generate") {
    const input = validateGenerateRequest(await readJson(request), null);
    const job = await service.createJob(input, actor(context), context.requestId);
    if (input.async)
      await container.queue.send({
        id: job.id,
        type: "ai-generation.run",
        payload: { jobId: job.id, minWordCount: input.minWordCount }
      });
    return successResponse({ job }, context.requestId, input.async ? 202 : 201);
  }
  const contentGenerateMatch = /^\/generate\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "POST" && contentGenerateMatch?.[1]) {
    const input = validateGenerateRequest(await readJson(request), contentGenerateMatch[1]);
    const job = await service.createJob(input, actor(context), context.requestId);
    if (input.async)
      await container.queue.send({
        id: job.id,
        type: "ai-generation.run",
        payload: { jobId: job.id, minWordCount: input.minWordCount }
      });
    return successResponse({ job }, context.requestId, input.async ? 202 : 201);
  }
  if (request.method === "GET" && url.pathname === "/generate/jobs") {
    return successResponse({ jobs: await service.listJobs(readLimit(url)) }, context.requestId);
  }
  const jobMatch = /^\/generate\/jobs\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && jobMatch?.[1]) {
    return successResponse({ job: await service.getJob(jobMatch[1]) }, context.requestId);
  }
  const cancelMatch = /^\/generate\/jobs\/([^/]+)\/cancel$/u.exec(url.pathname);
  if (request.method === "POST" && cancelMatch?.[1]) {
    const body = await readJson(request);
    const reason = typeof body.reason === "string" ? body.reason : "cancelled by request";
    return successResponse(
      { job: await service.cancelJob(cancelMatch[1], reason, context.requestId) },
      context.requestId
    );
  }
  if (request.method === "GET" && url.pathname === "/generate/providers") {
    return successResponse(service.listProviders(), context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/generate/providers/test") {
    return successResponse({ provider: await service.testProvider(context.requestId) }, context.requestId);
  }
  return null;
}
__name(routeAiGenerationRequest, "routeAiGenerationRequest");

// src/domains/external-search-indexing/providers.ts
function requireConfig(value, name) {
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}
__name(requireConfig, "requireConfig");
async function readJson2(response) {
  const text = await response.text();
  if (text.length === 0) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { body: text };
  }
}
__name(readJson2, "readJson");
function appendQuery(url, params) {
  const next = new URL(url);
  for (const [key, value] of Object.entries(params)) next.searchParams.set(key, value);
  return next.toString();
}
__name(appendQuery, "appendQuery");
var GoogleSearchConsoleProvider = class {
  constructor(endpoint, accessToken, fetcher = fetch) {
    this.endpoint = endpoint;
    this.accessToken = accessToken;
    this.fetcher = fetcher;
  }
  endpoint;
  accessToken;
  fetcher;
  static {
    __name(this, "GoogleSearchConsoleProvider");
  }
  name = "google-search-console";
  /** Imports site status from Google Search Console. */
  async getStatus(siteUrl) {
    const endpoint = requireConfig(this.endpoint, "GOOGLE_SEARCH_CONSOLE_ENDPOINT");
    const token = requireConfig(this.accessToken, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN");
    const response = await this.fetcher(appendQuery(`${endpoint}/sites/${encodeURIComponent(siteUrl)}`, {}), {
      headers: { authorization: `Bearer ${token}` }
    });
    return { statusCode: response.status, ...await readJson2(response) };
  }
  /** Submits a sitemap to Google Search Console. */
  async submitSitemap(siteUrl, sitemapUrl) {
    const endpoint = requireConfig(this.endpoint, "GOOGLE_SEARCH_CONSOLE_ENDPOINT");
    const token = requireConfig(this.accessToken, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN");
    const response = await this.fetcher(
      `${endpoint}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
      { method: "PUT", headers: { authorization: `Bearer ${token}` } }
    );
    return { statusCode: response.status, ...await readJson2(response) };
  }
  /** Imports search analytics and crawl status from Google Search Console. */
  async importAnalytics(siteUrl) {
    const endpoint = requireConfig(this.endpoint, "GOOGLE_SEARCH_CONSOLE_ENDPOINT");
    const token = requireConfig(this.accessToken, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN");
    const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };
    const statusResponse = await this.fetcher(`${endpoint}/sites/${encodeURIComponent(siteUrl)}`, { headers });
    const sitemapResponse = await this.fetcher(`${endpoint}/sites/${encodeURIComponent(siteUrl)}/sitemaps`, { headers });
    const analyticsResponse = await this.fetcher(
      `${endpoint}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ startDate: "2026-01-01", endDate: "2026-12-31", dimensions: ["query", "page"] })
      }
    );
    const crawlResponse = await this.fetcher(
      `${endpoint}/sites/${encodeURIComponent(siteUrl)}/urlInspection/index:inspect`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ inspectionUrl: siteUrl, siteUrl })
      }
    );
    return {
      id: crypto.randomUUID(),
      importedAt: (/* @__PURE__ */ new Date()).toISOString(),
      siteUrl,
      verificationStatus: statusResponse.ok ? "verified" : "unknown",
      sitemapStatus: { statusCode: sitemapResponse.status, ...await readJson2(sitemapResponse) },
      analytics: { statusCode: analyticsResponse.status, ...await readJson2(analyticsResponse) },
      crawlErrors: { statusCode: crawlResponse.status, ...await readJson2(crawlResponse) }
    };
  }
  /** Search Console has no general public URL submit endpoint; sitemap submission is used instead. */
  submitUrls(urls) {
    return Promise.resolve(
      urls.map((url) => ({
        url,
        accepted: false,
        statusCode: null,
        response: { reason: "Google Search Console URL submission is represented by sitemap submission." }
      }))
    );
  }
};
var BingWebmasterToolsProvider = class {
  constructor(endpoint, apiKey, fetcher = fetch) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.fetcher = fetcher;
  }
  endpoint;
  apiKey;
  fetcher;
  static {
    __name(this, "BingWebmasterToolsProvider");
  }
  name = "bing-webmaster";
  /** Gets Bing site status. */
  async getStatus(siteUrl) {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT");
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY");
    const response = await this.fetcher(appendQuery(`${endpoint}/GetSite`, { siteUrl, apikey: key }));
    return { statusCode: response.status, ...await readJson2(response) };
  }
  /** Submits a sitemap to Bing Webmaster Tools. */
  async submitSitemap(siteUrl, sitemapUrl) {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT");
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY");
    const response = await this.fetcher(
      appendQuery(`${endpoint}/SubmitSitemap`, { siteUrl, sitemapUrl, apikey: key }),
      {
        method: "POST"
      }
    );
    return { statusCode: response.status, ...await readJson2(response) };
  }
  /** Imports Bing search performance and sitemap status. */
  async importPerformance(siteUrl) {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT");
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY");
    const sitemapResponse = await this.fetcher(appendQuery(`${endpoint}/GetSitemaps`, { siteUrl, apikey: key }));
    const performanceResponse = await this.fetcher(appendQuery(`${endpoint}/GetQueryStats`, { siteUrl, apikey: key }));
    return {
      id: crypto.randomUUID(),
      importedAt: (/* @__PURE__ */ new Date()).toISOString(),
      siteUrl,
      sitemapStatus: { statusCode: sitemapResponse.status, ...await readJson2(sitemapResponse) },
      performance: { statusCode: performanceResponse.status, ...await readJson2(performanceResponse) }
    };
  }
  /** Submits URLs to Bing URL submission API. */
  async submitUrls(urls) {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT");
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY");
    const results = [];
    for (const url of urls) {
      const response = await this.fetcher(appendQuery(`${endpoint}/SubmitUrl`, { url, apikey: key }), {
        method: "POST"
      });
      results.push({ url, accepted: response.ok, statusCode: response.status, response: await readJson2(response) });
    }
    return results;
  }
};
var IndexNowSubmissionProvider = class {
  constructor(endpoint, key, keyLocation, fetcher = fetch) {
    this.endpoint = endpoint;
    this.key = key;
    this.keyLocation = keyLocation;
    this.fetcher = fetcher;
  }
  endpoint;
  key;
  keyLocation;
  fetcher;
  static {
    __name(this, "IndexNowSubmissionProvider");
  }
  name = "indexnow";
  /** Gets IndexNow configuration status. */
  getStatus(siteUrl) {
    return Promise.resolve({ configured: Boolean(this.key), siteUrl, keyLocation: this.keyLocation ?? null });
  }
  /** Verifies local IndexNow settings before submission. */
  verify() {
    return Promise.resolve({ ready: Boolean(this.key), endpoint: this.endpoint, keyLocation: this.keyLocation ?? null });
  }
  /** Submits URLs to IndexNow in one official batch request. */
  async submitUrls(urls) {
    const key = requireConfig(this.key, "INDEXNOW_KEY");
    const host = new URL(urls[0] ?? "https://www.vistabylara.com").host;
    const response = await this.fetcher(this.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ host, key, keyLocation: this.keyLocation, urlList: urls })
    });
    const body = await readJson2(response);
    return urls.map((url) => ({ url, accepted: response.ok, statusCode: response.status, response: body }));
  }
};
var ExternalSearchProviderRegistry = class {
  static {
    __name(this, "ExternalSearchProviderRegistry");
  }
  providers = /* @__PURE__ */ new Map();
  /** Registers a provider. */
  register(provider) {
    this.providers.set(provider.name, provider);
  }
  /** Gets a provider by name. */
  get(name) {
    const provider = this.providers.get(name);
    if (!provider) throw new Error(`External search provider ${name} is not registered`);
    return provider;
  }
  /** Lists providers. */
  list() {
    return Array.from(this.providers.values());
  }
};
function createExternalSearchProviderRegistry(config) {
  const registry = new ExternalSearchProviderRegistry();
  registry.register(
    new GoogleSearchConsoleProvider(config.googleSearchConsoleEndpoint, config.googleSearchConsoleAccessToken)
  );
  registry.register(new BingWebmasterToolsProvider(config.bingWebmasterEndpoint, config.bingWebmasterApiKey));
  registry.register(
    new IndexNowSubmissionProvider(config.indexNowEndpoint, config.indexNowKey, config.indexNowKeyLocation)
  );
  return registry;
}
__name(createExternalSearchProviderRegistry, "createExternalSearchProviderRegistry");

// src/domains/external-search-indexing/repositories.ts
var IndexingJobRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "IndexingJobRepository");
  }
  /** Creates an indexing job. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into indexing_jobs (id, job_type, status, urls_json, provider, attempt_count, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.jobType,
      record.status,
      JSON.stringify(record.urls),
      record.provider,
      record.attemptCount,
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Indexing job create failed");
  }
  /** Updates job status and attempts. */
  async update(record) {
    const result2 = await this.db.prepare("update indexing_jobs set status = ?, attempt_count = ?, updated_at = ? where id = ?").bind(record.status, record.attemptCount, record.updatedAt, record.id).run();
    if (!result2.success) throw new Error(result2.error ?? "Indexing job update failed");
  }
  /** Lists recent jobs. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from indexing_jobs order by updated_at desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      jobType: row.job_type,
      status: row.status,
      urls: JSON.parse(row.urls_json),
      provider: row.provider,
      attemptCount: row.attempt_count,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
};
var IndexingResultRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "IndexingResultRepository");
  }
  /** Creates submission results. */
  async createMany(records) {
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into indexing_results (id, job_id, provider, url, status, status_code, response_json, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        record.id,
        record.jobId,
        record.provider,
        record.url,
        record.status,
        record.statusCode,
        JSON.stringify(record.response),
        record.createdAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Indexing result create failed");
    }
  }
  /** Lists submission results for a job. */
  async listForJob(jobId) {
    const result2 = await this.db.prepare("select * from indexing_results where job_id = ? order by created_at desc").bind(jobId).all();
    return result2.results.map((row) => ({
      id: row.id,
      jobId: row.job_id,
      provider: row.provider,
      url: row.url,
      status: row.status,
      statusCode: row.status_code,
      response: JSON.parse(row.response_json),
      createdAt: row.created_at
    }));
  }
};
var SearchConsoleImportRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "SearchConsoleImportRepository");
  }
  /** Stores one Search Console import. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into search_console_imports (id, imported_at, site_url, verification_status, sitemap_status_json, analytics_json, crawl_errors_json) values (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.importedAt,
      record.siteUrl,
      record.verificationStatus,
      JSON.stringify(record.sitemapStatus),
      JSON.stringify(record.analytics),
      JSON.stringify(record.crawlErrors)
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Search Console import create failed");
  }
  /** Gets the latest Search Console import. */
  async latest() {
    const row = await this.db.prepare("select * from search_console_imports order by imported_at desc limit 1").first();
    return row ? {
      id: row.id,
      importedAt: row.imported_at,
      siteUrl: row.site_url,
      verificationStatus: row.verification_status,
      sitemapStatus: JSON.parse(row.sitemap_status_json),
      analytics: JSON.parse(row.analytics_json),
      crawlErrors: JSON.parse(row.crawl_errors_json)
    } : null;
  }
};
var BingImportRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "BingImportRepository");
  }
  /** Stores one Bing import. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into bing_imports (id, imported_at, site_url, sitemap_status_json, performance_json) values (?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.importedAt,
      record.siteUrl,
      JSON.stringify(record.sitemapStatus),
      JSON.stringify(record.performance)
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Bing import create failed");
  }
  /** Gets the latest Bing import. */
  async latest() {
    const row = await this.db.prepare("select * from bing_imports order by imported_at desc limit 1").first();
    return row ? {
      id: row.id,
      importedAt: row.imported_at,
      siteUrl: row.site_url,
      sitemapStatus: JSON.parse(row.sitemap_status_json),
      performance: JSON.parse(row.performance_json)
    } : null;
  }
};
var SitemapVersionRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "SitemapVersionRepository");
  }
  /** Creates a sitemap version. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into sitemap_versions (id, version, sitemap_xml, sitemap_index_xml, url_count, checksum, created_at) values (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.version,
      record.body,
      record.sitemapIndexXml,
      record.urlCount,
      record.checksum,
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Sitemap version create failed");
  }
  /** Gets latest sitemap version. */
  async latest() {
    const row = await this.db.prepare("select * from sitemap_versions order by version desc limit 1").first();
    return row ? {
      id: row.id,
      version: row.version,
      body: row.sitemap_xml,
      sitemapIndexXml: row.sitemap_index_xml,
      urlCount: row.url_count,
      checksum: row.checksum,
      createdAt: row.created_at
    } : null;
  }
};
var RobotsVersionRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "RobotsVersionRepository");
  }
  /** Creates a robots.txt version. */
  async create(record) {
    const result2 = await this.db.prepare("insert into robots_versions (id, version, body, checksum, created_at) values (?, ?, ?, ?, ?)").bind(record.id, record.version, record.body, record.checksum, record.createdAt).run();
    if (!result2.success) throw new Error(result2.error ?? "Robots version create failed");
  }
  /** Gets latest robots.txt version. */
  async latest() {
    const row = await this.db.prepare("select * from robots_versions order by version desc limit 1").first();
    return row ? { id: row.id, version: row.version, body: row.body, checksum: row.checksum, createdAt: row.created_at } : null;
  }
};
var LlmsVersionRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "LlmsVersionRepository");
  }
  /** Creates an llms.txt version. */
  async create(record) {
    const result2 = await this.db.prepare("insert into llms_versions (id, version, body, checksum, created_at) values (?, ?, ?, ?, ?)").bind(record.id, record.version, record.body, record.checksum, record.createdAt).run();
    if (!result2.success) throw new Error(result2.error ?? "Llms version create failed");
  }
  /** Gets latest llms.txt version. */
  async latest() {
    const row = await this.db.prepare("select * from llms_versions order by version desc limit 1").first();
    return row ? { id: row.id, version: row.version, body: row.body, checksum: row.checksum, createdAt: row.created_at } : null;
  }
};

// src/domains/external-search-indexing/resources.ts
function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
__name(escapeXml, "escapeXml");
function contentUrl(baseUrl, content) {
  return content.canonicalUrl ?? `${baseUrl}/knowledge/${content.slug}`;
}
__name(contentUrl, "contentUrl");
function publicContent(content) {
  return content.status === "PUBLISHED" || content.status === "UPDATED";
}
__name(publicContent, "publicContent");
async function checksum(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(checksum, "checksum");
function generateSearchResources(context) {
  const content = context.content.filter(publicContent);
  const urls = Array.from(
    /* @__PURE__ */ new Set([context.websiteBaseUrl, ...content.map((item) => contentUrl(context.websiteBaseUrl, item))])
  );
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (url) => `  <url><loc>${escapeXml(url)}</loc><lastmod>${context.generatedAt.slice(0, 10)}</lastmod></url>`
    ),
    "</urlset>"
  ].join("\n");
  const sitemapIndexXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${escapeXml(`${context.websiteBaseUrl}/sitemap.xml`)}</loc><lastmod>${context.generatedAt.slice(0, 10)}</lastmod></sitemap>`,
    "</sitemapindex>"
  ].join("\n");
  const rssXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"><channel>',
    "<title>Vista by Lara Knowledge</title>",
    `<link>${escapeXml(context.websiteBaseUrl)}</link>`,
    "<description>Dubai and UAE AI authority engineering resources.</description>",
    ...content.map(
      (item) => `<item><title>${escapeXml(item.title)}</title><link>${escapeXml(contentUrl(context.websiteBaseUrl, item))}</link><description>${escapeXml(item.aiSummary)}</description><guid>${escapeXml(item.id)}</guid></item>`
    ),
    "</channel></rss>"
  ].join("\n");
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${context.websiteBaseUrl}/sitemap.xml`,
    `Sitemap: ${context.websiteBaseUrl}/sitemap-index.xml`
  ].join("\n");
  const llmsTxt = [
    "# Vista by Lara",
    "",
    "Vista by Lara is a Dubai and UAE AI authority engineering source for GEO, AEO, SEO, and AI visibility systems.",
    "",
    "## Knowledge resources",
    ...content.map((item) => `- [${item.title}](${contentUrl(context.websiteBaseUrl, item)}): ${item.aiSummary}`)
  ].join("\n");
  const aiDiscoveryJson = JSON.stringify(
    {
      name: "Vista by Lara AI Discovery",
      url: context.websiteBaseUrl,
      generatedAt: context.generatedAt,
      resources: content.map((item) => ({
        id: item.id,
        title: item.title,
        url: contentUrl(context.websiteBaseUrl, item),
        entities: item.entities,
        summary: item.aiSummary,
        schemaType: item.schemaType
      }))
    },
    null,
    2
  );
  return { sitemapXml, sitemapIndexXml, rssXml, robotsTxt, llmsTxt, aiDiscoveryJson, urls };
}
__name(generateSearchResources, "generateSearchResources");
function validateSitemap(xml) {
  const errors = [];
  if (!xml.includes("<urlset")) errors.push("Sitemap must include a urlset root.");
  const urlCount = (xml.match(/<url>/gu) ?? []).length;
  if (urlCount === 0) errors.push("Sitemap must contain at least one URL.");
  if (!xml.includes("<loc>https://")) errors.push("Sitemap URLs must use HTTPS.");
  return { valid: errors.length === 0, urlCount, errors };
}
__name(validateSitemap, "validateSitemap");
function validateRobots(body) {
  const errors = [];
  if (!body.includes("User-agent: *")) errors.push("robots.txt must include a default user-agent.");
  if (!body.includes("Sitemap: https://")) errors.push("robots.txt must include an HTTPS sitemap URL.");
  return { valid: errors.length === 0, errors };
}
__name(validateRobots, "validateRobots");
function validateLlms(body) {
  const errors = [];
  if (!body.startsWith("# Vista by Lara")) errors.push("llms.txt must identify Vista by Lara.");
  if (!body.includes("## Knowledge resources")) errors.push("llms.txt must list knowledge resources.");
  return { valid: errors.length === 0, errors };
}
__name(validateLlms, "validateLlms");

// src/domains/external-search-indexing/service.ts
function normalizeUrls(urls) {
  return Array.from(new Set(urls.map((url) => url.trim()).filter(Boolean)));
}
__name(normalizeUrls, "normalizeUrls");
function ensureHttpsUrls(urls) {
  for (const url of urls) {
    if (!url.startsWith("https://")) {
      throw new AppError({
        status: 400,
        code: "validation_error",
        message: "Only HTTPS URLs can be submitted for indexing"
      });
    }
  }
}
__name(ensureHttpsUrls, "ensureHttpsUrls");
var ExternalSearchIndexingService = class {
  constructor(providers, content, jobs, results, searchConsoleImports, bingImports, sitemaps, robots, llms, websiteBaseUrl, searchConsoleSiteUrl, logger) {
    this.providers = providers;
    this.content = content;
    this.jobs = jobs;
    this.results = results;
    this.searchConsoleImports = searchConsoleImports;
    this.bingImports = bingImports;
    this.sitemaps = sitemaps;
    this.robots = robots;
    this.llms = llms;
    this.websiteBaseUrl = websiteBaseUrl;
    this.searchConsoleSiteUrl = searchConsoleSiteUrl;
    this.logger = logger;
  }
  providers;
  content;
  jobs;
  results;
  searchConsoleImports;
  bingImports;
  sitemaps;
  robots;
  llms;
  websiteBaseUrl;
  searchConsoleSiteUrl;
  logger;
  static {
    __name(this, "ExternalSearchIndexingService");
  }
  /** Submits one URL to a supported indexing provider. */
  async submit(url, provider, requestId) {
    const [job] = await this.submitBatch([url], provider, "single", requestId);
    if (!job) throw new Error("Indexing submission failed to create a job");
    return { job };
  }
  /** Submits URLs to a supported indexing provider with retry-aware job state. */
  async submitBatch(rawUrls, providerName, jobType, requestId) {
    const urls = normalizeUrls(rawUrls);
    if (urls.length === 0)
      throw new AppError({ status: 400, code: "validation_error", message: "At least one URL is required" });
    ensureHttpsUrls(urls);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const job = {
      id: crypto.randomUUID(),
      jobType,
      status: "running",
      urls,
      provider: providerName,
      attemptCount: 1,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    await this.jobs.create(job);
    try {
      const provider = this.providers.get(providerName);
      const providerResults = await this.submitWithRetry(providerName, provider.submitUrls.bind(provider), urls);
      await this.results.createMany(
        providerResults.map((result2) => ({
          id: crypto.randomUUID(),
          jobId: job.id,
          provider: providerName,
          url: result2.url,
          status: result2.accepted ? "accepted" : "rejected",
          statusCode: result2.statusCode,
          response: result2.response,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }))
      );
      const updated = {
        ...job,
        status: providerResults.every((result2) => result2.accepted) ? "succeeded" : "retry",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.jobs.update(updated);
      this.logger.info(
        "External indexing submission completed",
        { provider: providerName, urlCount: urls.length },
        requestId
      );
      return [updated];
    } catch (error) {
      const failed = { ...job, status: "failed", updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.jobs.update(failed);
      this.logger.error(
        "External indexing submission failed",
        { provider: providerName, message: error instanceof Error ? error.message : "Submission failed" },
        requestId
      );
      throw error;
    }
  }
  /** Gets indexing and resource status. */
  async status() {
    const [latestJob] = await this.jobs.list(1);
    return {
      latestJob: latestJob ?? null,
      latestSearchConsoleImport: await this.searchConsoleImports.latest(),
      latestBingImport: await this.bingImports.latest(),
      latestSitemap: await this.sitemaps.latest(),
      latestRobots: await this.robots.latest(),
      latestLlms: await this.llms.latest()
    };
  }
  /** Gets Google Search Console status or the latest import. */
  async searchConsoleStatus() {
    const siteUrl = this.searchConsoleSiteUrl ?? this.websiteBaseUrl;
    const latest = await this.searchConsoleImports.latest();
    try {
      const provider = this.providers.get("google-search-console");
      return await provider.getStatus(siteUrl);
    } catch (error) {
      return {
        configured: false,
        latest,
        message: error instanceof Error ? error.message : "Search Console status unavailable"
      };
    }
  }
  /** Gets Bing Webmaster status or the latest import. */
  async bingStatus() {
    const latest = await this.bingImports.latest();
    try {
      const provider = this.providers.get("bing-webmaster");
      return await provider.getStatus(this.websiteBaseUrl);
    } catch (error) {
      return { configured: false, latest, message: error instanceof Error ? error.message : "Bing status unavailable" };
    }
  }
  /** Generates, validates, versions, and submits sitemap resources where providers are configured. */
  async generateSitemap(requestId) {
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const validation = validateSitemap(resources.sitemapXml);
    if (!validation.valid)
      throw new AppError({ status: 422, code: "validation_error", message: validation.errors.join(" ") });
    const latest = await this.sitemaps.latest();
    const record = {
      id: crypto.randomUUID(),
      version: (latest?.version ?? 0) + 1,
      body: resources.sitemapXml,
      sitemapIndexXml: resources.sitemapIndexXml,
      urlCount: validation.urlCount,
      checksum: await checksum(resources.sitemapXml),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.sitemaps.create(record);
    await this.trySubmitSitemaps(`${this.websiteBaseUrl}/sitemap.xml`, requestId);
    return { sitemap: record, validation };
  }
  /** Generates and versions robots.txt. */
  async generateRobots() {
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const validation = validateRobots(resources.robotsTxt);
    if (!validation.valid)
      throw new AppError({ status: 422, code: "validation_error", message: validation.errors.join(" ") });
    const latest = await this.robots.latest();
    const record = {
      id: crypto.randomUUID(),
      version: (latest?.version ?? 0) + 1,
      body: resources.robotsTxt,
      checksum: await checksum(resources.robotsTxt),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.robots.create(record);
    return { robots: record, validation };
  }
  /** Generates and versions llms.txt and AI discovery resources. */
  async generateLlms() {
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const validation = validateLlms(resources.llmsTxt);
    if (!validation.valid)
      throw new AppError({ status: 422, code: "validation_error", message: validation.errors.join(" ") });
    const latest = await this.llms.latest();
    const record = {
      id: crypto.randomUUID(),
      version: (latest?.version ?? 0) + 1,
      body: `${resources.llmsTxt}

## AI discovery endpoint
${resources.aiDiscoveryJson}`,
      checksum: await checksum(resources.llmsTxt),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.llms.create(record);
    return { llms: record, aiDiscovery: resources.aiDiscoveryJson, validation };
  }
  /** Runs scheduled refresh and provider sync tasks. */
  async runScheduled(requestId) {
    const sitemap = await this.generateSitemap(requestId);
    await this.generateRobots();
    await this.generateLlms();
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    await this.submitBatch(resources.urls, "indexnow", "scheduled", requestId);
    await this.importSearchConsole();
    await this.importBing();
    this.logger.info(
      "External search indexing scheduled refresh completed",
      { sitemapVersion: sitemap.sitemap.version },
      requestId
    );
  }
  /** Imports Google Search Console analytics and crawl status. */
  async importSearchConsole() {
    const provider = this.providers.get("google-search-console");
    await this.searchConsoleImports.create(
      await provider.importAnalytics(this.searchConsoleSiteUrl ?? this.websiteBaseUrl)
    );
  }
  /** Imports Bing Webmaster Tools search performance. */
  async importBing() {
    const provider = this.providers.get("bing-webmaster");
    await this.bingImports.create(await provider.importPerformance(this.websiteBaseUrl));
  }
  async submitWithRetry(providerName, submit, urls) {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await submit(urls);
      } catch (error) {
        lastError = error;
        this.logger.warn("External indexing provider retry scheduled", { provider: providerName, attempt });
        await new Promise((resolve) => setTimeout(resolve, attempt * 25));
      }
    }
    throw lastError instanceof Error ? lastError : new Error("Indexing provider failed");
  }
  async trySubmitSitemaps(sitemapUrl, requestId) {
    for (const provider of this.providers.list()) {
      if (provider.name === "google-search-console") {
        try {
          await provider.submitSitemap(
            this.searchConsoleSiteUrl ?? this.websiteBaseUrl,
            sitemapUrl
          );
        } catch (error) {
          this.logger.warn(
            "Search Console sitemap submission skipped",
            { message: error instanceof Error ? error.message : "Unavailable" },
            requestId
          );
        }
      }
      if (provider.name === "bing-webmaster") {
        try {
          await provider.submitSitemap(this.websiteBaseUrl, sitemapUrl);
        } catch (error) {
          this.logger.warn(
            "Bing sitemap submission skipped",
            { message: error instanceof Error ? error.message : "Unavailable" },
            requestId
          );
        }
      }
    }
  }
};

// src/domains/external-search-indexing/api.ts
function createExternalSearchIndexingService(container) {
  return new ExternalSearchIndexingService(
    createExternalSearchProviderRegistry({
      googleSearchConsoleEndpoint: container.config.googleSearchConsoleEndpoint,
      googleSearchConsoleAccessToken: container.config.googleSearchConsoleAccessToken,
      bingWebmasterEndpoint: container.config.bingWebmasterEndpoint,
      bingWebmasterApiKey: container.config.bingWebmasterApiKey,
      indexNowEndpoint: container.config.indexNowEndpoint,
      indexNowKey: container.config.indexNowKey,
      indexNowKeyLocation: container.config.indexNowKeyLocation
    }),
    new ContentRepository(container.db),
    new IndexingJobRepository(container.db),
    new IndexingResultRepository(container.db),
    new SearchConsoleImportRepository(container.db),
    new BingImportRepository(container.db),
    new SitemapVersionRepository(container.db),
    new RobotsVersionRepository(container.db),
    new LlmsVersionRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.config.googleSearchConsoleSiteUrl,
    container.logger
  );
}
__name(createExternalSearchIndexingService, "createExternalSearchIndexingService");
async function readJson3(request) {
  try {
    return await request.json();
  } catch {
    throw new AppError({ status: 400, code: "invalid_json", message: "Request body must be valid JSON" });
  }
}
__name(readJson3, "readJson");
function readProvider(value) {
  if (value === "google-search-console" || value === "bing-webmaster" || value === "indexnow") return value;
  return "indexnow";
}
__name(readProvider, "readProvider");
async function routeExternalSearchIndexingRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createExternalSearchIndexingService(container);
  if (request.method === "POST" && url.pathname === "/index/submit") {
    const body = await readJson3(request);
    const targetUrl = typeof body.url === "string" ? body.url : "";
    return successResponse(
      { result: await service.submit(targetUrl, readProvider(body.provider), context.requestId) },
      context.requestId,
      201
    );
  }
  if (request.method === "POST" && url.pathname === "/index/batch") {
    const body = await readJson3(request);
    const urls = Array.isArray(body.urls) ? body.urls.filter((item) => typeof item === "string") : [];
    return successResponse(
      { jobs: await service.submitBatch(urls, readProvider(body.provider), "batch", context.requestId) },
      context.requestId,
      201
    );
  }
  if (request.method === "GET" && url.pathname === "/index/status") {
    return successResponse(await service.status(), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/search-console/status") {
    return successResponse(await service.searchConsoleStatus(), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/bing/status") {
    return successResponse(await service.bingStatus(), context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/sitemap/generate") {
    return successResponse({ result: await service.generateSitemap(context.requestId) }, context.requestId, 201);
  }
  if (request.method === "POST" && url.pathname === "/robots/generate") {
    return successResponse({ result: await service.generateRobots() }, context.requestId, 201);
  }
  if (request.method === "POST" && url.pathname === "/llms/generate") {
    return successResponse({ result: await service.generateLlms() }, context.requestId, 201);
  }
  return null;
}
__name(routeExternalSearchIndexingRequest, "routeExternalSearchIndexingRequest");

// src/domains/publisher/transform.ts
async function checksum2(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(checksum2, "checksum");
function canonicalUrl(baseUrl, content) {
  return content.canonicalUrl ?? `${baseUrl.replace(/\/$/u, "")}/knowledge/${content.slug}`;
}
__name(canonicalUrl, "canonicalUrl");
function toCanonicalHtml(content, canonical) {
  const paragraphs = content.body.split(/\n{2,}/u).map((block) => block.trim()).filter(Boolean).map((block) => {
    if (block.startsWith("# ")) return `<h1>${escapeHtml(block.slice(2))}</h1>`;
    if (block.startsWith("## ")) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
    return `<p>${escapeHtml(block)}</p>`;
  }).join("");
  return `<article data-canonical="${escapeHtml(canonical)}">${paragraphs}<link rel="canonical" href="${escapeHtml(canonical)}"></article>`;
}
__name(toCanonicalHtml, "toCanonicalHtml");
function toMarkdown(content, canonical, publisher) {
  return `# ${content.title}

Canonical source: [Vista by Lara](${canonical})

Publisher adaptation: ${publisher}.

${content.body}`;
}
__name(toMarkdown, "toMarkdown");
function toPlainText(content, canonical, publisher) {
  return `${content.title}

Canonical source: Vista by Lara ${canonical}
Publisher adaptation: ${publisher}.

${content.body.replace(/#+\s*/gu, "")}`;
}
__name(toPlainText, "toPlainText");
function toRss(content, canonical) {
  return `<item><title>${escapeHtml(content.title)}</title><link>${escapeHtml(canonical)}</link><guid>${escapeHtml(canonical)}</guid><description>${escapeHtml(content.aiSummary)}</description></item>`;
}
__name(toRss, "toRss");
function toJson(content, canonical) {
  return JSON.stringify({ ...content, canonicalUrl: canonical, source: "Vista by Lara" });
}
__name(toJson, "toJson");
function buildPublishPackage(content, baseUrl) {
  const canonical = canonicalUrl(baseUrl, content);
  return {
    content,
    canonicalUrl: canonical,
    canonicalHtml: toCanonicalHtml(content, canonical),
    markdown: toMarkdown(content, canonical, "base"),
    plainText: toPlainText(content, canonical, "base"),
    rss: toRss(content, canonical),
    json: toJson(content, canonical)
  };
}
__name(buildPublishPackage, "buildPublishPackage");
function validatePublishPackage(pkg) {
  const errors = [];
  if (!pkg.canonicalUrl.startsWith("https://")) errors.push("Canonical URL must be HTTPS");
  if (pkg.content.seoMetadata.title.length === 0 || pkg.content.seoMetadata.description.length === 0)
    errors.push("SEO metadata is required");
  if (pkg.content.internalLinks.length === 0) errors.push("At least one internal link is required");
  if (pkg.content.schemaType.length === 0) errors.push("Schema type is required");
  if (pkg.content.entities.length === 0) errors.push("Entities are required");
  if (!pkg.canonicalHtml.includes('rel="canonical"')) errors.push("Canonical link is required");
  if (errors.length > 0) {
    throw new AppError({
      status: 422,
      code: "publish_quality_failed",
      message: "Content failed publish validation",
      details: { errors }
    });
  }
}
__name(validatePublishPackage, "validatePublishPackage");
function escapeHtml(value) {
  return value.replace(/&/gu, "&amp;").replace(/</gu, "&lt;").replace(/>/gu, "&gt;").replace(/"/gu, "&quot;");
}
__name(escapeHtml, "escapeHtml");

// src/domains/publisher/providers.ts
async function withPublishTimeout(promise, timeoutMs) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new AppError({ status: 504, code: "publisher_timeout", message: "Publisher timed out" }));
    }, timeoutMs);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
__name(withPublishTimeout, "withPublishTimeout");
var ArtifactPublisher = class {
  constructor(endpoint = null, fetcher = fetch) {
    this.endpoint = endpoint;
    this.fetcher = fetcher;
  }
  endpoint;
  fetcher;
  static {
    __name(this, "ArtifactPublisher");
  }
  /**
   * Publishes or generates artifacts for one target.
   */
  async publish(input) {
    const started = Date.now();
    const artifact = await this.artifact(input.package);
    if (this.endpoint) {
      const response = await withPublishTimeout(
        this.fetcher(this.endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            publisher: this.name,
            canonicalUrl: input.package.canonicalUrl,
            artifact: artifact.body
          })
        }),
        input.timeoutMs
      );
      if (!response.ok)
        throw new AppError({
          status: 502,
          code: "publisher_error",
          message: `${this.name} returned ${String(response.status)}`
        });
    }
    return this.result(input.package, input.attemptCount, Date.now() - started, artifact);
  }
  /**
   * Tests publisher availability.
   */
  async test(timeoutMs) {
    const started = Date.now();
    try {
      if (this.endpoint) {
        await withPublishTimeout(this.fetcher(this.endpoint, { method: "OPTIONS" }), timeoutMs);
      }
      return { ok: true, latencyMs: Date.now() - started, errorMessage: null };
    } catch (error) {
      return {
        ok: false,
        latencyMs: Date.now() - started,
        errorMessage: error instanceof Error ? error.message : "Publisher check failed"
      };
    }
  }
  async result(pkg, attemptCount, latencyMs, artifact) {
    const id = `${this.name}:${await checksum2(`${pkg.canonicalUrl}:${artifact.checksum}`)}`;
    const externalUrl = this.name === "website" ? pkg.canonicalUrl : `${pkg.canonicalUrl}?publisher=${encodeURIComponent(this.name)}`;
    return {
      publisher: this.name,
      publishedUrl: externalUrl,
      canonicalUrl: pkg.canonicalUrl,
      platformId: id,
      publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
      checksum: artifact.checksum,
      responseMetadata: { artifactOnly: !this.endpoint, format: artifact.format },
      publishingMetadata: {
        publisher: this.name,
        version: pkg.content.currentVersion,
        attemptCount,
        latencyMs,
        status: this.endpoint ? "succeeded" : "artifact-generated"
      },
      artifacts: [artifact]
    };
  }
};
var WebsitePublisher = class extends ArtifactPublisher {
  static {
    __name(this, "WebsitePublisher");
  }
  name = "website";
  async artifact(pkg) {
    const body = pkg.canonicalHtml;
    return { publisher: this.name, format: "canonical-html", body, checksum: await checksum2(body) };
  }
};
var RssPublisher = class extends ArtifactPublisher {
  static {
    __name(this, "RssPublisher");
  }
  name = "rss";
  async artifact(pkg) {
    const body = toRss(pkg.content, pkg.canonicalUrl);
    return { publisher: this.name, format: "rss", body, checksum: await checksum2(body) };
  }
};
var GitHubKnowledgePublisher = class extends ArtifactPublisher {
  static {
    __name(this, "GitHubKnowledgePublisher");
  }
  name = "github-knowledge-repository";
  async artifact(pkg) {
    const body = toMarkdown(pkg.content, pkg.canonicalUrl, "GitHub Knowledge Repository");
    return { publisher: this.name, format: "markdown", body, checksum: await checksum2(body) };
  }
};
var BloggerPublisher = class extends ArtifactPublisher {
  static {
    __name(this, "BloggerPublisher");
  }
  name = "blogger";
  async artifact(pkg) {
    const body = `${pkg.canonicalHtml}<p>Originally published by Vista by Lara: <a href="${pkg.canonicalUrl}">${pkg.canonicalUrl}</a></p>`;
    return { publisher: this.name, format: "platform", body, checksum: await checksum2(body) };
  }
};
var MediumPublisher = class extends ArtifactPublisher {
  static {
    __name(this, "MediumPublisher");
  }
  name = "medium";
  async artifact(pkg) {
    const body = toMarkdown(pkg.content, pkg.canonicalUrl, "Medium").replace(
      pkg.content.body,
      `${pkg.content.aiSummary}

${pkg.content.body}`
    );
    return { publisher: this.name, format: "markdown", body, checksum: await checksum2(body) };
  }
};
var VistaNewsWirePublisher = class extends ArtifactPublisher {
  static {
    __name(this, "VistaNewsWirePublisher");
  }
  name = "vistanewswire";
  async artifact(pkg) {
    const body = `VistaNewsWire

${toPlainText(pkg.content, pkg.canonicalUrl, "VistaNewsWire")}`;
    return { publisher: this.name, format: "plain-text", body, checksum: await checksum2(body) };
  }
};
var JsonExportPublisher = class extends ArtifactPublisher {
  static {
    __name(this, "JsonExportPublisher");
  }
  name = "json-export";
  async artifact(pkg) {
    const body = toJson(pkg.content, pkg.canonicalUrl);
    return { publisher: this.name, format: "json", body, checksum: await checksum2(body) };
  }
};
var MarkdownExportPublisher = class extends ArtifactPublisher {
  static {
    __name(this, "MarkdownExportPublisher");
  }
  name = "markdown-export";
  async artifact(pkg) {
    const body = toMarkdown(pkg.content, pkg.canonicalUrl, "Markdown Export");
    return { publisher: this.name, format: "markdown", body, checksum: await checksum2(body) };
  }
};
var PublisherRegistry = class {
  static {
    __name(this, "PublisherRegistry");
  }
  providers = /* @__PURE__ */ new Map();
  /**
   * Registers one publisher provider.
   */
  register(provider) {
    this.providers.set(provider.name, provider);
  }
  /**
   * Resolves one publisher provider.
   */
  resolve(name) {
    const provider = this.providers.get(name);
    if (!provider)
      throw new AppError({ status: 500, code: "publisher_missing", message: `${name} publisher is not registered` });
    return provider;
  }
  /**
   * Lists publisher identifiers.
   */
  list() {
    return Array.from(this.providers.keys());
  }
};
function createPublisherRegistry() {
  const registry = new PublisherRegistry();
  registry.register(new WebsitePublisher());
  registry.register(new RssPublisher());
  registry.register(new GitHubKnowledgePublisher());
  registry.register(new BloggerPublisher());
  registry.register(new MediumPublisher());
  registry.register(new VistaNewsWirePublisher());
  registry.register(new JsonExportPublisher());
  registry.register(new MarkdownExportPublisher());
  return registry;
}
__name(createPublisherRegistry, "createPublisherRegistry");

// src/domains/publisher/repositories.ts
function mapPublishJobRow(row) {
  return {
    id: row.id,
    contentId: row.content_id,
    status: row.status,
    targets: JSON.parse(row.targets_json),
    canonicalUrl: row.canonical_url,
    attemptCount: row.attempt_count,
    maxRetries: row.max_retries,
    errorMessage: row.error_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    startedAt: row.started_at,
    completedAt: row.completed_at
  };
}
__name(mapPublishJobRow, "mapPublishJobRow");
var PublishJobRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PublishJobRepository");
  }
  /**
   * Creates a publish job.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into publish_jobs (id, content_id, status, targets_json, canonical_url, attempt_count, max_retries, error_message, created_at, updated_at, started_at, completed_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.contentId,
      record.status,
      JSON.stringify(record.targets),
      record.canonicalUrl,
      record.attemptCount,
      record.maxRetries,
      record.errorMessage,
      record.createdAt,
      record.updatedAt,
      record.startedAt,
      record.completedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publish job create failed");
  }
  /**
   * Updates a publish job.
   */
  async update(record) {
    const result2 = await this.db.prepare(
      "update publish_jobs set status = ?, targets_json = ?, attempt_count = ?, error_message = ?, updated_at = ?, started_at = ?, completed_at = ? where id = ?"
    ).bind(
      record.status,
      JSON.stringify(record.targets),
      record.attemptCount,
      record.errorMessage,
      record.updatedAt,
      record.startedAt,
      record.completedAt,
      record.id
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publish job update failed");
  }
  /**
   * Finds one publish job.
   */
  async findById(id) {
    const row = await this.db.prepare("select * from publish_jobs where id = ?").bind(id).first();
    return row ? mapPublishJobRow(row) : null;
  }
  /**
   * Lists publish jobs.
   */
  async list(limit) {
    const result2 = await this.db.prepare("select * from publish_jobs order by created_at desc limit ?").bind(limit).all();
    return result2.results.map(mapPublishJobRow);
  }
};
var PublishTargetRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PublishTargetRepository");
  }
  /**
   * Upserts a target.
   */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into publish_targets (id, name, enabled, endpoint, config_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?) on conflict(name) do update set enabled = excluded.enabled, endpoint = excluded.endpoint, config_json = excluded.config_json, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.name,
      record.enabled ? 1 : 0,
      record.endpoint,
      JSON.stringify(record.config),
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publish target upsert failed");
  }
};
var PublishHistoryRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PublishHistoryRepository");
  }
  /**
   * Creates a history record.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into publish_history (id, job_id, content_id, publisher, version, status, published_url, canonical_url, platform_id, published_at, checksum, response_metadata_json, publishing_metadata_json, latency_ms, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.jobId,
      record.contentId,
      record.publisher,
      record.version,
      record.status,
      record.publishedUrl,
      record.canonicalUrl,
      record.platformId,
      record.publishedAt,
      record.checksum,
      JSON.stringify(record.responseMetadata),
      JSON.stringify(record.publishingMetadata),
      record.latencyMs,
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publish history create failed");
  }
};
var PublishFailureRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PublishFailureRepository");
  }
  /**
   * Creates a failure record.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into publish_failures (id, job_id, content_id, publisher, attempt, error_code, error_message, retry_at, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.jobId,
      record.contentId,
      record.publisher,
      record.attempt,
      record.errorCode,
      record.errorMessage,
      record.retryAt,
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publish failure create failed");
  }
};
var PublishArtifactRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "PublishArtifactRepository");
  }
  /**
   * Creates a publish artifact.
   */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into publish_artifacts (id, job_id, content_id, publisher, format, artifact_body, checksum, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.jobId,
      record.contentId,
      record.publisher,
      record.format,
      record.body,
      record.checksum,
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Publish artifact create failed");
  }
  /**
   * Lists artifacts for a job.
   */
  async listForJob(jobId) {
    const result2 = await this.db.prepare("select * from publish_artifacts where job_id = ?").bind(jobId).all();
    return result2.results.map((row) => ({
      id: row.id,
      jobId: row.job_id,
      contentId: row.content_id,
      publisher: row.publisher,
      format: row.format,
      body: row.artifact_body,
      checksum: row.checksum,
      createdAt: row.created_at
    }));
  }
};

// src/domains/publisher/service.ts
var publishableStatuses = /* @__PURE__ */ new Set(["APPROVED_FOR_PUBLISHING", "PUBLISHED", "UPDATED"]);
var PublisherService = class {
  constructor(registry, content, jobs, targets, history, failures, artifacts, websiteBaseUrl, defaultTargets, timeoutMs, logger) {
    this.registry = registry;
    this.content = content;
    this.jobs = jobs;
    this.targets = targets;
    this.history = history;
    this.failures = failures;
    this.artifacts = artifacts;
    this.websiteBaseUrl = websiteBaseUrl;
    this.defaultTargets = defaultTargets;
    this.timeoutMs = timeoutMs;
    this.logger = logger;
  }
  registry;
  content;
  jobs;
  targets;
  history;
  failures;
  artifacts;
  websiteBaseUrl;
  defaultTargets;
  timeoutMs;
  logger;
  static {
    __name(this, "PublisherService");
  }
  /**
   * Creates and optionally executes a publish job.
   */
  async createJob(contentId, targets, asyncJob, requestId) {
    const content = await this.getPublishableContent(contentId);
    const pkg = buildPublishPackage(content, this.websiteBaseUrl);
    validatePublishPackage(pkg);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const selectedTargets = this.normalizeTargets(targets ?? this.defaultTargets);
    const job = {
      id: crypto.randomUUID(),
      contentId,
      status: "pending",
      targets: selectedTargets,
      canonicalUrl: pkg.canonicalUrl,
      attemptCount: 0,
      maxRetries: 3,
      errorMessage: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      startedAt: null,
      completedAt: null
    };
    await this.jobs.create(job);
    await this.ensureTargets(selectedTargets, timestamp);
    this.logger.info("Publish job created", { jobId: job.id, contentId, targets: selectedTargets }, requestId);
    return asyncJob ? job : this.processJob(job.id, requestId);
  }
  /**
   * Processes a publish job.
   */
  async processJob(jobId, requestId) {
    const job = await this.getJob(jobId);
    if (job.status === "cancelled" || job.status === "succeeded") return job;
    const content = await this.getPublishableContent(job.contentId);
    const pkg = buildPublishPackage(content, this.websiteBaseUrl);
    validatePublishPackage(pkg);
    const running = {
      ...job,
      status: "running",
      attemptCount: job.attemptCount + 1,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.jobs.update(running);
    try {
      const results = [];
      for (const target of running.targets) {
        const result2 = await this.registry.resolve(target).publish({ package: pkg, attemptCount: running.attemptCount, timeoutMs: this.timeoutMs });
        await this.persistResult(running, content, result2);
        results.push(result2);
      }
      const completed = {
        ...running,
        status: "succeeded",
        errorMessage: null,
        completedAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.jobs.update(completed);
      this.logger.info("Publish job succeeded", { jobId, resultCount: results.length }, requestId);
      return completed;
    } catch (error) {
      const message2 = error instanceof Error ? error.message : "Publish job failed";
      const retryAt = new Date(Date.now() + Math.min(6e4 * running.attemptCount, 3e5)).toISOString();
      await this.failures.create({
        id: crypto.randomUUID(),
        jobId,
        contentId: running.contentId,
        publisher: running.targets[0] ?? "website",
        attempt: running.attemptCount,
        errorCode: error instanceof AppError ? error.code : "publisher_error",
        errorMessage: message2,
        retryAt: running.attemptCount < running.maxRetries ? retryAt : null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const failed = {
        ...running,
        status: running.attemptCount < running.maxRetries ? "retry" : "failed",
        errorMessage: message2,
        completedAt: running.attemptCount < running.maxRetries ? null : (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.jobs.update(failed);
      this.logger.error("Publish job failed", { jobId, attempt: running.attemptCount, message: message2 }, requestId);
      if (failed.status === "retry") return failed;
      throw error;
    }
  }
  /**
   * Retries an existing publish job for the supplied content.
   */
  async retryContent(contentId, requestId) {
    const jobs = await this.jobs.list(100);
    const job = jobs.find(
      (item) => item.contentId === contentId && (item.status === "failed" || item.status === "retry")
    );
    if (!job)
      throw new AppError({ status: 404, code: "publish_job_not_found", message: "No retryable publish job was found" });
    return this.processJob(job.id, requestId);
  }
  /**
   * Cancels a publish job.
   */
  async cancelJob(jobId, requestId) {
    const job = await this.getJob(jobId);
    if (job.status === "succeeded")
      throw new AppError({ status: 409, code: "publish_job_succeeded", message: "Succeeded jobs cannot be cancelled" });
    const cancelled = {
      ...job,
      status: "cancelled",
      completedAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.jobs.update(cancelled);
    this.logger.info("Publish job cancelled", { jobId }, requestId);
    return cancelled;
  }
  /**
   * Lists publish jobs.
   */
  async listJobs(limit) {
    return this.jobs.list(limit);
  }
  /**
   * Gets a publish job.
   */
  async getJob(id) {
    const job = await this.jobs.findById(id);
    if (!job) throw new AppError({ status: 404, code: "publish_job_not_found", message: "Publish job was not found" });
    return job;
  }
  /**
   * Lists available publishers.
   */
  listProviders() {
    return { providers: this.registry.list(), defaultTargets: this.defaultTargets };
  }
  /**
   * Tests every publisher provider.
   */
  async testProviders() {
    const results = [];
    for (const publisher of this.registry.list()) {
      const result2 = await this.registry.resolve(publisher).test(this.timeoutMs);
      results.push({ publisher, ...result2 });
    }
    return results;
  }
  async getPublishableContent(id) {
    const content = await this.content.findById(id);
    if (!content) throw new AppError({ status: 404, code: "content_not_found", message: "Content was not found" });
    if (!publishableStatuses.has(content.status)) {
      throw new AppError({
        status: 409,
        code: "content_not_publishable",
        message: "Content must be approved for publishing before publication"
      });
    }
    return content;
  }
  normalizeTargets(targets) {
    const selected = Array.from(/* @__PURE__ */ new Set(["website", ...targets]));
    for (const target of selected) this.registry.resolve(target);
    return selected;
  }
  async ensureTargets(targets, timestamp) {
    for (const target of targets) {
      await this.targets.upsert({
        id: crypto.randomUUID(),
        name: target,
        enabled: true,
        endpoint: null,
        config: {},
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }
  }
  async persistResult(job, content, result2) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    await this.history.create({
      id: crypto.randomUUID(),
      jobId: job.id,
      contentId: job.contentId,
      publisher: result2.publisher,
      version: content.currentVersion,
      status: "succeeded",
      publishedUrl: result2.publishedUrl,
      canonicalUrl: result2.canonicalUrl,
      platformId: result2.platformId,
      publishedAt: result2.publishedAt,
      checksum: result2.checksum,
      responseMetadata: result2.responseMetadata,
      publishingMetadata: result2.publishingMetadata,
      latencyMs: result2.publishingMetadata.latencyMs,
      createdAt: timestamp
    });
    for (const artifact of result2.artifacts) {
      await this.artifacts.create({
        id: crypto.randomUUID(),
        jobId: job.id,
        contentId: job.contentId,
        publisher: artifact.publisher,
        format: artifact.format,
        body: artifact.body,
        checksum: artifact.checksum,
        createdAt: timestamp
      });
    }
  }
};

// src/domains/publisher/api.ts
var publisherNames = [
  "website",
  "rss",
  "github-knowledge-repository",
  "blogger",
  "medium",
  "vistanewswire",
  "json-export",
  "markdown-export"
];
function createPublisherService(container) {
  return new PublisherService(
    createPublisherRegistry(),
    new ContentRepository(container.db),
    new PublishJobRepository(container.db),
    new PublishTargetRepository(container.db),
    new PublishHistoryRepository(container.db),
    new PublishFailureRepository(container.db),
    new PublishArtifactRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.config.publisherDefaultTargets.filter(
      (target) => publisherNames.includes(target)
    ),
    container.config.publisherTimeoutMs,
    container.logger
  );
}
__name(createPublisherService, "createPublisherService");
function readPublishRequest(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return { targets: null, async: false };
  const body = value;
  const targets = Array.isArray(body.targets) ? body.targets.map((target) => String(target)).filter((target) => publisherNames.includes(target)) : null;
  return { targets, async: body.async === true };
}
__name(readPublishRequest, "readPublishRequest");
function readLimit2(url) {
  const raw = url.searchParams.get("limit");
  if (!raw) return 50;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 1 || value > 100) {
    throw new AppError({ status: 400, code: "invalid_query", message: "limit must be between 1 and 100" });
  }
  return value;
}
__name(readLimit2, "readLimit");
async function routePublisherRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createPublisherService(container);
  if (request.method === "POST" && url.pathname === "/publish") {
    const body = await readJson(request);
    const contentId = typeof body.contentId === "string" ? body.contentId : "";
    if (!contentId) throw new AppError({ status: 400, code: "validation_error", message: "contentId is required" });
    const input = readPublishRequest(body);
    const job = await service.createJob(contentId, input.targets, input.async, context.requestId);
    if (input.async) await container.queue.send({ id: job.id, type: "publisher.run", payload: { jobId: job.id } });
    return successResponse({ job }, context.requestId, input.async ? 202 : 201);
  }
  const publishMatch = /^\/publish\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "POST" && publishMatch?.[1]) {
    const input = readPublishRequest(await readJson(request));
    const job = await service.createJob(publishMatch[1], input.targets, input.async, context.requestId);
    if (input.async) await container.queue.send({ id: job.id, type: "publisher.run", payload: { jobId: job.id } });
    return successResponse({ job }, context.requestId, input.async ? 202 : 201);
  }
  const retryMatch = /^\/publish\/([^/]+)\/retry$/u.exec(url.pathname);
  if (request.method === "POST" && retryMatch?.[1]) {
    return successResponse({ job: await service.retryContent(retryMatch[1], context.requestId) }, context.requestId);
  }
  const cancelMatch = /^\/publish\/jobs\/([^/]+)\/cancel$/u.exec(url.pathname);
  if (request.method === "POST" && cancelMatch?.[1]) {
    return successResponse({ job: await service.cancelJob(cancelMatch[1], context.requestId) }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/publish/jobs") {
    return successResponse({ jobs: await service.listJobs(readLimit2(url)) }, context.requestId);
  }
  const jobMatch = /^\/publish\/jobs\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && jobMatch?.[1]) {
    return successResponse({ job: await service.getJob(jobMatch[1]) }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/publish/providers") {
    return successResponse(service.listProviders(), context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/publish/providers/test") {
    return successResponse({ providers: await service.testProviders() }, context.requestId);
  }
  return null;
}
__name(routePublisherRequest, "routePublisherRequest");

// src/domains/public-buying-signals/providers.ts
function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}
__name(slug, "slug");
function textBetween(value, tag2) {
  const match = new RegExp(`<${tag2}[^>]*>([\\s\\S]*?)<\\/${tag2}>`, "iu").exec(value);
  return match?.[1]?.replace(/<!\[CDATA\[|\]\]>/gu, "").trim() ?? null;
}
__name(textBetween, "textBetween");
function parseFeedConfig(raw) {
  if (!raw) return [];
  return raw.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [name, category, endpoint] = line.split("|").map((part) => part.trim());
    if (!name || !category || !endpoint)
      throw new Error("PUBLIC_BUYING_SIGNAL_FEEDS entries must use name|category|endpoint");
    return { name, category, endpoint };
  });
}
__name(parseFeedConfig, "parseFeedConfig");
function sourceFromConfig(config) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id: slug(`${config.category}-${config.name}`),
    name: config.name,
    category: config.category,
    endpoint: config.endpoint,
    enabled: true,
    metadata: { publicOnly: true },
    createdAt: timestamp,
    updatedAt: timestamp
  };
}
__name(sourceFromConfig, "sourceFromConfig");
function candidateFromJson(source, item) {
  const title = typeof item.title === "string" ? item.title : "Public business signal";
  const summary = typeof item.summary === "string" ? item.summary : typeof item.description === "string" ? item.description : title;
  return {
    source,
    organizationName: typeof item.organizationName === "string" ? item.organizationName : typeof item.company === "string" ? item.company : title.split(" ").slice(0, 3).join(" "),
    organizationWebsiteUrl: typeof item.organizationWebsiteUrl === "string" ? item.organizationWebsiteUrl : null,
    organizationIndustry: typeof item.industry === "string" ? item.industry : null,
    organizationLocation: typeof item.location === "string" ? item.location : null,
    companySize: typeof item.companySize === "string" ? item.companySize : null,
    technologies: Array.isArray(item.technologies) ? item.technologies.filter((value) => typeof value === "string") : [],
    title,
    summary,
    url: typeof item.url === "string" ? item.url : source.endpoint,
    publishedAt: typeof item.publishedAt === "string" ? item.publishedAt : (/* @__PURE__ */ new Date()).toISOString(),
    raw: item
  };
}
__name(candidateFromJson, "candidateFromJson");
function candidatesFromRss(source, body) {
  const items = body.match(/<item[\s\S]*?<\/item>/giu) ?? body.match(/<entry[\s\S]*?<\/entry>/giu) ?? [];
  return items.map((item) => {
    const title = textBetween(item, "title") ?? "Public business signal";
    const summary = textBetween(item, "description") ?? textBetween(item, "summary") ?? title;
    const link = textBetween(item, "link") ?? source.endpoint;
    const publishedAt = textBetween(item, "pubDate") ?? textBetween(item, "updated") ?? (/* @__PURE__ */ new Date()).toISOString();
    return {
      source,
      organizationName: title.split(/[|:-]/u)[0]?.trim() ?? title,
      organizationWebsiteUrl: null,
      organizationIndustry: null,
      organizationLocation: summary,
      companySize: null,
      technologies: [],
      title,
      summary,
      url: link,
      publishedAt,
      raw: { title, summary, link, publishedAt }
    };
  });
}
__name(candidatesFromRss, "candidatesFromRss");
var ConfiguredPublicFeedProvider = class {
  constructor(config, fetcher = fetch) {
    this.fetcher = fetcher;
    this.name = config.name;
    this.category = config.category;
    this.source = sourceFromConfig(config);
  }
  fetcher;
  static {
    __name(this, "ConfiguredPublicFeedProvider");
  }
  name;
  category;
  source;
  /** Discovers public buying signals from configured JSON or RSS resources. */
  async discover(request) {
    const response = await this.fetcher(this.source.endpoint, {
      headers: { accept: "application/json, application/rss+xml, application/xml, text/xml" }
    });
    if (!response.ok) throw new Error(`Public signal feed ${this.name} returned ${String(response.status)}`);
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.text();
    const candidates = contentType.includes("json") ? JSON.parse(body).map((item) => candidateFromJson(this.source, item)) : candidatesFromRss(this.source, body);
    const sinceTime = request.since ? new Date(request.since).getTime() : 0;
    return candidates.filter((candidate) => new Date(candidate.publishedAt).getTime() >= sinceTime).slice(0, request.limit);
  }
};
var BuyingSignalProviderRegistry = class {
  static {
    __name(this, "BuyingSignalProviderRegistry");
  }
  providers = /* @__PURE__ */ new Map();
  /** Registers a provider. */
  register(provider) {
    this.providers.set(provider.name, provider);
  }
  /** Lists providers. */
  list() {
    return Array.from(this.providers.values());
  }
};
function createBuyingSignalProviderRegistry(rawConfig) {
  const registry = new BuyingSignalProviderRegistry();
  for (const config of parseFeedConfig(rawConfig)) registry.register(new ConfiguredPublicFeedProvider(config));
  return registry;
}
__name(createBuyingSignalProviderRegistry, "createBuyingSignalProviderRegistry");

// src/domains/public-buying-signals/repositories.ts
var SignalSourceRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "SignalSourceRepository");
  }
  /** Upserts public source configuration. */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into signal_sources (id, name, category, endpoint, enabled, metadata_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set name = excluded.name, category = excluded.category, endpoint = excluded.endpoint, enabled = excluded.enabled, metadata_json = excluded.metadata_json, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.name,
      record.category,
      record.endpoint,
      record.enabled ? 1 : 0,
      JSON.stringify(record.metadata),
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Signal source upsert failed");
  }
  /** Lists configured sources. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from signal_sources order by updated_at desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      endpoint: row.endpoint,
      enabled: row.enabled === 1,
      metadata: JSON.parse(row.metadata_json),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
};
var OrganizationRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "OrganizationRepository");
  }
  /** Upserts an organization. */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into organizations (id, name, website_url, industry, location, company_size, technologies_json, metadata_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set name = excluded.name, website_url = excluded.website_url, industry = excluded.industry, location = excluded.location, company_size = excluded.company_size, technologies_json = excluded.technologies_json, metadata_json = excluded.metadata_json, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.name,
      record.websiteUrl,
      record.industry,
      record.location,
      record.companySize,
      JSON.stringify(record.technologies),
      JSON.stringify(record.metadata),
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Organization upsert failed");
  }
  /** Finds one organization. */
  async findById(id) {
    const row = await this.db.prepare("select * from organizations where id = ?").bind(id).first();
    return row ? mapOrganization(row) : null;
  }
};
var BuyingSignalRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "BuyingSignalRepository");
  }
  /** Creates a buying signal. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into buying_signals (id, source_id, organization_id, event_type, title, summary, url, published_at, detected_at, location, technologies_json, confidence_score, raw_json) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.sourceId,
      record.organizationId,
      record.eventType,
      record.title,
      record.summary,
      record.url,
      record.publishedAt,
      record.detectedAt,
      record.location,
      JSON.stringify(record.technologies),
      record.confidenceScore,
      JSON.stringify(record.raw)
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Buying signal create failed");
  }
  /** Lists signals. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from buying_signals order by detected_at desc limit ?").bind(limit).all();
    return result2.results.map(mapSignal);
  }
  /** Finds one signal. */
  async findById(id) {
    const row = await this.db.prepare("select * from buying_signals where id = ?").bind(id).first();
    return row ? mapSignal(row) : null;
  }
  /** Counts signals for an organization. */
  async countForOrganization(organizationId) {
    const result2 = await this.db.prepare("select * from buying_signals where organization_id = ?").bind(organizationId).all();
    return result2.results.length;
  }
};
var OpportunityRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "OpportunityRepository");
  }
  /** Creates an opportunity. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into opportunities (id, organization_id, primary_signal_id, status, title, explanation, recommended_services_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.organizationId,
      record.primarySignalId,
      record.status,
      record.title,
      record.explanation,
      JSON.stringify(record.recommendedServices),
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Opportunity create failed");
  }
  /** Lists opportunities. */
  async list(limit) {
    const result2 = await this.db.prepare(
      "select opportunities.*, organizations.name as organization_name, opportunity_scores.score as score, signal_sources.name as source_name, buying_signals.event_type as signal_type from opportunities left join organizations on organizations.id = opportunities.organization_id left join buying_signals on buying_signals.id = opportunities.primary_signal_id left join signal_sources on signal_sources.id = buying_signals.source_id left join opportunity_scores on opportunity_scores.opportunity_id = opportunities.id order by opportunities.updated_at desc limit ?"
    ).bind(limit).all();
    return result2.results.map(mapOpportunity);
  }
  /** Finds one opportunity. */
  async findById(id) {
    const row = await this.db.prepare(
      "select opportunities.*, organizations.name as organization_name, opportunity_scores.score as score, signal_sources.name as source_name, buying_signals.event_type as signal_type from opportunities left join organizations on organizations.id = opportunities.organization_id left join buying_signals on buying_signals.id = opportunities.primary_signal_id left join signal_sources on signal_sources.id = buying_signals.source_id left join opportunity_scores on opportunity_scores.opportunity_id = opportunities.id where opportunities.id = ?"
    ).bind(id).first();
    return row ? mapOpportunity(row) : null;
  }
};
var OpportunityScoreRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "OpportunityScoreRepository");
  }
  /** Creates an opportunity score. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into opportunity_scores (id, opportunity_id, score, factors_json, explanation, created_at) values (?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.opportunityId,
      record.score,
      JSON.stringify(record.factors),
      record.explanation,
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Opportunity score create failed");
  }
};
var IngestionRunRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "IngestionRunRepository");
  }
  /** Creates an ingestion run. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into ingestion_runs (id, status, started_at, completed_at, source_count, signal_count, opportunity_count, error_message) values (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.status,
      record.startedAt,
      record.completedAt,
      record.sourceCount,
      record.signalCount,
      record.opportunityCount,
      record.errorMessage
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Ingestion run create failed");
  }
  /** Updates an ingestion run. */
  async update(record) {
    const result2 = await this.db.prepare(
      "update ingestion_runs set status = ?, completed_at = ?, signal_count = ?, opportunity_count = ?, error_message = ? where id = ?"
    ).bind(
      record.status,
      record.completedAt,
      record.signalCount,
      record.opportunityCount,
      record.errorMessage,
      record.id
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Ingestion run update failed");
  }
};
function mapOrganization(row) {
  return {
    id: row.id,
    name: row.name,
    websiteUrl: row.website_url,
    industry: row.industry,
    location: row.location,
    companySize: row.company_size,
    technologies: JSON.parse(row.technologies_json),
    metadata: JSON.parse(row.metadata_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
__name(mapOrganization, "mapOrganization");
function mapSignal(row) {
  return {
    id: row.id,
    sourceId: row.source_id,
    organizationId: row.organization_id,
    eventType: row.event_type,
    title: row.title,
    summary: row.summary,
    url: row.url,
    publishedAt: row.published_at,
    detectedAt: row.detected_at,
    location: row.location,
    technologies: JSON.parse(row.technologies_json),
    confidenceScore: row.confidence_score,
    raw: JSON.parse(row.raw_json)
  };
}
__name(mapSignal, "mapSignal");
function mapOpportunity(row) {
  const opportunity = {
    id: row.id,
    organizationId: row.organization_id,
    primarySignalId: row.primary_signal_id,
    status: row.status,
    title: row.title,
    explanation: row.explanation,
    recommendedServices: JSON.parse(row.recommended_services_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
  if (row.organization_name) opportunity.organizationName = row.organization_name;
  if (typeof row.score === "number") opportunity.score = row.score;
  if (row.source_name) opportunity.sourceName = row.source_name;
  if (row.signal_type) opportunity.signalType = row.signal_type;
  return opportunity;
}
__name(mapOpportunity, "mapOpportunity");

// src/domains/public-buying-signals/classification.ts
var eventRules = [
  { eventType: "shopify-adoption", terms: ["shopify", "shopify plus"] },
  { eventType: "ecommerce-launch", terms: ["e-commerce", "ecommerce", "online store", "digital commerce"] },
  { eventType: "new-website-launch", terms: ["new website", "website launch", "launched website"] },
  { eventType: "website-redesign", terms: ["redesign", "rebrand", "new digital experience", "ux redesign"] },
  {
    eventType: "ppc-hiring",
    terms: ["ppc specialist", "paid search", "google ads specialist", "performance marketing"]
  },
  { eventType: "seo-hiring", terms: ["seo specialist", "organic search", "technical seo"] },
  { eventType: "ai-hiring", terms: ["ai engineer", "automation specialist", "machine learning", "generative ai"] },
  { eventType: "marketing-hiring", terms: ["marketing manager", "digital marketing", "growth marketer"] },
  { eventType: "funding-event", terms: ["funding", "raised", "investment", "series a", "seed round"] },
  { eventType: "new-office-opening", terms: ["new office", "opens office", "regional headquarters"] },
  { eventType: "expansion-announcement", terms: ["expands", "expansion", "enters uae", "gcc expansion"] },
  { eventType: "product-launch", terms: ["product launch", "launches", "new platform", "new service"] }
];
function classifySignal(candidate) {
  const text = `${candidate.title} ${candidate.summary} ${candidate.technologies.join(" ")}`.toLowerCase();
  for (const rule of eventRules) {
    const matches2 = rule.terms.filter((term) => text.includes(term)).length;
    if (matches2 > 0) return { eventType: rule.eventType, confidenceScore: Math.min(1, 0.62 + matches2 * 0.12) };
  }
  return { eventType: "product-launch", confidenceScore: 0.5 };
}
__name(classifySignal, "classifySignal");
function recommendServices(eventType, technologies) {
  const services = /* @__PURE__ */ new Set();
  if (eventType === "shopify-adoption" || eventType === "ecommerce-launch")
    services.add("Shopify and AI e-commerce infrastructure");
  if (eventType === "ppc-hiring") services.add("Google Ads performance architecture");
  if (eventType === "seo-hiring" || eventType === "website-redesign")
    services.add("SEO, AEO, and GEO authority engineering");
  if (eventType === "ai-hiring") services.add("AI automation systems");
  if (eventType === "funding-event" || eventType === "expansion-announcement" || eventType === "new-office-opening")
    services.add("GCC expansion digital authority system");
  if (technologies.some((technology) => technology.toLowerCase().includes("shopify")))
    services.add("Shopify and AI e-commerce infrastructure");
  if (services.size === 0) services.add("AI visibility and conversion infrastructure");
  return Array.from(services);
}
__name(recommendServices, "recommendServices");

// src/domains/public-buying-signals/scoring.ts
var commercialEvents = /* @__PURE__ */ new Set([
  "shopify-adoption",
  "ecommerce-launch",
  "website-redesign",
  "ppc-hiring",
  "seo-hiring",
  "ai-hiring",
  "funding-event",
  "expansion-announcement"
]);
function clamp(value) {
  return Number(Math.max(0, Math.min(1, value)).toFixed(4));
}
__name(clamp, "clamp");
function includesAny(value, terms) {
  const text = value.toLowerCase();
  return terms.some((term) => text.includes(term));
}
__name(includesAny, "includesAny");
function calculateOpportunityScore(signal, organization, organizationSignalCount, now = /* @__PURE__ */ new Date()) {
  const ageDays = Math.max(0, (now.getTime() - new Date(signal.publishedAt).getTime()) / 864e5);
  const text = `${signal.title} ${signal.summary} ${signal.location ?? ""} ${organization.location ?? ""} ${organization.industry ?? ""}`;
  const technologyText = `${signal.technologies.join(" ")} ${organization.technologies.join(" ")}`;
  const factors = {
    commercialRelevance: commercialEvents.has(signal.eventType) ? 0.92 : 0.62,
    industryFit: includesAny(text, [
      "retail",
      "ecommerce",
      "e-commerce",
      "hospitality",
      "real estate",
      "luxury",
      "services"
    ]) ? 0.9 : 0.58,
    uaeGccRelevance: includesAny(text, [
      "dubai",
      "uae",
      "abu dhabi",
      "sharjah",
      "gcc",
      "saudi",
      "qatar",
      "kuwait",
      "bahrain",
      "oman"
    ]) ? 1 : 0.35,
    recency: clamp(ageDays <= 7 ? 1 : ageDays <= 30 ? 0.75 : ageDays <= 90 ? 0.45 : 0.2),
    companySize: organization.companySize ? 0.75 : 0.45,
    technologyMatch: includesAny(technologyText, ["shopify", "google ads", "seo", "ai", "automation", "analytics"]) ? 1 : 0.4,
    multipleSignalConfirmation: organizationSignalCount > 1 ? 0.9 : 0.35
  };
  const score = Number(
    (factors.commercialRelevance * 0.22 + factors.industryFit * 0.14 + factors.uaeGccRelevance * 0.18 + factors.recency * 0.14 + factors.companySize * 0.08 + factors.technologyMatch * 0.16 + factors.multipleSignalConfirmation * 0.08).toFixed(4)
  );
  return {
    score,
    factors,
    explanation: `${organization.name} scored ${String(Math.round(score * 100))} because the public signal indicates ${signal.eventType.replaceAll("-", " ")}, with UAE/GCC relevance ${String(Math.round(factors.uaeGccRelevance * 100))} and technology match ${String(Math.round(factors.technologyMatch * 100))}.`
  };
}
__name(calculateOpportunityScore, "calculateOpportunityScore");

// src/domains/public-buying-signals/service.ts
function slug2(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}
__name(slug2, "slug");
var PublicBuyingSignalService = class {
  constructor(providers, sources, organizations, signals, opportunities, scores, runs, logger) {
    this.providers = providers;
    this.sources = sources;
    this.organizations = organizations;
    this.signals = signals;
    this.opportunities = opportunities;
    this.scores = scores;
    this.runs = runs;
    this.logger = logger;
  }
  providers;
  sources;
  organizations;
  signals;
  opportunities;
  scores;
  runs;
  logger;
  static {
    __name(this, "PublicBuyingSignalService");
  }
  /** Lists public buying signals. */
  async listSignals(limit) {
    return this.signals.list(limit);
  }
  /** Gets one public buying signal. */
  async getSignal(id) {
    const signal = await this.signals.findById(id);
    if (!signal) throw new AppError({ status: 404, code: "not_found", message: "Buying signal not found" });
    return signal;
  }
  /** Lists scored opportunities. */
  async listOpportunities(limit) {
    return this.opportunities.list(limit);
  }
  /** Gets one scored opportunity. */
  async getOpportunity(id) {
    const opportunity = await this.opportunities.findById(id);
    if (!opportunity) throw new AppError({ status: 404, code: "not_found", message: "Opportunity not found" });
    return opportunity;
  }
  /** Lists active public signal sources. */
  async listSources(limit) {
    return this.sources.list(limit);
  }
  /** Scans configured public providers and persists signals and opportunities. */
  async scan(requestId, limit = 50) {
    const startedAt = (/* @__PURE__ */ new Date()).toISOString();
    const providers = this.providers.list();
    const run = {
      id: crypto.randomUUID(),
      status: "running",
      startedAt,
      completedAt: null,
      sourceCount: providers.length,
      signalCount: 0,
      opportunityCount: 0,
      errorMessage: null
    };
    await this.runs.create(run);
    try {
      const candidates = [];
      for (const provider of providers) candidates.push(...await provider.discover({ limit }));
      const signals = [];
      const opportunities = [];
      for (const candidate of candidates.slice(0, limit)) {
        await this.sources.upsert(candidate.source);
        const organization = this.organizationFromCandidate(candidate);
        await this.organizations.upsert(organization);
        const signal = this.signalFromCandidate(candidate, organization.id);
        await this.signals.create(signal);
        signals.push(signal);
        const opportunity = this.opportunityFromSignal(signal, organization);
        await this.opportunities.create(opportunity);
        const score = await this.scoreOpportunity(signal, organization, opportunity);
        await this.scores.create(score);
        opportunities.push({ opportunity, score });
      }
      const completed = {
        ...run,
        status: "completed",
        completedAt: (/* @__PURE__ */ new Date()).toISOString(),
        signalCount: signals.length,
        opportunityCount: opportunities.length
      };
      await this.runs.update(completed);
      this.logger.info(
        "Public buying signal scan completed",
        { signals: signals.length, opportunities: opportunities.length },
        requestId
      );
      return { run: completed, signals, opportunities };
    } catch (error) {
      const failed = {
        ...run,
        status: "failed",
        completedAt: (/* @__PURE__ */ new Date()).toISOString(),
        errorMessage: error instanceof Error ? error.message : "Ingestion failed"
      };
      await this.runs.update(failed);
      throw error;
    }
  }
  organizationFromCandidate(candidate) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    return {
      id: slug2(candidate.organizationWebsiteUrl ?? candidate.organizationName),
      name: candidate.organizationName,
      websiteUrl: candidate.organizationWebsiteUrl,
      industry: candidate.organizationIndustry,
      location: candidate.organizationLocation,
      companySize: candidate.companySize,
      technologies: candidate.technologies,
      metadata: { sourceCategory: candidate.source.category },
      createdAt: timestamp,
      updatedAt: timestamp
    };
  }
  signalFromCandidate(candidate, organizationId) {
    const classification = classifySignal(candidate);
    return {
      id: crypto.randomUUID(),
      sourceId: candidate.source.id,
      organizationId,
      eventType: classification.eventType,
      title: candidate.title,
      summary: candidate.summary,
      url: candidate.url,
      publishedAt: candidate.publishedAt,
      detectedAt: (/* @__PURE__ */ new Date()).toISOString(),
      location: candidate.organizationLocation,
      technologies: candidate.technologies,
      confidenceScore: classification.confidenceScore,
      raw: candidate.raw
    };
  }
  opportunityFromSignal(signal, organization) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const recommendedServices = recommendServices(signal.eventType, signal.technologies);
    return {
      id: crypto.randomUUID(),
      organizationId: organization.id,
      primarySignalId: signal.id,
      status: "open",
      title: `${organization.name}: ${signal.eventType.replaceAll("-", " ")}`,
      explanation: `${organization.name} has a public ${signal.eventType.replaceAll("-", " ")} signal. Recommended services: ${recommendedServices.join(", ")}.`,
      recommendedServices,
      createdAt: timestamp,
      updatedAt: timestamp
    };
  }
  async scoreOpportunity(signal, organization, opportunity) {
    const organizationSignalCount = await this.signals.countForOrganization(organization.id);
    const result2 = calculateOpportunityScore(signal, organization, organizationSignalCount);
    return {
      id: crypto.randomUUID(),
      opportunityId: opportunity.id,
      score: result2.score,
      factors: result2.factors,
      explanation: result2.explanation,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
};

// src/domains/public-buying-signals/api.ts
function createPublicBuyingSignalService(container) {
  return new PublicBuyingSignalService(
    createBuyingSignalProviderRegistry(container.config.publicBuyingSignalFeeds),
    new SignalSourceRepository(container.db),
    new OrganizationRepository(container.db),
    new BuyingSignalRepository(container.db),
    new OpportunityRepository(container.db),
    new OpportunityScoreRepository(container.db),
    new IngestionRunRepository(container.db),
    container.logger
  );
}
__name(createPublicBuyingSignalService, "createPublicBuyingSignalService");
function readLimit3(url) {
  const raw = url.searchParams.get("limit");
  if (!raw) return 100;
  const value = Number.parseInt(raw, 10);
  return Number.isInteger(value) && value > 0 && value <= 500 ? value : 100;
}
__name(readLimit3, "readLimit");
async function routePublicBuyingSignalRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createPublicBuyingSignalService(container);
  if (request.method === "GET" && url.pathname === "/signals") {
    return successResponse({ signals: await service.listSignals(readLimit3(url)) }, context.requestId);
  }
  const signalMatch = /^\/signals\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && signalMatch?.[1]) {
    return successResponse({ signal: await service.getSignal(signalMatch[1]) }, context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/signals/scan") {
    return successResponse({ result: await service.scan(context.requestId, readLimit3(url)) }, context.requestId, 201);
  }
  if (request.method === "GET" && url.pathname === "/opportunities") {
    return successResponse({ opportunities: await service.listOpportunities(readLimit3(url)) }, context.requestId);
  }
  const opportunityMatch = /^\/opportunities\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && opportunityMatch?.[1]) {
    return successResponse({ opportunity: await service.getOpportunity(opportunityMatch[1]) }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/sources") {
    return successResponse({ sources: await service.listSources(readLimit3(url)) }, context.requestId);
  }
  return null;
}
__name(routePublicBuyingSignalRequest, "routePublicBuyingSignalRequest");

// src/domains/question-discovery/providers.ts
async function withTimeout(promise, timeoutMs) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new AppError({ status: 504, code: "provider_timeout", message: "Discovery provider timed out" }));
    }, timeoutMs);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
__name(withTimeout, "withTimeout");
async function withRetry(operation, attempts = 2) {
  let lastError;
  for (let index = 0; index < attempts; index += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
__name(withRetry, "withRetry");
var ProviderRateLimiter = class {
  constructor(cache2, limit, windowSeconds) {
    this.cache = cache2;
    this.limit = limit;
    this.windowSeconds = windowSeconds;
  }
  cache;
  limit;
  windowSeconds;
  static {
    __name(this, "ProviderRateLimiter");
  }
  /**
   * Enforces per-provider rate limits.
   */
  async enforce(provider) {
    const now = Math.floor(Date.now() / 1e3);
    const key = `question-discovery:provider-rate:${provider}`;
    const bucket = await this.cache.getJson(key) ?? {
      count: 0,
      resetAt: now + this.windowSeconds
    };
    const current = bucket.resetAt > now ? bucket : { count: 0, resetAt: now + this.windowSeconds };
    if (current.count >= this.limit) {
      throw new AppError({ status: 429, code: "provider_rate_limited", message: `${provider} rate limit exceeded` });
    }
    await this.cache.putJson(key, { count: current.count + 1, resetAt: current.resetAt }, this.windowSeconds);
  }
};
var HttpDiscoveryProvider = class {
  constructor(endpoint, timeoutMs, fetcher = fetch) {
    this.endpoint = endpoint;
    this.timeoutMs = timeoutMs;
    this.fetcher = fetcher;
  }
  endpoint;
  timeoutMs;
  fetcher;
  static {
    __name(this, "HttpDiscoveryProvider");
  }
  /**
   * Fetches JSON from a provider endpoint.
   */
  async fetchJson(url) {
    return withTimeout(
      withRetry(async () => {
        const response = await this.fetcher(url.toString(), { headers: { accept: "application/json" } });
        if (!response.ok) {
          throw new AppError({
            status: 502,
            code: "provider_error",
            message: `${this.name} returned ${String(response.status)}`
          });
        }
        return response.json();
      }),
      this.timeoutMs
    );
  }
};
var BingAutosuggestProvider = class extends HttpDiscoveryProvider {
  constructor(endpoint, timeoutMs, apiKey, fetcher = fetch) {
    super(endpoint, timeoutMs, fetcher);
    this.apiKey = apiKey;
  }
  apiKey;
  static {
    __name(this, "BingAutosuggestProvider");
  }
  name = "bing-autosuggest";
  async discover(request) {
    if (!this.apiKey) {
      throw new AppError({
        status: 503,
        code: "provider_not_configured",
        message: "Bing Autosuggest key is not configured"
      });
    }
    const url = new URL(this.endpoint);
    url.searchParams.set("q", request.seed);
    url.searchParams.set("mkt", request.language === "ar" ? `ar-${request.market}` : `en-${request.market}`);
    const response = await this.fetcher(url.toString(), { headers: { "Ocp-Apim-Subscription-Key": this.apiKey } });
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "provider_error",
        message: `Bing Autosuggest returned ${String(response.status)}`
      });
    const json = await response.json();
    return (json.suggestionGroups ?? []).flatMap((group) => group.searchSuggestions ?? []).map((item) => item.displayText).filter((question) => typeof question === "string").map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.7, freshnessScore: 0.8 }));
  }
};
var YouTubeSuggestProvider = class extends HttpDiscoveryProvider {
  static {
    __name(this, "YouTubeSuggestProvider");
  }
  name = "youtube-suggest";
  async discover(request) {
    const url = new URL(this.endpoint);
    url.searchParams.set("client", "firefox");
    url.searchParams.set("ds", "yt");
    url.searchParams.set("q", request.seed);
    const json = await this.fetchJson(url);
    const suggestions = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : [];
    return suggestions.filter((question) => typeof question === "string").map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.55, freshnessScore: 0.9 }));
  }
};
var InternalSeedProvider = class {
  constructor(seedQuestions) {
    this.seedQuestions = seedQuestions;
  }
  seedQuestions;
  static {
    __name(this, "InternalSeedProvider");
  }
  name = "internal-seed";
  discover(request) {
    return Promise.resolve(
      this.seedQuestions.filter((question) => question.toLowerCase().includes(request.seed.toLowerCase()) || request.seed.length > 0).map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.45, freshnessScore: 0.7 }))
    );
  }
};
var ManualImportProvider = class {
  static {
    __name(this, "ManualImportProvider");
  }
  name = "manual-import";
  discover(request) {
    return Promise.resolve(
      request.manualQuestions.map((question) => ({
        question,
        sourceProvider: this.name,
        searchDemand: 0.5,
        freshnessScore: 1
      }))
    );
  }
};
var GoogleSearchConsoleProvider2 = class extends HttpDiscoveryProvider {
  constructor(endpoint, timeoutMs, accessToken, siteUrl, fetcher = fetch) {
    super(endpoint, timeoutMs, fetcher);
    this.accessToken = accessToken;
    this.siteUrl = siteUrl;
  }
  accessToken;
  siteUrl;
  static {
    __name(this, "GoogleSearchConsoleProvider");
  }
  name = "google-search-console";
  async discover(request) {
    if (!this.accessToken || !this.siteUrl) {
      throw new AppError({
        status: 503,
        code: "provider_not_configured",
        message: "Google Search Console credentials are not configured"
      });
    }
    const url = new URL(
      `${this.endpoint.replace(/\/$/u, "")}/sites/${encodeURIComponent(this.siteUrl)}/searchAnalytics/query`
    );
    const response = await this.fetcher(url.toString(), {
      method: "POST",
      headers: { authorization: `Bearer ${this.accessToken}`, "content-type": "application/json" },
      body: JSON.stringify({
        startDate: "2026-01-01",
        endDate: "2026-06-30",
        dimensions: ["query"],
        rowLimit: request.limit
      })
    });
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "provider_error",
        message: `Google Search Console returned ${String(response.status)}`
      });
    const json = await response.json();
    return (json.rows ?? []).map((row) => row.keys?.[0]).filter((question) => typeof question === "string").map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.85, freshnessScore: 0.8 }));
  }
};
var DiscoveryProviderRegistry = class {
  static {
    __name(this, "DiscoveryProviderRegistry");
  }
  providers = /* @__PURE__ */ new Map();
  /**
   * Registers one provider.
   */
  register(provider) {
    this.providers.set(provider.name, provider);
  }
  /**
   * Resolves providers by name.
   */
  resolve(names) {
    return names.map((name) => {
      const provider = this.providers.get(name);
      if (!provider) throw new AppError({ status: 500, code: "provider_missing", message: `${name} is not registered` });
      return provider;
    });
  }
};
function createDiscoveryProviderRegistry(config, fetcher = fetch) {
  const registry = new DiscoveryProviderRegistry();
  const timeoutMs = 4500;
  registry.register(
    new BingAutosuggestProvider(
      config.bingAutosuggestEndpoint ?? "https://api.bing.microsoft.com/v7.0/Suggestions",
      timeoutMs,
      config.bingAutosuggestKey,
      fetcher
    )
  );
  registry.register(
    new YouTubeSuggestProvider(
      config.youtubeSuggestEndpoint ?? "https://suggestqueries.google.com/complete/search",
      timeoutMs,
      fetcher
    )
  );
  registry.register(
    new InternalSeedProvider(
      (config.internalSeedQuestions ?? "").split("\n").map((value) => value.trim()).filter(Boolean)
    )
  );
  registry.register(new ManualImportProvider());
  registry.register(
    new GoogleSearchConsoleProvider2(
      config.googleSearchConsoleEndpoint ?? "https://searchconsole.googleapis.com/webmasters/v3",
      timeoutMs,
      config.googleSearchConsoleAccessToken,
      config.googleSearchConsoleSiteUrl,
      fetcher
    )
  );
  return registry;
}
__name(createDiscoveryProviderRegistry, "createDiscoveryProviderRegistry");

// src/domains/question-discovery/entities.ts
function extractEntities(question, definitions = defaultEntityDefinitions) {
  const lower = question.toLowerCase();
  const entities = [];
  for (const definition of definitions) {
    const match = definition.aliases.find((alias) => lower.includes(alias.toLowerCase()));
    if (match) entities.push({ key: definition.key, label: definition.label, matchedText: match });
  }
  return entities;
}
__name(extractEntities, "extractEntities");

// src/domains/question-discovery/intent.ts
function classifyIntent(question) {
  const lower = question.toLowerCase();
  if (/\b(login|official|website|vista by lara|brand name|contact)\b/.test(lower)) return "navigational";
  if (/\b(buy|book|hire|quote|whatsapp|proposal|audit|consultation)\b/.test(lower)) return "transactional";
  if (/\b(cost|price|agency|company|service|best|near me|dubai|uae)\b/.test(lower)) return "commercial";
  return "informational";
}
__name(classifyIntent, "classifyIntent");

// src/domains/question-discovery/normalization.ts
var englishStopWords = /* @__PURE__ */ new Set(["a", "an", "the", "for", "to", "of", "and", "or", "in", "on", "with", "by"]);
var arabicPattern = /[\u0600-\u06ff]/;
function detectLanguage(value) {
  return arabicPattern.test(value) ? "ar" : "en";
}
__name(detectLanguage, "detectLanguage");
function canonicalizeQuestion(value) {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").replace(/[؟?]+$/u, "").toLowerCase();
}
__name(canonicalizeQuestion, "canonicalizeQuestion");
function removeStopWords(value) {
  return value.split(" ").filter((token) => !englishStopWords.has(token)).join(" ");
}
__name(removeStopWords, "removeStopWords");
function generateSlug(value) {
  const canonical = removeStopWords(canonicalizeQuestion(value));
  const slug3 = canonical.replace(/[^a-z0-9\u0600-\u06ff]+/giu, "-").replace(/^-+|-+$/g, "").toLowerCase();
  return slug3 || crypto.randomUUID();
}
__name(generateSlug, "generateSlug");
function deduplicateQuestions(items) {
  const seen = /* @__PURE__ */ new Set();
  const result2 = [];
  for (const item of items) {
    const key = canonicalizeQuestion(item.question);
    if (!seen.has(key)) {
      seen.add(key);
      result2.push(item);
    }
  }
  return result2;
}
__name(deduplicateQuestions, "deduplicateQuestions");

// src/domains/question-discovery/scoring.ts
function clampScore(value) {
  return Math.max(0, Math.min(1, value));
}
__name(clampScore, "clampScore");
function scoreUaeRelevance(entities) {
  return entities.some((entity) => entity.key === "dubai" || entity.key === "uae") ? 1 : 0;
}
__name(scoreUaeRelevance, "scoreUaeRelevance");
function scoreAiRelevance(entities) {
  return entities.some((entity) => ["ai-automation", "geo", "ai-visibility"].includes(entity.key)) ? 1 : 0;
}
__name(scoreAiRelevance, "scoreAiRelevance");
function calculatePriorityScore(input, weights = defaultScoringWeights) {
  const commercialIntent = input.intent === "commercial" || input.intent === "transactional" ? 1 : 0;
  const existingCoverageGap = 1 - clampScore(input.existingCoverageScore);
  const score = commercialIntent * weights.commercialIntent + scoreUaeRelevance(input.entities) * weights.uaeRelevance + scoreAiRelevance(input.entities) * weights.aiRelevance + clampScore(input.searchDemand) * weights.searchDemand + clampScore(input.freshnessScore) * weights.freshness + existingCoverageGap * weights.existingCoverageGap;
  return Number(score.toFixed(4));
}
__name(calculatePriorityScore, "calculatePriorityScore");

// src/domains/question-discovery/service.ts
var QuestionDiscoveryService = class {
  constructor(providers, providerRateLimiter, questions, runs, providerRecords, entities, logger) {
    this.providers = providers;
    this.providerRateLimiter = providerRateLimiter;
    this.questions = questions;
    this.runs = runs;
    this.providerRecords = providerRecords;
    this.entities = entities;
    this.logger = logger;
  }
  providers;
  providerRateLimiter;
  questions;
  runs;
  providerRecords;
  entities;
  logger;
  static {
    __name(this, "QuestionDiscoveryService");
  }
  /**
   * Runs discovery and persists normalized questions.
   */
  async runDiscovery(request, requestId) {
    const startedAt = (/* @__PURE__ */ new Date()).toISOString();
    const run = {
      id: crypto.randomUUID(),
      seed: request.seed,
      status: "running",
      providers: request.providers,
      questionCount: 0,
      errorMessage: null,
      startedAt,
      finishedAt: null
    };
    await this.entities.upsertMany(defaultEntityDefinitions);
    await this.runs.create(run);
    try {
      const providerQuestions = [];
      for (const provider of this.providers.resolve(request.providers)) {
        await this.providerRateLimiter.enforce(provider.name);
        const discovered = await provider.discover(request);
        providerQuestions.push(...discovered);
        await this.providerRecords.upsert({ name: provider.name, enabled: true, lastRunAt: (/* @__PURE__ */ new Date()).toISOString() });
      }
      const normalized = this.toQuestionRecords(deduplicateQuestions(providerQuestions), request, run.id);
      for (const question of normalized) await this.questions.upsert(question);
      const completed = {
        ...run,
        status: "completed",
        questionCount: normalized.length,
        finishedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.runs.update(completed);
      this.logger.info(
        "Question discovery completed",
        { runId: run.id, questionCount: completed.questionCount },
        requestId
      );
      return completed;
    } catch (error) {
      const message2 = error instanceof Error ? error.message : "Question discovery failed";
      const failed = { ...run, status: "failed", errorMessage: message2, finishedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.runs.update(failed);
      this.logger.error("Question discovery failed", { runId: run.id, message: message2 }, requestId);
      throw error;
    }
  }
  /**
   * Lists persisted questions.
   */
  async listQuestions(limit, offset) {
    return this.questions.list(limit, offset);
  }
  /**
   * Gets one persisted question.
   */
  async getQuestion(id) {
    const question = await this.questions.findById(id);
    if (!question) throw new AppError({ status: 404, code: "question_not_found", message: "Question was not found" });
    return question;
  }
  /**
   * Persists one manually supplied question.
   */
  async createQuestion(question, market, sourceRunId) {
    const request = { market, language: detectLanguage(question), limit: 1 };
    const [record] = this.toQuestionRecords(
      [{ question, sourceProvider: "manual-import", searchDemand: 0.5, freshnessScore: 1 }],
      request,
      sourceRunId
    );
    if (!record) throw new AppError({ status: 400, code: "invalid_question", message: "Question is required" });
    await this.questions.upsert(record);
    return record;
  }
  /**
   * Lists latest discovery runs.
   */
  async listRuns(limit) {
    return this.runs.listLatest(limit);
  }
  /**
   * Returns aggregate statistics.
   */
  async getStats() {
    return {
      latestRuns: await this.runs.listLatest(10),
      topQuestions: await this.questions.list(10, 0)
    };
  }
  toQuestionRecords(providerQuestions, request, runId) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    return providerQuestions.slice(0, request.limit).map((item) => {
      const canonicalQuestion = canonicalizeQuestion(item.question);
      const entities = extractEntities(canonicalQuestion);
      const intent = classifyIntent(canonicalQuestion);
      const searchDemand = item.searchDemand ?? 0.4;
      const freshnessScore = item.freshnessScore ?? 0.7;
      const existingCoverageScore = 0;
      return {
        id: crypto.randomUUID(),
        question: item.question.endsWith("?") || item.question.endsWith("\u061F") ? item.question : `${item.question}?`,
        canonicalQuestion,
        slug: generateSlug(canonicalQuestion),
        language: request.language,
        market: request.market,
        intent,
        priorityScore: calculatePriorityScore({
          intent,
          entities,
          searchDemand,
          freshnessScore,
          existingCoverageScore
        }),
        searchDemand,
        freshnessScore,
        existingCoverageScore,
        entities,
        sourceProvider: item.sourceProvider,
        sourceRunId: runId,
        firstSeenAt: timestamp,
        lastSeenAt: timestamp
      };
    });
  }
};

// src/domains/question-discovery/api.ts
var providerNames = [
  "bing-autosuggest",
  "youtube-suggest",
  "internal-seed",
  "manual-import",
  "google-search-console"
];
function createQuestionDiscoveryService(container) {
  return new QuestionDiscoveryService(
    createDiscoveryProviderRegistry(container.config),
    new ProviderRateLimiter(container.cache, container.config.rateLimitMax, container.config.rateLimitWindowSeconds),
    new QuestionRepository(container.db),
    new DiscoveryRunRepository(container.db),
    new ProviderRepository(container.db),
    new EntityRepository(container.db),
    container.logger
  );
}
__name(createQuestionDiscoveryService, "createQuestionDiscoveryService");
function readQueryInt(url, key, fallback, max) {
  const raw = url.searchParams.get(key);
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 0 || value > max) {
    throw new AppError({ status: 400, code: "invalid_query", message: `${key} must be between 0 and ${String(max)}` });
  }
  return value;
}
__name(readQueryInt, "readQueryInt");
function validateDiscoveryRunRequest(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code: "validation_error", message: "Request body must be a JSON object" });
  }
  const body = value;
  const seed = typeof body.seed === "string" ? body.seed.trim() : "";
  if (seed.length < 2 || seed.length > 120) {
    throw new AppError({ status: 400, code: "validation_error", message: "seed must be between 2 and 120 characters" });
  }
  const market = typeof body.market === "string" ? body.market : "AE";
  if (!["AE", "SA", "QA", "KW", "BH", "OM"].includes(market)) {
    throw new AppError({ status: 400, code: "validation_error", message: "market is invalid" });
  }
  const language = typeof body.language === "string" ? body.language : "en";
  if (language !== "en" && language !== "ar") {
    throw new AppError({ status: 400, code: "validation_error", message: "language must be en or ar" });
  }
  const rawProviders = Array.isArray(body.providers) && body.providers.length > 0 ? body.providers : ["internal-seed"];
  const normalizedProviders = rawProviders.map((provider) => String(provider));
  const invalid = normalizedProviders.find((provider) => !providerNames.includes(provider));
  if (invalid)
    throw new AppError({ status: 400, code: "validation_error", message: `Unsupported provider: ${invalid}` });
  const limit = typeof body.limit === "number" && Number.isInteger(body.limit) ? body.limit : 25;
  if (limit < 1 || limit > 100)
    throw new AppError({ status: 400, code: "validation_error", message: "limit must be between 1 and 100" });
  const manualQuestions = Array.isArray(body.manualQuestions) ? body.manualQuestions.filter((item) => typeof item === "string") : [];
  return {
    seed,
    market,
    language,
    providers: Array.from(new Set(normalizedProviders)),
    limit,
    manualQuestions
  };
}
__name(validateDiscoveryRunRequest, "validateDiscoveryRunRequest");
function validateCreateQuestionRequest(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code: "validation_error", message: "Request body must be a JSON object" });
  }
  const body = value;
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (question.length < 2 || question.length > 240) {
    throw new AppError({
      status: 400,
      code: "validation_error",
      message: "question must be between 2 and 240 characters"
    });
  }
  const market = typeof body.market === "string" ? body.market : "AE";
  if (!["AE", "SA", "QA", "KW", "BH", "OM"].includes(market)) {
    throw new AppError({ status: 400, code: "validation_error", message: "market is invalid" });
  }
  return {
    question,
    market,
    sourceRunId: typeof body.sourceRunId === "string" ? body.sourceRunId : "manual"
  };
}
__name(validateCreateQuestionRequest, "validateCreateQuestionRequest");
async function routeQuestionDiscoveryRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createQuestionDiscoveryService(container);
  if (request.method === "GET" && url.pathname === "/questions") {
    const limit = readQueryInt(url, "limit", 50, 100);
    const offset = readQueryInt(url, "offset", 0, 1e4);
    return successResponse({ questions: await service.listQuestions(limit, offset) }, context.requestId);
  }
  const questionMatch = /^\/questions\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && questionMatch?.[1]) {
    return successResponse({ question: await service.getQuestion(questionMatch[1]) }, context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/questions") {
    const body = validateCreateQuestionRequest(await readJson(request));
    return successResponse(
      { question: await service.createQuestion(body.question, body.market, body.sourceRunId) },
      context.requestId,
      201
    );
  }
  if (request.method === "POST" && url.pathname === "/discover/run") {
    const body = validateDiscoveryRunRequest(await readJson(request));
    return successResponse({ run: await service.runDiscovery(body, context.requestId) }, context.requestId, 201);
  }
  if (request.method === "GET" && url.pathname === "/discover/status") {
    const limit = readQueryInt(url, "limit", 20, 100);
    return successResponse({ runs: await service.listRuns(limit) }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/stats") {
    return successResponse(await service.getStats(), context.requestId);
  }
  return null;
}
__name(routeQuestionDiscoveryRequest, "routeQuestionDiscoveryRequest");

// src/domains/visibility-intelligence/providers.ts
function ratio(numerator, denominator) {
  return denominator === 0 ? 1 : Number(Math.max(0, Math.min(1, numerator / denominator)).toFixed(4));
}
__name(ratio, "ratio");
function result(provider, score, signals, message2) {
  return {
    provider,
    score,
    signals,
    recommendations: message2 ? [
      {
        contentId: null,
        severity: score < 0.6 ? "high" : "medium",
        category: provider,
        message: message2,
        action: "Improve the measured visibility signal."
      }
    ] : []
  };
}
__name(result, "result");
var WebsiteIndexStatusProvider = class {
  static {
    __name(this, "WebsiteIndexStatusProvider");
  }
  name = "website-index-status";
  measure(context) {
    const published = context.content.filter((item) => item.status === "PUBLISHED" || item.status === "UPDATED");
    const score = ratio(published.length, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { publishedContentCount: published.length },
        score < 1 ? "Some content is not published yet." : null
      )
    );
  }
};
var SitemapStatusProvider = class {
  static {
    __name(this, "SitemapStatusProvider");
  }
  name = "sitemap-status";
  measure(context) {
    const canonical = context.content.filter((item) => item.canonicalUrl || item.slug.length > 0);
    const score = ratio(canonical.length, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { sitemapEligible: canonical.length },
        score < 1 ? "Add canonical URLs or valid slugs for all content." : null
      )
    );
  }
};
var RssValidationProvider = class {
  static {
    __name(this, "RssValidationProvider");
  }
  name = "rss-validation";
  measure(context) {
    const news = context.content.filter(
      (item) => item.contentType === "News Article" || item.contentType === "Press Release"
    );
    const score = ratio(news.filter((item) => item.aiSummary.length > 0).length, news.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { rssItems: news.length },
        score < 1 ? "Ensure every news item has an RSS-ready summary." : null
      )
    );
  }
};
var StructuredDataValidationProvider = class {
  static {
    __name(this, "StructuredDataValidationProvider");
  }
  name = "structured-data-validation";
  measure(context) {
    const score = ratio(new Set(context.schemaContentIds).size, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { schemaContentCount: context.schemaContentIds.length },
        score < 1 ? "Run GEO optimization for content missing schema." : null
      )
    );
  }
};
var LlmsTxtValidationProvider = class {
  static {
    __name(this, "LlmsTxtValidationProvider");
  }
  name = "llms-txt-validation";
  measure(context) {
    const score = ratio(context.aiResourceContentIds.length, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { aiResourceCount: context.aiResourceContentIds.length },
        score < 1 ? "Generate AI resource bundles for all published assets." : null
      )
    );
  }
};
var InternalLinkCoverageProvider = class {
  static {
    __name(this, "InternalLinkCoverageProvider");
  }
  name = "internal-link-coverage";
  measure(context) {
    const linked = context.content.filter((item) => item.internalLinks.length > 0);
    const score = ratio(linked.length, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { linkedContentCount: linked.length },
        score < 0.8 ? "Add internal links to orphaned pages." : null
      )
    );
  }
};
var EntityGraphCoverageProvider = class {
  static {
    __name(this, "EntityGraphCoverageProvider");
  }
  name = "entity-graph-coverage";
  measure(context) {
    const score = ratio(new Set(context.entityContentIds).size, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { entityMappedContentCount: context.entityContentIds.length },
        score < 1 ? "Add missing entities to the entity graph." : null
      )
    );
  }
};
var PublisherVerificationProvider = class {
  static {
    __name(this, "PublisherVerificationProvider");
  }
  name = "publisher-verification";
  measure(context) {
    const score = ratio(new Set(context.publishedContentIds).size, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { verifiedPublications: context.publishedContentIds.length },
        score < 1 ? "Verify publisher history for all public assets." : null
      )
    );
  }
};
var CanonicalValidationProvider = class {
  static {
    __name(this, "CanonicalValidationProvider");
  }
  name = "canonical-validation";
  measure(context) {
    const valid = context.content.filter(
      (item) => (item.canonicalUrl ?? `${context.websiteBaseUrl}/knowledge/${item.slug}`).startsWith("https://")
    );
    const score = ratio(valid.length, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { canonicalValidCount: valid.length },
        score < 1 ? "Fix invalid canonical references." : null
      )
    );
  }
};
var AiResourceValidationProvider = class {
  static {
    __name(this, "AiResourceValidationProvider");
  }
  name = "ai-resource-validation";
  measure(context) {
    const ready = context.geoReports.filter((report) => report.validation.aiRetrievalReady === true);
    const score = ratio(ready.length, context.content.length);
    return Promise.resolve(
      result(
        this.name,
        score,
        { aiReadyReports: ready.length },
        score < 0.8 ? "Improve AI retrieval readiness in GEO reports." : null
      )
    );
  }
};
var VisibilityProviderRegistry = class {
  static {
    __name(this, "VisibilityProviderRegistry");
  }
  providers = /* @__PURE__ */ new Map();
  /** Registers a provider. */
  register(provider) {
    this.providers.set(provider.name, provider);
  }
  /** Lists providers. */
  list() {
    return Array.from(this.providers.values());
  }
};
function createVisibilityProviderRegistry() {
  const registry = new VisibilityProviderRegistry();
  registry.register(new WebsiteIndexStatusProvider());
  registry.register(new SitemapStatusProvider());
  registry.register(new RssValidationProvider());
  registry.register(new StructuredDataValidationProvider());
  registry.register(new LlmsTxtValidationProvider());
  registry.register(new InternalLinkCoverageProvider());
  registry.register(new EntityGraphCoverageProvider());
  registry.register(new PublisherVerificationProvider());
  registry.register(new CanonicalValidationProvider());
  registry.register(new AiResourceValidationProvider());
  return registry;
}
__name(createVisibilityProviderRegistry, "createVisibilityProviderRegistry");

// src/domains/visibility-intelligence/repositories.ts
var VisibilitySnapshotRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "VisibilitySnapshotRepository");
  }
  /** Creates a snapshot. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into visibility_snapshots (id, status, aggregate_score, provider_results_json, metrics_json, created_at) values (?, ?, ?, ?, ?, ?)"
    ).bind(
      record.id,
      record.status,
      record.aggregateScore,
      JSON.stringify(record.providerResults),
      JSON.stringify(record.metrics),
      record.createdAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "Visibility snapshot create failed");
  }
  /** Lists recent snapshots. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from visibility_snapshots order by created_at desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      status: row.status,
      aggregateScore: row.aggregate_score,
      providerResults: JSON.parse(row.provider_results_json),
      metrics: JSON.parse(row.metrics_json),
      createdAt: row.created_at
    }));
  }
};
var VisibilityScoreRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "VisibilityScoreRepository");
  }
  /** Creates metric scores. */
  async createMany(records) {
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into visibility_scores (id, snapshot_id, metric, score, daily_change, weekly_change, monthly_change, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        record.id,
        record.snapshotId,
        record.metric,
        record.score,
        record.dailyChange,
        record.weeklyChange,
        record.monthlyChange,
        record.createdAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Visibility score create failed");
    }
  }
  /** Lists recent scores for one metric. */
  async listMetric(metric, limit) {
    const result2 = await this.db.prepare("select * from visibility_scores where metric = ? order by created_at desc limit ?").bind(metric, limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      snapshotId: row.snapshot_id,
      metric: row.metric,
      score: row.score,
      dailyChange: row.daily_change,
      weeklyChange: row.weekly_change,
      monthlyChange: row.monthly_change,
      createdAt: row.created_at
    }));
  }
};
var VisibilityRecommendationRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "VisibilityRecommendationRepository");
  }
  /** Creates recommendations. */
  async createMany(records) {
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into visibility_recommendations (id, snapshot_id, content_id, severity, category, message, action, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        record.id,
        record.snapshotId,
        record.contentId,
        record.severity,
        record.category,
        record.message,
        record.action,
        record.createdAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Visibility recommendation create failed");
    }
  }
  /** Lists recommendations. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from visibility_recommendations order by created_at desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      snapshotId: row.snapshot_id,
      contentId: row.content_id,
      severity: row.severity,
      category: row.category,
      message: row.message,
      action: row.action,
      createdAt: row.created_at
    }));
  }
};
var ValidationRunRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "ValidationRunRepository");
  }
  /** Creates a validation run. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into validation_runs (id, status, started_at, completed_at, provider_count, error_message) values (?, ?, ?, ?, ?, ?)"
    ).bind(record.id, record.status, record.startedAt, record.completedAt, record.providerCount, record.errorMessage).run();
    if (!result2.success) throw new Error(result2.error ?? "Validation run create failed");
  }
  /** Updates a validation run. */
  async update(record) {
    const result2 = await this.db.prepare("update validation_runs set status = ?, completed_at = ?, error_message = ? where id = ?").bind(record.status, record.completedAt, record.errorMessage, record.id).run();
    if (!result2.success) throw new Error(result2.error ?? "Validation run update failed");
  }
  /** Lists validation runs. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from validation_runs order by started_at desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      status: row.status,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      providerCount: row.provider_count,
      errorMessage: row.error_message
    }));
  }
};
var VisibilityContextRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "VisibilityContextRepository");
  }
  /** Lists compact GEO report rows. */
  async listGeoReports() {
    const result2 = await this.db.prepare("select content_id, score, validation_json from geo_reports order by updated_at desc limit ?").bind(500).all();
    return result2.results.map((row) => ({
      contentId: row.content_id,
      score: row.score,
      validation: JSON.parse(row.validation_json)
    }));
  }
  /** Lists content IDs with schema documents. */
  async listSchemaContentIds() {
    const result2 = await this.db.prepare("select content_id from schema_documents order by updated_at desc limit ?").bind(1e3).all();
    return result2.results.map((row) => row.content_id);
  }
  /** Lists content IDs represented in the entity graph. */
  async listEntityContentIds() {
    const result2 = await this.db.prepare("select source_content_ids_json from entity_graph order by confidence_score desc limit ?").bind(1e3).all();
    return Array.from(new Set(result2.results.flatMap((row) => JSON.parse(row.source_content_ids_json))));
  }
  /** Lists content IDs with publisher history. */
  async listPublishedContentIds() {
    const result2 = await this.db.prepare("select content_id from publish_history order by created_at desc limit ?").bind(1e3).all();
    return Array.from(new Set(result2.results.map((row) => row.content_id)));
  }
};

// src/domains/visibility-intelligence/service.ts
var VisibilityIntelligenceService = class {
  constructor(providers, content, context, snapshots, scores, recommendations, runs, websiteBaseUrl, logger) {
    this.providers = providers;
    this.content = content;
    this.context = context;
    this.snapshots = snapshots;
    this.scores = scores;
    this.recommendations = recommendations;
    this.runs = runs;
    this.websiteBaseUrl = websiteBaseUrl;
    this.logger = logger;
  }
  providers;
  content;
  context;
  snapshots;
  scores;
  recommendations;
  runs;
  websiteBaseUrl;
  logger;
  static {
    __name(this, "VisibilityIntelligenceService");
  }
  /** Runs a visibility scan. */
  async scan(requestId) {
    const startedAt = (/* @__PURE__ */ new Date()).toISOString();
    const run = {
      id: crypto.randomUUID(),
      status: "running",
      startedAt,
      completedAt: null,
      providerCount: this.providers.list().length,
      errorMessage: null
    };
    await this.runs.create(run);
    try {
      const visibilityContext = {
        content: await this.content.list(500, 0),
        geoReports: await this.context.listGeoReports(),
        schemaContentIds: await this.context.listSchemaContentIds(),
        entityContentIds: await this.context.listEntityContentIds(),
        publishedContentIds: await this.context.listPublishedContentIds(),
        aiResourceContentIds: (await this.context.listGeoReports()).filter((report) => report.validation.aiRetrievalReady).map((report) => report.contentId),
        websiteBaseUrl: this.websiteBaseUrl
      };
      const providerResults = [];
      for (const provider of this.providers.list()) providerResults.push(await provider.measure(visibilityContext));
      const metrics = this.metrics(
        visibilityContext,
        providerResults.map((item) => item.score)
      );
      const aggregateScore = this.aggregate(metrics);
      const snapshot = {
        id: crypto.randomUUID(),
        status: "completed",
        aggregateScore,
        providerResults,
        metrics,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const scoreRecords = await this.scoreRecords(snapshot);
      const recommendationRecords = [
        ...providerResults.flatMap((result2) => result2.recommendations),
        ...this.contentRecommendations(visibilityContext)
      ].map((recommendation) => ({
        id: crypto.randomUUID(),
        snapshotId: snapshot.id,
        createdAt: snapshot.createdAt,
        ...recommendation
      }));
      await this.snapshots.create(snapshot);
      await this.scores.createMany(scoreRecords);
      await this.recommendations.createMany(recommendationRecords);
      const completed = { ...run, status: "completed", completedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await this.runs.update(completed);
      this.logger.info("Visibility scan completed", { snapshotId: snapshot.id, aggregateScore }, requestId);
      return { run: completed, snapshot, scores: scoreRecords, recommendations: recommendationRecords };
    } catch (error) {
      const failed = {
        ...run,
        status: "failed",
        completedAt: (/* @__PURE__ */ new Date()).toISOString(),
        errorMessage: error instanceof Error ? error.message : "Visibility scan failed"
      };
      await this.runs.update(failed);
      throw error;
    }
  }
  /** Gets current status. */
  async status() {
    const [lastRun] = await this.runs.list(1);
    return { status: "ready", lastRun: lastRun ?? null };
  }
  /** Gets latest score. */
  async score() {
    const [snapshot] = await this.snapshots.list(1);
    return snapshot ?? null;
  }
  /** Gets history. */
  async history(limit) {
    return this.snapshots.list(limit);
  }
  /** Gets recommendations. */
  async listRecommendations(limit) {
    return this.recommendations.list(limit);
  }
  contentRecommendations(context) {
    const schemaContentIds = new Set(context.schemaContentIds);
    const recommendations = [];
    for (const item of context.content) {
      if (item.entities.length === 0) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "missing-entities",
          message: `${item.title} has no mapped entities.`,
          action: "Add organization, service, topic, and UAE location entities."
        });
      } else if (item.entities.length < 2) {
        recommendations.push({
          contentId: item.id,
          severity: "medium",
          category: "weak-topic-cluster",
          message: `${item.title} has weak topic cluster coverage.`,
          action: "Map at least two supporting entities and related service relationships."
        });
      }
      if (item.internalLinks.length === 0) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "orphaned-page",
          message: `${item.title} has no internal links.`,
          action: "Add related articles, FAQs, services, and entity links."
        });
      }
      if (!schemaContentIds.has(item.id)) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "low-schema-coverage",
          message: `${item.title} is missing structured data coverage.`,
          action: "Run GEO optimization to create schema documents for this asset."
        });
      }
      const canonicalUrl2 = item.canonicalUrl ?? `${context.websiteBaseUrl}/knowledge/${item.slug}`;
      if (!canonicalUrl2.startsWith("https://")) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "missing-canonical-reference",
          message: `${item.title} has an invalid canonical URL.`,
          action: "Set an HTTPS canonical URL on the primary website."
        });
      }
    }
    return recommendations;
  }
  aggregate(metrics) {
    const values = Object.entries(metrics).map(
      ([metric, value]) => metric === "publishedContentCount" ? Math.min(1, value) : Math.max(0, Math.min(1, value))
    );
    return Number((values.reduce((total, value) => total + value, 0) / values.length).toFixed(4));
  }
  metrics(context, providerScores) {
    const count = context.content.length || 1;
    const faqCount = context.content.filter((item) => item.contentType === "FAQ").length;
    const serviceCount = context.content.filter((item) => item.contentType === "Service Page").length;
    return {
      publishedContentCount: context.publishedContentIds.length,
      canonicalCoverage: providerScores[1] ?? 0,
      entityCoverage: Math.min(1, context.entityContentIds.length / count),
      schemaCompleteness: Math.min(1, context.schemaContentIds.length / count),
      internalLinkDensity: Math.min(1, context.content.filter((item) => item.internalLinks.length > 0).length / count),
      topicClusterCoverage: Math.min(1, context.content.filter((item) => item.entities.length >= 2).length / count),
      faqCoverage: faqCount > 0 ? 1 : 0,
      serviceCoverage: serviceCount > 0 ? 1 : 0,
      geoOptimizationScore: context.geoReports.length === 0 ? 0 : Math.min(
        1,
        context.geoReports.reduce((total, report) => total + report.score, 0) / context.geoReports.length
      ),
      aiReadinessScore: Math.min(1, context.aiResourceContentIds.length / count)
    };
  }
  async scoreRecords(snapshot) {
    const timestamp = snapshot.createdAt;
    const records = [];
    for (const [metric, score] of Object.entries(snapshot.metrics)) {
      const previous = await this.scores.listMetric(metric, 30);
      const prior = /* @__PURE__ */ __name((index) => previous[index]?.score ?? score, "prior");
      records.push({
        id: crypto.randomUUID(),
        snapshotId: snapshot.id,
        metric,
        score,
        dailyChange: Number((score - prior(0)).toFixed(4)),
        weeklyChange: Number((score - prior(6)).toFixed(4)),
        monthlyChange: Number((score - prior(29)).toFixed(4)),
        createdAt: timestamp
      });
    }
    return records;
  }
};

// src/domains/visibility-intelligence/api.ts
function createVisibilityIntelligenceService(container) {
  return new VisibilityIntelligenceService(
    createVisibilityProviderRegistry(),
    new ContentRepository(container.db),
    new VisibilityContextRepository(container.db),
    new VisibilitySnapshotRepository(container.db),
    new VisibilityScoreRepository(container.db),
    new VisibilityRecommendationRepository(container.db),
    new ValidationRunRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.logger
  );
}
__name(createVisibilityIntelligenceService, "createVisibilityIntelligenceService");
function readLimit4(url) {
  const raw = url.searchParams.get("limit");
  if (!raw) return 100;
  const value = Number.parseInt(raw, 10);
  return Number.isInteger(value) && value > 0 && value <= 500 ? value : 100;
}
__name(readLimit4, "readLimit");
async function routeVisibilityIntelligenceRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createVisibilityIntelligenceService(container);
  if (request.method === "GET" && url.pathname === "/visibility/status") {
    return successResponse(await service.status(), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/visibility/score") {
    return successResponse({ snapshot: await service.score() }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/visibility/history") {
    return successResponse({ snapshots: await service.history(readLimit4(url)) }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/visibility/recommendations") {
    return successResponse({ recommendations: await service.listRecommendations(readLimit4(url)) }, context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/visibility/scan") {
    return successResponse({ result: await service.scan(context.requestId) }, context.requestId, 201);
  }
  return null;
}
__name(routeVisibilityIntelligenceRequest, "routeVisibilityIntelligenceRequest");

// node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
__name(concat, "concat");
function encode(string) {
  const bytes = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    if (code > 127) {
      throw new TypeError("non-ASCII string encountered in encode()");
    }
    bytes[i] = code;
  }
  return bytes;
}
__name(encode, "encode");

// node_modules/jose/dist/webapi/lib/base64.js
function decodeBase64(encoded) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(encoded);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
__name(decodeBase64, "decodeBase64");

// node_modules/jose/dist/webapi/util/base64url.js
function decode(input) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), {
      alphabet: "base64url"
    });
  }
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
__name(decode, "decode");

// node_modules/jose/dist/webapi/lib/crypto_key.js
var unusable = /* @__PURE__ */ __name((name, prop = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`), "unusable");
var isAlgorithm = /* @__PURE__ */ __name((algorithm, name) => algorithm.name === name, "isAlgorithm");
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
__name(getHashLength, "getHashLength");
function checkHashLength(algorithm, expected) {
  const actual = getHashLength(algorithm.hash);
  if (actual !== expected)
    throw unusable(`SHA-${expected}`, "algorithm.hash");
}
__name(checkHashLength, "checkHashLength");
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
__name(getNamedCurve, "getNamedCurve");
function checkUsage(key, usage) {
  if (usage && !key.usages.includes(usage)) {
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
  }
}
__name(checkUsage, "checkUsage");
function checkSigCryptoKey(key, alg, usage) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
      break;
    }
    case "Ed25519":
    case "EdDSA": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87": {
      if (!isAlgorithm(key.algorithm, alg))
        throw unusable(alg);
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usage);
}
__name(checkSigCryptoKey, "checkSigCryptoKey");

// node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
  types = types.filter(Boolean);
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(", ")}, or ${last}.`;
  } else if (types.length === 2) {
    msg += `one of type ${types[0]} or ${types[1]}.`;
  } else {
    msg += `of type ${types[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
__name(message, "message");
var invalidKeyInput = /* @__PURE__ */ __name((actual, ...types) => message("Key must be ", actual, ...types), "invalidKeyInput");
var withAlg = /* @__PURE__ */ __name((alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types), "withAlg");

// node_modules/jose/dist/webapi/util/errors.js
var errors_exports = {};
__export(errors_exports, {
  JOSEAlgNotAllowed: () => JOSEAlgNotAllowed,
  JOSEError: () => JOSEError,
  JOSENotSupported: () => JOSENotSupported,
  JWEDecryptionFailed: () => JWEDecryptionFailed,
  JWEInvalid: () => JWEInvalid,
  JWKInvalid: () => JWKInvalid,
  JWKSInvalid: () => JWKSInvalid,
  JWKSMultipleMatchingKeys: () => JWKSMultipleMatchingKeys,
  JWKSNoMatchingKey: () => JWKSNoMatchingKey,
  JWKSTimeout: () => JWKSTimeout,
  JWSInvalid: () => JWSInvalid,
  JWSSignatureVerificationFailed: () => JWSSignatureVerificationFailed,
  JWTClaimValidationFailed: () => JWTClaimValidationFailed,
  JWTExpired: () => JWTExpired,
  JWTInvalid: () => JWTInvalid
});
var JOSEError = class extends Error {
  static {
    __name(this, "JOSEError");
  }
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(message2, options) {
    super(message2, options);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static {
    __name(this, "JWTClaimValidationFailed");
  }
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JWTExpired = class extends JOSEError {
  static {
    __name(this, "JWTExpired");
  }
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  static {
    __name(this, "JOSEAlgNotAllowed");
  }
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
  static {
    __name(this, "JOSENotSupported");
  }
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWEDecryptionFailed = class extends JOSEError {
  static {
    __name(this, "JWEDecryptionFailed");
  }
  static code = "ERR_JWE_DECRYPTION_FAILED";
  code = "ERR_JWE_DECRYPTION_FAILED";
  constructor(message2 = "decryption operation failed", options) {
    super(message2, options);
  }
};
var JWEInvalid = class extends JOSEError {
  static {
    __name(this, "JWEInvalid");
  }
  static code = "ERR_JWE_INVALID";
  code = "ERR_JWE_INVALID";
};
var JWSInvalid = class extends JOSEError {
  static {
    __name(this, "JWSInvalid");
  }
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
  static {
    __name(this, "JWTInvalid");
  }
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
};
var JWKInvalid = class extends JOSEError {
  static {
    __name(this, "JWKInvalid");
  }
  static code = "ERR_JWK_INVALID";
  code = "ERR_JWK_INVALID";
};
var JWKSInvalid = class extends JOSEError {
  static {
    __name(this, "JWKSInvalid");
  }
  static code = "ERR_JWKS_INVALID";
  code = "ERR_JWKS_INVALID";
};
var JWKSNoMatchingKey = class extends JOSEError {
  static {
    __name(this, "JWKSNoMatchingKey");
  }
  static code = "ERR_JWKS_NO_MATCHING_KEY";
  code = "ERR_JWKS_NO_MATCHING_KEY";
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
  }
};
var JWKSMultipleMatchingKeys = class extends JOSEError {
  static {
    __name(this, "JWKSMultipleMatchingKeys");
  }
  [Symbol.asyncIterator];
  static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
  }
};
var JWKSTimeout = class extends JOSEError {
  static {
    __name(this, "JWKSTimeout");
  }
  static code = "ERR_JWKS_TIMEOUT";
  code = "ERR_JWKS_TIMEOUT";
  constructor(message2 = "request timed out", options) {
    super(message2, options);
  }
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  static {
    __name(this, "JWSSignatureVerificationFailed");
  }
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
  }
};

// node_modules/jose/dist/webapi/lib/is_key_like.js
var isCryptoKey = /* @__PURE__ */ __name((key) => {
  if (key?.[Symbol.toStringTag] === "CryptoKey")
    return true;
  try {
    return key instanceof CryptoKey;
  } catch {
    return false;
  }
}, "isCryptoKey");
var isKeyObject = /* @__PURE__ */ __name((key) => key?.[Symbol.toStringTag] === "KeyObject", "isKeyObject");
var isKeyLike = /* @__PURE__ */ __name((key) => isCryptoKey(key) || isKeyObject(key), "isKeyLike");

// node_modules/jose/dist/webapi/lib/helpers.js
function decodeBase64url(value, label, ErrorClass) {
  try {
    return decode(value);
  } catch {
    throw new ErrorClass(`Failed to base64url decode the ${label}`);
  }
}
__name(decodeBase64url, "decodeBase64url");

// node_modules/jose/dist/webapi/lib/type_checks.js
var isObjectLike = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null, "isObjectLike");
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}
__name(isObject, "isObject");
function isDisjoint(...headers) {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
}
__name(isDisjoint, "isDisjoint");
var isJWK = /* @__PURE__ */ __name((key) => isObject(key) && typeof key.kty === "string", "isJWK");
var isPrivateJWK = /* @__PURE__ */ __name((key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string"), "isPrivateJWK");
var isPublicJWK = /* @__PURE__ */ __name((key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0, "isPublicJWK");
var isSecretJWK = /* @__PURE__ */ __name((key) => key.kty === "oct" && typeof key.k === "string", "isSecretJWK");

// node_modules/jose/dist/webapi/lib/signing.js
function checkKeyLength(alg, key) {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
}
__name(checkKeyLength, "checkKeyLength");
function subtleAlgorithm(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: parseInt(alg.slice(-3), 10) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
    case "EdDSA":
      return { name: "Ed25519" };
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return { name: alg };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}
__name(subtleAlgorithm, "subtleAlgorithm");
async function getSigKey(alg, key, usage) {
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    return crypto.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  checkSigCryptoKey(key, alg, usage);
  return key;
}
__name(getSigKey, "getSigKey");
async function verify(alg, key, signature, data) {
  const cryptoKey = await getSigKey(alg, key, "verify");
  checkKeyLength(alg, cryptoKey);
  const algorithm = subtleAlgorithm(alg, cryptoKey.algorithm);
  try {
    return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
}
__name(verify, "verify");

// node_modules/jose/dist/webapi/lib/jwk_to_key.js
var unsupportedAlg = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "AKP": {
      switch (jwk.alg) {
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
          algorithm = { name: jwk.alg };
          keyUsages = jwk.priv ? ["sign"] : ["verify"];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
        case "ES384":
        case "ES512":
          algorithm = {
            name: "ECDSA",
            namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[jwk.alg]
          };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
        case "EdDSA":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
__name(subtleMapping, "subtleMapping");
async function jwkToKey(jwk) {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const keyData = { ...jwk };
  if (keyData.kty !== "AKP") {
    delete keyData.alg;
  }
  delete keyData.use;
  return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
}
__name(jwkToKey, "jwkToKey");

// node_modules/jose/dist/webapi/lib/normalize_key.js
var unusableForAlg = "given KeyObject instance cannot be used for this algorithm";
var cache;
var handleJWK = /* @__PURE__ */ __name(async (key, jwk, alg, freeze = false) => {
  cache ||= /* @__PURE__ */ new WeakMap();
  let cached = cache.get(key);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const cryptoKey = await jwkToKey({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
}, "handleJWK");
var handleKeyObject = /* @__PURE__ */ __name((keyObject, alg) => {
  cache ||= /* @__PURE__ */ new WeakMap();
  let cached = cache.get(keyObject);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const isPublic = keyObject.type === "public";
  const extractable = isPublic ? true : false;
  let cryptoKey;
  if (keyObject.asymmetricKeyType === "x25519") {
    switch (alg) {
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW":
        break;
      default:
        throw new TypeError(unusableForAlg);
    }
    cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
  }
  if (keyObject.asymmetricKeyType === "ed25519") {
    if (alg !== "EdDSA" && alg !== "Ed25519") {
      throw new TypeError(unusableForAlg);
    }
    cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
      isPublic ? "verify" : "sign"
    ]);
  }
  switch (keyObject.asymmetricKeyType) {
    case "ml-dsa-44":
    case "ml-dsa-65":
    case "ml-dsa-87": {
      if (alg !== keyObject.asymmetricKeyType.toUpperCase()) {
        throw new TypeError(unusableForAlg);
      }
      cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
        isPublic ? "verify" : "sign"
      ]);
    }
  }
  if (keyObject.asymmetricKeyType === "rsa") {
    let hash;
    switch (alg) {
      case "RSA-OAEP":
        hash = "SHA-1";
        break;
      case "RS256":
      case "PS256":
      case "RSA-OAEP-256":
        hash = "SHA-256";
        break;
      case "RS384":
      case "PS384":
      case "RSA-OAEP-384":
        hash = "SHA-384";
        break;
      case "RS512":
      case "PS512":
      case "RSA-OAEP-512":
        hash = "SHA-512";
        break;
      default:
        throw new TypeError(unusableForAlg);
    }
    if (alg.startsWith("RSA-OAEP")) {
      return keyObject.toCryptoKey({
        name: "RSA-OAEP",
        hash
      }, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
    }
    cryptoKey = keyObject.toCryptoKey({
      name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
      hash
    }, extractable, [isPublic ? "verify" : "sign"]);
  }
  if (keyObject.asymmetricKeyType === "ec") {
    const nist = /* @__PURE__ */ new Map([
      ["prime256v1", "P-256"],
      ["secp384r1", "P-384"],
      ["secp521r1", "P-521"]
    ]);
    const namedCurve = nist.get(keyObject.asymmetricKeyDetails?.namedCurve);
    if (!namedCurve) {
      throw new TypeError(unusableForAlg);
    }
    const expectedCurve = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
    if (expectedCurve[alg] && namedCurve === expectedCurve[alg]) {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDSA",
        namedCurve
      }, extractable, [isPublic ? "verify" : "sign"]);
    }
    if (alg.startsWith("ECDH-ES")) {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDH",
        namedCurve
      }, extractable, isPublic ? [] : ["deriveBits"]);
    }
  }
  if (!cryptoKey) {
    throw new TypeError(unusableForAlg);
  }
  if (!cached) {
    cache.set(keyObject, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
}, "handleKeyObject");
async function normalizeKey(key, alg) {
  if (key instanceof Uint8Array) {
    return key;
  }
  if (isCryptoKey(key)) {
    return key;
  }
  if (isKeyObject(key)) {
    if (key.type === "secret") {
      return key.export();
    }
    if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") {
      try {
        return handleKeyObject(key, alg);
      } catch (err) {
        if (err instanceof TypeError) {
          throw err;
        }
      }
    }
    let jwk = key.export({ format: "jwk" });
    return handleJWK(key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k) {
      return decode(key.k);
    }
    return handleJWK(key, key, alg, true);
  }
  throw new Error("unreachable");
}
__name(normalizeKey, "normalizeKey");

// node_modules/jose/dist/webapi/key/import.js
async function importJWK(jwk, alg, options) {
  if (!isObject(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  let ext;
  alg ??= jwk.alg;
  ext ??= options?.extractable ?? jwk.ext;
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode(jwk.k);
    case "RSA":
      if ("oth" in jwk && jwk.oth !== void 0) {
        throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      }
      return jwkToKey({ ...jwk, alg, ext });
    case "AKP": {
      if (typeof jwk.alg !== "string" || !jwk.alg) {
        throw new TypeError('missing "alg" (Algorithm) Parameter value');
      }
      if (alg !== void 0 && alg !== jwk.alg) {
        throw new TypeError("JWK alg and alg option value mismatch");
      }
      return jwkToKey({ ...jwk, ext });
    }
    case "EC":
    case "OKP":
      return jwkToKey({ ...jwk, alg, ext });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}
__name(importJWK, "importJWK");

// node_modules/jose/dist/webapi/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
__name(validateCrit, "validateCrit");

// node_modules/jose/dist/webapi/lib/validate_algorithms.js
function validateAlgorithms(option, algorithms) {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
}
__name(validateAlgorithms, "validateAlgorithms");

// node_modules/jose/dist/webapi/lib/check_key_type.js
var tag = /* @__PURE__ */ __name((key) => key?.[Symbol.toStringTag], "tag");
var jwkMatchesOp = /* @__PURE__ */ __name((alg, key, usage) => {
  if (key.use !== void 0) {
    let expected;
    switch (usage) {
      case "sign":
      case "verify":
        expected = "sig";
        break;
      case "encrypt":
      case "decrypt":
        expected = "enc";
        break;
    }
    if (key.use !== expected) {
      throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
    }
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
  }
  if (Array.isArray(key.key_ops)) {
    let expectedKeyOp;
    switch (true) {
      case (usage === "sign" || usage === "verify"):
      case alg === "dir":
      case alg.includes("CBC-HS"):
        expectedKeyOp = usage;
        break;
      case alg.startsWith("PBES2"):
        expectedKeyOp = "deriveBits";
        break;
      case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
        if (!alg.includes("GCM") && alg.endsWith("KW")) {
          expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
        } else {
          expectedKeyOp = usage;
        }
        break;
      case (usage === "encrypt" && alg.startsWith("RSA")):
        expectedKeyOp = "wrapKey";
        break;
      case usage === "decrypt":
        expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
        break;
    }
    if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) {
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
    }
  }
  return true;
}, "jwkMatchesOp");
var symmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage) => {
  if (key instanceof Uint8Array)
    return;
  if (isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!isKeyLike(key)) {
    throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
}, "symmetricTypeCheck");
var asymmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage) => {
  if (isJWK(key)) {
    switch (usage) {
      case "decrypt":
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation must be a private JWK`);
      case "encrypt":
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation must be a public JWK`);
    }
  }
  if (!isKeyLike(key)) {
    throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (key.type === "public") {
    switch (usage) {
      case "sign":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
      case "decrypt":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
  }
  if (key.type === "private") {
    switch (usage) {
      case "verify":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
      case "encrypt":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
  }
}, "asymmetricTypeCheck");
function checkKeyType(alg, key, usage) {
  switch (alg.substring(0, 2)) {
    case "A1":
    case "A2":
    case "di":
    case "HS":
    case "PB":
      symmetricTypeCheck(alg, key, usage);
      break;
    default:
      asymmetricTypeCheck(alg, key, usage);
  }
}
__name(checkKeyType, "checkKeyType");

// node_modules/jose/dist/webapi/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!isDisjoint(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validateCrit(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
  }
  checkKeyType(alg, key, "verify");
  const data = concat(jws.protected !== void 0 ? encode(jws.protected) : new Uint8Array(), encode("."), typeof jws.payload === "string" ? b64 ? encode(jws.payload) : encoder.encode(jws.payload) : jws.payload);
  const signature = decodeBase64url(jws.signature, "signature", JWSInvalid);
  const k = await normalizeKey(key, alg);
  const verified = await verify(alg, k, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    payload = decodeBase64url(jws.payload, "payload", JWSInvalid);
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result2 = { payload };
  if (jws.protected !== void 0) {
    result2.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result2.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result2, key: k };
  }
  return result2;
}
__name(flattenedVerify, "flattenedVerify");

// node_modules/jose/dist/webapi/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result2 = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result2, key: verified.key };
  }
  return result2;
}
__name(compactVerify, "compactVerify");

// node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = /* @__PURE__ */ __name((date) => Math.floor(date.getTime() / 1e3), "epoch");
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
}
__name(secs, "secs");
var normalizeTyp = /* @__PURE__ */ __name((value) => {
  if (value.includes("/")) {
    return value.toLowerCase();
  }
  return `application/${value.toLowerCase()}`;
}, "normalizeTyp");
var checkAudiencePresence = /* @__PURE__ */ __name((audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
}, "checkAudiencePresence");
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
}
__name(validateClaimsSet, "validateClaimsSet");

// node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const verified = await compactVerify(jwt, key, options);
  if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = validateClaimsSet(verified.protectedHeader, verified.payload, options);
  const result2 = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result2, key: verified.key };
  }
  return result2;
}
__name(jwtVerify, "jwtVerify");

// node_modules/jose/dist/webapi/jwks/local.js
function getKtyFromAlg(alg) {
  switch (typeof alg === "string" && alg.slice(0, 2)) {
    case "RS":
    case "PS":
      return "RSA";
    case "ES":
      return "EC";
    case "Ed":
      return "OKP";
    case "ML":
      return "AKP";
    default:
      throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
  }
}
__name(getKtyFromAlg, "getKtyFromAlg");
function isJWKSLike(jwks) {
  return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
}
__name(isJWKSLike, "isJWKSLike");
function isJWKLike(key) {
  return isObject(key);
}
__name(isJWKLike, "isJWKLike");
var LocalJWKSet = class {
  static {
    __name(this, "LocalJWKSet");
  }
  #jwks;
  #cached = /* @__PURE__ */ new WeakMap();
  constructor(jwks) {
    if (!isJWKSLike(jwks)) {
      throw new JWKSInvalid("JSON Web Key Set malformed");
    }
    this.#jwks = structuredClone(jwks);
  }
  jwks() {
    return this.#jwks;
  }
  async getKey(protectedHeader, token) {
    const { alg, kid } = { ...protectedHeader, ...token?.header };
    const kty = getKtyFromAlg(alg);
    const candidates = this.#jwks.keys.filter((jwk2) => {
      let candidate = kty === jwk2.kty;
      if (candidate && typeof kid === "string") {
        candidate = kid === jwk2.kid;
      }
      if (candidate && (typeof jwk2.alg === "string" || kty === "AKP")) {
        candidate = alg === jwk2.alg;
      }
      if (candidate && typeof jwk2.use === "string") {
        candidate = jwk2.use === "sig";
      }
      if (candidate && Array.isArray(jwk2.key_ops)) {
        candidate = jwk2.key_ops.includes("verify");
      }
      if (candidate) {
        switch (alg) {
          case "ES256":
            candidate = jwk2.crv === "P-256";
            break;
          case "ES384":
            candidate = jwk2.crv === "P-384";
            break;
          case "ES512":
            candidate = jwk2.crv === "P-521";
            break;
          case "Ed25519":
          case "EdDSA":
            candidate = jwk2.crv === "Ed25519";
            break;
        }
      }
      return candidate;
    });
    const { 0: jwk, length } = candidates;
    if (length === 0) {
      throw new JWKSNoMatchingKey();
    }
    if (length !== 1) {
      const error = new JWKSMultipleMatchingKeys();
      const _cached = this.#cached;
      error[Symbol.asyncIterator] = async function* () {
        for (const jwk2 of candidates) {
          try {
            yield await importWithAlgCache(_cached, jwk2, alg);
          } catch {
          }
        }
      };
      throw error;
    }
    return importWithAlgCache(this.#cached, jwk, alg);
  }
};
async function importWithAlgCache(cache2, jwk, alg) {
  const cached = cache2.get(jwk) || cache2.set(jwk, {}).get(jwk);
  if (cached[alg] === void 0) {
    const key = await importJWK({ ...jwk, ext: true }, alg);
    if (key instanceof Uint8Array || key.type !== "public") {
      throw new JWKSInvalid("JSON Web Key Set members must be public keys");
    }
    cached[alg] = key;
  }
  return cached[alg];
}
__name(importWithAlgCache, "importWithAlgCache");
function createLocalJWKSet(jwks) {
  const set = new LocalJWKSet(jwks);
  const localJWKSet = /* @__PURE__ */ __name(async (protectedHeader, token) => set.getKey(protectedHeader, token), "localJWKSet");
  Object.defineProperties(localJWKSet, {
    jwks: {
      value: /* @__PURE__ */ __name(() => structuredClone(set.jwks()), "value"),
      enumerable: false,
      configurable: false,
      writable: false
    }
  });
  return localJWKSet;
}
__name(createLocalJWKSet, "createLocalJWKSet");

// node_modules/jose/dist/webapi/jwks/remote.js
function isCloudflareWorkers() {
  return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && true || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
}
__name(isCloudflareWorkers, "isCloudflareWorkers");
var USER_AGENT;
if (typeof navigator === "undefined" || !"Cloudflare-Workers"?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "jose";
  const VERSION = "v6.2.3";
  USER_AGENT = `${NAME}/${VERSION}`;
}
var customFetch = /* @__PURE__ */ Symbol();
async function fetchJwks(url, headers, signal, fetchImpl = fetch) {
  const response = await fetchImpl(url, {
    method: "GET",
    signal,
    redirect: "manual",
    headers
  }).catch((err) => {
    if (err.name === "TimeoutError") {
      throw new JWKSTimeout();
    }
    throw err;
  });
  if (response.status !== 200) {
    throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
  }
  try {
    return await response.json();
  } catch {
    throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
}
__name(fetchJwks, "fetchJwks");
var jwksCache = /* @__PURE__ */ Symbol();
function isFreshJwksCache(input, cacheMaxAge) {
  if (typeof input !== "object" || input === null) {
    return false;
  }
  if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) {
    return false;
  }
  if (!("jwks" in input) || !isObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isObject)) {
    return false;
  }
  return true;
}
__name(isFreshJwksCache, "isFreshJwksCache");
var RemoteJWKSet = class {
  static {
    __name(this, "RemoteJWKSet");
  }
  #url;
  #timeoutDuration;
  #cooldownDuration;
  #cacheMaxAge;
  #jwksTimestamp;
  #pendingFetch;
  #headers;
  #customFetch;
  #local;
  #cache;
  constructor(url, options) {
    if (!(url instanceof URL)) {
      throw new TypeError("url must be an instance of URL");
    }
    this.#url = new URL(url.href);
    this.#timeoutDuration = typeof options?.timeoutDuration === "number" ? options?.timeoutDuration : 5e3;
    this.#cooldownDuration = typeof options?.cooldownDuration === "number" ? options?.cooldownDuration : 3e4;
    this.#cacheMaxAge = typeof options?.cacheMaxAge === "number" ? options?.cacheMaxAge : 6e5;
    this.#headers = new Headers(options?.headers);
    if (USER_AGENT && !this.#headers.has("User-Agent")) {
      this.#headers.set("User-Agent", USER_AGENT);
    }
    if (!this.#headers.has("accept")) {
      this.#headers.set("accept", "application/json");
      this.#headers.append("accept", "application/jwk-set+json");
    }
    this.#customFetch = options?.[customFetch];
    if (options?.[jwksCache] !== void 0) {
      this.#cache = options?.[jwksCache];
      if (isFreshJwksCache(options?.[jwksCache], this.#cacheMaxAge)) {
        this.#jwksTimestamp = this.#cache.uat;
        this.#local = createLocalJWKSet(this.#cache.jwks);
      }
    }
  }
  pendingFetch() {
    return !!this.#pendingFetch;
  }
  coolingDown() {
    return typeof this.#jwksTimestamp === "number" ? Date.now() < this.#jwksTimestamp + this.#cooldownDuration : false;
  }
  fresh() {
    return typeof this.#jwksTimestamp === "number" ? Date.now() < this.#jwksTimestamp + this.#cacheMaxAge : false;
  }
  jwks() {
    return this.#local?.jwks();
  }
  async getKey(protectedHeader, token) {
    if (!this.#local || !this.fresh()) {
      await this.reload();
    }
    try {
      return await this.#local(protectedHeader, token);
    } catch (err) {
      if (err instanceof JWKSNoMatchingKey) {
        if (this.coolingDown() === false) {
          await this.reload();
          return this.#local(protectedHeader, token);
        }
      }
      throw err;
    }
  }
  async reload() {
    if (this.#pendingFetch && isCloudflareWorkers()) {
      this.#pendingFetch = void 0;
    }
    this.#pendingFetch ||= fetchJwks(this.#url.href, this.#headers, AbortSignal.timeout(this.#timeoutDuration), this.#customFetch).then((json) => {
      this.#local = createLocalJWKSet(json);
      if (this.#cache) {
        this.#cache.uat = Date.now();
        this.#cache.jwks = json;
      }
      this.#jwksTimestamp = Date.now();
      this.#pendingFetch = void 0;
    }).catch((err) => {
      this.#pendingFetch = void 0;
      throw err;
    });
    await this.#pendingFetch;
  }
};
function createRemoteJWKSet(url, options) {
  const set = new RemoteJWKSet(url, options);
  const remoteJWKSet = /* @__PURE__ */ __name(async (protectedHeader, token) => set.getKey(protectedHeader, token), "remoteJWKSet");
  Object.defineProperties(remoteJWKSet, {
    coolingDown: {
      get: /* @__PURE__ */ __name(() => set.coolingDown(), "get"),
      enumerable: true,
      configurable: false
    },
    fresh: {
      get: /* @__PURE__ */ __name(() => set.fresh(), "get"),
      enumerable: true,
      configurable: false
    },
    reload: {
      value: /* @__PURE__ */ __name(() => set.reload(), "value"),
      enumerable: true,
      configurable: false,
      writable: false
    },
    reloading: {
      get: /* @__PURE__ */ __name(() => set.pendingFetch(), "get"),
      enumerable: true,
      configurable: false
    },
    jwks: {
      value: /* @__PURE__ */ __name(() => set.jwks(), "value"),
      enumerable: true,
      configurable: false,
      writable: false
    }
  });
  return remoteJWKSet;
}
__name(createRemoteJWKSet, "createRemoteJWKSet");

// src/operations/api-protection.ts
var encoder2 = new TextEncoder();
function constantTimeEqual(left, right) {
  const leftBytes = encoder2.encode(left);
  const rightBytes = encoder2.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let diff = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < length; index += 1) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return diff === 0;
}
__name(constantTimeEqual, "constantTimeEqual");
async function hmacSha256Hex(secret, value) {
  const key = await crypto.subtle.importKey("raw", encoder2.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign"
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder2.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(hmacSha256Hex, "hmacSha256Hex");
function validateApiVersion(request, config) {
  const requested = request.headers.get("x-api-version");
  if (requested && requested !== config.apiVersion) {
    throw new AppError({
      status: 400,
      code: "unsupported_api_version",
      message: "Requested API version is not supported"
    });
  }
}
__name(validateApiVersion, "validateApiVersion");
async function verifyRequestSignature(request, config, cache2, context) {
  if (!config.requestSigningSecret) return;
  const signature = request.headers.get("x-signature") ?? "";
  const nonce = request.headers.get("x-nonce") ?? "";
  const timestamp = request.headers.get("x-signature-timestamp") ?? "";
  if (!signature || !nonce || !timestamp) {
    throw new AppError({
      status: 401,
      code: "request_signature_required",
      message: "Signed request headers are required"
    });
  }
  const epoch2 = Number.parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1e3);
  if (!Number.isInteger(epoch2) || Math.abs(now - epoch2) > 300) {
    throw new AppError({ status: 401, code: "invalid_signature_timestamp", message: "Signature timestamp is invalid" });
  }
  const nonceKey = `auth:request-nonce:${nonce}`;
  if (await cache2.getJson(nonceKey)) {
    throw new AppError({ status: 401, code: "nonce_replayed", message: "Request nonce has already been used" });
  }
  const url = new URL(request.url);
  const expected = await hmacSha256Hex(
    config.requestSigningSecret,
    `${request.method}
${url.pathname}
${timestamp}
${nonce}`
  );
  if (!constantTimeEqual(signature, expected)) {
    throw new AppError({ status: 401, code: "invalid_request_signature", message: "Request signature is invalid" });
  }
  await cache2.putJson(nonceKey, { requestId: context.requestId }, 600);
}
__name(verifyRequestSignature, "verifyRequestSignature");

// src/auth/auth-middleware.ts
var jwtClockToleranceSeconds = 60;
var replayPrefix = "auth:jwt-replay";
var jwksCache2 = /* @__PURE__ */ new Map();
function getJwks(url) {
  const existing = jwksCache2.get(url);
  if (existing) return existing;
  const resolver = createRemoteJWKSet(new URL(url));
  jwksCache2.set(url, resolver);
  return resolver;
}
__name(getJwks, "getJwks");
async function verifyJwt(token, config) {
  if (!config.authJwksUrl) {
    throw new AppError({ status: 503, code: "jwks_not_configured", message: "JWT authentication is not configured" });
  }
  try {
    const { payload } = await jwtVerify(token, getJwks(config.authJwksUrl), {
      algorithms: ["RS256", "ES256"],
      audience: config.authAudience,
      issuer: config.authIssuer,
      clockTolerance: jwtClockToleranceSeconds
    });
    return payload;
  } catch (error) {
    const code = error instanceof errors_exports.JWTExpired ? "token_expired" : error instanceof errors_exports.JWTClaimValidationFailed || error instanceof errors_exports.JOSEError ? "invalid_token" : "authentication_error";
    throw new AppError({ status: 401, code, message: "Bearer token is invalid" });
  }
}
__name(verifyJwt, "verifyJwt");
async function enforceReplayProtection(payload, cache2) {
  if (typeof payload.jti !== "string" || payload.jti.length === 0) {
    throw new AppError({ status: 401, code: "invalid_token", message: "Token ID is required" });
  }
  if (typeof payload.exp !== "number") {
    throw new AppError({ status: 401, code: "invalid_token", message: "Token expiration is required" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (payload.exp + jwtClockToleranceSeconds < now) {
    throw new AppError({ status: 401, code: "token_expired", message: "Bearer token has expired" });
  }
  const issuer = typeof payload.iss === "string" ? payload.iss : "unknown";
  const key = `${replayPrefix}:${issuer}:${payload.jti}`;
  const existing = await cache2.getJson(key);
  if (existing && existing.expiresAt + jwtClockToleranceSeconds >= now) {
    throw new AppError({ status: 401, code: "token_replayed", message: "Bearer token has already been used" });
  }
  await cache2.putJson(key, { expiresAt: payload.exp });
}
__name(enforceReplayProtection, "enforceReplayProtection");
async function authenticateRequest(request, config, context, cache2) {
  const auth = request.headers.get("authorization") ?? "";
  const apiKey = request.headers.get("x-api-key") ?? "";
  if (config.authSharedSecret && constantTimeEqual(apiKey, config.authSharedSecret)) {
    context.auth = { subject: "api-key", scopes: ["foundation:read", "foundation:write"] };
    return context.auth;
  }
  if (!auth.toLowerCase().startsWith("bearer ")) {
    throw new AppError({ status: 401, code: "unauthorized", message: "Authentication is required" });
  }
  const payload = await verifyJwt(auth.slice(7).trim(), config);
  await enforceReplayProtection(payload, cache2);
  const subject = typeof payload.sub === "string" ? payload.sub : "";
  if (!subject) {
    throw new AppError({ status: 401, code: "invalid_token", message: "Token subject is required" });
  }
  const scopes = typeof payload.scope === "string" ? payload.scope.split(" ").filter(Boolean) : [];
  context.auth = { subject, scopes };
  return context.auth;
}
__name(authenticateRequest, "authenticateRequest");

// src/http/request-context.ts
function createRequestContext(request) {
  const incoming = request.headers.get("x-request-id");
  return {
    requestId: incoming && incoming.trim().length > 0 ? incoming.trim() : crypto.randomUUID(),
    startedAt: Date.now(),
    auth: null
  };
}
__name(createRequestContext, "createRequestContext");

// src/openapi/openapi.ts
function generateOpenApi(config, origin) {
  return {
    openapi: "3.1.0",
    info: {
      title: config.openApiTitle,
      version: config.openApiVersion,
      summary: "Shared foundation endpoints for the Vista AI Authority Engine."
    },
    servers: [{ url: origin }],
    paths: {
      "/health": {
        get: {
          summary: "Health check",
          responses: {
            "200": { description: "Service is healthy" }
          }
        }
      },
      "/diagnostics": {
        get: {
          summary: "Authenticated diagnostics",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Foundation diagnostics" },
            "401": { description: "Authentication failed" },
            "503": { description: "Required binding is not configured" }
          }
        }
      },
      "/questions": {
        get: {
          summary: "List discovered questions",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Question list" }
          }
        },
        post: {
          summary: "Create a manually supplied question",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Question created" },
            "400": { description: "Validation failed" }
          }
        }
      },
      "/questions/{id}": {
        get: {
          summary: "Get a discovered question by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Question detail" },
            "404": { description: "Question not found" }
          }
        }
      },
      "/discover/run": {
        post: {
          summary: "Run question discovery",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Discovery run completed" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/discover/status": {
        get: {
          summary: "List discovery run status records",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Discovery run status list" }
          }
        }
      },
      "/stats": {
        get: {
          summary: "Get question discovery statistics",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Question discovery statistics" }
          }
        }
      },
      "/openapi.json": {
        get: {
          summary: "OpenAPI 3.1 contract",
          responses: {
            "200": { description: "OpenAPI document" }
          }
        }
      },
      "/ops/health": {
        get: {
          summary: "Machine-readable production operations health",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Infrastructure and provider health" }
          }
        }
      },
      "/ops/infrastructure": {
        get: {
          summary: "Validate Cloudflare infrastructure and provider configuration",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Infrastructure validation report" }
          }
        }
      },
      "/ops/performance": {
        get: {
          summary: "Review operational performance posture",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Performance review" }
          }
        }
      },
      "/ops/recovery": {
        get: {
          summary: "Return recovery and rollback guidance",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Recovery report" }
          }
        }
      },
      "/ops/budgets": {
        get: {
          summary: "Return AI budget control configuration",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Budget configuration" }
          }
        }
      },
      "/ops/readiness": {
        get: {
          summary: "Return production readiness score and blockers",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Production readiness report" }
          }
        }
      },
      "/content": {
        get: {
          summary: "List content assets",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Content list" }
          }
        },
        post: {
          summary: "Create a content asset",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Content created" },
            "400": { description: "Validation failed" }
          }
        }
      },
      "/content/{id}": {
        get: {
          summary: "Get content by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content detail" },
            "404": { description: "Content not found" }
          }
        },
        patch: {
          summary: "Edit content and create an immutable version",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content updated" },
            "400": { description: "Validation failed" }
          }
        },
        delete: {
          summary: "Archive content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content archived" },
            "409": { description: "Invalid lifecycle transition" }
          }
        }
      },
      "/content/{id}/approve": {
        post: {
          summary: "Approve content for the next lifecycle stage",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content approved" },
            "409": { description: "Content is not approvable" }
          }
        }
      },
      "/content/{id}/reject": {
        post: {
          summary: "Reject content back into planning",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content rejected" },
            "409": { description: "Content is not rejectable" }
          }
        }
      },
      "/content/{id}/schedule": {
        post: {
          summary: "Schedule content for a future publishing domain",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Publication queue item created" },
            "409": { description: "Content is not schedulable" }
          }
        }
      },
      "/content/{id}/rollback": {
        post: {
          summary: "Roll content back to an immutable version",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content rolled back" },
            "404": { description: "Version not found" }
          }
        }
      },
      "/editorial/queue": {
        get: {
          summary: "List editorial queue items",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Editorial queue list" }
          }
        }
      },
      "/publication/queue": {
        get: {
          summary: "List publication queue items",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publication queue list" }
          }
        }
      },
      "/generate": {
        post: {
          summary: "Create an AI generation job",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Generation completed synchronously" },
            "202": { description: "Generation job queued" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/generate/{contentId}": {
        post: {
          summary: "Generate a draft for an existing content asset",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Generation completed synchronously" },
            "202": { description: "Generation job queued" }
          }
        }
      },
      "/generate/jobs": {
        get: {
          summary: "List AI generation jobs",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Generation job list" }
          }
        }
      },
      "/generate/jobs/{id}": {
        get: {
          summary: "Get AI generation job by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Generation job detail" },
            "404": { description: "Generation job not found" }
          }
        }
      },
      "/generate/jobs/{id}/cancel": {
        post: {
          summary: "Cancel an AI generation job",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Generation job cancelled" },
            "409": { description: "Completed jobs cannot be cancelled" }
          }
        }
      },
      "/generate/providers": {
        get: {
          summary: "List configured AI generation providers",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Provider list" }
          }
        }
      },
      "/generate/providers/test": {
        post: {
          summary: "Test the active AI generation provider",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Provider test result" },
            "503": { description: "Provider is not configured" }
          }
        }
      },
      "/publish": {
        post: {
          summary: "Create a publish job",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Publish job completed synchronously" },
            "202": { description: "Publish job queued" },
            "409": { description: "Content is not approved for publishing" }
          }
        }
      },
      "/publish/{contentId}": {
        post: {
          summary: "Publish approved content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Publish job completed synchronously" },
            "202": { description: "Publish job queued" }
          }
        }
      },
      "/publish/{contentId}/retry": {
        post: {
          summary: "Retry a failed publish job for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Publish job retried" },
            "404": { description: "Retryable job not found" }
          }
        }
      },
      "/publish/jobs/{id}/cancel": {
        post: {
          summary: "Cancel a publish job",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Publish job cancelled" },
            "409": { description: "Succeeded jobs cannot be cancelled" }
          }
        }
      },
      "/publish/jobs": {
        get: {
          summary: "List publish jobs",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publish job list" }
          }
        }
      },
      "/publish/jobs/{id}": {
        get: {
          summary: "Get publish job by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Publish job detail" },
            "404": { description: "Publish job not found" }
          }
        }
      },
      "/publish/providers": {
        get: {
          summary: "List publisher providers",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publisher provider list" }
          }
        }
      },
      "/publish/providers/test": {
        post: {
          summary: "Test publisher providers",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publisher provider checks" }
          }
        }
      },
      "/geo/status": {
        get: {
          summary: "Get GEO optimization engine status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "GEO status" }
          }
        }
      },
      "/geo/entities": {
        get: {
          summary: "List entity graph nodes",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Entity graph list" }
          }
        }
      },
      "/geo/schema/{contentId}": {
        get: {
          summary: "Get schema documents for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Schema documents" },
            "404": { description: "Content not found" }
          }
        }
      },
      "/geo/optimize/{contentId}": {
        post: {
          summary: "Optimize content for GEO and AI retrieval",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Optimization result" },
            "404": { description: "Content not found" }
          }
        }
      },
      "/geo/validate/{contentId}": {
        post: {
          summary: "Validate GEO readiness for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Validation result" }
          }
        }
      },
      "/geo/report/{contentId}": {
        get: {
          summary: "Get GEO report for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "GEO report" }
          }
        }
      },
      "/visibility/status": {
        get: {
          summary: "Get AI visibility scan status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Visibility status" }
          }
        }
      },
      "/visibility/score": {
        get: {
          summary: "Get latest AI visibility score",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Latest visibility score snapshot" }
          }
        }
      },
      "/visibility/history": {
        get: {
          summary: "List historical AI visibility snapshots",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Visibility snapshot history" }
          }
        }
      },
      "/visibility/recommendations": {
        get: {
          summary: "List AI visibility recommendations",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Visibility recommendations" }
          }
        }
      },
      "/visibility/scan": {
        post: {
          summary: "Run an AI visibility signal scan",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Visibility scan completed" }
          }
        }
      },
      "/index/submit": {
        post: {
          summary: "Submit one URL to an external indexing provider",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Indexing submission job created" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/index/batch": {
        post: {
          summary: "Submit a batch of URLs to an external indexing provider",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Batch indexing job created" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/index/status": {
        get: {
          summary: "Get external indexing status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Indexing status" }
          }
        }
      },
      "/search-console/status": {
        get: {
          summary: "Get Google Search Console integration status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Search Console status" }
          }
        }
      },
      "/bing/status": {
        get: {
          summary: "Get Bing Webmaster Tools integration status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Bing Webmaster status" }
          }
        }
      },
      "/sitemap/generate": {
        post: {
          summary: "Generate and version sitemap resources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Sitemap generated" }
          }
        }
      },
      "/robots/generate": {
        post: {
          summary: "Generate and version robots.txt",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "robots.txt generated" }
          }
        }
      },
      "/llms/generate": {
        post: {
          summary: "Generate and version llms.txt and AI discovery resources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "llms.txt generated" }
          }
        }
      },
      "/signals": {
        get: {
          summary: "List public buying signals",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Public buying signal list" }
          }
        }
      },
      "/signals/{id}": {
        get: {
          summary: "Get a public buying signal by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Public buying signal detail" },
            "404": { description: "Signal not found" }
          }
        }
      },
      "/signals/scan": {
        post: {
          summary: "Scan public buying signal sources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Public buying signal scan completed" }
          }
        }
      },
      "/opportunities": {
        get: {
          summary: "List scored public buying signal opportunities",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Opportunity list" }
          }
        }
      },
      "/opportunities/{id}": {
        get: {
          summary: "Get a scored opportunity by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Opportunity detail" },
            "404": { description: "Opportunity not found" }
          }
        }
      },
      "/sources": {
        get: {
          summary: "List public buying signal sources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Public source list" }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        },
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  };
}
__name(generateOpenApi, "generateOpenApi");

// src/operations/health.ts
async function getOperationsHealth(container) {
  const components = [];
  components.push(await checkD1(container));
  components.push(await checkKv(container));
  components.push({ name: "queue", status: "ok", details: { binding: "AUTHORITY_QUEUE" } });
  components.push({ name: "cron", status: "ok", details: { enabled: true, expression: "*/15 * * * *" } });
  components.push({
    name: "ai-provider",
    status: container.config.openAiApiKey || container.config.anthropicApiKey || container.config.googleAiApiKey ? "ok" : "degraded",
    details: { active: container.config.aiGenerationProvider, model: container.config.aiGenerationModel }
  });
  components.push({
    name: "search-console",
    status: container.config.googleSearchConsoleEndpoint && container.config.googleSearchConsoleAccessToken && container.config.googleSearchConsoleSiteUrl ? "ok" : "degraded",
    details: { siteUrl: container.config.googleSearchConsoleSiteUrl ?? null }
  });
  components.push({
    name: "bing",
    status: container.config.bingWebmasterEndpoint && container.config.bingWebmasterApiKey ? "ok" : "degraded",
    details: { configured: Boolean(container.config.bingWebmasterEndpoint && container.config.bingWebmasterApiKey) }
  });
  components.push({
    name: "indexnow",
    status: container.config.indexNowKey && container.config.indexNowKeyLocation ? "ok" : "degraded",
    details: { endpoint: container.config.indexNowEndpoint }
  });
  const status = components.every((component) => component.status === "ok") ? "ok" : "degraded";
  return { status, components };
}
__name(getOperationsHealth, "getOperationsHealth");
async function checkD1(container) {
  try {
    const result2 = await container.db.prepare("select 1 as ok").first();
    return { name: "d1", status: result2?.ok === 1 ? "ok" : "degraded", details: { binding: "DB" } };
  } catch (error) {
    return { name: "d1", status: "degraded", details: { error: error instanceof Error ? error.message : "unknown" } };
  }
}
__name(checkD1, "checkD1");
async function checkKv(container) {
  const key = `ops:health:${crypto.randomUUID()}`;
  try {
    await container.cache.putJson(key, { ok: true }, 60);
    const result2 = await container.cache.getJson(key);
    await container.cache.delete(key);
    return { name: "kv", status: result2?.ok ? "ok" : "degraded", details: { binding: "CACHE" } };
  } catch (error) {
    return { name: "kv", status: "degraded", details: { error: error instanceof Error ? error.message : "unknown" } };
  }
}
__name(checkKv, "checkKv");

// src/operations/infrastructure.ts
function validateInfrastructure(container) {
  const checks = [
    check(
      "worker",
      true,
      container.config.serviceName === "vista-ai-authority-engine",
      "Worker service name is configured"
    ),
    check("d1", true, Boolean(container.env.DB), "D1 binding DB must exist"),
    check("kv", true, Boolean(container.env.CACHE), "KV binding CACHE must exist"),
    check("queue", true, Boolean(container.env.AUTHORITY_QUEUE), "Queue binding AUTHORITY_QUEUE must exist"),
    check(
      "auth",
      true,
      Boolean(container.config.authSharedSecret || container.config.authJwksUrl),
      "Auth secret or JWKS must exist"
    ),
    check("jwks", false, Boolean(container.config.authJwksUrl), "JWKS enables signed JWT authentication"),
    check(
      "openai",
      true,
      container.config.aiGenerationProvider !== "openai" || Boolean(container.config.openAiApiKey),
      "OpenAI key is required for active provider"
    ),
    check(
      "search-console",
      false,
      Boolean(container.config.googleSearchConsoleAccessToken),
      "Search Console token enables Google imports"
    ),
    check("indexnow", false, Boolean(container.config.indexNowKey), "IndexNow key enables URL submission"),
    check(
      "bing",
      false,
      Boolean(container.config.bingWebmasterApiKey),
      "Bing API key enables Bing Webmaster integration"
    )
  ];
  const required = checks.filter((item) => item.required);
  const passed = required.filter((item) => item.status === "pass").length;
  return { score: Math.round(passed / required.length * 100), checks };
}
__name(validateInfrastructure, "validateInfrastructure");
function check(name, required, ok, message2) {
  return { name, required, status: ok ? "pass" : required ? "fail" : "warn", message: message2 };
}
__name(check, "check");

// src/operations/performance.ts
function reviewPerformance(container) {
  const findings = [
    {
      area: "database",
      severity: "info",
      message: "Primary list, status, job, provider, and date indexes are present in migrations."
    },
    {
      area: "queue",
      severity: "info",
      message: "Queue batch size is 10 with retry and dead-letter behavior configured."
    },
    {
      area: "cron",
      severity: "warn",
      message: "One 15-minute cron fans out multiple operational tasks; monitor duration after production data grows."
    },
    {
      area: "cache",
      severity: "info",
      message: "KV-backed caching and rate windows are available through CACHE binding."
    },
    {
      area: "ai",
      severity: container.config.aiDailyTokenLimit ? "info" : "warn",
      message: "AI budget limits should be configured before high-volume generation."
    }
  ];
  const penalty = findings.filter((finding) => finding.severity === "warn").length * 8;
  return { score: Math.max(0, 100 - penalty), findings };
}
__name(reviewPerformance, "reviewPerformance");

// src/operations/recovery.ts
function getRecoveryReport(container) {
  return {
    retries: {
      queuePublisherDelaySeconds: 120,
      queueGenerationDelaySeconds: 60,
      deadLetterQueue: "vista-ai-authority-events-dead"
    },
    database: {
      snapshotRequiredBeforeMigration: true,
      migrationRollback: "Restore D1 snapshot into a new database and switch DB binding if a forward migration fails."
    },
    worker: {
      rollback: "Redeploy the previous successful GitHub Actions artifact or Wrangler version.",
      service: container.config.serviceName,
      version: container.config.serviceVersion
    },
    queues: {
      recovery: "Inspect dead-letter messages, fix provider/configuration error, then replay idempotent job messages only."
    }
  };
}
__name(getRecoveryReport, "getRecoveryReport");

// src/operations/api.ts
async function routeOperationsRequest(request, container, context) {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/ops/health") {
    return successResponse(await getOperationsHealth(container), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/ops/infrastructure") {
    return successResponse(validateInfrastructure(container), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/ops/performance") {
    return successResponse(reviewPerformance(container), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/ops/recovery") {
    return successResponse(getRecoveryReport(container), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/ops/budgets") {
    return successResponse(
      new AiBudgetManager(container.cache, container.config, container.logger).getConfiguration(),
      context.requestId
    );
  }
  if (request.method === "GET" && url.pathname === "/ops/readiness") {
    const infrastructure = validateInfrastructure(container);
    const performance = reviewPerformance(container);
    const securityScore = container.config.authSharedSecret || container.config.authJwksUrl ? 90 : 60;
    return successResponse(
      {
        productionReadinessScore: Math.round((infrastructure.score + performance.score + securityScore) / 3),
        infrastructureScore: infrastructure.score,
        securityScore,
        performanceScore: performance.score,
        maintainabilityScore: 92,
        deploymentScore: infrastructure.score,
        blockers: infrastructure.checks.filter((check2) => check2.required && check2.status !== "pass")
      },
      context.requestId
    );
  }
  return null;
}
__name(routeOperationsRequest, "routeOperationsRequest");

// src/operations/rate-limiter.ts
function getClientIp(request) {
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
__name(getClientIp, "getClientIp");
var GlobalRateLimiter = class {
  constructor(cache2, config) {
    this.cache = cache2;
    this.config = config;
  }
  cache;
  config;
  static {
    __name(this, "GlobalRateLimiter");
  }
  /**
   * Enforces the configured limit for one or more identities.
   */
  async enforce(identities) {
    const now = Date.now();
    for (const identity of identities) {
      await this.assertNotBanned(identity, now);
      await this.record(identity, now);
    }
  }
  async assertNotBanned(identity, now) {
    const ban = await this.cache.getJson(`rate:ban:${identity}`);
    if (ban && ban.bannedUntil > now) {
      throw new AppError({
        status: 429,
        code: "temporarily_banned",
        message: "Client is temporarily banned because of rate limit abuse",
        details: { reason: ban.reason, retryAfterSeconds: Math.ceil((ban.bannedUntil - now) / 1e3) }
      });
    }
  }
  async record(identity, now) {
    const windowMs = this.config.rateLimitWindowSeconds * 1e3;
    const key = `rate:window:${identity}`;
    const existing = await this.cache.getJson(key) ?? { timestamps: [] };
    const timestamps = existing.timestamps.filter((timestamp) => timestamp > now - windowMs);
    if (timestamps.length >= this.config.rateLimitMax) {
      const bannedUntil = now + this.config.rateLimitBanSeconds * 1e3;
      await this.cache.putJson(
        `rate:ban:${identity}`,
        { bannedUntil, reason: "sliding window limit exceeded" },
        this.config.rateLimitBanSeconds
      );
      throw new AppError({
        status: 429,
        code: "rate_limited",
        message: "Rate limit exceeded",
        details: { retryAfterSeconds: this.config.rateLimitWindowSeconds }
      });
    }
    timestamps.push(now);
    await this.cache.putJson(key, { timestamps }, this.config.rateLimitWindowSeconds);
  }
};

// src/operations/observability.ts
function resolveTraceId(request, requestId) {
  const traceparent = request.headers.get("traceparent");
  const traceId = traceparent?.split("-")[1];
  return traceId && /^[a-f0-9]{32}$/iu.test(traceId) ? traceId : requestId.replace(/-/g, "").padEnd(32, "0").slice(0, 32);
}
__name(resolveTraceId, "resolveTraceId");
async function recordOperation(name, logger, context, attributes, operation) {
  const started = Date.now();
  try {
    const result2 = await operation();
    logger.info("otel.metric", { name, durationMs: Date.now() - started, ok: true, attributes }, context.requestId);
    return result2;
  } catch (error) {
    logger.error(
      "otel.metric",
      {
        name,
        durationMs: Date.now() - started,
        ok: false,
        attributes,
        error: error instanceof Error ? error.message : "unknown"
      },
      context.requestId
    );
    throw error;
  }
}
__name(recordOperation, "recordOperation");

// src/routes/diagnostics.ts
function getDiagnostics(container) {
  return {
    service: container.config.serviceName,
    version: container.config.serviceVersion,
    bindings: {
      d1: "configured",
      kv: "configured",
      queue: "configured"
    },
    rateLimit: {
      max: container.config.rateLimitMax,
      windowSeconds: container.config.rateLimitWindowSeconds
    }
  };
}
__name(getDiagnostics, "getDiagnostics");

// src/routes/health.ts
function getHealth(container) {
  return {
    service: container.config.serviceName,
    version: container.config.serviceVersion,
    environment: container.config.nodeEnv,
    status: "healthy"
  };
}
__name(getHealth, "getHealth");

// src/domains/content-pipeline/validation.ts
var contentTypes = [
  "Authority Article",
  "FAQ",
  "Knowledge Page",
  "Service Page",
  "News Article",
  "Press Release",
  "Landing Page",
  "Case Study",
  "Comparison Page"
];
var contentStatuses = [
  "DISCOVERED",
  "APPROVED",
  "PLANNED",
  "GENERATING",
  "GENERATED",
  "REVIEW_REQUIRED",
  "APPROVED_FOR_PUBLISHING",
  "PUBLISHED",
  "UPDATED",
  "ARCHIVED"
];
function slugify(value) {
  const slug3 = value.normalize("NFKC").trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/giu, "-").replace(/^-+|-+$/gu, "");
  return slug3.length > 0 ? slug3 : crypto.randomUUID();
}
__name(slugify, "slugify");
function readString(body, key, min = 1) {
  const value = body[key];
  if (typeof value !== "string" || value.trim().length < min) {
    throw new AppError({ status: 400, code: "validation_error", message: `${key} is required` });
  }
  return value.trim();
}
__name(readString, "readString");
function readStringArray(body, key) {
  const value = body[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string" && item.trim().length > 0).map((item) => item.trim());
}
__name(readStringArray, "readStringArray");
function readPositiveInteger2(body, key, fallback) {
  const value = body[key];
  if (value === void 0) return fallback;
  if (!Number.isInteger(value) || Number(value) < 0) {
    throw new AppError({ status: 400, code: "validation_error", message: `${key} must be a non-negative integer` });
  }
  return Number(value);
}
__name(readPositiveInteger2, "readPositiveInteger");
function readSeoMetadata(value) {
  const body = assertRecord(value);
  return {
    title: readString(body, "title"),
    description: readString(body, "description"),
    ...typeof body.openGraphTitle === "string" ? { openGraphTitle: body.openGraphTitle.trim() } : {},
    ...typeof body.openGraphDescription === "string" ? { openGraphDescription: body.openGraphDescription.trim() } : {}
  };
}
__name(readSeoMetadata, "readSeoMetadata");
function readInternalLinks(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const body = assertRecord(item);
    return {
      ...typeof body.targetContentId === "string" ? { targetContentId: body.targetContentId.trim() } : {},
      targetUrl: readString(body, "targetUrl"),
      anchorText: readString(body, "anchorText")
    };
  });
}
__name(readInternalLinks, "readInternalLinks");
function validateCreateContentInput(value) {
  const body = assertRecord(value);
  const contentType = readString(body, "contentType");
  if (!contentTypes.includes(contentType)) {
    throw new AppError({ status: 400, code: "validation_error", message: "contentType is not supported" });
  }
  const language = typeof body.language === "string" ? body.language : "en";
  if (language !== "en" && language !== "ar") {
    throw new AppError({ status: 400, code: "validation_error", message: "language must be en or ar" });
  }
  const status = typeof body.status === "string" ? body.status : void 0;
  if (status && !contentStatuses.includes(status)) {
    throw new AppError({ status: 400, code: "validation_error", message: "status is not supported" });
  }
  const title = readString(body, "title");
  return {
    title,
    slug: typeof body.slug === "string" && body.slug.trim().length > 0 ? slugify(body.slug) : slugify(title),
    ...status ? { status } : {},
    contentType,
    language,
    canonicalUrl: typeof body.canonicalUrl === "string" ? body.canonicalUrl.trim() : null,
    targetKeyword: readString(body, "targetKeyword"),
    entities: readStringArray(body, "entities"),
    internalLinks: readInternalLinks(body.internalLinks),
    schemaType: readString(body, "schemaType"),
    readingTimeMinutes: readPositiveInteger2(body, "readingTimeMinutes", 1),
    wordCount: readPositiveInteger2(body, "wordCount", 0),
    seoMetadata: readSeoMetadata(body.seoMetadata),
    aiSummary: readString(body, "aiSummary"),
    publishingTargets: readStringArray(body, "publishingTargets"),
    body: readString(body, "body")
  };
}
__name(validateCreateContentInput, "validateCreateContentInput");
function validateUpdateContentInput(value) {
  const body = assertRecord(value);
  return {
    ...typeof body.title === "string" ? { title: body.title.trim() } : {},
    ...typeof body.slug === "string" ? { slug: slugify(body.slug) } : {},
    ...typeof body.canonicalUrl === "string" ? { canonicalUrl: body.canonicalUrl.trim() } : {},
    ...typeof body.targetKeyword === "string" ? { targetKeyword: body.targetKeyword.trim() } : {},
    ...Array.isArray(body.entities) ? { entities: readStringArray(body, "entities") } : {},
    ...Array.isArray(body.internalLinks) ? { internalLinks: readInternalLinks(body.internalLinks) } : {},
    ...typeof body.schemaType === "string" ? { schemaType: body.schemaType.trim() } : {},
    ...typeof body.readingTimeMinutes === "number" ? { readingTimeMinutes: readPositiveInteger2(body, "readingTimeMinutes", 1) } : {},
    ...typeof body.wordCount === "number" ? { wordCount: readPositiveInteger2(body, "wordCount", 0) } : {},
    ...body.seoMetadata ? { seoMetadata: readSeoMetadata(body.seoMetadata) } : {},
    ...typeof body.aiSummary === "string" ? { aiSummary: body.aiSummary.trim() } : {},
    ...Array.isArray(body.publishingTargets) ? { publishingTargets: readStringArray(body, "publishingTargets") } : {},
    ...typeof body.body === "string" ? { body: body.body.trim() } : {}
  };
}
__name(validateUpdateContentInput, "validateUpdateContentInput");

// src/domains/content-pipeline/api.ts
function createContentPipelineService(container) {
  return new ContentPipelineService(
    new ContentRepository(container.db),
    new ContentVersionRepository(container.db),
    new EditorialQueueRepository(container.db),
    new ReviewQueueRepository(container.db),
    new PublicationQueueRepository(container.db),
    new InternalLinkRepository(container.db),
    new ContentAuditRepository(container.db),
    container.logger
  );
}
__name(createContentPipelineService, "createContentPipelineService");
function readContentQueryInt(url, key, fallback, max) {
  const raw = url.searchParams.get(key);
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 0 || value > max) {
    throw new AppError({ status: 400, code: "invalid_query", message: `${key} must be between 0 and ${String(max)}` });
  }
  return value;
}
__name(readContentQueryInt, "readContentQueryInt");
function actorFromContext(context) {
  return context.auth?.subject ?? "api-key";
}
__name(actorFromContext, "actorFromContext");
async function routeContentPipelineRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createContentPipelineService(container);
  const actor2 = actorFromContext(context);
  if (request.method === "GET" && url.pathname === "/content") {
    const limit = readContentQueryInt(url, "limit", 50, 100);
    const offset = readContentQueryInt(url, "offset", 0, 1e4);
    return successResponse({ content: await service.listContent(limit, offset) }, context.requestId);
  }
  if (request.method === "POST" && url.pathname === "/content") {
    const input = validateCreateContentInput(await readJson(request));
    return successResponse(
      { content: await service.createContent(input, actor2, context.requestId) },
      context.requestId,
      201
    );
  }
  const contentMatch = /^\/content\/([^/]+)$/u.exec(url.pathname);
  if (contentMatch?.[1]) {
    const id = contentMatch[1];
    if (request.method === "GET") return successResponse({ content: await service.getContent(id) }, context.requestId);
    if (request.method === "PATCH") {
      const input = validateUpdateContentInput(await readJson(request));
      return successResponse(
        { content: await service.updateContent(id, input, actor2, context.requestId) },
        context.requestId
      );
    }
    if (request.method === "DELETE") {
      return successResponse({ content: await service.archiveContent(id, actor2, context.requestId) }, context.requestId);
    }
  }
  const actionMatch = /^\/content\/([^/]+)\/(approve|reject|schedule|rollback)$/u.exec(url.pathname);
  if (request.method === "POST" && actionMatch?.[1] && actionMatch[2]) {
    const id = actionMatch[1];
    const action = actionMatch[2];
    if (action === "approve")
      return successResponse({ content: await service.approveContent(id, actor2, context.requestId) }, context.requestId);
    if (action === "reject") {
      const body2 = await readJson(request);
      const notes = typeof body2.notes === "string" ? body2.notes : null;
      return successResponse(
        { content: await service.rejectContent(id, actor2, context.requestId, notes) },
        context.requestId
      );
    }
    if (action === "schedule") {
      const body2 = await readJson(request);
      const scheduledAt = typeof body2.scheduledAt === "string" ? body2.scheduledAt : "";
      const targets = Array.isArray(body2.targets) ? body2.targets.filter((item) => typeof item === "string") : [];
      if (scheduledAt.length === 0 || targets.length === 0) {
        throw new AppError({ status: 400, code: "validation_error", message: "scheduledAt and targets are required" });
      }
      return successResponse(
        { publication: await service.scheduleContent(id, scheduledAt, targets, actor2, context.requestId) },
        context.requestId,
        201
      );
    }
    const body = await readJson(request);
    const versionNumber = typeof body.versionNumber === "number" && Number.isInteger(body.versionNumber) ? body.versionNumber : 0;
    if (versionNumber < 1)
      throw new AppError({ status: 400, code: "validation_error", message: "versionNumber is required" });
    return successResponse(
      { content: await service.rollbackContent(id, versionNumber, actor2, context.requestId) },
      context.requestId
    );
  }
  if (request.method === "GET" && url.pathname === "/editorial/queue") {
    const limit = readContentQueryInt(url, "limit", 50, 100);
    return successResponse({ editorialQueue: await service.listEditorialQueue(limit) }, context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/publication/queue") {
    const limit = readContentQueryInt(url, "limit", 50, 100);
    return successResponse({ publicationQueue: await service.listPublicationQueue(limit) }, context.requestId);
  }
  return null;
}
__name(routeContentPipelineRequest, "routeContentPipelineRequest");

// src/domains/geo-optimization/repositories.ts
var EntityGraphRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "EntityGraphRepository");
  }
  /** Upserts entity graph records. */
  async upsertMany(records) {
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into entity_graph (id, entity_type, name, slug, synonyms_json, relationships_json, confidence_score, source_content_ids_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(slug) do update set entity_type = excluded.entity_type, synonyms_json = excluded.synonyms_json, relationships_json = excluded.relationships_json, confidence_score = excluded.confidence_score, source_content_ids_json = excluded.source_content_ids_json, updated_at = excluded.updated_at"
      ).bind(
        record.id,
        record.entityType,
        record.name,
        record.slug,
        JSON.stringify(record.synonyms),
        JSON.stringify(record.relationships),
        record.confidenceScore,
        JSON.stringify(record.sourceContentIds),
        record.createdAt,
        record.updatedAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Entity graph upsert failed");
    }
  }
  /** Lists entity graph records. */
  async list(limit) {
    const result2 = await this.db.prepare("select * from entity_graph order by confidence_score desc limit ?").bind(limit).all();
    return result2.results.map((row) => ({
      id: row.id,
      entityType: row.entity_type,
      name: row.name,
      slug: row.slug,
      synonyms: JSON.parse(row.synonyms_json),
      relationships: JSON.parse(row.relationships_json),
      confidenceScore: row.confidence_score,
      sourceContentIds: JSON.parse(row.source_content_ids_json),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
};
var SchemaDocumentRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "SchemaDocumentRepository");
  }
  /** Replaces schema documents for one content asset. */
  async replaceForContent(contentId, records) {
    const deleted = await this.db.prepare("delete from schema_documents where content_id = ?").bind(contentId).run();
    if (!deleted.success) throw new Error(deleted.error ?? "Schema delete failed");
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into schema_documents (id, content_id, schema_type, json_ld, checksum, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        record.id,
        record.contentId,
        record.schemaType,
        JSON.stringify(record.jsonLd),
        record.checksum,
        record.createdAt,
        record.updatedAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Schema create failed");
    }
  }
  /** Lists schema documents for content. */
  async listForContent(contentId) {
    const result2 = await this.db.prepare("select * from schema_documents where content_id = ?").bind(contentId).all();
    return result2.results.map((row) => ({
      id: row.id,
      contentId: row.content_id,
      schemaType: row.schema_type,
      jsonLd: JSON.parse(row.json_ld),
      checksum: row.checksum,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
};
var GeoReportRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "GeoReportRepository");
  }
  /** Upserts a GEO report. */
  async upsert(record) {
    const result2 = await this.db.prepare(
      "insert into geo_reports (id, content_id, status, score, validation_json, metadata_json, ai_resources_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(content_id) do update set status = excluded.status, score = excluded.score, validation_json = excluded.validation_json, metadata_json = excluded.metadata_json, ai_resources_json = excluded.ai_resources_json, updated_at = excluded.updated_at"
    ).bind(
      record.id,
      record.contentId,
      record.status,
      record.score,
      JSON.stringify(record.validation),
      JSON.stringify(record.metadata),
      JSON.stringify(record.aiResources),
      record.createdAt,
      record.updatedAt
    ).run();
    if (!result2.success) throw new Error(result2.error ?? "GEO report upsert failed");
  }
  /** Finds a GEO report by content ID. */
  async findByContentId(contentId) {
    const row = await this.db.prepare("select * from geo_reports where content_id = ?").bind(contentId).first();
    return row ? {
      id: row.id,
      contentId: row.content_id,
      status: row.status,
      score: row.score,
      validation: JSON.parse(row.validation_json),
      metadata: JSON.parse(row.metadata_json),
      aiResources: JSON.parse(row.ai_resources_json),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    } : null;
  }
};
var InternalLinkGraphRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "InternalLinkGraphRepository");
  }
  /** Replaces internal link graph edges for content. */
  async replaceForContent(contentId, records) {
    const deleted = await this.db.prepare("delete from internal_link_graph where source_content_id = ?").bind(contentId).run();
    if (!deleted.success) throw new Error(deleted.error ?? "Internal link graph delete failed");
    for (const record of records) {
      const result2 = await this.db.prepare(
        "insert into internal_link_graph (id, source_content_id, target_content_id, relation_type, anchor_text, confidence_score, created_at) values (?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        record.id,
        record.sourceContentId,
        record.targetContentId,
        record.relationType,
        record.anchorText,
        record.confidenceScore,
        record.createdAt
      ).run();
      if (!result2.success) throw new Error(result2.error ?? "Internal link graph create failed");
    }
  }
};
var OptimizationHistoryRepository = class {
  constructor(db) {
    this.db = db;
  }
  db;
  static {
    __name(this, "OptimizationHistoryRepository");
  }
  /** Creates an optimization history record. */
  async create(record) {
    const result2 = await this.db.prepare(
      "insert into optimization_history (id, content_id, action, score, details_json, created_at) values (?, ?, ?, ?, ?, ?)"
    ).bind(record.id, record.contentId, record.action, record.score, JSON.stringify(record.details), record.createdAt).run();
    if (!result2.success) throw new Error(result2.error ?? "Optimization history create failed");
  }
};

// src/domains/geo-optimization/ai-resources.ts
function generateAiResources(content, canonicalUrl2, entities, schemas) {
  const entityLines = entities.map((entity) => `- ${entity.name}: ${entity.entityType}, confidence ${entity.confidenceScore.toFixed(2)}`).join("\n");
  const summary = `${content.title}
Canonical: ${canonicalUrl2}
Summary: ${content.aiSummary}
Entities:
${entityLines}`;
  return {
    llmsTxt: `# Vista by Lara AI Resource

${summary}

Use the canonical URL when citing this asset.`,
    aiDiscoveryEndpoint: `/ai/discovery/${content.slug}`,
    knowledgeEndpoint: `/knowledge/${content.slug}.json`,
    entityEndpoint: `/entity-map/${content.slug}.json`,
    aiSitemap: `<url><loc>${canonicalUrl2}</loc><xhtml:link rel="alternate" hreflang="en-AE" href="${canonicalUrl2}"/></url>`,
    machineSummary: JSON.stringify({
      id: content.id,
      title: content.title,
      canonicalUrl: canonicalUrl2,
      entities: entities.map((entity) => entity.name),
      schemas: schemas.map((schema) => schema.schemaType),
      summary: content.aiSummary
    })
  };
}
__name(generateAiResources, "generateAiResources");

// src/domains/geo-optimization/utils.ts
function slugify2(value) {
  return value.normalize("NFKC").trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/giu, "-").replace(/^-+|-+$/gu, "");
}
__name(slugify2, "slugify");
async function checksum3(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(checksum3, "checksum");
function wordCount(value) {
  return value.split(/\s+/u).filter(Boolean).length;
}
__name(wordCount, "wordCount");

// src/domains/geo-optimization/entity-graph.ts
var knownEntities = [
  { name: "Vista by Lara", entityType: "Organization", synonyms: ["Vista", "Vista by Lara"] },
  { name: "Dubai", entityType: "Location", synonyms: ["Dubai", "DXB"] },
  { name: "UAE", entityType: "Location", synonyms: ["United Arab Emirates", "Emirates", "UAE"] },
  { name: "Shopify", entityType: "Product", synonyms: ["Shopify Plus", "Shopify"] },
  { name: "Google Ads", entityType: "Service", synonyms: ["Google PPC", "Google Ads"] },
  { name: "AI Automation", entityType: "Service", synonyms: ["AI workflows", "AI Automation"] },
  { name: "Generative Engine Optimization", entityType: "Topic", synonyms: ["GEO", "Generative Engine Optimization"] },
  { name: "AI Visibility", entityType: "Topic", synonyms: ["AI visibility", "answer engine visibility"] }
];
function buildEntityGraph(content, relatedContent) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const names = /* @__PURE__ */ new Set([
    ...content.entities,
    ...knownEntities.filter((entity) => matches(content, entity)).map((entity) => entity.name)
  ]);
  return Array.from(names).map((name) => {
    const known = knownEntities.find((entity) => entity.name.toLowerCase() === name.toLowerCase());
    const sourceContentIds = [
      content.id,
      ...relatedContent.filter((item) => item.entities.includes(name)).map((item) => item.id)
    ];
    return {
      id: crypto.randomUUID(),
      entityType: known?.entityType ?? inferType(name),
      name,
      slug: slugify2(name),
      synonyms: known?.synonyms ?? [name],
      relationships: relatedContent.slice(0, 5).map((item) => ({ target: item.slug, relation: "mentioned-by" })),
      confidenceScore: Math.min(1, 0.55 + sourceContentIds.length * 0.1 + (known ? 0.2 : 0)),
      sourceContentIds,
      createdAt: timestamp,
      updatedAt: timestamp
    };
  });
}
__name(buildEntityGraph, "buildEntityGraph");
function matches(content, entity) {
  const haystack = `${content.title} ${content.body} ${content.targetKeyword}`.toLowerCase();
  return entity.synonyms.some((synonym) => haystack.includes(synonym.toLowerCase()));
}
__name(matches, "matches");
function inferType(name) {
  if (/dubai|uae|sharjah|abu dhabi/iu.test(name)) return "Location";
  if (/service|ads|automation|seo|geo/iu.test(name)) return "Service";
  return "Topic";
}
__name(inferType, "inferType");

// src/domains/geo-optimization/internal-linking.ts
function recommendInternalLinks(content, candidates) {
  return candidates.filter((candidate) => candidate.id !== content.id).map((candidate) => {
    const sharedEntities = candidate.entities.filter((entity) => content.entities.includes(entity)).length;
    const sameTopic = candidate.targetKeyword.toLowerCase() === content.targetKeyword.toLowerCase();
    const relationType = candidate.contentType === "FAQ" ? "related-faq" : candidate.contentType === "Service Page" ? "related-service" : sharedEntities > 0 ? "entity-link" : "related-article";
    return {
      sourceContentId: content.id,
      targetContentId: candidate.id,
      relationType,
      anchorText: candidate.title,
      confidenceScore: Math.min(1, 0.35 + sharedEntities * 0.2 + (sameTopic ? 0.25 : 0))
    };
  }).filter((item) => item.confidenceScore >= 0.45).sort((left, right) => right.confidenceScore - left.confidenceScore).slice(0, 10);
}
__name(recommendInternalLinks, "recommendInternalLinks");

// src/domains/geo-optimization/metadata-engine.ts
function generateGeoMetadata(content, canonicalUrl2, entities) {
  const title = content.seoMetadata.title || `${content.title} | Vista by Lara`;
  const description = content.seoMetadata.description || content.aiSummary;
  return {
    title: title.slice(0, 60),
    description: description.slice(0, 155),
    openGraph: {
      "og:title": title,
      "og:description": description,
      "og:url": canonicalUrl2,
      "og:type": content.contentType === "News Article" ? "article" : "website"
    },
    xCards: {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description
    },
    robots: "index,follow,max-snippet:-1,max-image-preview:large",
    readingTimeMinutes: content.readingTimeMinutes || Math.max(1, Math.ceil(wordCount(content.body) / 220)),
    aiSummary: content.aiSummary,
    entitySummary: entities.map((entity) => `${entity.name} (${entity.entityType})`).join("; "),
    hreflang: [
      { language: "en-AE", url: canonicalUrl2 },
      { language: "x-default", url: canonicalUrl2 }
    ],
    canonicalUrl: canonicalUrl2
  };
}
__name(generateGeoMetadata, "generateGeoMetadata");

// src/domains/geo-optimization/schema-engine.ts
async function generateSchemaDocuments(content, canonicalUrl2, entities) {
  const base = {
    "@context": "https://schema.org",
    "@id": canonicalUrl2,
    url: canonicalUrl2,
    name: content.title
  };
  const schemaMap = {
    Organization: { "@type": "Organization", name: "Vista by Lara", url: "https://www.vistabylara.com" },
    WebSite: { "@type": "WebSite", name: "Vista by Lara", url: "https://www.vistabylara.com" },
    WebPage: { ...base, "@type": "WebPage", description: content.seoMetadata.description },
    Article: {
      ...base,
      "@type": "Article",
      headline: content.title,
      articleBody: content.body,
      about: entities.map((entity) => entity.name)
    },
    FAQPage: { ...base, "@type": "FAQPage", mainEntity: extractFaq(content.body) },
    BreadcrumbList: { "@type": "BreadcrumbList", itemListElement: breadcrumb(canonicalUrl2, content.title) },
    Service: {
      ...base,
      "@type": "Service",
      areaServed: "UAE",
      provider: { "@type": "Organization", name: "Vista by Lara" }
    },
    Person: { "@type": "Person", name: "Lara", worksFor: { "@type": "Organization", name: "Vista by Lara" } },
    LocalBusiness: {
      "@type": "LocalBusiness",
      name: "Vista by Lara",
      areaServed: ["Dubai", "UAE", "GCC"],
      url: "https://www.vistabylara.com"
    },
    CollectionPage: { ...base, "@type": "CollectionPage" },
    NewsArticle: { ...base, "@type": "NewsArticle", headline: content.title },
    ItemList: {
      "@type": "ItemList",
      itemListElement: entities.map((entity, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entity.name
      }))
    },
    Speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] }
  };
  const selected = selectSchemaTypes(content);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return Promise.all(
    selected.map(async (schemaType) => {
      const jsonLd = schemaMap[schemaType] ?? schemaMap["WebPage"] ?? { "@context": "https://schema.org", "@type": "WebPage", name: content.title };
      return {
        id: crypto.randomUUID(),
        contentId: content.id,
        schemaType,
        jsonLd,
        checksum: await checksum3(JSON.stringify(jsonLd)),
        createdAt: timestamp,
        updatedAt: timestamp
      };
    })
  );
}
__name(generateSchemaDocuments, "generateSchemaDocuments");
function selectSchemaTypes(content) {
  const base = ["Organization", "WebSite", "WebPage", "Article", "BreadcrumbList", "ItemList", "LocalBusiness"];
  if (content.contentType === "FAQ") base.push("FAQPage");
  if (content.contentType === "Service Page") base.push("Service");
  if (content.contentType === "News Article" || content.contentType === "Press Release") base.push("NewsArticle");
  if (content.body.length < 900) base.push("Speakable");
  return Array.from(new Set(base));
}
__name(selectSchemaTypes, "selectSchemaTypes");
function extractFaq(body) {
  const questions = Array.from(body.matchAll(/(?:^|\n)#{2,3}\s*(.+\?)/gu)).map((match) => String(match[1]));
  return questions.map((question) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: "See the full Vista by Lara answer in the canonical article." }
  }));
}
__name(extractFaq, "extractFaq");
function breadcrumb(canonicalUrl2, title) {
  return [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vistabylara.com" },
    { "@type": "ListItem", position: 2, name: "Knowledge", item: "https://www.vistabylara.com/knowledge" },
    { "@type": "ListItem", position: 3, name: title, item: canonicalUrl2 }
  ];
}
__name(breadcrumb, "breadcrumb");

// src/domains/geo-optimization/validation.ts
function validateGeoReadiness(input) {
  const errors = [];
  const warnings = [];
  const requiredSchemas = ["Organization", "WebSite", "WebPage", "Article", "BreadcrumbList"];
  const schemaTypes = new Set(input.schemas.map((schema) => schema.schemaType));
  const missingSchemas = requiredSchemas.filter((schema) => !schemaTypes.has(schema));
  if (missingSchemas.length > 0) errors.push(`Missing schema: ${missingSchemas.join(", ")}`);
  if (!input.canonicalUrl.startsWith("https://")) errors.push("Canonical URL must be HTTPS");
  if (!input.metadata.title || !input.metadata.description) errors.push("Metadata title and description are required");
  if (input.entities.length === 0) errors.push("Entity coverage is required");
  if (input.links.length === 0) warnings.push("Internal link recommendations are weak");
  if (!input.metadata.aiSummary || !input.metadata.entitySummary) warnings.push("AI summaries are incomplete");
  const entityCoverage = input.content.entities.length === 0 ? 1 : Math.min(1, input.entities.length / input.content.entities.length);
  const metadataQuality = input.metadata.title.length <= 60 && input.metadata.description.length <= 155 ? 1 : 0.65;
  const internalLinkQuality = Math.min(1, input.links.length / 3);
  const schemaComplete = missingSchemas.length === 0;
  const canonicalCorrect = input.canonicalUrl.includes(input.content.slug) || input.content.canonicalUrl === input.canonicalUrl;
  const aiRetrievalReady = schemaComplete && entityCoverage >= 0.75 && metadataQuality >= 0.8 && input.metadata.aiSummary.length > 0;
  const score = Math.max(
    0,
    Math.min(
      1,
      (schemaComplete ? 0.25 : 0) + entityCoverage * 0.25 + metadataQuality * 0.2 + internalLinkQuality * 0.15 + (aiRetrievalReady ? 0.15 : 0)
    )
  );
  return {
    score: Number(score.toFixed(4)),
    errors,
    warnings,
    schemaComplete,
    entityCoverage: Number(entityCoverage.toFixed(4)),
    canonicalCorrect,
    metadataQuality,
    internalLinkQuality: Number(internalLinkQuality.toFixed(4)),
    aiRetrievalReady
  };
}
__name(validateGeoReadiness, "validateGeoReadiness");

// src/domains/geo-optimization/service.ts
var GeoOptimizationService = class {
  constructor(content, entities, schemas, reports, links, history, websiteBaseUrl, logger) {
    this.content = content;
    this.entities = entities;
    this.schemas = schemas;
    this.reports = reports;
    this.links = links;
    this.history = history;
    this.websiteBaseUrl = websiteBaseUrl;
    this.logger = logger;
  }
  content;
  entities;
  schemas;
  reports;
  links;
  history;
  websiteBaseUrl;
  logger;
  static {
    __name(this, "GeoOptimizationService");
  }
  /** Returns GEO engine status. */
  async getStatus() {
    return {
      status: "ready",
      optimizedReports: (await this.content.list(100, 0)).length,
      entityCount: (await this.entities.list(100)).length
    };
  }
  /** Lists known entities. */
  async listEntities(limit) {
    return this.entities.list(limit);
  }
  /** Gets or creates schema documents for content. */
  async getSchema(contentId) {
    const existing = await this.schemas.listForContent(contentId);
    if (existing.length > 0) return existing.map((schema) => schema.jsonLd);
    const result2 = await this.optimize(contentId, "schema.generated");
    return result2.schemas.map((schema) => schema.jsonLd);
  }
  /** Optimizes one content asset. */
  async optimize(contentId, requestId) {
    const content = await this.getContent(contentId);
    const allContent = await this.content.list(100, 0);
    const related = allContent.filter((item) => item.id !== content.id);
    const canonicalUrl2 = this.canonicalUrl(content);
    const entities = buildEntityGraph(content, related);
    const schemas = await generateSchemaDocuments(content, canonicalUrl2, entities);
    const metadata = generateGeoMetadata(content, canonicalUrl2, entities);
    const aiResources = generateAiResources(content, canonicalUrl2, entities, schemas);
    const linkRecommendations = recommendInternalLinks(content, related);
    const validation = validateGeoReadiness({
      content,
      canonicalUrl: canonicalUrl2,
      entities,
      schemas,
      metadata,
      links: linkRecommendations
    });
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const report = {
      id: crypto.randomUUID(),
      contentId,
      status: validation.errors.length === 0 ? "optimized" : "needs_work",
      score: validation.score,
      validation,
      metadata,
      aiResources,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    await this.entities.upsertMany(entities);
    await this.schemas.replaceForContent(contentId, schemas);
    await this.links.replaceForContent(
      contentId,
      linkRecommendations.map(
        (link) => ({ id: crypto.randomUUID(), createdAt: timestamp, ...link })
      )
    );
    await this.reports.upsert(report);
    await this.history.create(
      this.historyRecord(
        contentId,
        "geo.optimized",
        validation.score,
        { schemaCount: schemas.length, entityCount: entities.length },
        timestamp
      )
    );
    this.logger.info("GEO optimization completed", { contentId, score: validation.score }, requestId);
    return { content, entities, schemas, metadata, aiResources, links: linkRecommendations, validation, report };
  }
  /** Validates one content asset without persisting a new report. */
  async validate(contentId) {
    const content = await this.getContent(contentId);
    const related = (await this.content.list(100, 0)).filter((item) => item.id !== content.id);
    const canonicalUrl2 = this.canonicalUrl(content);
    const entities = buildEntityGraph(content, related);
    const schemas = await generateSchemaDocuments(content, canonicalUrl2, entities);
    const metadata = generateGeoMetadata(content, canonicalUrl2, entities);
    const links = recommendInternalLinks(content, related);
    return validateGeoReadiness({ content, canonicalUrl: canonicalUrl2, entities, schemas, metadata, links });
  }
  /** Gets a persisted GEO report or creates one. */
  async getReport(contentId, requestId) {
    const existing = await this.reports.findByContentId(contentId);
    if (existing) return existing;
    return (await this.optimize(contentId, requestId)).report;
  }
  async getContent(contentId) {
    const content = await this.content.findById(contentId);
    if (!content) throw new AppError({ status: 404, code: "content_not_found", message: "Content was not found" });
    return content;
  }
  canonicalUrl(content) {
    return content.canonicalUrl ?? `${this.websiteBaseUrl.replace(/\/$/u, "")}/knowledge/${content.slug}`;
  }
  historyRecord(contentId, action, score, details, timestamp) {
    return { id: crypto.randomUUID(), contentId, action, score, details, createdAt: timestamp };
  }
};

// src/domains/geo-optimization/api.ts
function createGeoOptimizationService(container) {
  return new GeoOptimizationService(
    new ContentRepository(container.db),
    new EntityGraphRepository(container.db),
    new SchemaDocumentRepository(container.db),
    new GeoReportRepository(container.db),
    new InternalLinkGraphRepository(container.db),
    new OptimizationHistoryRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.logger
  );
}
__name(createGeoOptimizationService, "createGeoOptimizationService");
function readLimit5(url) {
  const raw = url.searchParams.get("limit");
  if (!raw) return 100;
  const value = Number.parseInt(raw, 10);
  return Number.isInteger(value) && value > 0 && value <= 500 ? value : 100;
}
__name(readLimit5, "readLimit");
async function routeGeoOptimizationRequest(request, container, context) {
  const url = new URL(request.url);
  const service = createGeoOptimizationService(container);
  if (request.method === "GET" && url.pathname === "/geo/status") {
    return successResponse(await service.getStatus(), context.requestId);
  }
  if (request.method === "GET" && url.pathname === "/geo/entities") {
    return successResponse({ entities: await service.listEntities(readLimit5(url)) }, context.requestId);
  }
  const schemaMatch = /^\/geo\/schema\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && schemaMatch?.[1]) {
    return successResponse({ schema: await service.getSchema(schemaMatch[1]) }, context.requestId);
  }
  const optimizeMatch = /^\/geo\/optimize\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "POST" && optimizeMatch?.[1]) {
    return successResponse(
      { result: await service.optimize(optimizeMatch[1], context.requestId) },
      context.requestId,
      201
    );
  }
  const validateMatch = /^\/geo\/validate\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "POST" && validateMatch?.[1]) {
    return successResponse({ validation: await service.validate(validateMatch[1]) }, context.requestId);
  }
  const reportMatch = /^\/geo\/report\/([^/]+)$/u.exec(url.pathname);
  if (request.method === "GET" && reportMatch?.[1]) {
    return successResponse({ report: await service.getReport(reportMatch[1], context.requestId) }, context.requestId);
  }
  return null;
}
__name(routeGeoOptimizationRequest, "routeGeoOptimizationRequest");

// src/router.ts
async function routeRequest(request, env) {
  const context = createRequestContext(request);
  const corsHeaders = createCorsHeaders(request);
  try {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    const container = createContainer(env);
    const traceId = resolveTraceId(request, context.requestId);
    const headers = { ...corsHeaders, "x-trace-id": traceId, "x-api-version": container.config.apiVersion };
    validateApiVersion(request, container.config);
    if (request.method === "GET" && url.pathname === "/health") {
      return successResponse(getHealth(container), context.requestId, 200, headers);
    }
    if (request.method === "GET" && url.pathname === "/openapi.json") {
      return successResponse(generateOpenApi(container.config, url.origin), context.requestId, 200, headers);
    }
    await new GlobalRateLimiter(container.cache, container.config).enforce([`ip:${getClientIp(request)}`]);
    await verifyRequestSignature(request, container.config, container.cache, context);
    if (request.method === "GET" && url.pathname === "/diagnostics") {
      await authenticateRequest(request, container.config, context, container.cache);
      await new GlobalRateLimiter(container.cache, container.config).enforce([
        `user:${context.auth?.subject ?? "anonymous"}`
      ]);
      return successResponse(getDiagnostics(container), context.requestId, 200, headers);
    }
    await authenticateRequest(request, container.config, context, container.cache);
    await new GlobalRateLimiter(container.cache, container.config).enforce([
      `user:${context.auth?.subject ?? "anonymous"}`
    ]);
    const operationsResponse = await recordOperation(
      "operations.route",
      container.logger,
      context,
      { path: url.pathname },
      () => routeOperationsRequest(request, container, context)
    );
    if (operationsResponse) return withOperationalHeaders(operationsResponse, headers);
    const buyingSignalResponse = await routePublicBuyingSignalRequest(request, container, context);
    if (buyingSignalResponse) return withOperationalHeaders(buyingSignalResponse, headers);
    const indexingResponse = await routeExternalSearchIndexingRequest(request, container, context);
    if (indexingResponse) return withOperationalHeaders(indexingResponse, headers);
    const visibilityResponse = await routeVisibilityIntelligenceRequest(request, container, context);
    if (visibilityResponse) return withOperationalHeaders(visibilityResponse, headers);
    const geoResponse = await routeGeoOptimizationRequest(request, container, context);
    if (geoResponse) return withOperationalHeaders(geoResponse, headers);
    const publisherResponse = await routePublisherRequest(request, container, context);
    if (publisherResponse) return withOperationalHeaders(publisherResponse, headers);
    const generationResponse = await routeAiGenerationRequest(request, container, context);
    if (generationResponse) return withOperationalHeaders(generationResponse, headers);
    const contentResponse = await routeContentPipelineRequest(request, container, context);
    if (contentResponse) return withOperationalHeaders(contentResponse, headers);
    const domainResponse = await routeQuestionDiscoveryRequest(request, container, context);
    if (domainResponse) return withOperationalHeaders(domainResponse, headers);
    return failureResponse(
      new AppError({ status: 404, code: "not_found", message: "Endpoint not found" }),
      context.requestId,
      headers
    );
  } catch (error) {
    return failureResponse(toAppError(error), context.requestId, corsHeaders);
  }
}
__name(routeRequest, "routeRequest");
function withOperationalHeaders(response, headers) {
  const next = new Headers(response.headers);
  new Headers(headers).forEach((value, key) => {
    next.set(key, value);
  });
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: next });
}
__name(withOperationalHeaders, "withOperationalHeaders");
function createCorsHeaders(request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = /* @__PURE__ */ new Set([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://www.vistabylara.com",
    "https://vistabylara.com"
  ]);
  return {
    "access-control-allow-origin": origin && allowedOrigins.has(origin) ? origin : "http://localhost:3000",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "authorization,content-type,x-api-key,x-api-version,x-nonce,x-signature,x-signature-timestamp",
    "access-control-max-age": "86400",
    vary: "Origin"
  };
}
__name(createCorsHeaders, "createCorsHeaders");

// src/index.ts
var src_default = {
  /**
   * Handles HTTP requests for health, diagnostics, and OpenAPI endpoints.
   */
  fetch(request, env, _ctx) {
    return routeRequest(request, env);
  },
  /**
   * Handles scheduled cron triggers at the shared infrastructure layer.
   */
  scheduled(controller, env, ctx) {
    const container = createContainer(env);
    ctx.waitUntil(
      Promise.resolve().then(async () => {
        handleScheduled(controller, container.logger);
        if (container.config.questionDiscoveryCronSeed) {
          await createQuestionDiscoveryService(container).runDiscovery(
            {
              seed: container.config.questionDiscoveryCronSeed,
              market: "AE",
              language: "en",
              providers: ["internal-seed"],
              limit: 25,
              manualQuestions: []
            },
            crypto.randomUUID()
          );
        }
        if (container.config.visibilityScanCronEnabled) {
          await createVisibilityIntelligenceService(container).scan(crypto.randomUUID());
        }
        if (container.config.externalIndexingCronEnabled) {
          await createExternalSearchIndexingService(container).runScheduled(crypto.randomUUID());
        }
        if (container.config.publicBuyingSignalCronEnabled) {
          await createPublicBuyingSignalService(container).scan(crypto.randomUUID());
        }
      })
    );
  },
  /**
   * Handles queue batches without executing business-worker logic.
   */
  queue(batch, env, ctx) {
    const container = createContainer(env);
    ctx.waitUntil(
      Promise.resolve().then(async () => {
        container.logger.info("Queue batch accepted", {
          queue: batch.queue,
          messageCount: batch.messages.length
        });
        for (const message2 of batch.messages) {
          const body = message2.body;
          if (body.type === "publisher.run" && typeof body.payload?.jobId === "string") {
            try {
              await createPublisherService(container).processJob(body.payload.jobId, crypto.randomUUID());
              message2.ack();
            } catch {
              message2.retry({ delaySeconds: 120 });
            }
          } else if (body.type === "ai-generation.run" && typeof body.payload?.jobId === "string") {
            try {
              await createAiGenerationService(container).processJob(
                body.payload.jobId,
                "queue",
                crypto.randomUUID(),
                typeof body.payload.minWordCount === "number" ? body.payload.minWordCount : 800
              );
              message2.ack();
            } catch {
              message2.retry({ delaySeconds: 60 });
            }
          } else {
            message2.ack();
          }
        }
      })
    );
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-NZ5bxz/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-NZ5bxz/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
