"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import QandA from "@/components/QandA";
import { createClient } from "@/lib/supabase/client";

type Lang = "en" | "es" | "zh";
type District = "all" | "district-1" | "district-2" | "district-3" | "district-4";

interface FeedItem {
  id: string;
  kind: "meeting" | "bill";
  title: string;
  summary: string;
  date: string;
  status?: string;
  tags?: string[];
}

const LANG_LABELS: Record<Lang, string> = { en: "EN", es: "ES", zh: "中文" };
const DISTRICT_LABELS: Record<District, string> = {
  all: "All Districts",
  "district-1": "District 1",
  "district-2": "District 2",
  "district-3": "District 3",
  "district-4": "District 4",
};

const STATUS_CLS: Record<string, string> = {
  upcoming: "bg-amber-100 text-amber-800",
  decided:  "bg-green-100 text-green-800",
  passed:   "bg-green-100 text-green-800",
  failed:   "bg-red-100 text-red-800",
  "under-study": "bg-sky-100 text-sky-800",
};

export default function FeedPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [district, setDistrict] = useState<District>("all");
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const supabase = createClient();
      const summaryCol = `summary_${lang}`;

      // Pull recent meetings
      const { data: meetings } = await supabase
        .from("meetings")
        .select(`id, title, date, ${summaryCol}`)
        .order("date", { ascending: false })
        .limit(5);

      // Pull active bills
      const { data: bills } = await supabase
        .from("bills")
        .select("id, title, status, summaries, introduced_at")
        .order("introduced_at", { ascending: false })
        .limit(8);

      const feedItems: FeedItem[] = [];

      meetings?.forEach((m) => {
        const summary = m[summaryCol as keyof typeof m] as string | null;
        if (summary) {
          feedItems.push({
            id: m.id,
            kind: "meeting",
            title: m.title,
            summary,
            date: m.date,
          });
        }
      });

      bills?.forEach((b) => {
        const sums = b.summaries as Record<string, string> | null;
        const summary = sums?.[lang] ?? sums?.en ?? "";
        if (summary) {
          feedItems.push({
            id: b.id,
            kind: "bill",
            title: b.title,
            summary,
            date: b.introduced_at ?? "",
            status: b.status,
          });
        }
      });

      // Sort by date desc
      feedItems.sort((a, b) => (a.date < b.date ? 1 : -1));
      setItems(feedItems);
      setLoading(false);
    }
    load();
  }, [lang]);

  const LABELS = {
    en: { heading: "My Feed", sub: "Personalized civic updates for College Park", noItems: "No items found. Make sure your Supabase database is seeded.", meetingLabel: "Meeting", billLabel: "Bill" },
    es: { heading: "Mi Feed", sub: "Actualizaciones cívicas personalizadas para College Park", noItems: "No se encontraron elementos.", meetingLabel: "Reunión", billLabel: "Proyecto" },
    zh: { heading: "我的动态", sub: "大学公园市个性化市政动态", noItems: "未找到内容。", meetingLabel: "会议", billLabel: "法案" },
  }[lang];

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-1">
              {lang === "en" ? "City Council" : lang === "es" ? "Concejo Municipal" : "市议会"}
            </p>
            <h1 className="text-4xl font-serif font-bold text-ink">{LABELS.heading}</h1>
            <p className="text-stone-500 mt-1">{LABELS.sub}</p>
          </div>
          {/* Language + district filters */}
          <div className="flex flex-col gap-2 items-end">
            <div className="flex rounded-full border border-stone-300 overflow-hidden text-xs font-medium">
              {(["en", "es", "zh"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-forest text-cream" : "text-stone-600 hover:bg-stone-50"}`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as District)}
              className="text-xs border border-stone-300 rounded-full px-3 py-1.5 bg-white text-stone-600 focus:outline-none focus:ring-2 focus:ring-forest/30"
            >
              {(Object.keys(DISTRICT_LABELS) as District[]).map((d) => (
                <option key={d} value={d}>{DISTRICT_LABELS[d]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Q&A */}
        <div className="mb-8">
          <QandA lang={lang} />
        </div>

        {/* Feed items */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-stone-200 rounded-xl p-5 bg-white animate-pulse">
                <div className="h-3 bg-stone-200 rounded w-1/4 mb-3" />
                <div className="h-5 bg-stone-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-full mb-1" />
                <div className="h-3 bg-stone-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <p className="text-lg">{LABELS.noItems}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/${item.kind === "meeting" ? "meetings" : "bills"}/${item.id}`}
                className="block border border-stone-200 rounded-xl p-5 bg-white hover:border-forest/40 hover:shadow-sm transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-600">
                    {item.kind === "meeting" ? LABELS.meetingLabel : LABELS.billLabel}
                  </span>
                  {item.status && STATUS_CLS[item.status] && (
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_CLS[item.status]}`}>
                      {item.status}
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-ink mb-1.5">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">{item.summary}</p>
                <p className="text-xs text-stone-400 mt-2">
                  {item.date ? new Date(item.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
