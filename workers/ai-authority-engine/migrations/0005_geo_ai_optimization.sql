create table if not exists entity_graph (
  id text primary key,
  entity_type text not null,
  name text not null,
  slug text not null unique,
  synonyms_json text not null,
  relationships_json text not null,
  confidence_score real not null,
  source_content_ids_json text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists schema_documents (
  id text primary key,
  content_id text not null,
  schema_type text not null,
  json_ld text not null,
  checksum text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists geo_reports (
  id text primary key,
  content_id text not null,
  status text not null,
  score real not null,
  validation_json text not null,
  metadata_json text not null,
  ai_resources_json text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists internal_link_graph (
  id text primary key,
  source_content_id text not null,
  target_content_id text not null,
  relation_type text not null,
  anchor_text text not null,
  confidence_score real not null,
  created_at text not null
);

create table if not exists optimization_history (
  id text primary key,
  content_id text not null,
  action text not null,
  score real not null,
  details_json text not null,
  created_at text not null
);

create index if not exists entity_graph_type_idx on entity_graph(entity_type);
create index if not exists schema_documents_content_idx on schema_documents(content_id);
create index if not exists geo_reports_content_idx on geo_reports(content_id);
create index if not exists internal_link_graph_source_idx on internal_link_graph(source_content_id);
create index if not exists optimization_history_content_idx on optimization_history(content_id);
