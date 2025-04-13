# Supabase Migrations

This directory contains database migration files for the Clarity App's Supabase PostgreSQL database.

## Overview

Migrations allow us to version control our database schema and apply changes in a consistent manner across different environments (development, staging, production).

## Current Migrations

### 20250411025626_initial_schema.sql

This is our initial database schema that sets up:

- User profiles and demographic information
- Node unlock states and progress tracking
- User responses to questions
- Journal entries
- Junction tables for mapping content between Sanity and user data

The schema is designed to store all user-generated content, while referencing Sanity content through content IDs.

## Working with Migrations

### Creating a New Migration

To create a new migration:

```bash
supabase migration new <migration_name>
```

This will create a timestamped file in the migrations directory.

### Applying Migrations Locally

When developing locally:

```bash
# Start Supabase with migrations applied
supabase start

# Or reset the database with all migrations
supabase db reset
```

### Applying Migrations to Environments

For staging/production:

```bash
# For protected environments, use the service role key
supabase db push --db-url <database_url>
```

## Best Practices

1. **Always Test Locally**: Run migrations on your local Supabase instance before pushing to shared environments
2. **Review Migration Changes**: Have teammates review migration files before applying them
3. **Backup First**: Always backup production database before applying migrations
4. **Idempotent Changes**: Write migrations that can be run multiple times without causing errors
5. **Include Both Up and Down Migrations**: For each change, plan how to undo it in emergencies

## Relationships with Sanity Content

In our schema, we use text references to Sanity content, such as:

- `sanity_node_ref`: References a Sanity node document ID
- `sanity_question_ref`: References a Sanity question document ID

These fields create a bridge between the two systems without requiring a direct database connection.
