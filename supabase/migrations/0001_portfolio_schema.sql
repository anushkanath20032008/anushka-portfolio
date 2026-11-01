-- Portfolio content schema. Public, read-only: anon may SELECT published rows; nobody writes from the browser.

create table if not exists public.profile (
  id          int primary key default 1 check (id = 1),
  name        text not null,
  headline    text not null,
  positioning text not null,
  summary     text not null,
  email       text not null,
  linkedin    text not null,
  location    text not null,
  resume_url  text
);

create table if not exists public.folders (
  slug      text primary key,
  label     text not null,
  icon_key  text not null,
  sort      int  not null default 0,
  source    text not null check (source in ('master-cv', 'added')),
  published boolean not null default true
);

create table if not exists public.entries (
  id          text primary key,
  folder_slug text not null references public.folders (slug) on update cascade on delete cascade,
  slug        text not null,
  title       text not null,
  org         text,
  role        text,
  period      text,
  location    text,
  kind        text,
  status      text,
  sort        int  not null default 0,
  body        jsonb not null default '{}'::jsonb,
  published   boolean not null default true,
  unique (folder_slug, slug)
);
create index if not exists entries_folder_idx on public.entries (folder_slug, sort);

create table if not exists public.metrics (
  id        bigint generated always as identity primary key,
  label     text not null,
  value     text not null,
  sublabel  text,
  sort      int  not null default 0,
  published boolean not null default true
);

create table if not exists public.now_items (
  id          text primary key,
  label       text not null,
  short_label text,
  kind        text not null check (kind in ('building', 'role', 'note')),
  status_text text not null,
  progress    int check (progress between 0 and 100),
  detail      text,
  sort        int not null default 0,
  published   boolean not null default true
);

create table if not exists public.skills (
  id        bigint generated always as identity primary key,
  "group"   text not null check ("group" in ('business', 'technical')),
  name      text not null,
  sort      int  not null default 0,
  published boolean not null default true
);

-- Row Level Security: public read of published rows only. No insert/update/delete policies exist,
-- so writes are possible only with the service role or from the Supabase dashboard / migrations.
alter table public.profile   enable row level security;
alter table public.folders   enable row level security;
alter table public.entries   enable row level security;
alter table public.metrics   enable row level security;
alter table public.now_items enable row level security;
alter table public.skills    enable row level security;

create policy "public read profile"   on public.profile   for select to anon, authenticated using (true);
create policy "public read folders"   on public.folders   for select to anon, authenticated using (published);
create policy "public read entries"   on public.entries   for select to anon, authenticated using (published);
create policy "public read metrics"   on public.metrics   for select to anon, authenticated using (published);
create policy "public read now_items" on public.now_items for select to anon, authenticated using (published);
create policy "public read skills"    on public.skills    for select to anon, authenticated using (published);
