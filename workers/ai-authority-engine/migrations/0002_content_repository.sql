create table if not exists content (
  id text primary key,
  title text not null,
  slug text not null unique,
  status text not null,
  content_type text not null,
  language text not null,
  canonical_url text,
  target_keyword text not null,
  entities_json text not null,
  internal_links_json text not null,
  schema_type text not null,
  reading_time_minutes integer not null,
  word_count integer not null,
  seo_metadata_json text not null,
  ai_summary text not null,
  publishing_targets_json text not null,
  body text not null,
  current_version integer not null,
  scheduled_at text,
  created_at text not null,
  updated_at text not null
);

create table if not exists content_versions (
  id text primary key,
  content_id text not null,
  version_number integer not null,
  title text not null,
  body text not null,
  metadata_json text not null,
  created_by text not null,
  created_at text not null,
  foreign key (content_id) references content(id)
);

create unique index if not exists content_versions_content_version_idx on content_versions(content_id, version_number);
create index if not exists content_status_idx on content(status);
create index if not exists content_type_idx on content(content_type);

create table if not exists content_templates (
  id text primary key,
  content_type text not null unique,
  name text not null,
  required_fields_json text not null,
  schema_type text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists editorial_queue (
  id text primary key,
  content_id text not null,
  status text not null,
  priority integer not null,
  assigned_to text,
  due_at text,
  created_at text not null,
  updated_at text not null,
  foreign key (content_id) references content(id)
);

create table if not exists review_queue (
  id text primary key,
  content_id text not null,
  status text not null,
  reviewer text,
  decision text,
  notes text,
  created_at text not null,
  updated_at text not null,
  foreign key (content_id) references content(id)
);

create table if not exists publication_queue (
  id text primary key,
  content_id text not null,
  status text not null,
  targets_json text not null,
  scheduled_at text not null,
  created_at text not null,
  updated_at text not null,
  foreign key (content_id) references content(id)
);

create table if not exists tags (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  created_at text not null
);

create table if not exists categories (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  created_at text not null
);

create table if not exists internal_links (
  id text primary key,
  source_content_id text not null,
  target_content_id text,
  target_url text not null,
  anchor_text text not null,
  created_at text not null,
  foreign key (source_content_id) references content(id),
  foreign key (target_content_id) references content(id)
);

create table if not exists content_audit_events (
  id text primary key,
  content_id text not null,
  action text not null,
  from_status text,
  to_status text,
  actor text not null,
  metadata_json text not null,
  created_at text not null,
  foreign key (content_id) references content(id)
);

create index if not exists editorial_queue_status_idx on editorial_queue(status);
create index if not exists review_queue_status_idx on review_queue(status);
create index if not exists publication_queue_status_idx on publication_queue(status);
create index if not exists audit_content_idx on content_audit_events(content_id);
