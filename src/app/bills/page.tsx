"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { createClient } from "@/lib/supabase/client";

type Lang = "en" | "es" | "zh";

interface Bill {
  id: string;
  external_id: string | null;
  title: string;
  status: string;
  summaries: Record<string, string> | null;
  introduced_at: string | null;
}

const STATUS_CLS: Record<string, string> = {
  upcoming:      "bg-amber-100 text-amber-800",
  decided:       "bg-green-100 text-green-800",
  passed:        "bg-green-100 text-green-800",
  failed:        "bg-red-100 text-red-800",
  "under-study": "bg-sky-100 text-sky-800",
};

export default function BillsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await createClient()
        .from("bills")
        .select("id, external_id, title, status, summaries, introduced_at")
        .order("introduced_at", { ascending: false });
      setBills((data ?? []) as Bill[]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-1">Legislation</p>
            <h1 className="text-4xl font-serif font-bold text-ink">Bills & Ordinances</h1>
          </div>
          <div className="flex rounded-full border border-stone-300 overflow-hidden text-xs font-medium">
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
        </div>

        <div className="space-y-3">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-xl p-5 animate-pulse">
                  <div className="h-3 bg-stone-200 rounded w-1/4 mb-3" />
                  <div className="h-5 bg-stone-200 rounded w-3/4" />
                </div>
              ))
            : bills.map((bill) => {
                const summary =
                  bill.summaries?.[lang] ?? bill.summaries?.en ?? "";
                return (
                  <Link
                    key={bill.id}
                    href={`/bills/${bill.id}`}
                    className="block bg-white border border-stone-200 rounded-xl p-5 hover:border-forest/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {bill.external_id && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-stone-100 text-stone-500 rounded">
                          {bill.external_id}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_CLS[bill.status] ?? "bg-stone-100 text-stone-600"}`}>
                        {bill.status}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-ink mb-1.5">{bill.title}</h3>
                    {summary && (
                      <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">{summary}</p>
                    )}
                    {bill.introduced_at && (
                      <p className="text-xs text-stone-400 mt-2">
                        Introduced{" "}
                        {new Date(bill.introduced_at + "T12:00:00").toLocaleDateString("en-US", {
                          month: "long", day: "numeric", year: "numeric",
                        })}
                      </p>
                    )}
                  </Link>
                );
              })}
        </div>

        {!loading && bills.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <p>No bills found. Seed your Supabase database to see data here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
