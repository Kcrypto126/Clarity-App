# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

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

- **Question**: Individual questions within nodes

  - Different answer types: multiple choice, rating scales, text input, journal entries
  - Can be part of the introductory assessment

- **Edge**: Connections between nodes in the mind map

  - Represents relationships and dependencies between topics
  - Controls node unlocking logic

- **Domain**: Categories for organizing nodes (e.g., "Relationships", "Career")

- **Resource**: Content or guidance provided to users

  - Can be AI-generated or manually created
  - Linked to specific nodes

- **Introductory Assessment**: The initial questionnaire
  - Contains rules for unlocking initial nodes based on answers

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
5. Set up the Introductory Assessment
6. Add Resources for each node
