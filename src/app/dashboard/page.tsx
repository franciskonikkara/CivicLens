"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { createClient } from "@/lib/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

interface VoteRecord { member: string; yes: number; no: number; abstain: number }
interface BillsByStatus { name: string; value: number; color: string }
interface MeetingActivity { month: string; items: number }

const COLORS = ["#2d6a4f", "#40916c", "#74c69d", "#b7e4c7", "#d8f3dc"];

export default function DashboardPage() {
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [billStatus, setBillStatus] = useState<BillsByStatus[]>([]);
  const [activity, setActivity] = useState<MeetingActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ meetings: 0, bills: 0, members: 0, docs: 0 });

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      // Council member vote breakdown
      const { data: voteData } = await supabase
        .from("votes")
        .select("vote, council_members(name)");

      if (voteData) {
        const byMember: Record<string, VoteRecord> = {};
        voteData.forEach((v) => {
          const name = (v.council_members as { name: string } | null)?.name ?? "Unknown";
          if (!byMember[name]) byMember[name] = { member: name.split(" ").pop() ?? name, yes: 0, no: 0, abstain: 0 };
          if (v.vote === "yes") byMember[name].yes++;
          else if (v.vote === "no") byMember[name].no++;
          else if (v.vote === "abstain") byMember[name].abstain++;
        });
        setVotes(Object.values(byMember));
      }

      // Bills by status
      const { data: billData } = await supabase.from("bills").select("status");
      if (billData) {
        const counts: Record<string, number> = {};
        billData.forEach((b) => { counts[b.status] = (counts[b.status] ?? 0) + 1; });
        setBillStatus(Object.entries(counts).map(([name, value], i) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1).replace("-", " "),
          value,
          color: COLORS[i % COLORS.length],
        })));
      }

      // Meeting activity by month
      const { data: meetingData } = await supabase
        .from("meetings")
        .select("date")
        .order("date", { ascending: true });
      if (meetingData) {
        const byMonth: Record<string, number> = {};
        meetingData.forEach((m) => {
          const key = m.date.slice(0, 7);
          byMonth[key] = (byMonth[key] ?? 0) + 1;
        });
        setActivity(
          Object.entries(byMonth).map(([month, items]) => ({
            month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
            items,
          }))
        );
      }

      // Headline stats
      const [{ count: m }, { count: b }, { count: c }, { count: d }] = await Promise.all([
        supabase.from("meetings").select("*", { count: "exact", head: true }),
        supabase.from("bills").select("*", { count: "exact", head: true }),
        supabase.from("council_members").select("*", { count: "exact", head: true }),
        supabase.from("documents").select("*", { count: "exact", head: true }),
      ]);
      setStats({ meetings: m ?? 0, bills: b ?? 0, members: c ?? 0, docs: d ?? 0 });
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-2">
          Accountability
        </p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-8">
          Council Dashboard
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Meetings tracked", value: stats.meetings },
            { label: "Bills & ordinances", value: stats.bills },
            { label: "Council members", value: stats.members },
            { label: "Verified documents", value: stats.docs },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-stone-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-serif font-bold text-forest">{loading ? "—" : s.value}</p>
              <p className="text-xs text-stone-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Vote breakdown bar chart */}
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h2 className="font-serif font-bold text-ink mb-4">Vote breakdown by member</h2>
            {loading || !votes.length ? (
              <Skeleton />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={votes} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
                  <XAxis dataKey="member" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="yes" name="Yes" fill="#2d6a4f" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="no" name="No" fill="#ef4444" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="abstain" name="Abstain" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Bills by status pie */}
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h2 className="font-serif font-bold text-ink mb-4">Bills by status</h2>
            {loading || !billStatus.length ? (
              <Skeleton />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={billStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {billStatus.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconSize={10} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Meeting activity timeline */}
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <h2 className="font-serif font-bold text-ink mb-4">Meeting activity over time</h2>
          {loading || !activity.length ? (
            <Skeleton h={120} />
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={activity} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="items" name="Meetings" fill="#2d6a4f" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>
    </div>
  );
}

function Skeleton({ h = 220 }: { h?: number }) {
  return (
    <div
      className="w-full animate-pulse bg-stone-100 rounded-lg"
      style={{ height: h }}
    />
  );
}
