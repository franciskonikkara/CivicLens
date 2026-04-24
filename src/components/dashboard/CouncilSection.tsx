"use client";

import { useState } from "react";
import { COUNCIL_ITEMS, STATUS_CONFIG, BUDGET, fmtDate } from "@/lib/data";

interface Props {
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function CouncilSection({ activeCategory, onCategoryChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const items = activeCategory
    ? COUNCIL_ITEMS.filter((i) => i.budgetCategory === activeCategory)
    : COUNCIL_ITEMS;

  const activeDept = BUDGET.departments.find((d) => d.id === activeCategory);

  function toggleAccordion(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="council" className="py-16 px-4 max-w-5xl mx-auto border-t border-stone-200">
      <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-2">City Council</p>
      <h2 className="text-4xl font-serif font-bold text-ink mb-3">This week at City Hall</h2>
      <p className="text-stone-600 text-lg max-w-2xl mb-8">
        {activeCategory && activeDept ? (
          <>
            Filtered to{" "}
            <button
              onClick={() => onCategoryChange(null)}
              className="text-forest font-semibold underline decoration-dotted hover:no-underline"
            >
              {activeDept.label}
            </button>{" "}
            <button
              onClick={() => onCategoryChange(null)}
              className="ml-2 text-stone-400 hover:text-stone-700 text-sm"
            >
              (clear filter)
            </button>
          </>
        ) : (
          "Recent and upcoming items from the College Park City Council — in plain English."
        )}
      </p>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <p className="text-lg">No recent council items in this category.</p>
            <button
              onClick={() => onCategoryChange(null)}
              className="mt-3 text-forest font-medium underline decoration-dotted"
            >
              Show all items
            </button>
          </div>
        ) : (
          items.map((item) => {
            const status = STATUS_CONFIG[item.status];
            const dept = BUDGET.departments.find((d) => d.id === item.budgetCategory)!;
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className="border border-stone-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-5 flex items-start gap-4 hover:bg-stone-50 transition-colors"
                >
                  <span
                    className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${status.cls}`}>
                        {status.label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCategoryChange(item.budgetCategory);
                        }}
                        className="px-2 py-0.5 rounded text-xs font-medium border border-stone-200 text-stone-500 hover:border-forest hover:text-forest"
                      >
                        {dept.label}
                      </button>
                    </div>
                    <h3 className="font-serif font-bold text-ink text-lg leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">{item.summary}</p>
                    <p className="text-xs text-stone-400 mt-2">
                      {fmtDate(item.date)} · {item.meetingType}
                    </p>
                  </div>
                  <span
                    className="text-stone-400 mt-1 shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-stone-100 px-5 pb-5 pt-4">
                    <p className="text-stone-700 text-sm leading-relaxed mb-4">{item.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://www.collegeparkmd.gov/AgendaCenter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-forest border border-forest/30 px-3 py-1.5 rounded-full hover:bg-forest hover:text-cream transition-colors"
                      >
                        Official Agenda ↗
                      </a>
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-stone-500 border border-stone-200 px-3 py-1.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
