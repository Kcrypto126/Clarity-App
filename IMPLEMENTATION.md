# Clarity App Implementation Plan

This document outlines the implementation plan for the Clarity app, focusing on the directed graph-based assessment system.

## Phase 1: Content Model & Data Structure

- [x] Define Sanity schemas for team-managed content:

  - [x] Node schema (includes node types: content, assessment, intro_assessment)
  - [x] Question schema
  - [x] Domain schema
  - [x] Edge schema
  - [x] Resource schema
  - [x] Tag schema

- [x] Define Supabase tables for user data:

  - [x] User profiles
  - [x] User responses
  - [x] User node states (unlock/progress tracking)
  - [x] Journal entries
  - [x] Node unlock rules

- [ ] Populate initial content in Sanity:
  - [ ] Create foundational domains
  - [ ] Create initial nodes with appropriate node types
  - [ ] Create intro assessment node(s) marked with nodeType='intro_assessment'
  - [ ] Define questions for all nodes
  - [ ] Establish edge relationships between nodes

## Phase 2: API Layer & Data Persistence

- [ ] Set up Supabase integration:

  - [ ] User authentication and profiles
  - [ ] Data storage and retrieval
  - [ ] Row-level security policies
  - [ ] Real-time subscriptions for updates

- [ ] Create API endpoints:

  - [ ] Fetching content from Sanity
  - [ ] Storing and retrieving user data from Supabase
  - [ ] Submitting question answers
  - [ ] Journal entry management
  - [ ] Resource retrieval

- [ ] Implement vector similarity search:
  - [ ] Generate embeddings for nodes
  - [ ] Set up vector database for similarity queries
  - [ ] Create API for node recommendation based on user responses

## Phase 3: Mobile App UI Implementation

- [ ] Create core UI components:

  - [ ] Assessment question UI
  - [ ] Mind map visualization
  - [ ] Journal editor
  - [ ] Resource viewer
  - [ ] User profile & settings

- [ ] Implement user flows:

  - [ ] Initial app experience with intro assessment nodes
  - [ ] User registration after intro assessment
  - [ ] Node unlocking and progression
  - [ ] Question answering interface
  - [ ] Journal writing and integration
  - [ ] Resource discovery and viewing

- [ ] Set up navigation:
  - [ ] Tab navigation for main sections
  - [ ] Deep linking for sharing specific nodes/resources
  - [ ] Navigation between related nodes

## Phase 4: AI Integration & Personalization

- [ ] Set up AI services:

  - [ ] Question similarity detection
  - [ ] Journal entry analysis
  - [ ] Resource generation based on user responses
  - [ ] Personalized guidance creation

- [ ] Implement vector-based recommendation system:

  - [ ] Node similarity calculation
  - [ ] Personalized node prioritization
  - [ ] Related node suggestions

- [ ] Create assessment templates:
  - [ ] Define template format for node assessment
  - [ ] Implement template processing for resource generation
  - [ ] Develop guidance system based on node responses

## Phase 5: Testing & Refinement

- [ ] Conduct user testing:

  - [ ] Test the initial user experience with intro assessment nodes
  - [ ] Validate node unlocking logic
  - [ ] Assess UI/UX of the mind map
  - [ ] Evaluate resource relevance and quality

- [ ] Performance optimization:

  - [ ] Mind map rendering optimization
  - [ ] Vector search query optimization
  - [ ] API response caching
  - [ ] Offline support for journal entries

- [ ] Refine content model:
  - [ ] Update schemas based on testing feedback
  - [ ] Add new question types if needed
  - [ ] Improve node relationship modeling

## Phase 6: Launch & Iteration

- [ ] Prepare for app store submission:

  - [ ] Create screenshots and app store assets
  - [ ] Write app descriptions and metadata
  - [ ] Set up app store analytics

- [ ] Launch plan:

  - [ ] Soft launch to limited audience
  - [ ] Gather initial feedback
  - [ ] Make rapid iterations based on user data
  - [ ] Full public launch

- [ ] Post-launch priorities:
  - [ ] Monitor user progression through nodes
  - [ ] Analyze common skip patterns
  - [ ] Iteratively improve AI-generated resources
  - [ ] Add new domains and nodes based on user interest
