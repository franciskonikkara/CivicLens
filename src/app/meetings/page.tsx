"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { createClient } from "@/lib/supabase/client";

type Lang = "en" | "es" | "zh";

interface Meeting {
  id: string;
  title: string;
  date: string;
  video_url: string | null;
  summary_en: string | null;
  summary_es: string | null;
  summary_zh: string | null;
}

export default function MeetingsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await createClient()
        .from("meetings")
        .select("id, title, date, video_url, summary_en, summary_es, summary_zh")
        .order("date", { ascending: false });
      setMeetings((data ?? []) as Meeting[]);
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
            <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-1">City Council</p>
            <h1 className="text-4xl font-serif font-bold text-ink">Council Meetings</h1>
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
            ? [1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-xl p-5 animate-pulse">
                  <div className="h-3 bg-stone-200 rounded w-1/3 mb-3" />
                  <div className="h-5 bg-stone-200 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                </div>
              ))
            : meetings.map((m) => {
                const summary = (lang === "zh" ? m.summary_zh : lang === "es" ? m.summary_es : m.summary_en) ?? "";
                return (
                  <Link
                    key={m.id}
                    href={`/meetings/${m.id}`}
                    className="block bg-white border border-stone-200 rounded-xl p-5 hover:border-forest/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-stone-400">
                        {new Date(m.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      {m.video_url && (
                        <span className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded font-medium">▶ Video</span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-ink mb-1.5">{m.title}</h3>
                    {summary && (
                      <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">{summary}</p>
                    )}
                  </Link>
                );
              })}
        </div>

        {!loading && meetings.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <p>No meetings found. Seed your Supabase database to see data here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
