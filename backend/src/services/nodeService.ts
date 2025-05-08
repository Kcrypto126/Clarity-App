import { sanityClient } from "../config/sanity";
import { Node } from "../types/sanity-schema";

const GET_NODE_BY_SLUG_QUERY = `*[_type == "node" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content
}`;

const GET_NODES_BY_TYPE_QUERY = `*[_type == "node" && nodeType == $nodeType]{
  _id,
  _type,
  title,
  description,
  nodeType,
  "questions": questions[]->{
    _id,
    _type,
    title,
    notes,
    "source": source->{
      _id,
      title,
      type,
      authors,
      institution,
      year,
      url,
      description
    },
    skipLogic,
    answerType,
    answers[] {
      "id": id,
      "label": label,
      "value": value,
      "unlocksNodes": unlocksNodes[]->{
        _id,
        title
      },
      
    },
  }
}`;

export class NodeService {
  async getAllNodes(nodeType?: string) {
    if (nodeType) {
      const nodes = await sanityClient.fetch<Node[]>(GET_NODES_BY_TYPE_QUERY, { nodeType });
      return nodes;
    }
    const nodes = await sanityClient.fetch<Node[]>('*[_type == "node"]');
    return nodes;
  }

  async getNodeBySlug(slug: string) {
    console.log("Fetching node by slug:", slug);
    const node = await sanityClient.fetch<Node>(GET_NODE_BY_SLUG_QUERY, { slug });
    return node;
  }
}

export const nodeService = new NodeService(); 