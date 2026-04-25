"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import QandA from "@/components/QandA";
import { createClient } from "@/lib/supabase/client";

type Lang = "en" | "es" | "zh";

interface Decision { title: string; passed: boolean; votes: { for: number; against: number; abstain: number } }

interface Vote {
  vote: string;
  council_members: { name: string; district: string | null } | null;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  video_url: string | null;
  summary_en: string | null;
  summary_es: string | null;
  summary_zh: string | null;
  decisions: Decision[] | null;
}

const LANG_H = {
  en: { summary: "Meeting Summary", decisions: "Decisions", votes: "Member Votes", video: "Watch Recording", back: "← All Meetings", noDecisions: "No decisions recorded." },
  es: { summary: "Resumen de la Reunión", decisions: "Decisiones", votes: "Votos de Miembros", video: "Ver Grabación", back: "← Todas las Reuniones", noDecisions: "No se registraron decisiones." },
  zh: { summary: "会议摘要", decisions: "决议", votes: "议员投票", video: "观看录像", back: "← 所有会议", noDecisions: "无记录决议。" },
};

export default function MeetingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lang, setLang] = useState<Lang>("en");
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [memberVotes, setMemberVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: m }, { data: v }] = await Promise.all([
        supabase
          .from("meetings")
          .select("id, title, date, video_url, summary_en, summary_es, summary_zh, decisions")
          .eq("id", id)
          .maybeSingle(),
        supabase
          .from("votes")
          .select("vote, council_members(name, district)")
          .eq("meeting_id", id),
      ]);
      setMeeting(m as Meeting | null);
      setMemberVotes((v ?? []) as Vote[]);
      setLoading(false);
    }
    load();
  }, [id]);

  const h = LANG_H[lang];

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <NavBar />
        <main className="max-w-3xl mx-auto px-4 py-12 space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-stone-200 rounded-xl" />)}
        </main>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-cream">
        <NavBar />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-stone-500">Meeting not found.</p>
          <Link href="/meetings" className="text-forest underline mt-4 inline-block">{h.back}</Link>
        </main>
      </div>
    );
  }

  const summary = lang === "zh" ? meeting.summary_zh : lang === "es" ? meeting.summary_es : meeting.summary_en;

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/meetings" className="text-forest text-sm font-medium hover:underline mb-6 inline-block">{h.back}</Link>

        {/* Title */}
        <div className="mb-6">
          <p className="text-xs text-stone-400 mb-1">
            {new Date(meeting.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 className="text-3xl font-serif font-bold text-ink">{meeting.title}</h1>
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
          {/* Video */}
          {meeting.video_url && (
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={meeting.video_url.replace("watch?v=", "embed/")}
                  title={meeting.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <a href={meeting.video_url} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-forest hover:underline">{h.video} ↗</a>
              </div>
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <p className="font-semibold text-ink text-sm mb-3">📋 {h.summary}</p>
              <p className="text-stone-700 text-sm leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Decisions */}
          {meeting.decisions && meeting.decisions.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <p className="font-semibold text-ink text-sm mb-4">🗳️ {h.decisions}</p>
              <div className="space-y-3">
                {meeting.decisions.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${d.passed ? "bg-green-500" : "bg-red-400"}`} />
                    <div className="flex-1">
                      <p className="text-sm text-ink">{d.title}</p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {d.votes.for} for · {d.votes.against} against
                        {d.votes.abstain > 0 ? ` · ${d.votes.abstain} abstain` : ""}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${d.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {d.passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Member votes */}
          {memberVotes.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <p className="font-semibold text-ink text-sm mb-4">👥 {h.votes}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {memberVotes.map((v, i) => {
                  const voteColor = v.vote === "yes" ? "text-green-700 bg-green-50 border-green-200" : v.vote === "no" ? "text-red-700 bg-red-50 border-red-200" : "text-stone-600 bg-stone-50 border-stone-200";
                  return (
                    <div key={i} className={`flex items-center justify-between gap-2 border rounded-lg px-3 py-2 ${voteColor}`}>
                      <p className="text-xs font-medium truncate">{v.council_members?.name ?? "Unknown"}</p>
                      <span className="text-xs font-bold capitalize shrink-0">{v.vote}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Q&A */}
          <QandA lang={lang} context={summary ?? undefined} />
        </div>
      </main>
    </div>
  );
}
