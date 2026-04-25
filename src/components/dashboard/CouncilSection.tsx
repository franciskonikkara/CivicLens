"use client";

import { useState } from "react";
import { COUNCIL_ITEMS, BUDGET, fmtDate } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function CouncilSection({ activeCategory, onCategoryChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [studentMode, setStudentMode] = useState(false);
  const { t } = useLanguage();

  function handleCategoryChange(id: string | null) {
    if (id) setStudentMode(false);
    onCategoryChange(id);
  }

  function handleStudentMode(on: boolean) {
    setStudentMode(on);
    if (on) onCategoryChange(null);
  }

  const items = studentMode
    ? COUNCIL_ITEMS.filter((i) => i.studentRelevant)
    : activeCategory
    ? COUNCIL_ITEMS.filter((i) => i.budgetCategory === activeCategory)
    : COUNCIL_ITEMS;

  const activeDept = BUDGET.departments.find((d) => d.id === activeCategory);
  const activeDeptLabel = activeDept
    ? t.data.departments[activeDept.id as keyof typeof t.data.departments].label
    : null;

  const allActive = !studentMode && !activeCategory;

  function toggleAccordion(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="council" className="py-16 px-4 max-w-5xl mx-auto border-t border-stone-200">
      <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-2">
        {t.council.eyebrow}
      </p>
      <h2 className="text-4xl font-serif font-bold text-ink mb-3">{t.council.heading}</h2>
      <p className="text-stone-600 text-lg max-w-2xl mb-6">
        {studentMode ? (
          <em>{t.council.studentSubtitle}</em>
        ) : activeCategory && activeDeptLabel ? (
          <>
            {t.council.filteredTo}{" "}
            <button
              onClick={() => handleCategoryChange(null)}
              className="text-forest font-semibold underline decoration-dotted hover:no-underline"
            >
              {activeDeptLabel}
            </button>{" "}
            <button
              onClick={() => handleCategoryChange(null)}
              className="ml-2 text-stone-400 hover:text-stone-700 text-sm"
            >
              {t.council.clearFilter}
            </button>
          </>
        ) : (
          t.council.subtitle
        )}
      </p>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { handleStudentMode(false); handleCategoryChange(null); }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            allActive
              ? "bg-forest text-cream border-forest"
              : "bg-transparent text-stone-600 border-stone-300 hover:border-forest hover:text-forest"
          }`}
        >
          {t.council.filterAll}
        </button>
        <button
          onClick={() => handleStudentMode(!studentMode)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            studentMode
              ? "bg-forest text-cream border-forest"
              : "bg-transparent text-stone-600 border-stone-300 hover:border-forest hover:text-forest"
          }`}
        >
          {t.council.filterStudents}
        </button>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <p className="text-lg">{t.council.noItems}</p>
            <button
              onClick={() => { handleStudentMode(false); handleCategoryChange(null); }}
              className="mt-3 text-forest font-medium underline decoration-dotted"
            >
              {t.council.showAll}
            </button>
          </div>
        ) : (
          items.map((item) => {
            const itemT = t.data.councilItems[item.id as keyof typeof t.data.councilItems];
            const statusLabel = t.council.status[item.status as keyof typeof t.council.status];
            const dept = BUDGET.departments.find((d) => d.id === item.budgetCategory)!;
            const deptLabel = t.data.departments[dept.id as keyof typeof t.data.departments].label;
            const isOpen = openId === item.id;

            const statusCls = {
              upcoming: "bg-amber-100 text-amber-800",
              decided: "bg-green-100 text-green-800",
              "under-study": "bg-sky-100 text-sky-800",
            }[item.status];

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
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusCls}`}>
                        {statusLabel}
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryChange(item.budgetCategory);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            handleCategoryChange(item.budgetCategory);
                          }
                        }}
                        className="cursor-pointer px-2 py-0.5 rounded text-xs font-medium border border-stone-200 text-stone-500 hover:border-forest hover:text-forest"
                      >
                        {deptLabel}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-ink text-lg leading-snug">
                      {itemT.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">{itemT.summary}</p>
                    {studentMode && itemT.studentImpact && (
                      <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-2.5">
                        <span className="text-base leading-none mt-0.5">🎓</span>
                        <p className="text-xs text-amber-900 leading-relaxed">
                          <span className="font-semibold">{t.council.studentImpactLabel}</span>{" "}
                          {itemT.studentImpact}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-stone-400 mt-2">
                      {fmtDate(item.date)} · {itemT.meetingType}
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
                    <p className="text-stone-700 text-sm leading-relaxed mb-4">{itemT.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={item.agendaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-forest border border-forest/30 px-3 py-1.5 rounded-full hover:bg-forest hover:text-cream transition-colors"
                      >
                        {t.council.officialAgenda}
                      </a>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-stone-500 border border-stone-200 px-3 py-1.5 rounded-full"
                        >
                          {tag}
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
