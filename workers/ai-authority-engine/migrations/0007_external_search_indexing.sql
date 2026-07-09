create table if not exists indexing_jobs (
  id text primary key,
  job_type text not null,
  status text not null,
  urls_json text not null,
  provider text not null,
  attempt_count integer not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists indexing_results (
  id text primary key,
  job_id text not null,
  provider text not null,
  url text not null,
  status text not null,
  status_code integer,
  response_json text not null,
  created_at text not null,
  foreign key (job_id) references indexing_jobs(id)
);

create table if not exists search_console_imports (
  id text primary key,
  imported_at text not null,
  site_url text not null,
  verification_status text not null,
  sitemap_status_json text not null,
  analytics_json text not null,
  crawl_errors_json text not null
);

create table if not exists bing_imports (
  id text primary key,
  imported_at text not null,
  site_url text not null,
  sitemap_status_json text not null,
  performance_json text not null
);

create table if not exists sitemap_versions (
  id text primary key,
  version integer not null,
  sitemap_xml text not null,
  sitemap_index_xml text not null,
  url_count integer not null,
  checksum text not null,
  created_at text not null
);

create table if not exists robots_versions (
  id text primary key,
  version integer not null,
  body text not null,
  checksum text not null,
  created_at text not null
);

create table if not exists llms_versions (
  id text primary key,
  version integer not null,
  body text not null,
  checksum text not null,
  created_at text not null
);

create index if not exists indexing_jobs_status_idx on indexing_jobs(status, updated_at);
create index if not exists indexing_results_job_idx on indexing_results(job_id);
create index if not exists search_console_imports_imported_idx on search_console_imports(imported_at);
create index if not exists bing_imports_imported_idx on bing_imports(imported_at);
create index if not exists sitemap_versions_created_idx on sitemap_versions(created_at);
create index if not exists robots_versions_created_idx on robots_versions(created_at);
create index if not exists llms_versions_created_idx on llms_versions(created_at);
