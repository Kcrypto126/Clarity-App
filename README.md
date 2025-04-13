# Clarity App

Clarity is a personalized self-discovery app that guides users through research-backed assessments to gain deeper personal insights.

## Features

### Introductory Assessment

- Initial questionnaire to match users with relevant nodes based on demographics
- Unlocks personalized starting nodes stored in the database
- Progressively unlocks new nodes as users continue their journey

### The Mind Map

- Utilizes a directed graph (digraph) as the core data model
- **Nodes** represent assessments (e.g., "Parenthood")
  - Each node contains:
    - Questions for the user to answer
    - Metadata for compatibility (age, sex, life stage)
    - Embeddings for vector similarity
    - Status flags (locked, unlocked, answered)
    - Resource links for content or guidance
    - Assessment templates for evaluation
- **Edges** represent directional relationships between nodes

### Node Interactions

- **Question Presentation**: AI-assisted prioritization of questions
- **Answering Node Questions**:
  - Vector similarity search to light up related nodes
  - AI analysis of user responses
- **Guide Mode**: Nodes radiate based on personal significance
- **Resources**: AI-generated guidance based on assessment templates

### Journaling

- Free-form writing area for user thoughts
- Can be used standalone or to answer node questions in depth

### Anthology

- Area to analyze all user answers
- Generate personalized resources based on profile information

### Sign-up Flow

1. Complete introductory assessment
2. Registration page
3. Land on personalized mind map with unlocked nodes

## Technical Architecture

The app is built with:

- **React Native** (Ignite framework) for the mobile application
- **Sanity.io** for content management of team-created content (nodes, questions, resources)
- **Supabase** for user data storage (user profiles, responses, journal entries, node states)
- **Vector-based similarity search** for personalized recommendations
- **AI-powered content generation** for personalized guidance

### Data Architecture

- **Team-managed content** (Sanity):

  - Nodes with types (content, assessment, intro_assessment)
  - Questions and their relationships to nodes
  - Resources and guidance content
  - Domains for categorizing content
  - Edges defining relationships between nodes

- **User-generated content** (Supabase):
  - User profiles and demographic information
  - Question responses and progress tracking
  - Journal entries
  - Node unlock states for each user
  - Node unlock rules connecting user responses to node unlocking

## Development Roadmap

- [x] Project setup with Ignite
- [x] Sanity schema implementation for nodes and questions
- [x] Supabase schema setup for user data
- [ ] User authentication and profile management
- [ ] Introductory assessment flow
- [ ] Mind map visualization
- [ ] Node interaction logic
- [ ] Journaling feature
- [ ] Anthology section
- [ ] AI integration for resource generation

## Getting Started

See individual README files in each directory for specific setup instructions:

- `/expo` - Mobile application with Expo
- `/backend` - NodeJS backend with Express
- `/supabase` - Database migrations with Postgres
- `/website` - Company website with NextJS
- `/sanity` - Content management system
