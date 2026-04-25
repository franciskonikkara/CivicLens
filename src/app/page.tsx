"use client";

import { useState } from "react";
import BudgetSection from "@/components/dashboard/BudgetSection";
import CouncilSection from "@/components/dashboard/CouncilSection";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex rounded-full border border-stone-700 overflow-hidden text-xs font-medium">
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-forest text-cream" : "text-stone-400 hover:text-cream"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "es" ? "bg-forest text-cream" : "text-stone-400 hover:text-cream"
        }`}
      >
        ES
      </button>
    </div>
  );
}

function PageContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  const featurePills = [
    { icon: "🌐", label: t.hero.pills.multilingual },
    { icon: "🔗", label: t.hero.pills.blockchain },
    { icon: "🤖", label: t.hero.pills.ai },
    { icon: "🗳️", label: t.hero.pills.ballot },
  ];

  return (
    <div className="min-h-screen">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="bg-ink/95 backdrop-blur sticky top-0 z-50 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-green-400 font-serif font-bold text-lg tracking-tight">
              Civic<span className="text-cream">Lens</span>
            </span>
            <span className="hidden sm:inline text-stone-600 text-xs">{t.nav.location}</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-stone-400">
            <Link href="#budget" className="hover:text-cream transition-colors hidden sm:inline">{t.nav.budget}</Link>
            <Link href="#council" className="hover:text-cream transition-colors hidden sm:inline">{t.nav.council}</Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <header className="bg-ink text-cream py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-green-400 font-semibold mb-4">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold leading-tight mb-6 max-w-3xl">
            {t.hero.headline1}
            <br />
            <span className="text-green-400">{t.hero.headline2}</span>
          </h1>
          <p className="text-stone-300 text-xl max-w-2xl mb-6 leading-relaxed">
            {t.hero.subheadline}
          </p>
          <p className="inline-block text-xs uppercase tracking-widest font-semibold mb-10 px-3 py-1.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
            {t.hero.proposedBadge}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 text-sm text-stone-400 mb-10">
            <div>
              <span className="text-3xl font-serif font-bold text-cream">$927</span>
              <p className="mt-0.5">{t.hero.stat1Label}</p>
            </div>
            <div className="w-px bg-stone-700 hidden sm:block" />
            <div>
              <span className="text-3xl font-serif font-bold text-cream">33.5¢</span>
              <p className="mt-0.5">{t.hero.stat2Label}</p>
            </div>
            <div className="w-px bg-stone-700 hidden sm:block" />
            <div>
              <span className="text-3xl font-serif font-bold text-cream">5</span>
              <p className="mt-0.5">{t.hero.stat3Label}</p>
            </div>
            <div className="w-px bg-stone-700 hidden sm:block" />
            <div>
              <span className="text-3xl font-serif font-bold text-cream">~40,000</span>
              <p className="mt-0.5 max-w-[160px]">{t.hero.stat4Label}</p>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {featurePills.map((f) => (
              <span
                key={f.label}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-800 text-stone-300 rounded-full text-xs"
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>

          <a
            href="#budget"
            className="inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-green-300"
          >
            {t.hero.cta1}
          </a>
        </div>
      </header>

      {/* ── BUDGET SECTION ──────────────────────────────────── */}
      <BudgetSection activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* ── BRIDGE BANNER ───────────────────────────────────── */}
      {activeCategory && (
        <div className="bg-forest/10 border-y border-forest/20 py-3 px-4 text-center">
          <p className="text-forest text-sm font-medium">{t.bridge}</p>
        </div>
      )}

      {/* ── COUNCIL SECTION ─────────────────────────────────── */}
      <CouncilSection activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* ── BLOCKCHAIN TRUST SECTION ────────────────────────── */}
      <section className="py-16 px-4 bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-3">
              {t.blockchain.eyebrow}
            </p>
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">{t.blockchain.heading}</h2>
            <p className="text-stone-600 leading-relaxed mb-6">{t.blockchain.body}</p>
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 text-forest font-medium hover:underline"
            >
              {t.blockchain.cta}
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
              {t.blockchain.verified}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-stone-200 py-10 px-4 text-center">
        <p className="text-stone-500 text-sm max-w-2xl mx-auto">
          {t.footer.credit}{" "}
          <a
            href="https://www.collegeparkmd.gov/AgendaCenter"
            className="text-forest underline decoration-dotted hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            collegeparkmd.gov
          </a>
          . {t.footer.disclaimer}
        </p>
        <p className="text-stone-400 text-xs mt-3">{t.footer.tagline}</p>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
