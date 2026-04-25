# CivicLens — College Park Civic Transparency Dashboard

A public-facing web app that makes College Park's $31.5M FY27 proposed budget and recent council decisions legible to residents and UMD students — in English and Spanish.

Built with **Next.js 16 (App Router)**, TypeScript, Tailwind CSS, and Chart.js.

---

## What it does

The dashboard answers two questions a resident can't easily answer today:

1. **Where does the money go?** A $31.5M operating budget broken down by department and revenue source, with the per-resident frame ($927/year) front and center.
2. **What is the council deciding right now?** Recent and upcoming council items in plain English, each tagged to the budget category it touches.

The connective tissue between the two — clicking a budget department filters the council items below it, and vice versa — is the unique value prop. Most "civic dashboards" show one or the other in isolation.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## What's on the page

### 1. Hero
- Headline: "Your city budget, in plain English."
- Four stat tiles: `$927/resident`, `33.5¢/$100` tax rate (half the PG County average), `5 council items this month`, `~40,000 UMD students`
- Amber badge: "Proposed · open for public comment until May 31"
- EN | ES language toggle in the nav bar

### 2. Budget panel — "Where your $927 goes"
- Interactive donut chart (Chart.js) with two views: **By Department** and **By Revenue Source**
- Click a department → highlights the slice, shows a description card, filters the capital projects grid, and filters the council items section
- Source PDF linked directly to the official FY27 proposed budget
- Departments (verified FY27 proposed):
  - General Government & Admin — $9.78M (34%)
  - Public Works — $8.65M (30%)
  - Public Services — $6.68M (24%)
  - Youth, Family & Senior Services — $2.48M (9%)
  - Planning & Community Development — $0.82M (3%)
- Revenue sources: Property Taxes (52%), Other Taxes (22%), Fines & Fees (14%), Licenses/Charges/Misc (11%)

### 3. Capital projects
Three cards showing FY27 funding for major capital lines:
- Complete & Green Streets — $2.18M (FY27) / $9.0M cumulative through FY31
- Pavement Management Plan — $925K (FY27) / $14.5M cumulative through FY31
- North College Park Community Center — $1.25M (most spending in FY26)

### 4. Town & Gown
Three cards explaining the city's relationship with UMD as a stakeholder layer:
- **Two budgets, one zip code** — UMD's $2.98B vs. the city's $31.5M (≈95×)
- **Who pays city property tax** — ~50% of households are renters; students contribute indirectly through rent
- **Police coverage isn't uniform** — UMPD has concurrent jurisdiction in some areas; Oak Springs, Daniels Park, and College Park Woods rely entirely on the PG County Police contract

### 5. What's new in FY27
Plain-English changelog: 5 new positions, 3% COLA, stop-sign camera revenue, tax rate held flat, no fund balance appropriation.

### 6. Council panel — "This week at City Hall"
Five accordion cards with status badges (Upcoming / Decided / Under Study) and budget-category tags. Each "Official Agenda" link points to the **specific meeting agenda PDF** on collegeparkmd.gov, not the general agenda index.

Council items:
- PG County Police Services Contract Renewal
- Complete & Green Streets Phase 2 — Bid Award
- FY27 Budget — Introduction & Public Hearing
- Duvall Field Renovation — Design Approval
- Accessory Dwelling Unit Zoning Ordinance

**Filter chips:** "All items" and "🎓 Students". The Students filter shows the three items that directly affect students and surfaces an inline plain-language explanation under each one.

### 7. Language toggle (EN | ES)
A toggle in the nav bar switches the entire UI between English and Spanish — including all headings, descriptions, department names, council item titles/summaries/details, status badges, and the Town & Gown section.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Home page (hero, nav, bridge banner, footer)
│   ├── bills/page.tsx          # Coming soon
│   ├── dashboard/page.tsx      # Coming soon
│   ├── feed/page.tsx           # Coming soon
│   ├── meetings/page.tsx       # Coming soon
│   └── verify/page.tsx         # Blockchain source verification (scaffolded)
├── components/dashboard/
│   ├── BudgetChart.tsx         # Chart.js doughnut chart
│   ├── BudgetSection.tsx       # Budget panel, capital projects, Town & Gown
│   └── CouncilSection.tsx      # Council accordion, student filter
├── context/
│   └── LanguageContext.tsx     # EN/ES language context + useLanguage() hook
├── lib/
│   ├── data.ts                 # All FY27 budget and council data
│   ├── translations.ts         # EN and ES strings for every UI element
│   └── supabase/               # Supabase client (scaffolded, not yet wired to UI)
└── i18n/
    └── request.ts              # next-intl setup (en/es/zh via cookie)
```

---

## Data sources

| Item | Source |
|------|--------|
| FY27 proposed budget figures | [City of College Park FY27 Proposed Budget PDF](https://www.collegeparkmd.gov/DocumentCenter/View/7603/FY27-Budget-Proposed-) — dated March 20, 2026 |
| Property tax rate comparison | College Park 33.5¢/$100; PG County average 63.27¢/$100 |
| Council items & agenda links | [collegeparkmd.gov AgendaCenter](https://www.collegeparkmd.gov/AgendaCenter) |
| UMD operating budget | [finance.umd.edu/budget/facts-and-figures/operating-budget](https://finance.umd.edu/budget/facts-and-figures/operating-budget) |
| Police coverage gap | Reporting on April 2026 council public safety study |

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16, App Router, `"use client"` components |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Chart.js v4 (tree-shaken: `ArcElement`, `DoughnutController`, `Tooltip`, `Legend`) |
| i18n | React context (`LanguageContext`) for runtime EN/ES toggle; next-intl scaffolded for cookie-based locale |
| Database | Supabase (typed schema ready, not yet wired to UI) |
| Fonts | Fraunces (serif headings), Source Serif 4 (body) via Google Fonts |

---

## Design direction

Editorial newspaper, not SaaS dashboard:

- Cream `#f5f0e8` background, deep ink `#1a1a1a` text, forest green `#2d6a4f` accent
- Fraunces serif for headlines (signals trust, civic seriousness)
- Generous whitespace, real typographic hierarchy
- No purple gradients, no dark mode, no glassmorphism
- The aesthetic itself signals "public document," not "product"

---

## What's intentionally not included (yet)

- FY27 priority survey alignment ("residents ranked X #1, here's what we currently spend on X")
- "You said / We did" outcomes tracker
- Council Zoom transcript ingestion + Claude API summarization
- Email/SMS topic subscriptions
- Chinese (中文) UI translation (scaffolded in next-intl, strings not yet written)
- District-level filtering

---

## Disclaimer

This is an independent civic project and is not affiliated with the City of College Park. All financial data is sourced from publicly available city documents. The FY27 budget is **proposed** and subject to change before final adoption (required by May 31).
