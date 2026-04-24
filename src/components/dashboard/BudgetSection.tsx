"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BUDGET, CHANGE_CONFIG, fmt } from "@/lib/data";

const BudgetChart = dynamic(() => import("./BudgetChart"), { ssr: false });

type View = "spending" | "revenue";

interface Props {
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function BudgetSection({ activeCategory, onCategoryChange }: Props) {
  const [view, setView] = useState<View>("spending");

  const data = view === "spending" ? BUDGET.departments : BUDGET.revenue;

  function toggleCategory(id: string) {
    onCategoryChange(activeCategory === id ? null : id);
  }

  function handleViewChange(v: View) {
    setView(v);
    if (v === "revenue") onCategoryChange(null);
  }

  const activedept = BUDGET.departments.find((d) => d.id === activeCategory);

  return (
    <section id="budget" className="py-16 px-4 max-w-5xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-2">City Budget</p>
      <h2 className="text-4xl font-serif font-bold text-ink mb-3">
        Where your <span className="text-forest">$870</span> goes
      </h2>
      <p className="text-stone-600 text-lg max-w-2xl mb-8">
        College Park&apos;s FY2026 operating budget is <strong>$29.6M</strong> —
        roughly <strong>$870/resident/year</strong>. Your property tax rate is{" "}
        <strong>33.5¢/$100</strong> — half the PG County average of 63.27¢/$100.
      </p>

      {/* View toggle */}
      <div className="flex gap-2 mb-8">
        {(["spending", "revenue"] as const).map((v) => (
          <button
            key={v}
            onClick={() => handleViewChange(v)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              view === v
                ? "bg-forest text-cream border-forest"
                : "bg-transparent text-stone-600 border-stone-300 hover:border-forest hover:text-forest"
            }`}
          >
            {v === "spending" ? "By Department" : "By Revenue Source"}
          </button>
        ))}
      </div>

      {/* Chart + legend */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div className="h-64 relative">
          <BudgetChart
            data={data}
            activeId={view === "spending" ? activeCategory : null}
            onSliceClick={view === "spending" ? toggleCategory : undefined}
          />
        </div>
        <div className="space-y-2">
          {data.map((item) => {
            const isActive = activeCategory === item.id;
            const isDimmed = view === "spending" && activeCategory !== null && !isActive;
            return (
              <button
                key={item.id}
                onClick={() => view === "spending" && toggleCategory(item.id)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all ${
                  view === "spending" ? "hover:bg-stone-50" : "cursor-default"
                } ${isActive ? "bg-green-50 ring-1 ring-forest/30" : ""} ${isDimmed ? "opacity-40" : ""}`}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="flex-1 text-sm font-medium text-ink">{item.label}</span>
                <span className="text-sm text-stone-500 font-mono">{fmt(item.amount)}</span>
                <span className="text-xs text-stone-400 w-8 text-right">{item.pct}%</span>
              </button>
            );
          })}
          {view === "spending" && (
            <p className="text-xs text-stone-400 pt-1 pl-3">
              Click a category to filter council items below ↓
            </p>
          )}
        </div>
      </div>

      {/* Department detail panel */}
      {view === "spending" && activeCategory && activedept && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-12 flex gap-4 items-start">
          <span className="text-3xl">{activedept.icon}</span>
          <div>
            <p className="font-semibold text-ink text-lg">{activedept.label}</p>
            <p className="text-stone-600 text-sm mt-1">{activedept.description}</p>
            <p className="text-forest font-mono font-semibold mt-2">
              {fmt(activedept.amount)} · {activedept.pct}% of operating budget
            </p>
          </div>
        </div>
      )}

      {/* Capital projects */}
      <div className="mb-12">
        <h3 className="text-xl font-serif font-bold text-ink mb-1">
          Capital Projects — <span className="text-forest">$10.3M</span>
        </h3>
        <p className="text-stone-500 text-sm mb-5">
          One-time investments in infrastructure, separate from the operating budget.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {BUDGET.capital.map((p) => {
            const highlighted = !activeCategory || p.department === activeCategory;
            return (
              <div
                key={p.id}
                className={`border rounded-xl p-4 transition-opacity ${
                  highlighted ? "border-stone-200 bg-white" : "opacity-30"
                }`}
              >
                <p className="font-semibold text-ink text-sm mb-1">{p.label}</p>
                <p className="text-forest font-mono font-bold text-lg mb-2">{fmt(p.amount)}</p>
                <p className="text-stone-500 text-xs leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* What changed */}
      <div>
        <h3 className="text-xl font-serif font-bold text-ink mb-4">What changed in FY26</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {BUDGET.changes.map((c, i) => {
            const cfg = CHANGE_CONFIG[c.type as keyof typeof CHANGE_CONFIG];
            return (
              <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <span className={`mt-0.5 px-2 py-0.5 rounded text-xs font-semibold shrink-0 ${cfg.cls}`}>
                  {cfg.label}
                </span>
                <p className="text-sm text-stone-700">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
