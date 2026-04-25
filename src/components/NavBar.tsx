"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",          label: "Home" },
  { href: "/feed",      label: "My Feed" },
  { href: "/meetings",  label: "Meetings" },
  { href: "/bills",     label: "Bills" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function NavBar() {
  const path = usePathname();
  const active = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <nav className="bg-ink/95 backdrop-blur sticky top-0 z-50 border-b border-stone-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-green-400 font-serif font-bold text-lg tracking-tight">
            Civic<span className="text-cream">Lens</span>
          </span>
          <span className="hidden sm:inline text-stone-600 text-xs">College Park, MD</span>
        </Link>
        <div className="flex items-center gap-1 text-sm overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                active(l.href)
                  ? "bg-forest/20 text-green-400"
                  : "text-stone-400 hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/verify"
            className="ml-2 px-3 py-1.5 bg-forest text-cream rounded-full text-xs font-medium hover:bg-forest-light transition-colors whitespace-nowrap"
          >
            Verify Source ✓
          </Link>
        </div>
      </div>
    </nav>
  );
}
