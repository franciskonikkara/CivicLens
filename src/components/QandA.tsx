"use client";

import { useState, useRef } from "react";

type Lang = "en" | "es" | "zh";

interface Citation {
  title: string;
  url?: string;
}

interface AskResponse {
  answer: string;
  citations: Citation[];
}

const PLACEHOLDER: Record<Lang, string> = {
  en: "Ask anything about College Park city government…",
  es: "Pregunta cualquier cosa sobre el gobierno de College Park…",
  zh: "请输入关于大学公园市政府的任何问题…",
};

const SEND_LABEL: Record<Lang, string> = {
  en: "Ask",
  es: "Preguntar",
  zh: "提问",
};

const SOURCE_LABEL: Record<Lang, string> = {
  en: "Sources",
  es: "Fuentes",
  zh: "来源",
};

export default function QandA({ lang = "en", context }: { lang?: Lang; context?: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lang, context }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: AskResponse = await res.json();
      setAnswer(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-forest text-lg">🤖</span>
        <p className="text-sm font-semibold text-ink">Ask AI — answers cite the source document</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={PLACEHOLDER[lang]}
          className="flex-1 border border-stone-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/40 bg-white"
        />
        <button
          onClick={ask}
          disabled={loading || !question.trim()}
          className="px-4 py-2 bg-forest text-cream rounded-lg text-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
        >
          {loading ? "…" : SEND_LABEL[lang]}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {answer && (
        <div className="space-y-3">
          <div className="bg-white border border-stone-200 rounded-lg p-4 text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
            {answer.answer}
          </div>
          {answer.citations.length > 0 && (
            <div>
              <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-1.5">
                {SOURCE_LABEL[lang]}
              </p>
              <div className="flex flex-wrap gap-2">
                {answer.citations.map((c, i) => (
                  <a
                    key={i}
                    href={c.url ?? "#"}
                    target={c.url ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-xs text-forest border border-forest/30 px-3 py-1.5 rounded-full hover:bg-forest hover:text-cream transition-colors"
                  >
                    {c.title} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
