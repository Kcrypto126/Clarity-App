-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";

-- Create enum types
CREATE TYPE public.node_status AS ENUM ('locked', 'unlocked', 'in_progress', 'completed');
CREATE TYPE public.user_mood AS ENUM ('happy', 'sad', 'angry', 'confused', 'calm', 'excited', 'anxious', 'neutral');
CREATE TYPE public.node_type AS ENUM ('content', 'assessment', 'intro_assessment');

-- Create a type for Sanity references
CREATE TYPE public.sanity_reference AS (
    _ref text,
    _type text
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id uuid REFERENCES auth.users(id) PRIMARY KEY,
    email text NOT NULL,
    first_name text,
    last_name text,
    age integer,
    gender text,
    life_stage text,
    onboarding_completed boolean DEFAULT false,
    settings jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create node_questions table to associate questions with nodes
CREATE TABLE public.node_questions (
    sanity_node_ref text NOT NULL,
    sanity_question_ref text NOT NULL,
    sequence_order integer NOT NULL,
    PRIMARY KEY (sanity_node_ref, sanity_question_ref)
);

-- Create node_unlock_rules table for all node unlock logic
CREATE TABLE public.node_unlock_rules (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    source_sanity_node_ref text NOT NULL,
    sanity_question_ref text NOT NULL,
    answer text NOT NULL,
    target_sanity_node_ref text NOT NULL
);

-- Create user_node_states table (handles all node types including assessments)
CREATE TABLE public.user_node_states (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sanity_node_ref text NOT NULL,
    status node_status DEFAULT 'locked' NOT NULL,
    unlocked_at timestamptz,
    completed_at timestamptz,
    progress_percentage integer DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    user_notes text,
    unlocked_sanity_node_refs text[] DEFAULT '{}'::text[],
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, sanity_node_ref)
);

-- Create journal_entries table
CREATE TABLE public.journal_entries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title text,
    content text NOT NULL,
    mood user_mood,
    related_sanity_node_refs text[] DEFAULT '{}'::text[],
    related_sanity_question_refs text[] DEFAULT '{}'::text[],
    sanity_tag_refs jsonb[] DEFAULT '{}'::jsonb[],
    ai_summary text,
    ai_tags text[] DEFAULT '{}'::text[],
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create user_responses table
CREATE TABLE public.user_responses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sanity_node_ref text NOT NULL,
    sanity_question_ref text NOT NULL,
    answer text NOT NULL,
    journal_entry_id uuid REFERENCES public.journal_entries(id),
    skipped boolean DEFAULT false,
    skip_reason text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, sanity_node_ref, sanity_question_ref)
);

-- Create RLS policies for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only read their own data" ON public.users
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for user_node_states table
ALTER TABLE public.user_node_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own node states" ON public.user_node_states
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own node states" ON public.user_node_states
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own node states" ON public.user_node_states
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for journal_entries table
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own journal entries" ON public.journal_entries
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own journal entries" ON public.journal_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own journal entries" ON public.journal_entries
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own journal entries" ON public.journal_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for user_responses table
ALTER TABLE public.user_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own responses" ON public.user_responses
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own responses" ON public.user_responses
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own responses" ON public.user_responses
    FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_user_node_states_user_id_node ON public.user_node_states(user_id, sanity_node_ref);
CREATE INDEX idx_user_responses_user_id_node_question ON public.user_responses(user_id, sanity_node_ref, sanity_question_ref);
CREATE INDEX idx_journal_entries_user_id_created ON public.journal_entries(user_id, created_at DESC);
CREATE INDEX idx_node_questions_node ON public.node_questions(sanity_node_ref);
CREATE INDEX idx_node_unlock_rules_source ON public.node_unlock_rules(source_sanity_node_ref);
CREATE INDEX idx_node_unlock_rules_target ON public.node_unlock_rules(target_sanity_node_ref);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER user_node_states_updated_at
    BEFORE UPDATE ON public.user_node_states
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER user_responses_updated_at
    BEFORE UPDATE ON public.user_responses
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
