import Link from "next/link";

export default function VerifyPage() {
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
          Source Verification
        </p>
        <h1 className="text-5xl font-serif font-bold text-ink mb-6">Verify a Document</h1>
        <p className="text-stone-600 text-xl max-w-lg mx-auto mb-8">
          Drop any city document here to check its SHA-256 hash against the on-chain record on
          Polygon. Confirm that what we summarized is exactly what the city published.
        </p>
        <div className="border-2 border-dashed border-stone-300 rounded-xl p-12 max-w-md mx-auto text-stone-400 mb-8">
          <p className="text-lg">Drop PDF here</p>
          <p className="text-sm mt-1">or click to browse</p>
        </div>
        <Link href="/" className="text-forest font-medium underline decoration-dotted hover:no-underline">
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}
