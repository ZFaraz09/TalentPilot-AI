/**
 * Input for embedding generation.
 */
export interface EmbeddingRequest {
  text: string;
}

/**
 * Output returned after generating embeddings.
 */
export interface EmbeddingResponse {
  embedding: number[];
  dimensions: number;
  model?: string;
}