# Sanity Clean Content Studio

- [Read "getting started" in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

# Clarity Content Studio

This is the content management system for the Clarity app, built with Sanity.io.

> **Important Note**: This CMS is exclusively for team-managed content that will be integrated into the app for users to consume. User-generated content (journal entries, responses, etc.) will be stored separately in Supabase, not in Sanity, to optimize costs and performance.

## Content Model

The Clarity app uses a directed graph (digraph) as its core data model:

### Main Schemas

- **Node**: Represents an assessment topic (e.g., "Parenthood")

  - Contains questions, metadata, and resources
  - Used to build the mind map in the app
  - Has a `nodeType` field that can be 'content', 'assessment', or 'intro_assessment'
  - Intro assessment nodes are automatically unlocked for new users and serve as entry points

- **Question**: Individual questions within nodes

  - Different answer types: multiple choice, rating scales, text input, journal entries
  - Associated with specific nodes through references

- **Edge**: Connections between nodes in the mind map

  - Represents relationships and dependencies between topics
  - Controls node unlocking logic

- **Domain**: Categories for organizing nodes (e.g., "Relationships", "Career")

- **Resource**: Content or guidance provided to users

  - Can be AI-generated or manually created
  - Linked to specific nodes

- **Tag**: Labels for categorizing and filtering content

## Getting Started

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open your browser at http://localhost:3333

## Content Entry

When entering content into the CMS:

1. Create Domains first
2. Create Nodes within those domains
3. Create Questions within nodes
4. Create Edges to connect related nodes
5. Create at least one Node with nodeType = 'intro_assessment' as an entry point
6. Add Resources for each node
