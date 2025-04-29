declare module '@sanity/client' {
  export interface SanityClientConfig {
    projectId: string;
    dataset: string;
    apiVersion: string;
    useCdn?: boolean;
    token?: string;
  }

  export interface SanityClient {
    fetch: <T = any>(query: string) => Promise<T>;
  }

  export function createClient(config: SanityClientConfig): SanityClient;
} 