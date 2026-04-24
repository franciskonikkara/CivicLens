import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-cream">
      <nav className="bg-ink/95 sticky top-0 z-50 border-b border-stone-800 px-4">
        <div className="max-w-5xl mx-auto h-14 flex items-center gap-6">
          <Link href="/" className="text-green-400 font-serif font-bold text-lg">
            Civic<span className="text-cream">Lens</span>
          </Link>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-4">
          Coming Soon
        </p>
        <h1 className="text-5xl font-serif font-bold text-ink mb-6">Accountability Dashboard</h1>
        <p className="text-stone-600 text-xl max-w-lg mx-auto mb-8">
          Council voting records, attendance trends, time-to-vote analytics, and geographic
          distribution of decisions by district.
        </p>
        <Link href="/" className="text-forest font-medium underline decoration-dotted hover:no-underline">
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}
