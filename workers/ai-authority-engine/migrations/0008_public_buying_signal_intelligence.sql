create table if not exists signal_sources (
  id text primary key,
  name text not null,
  category text not null,
  endpoint text not null,
  enabled integer not null,
  metadata_json text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists organizations (
  id text primary key,
  name text not null,
  website_url text,
  industry text,
  location text,
  company_size text,
  technologies_json text not null,
  metadata_json text not null,
  created_at text not null,
  updated_at text not null
);

create table if not exists buying_signals (
  id text primary key,
  source_id text not null,
  organization_id text not null,
  event_type text not null,
  title text not null,
  summary text not null,
  url text not null,
  published_at text not null,
  detected_at text not null,
  location text,
  technologies_json text not null,
  confidence_score real not null,
  raw_json text not null,
  foreign key (source_id) references signal_sources(id),
  foreign key (organization_id) references organizations(id)
);

create table if not exists opportunities (
  id text primary key,
  organization_id text not null,
  primary_signal_id text not null,
  status text not null,
  title text not null,
  explanation text not null,
  recommended_services_json text not null,
  created_at text not null,
  updated_at text not null,
  foreign key (organization_id) references organizations(id),
  foreign key (primary_signal_id) references buying_signals(id)
);

create table if not exists opportunity_scores (
  id text primary key,
  opportunity_id text not null,
  score real not null,
  factors_json text not null,
  explanation text not null,
  created_at text not null,
  foreign key (opportunity_id) references opportunities(id)
);

create table if not exists ingestion_runs (
  id text primary key,
  status text not null,
  started_at text not null,
  completed_at text,
  source_count integer not null,
  signal_count integer not null,
  opportunity_count integer not null,
  error_message text
);

create index if not exists signal_sources_category_idx on signal_sources(category);
create index if not exists organizations_name_idx on organizations(name);
create index if not exists buying_signals_detected_idx on buying_signals(detected_at);
create index if not exists buying_signals_organization_idx on buying_signals(organization_id);
create index if not exists opportunities_organization_idx on opportunities(organization_id);
create index if not exists opportunity_scores_score_idx on opportunity_scores(score);
create index if not exists ingestion_runs_started_idx on ingestion_runs(started_at);
