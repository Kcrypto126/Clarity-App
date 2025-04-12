import { createClient, SanityClient } from "@sanity/client";
import { createGroqBuilder, makeSafeQueryRunner } from "groqd";
import dotenv from "dotenv";

dotenv.config();

// Create Sanity client
const sanityClient: SanityClient = createClient({
  projectId: "nbicm0cg",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Create a type-safe query runner
export const runQuery = makeSafeQueryRunner((query: string) =>
  sanityClient.fetch(query).catch((error: Error) => {
    console.error("Error executing GROQ query:", error);
    throw error;
  })
);

// Create a type-safe query builder with schema types
type SchemaConfig = {
  schemaTypes: {
    node: {
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
  };
  referenceSymbol: symbol;
};

// Create a symbol for reference types
export const internalGroqTypeReferenceTo = Symbol('groqTypeReferenceTo');

// Create a type-safe query builder
export const q = createGroqBuilder<SchemaConfig>({
  validationRequired: true,
}); 