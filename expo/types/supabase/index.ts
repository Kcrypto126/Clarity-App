import { Database } from "./supabase";

export type SupabaseClient<T extends Database> = T["public"]["Tables"];

type Tables = Database["public"]["Tables"];

export type UserResponse = Tables["user_responses"]["Row"];
export type UserResponseInsert = Omit<
  Tables["user_responses"]["Insert"],
  "created_at" | "updated_at" | "id"
>;
export type UserResponseUpdate = Tables["user_responses"]["Update"];

export type User = Tables["users"]["Row"];

export type JournalEntry = Tables["journal_entries"]["Row"];
export type JournalEntryInsert = Omit<
  Tables["journal_entries"]["Insert"],
  "created_at" | "updated_at" | "id"
>;
export type JournalEntryUpdate = Tables["journal_entries"]["Update"];

export type NodeQuestion = Tables["node_questions"]["Row"];


