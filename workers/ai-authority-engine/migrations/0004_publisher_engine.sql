create table if not exists publish_jobs (
  id text primary key,
  content_id text not null,
  status text not null,
  targets_json text not null,
  canonical_url text not null,
  attempt_count integer not null,
  max_retries integer not null,
  error_message text,
  created_at text not null,
  updated_at text not null,
  started_at text,
  completed_at text
);

create table if not exists publish_targets (
  id text primary key,
  name text not null unique,
  enabled integer not null,
  endpoint text,
  config_json text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists publish_history (
  id text primary key,
  job_id text not null,
  content_id text not null,
  publisher text not null,
  version integer not null,
  status text not null,
  published_url text not null,
  canonical_url text not null,
  platform_id text not null,
  published_at text not null,
  checksum text not null,
  response_metadata_json text not null,
  publishing_metadata_json text not null,
  latency_ms integer not null,
  created_at text not null,
  foreign key (job_id) references publish_jobs(id)
);

create table if not exists publish_failures (
  id text primary key,
  job_id text not null,
  content_id text not null,
  publisher text not null,
  attempt integer not null,
  error_code text not null,
  error_message text not null,
  retry_at text,
  created_at text not null,
  foreign key (job_id) references publish_jobs(id)
);

create table if not exists publish_artifacts (
  id text primary key,
  job_id text not null,
  content_id text not null,
  publisher text not null,
  format text not null,
  artifact_body text not null,
  checksum text not null,
  created_at text not null,
  foreign key (job_id) references publish_jobs(id)
);

create index if not exists publish_jobs_status_idx on publish_jobs(status);
create index if not exists publish_jobs_content_idx on publish_jobs(content_id);
create index if not exists publish_history_job_idx on publish_history(job_id);
create index if not exists publish_failures_job_idx on publish_failures(job_id);
create index if not exists publish_artifacts_job_idx on publish_artifacts(job_id);
