-- ─────────────────────────────────────────────────────────────
-- NOMOS ESTÚDIO — Schema Supabase
-- Execute este arquivo no SQL Editor do seu projeto Supabase
-- ─────────────────────────────────────────────────────────────

-- Habilita extensão para UUIDs
create extension if not exists "uuid-ossp";

-- ── PROJETOS (portfólio) ──────────────────────────────────────
create table if not exists projects (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text,
  category        text,
  status          text default 'draft',
  is_featured     boolean default false,
  display_order   int default 0,
  cover_image_url text,
  gallery_images  jsonb default '[]',
  before_image_url text,
  after_image_url  text,
  youtube_videos  jsonb default '[]',
  -- campos específicos
  year            text,
  description     text,
  tags            text,
  link            text,
  created_at      timestamptz default now()
);

-- ── SERVIÇOS ─────────────────────────────────────────────────
create table if not exists services (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text,
  category        text,
  status          text default 'draft',
  is_featured     boolean default false,
  display_order   int default 0,
  cover_image_url text,
  gallery_images  jsonb default '[]',
  before_image_url text,
  after_image_url  text,
  youtube_videos  jsonb default '[]',
  -- campos específicos
  subtitle        text,
  description     text,
  deliverables    text,
  duration        text,
  investment      text,
  created_at      timestamptz default now()
);

-- ── PROCESSO ─────────────────────────────────────────────────
create table if not exists process_steps (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text,
  category        text,
  status          text default 'published',
  is_featured     boolean default false,
  display_order   int default 0,
  cover_image_url text,
  gallery_images  jsonb default '[]',
  before_image_url text,
  after_image_url  text,
  youtube_videos  jsonb default '[]',
  -- campos específicos
  step_number     text,
  subtitle        text,
  description     text,
  created_at      timestamptz default now()
);

-- ── EQUIPE ───────────────────────────────────────────────────
create table if not exists team (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text,
  category        text,
  status          text default 'published',
  is_featured     boolean default false,
  display_order   int default 0,
  cover_image_url text,
  gallery_images  jsonb default '[]',
  before_image_url text,
  after_image_url  text,
  youtube_videos  jsonb default '[]',
  -- campos específicos
  role            text,
  bio             text,
  instagram       text,
  linkedin        text,
  created_at      timestamptz default now()
);

-- ── DEPOIMENTOS ──────────────────────────────────────────────
create table if not exists testimonials (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text,
  category        text,
  status          text default 'published',
  is_featured     boolean default false,
  display_order   int default 0,
  cover_image_url text,
  gallery_images  jsonb default '[]',
  before_image_url text,
  after_image_url  text,
  youtube_videos  jsonb default '[]',
  -- campos específicos
  author_role     text,
  rating          text,
  text            text,
  source          text,
  created_at      timestamptz default now()
);

-- ── FAQ ──────────────────────────────────────────────────────
create table if not exists faq (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text,
  category        text,
  status          text default 'published',
  is_featured     boolean default false,
  display_order   int default 0,
  cover_image_url text,
  gallery_images  jsonb default '[]',
  before_image_url text,
  after_image_url  text,
  youtube_videos  jsonb default '[]',
  -- campos específicos
  question        text,
  answer          text,
  created_at      timestamptz default now()
);

-- ── LEADS / CONTATOS ─────────────────────────────────────────
create table if not exists leads (
  id          uuid primary key default uuid_generate_v4(),
  name        text,
  email       text,
  phone       text,
  subject     text,
  message     text,
  status      text default 'new',
  created_at  timestamptz default now()
);

-- ── CONFIGURAÇÕES DO SITE ────────────────────────────────────
create table if not exists site_settings (
  key         text primary key,
  value       jsonb,
  updated_at  timestamptz default now()
);

-- ── RLS (Row Level Security) ─────────────────────────────────
-- Leitura pública (frontend React lê sem autenticação)
alter table projects      enable row level security;
alter table services      enable row level security;
alter table process_steps enable row level security;
alter table team          enable row level security;
alter table testimonials  enable row level security;
alter table faq           enable row level security;
alter table leads         enable row level security;
alter table site_settings enable row level security;

-- Qualquer um pode LER registros publicados
create policy "Leitura publica" on projects      for select using (status = 'published');
create policy "Leitura publica" on services      for select using (status = 'published');
create policy "Leitura publica" on process_steps for select using (true);
create policy "Leitura publica" on team          for select using (status = 'published');
create policy "Leitura publica" on testimonials  for select using (status = 'published');
create policy "Leitura publica" on faq           for select using (status = 'published');
create policy "Leitura publica" on site_settings for select using (true);

-- Qualquer um pode INSERIR leads (formulário do site)
create policy "Inserir lead" on leads for insert with check (true);

-- Apenas admins autenticados podem CRUD completo
create policy "Admin total" on projects      for all using (auth.role() = 'authenticated');
create policy "Admin total" on services      for all using (auth.role() = 'authenticated');
create policy "Admin total" on process_steps for all using (auth.role() = 'authenticated');
create policy "Admin total" on team          for all using (auth.role() = 'authenticated');
create policy "Admin total" on testimonials  for all using (auth.role() = 'authenticated');
create policy "Admin total" on faq           for all using (auth.role() = 'authenticated');
create policy "Admin total" on leads         for all using (auth.role() = 'authenticated');
create policy "Admin total" on site_settings for all using (auth.role() = 'authenticated');

-- ── STORAGE ──────────────────────────────────────────────────
-- Crie manualmente no painel: Storage > New bucket > "nomos-images" (public)
