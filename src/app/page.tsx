"use client";

import { useState } from "react";
import Link from "next/link";
import BudgetSection from "@/components/dashboard/BudgetSection";
import CouncilSection from "@/components/dashboard/CouncilSection";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="bg-ink/95 backdrop-blur sticky top-0 z-50 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-green-400 font-serif font-bold text-lg tracking-tight">
              Civic<span className="text-cream">Lens</span>
            </span>
            <span className="hidden sm:inline text-stone-600 text-xs">College Park, MD</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-stone-400">
            <Link href="#budget" className="hover:text-cream transition-colors">Budget</Link>
            <Link href="#council" className="hover:text-cream transition-colors">Council</Link>
            <Link href="/feed" className="hover:text-cream transition-colors">My Feed</Link>
            <Link href="/dashboard" className="hover:text-cream transition-colors">Dashboard</Link>
            <Link
              href="/feed"
              className="ml-2 px-3 py-1.5 bg-forest text-cream rounded-full text-xs font-medium hover:bg-forest-light transition-colors"
            >
              Get started →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <header className="bg-ink text-cream py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-green-400 font-semibold mb-4">
            College Park, Maryland · FY2026
          </p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold leading-tight mb-6 max-w-3xl">
            Your city budget,
            <br />
            <span className="text-green-400">in plain English.</span>
          </h1>
          <p className="text-stone-300 text-xl max-w-2xl mb-10 leading-relaxed">
            $29.6 million. 34,000 residents. One place to see where the money goes and what the
            council is deciding right now.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 text-sm text-stone-400 mb-10">
            <div>
              <span className="text-3xl font-serif font-bold text-cream">$870</span>
              <p className="mt-0.5">per resident / year</p>
            </div>
            <div className="w-px bg-stone-700" />
            <div>
              <span className="text-3xl font-serif font-bold text-cream">33.5¢</span>
              <p className="mt-0.5">per $100 — half the county avg</p>
            </div>
            <div className="w-px bg-stone-700" />
            <div>
              <span className="text-3xl font-serif font-bold text-cream">5</span>
              <p className="mt-0.5">council items this month</p>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: "🌐", label: "English · Español · 中文" },
              { icon: "🔗", label: "On-chain source verification" },
              { icon: "🤖", label: "AI explanations with citations" },
              { icon: "🗳️", label: "Ballot measure decoder" },
            ].map((f) => (
              <span
                key={f.label}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-800 text-stone-300 rounded-full text-xs"
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#budget"
              className="inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-green-300"
            >
              Explore the budget ↓
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-cream rounded-full text-sm font-medium hover:bg-forest-light transition-colors"
            >
              My personalized feed →
            </Link>
          </div>
        </div>
      </header>

      {/* ── BUDGET SECTION ──────────────────────────────────── */}
      <BudgetSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* ── BRIDGE BANNER ───────────────────────────────────── */}
      {activeCategory && (
        <div className="bg-forest/10 border-y border-forest/20 py-3 px-4 text-center">
          <p className="text-forest text-sm font-medium">
            Showing budget ↕ council connection — council items in this category are highlighted below
          </p>
        </div>
      )}

      {/* ── COUNCIL SECTION ─────────────────────────────────── */}
      <CouncilSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* ── PLATFORM TEASER ─────────────────────────────────── */}
      <section className="py-20 px-4 bg-ink text-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-green-400 font-semibold mb-4">
            Coming in the full platform
          </p>
          <h2 className="text-4xl font-serif font-bold mb-4 max-w-2xl">
            Civic intelligence for every resident
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mb-12">
            The dashboard above is just the beginning. Civic Lens is building the full stack of
            civic transparency tools for College Park.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                href: "/feed",
                icon: "📬",
                title: "Personalized Feed",
                desc: "Items affecting your district, in your language, with morning-after meeting recaps.",
              },
              {
                href: "/bills",
                icon: "🗳️",
                title: "Bill Explainer",
                desc: "Steel-manned for/against, cost breakdown, and the council meetings that produced each bill.",
              },
              {
                href: "/meetings",
                icon: "🎬",
                title: "Meeting Decoder",
                desc: "AI transcript summaries with per-member vote breakdowns and video timestamped links.",
              },
              {
                href: "/dashboard",
                icon: "📊",
                title: "Accountability Dashboard",
                desc: "Council voting records, attendance trends, and geographic distribution of decisions.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group p-5 bg-stone-900 rounded-xl border border-stone-800 hover:border-forest/50 transition-colors"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-serif font-bold text-cream text-lg mb-2 group-hover:text-green-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{card.desc}</p>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/feed"
              className="px-5 py-2.5 bg-forest text-cream rounded-full font-medium hover:bg-forest-light transition-colors"
            >
              Open my feed →
            </Link>
            <div className="flex items-center gap-2 text-stone-500 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available in English · Español · 中文
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCKCHAIN TRUST SECTION ────────────────────────── */}
      <section className="py-16 px-4 bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-3">
              Source Verification
            </p>
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Every summary is verifiable
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              When we summarize a city document, we hash it, store it on IPFS, and register the hash
              on the Polygon blockchain. Anyone can verify that our AI summarized the exact document
              the city published — not an edited version.
            </p>
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 text-forest font-medium hover:underline"
            >
              Try verifying a source document →
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-6 font-mono text-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-500">
              <span className="text-green-600">✓</span>
              <span>Document: FY26 Budget Ordinance 25-O-04</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <span className="text-green-600">✓</span>
              <span className="break-all">SHA-256: a3f9...d12e</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <span className="text-green-600">✓</span>
              <span>IPFS: ipfs://Qm...</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <span className="text-green-600">✓</span>
              <span>On-chain: Polygon · block 45,812,003</span>
            </div>
            <div className="border-t border-stone-100 pt-3 text-green-700 font-semibold">
              ✓ Document integrity verified
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-stone-200 py-10 px-4 text-center">
        <p className="text-stone-500 text-sm max-w-2xl mx-auto">
          Data sourced from College Park FY26 Budget Ordinance 25-O-04 (adopted May 20, 2025) and
          official City Council agendas from{" "}
          <a
            href="https://www.collegeparkmd.gov/AgendaCenter"
            className="text-forest underline decoration-dotted hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            collegeparkmd.gov
          </a>
          . This site is an independent civic project and is not affiliated with the City of College
          Park.
        </p>
        <p className="text-stone-400 text-xs mt-3">
          Built for transparency · College Park, MD · 2026
        </p>
      </footer>
    </div>
  );
}
