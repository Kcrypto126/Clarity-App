# Supabase Integration

Supabase serves as our primary database solution for managing user-generated content in the Clarity App. This document outlines the architecture, setup, and development guidelines for working with our Supabase integration.

## Overview

In Clarity App, we maintain two distinct types of data:

1. **System Content** (managed via Sanity.io)

   - Nodes
   - Domains
   - Questions
   - Assessment templates
   - Resource content

2. **User Generated Content** (managed via Supabase)
   - User profiles and demographic information
   - Assessment answers
   - Journal entries
   - Node unlock states
   - User progress tracking

## Why Supabase?

Supabase provides us with:

- A hosted PostgreSQL database solution
- Built-in Row Level Security (RLS) policies
- Authentication system out of the box
- TypeScript type generation via CLI
- Real-time subscriptions
- Vector embeddings support for similarity search

## Getting Started

### Prerequisites

1. Install the Supabase CLI:

```bash
# Using Homebrew (macOS)
brew install supabase/tap/supabase

# Using NPM
npm install -g supabase
```

2. Install Docker Desktop (required for local development)

### Local Development

1. Start the local Supabase instance:

```bash
supabase start
```

2. Generate TypeScript types for the database schema:

```bash
supabase gen types typescript --local > types/supabase.ts
```

3. Access the local dashboard:

- URL: http://localhost:54323
- Email: admin@admin.com
- Password: admin

### Database Migrations

We use Supabase migrations to version control our database schema:

```bash
# Create a new migration
supabase migration new <migration_name>

# Apply migrations
supabase db reset
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Local Development Guide](https://supabase.com/docs/guides/local-development)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Support](https://supabase.com/docs/guides/api/typescript-support)

## Database Schema

For detailed information about our database schema and table structures, please refer to the `supabase/migrations` directory.

## Security Considerations

- Always implement RLS policies for new tables
- Never expose service role keys in client-side code
- Use row level security to restrict access to user-specific data
- Implement proper data validation both client-side and server-side

## Deployment

We use Supabase's hosted platform for production. Database changes should follow this workflow:

1. Develop and test locally
2. Create and test migrations
3. Review changes with the team
4. Apply migrations to staging
5. Apply migrations to production
