import { Database } from "./supabase";

export type SupabaseClient<T extends Database> = T["public"]["Tables"];

type Tables = Database["public"]["Tables"];

export type UserResponse = Tables["user_responses"]["Row"];
export type UserResponseInsert = Tables["user_responses"]["Insert"];
export type UserResponseUpdate = Tables["user_responses"]["Update"];

export type User = Tables["users"]["Row"];

export type JournalEntry = Tables["journal_entries"]["Row"];

export type NodeQuestion = Tables["node_questions"]["Row"];

