# CivicLens

**Civic intelligence for College Park — in plain English, Spanish, and Chinese.**

Live site: **[https://civiclens.vercel.app](https://civiclens.vercel.app)**

CivicLens makes College Park's $31.5M FY2027 budget, recent council decisions, and local legislation legible to every resident and UMD student — with AI-powered Q&A, trilingual summaries, and cryptographic document verification.

---

## Features

| Feature | Description |
|---------|-------------|
| **Budget Dashboard** | Interactive donut chart breaking down the $31.5M operating budget by department and revenue source |
| **Council Meetings** | Meeting summaries in EN/ES/ZH, recorded votes per member, YouTube embeds, and AI Q&A |
| **Legislation Tracker** | Bills with status badges, fiscal impact, for/against arguments, and source document links |
| **Community Feed** | Unified timeline of meetings and bills with language and district filters |
| **Analytics Dashboard** | Recharts visualizations — vote breakdowns, bill status distribution, meeting activity over time |
| **Document Verification** | Drag-and-drop or file-picker SHA-256 verification checked against the Supabase registry |
| **AI Q&A** | Ask any question about a meeting or bill; Claude answers using RAG over seeded chunks with source citations |
| **Multilingual** | EN / ES / ZH toggle on every page; meeting summaries and bill descriptions translated natively |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (Postgres + pgvector for semantic search) |
| AI | Anthropic Claude (`claude-sonnet-4-5`) via RAG pipeline |
| Charts | Recharts (dashboard), Chart.js (budget donut) |
| Auth / RLS | Supabase Row Level Security |
| Fonts | Fraunces (headings), Source Serif 4 (body) |
| Deployment | Vercel |
| CI | GitHub Actions |

---

## Local development

```bash
# 1. Clone and install
git clone https://github.com/frnki/CivicLens.git
cd CivicLens
npm ci

# 2. Copy env vars
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, ANTHROPIC_API_KEY

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project Settings > API |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |

---

## Database setup

1. Open your Supabase project's SQL editor.
2. Run `supabase/schema.sql` — creates all tables, the `match_chunks` pgvector function, and RLS policies.
3. Run `supabase/seed.sql` — loads 8 council members, 3 meetings (EN/ES/ZH summaries), 3 bills, 16 vote records, 3 documents, and 7 RAG chunks.

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/frnki/CivicLens)

1. Import the repo in Vercel.
2. Add the three environment variables above in **Project > Settings > Environment Variables**.
3. Deploy — Vercel auto-detects Next.js, no extra config needed.

---

## Document verification demo

The `/verify` page lets anyone confirm a city document hasn't been altered:

1. Download the FY2027 Budget PDF (linked on the verify page).
2. Drag it onto the drop zone **or** click **Choose file**.
3. The page computes a SHA-256 hash in-browser (Web Crypto API — nothing is uploaded).
4. The hash is checked against the Supabase `documents` table.
5. A green "Verified" badge confirms the document is unaltered.

Reference hash for `CP-Ordinance-25-O-07-FY27-Budget.pdf`:
```
68ab4322a859acf0b2509d707a73f0a92f2c800377b4ffe736988e8ca0cbb469
```

---

## Project structure

```
src/
├── app/
│   ├── api/ask/route.ts          # Claude RAG Q&A endpoint
│   ├── bills/                    # Bill list + detail pages
│   ├── dashboard/                # Analytics dashboard (Recharts)
│   ├── feed/                     # Community feed
│   ├── meetings/                 # Meeting list + detail pages
│   ├── verify/                   # Document verification
│   └── page.tsx                  # Home (hero, budget chart, council)
├── components/
│   ├── NavBar.tsx                # Shared sticky nav
│   ├── QandA.tsx                 # AI Q&A widget
│   └── dashboard/               # BudgetChart, BudgetSection, CouncilSection
├── context/
│   └── LanguageContext.tsx       # EN/ES/ZH runtime toggle
├── lib/
│   ├── data.ts                   # FY2027 budget figures
│   ├── translations.ts           # UI strings
│   └── supabase/                 # Browser + server Supabase clients
supabase/
├── schema.sql                    # Tables, pgvector, RLS
└── seed.sql                      # Demo data
```

---

## Data sources

| Item | Source |
|------|--------|
| FY2027 proposed budget | City of College Park — March 20, 2026 |
| Council members & votes | collegeparkmd.gov |
| Legislation text | City Clerk public records |

---

## Disclaimer

Independent civic project. Not affiliated with the City of College Park. All data sourced from publicly available city documents. The FY2027 budget is proposed and subject to change.
