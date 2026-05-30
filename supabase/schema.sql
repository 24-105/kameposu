create table if not exists public.scores (
  id bigint generated always as identity primary key,
  date_key date not null,
  random_name text not null,
  score integer not null,
  map_seed bigint not null,
  deliveries integer not null default 0,
  combo integer not null default 0,
  collisions integer not null default 0,
  near_misses integer not null default 0,
  item_pickups jsonb not null default '{}'::jsonb,
  score_breakdown jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint scores_random_name_length check (
    char_length(random_name) between 2 and 16
  ),
  constraint scores_score_range check (
    score between 0 and 999999
  ),
  constraint scores_map_seed_range check (
    map_seed between 0 and 4294967295
  ),
  constraint scores_deliveries_range check (
    deliveries between 0 and 80
  ),
  constraint scores_combo_range check (
    combo between 0 and 80
  ),
  constraint scores_collisions_range check (
    collisions between 0 and 120
  ),
  constraint scores_near_misses_range check (
    near_misses between 0 and 200
  ),
  constraint scores_item_pickups_object check (
    jsonb_typeof(item_pickups) = 'object'
  ),
  constraint scores_score_breakdown_object check (
    jsonb_typeof(score_breakdown) = 'object'
  )
);

comment on table public.scores is
  'Kameposu ranking scores. Does not store user ids, IP addresses, User-Agent values, device ids, or browser fingerprints.';

create index if not exists scores_date_score_created_idx
  on public.scores (date_key, score desc, created_at asc);

create index if not exists scores_created_at_idx
  on public.scores (created_at desc);

alter table public.scores enable row level security;

revoke all on table public.scores from anon, authenticated;

do $$
begin
  if exists (
    select 1
    from pg_class
    where relkind = 'S'
      and relnamespace = 'public'::regnamespace
      and relname = 'scores_id_seq'
  ) then
    revoke all on sequence public.scores_id_seq from anon, authenticated;
  end if;
end
$$;
