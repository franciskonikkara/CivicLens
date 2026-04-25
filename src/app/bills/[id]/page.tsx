"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import QandA from "@/components/QandA";
import { createClient } from "@/lib/supabase/client";

type Lang = "en" | "es" | "zh";

interface Argument { point: string; strength?: number }

interface Bill {
  id: string;
  external_id: string | null;
  title: string;
  status: string;
  summaries: Record<string, string> | null;
  arguments_for: Argument[] | null;
  arguments_against: Argument[] | null;
  fiscal_impact: string | null;
  full_text: string | null;
  introduced_at: string | null;
  decided_at: string | null;
  documents: { title: string; source_url: string; ipfs_cid: string | null; sha256_hash: string | null } | null;
}

const STATUS_CLS: Record<string, string> = {
  upcoming: "bg-amber-100 text-amber-800",
  decided: "bg-green-100 text-green-800",
  passed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  "under-study": "bg-sky-100 text-sky-800",
};

const LANG_HEADINGS = {
  en: { summary: "Summary", for: "Arguments For", against: "Arguments Against", fiscal: "Fiscal Impact", source: "Source Document", qa: "Ask about this bill", back: "← All Bills" },
  es: { summary: "Resumen", for: "Argumentos a Favor", against: "Argumentos en Contra", fiscal: "Impacto Fiscal", source: "Documento Fuente", qa: "Pregunta sobre esta ley", back: "← Todos los proyectos" },
  zh: { summary: "摘要", for: "支持论点", against: "反对论点", fiscal: "财政影响", source: "来源文件", qa: "询问此法案", back: "← 所有法案" },
};

export default function BillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lang, setLang] = useState<Lang>("en");
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await createClient()
        .from("bills")
        .select(`*, documents(title, source_url, ipfs_cid, sha256_hash)`)
        .eq("id", id)
        .maybeSingle();
      setBill(data as Bill | null);
      setLoading(false);
    }
    load();
  }, [id]);

  const h = LANG_HEADINGS[lang];

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <NavBar />
        <main className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-stone-200 rounded-xl" />)}
          </div>
        </main>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="min-h-screen bg-cream">
        <NavBar />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-stone-500">Bill not found.</p>
          <Link href="/bills" className="text-forest underline mt-4 inline-block">{h.back}</Link>
        </main>
      </div>
    );
  }

  const summary = bill.summaries?.[lang] ?? bill.summaries?.en ?? "";
  const argsFor = bill.arguments_for ?? [];
  const argsAgainst = bill.arguments_against ?? [];

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/bills" className="text-forest text-sm font-medium hover:underline mb-6 inline-block">{h.back}</Link>

        {/* Title + meta */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {bill.external_id && (
              <span className="px-2 py-0.5 text-xs font-mono bg-stone-100 text-stone-500 rounded">{bill.external_id}</span>
            )}
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_CLS[bill.status] ?? "bg-stone-100 text-stone-600"}`}>
              {bill.status}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">{bill.title}</h1>
          <div className="flex gap-4 text-xs text-stone-400">
            {bill.introduced_at && <span>Introduced {new Date(bill.introduced_at + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>}
            {bill.decided_at && <span>Decided {new Date(bill.decided_at + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>}
          </div>
        </div>

        {/* Lang toggle */}
        <div className="flex rounded-full border border-stone-300 overflow-hidden text-xs font-medium w-fit mb-6">
          {(["en", "es", "zh"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-forest text-cream" : "text-stone-600 hover:bg-stone-50"}`}
            >
              {l === "zh" ? "中文" : l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {/* Summary */}
          {summary && (
            <Card title={h.summary} icon="📋">
              <p className="text-stone-700 text-sm leading-relaxed">{summary}</p>
            </Card>
          )}

          {/* Fiscal impact */}
          {bill.fiscal_impact && (
            <Card title={h.fiscal} icon="💰">
              <p className="text-stone-700 text-sm leading-relaxed">{bill.fiscal_impact}</p>
            </Card>
          )}

          {/* For / Against */}
          {(argsFor.length > 0 || argsAgainst.length > 0) && (
            <div className="grid sm:grid-cols-2 gap-4">
              {argsFor.length > 0 && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="font-semibold text-green-800 text-sm mb-3">{h.for}</p>
                  <ul className="space-y-2">
                    {argsFor.map((a, i) => (
                      <li key={i} className="text-xs text-green-900 flex gap-2">
                        <span className="text-green-500 shrink-0 mt-0.5">+</span>
                        {a.point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {argsAgainst.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <p className="font-semibold text-red-800 text-sm mb-3">{h.against}</p>
                  <ul className="space-y-2">
                    {argsAgainst.map((a, i) => (
                      <li key={i} className="text-xs text-red-900 flex gap-2">
                        <span className="text-red-500 shrink-0 mt-0.5">-</span>
                        {a.point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Source document */}
          {bill.documents && (
            <Card title={h.source} icon="🔗">
              <div className="space-y-2 text-sm">
                <p className="text-stone-700 font-medium">{bill.documents.title}</p>
                <div className="flex flex-wrap gap-2">
                  <a href={bill.documents.source_url} target="_blank" rel="noopener noreferrer"
                     className="text-xs text-forest border border-forest/30 px-3 py-1.5 rounded-full hover:bg-forest hover:text-cream transition-colors">
                    View original PDF ↗
                  </a>
                  {bill.documents.sha256_hash && (
                    <Link href={`/verify`}
                      className="text-xs text-stone-500 border border-stone-200 px-3 py-1.5 rounded-full hover:border-forest hover:text-forest transition-colors">
                      Verify on-chain ✓
                    </Link>
                  )}
                </div>
                {bill.documents.sha256_hash && (
                  <p className="text-xs text-stone-400 font-mono break-all">
                    SHA-256: {bill.documents.sha256_hash}
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Q&A */}
          <QandA lang={lang} context={summary ? `Bill: ${bill.title}\n\nSummary: ${summary}${bill.fiscal_impact ? `\n\nFiscal Impact: ${bill.fiscal_impact}` : ""}` : undefined} />
        </div>
      </main>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span>{icon}</span>
        <p className="font-semibold text-ink text-sm">{title}</p>
      </div>
      {children}
    </div>
  );
}
