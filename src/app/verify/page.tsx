"use client";

import { useState, useRef, useCallback } from "react";
import NavBar from "@/components/NavBar";
import { createClient } from "@/lib/supabase/client";

type VerifyState =
  | { status: "idle" }
  | { status: "hashing" }
  | { status: "checking"; hash: string }
  | { status: "verified"; hash: string; title: string; sourceUrl: string; ipfsCid: string | null; onchainTx: string | null; createdAt: string }
  | { status: "unregistered"; hash: string }
  | { status: "error"; message: string };

async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hashBuf = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function VerifyPage() {
  const [state, setState] = useState<VerifyState>({ status: "idle" });
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file || file.type !== "application/pdf") {
      setState({ status: "error", message: "Please upload a PDF file." });
      return;
    }

    setState({ status: "hashing" });
    const hash = await sha256Hex(file);

    setState({ status: "checking", hash });

    const supabase = createClient();
    const { data, error } = await supabase
      .from("documents")
      .select("title, source_url, ipfs_cid, onchain_tx, created_at")
      .eq("sha256_hash", hash)
      .maybeSingle();

    if (error) {
      setState({ status: "error", message: "Database lookup failed. Check Supabase connection." });
      return;
    }

    if (!data) {
      setState({ status: "unregistered", hash });
      return;
    }

    setState({
      status: "verified",
      hash,
      title: data.title,
      sourceUrl: data.source_url,
      ipfsCid: data.ipfs_cid,
      onchainTx: data.onchain_tx,
      createdAt: new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      }),
    });
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-sm uppercase tracking-widest text-forest font-semibold mb-3">
          Source Verification
        </p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-4">
          Verify a document
        </h1>
        <p className="text-stone-600 text-lg mb-10 max-w-xl">
          Drop any city document PDF here. We compute its SHA-256 hash in your browser and
          check it against the Polygon blockchain record — proving our AI summarized the
          exact document the city published.
        </p>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors mb-8 ${
            dragging
              ? "border-forest bg-green-50"
              : "border-stone-300 hover:border-forest hover:bg-stone-50"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileInput}
          />
          <div className="text-4xl mb-3">📄</div>
          <p className="text-stone-600 font-medium">
            {dragging ? "Drop to verify" : "Drop a PDF here or click to browse"}
          </p>
          <p className="text-stone-400 text-sm mt-1">
            SHA-256 is computed locally — your file never leaves your browser
          </p>
        </div>

        {/* Status panels */}
        {state.status === "hashing" && (
          <StatusBox icon="⏳" color="amber" title="Computing hash…">
            <p className="text-sm text-stone-600">Calculating SHA-256 in your browser.</p>
          </StatusBox>
        )}

        {state.status === "checking" && (
          <StatusBox icon="🔍" color="amber" title="Checking on-chain registry…">
            <HashRow label="SHA-256" value={state.hash} />
          </StatusBox>
        )}

        {state.status === "verified" && (
          <StatusBox icon="✓" color="green" title="Document integrity verified">
            <div className="space-y-2 text-sm">
              <Row label="Document" value={state.title} />
              <HashRow label="SHA-256" value={state.hash} />
              {state.ipfsCid && (
                <Row
                  label="IPFS"
                  value={
                    <a
                      href={`https://ipfs.io/ipfs/${state.ipfsCid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest underline break-all"
                    >
                      ipfs://{state.ipfsCid.slice(0, 20)}…
                    </a>
                  }
                />
              )}
              {state.onchainTx && (
                <Row
                  label="On-chain tx"
                  value={
                    <a
                      href={`https://amoy.polygonscan.com/tx/${state.onchainTx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest underline break-all"
                    >
                      {state.onchainTx.slice(0, 18)}…
                    </a>
                  }
                />
              )}
              <Row label="Registered" value={state.createdAt} />
              <Row
                label="Source"
                value={
                  <a
                    href={state.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest underline break-all"
                  >
                    {state.sourceUrl}
                  </a>
                }
              />
            </div>
          </StatusBox>
        )}

        {state.status === "unregistered" && (
          <StatusBox icon="✗" color="red" title="Document not found in registry">
            <HashRow label="SHA-256 computed" value={state.hash} />
            <p className="text-sm text-stone-600 mt-2">
              This document has not been registered by Civic Lens. It may be a version we
              have not yet ingested, or it may have been modified after publication.
            </p>
          </StatusBox>
        )}

        {state.status === "error" && (
          <StatusBox icon="!" color="red" title="Error">
            <p className="text-sm text-stone-600">{state.message}</p>
          </StatusBox>
        )}

        {/* How it works */}
        <div className="mt-12 border border-stone-200 rounded-xl p-6 bg-white">
          <h2 className="font-serif font-bold text-ink mb-4">How verification works</h2>
          <ol className="space-y-3 text-sm text-stone-600">
            {[
              { n: "1", t: "Hash in browser", b: "Your PDF is hashed with SHA-256 using the Web Crypto API. The file never leaves your device." },
              { n: "2", t: "On-chain lookup", b: "We check the hash against our DocumentRegistry contract on Polygon, where every document we summarize is registered at ingest time." },
              { n: "3", t: "IPFS copy", b: "A permanent copy of the original file is stored on IPFS via Pinata, content-addressed by the same hash." },
              { n: "4", t: "What it proves", b: "If the hashes match, you know the document Civic Lens AI summarized is byte-for-byte identical to what you downloaded. Nobody — including us — can silently alter a registered document." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-forest text-cream text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                  {s.n}
                </span>
                <div>
                  <span className="font-semibold text-ink">{s.t} — </span>
                  {s.b}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function StatusBox({ icon, color, title, children }: { icon: string; color: "green" | "amber" | "red"; title: string; children: React.ReactNode }) {
  const cls = {
    green: "bg-green-50 border-green-200",
    amber: "bg-amber-50 border-amber-200",
    red:   "bg-red-50 border-red-200",
  }[color];
  const titleCls = { green: "text-green-800", amber: "text-amber-800", red: "text-red-800" }[color];
  return (
    <div className={`border rounded-xl p-5 ${cls}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-lg font-bold ${titleCls}`}>{icon}</span>
        <p className={`font-semibold ${titleCls}`}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-stone-400 w-28 shrink-0">{label}</span>
      <span className="text-stone-700 break-all">{value}</span>
    </div>
  );
}

function HashRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-stone-400 w-28 shrink-0">{label}</span>
      <code className="text-xs text-stone-700 break-all font-mono bg-stone-100 px-2 py-0.5 rounded">
        {value}
      </code>
    </div>
  );
}
