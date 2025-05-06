import { sanityClient } from "../config/sanity";
import { Node } from "../types/sanity-schema";

const GET_NODE_BY_SLUG_QUERY = `*[_type == "node" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content
}`;

export class NodeService {
  async getAllNodes() {
    const nodes = await sanityClient.fetch<Node[]>('*[_type == "node"]');
    return nodes;
  }

  async getNodeBySlug(slug: string) {
    const node = await sanityClient.fetch<Node>(GET_NODE_BY_SLUG_QUERY, { slug });
    return node;
  }
}

export const nodeService = new NodeService(); 