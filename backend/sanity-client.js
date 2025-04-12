import { createClient } from "@sanity/client";
import { createGroqBuilder, makeSafeQueryRunner } from "groqd";
import dotenv from "dotenv";

dotenv.config();

// Create Sanity client
const sanityClient = createClient({
  projectId: "nbicm0cg",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Create a type-safe query runner
export const runQuery = makeSafeQueryRunner((query) =>
  sanityClient.fetch(query).catch((error) => {
    console.error("Error executing GROQ query:", error);
    throw error;
  })
);

// Create a type-safe query builder
export const q = createGroqBuilder({
  validationRequired: true,
});
