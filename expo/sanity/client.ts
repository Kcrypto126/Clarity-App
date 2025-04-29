import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: "nbicm0cg",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Use CDN for frontend
});

// Add type-safety for queries
export type SanityNode = {
  _id: string;
  _type: "node";
  title: string;
  description?: string;
  nodeType?: string;
  domain?: {
    _ref: string;
    _type: "reference";
  };
  questions?: Array<{
    _ref: string;
    _type: "reference";
  }>;
  resources?: Array<{
    _ref: string;
    _type: "reference";
  }>;
}; 