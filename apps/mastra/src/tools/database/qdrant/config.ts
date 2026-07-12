export const qdrantConfig = {
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  collection: process.env.QDRANT_COLLECTION ?? "candidates",
};
