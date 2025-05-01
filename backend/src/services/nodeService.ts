import { sanityClient } from "../config/sanity";

export class NodeService {
  async getAllNodes(): Promise<any[]> {
    const nodes = await sanityClient.fetch('*[_type == "node"]');
    return nodes;
  }
}

export const nodeService = new NodeService(); 