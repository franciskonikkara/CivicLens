-- ============================================================
-- Civic Lens — Supabase Schema
-- Run this in the Supabase SQL editor after creating a project
-- ============================================================

-- Enable pgvector for embedding search
create extension if not exists vector;

-- ── DOCUMENTS ────────────────────────────────────────────────
-- Source documents (PDFs, agendas, ordinances) with provenance
create table public.documents (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  source_url    text not null,
  ipfs_cid      text,                     -- IPFS content identifier
  sha256_hash   text,                     -- hex SHA-256 of original file
  onchain_tx    text,                     -- Polygon transaction hash
  jurisdiction  text not null default 'college-park-md',
  doc_type      text,                     -- 'ordinance' | 'agenda' | 'staff-report' | 'budget'
  created_at    timestamptz not null default now()
);

-- ── MEETINGS ─────────────────────────────────────────────────
create table public.meetings (
  id            uuid primary key default gen_random_uuid(),
  date          date not null,
  title         text not null,
  video_url     text,
  transcript    text,                     -- raw AssemblyAI output (JSON string)
  summary_en    text,
  summary_es    text,
  summary_zh    text,
  decisions     jsonb,                    -- [{title, passed, votes: {for,against,abstain}}]
  document_id   uuid references public.documents(id),
  created_at    timestamptz not null default now()
);

-- ── BILLS ────────────────────────────────────────────────────
create table public.bills (
  id            uuid primary key default gen_random_uuid(),
  external_id   text unique,             -- e.g. ordinance number "25-O-04"
  title         text not null,
  status        text not null,           -- 'upcoming' | 'decided' | 'under-study' | 'passed' | 'failed'
  jurisdiction  text not null default 'college-park-md',
  full_text     text,
  summaries     jsonb,                   -- {en: "...", es: "...", zh: "..."}
  arguments_for    jsonb,               -- [{point: "...", strength: 1-5}]
  arguments_against jsonb,
  fiscal_impact text,
  introduced_at date,
  decided_at    date,
  document_id   uuid references public.documents(id),
  created_at    timestamptz not null default now()
);

-- ── CHUNKS (vector search corpus) ────────────────────────────
create table public.chunks (
  id            uuid primary key default gen_random_uuid(),
  document_id   uuid references public.documents(id) on delete cascade,
  meeting_id    uuid references public.meetings(id) on delete cascade,
  bill_id       uuid references public.bills(id) on delete cascade,
  content       text not null,
  embedding     vector(1536),            -- OpenAI / Voyage AI dimension
  chunk_index   int,
  created_at    timestamptz not null default now()
);

-- Index for cosine similarity search
create index chunks_embedding_idx
  on public.chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ── USERS (extends Supabase auth.users) ──────────────────────
create table public.profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  language_preference text not null default 'en',  -- 'en' | 'es' | 'zh'
  district            text,                         -- e.g. 'district-1'
  watchlist           text[] default '{}',          -- array of bill/meeting IDs
  notification_email  boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── COUNCIL MEMBERS ──────────────────────────────────────────
create table public.council_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  district    text,
  title       text,
  photo_url   text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ── VOTES ────────────────────────────────────────────────────
create table public.votes (
  id                uuid primary key default gen_random_uuid(),
  meeting_id        uuid references public.meetings(id),
  bill_id           uuid references public.bills(id),
  council_member_id uuid references public.council_members(id),
  vote              text not null,   -- 'yes' | 'no' | 'abstain' | 'absent'
  created_at        timestamptz not null default now()
);

-- ── RLS POLICIES ─────────────────────────────────────────────
-- Public read on civic data
alter table public.documents        enable row level security;
alter table public.meetings         enable row level security;
alter table public.bills            enable row level security;
alter table public.chunks           enable row level security;
alter table public.council_members  enable row level security;
alter table public.votes            enable row level security;
alter table public.profiles         enable row level security;

create policy "Public read documents"       on public.documents       for select using (true);
create policy "Public read meetings"        on public.meetings        for select using (true);
create policy "Public read bills"           on public.bills           for select using (true);
create policy "Public read chunks"          on public.chunks          for select using (true);
create policy "Public read council_members" on public.council_members for select using (true);
create policy "Public read votes"           on public.votes           for select using (true);

-- Profiles: users can only read/write their own row
create policy "Own profile read"   on public.profiles for select using (auth.uid() = id);
create policy "Own profile update" on public.profiles for update using (auth.uid() = id);
create policy "Own profile insert" on public.profiles for insert with check (auth.uid() = id);

-- ── HELPER FUNCTION: vector similarity search ────────────────
create or replace function match_chunks (
  query_embedding vector(1536),
  match_count     int default 5
)
returns table (
  id          uuid,
  content     text,
  document_id uuid,
  similarity  float
)
language sql stable
as $$
  select
    id,
    content,
    document_id,
    1 - (embedding <=> query_embedding) as similarity
  from public.chunks
  order by embedding <=> query_embedding
  limit match_count;
$$;
