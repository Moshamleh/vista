create table if not exists visibility_snapshots (
  id text primary key,
  status text not null,
  aggregate_score real not null,
  provider_results_json text not null,
  metrics_json text not null,
  created_at text not null
);

create table if not exists visibility_scores (
  id text primary key,
  snapshot_id text not null,
  metric text not null,
  score real not null,
  daily_change real not null,
  weekly_change real not null,
  monthly_change real not null,
  created_at text not null,
  foreign key (snapshot_id) references visibility_snapshots(id)
);

create table if not exists visibility_recommendations (
  id text primary key,
  snapshot_id text not null,
  content_id text,
  severity text not null,
  category text not null,
  message text not null,
  action text not null,
  created_at text not null,
  foreign key (snapshot_id) references visibility_snapshots(id)
);

create table if not exists validation_runs (
  id text primary key,
  status text not null,
  started_at text not null,
  completed_at text,
  provider_count integer not null,
  error_message text
);

create index if not exists visibility_snapshots_created_idx on visibility_snapshots(created_at);
create index if not exists visibility_scores_metric_idx on visibility_scores(metric, created_at);
create index if not exists visibility_recommendations_snapshot_idx on visibility_recommendations(snapshot_id);
create index if not exists validation_runs_started_idx on validation_runs(started_at);
