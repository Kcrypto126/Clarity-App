import { createClient } from "@sanity/client";
import { createGroqBuilder, makeSafeQueryRunner } from 'groqd';
import type * as SanityTypes from "./sanity.types";

// Create Sanity client with proper configuration
const sanityClient = createClient({
  projectId: 'nbicm0cg',
  dataset: 'production',
  apiVersion: '2024-04-12',
  useCdn: true,
  // Add token if you need authenticated requests
  // token: process.env.SANITY_API_TOKEN,
});

// Create a type-safe query runner with error handling
export const runQuery = makeSafeQueryRunner((query) =>
  sanityClient.fetch(query).catch((error) => {
    console.error('Error executing GROQ query:', error);
    throw error;
  })
);

// Create a type-safe query builder with our schema types
type SchemaConfig = {
  schemaTypes: SanityTypes.AllSanitySchemaTypes;
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo;
};

export const q = createGroqBuilder<SchemaConfig>({
  validationRequired: true,
}); 