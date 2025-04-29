import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { SanityClient } from "@sanity/client";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);
const token: string | undefined = process.env.SANITY_TOKEN;

export const client: SanityClient = createClient({
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

interface Node {
  _type: string;
  [key: string]: any;
}

async function getNodes(): Promise<Node[]> {
  const nodes = await client.fetch('*[_type == "node"]');
  return nodes;
}

app.get("/api/nodes", async (req: Request, res: Response) => {
  try {
    const nodes = await getNodes();
    res.json(nodes);
  } catch (error) {
    console.error("Error fetching nodes:", error);
    res.status(500).json({ error: "Failed to fetch nodes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 