import {
  EmbeddingRequest,
  EmbeddingResponse,
} from "./types.js";

export async function generateEmbedding(
  request: EmbeddingRequest
): Promise<EmbeddingResponse> {
  // Placeholder implementation
  return {
    embedding: [],
    dimensions: 0,
    model: "pending",
  };
}