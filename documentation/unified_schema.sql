-- Clarity App Unified Schema (For Visualization Purposes)
-- This schema represents both Sanity.io content and Supabase PostgreSQL tables
-- Note: This is for documentation/visualization only and does not reflect the actual implementation

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";

-- Enum Types
CREATE TYPE public.node_status AS ENUM ('locked', 'unlocked', 'in_progress', 'completed');
CREATE TYPE public.user_mood AS ENUM ('happy', 'sad', 'angry', 'confused', 'calm', 'excited', 'anxious', 'neutral');
CREATE TYPE public.node_type AS ENUM ('content', 'assessment', 'intro_assessment');
CREATE TYPE public.relationship_type AS ENUM ('prerequisite', 'related', 'expands-on', 'contrasts-with', 'leads-to');
CREATE TYPE public.answer_type AS ENUM ('multiple-choice-single', 'multiple-choice-multiple', 'rating-scale', 'journal-entry', 'text-input');

-- =============================================
-- Sanity Content Tables (For visualization purposes)
-- =============================================
CREATE TABLE public.sanity_domains (
    id text PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    color text,
    icon text
);

CREATE TABLE public.sanity_domain_relationships (
    id serial PRIMARY KEY,
    domain_id text REFERENCES public.sanity_domains(id),
    related_domain_id text REFERENCES public.sanity_domains(id)
);

CREATE TABLE public.sanity_tags (
    id text PRIMARY KEY,
    name text NOT NULL,
    description text,
    color text
);

CREATE TABLE public.sanity_nodes (
    id text PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    node_type node_type NOT NULL,
    domain_id text REFERENCES public.sanity_domains(id),
    metadata jsonb,
    embeddings text[],
    assessment_template text
);

CREATE TABLE public.sanity_node_tags (
    id serial PRIMARY KEY,
    node_id text REFERENCES public.sanity_nodes(id),
    tag_name text
);

CREATE TABLE public.sanity_questions (
    id text PRIMARY KEY,
    question_text text NOT NULL,
    notes text,
    section text,
    domain_id text REFERENCES public.sanity_domains(id),
    parent_node_id text REFERENCES public.sanity_nodes(id),
    source text,
    answer_type answer_type NOT NULL,
    answer_labels jsonb,
    min_rating integer,
    max_rating integer,
    rating_labels jsonb,
    skip_logic jsonb,
    weight numeric
);

CREATE TABLE public.sanity_question_tags (
    id serial PRIMARY KEY,
    question_id text REFERENCES public.sanity_questions(id),
    tag_name text
);

CREATE TABLE public.sanity_similar_questions (
    id serial PRIMARY KEY,
    question_id text REFERENCES public.sanity_questions(id),
    similar_question_id text REFERENCES public.sanity_questions(id)
);

CREATE TABLE public.sanity_resources (
    id text PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    content jsonb NOT NULL,
    domain_id text REFERENCES public.sanity_domains(id),
    source text,
    external_links jsonb,
    is_ai_generated boolean,
    generation_prompt text
);

CREATE TABLE public.sanity_resource_tags (
    id serial PRIMARY KEY,
    resource_id text REFERENCES public.sanity_resources(id),
    tag_name text
);

CREATE TABLE public.sanity_resource_nodes (
    id serial PRIMARY KEY,
    resource_id text REFERENCES public.sanity_resources(id),
    node_id text REFERENCES public.sanity_nodes(id)
);

CREATE TABLE public.sanity_node_questions (
    id serial PRIMARY KEY,
    node_id text REFERENCES public.sanity_nodes(id),
    question_id text REFERENCES public.sanity_questions(id)
);

CREATE TABLE public.sanity_node_resources (
    id serial PRIMARY KEY,
    node_id text REFERENCES public.sanity_nodes(id),
    resource_id text REFERENCES public.sanity_resources(id)
);

CREATE TABLE public.sanity_edges (
    id text PRIMARY KEY,
    source_node_id text REFERENCES public.sanity_nodes(id),
    target_node_id text REFERENCES public.sanity_nodes(id),
    relationship_type relationship_type NOT NULL,
    strength numeric,
    description text
);

CREATE TABLE public.sanity_edge_unlock_requirements (
    id serial PRIMARY KEY,
    edge_id text REFERENCES public.sanity_edges(id),
    question_id text REFERENCES public.sanity_questions(id),
    required_answers text[]
);

CREATE TABLE public.sanity_node_unlock_criteria (
    id serial PRIMARY KEY,
    node_id text REFERENCES public.sanity_nodes(id),
    prerequisite_node_id text REFERENCES public.sanity_nodes(id),
    prerequisite_question_id text REFERENCES public.sanity_questions(id),
    required_answers text[]
);

-- =============================================
-- Supabase Tables (User Generated Content)
-- =============================================
CREATE TABLE public.users (
    id uuid PRIMARY KEY,
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

CREATE TABLE public.user_node_states (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sanity_node_ref text REFERENCES public.sanity_nodes(id) NOT NULL,
    status node_status DEFAULT 'locked' NOT NULL,
    unlocked_at timestamptz,
    completed_at timestamptz,
    progress_percentage integer DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    user_notes text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, sanity_node_ref)
);

CREATE TABLE public.user_node_unlocks (
    id serial PRIMARY KEY,
    user_node_state_id uuid REFERENCES public.user_node_states(id),
    unlocked_node_ref text REFERENCES public.sanity_nodes(id)
);

CREATE TABLE public.journal_entries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title text,
    content text NOT NULL,
    mood user_mood,
    ai_summary text,
    ai_tags text[] DEFAULT '{}'::text[],
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.journal_entry_nodes (
    id serial PRIMARY KEY,
    journal_entry_id uuid REFERENCES public.journal_entries(id),
    sanity_node_ref text REFERENCES public.sanity_nodes(id)
);

CREATE TABLE public.journal_entry_questions (
    id serial PRIMARY KEY,
    journal_entry_id uuid REFERENCES public.journal_entries(id),
    sanity_question_ref text REFERENCES public.sanity_questions(id)
);

CREATE TABLE public.journal_entry_tags (
    id serial PRIMARY KEY,
    journal_entry_id uuid REFERENCES public.journal_entries(id),
    sanity_tag_ref text REFERENCES public.sanity_tags(id)
);

CREATE TABLE public.user_responses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sanity_node_ref text REFERENCES public.sanity_nodes(id) NOT NULL,
    sanity_question_ref text REFERENCES public.sanity_questions(id) NOT NULL,
    answer text NOT NULL,
    journal_entry_id uuid REFERENCES public.journal_entries(id),
    skipped boolean DEFAULT false,
    skip_reason text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, sanity_node_ref, sanity_question_ref)
);

CREATE TABLE public.node_questions (
    id serial PRIMARY KEY,
    sanity_node_ref text REFERENCES public.sanity_nodes(id) NOT NULL,
    sanity_question_ref text REFERENCES public.sanity_questions(id) NOT NULL,
    sequence_order integer NOT NULL,
    UNIQUE(sanity_node_ref, sanity_question_ref)
);

CREATE TABLE public.node_unlock_rules (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    source_sanity_node_ref text REFERENCES public.sanity_nodes(id) NOT NULL,
    sanity_question_ref text REFERENCES public.sanity_questions(id) NOT NULL,
    answer text NOT NULL,
    target_sanity_node_ref text REFERENCES public.sanity_nodes(id) NOT NULL
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_user_node_states_user_id_node ON public.user_node_states(user_id, sanity_node_ref);
CREATE INDEX idx_user_responses_user_id_node_question ON public.user_responses(user_id, sanity_node_ref, sanity_question_ref);
CREATE INDEX idx_journal_entries_user_id_created ON public.journal_entries(user_id, created_at DESC);
CREATE INDEX idx_node_questions_node ON public.node_questions(sanity_node_ref);
CREATE INDEX idx_node_unlock_rules_source ON public.node_unlock_rules(source_sanity_node_ref);
CREATE INDEX idx_node_unlock_rules_target ON public.node_unlock_rules(target_sanity_node_ref); 