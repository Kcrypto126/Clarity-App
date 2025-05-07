export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      journal_entries: {
        Row: {
          ai_summary: string | null
          ai_tags: string[] | null
          content: string
          created_at: string
          id: string
          mood: Database["public"]["Enums"]["user_mood"] | null
          related_sanity_node_refs: string[] | null
          related_sanity_question_refs: string[] | null
          sanity_tag_refs: Json[] | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_summary?: string | null
          ai_tags?: string[] | null
          content: string
          created_at?: string
          id?: string
          mood?: Database["public"]["Enums"]["user_mood"] | null
          related_sanity_node_refs?: string[] | null
          related_sanity_question_refs?: string[] | null
          sanity_tag_refs?: Json[] | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_summary?: string | null
          ai_tags?: string[] | null
          content?: string
          created_at?: string
          id?: string
          mood?: Database["public"]["Enums"]["user_mood"] | null
          related_sanity_node_refs?: string[] | null
          related_sanity_question_refs?: string[] | null
          sanity_tag_refs?: Json[] | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      node_questions: {
        Row: {
          sanity_node_ref: string
          sanity_question_ref: string
          sequence_order: number
        }
        Insert: {
          sanity_node_ref: string
          sanity_question_ref: string
          sequence_order: number
        }
        Update: {
          sanity_node_ref?: string
          sanity_question_ref?: string
          sequence_order?: number
        }
        Relationships: []
      }
      user_node_states: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          progress_percentage: number | null
          sanity_node_ref: string
          status: Database["public"]["Enums"]["node_status"]
          unlocked_at: string | null
          unlocked_sanity_node_refs: string[] | null
          updated_at: string
          user_id: string
          user_notes: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          progress_percentage?: number | null
          sanity_node_ref: string
          status?: Database["public"]["Enums"]["node_status"]
          unlocked_at?: string | null
          unlocked_sanity_node_refs?: string[] | null
          updated_at?: string
          user_id: string
          user_notes?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          progress_percentage?: number | null
          sanity_node_ref?: string
          status?: Database["public"]["Enums"]["node_status"]
          unlocked_at?: string | null
          unlocked_sanity_node_refs?: string[] | null
          updated_at?: string
          user_id?: string
          user_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_node_states_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_responses: {
        Row: {
          answer_id: string
          answer_label: string | null
          created_at: string
          id: string
          journal_entry_id: string | null
          sanity_node_ref: string
          sanity_question_ref: string
          skip_reason: string | null
          skipped: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answer_id: string
          answer_label?: string | null
          created_at?: string
          id?: string
          journal_entry_id?: string | null
          sanity_node_ref: string
          sanity_question_ref: string
          skip_reason?: string | null
          skipped?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answer_id?: string
          answer_label?: string | null
          created_at?: string
          id?: string
          journal_entry_id?: string | null
          sanity_node_ref?: string
          sanity_question_ref?: string
          skip_reason?: string | null
          skipped?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string
          email: string
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          life_stage: string | null
          onboarding_completed: boolean | null
          settings: Json | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          email: string
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          life_stage?: string | null
          onboarding_completed?: boolean | null
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          life_stage?: string | null
          onboarding_completed?: boolean | null
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      node_status: "locked" | "unlocked" | "in_progress" | "completed"
      node_type: "assessment" | "intro_assessment"
      user_mood:
        | "happy"
        | "sad"
        | "angry"
        | "confused"
        | "calm"
        | "excited"
        | "anxious"
        | "neutral"
    }
    CompositeTypes: {
      sanity_reference: {
        _ref: string | null
        _type: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

