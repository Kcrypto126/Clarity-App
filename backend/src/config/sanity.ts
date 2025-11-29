import { createClient, SanityClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const token: string | undefined = process.env.SANITY_TOKEN;
const projectId: string = process.env.SANITY_PROJECT_ID || "nbicm0ch";
const dataset: string = process.env.SANITY_DATASET || "production";
const apiVersion: string = process.env.SANITY_API_VERSION || "2024-01-01";

if (!token || !projectId || !dataset || !apiVersion) {
  throw new Error("Missing Sanity configuration");
}

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
}); 