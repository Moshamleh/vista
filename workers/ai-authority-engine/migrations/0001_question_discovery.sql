CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  canonical_question TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL,
  market TEXT NOT NULL,
  intent TEXT NOT NULL,
  priority_score REAL NOT NULL,
  search_demand REAL NOT NULL,
  freshness_score REAL NOT NULL,
  existing_coverage_score REAL NOT NULL,
  entities_json TEXT NOT NULL,
  source_provider TEXT NOT NULL,
  source_run_id TEXT NOT NULL,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_questions_market_priority ON questions (market, priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_questions_intent ON questions (intent);
CREATE INDEX IF NOT EXISTS idx_questions_source_run ON questions (source_run_id);

CREATE TABLE IF NOT EXISTS discovery_runs (
  id TEXT PRIMARY KEY,
  seed TEXT NOT NULL,
  status TEXT NOT NULL,
  providers_json TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  error_message TEXT,
  started_at TEXT NOT NULL,
  finished_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_discovery_runs_started_at ON discovery_runs (started_at DESC);
CREATE INDEX IF NOT EXISTS idx_discovery_runs_status ON discovery_runs (status);

CREATE TABLE IF NOT EXISTS providers (
  name TEXT PRIMARY KEY,
  enabled INTEGER NOT NULL,
  last_run_at TEXT
);

CREATE TABLE IF NOT EXISTS entities (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  aliases_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
