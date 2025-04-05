# Clarity - Your Personal Growth Navigator

Clarity is a mobile application designed to guide users through their personal growth journey using research-backed assessments and AI-powered insights.

## Core Features

### 1. Mind Map (Core Data Model)

The application uses a directed graph (digraph) structure with:

#### Nodes

- Represent individual assessments (e.g., "Parenthood")
- Components:
  - Questions with multiple answer types:
    - Multiple choice
    - Check all that apply
    - Rating scales
    - Skip option with reason
    - Journal integration
  - Metadata (age, sex, life stage compatibility)
  - Vector embeddings for similarity matching
  - Status flags (locked/unlocked/answered)
  - Resource links
  - Assessment templates

#### Edges

- Represent directional relationships between nodes
- Define prerequisites and unlock conditions
- Guide the user's journey progression

### 2. Introductory Assessment Flow

1. Initial onboarding assessment
2. Demographics-based node matching
3. Registration prompt
4. Personalized mind map presentation

### 3. Node Interaction System

#### Question Presentation

- AI-powered prioritization
- Duplicate/similar question detection
- Context-aware presentation

#### Answer Processing

- Vector similarity search for related nodes
- Short-form answer analysis
- Journal integration for detailed responses

#### Guide Mode

- Personal significance visualization
- Vector search-based recommendations
- Available node corpus management

### 4. Journaling System

- Standalone thought collection
- Node question integration
- Free-form writing capabilities
- Answer augmentation

### 5. Anthology (Answer Analysis)

- Comprehensive answer review
- Resource generation
- Profile-based insights
- Progress tracking

## Technical Implementation

### Database Schema (Supabase)

1. `public.accounts`

   - Core user account information
   - Links to auth.users

2. `public.nodes`

   - Node definitions
   - Question content
   - Metadata
   - Vector embeddings

3. `public.user_nodes`

   - User-specific node status
   - Unlock conditions
   - Answer history

4. `public.edges`

   - Node relationships
   - Prerequisite mappings

5. `public.journal_entries`

   - User journal content
   - Node associations

6. `public.assessments`
   - User assessment responses
   - Demographic data
   - Initial survey results

### Security Considerations

- RLS policies for all tables
- User data isolation
- Secure API endpoints
- Protected assessment data

### UI/UX Implementation

1. Onboarding Flow

   - Introductory assessment
   - Registration
   - Mind map introduction

2. Mind Map Interface

   - Interactive node visualization
   - Progress indicators
   - Unlock animations

3. Assessment Interface

   - Multiple answer types
   - Journal integration
   - Skip functionality

4. Journal Interface

   - Rich text editor
   - Node linking
   - Search functionality

5. Anthology View
   - Answer compilation
   - Resource presentation
   - Progress visualization

## Development Roadmap

1. Phase 1: Core Infrastructure

   - Database schema setup
   - Authentication system
   - Basic API endpoints

2. Phase 2: Assessment Engine

   - Introductory assessment
   - Node system implementation
   - Answer processing

3. Phase 3: Mind Map

   - Graph visualization
   - Node interactions
   - Unlock system

4. Phase 4: Journal & Anthology

   - Journal implementation
   - Answer compilation
   - Resource generation

5. Phase 5: AI Integration
   - Vector similarity search
   - Resource generation
   - Answer analysis

## Getting Started

```bash
# Install dependencies
yarn install

# Start the development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Tech Stack

- React Native (Expo)
- TypeScript
- Supabase
- React Navigation
- React Query
- Tailwind CSS
- Vector embeddings
- AI integration
