import Link from "next/link";

export default function FeedPage() {
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
        <h1 className="text-5xl font-serif font-bold text-ink mb-6">My Personalized Feed</h1>
        <p className="text-stone-600 text-xl max-w-lg mx-auto mb-8">
          Your district&apos;s upcoming council items, active ballot measures, and morning-after
          meeting recaps — in your language.
        </p>
        <div className="inline-flex flex-col gap-2 text-left bg-white border border-stone-200 rounded-xl p-6 text-sm text-stone-600 max-w-sm w-full">
          {[
            "Personalized by district",
            "English · Español · 中文",
            "Push notifications after meetings",
            "AI Q&A on any item",
            "Watchlist for bills you care about",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="text-forest">✓</span> {f}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/"
            className="text-forest font-medium underline decoration-dotted hover:no-underline"
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
