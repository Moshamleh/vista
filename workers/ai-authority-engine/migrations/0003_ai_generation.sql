create table if not exists ai_generation_jobs (
  id text primary key,
  content_id text,
  question_id text,
  status text not null,
  content_type text not null,
  question text not null,
  provider text not null,
  model text not null,
  prompt_template_id text not null,
  prompt_version integer not null,
  rag_context_json text not null,
  generated_content_json text,
  validation_json text,
  generation_metadata_json text,
  retry_count integer not null,
  max_retries integer not null,
  cancellation_reason text,
  error_message text,
  started_at text,
  completed_at text,
  created_at text not null,
  updated_at text not null
);

create table if not exists ai_prompt_templates (
  id text primary key,
  name text not null,
  version integer not null,
  content_type text not null,
  parent_id text,
  system_prompt text not null,
  user_prompt text not null,
  variables_json text not null,
  active integer not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists ai_provider_checks (
  id text primary key,
  provider text not null,
  status text not null,
  latency_ms integer not null,
  model text not null,
  error_message text,
  checked_at text not null
);

create index if not exists ai_generation_jobs_status_idx on ai_generation_jobs(status);
create index if not exists ai_generation_jobs_content_idx on ai_generation_jobs(content_id);
create unique index if not exists ai_prompt_templates_type_version_idx on ai_prompt_templates(content_type, version);
create index if not exists ai_provider_checks_provider_idx on ai_provider_checks(provider, checked_at);
