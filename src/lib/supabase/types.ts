// Auto-generated types from Supabase schema
// Run `npx supabase gen types typescript --local > src/lib/supabase/types.ts`
// after linking your Supabase project.

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string;
          title: string;
          source_url: string;
          ipfs_cid: string | null;
          sha256_hash: string | null;
          onchain_tx: string | null;
          jurisdiction: string;
          doc_type: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["documents"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]>;
      };
      meetings: {
        Row: {
          id: string;
          date: string;
          title: string;
          video_url: string | null;
          transcript: string | null;
          summary_en: string | null;
          summary_es: string | null;
          summary_zh: string | null;
          decisions: Json | null;
          document_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["meetings"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["meetings"]["Insert"]>;
      };
      bills: {
        Row: {
          id: string;
          external_id: string | null;
          title: string;
          status: string;
          jurisdiction: string;
          full_text: string | null;
          summaries: Json | null;
          arguments_for: Json | null;
          arguments_against: Json | null;
          fiscal_impact: string | null;
          introduced_at: string | null;
          decided_at: string | null;
          document_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bills"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bills"]["Insert"]>;
      };
      chunks: {
        Row: {
          id: string;
          document_id: string | null;
          meeting_id: string | null;
          bill_id: string | null;
          content: string;
          embedding: number[] | null;
          chunk_index: number | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["chunks"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chunks"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          language_preference: string;
          district: string | null;
          watchlist: string[];
          notification_email: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      council_members: {
        Row: {
          id: string;
          name: string;
          district: string | null;
          title: string | null;
          photo_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["council_members"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["council_members"]["Insert"]>;
      };
      votes: {
        Row: {
          id: string;
          meeting_id: string | null;
          bill_id: string | null;
          council_member_id: string | null;
          vote: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["votes"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["votes"]["Insert"]>;
      };
    };
    Functions: {
      match_chunks: {
        Args: { query_embedding: number[]; match_count?: number };
        Returns: Array<{ id: string; content: string; document_id: string; similarity: number }>;
      };
    };
  };
}
