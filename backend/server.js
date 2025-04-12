import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const token = process.env.SANITY_TOKEN;

export const client = createClient({
  projectId: "nbicm0cg",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Enable CORS for the Expo app
app.use(
  cors({
    origin: process.env.EXPO_CLIENT_URL || "http://localhost:19000",
  })
);

app.use(express.json());

async function getNodes() {
  const nodes = await client.fetch('*[_type == "node"]');
  return nodes;
}

app.get("/api/nodes", async (req, res) => {
  const nodes = await getNodes();
  res.json(nodes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
