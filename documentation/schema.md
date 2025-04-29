# Clarity App Data Schema

This document provides a comprehensive overview of the Clarity App's data architecture, which spans two separate systems:

1. **Sanity.io** - For team-managed content
2. **Supabase (PostgreSQL)** - For user-generated content

## Data Flow Overview

```
┌───────────────┐        ┌───────────────┐        ┌───────────────┐
│               │        │               │        │               │
│   Sanity.io   │◄──────►│  Clarity App  │◄──────►│   Supabase    │
│  Content Lake │        │  (Mobile App) │        │  (PostgreSQL) │
│               │        │               │        │               │
└───────────────┘        └───────────────┘        └───────────────┘
     System               Application Layer          User Data
     Content                                          Storage
```

- The application fetches system content (nodes, questions, etc.) from Sanity
- User interactions (responses, journal entries) are stored in Supabase
- The app maintains relationships between Sanity documents and user data via reference IDs

## Sanity Content Model

### Node

Represents a topic or module for assessment in the mind map.

| Field              | Type       | Description                                    |
| ------------------ | ---------- | ---------------------------------------------- |
| id                 | text       | Unique identifier                              |
| title              | text       | Node title                                     |
| slug               | slug       | URL-friendly identifier                        |
| description        | text       | Detailed description                           |
| nodeType           | enum       | 'content', 'assessment', or 'intro_assessment' |
| domain             | reference  | Domain this node belongs to                    |
| metadata           | object     | Age range, gender, life stage targeting        |
| questions          | references | Questions contained in this node               |
| resources          | references | Resources related to this node                 |
| assessmentTemplate | text       | Template for AI-generated responses            |
| unlockCriteria     | array      | Rules for when this node becomes available     |

### Question

Individual questions presented to users.

| Field            | Type             | Description                                     |
| ---------------- | ---------------- | ----------------------------------------------- |
| id               | text             | Unique identifier                               |
| title            | text             | The question text                               |
| notes            | text             | Internal notes about the question               |
| section          | text             | Section within the node                         |
| domain           | reference        | Domain this question relates to                 |
| parentNode       | reference        | Node this question belongs to                   |
| answerType       | enum             | Type of answer expected                         |
| answers          | array of objects | List of possible answers. Each object contains: |
|                  |                  | - id: string (unique within the question)       |
|                  |                  | - label: string (display text)                  |
|                  |                  | - value: number (required for rating scales)    |
|                  |                  | - unlocksNodes: array of references to nodes    |
| ratingLabels     | object           | Labels for rating scales                        |
| skipLogic        | array            | Reasons users might skip this question          |
| weight           | number           | Importance of this question                     |
| similarQuestions | references       | Related questions                               |

### Domain

Categories that organize nodes.

| Field          | Type       | Description                |
| -------------- | ---------- | -------------------------- |
| id             | text       | Unique identifier          |
| title          | text       | Domain name                |
| slug           | slug       | URL-friendly identifier    |
| description    | text       | Description of this domain |
| color          | text       | Color code for UI          |
| icon           | text       | Icon identifier for UI     |
| relatedDomains | references | Connected domains          |

### Resource

Content provided to users based on their responses.

| Field            | Type       | Description                       |
| ---------------- | ---------- | --------------------------------- |
| id               | text       | Unique identifier                 |
| title            | text       | Resource title                    |
| description      | text       | Resource description              |
| content          | blocks     | Rich text content                 |
| domain           | reference  | Domain this resource belongs to   |
| relatedNodes     | references | Nodes this resource is related to |
| externalLinks    | array      | Links to external resources       |
| isAIGenerated    | boolean    | Whether this was AI-generated     |
| generationPrompt | text       | Prompt used for generation        |

### Edge

Relationships between nodes in the mind map.

| Field              | Type      | Description                       |
| ------------------ | --------- | --------------------------------- |
| id                 | text      | Unique identifier                 |
| sourceNode         | reference | Origin node                       |
| targetNode         | reference | Destination node                  |
| relationshipType   | enum      | Type of relationship              |
| strength           | number    | Strength (0-10) of relationship   |
| description        | text      | Description of the relationship   |
| unlockRequirements | array     | Requirements to unlock targetNode |

## Supabase Database Schema

### users

Stores user profile information.

| Column               | Type        | Description          |
| -------------------- | ----------- | -------------------- |
| id                   | uuid        | Primary key          |
| email                | text        | User's email         |
| first_name           | text        | First name           |
| last_name            | text        | Last name            |
| age                  | integer     | User's age           |
| gender               | text        | User's gender        |
| life_stage           | text        | Life stage           |
| onboarding_completed | boolean     | Completed setup      |
| settings             | jsonb       | User preferences     |
| created_at           | timestamptz | Record creation time |
| updated_at           | timestamptz | Last update time     |

### user_node_states

Tracks user progress through nodes.

| Column                    | Type        | Description                                      |
| ------------------------- | ----------- | ------------------------------------------------ |
| id                        | uuid        | Primary key                                      |
| user_id                   | uuid        | Reference to users.id                            |
| sanity_node_ref           | text        | Sanity node ID                                   |
| status                    | node_status | 'locked', 'unlocked', 'in_progress', 'completed' |
| unlocked_at               | timestamptz | When node was unlocked                           |
| completed_at              | timestamptz | When node was completed                          |
| progress_percentage       | integer     | Completion percentage                            |
| user_notes                | text        | User notes on this node                          |
| unlocked_sanity_node_refs | text[]      | Nodes unlocked by this one                       |
| created_at                | timestamptz | Record creation time                             |
| updated_at                | timestamptz | Last update time                                 |

### user_responses

Stores user answers to questions.

| Column              | Type        | Description                  |
| ------------------- | ----------- | ---------------------------- |
| id                  | uuid        | Primary key                  |
| user_id             | uuid        | Reference to users.id        |
| sanity_node_ref     | text        | Sanity node ID               |
| sanity_question_ref | text        | Sanity question ID           |
| answer              | text        | User's answer                |
| journal_entry_id    | uuid        | Optional journal entry       |
| skipped             | boolean     | Whether question was skipped |
| skip_reason         | text        | Reason for skipping          |
| created_at          | timestamptz | Record creation time         |
| updated_at          | timestamptz | Last update time             |

### journal_entries

Stores user journal entries.

| Column                       | Type        | Description           |
| ---------------------------- | ----------- | --------------------- |
| id                           | uuid        | Primary key           |
| user_id                      | uuid        | Reference to users.id |
| title                        | text        | Entry title           |
| content                      | text        | Entry content         |
| mood                         | user_mood   | User's mood           |
| related_sanity_node_refs     | text[]      | Related node IDs      |
| related_sanity_question_refs | text[]      | Related question IDs  |
| sanity_tag_refs              | jsonb[]     | Related tags          |
| ai_summary                   | text        | AI-generated summary  |
| ai_tags                      | text[]      | AI-generated tags     |
| created_at                   | timestamptz | Record creation time  |
| updated_at                   | timestamptz | Last update time      |

### node_questions

Maps questions to nodes for ordering.

| Column              | Type    | Description           |
| ------------------- | ------- | --------------------- |
| sanity_node_ref     | text    | Sanity node ID        |
| sanity_question_ref | text    | Sanity question ID    |
| sequence_order      | integer | Order in the sequence |

## Complete Database Schema for Visualization

For visualization purposes, here's the complete schema representing both systems:

```sql
-- See the full schema in documentation/unified_schema.sql
```

## Key Data Flows

1. **Initial User Experience**:

   - User opens app for the first time
   - System automatically unlocks intro_assessment nodes
   - User answers questions in intro_assessment
   - Based on node_unlock_rules, specific nodes are unlocked

2. **Node Interactions**:

   - User selects an unlocked node
   - System retrieves questions for that node from Sanity
   - User answers are stored in user_responses
   - Progress is tracked in user_node_states
   - New nodes may unlock based on node_unlock_rules

3. **Journaling**:
   - User creates journal entries
   - Entries may be linked to specific nodes/questions
   - AI analyzes entries to generate tags and summaries
