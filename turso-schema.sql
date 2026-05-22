-- ─────────────────────────────────────────────────────────────────────────────
-- NOMOS ESTÚDIO — Schema Turso (SQLite)
-- Execute no Turso Shell: turso db shell <seu-banco> < turso-schema.sql
-- Ou cole no painel: https://turso.tech → seu banco → Shell
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT,
  category         TEXT,
  status           TEXT DEFAULT 'draft',
  is_featured      INTEGER DEFAULT 0,
  display_order    INTEGER DEFAULT 0,
  cover_image_url  TEXT,
  gallery_images   TEXT DEFAULT '[]',
  before_image_url TEXT,
  after_image_url  TEXT,
  youtube_videos   TEXT DEFAULT '[]',
  year             TEXT,
  description      TEXT,
  tags             TEXT,
  link             TEXT,
  created_at       TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT,
  category         TEXT,
  status           TEXT DEFAULT 'draft',
  is_featured      INTEGER DEFAULT 0,
  display_order    INTEGER DEFAULT 0,
  cover_image_url  TEXT,
  gallery_images   TEXT DEFAULT '[]',
  before_image_url TEXT,
  after_image_url  TEXT,
  youtube_videos   TEXT DEFAULT '[]',
  subtitle         TEXT,
  description      TEXT,
  deliverables     TEXT,
  duration         TEXT,
  investment       TEXT,
  created_at       TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS process_steps (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT,
  category         TEXT,
  status           TEXT DEFAULT 'published',
  is_featured      INTEGER DEFAULT 0,
  display_order    INTEGER DEFAULT 0,
  cover_image_url  TEXT,
  gallery_images   TEXT DEFAULT '[]',
  before_image_url TEXT,
  after_image_url  TEXT,
  youtube_videos   TEXT DEFAULT '[]',
  step_number      TEXT,
  subtitle         TEXT,
  description      TEXT,
  created_at       TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS team (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT,
  category         TEXT,
  status           TEXT DEFAULT 'published',
  is_featured      INTEGER DEFAULT 0,
  display_order    INTEGER DEFAULT 0,
  cover_image_url  TEXT,
  gallery_images   TEXT DEFAULT '[]',
  before_image_url TEXT,
  after_image_url  TEXT,
  youtube_videos   TEXT DEFAULT '[]',
  role             TEXT,
  bio              TEXT,
  instagram        TEXT,
  linkedin         TEXT,
  created_at       TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT,
  category         TEXT,
  status           TEXT DEFAULT 'published',
  is_featured      INTEGER DEFAULT 0,
  display_order    INTEGER DEFAULT 0,
  cover_image_url  TEXT,
  gallery_images   TEXT DEFAULT '[]',
  before_image_url TEXT,
  after_image_url  TEXT,
  youtube_videos   TEXT DEFAULT '[]',
  author_role      TEXT,
  rating           TEXT,
  text             TEXT,
  source           TEXT,
  created_at       TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS faq (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT,
  category         TEXT,
  status           TEXT DEFAULT 'published',
  is_featured      INTEGER DEFAULT 0,
  display_order    INTEGER DEFAULT 0,
  cover_image_url  TEXT,
  gallery_images   TEXT DEFAULT '[]',
  before_image_url TEXT,
  after_image_url  TEXT,
  youtube_videos   TEXT DEFAULT '[]',
  question         TEXT,
  answer           TEXT,
  created_at       TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS leads (
  id         TEXT PRIMARY KEY,
  name       TEXT,
  email      TEXT,
  phone      TEXT,
  subject    TEXT,
  message    TEXT,
  status     TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);
