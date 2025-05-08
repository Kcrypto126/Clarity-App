import { Router, Request, Response } from "express";
import { nodeService } from "../services/nodeService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const nodes = await nodeService.getAllNodes(type as string);
    res.json(nodes);
  } catch (error) {
    console.error("Error fetching nodes:", error);
    res.status(500).json({ error: "Failed to fetch nodes" });
  }
});

router.get("/:slug", async (req: Request, res: Response) => {
  console.log("Fetching node by slug:", req.params.slug);
  const { slug } = req.params;
  try {
    const node = await nodeService.getNodeBySlug(slug);
    res.json(node);
  } catch (error) {
    console.error("Error fetching node:", error);
    res.status(500).json({ error: "Failed to fetch node" });
  }
});

export const nodeRoutes = router; 