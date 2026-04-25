"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BUDGET, fmt } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

const BudgetChart = dynamic(() => import("./BudgetChart"), { ssr: false });

type View = "spending" | "revenue";

interface Props {
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function BudgetSection({ activeCategory, onCategoryChange }: Props) {
  const [view, setView] = useState<View>("spending");
  const { t } = useLanguage();

  function toggleCategory(id: string) {
    onCategoryChange(activeCategory === id ? null : id);
  }

  function handleViewChange(v: View) {
    setView(v);
    if (v === "revenue") onCategoryChange(null);
  }

  const activeDept = BUDGET.departments.find((d) => d.id === activeCategory);

  const chartData = view === "spending"
    ? BUDGET.departments.map((d) => ({
        ...d,
        label: t.data.departments[d.id as keyof typeof t.data.departments].label,
      }))
    : BUDGET.revenue.map((r) => ({
        ...r,
        label: t.data.revenue[r.id as keyof typeof t.data.revenue],
      }));

  return (
    <section id="budget" className="py-16 px-4 max-w-5xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-2">
        {t.budget.eyebrow}
      </p>
      <h2 className="text-4xl font-serif font-bold text-ink mb-3">
        Where your <span className="text-forest">$927</span> goes
      </h2>
      <p className="text-stone-600 text-lg max-w-2xl mb-8">
        {t.budget.subheading}{" "}
        <a
          href={BUDGET.sourcePdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest underline decoration-dotted hover:no-underline text-sm"
        >
          {t.budget.sourcePdf}
        </a>
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
            {v === "spending" ? t.budget.byDepartment : t.budget.byRevenue}
          </button>
        ))}
      </div>

      {/* Chart + legend */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div className="h-64 relative">
          <BudgetChart
            data={chartData}
            activeId={view === "spending" ? activeCategory : null}
            onSliceClick={view === "spending" ? toggleCategory : undefined}
          />
        </div>
        <div className="space-y-2">
          {chartData.map((item) => {
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
            <p className="text-xs text-stone-400 pt-1 pl-3">{t.budget.clickHint}</p>
          )}
        </div>
      </div>

      {/* Department detail panel */}
      {view === "spending" && activeCategory && activeDept && (() => {
        const deptT = t.data.departments[activeDept.id as keyof typeof t.data.departments];
        return (
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-12 flex gap-4 items-start">
            <span className="text-3xl">{activeDept.icon}</span>
            <div>
              <p className="font-semibold text-ink text-lg">{deptT.label}</p>
              <p className="text-stone-600 text-sm mt-1">{deptT.description}</p>
              <p className="text-forest font-mono font-semibold mt-2">
                {fmt(activeDept.amount)} · {activeDept.pct}% {t.budget.ofOperatingBudget}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Capital projects */}
      <div className="mb-12">
        <h3 className="text-xl font-serif font-bold text-ink mb-1">
          {t.budget.capitalHeading} — <span className="text-forest">{t.budget.capitalAmount}</span>
        </h3>
        <p className="text-stone-500 text-sm mb-5">{t.budget.capitalSubheading}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {BUDGET.capital.map((p) => {
            const highlighted = !activeCategory || p.department === activeCategory;
            const capT = t.data.capital[p.id as keyof typeof t.data.capital];
            return (
              <div
                key={p.id}
                className={`border rounded-xl p-4 transition-opacity ${
                  highlighted ? "border-stone-200 bg-white" : "opacity-30"
                }`}
              >
                <p className="font-semibold text-ink text-sm mb-1">{capT.label}</p>
                <p className="text-forest font-mono font-bold text-lg mb-2">{fmt(p.amount)}</p>
                <p className="text-stone-500 text-xs leading-relaxed">{capT.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Town & Gown */}
      <div className="mb-12">
        <h3 className="text-xl font-serif font-bold text-ink mb-1">{t.budget.townGown.heading}</h3>
        <p className="text-stone-500 text-sm mb-5">{t.budget.townGown.subheading}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {t.budget.townGown.cards.map((card) => (
            <div key={card.title} className="border border-stone-200 bg-white rounded-xl p-4">
              <p className="font-semibold text-ink text-sm mb-1">{card.title}</p>
              <p className="text-forest font-mono font-bold text-lg mb-2">{card.stat}</p>
              <p className="text-stone-500 text-xs leading-relaxed">
                {card.body}
                {card.sourceUrl && card.sourceLabel && (
                  <>
                    {" "}
                    <a
                      href={card.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest underline decoration-dotted hover:no-underline"
                    >
                      {card.sourceLabel}
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What's new */}
      <div>
        <h3 className="text-xl font-serif font-bold text-ink mb-4">{t.budget.changesHeading}</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {BUDGET.changes.map((c, i) => {
            const label = t.budget.changeLabels[c.type as keyof typeof t.budget.changeLabels];
            const text = t.data.changes[i];
            const clsMap = {
              add: "bg-green-100 text-green-800",
              remove: "bg-red-100 text-red-800",
              neutral: "bg-stone-100 text-stone-600",
            };
            return (
              <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                <span className={`mt-0.5 px-2 py-0.5 rounded text-xs font-semibold shrink-0 ${clsMap[c.type as keyof typeof clsMap]}`}>
                  {label}
                </span>
                <p className="text-sm text-stone-700">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
