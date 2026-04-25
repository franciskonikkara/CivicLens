import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEM: Record<string, string> = {
  en: `You are a civic assistant for College Park, Maryland. Answer questions about the city budget, council meetings, ordinances, and local government using ONLY the provided source documents.

Rules:
- Answer in English.
- Be concise and specific. Lead with the direct answer.
- Cite the specific document/section for every factual claim using [Source: <title>] inline.
- If the answer is not in the provided documents, say "I don't have enough information in the available documents to answer that precisely."
- Never invent vote counts, dates, dollar amounts, or names.
- Do not editorialize or give opinions.`,

  es: `Eres un asistente cívico para College Park, Maryland. Responde preguntas sobre el presupuesto municipal, las reuniones del consejo, las ordenanzas y el gobierno local utilizando SOLO los documentos fuente proporcionados.

Reglas:
- Responde en español.
- Sé conciso y específico. Empieza con la respuesta directa.
- Cita el documento/sección específico para cada afirmación factual usando [Fuente: <título>] en línea.
- Si la respuesta no está en los documentos proporcionados, di "No tengo suficiente información en los documentos disponibles para responder eso con precisión."
- Nunca inventes recuentos de votos, fechas, cantidades en dólares ni nombres.`,

  zh: `你是马里兰州大学公园市的市政助手。请仅使用提供的来源文件，回答有关城市预算、市议会会议、法令和地方政府的问题。

规则：
- 用中文回答。
- 简洁具体，直接给出答案。
- 对每个事实性陈述，使用[来源：<标题>]进行内联引用。
- 如果提供的文件中没有相关答案，请说"现有文件中没有足够的信息来精确回答这个问题。"
- 切勿编造投票数、日期、金额或姓名。`,
};

export async function POST(req: NextRequest) {
  try {
    const { question, lang = "en", context } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    const supabase = await createClient();

    // ── Retrieve relevant chunks via pgvector cosine similarity ──────────────
    // For hackathon: fall back to keyword search if embeddings not yet populated
    let chunks: { content: string; title: string; source_url: string | null }[] = [];

    try {
      // Try semantic search first (requires embeddings to be seeded)
      const embeddingRes = await anthropic.embeddings?.create?.({
        model: "voyage-3",
        input: question,
      } as never).catch(() => null);

      if (embeddingRes) {
        const { data: semChunks } = await supabase.rpc("match_chunks", {
          query_embedding: (embeddingRes as { data: number[] }).data,
          match_count: 5,
        });
        if (semChunks?.length) {
          const docIds = semChunks.map((c: { document_id: string }) => c.document_id);
          const { data: docs } = await supabase
            .from("documents")
            .select("id, title, source_url")
            .in("id", docIds);
          const docMap = new Map(docs?.map((d) => [d.id, d]) ?? []);
          chunks = semChunks.map((c: { content: string; document_id: string }) => ({
            content: c.content,
            title: docMap.get(c.document_id)?.title ?? "City Document",
            source_url: docMap.get(c.document_id)?.source_url ?? null,
          }));
        }
      }
    } catch {
      // Embeddings not configured — continue with keyword fallback
    }

    // ── Keyword fallback: search chunks table by text similarity ─────────────
    if (!chunks.length) {
      const keywords = question
        .toLowerCase()
        .replace(/[^a-z0-9一-鿿\s]/g, "")
        .split(/\s+/)
        .filter((w: string) => w.length > 3)
        .slice(0, 4);

      for (const kw of keywords) {
        const { data: kChunks } = await supabase
          .from("chunks")
          .select("content, document_id")
          .ilike("content", `%${kw}%`)
          .limit(3);

        if (kChunks?.length) {
          const docIds = [...new Set(kChunks.map((c) => c.document_id))];
          const { data: docs } = await supabase
            .from("documents")
            .select("id, title, source_url")
            .in("id", docIds);
          const docMap = new Map(docs?.map((d) => [d.id, d]) ?? []);
          chunks.push(
            ...kChunks.map((c) => ({
              content: c.content,
              title: docMap.get(c.document_id)?.title ?? "City Document",
              source_url: docMap.get(c.document_id)?.source_url ?? null,
            }))
          );
          if (chunks.length >= 5) break;
        }
      }
    }

    // ── Also pull summaries from bills and meetings for context ───────────────
    if (chunks.length < 3) {
      const summaryField = `summary_${lang === "zh" ? "zh" : lang === "es" ? "es" : "en"}`;
      const { data: meetings } = await supabase
        .from("meetings")
        .select(`title, date, ${summaryField}`)
        .not(summaryField, "is", null)
        .order("date", { ascending: false })
        .limit(3);

      meetings?.forEach((m) => {
        const summary = m[summaryField as keyof typeof m] as string;
        if (summary) {
          chunks.push({
            content: `Meeting: ${m.title} (${m.date})\n${summary}`,
            title: m.title,
            source_url: null,
          });
        }
      });

      const { data: bills } = await supabase
        .from("bills")
        .select("title, summaries, fiscal_impact")
        .limit(5);

      bills?.forEach((b) => {
        const sums = b.summaries as Record<string, string> | null;
        const summary = sums?.[lang] ?? sums?.en;
        if (summary) {
          chunks.push({
            content: `Bill: ${b.title}\nSummary: ${summary}${b.fiscal_impact ? `\nFiscal Impact: ${b.fiscal_impact}` : ""}`,
            title: b.title,
            source_url: null,
          });
        }
      });
    }

    // ── Build context string ──────────────────────────────────────────────────
    const contextStr =
      context ??
      (chunks.length > 0
        ? chunks
            .map((c, i) => `[Document ${i + 1}: ${c.title}]\n${c.content}`)
            .join("\n\n---\n\n")
        : "No specific documents found. Answer based on general knowledge of College Park, MD FY2027 budget.");

    // ── Call Claude ───────────────────────────────────────────────────────────
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: SYSTEM[lang] ?? SYSTEM.en,
      messages: [
        {
          role: "user",
          content: `Source Documents:\n\n${contextStr}\n\n---\n\nQuestion: ${question}`,
        },
      ],
    });

    const answer =
      message.content[0].type === "text" ? message.content[0].text : "";

    // ── Deduplicate citations ─────────────────────────────────────────────────
    const seen = new Set<string>();
    const citations = chunks
      .filter((c) => {
        if (seen.has(c.title)) return false;
        seen.add(c.title);
        return true;
      })
      .slice(0, 4)
      .map((c) => ({ title: c.title, url: c.source_url ?? undefined }));

    return NextResponse.json({ answer, citations });
  } catch (err) {
    console.error("/api/ask error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
