import { google } from "@ai-sdk/google";
import { embed } from "ai";

import { embeddingConfig } from "./config.js";
import { EmbeddingRequest, EmbeddingResponse } from "./types.js";

/**
 * Generate a semantic embedding for the given text using Gemini.
 *
 * This tool owns the embedding-provider integration; callers depend only on
 * the {@link EmbeddingResponse} contract.
 */
export async function generateEmbedding(
  request: EmbeddingRequest
): Promise<EmbeddingResponse> {
  const { embedding } = await embed({
    model: google.textEmbeddingModel(embeddingConfig.model),
    value: request.text,
  });

  return {
    embedding,
    dimensions: embedding.length,
    model: embeddingConfig.model,
  };
}
