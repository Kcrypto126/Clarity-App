import { createClient, SanityClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const token: string | undefined = process.env.SANITY_TOKEN;

export const sanityClient: SanityClient = createClient({
  projectId: "nbicm0cg",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
}); 