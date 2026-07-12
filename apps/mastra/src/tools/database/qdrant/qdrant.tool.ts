import { createHash } from "node:crypto";

import { QdrantClient } from "@qdrant/js-client-rest";

import { createSuccessResult } from "../../../shared/operation-result.js";
import { qdrantConfig } from "./config.js";
import {
  StoreVectorRequest,
  StoreVectorResponse,
  SearchVectorRequest,
  SearchResult,
} from "./types.js";

const DEFAULT_SEARCH_LIMIT = 10;

let client: QdrantClient | undefined;
const ensuredCollections = new Set<string>();

function getClient(): QdrantClient {
  if (!qdrantConfig.url) {
    throw new Error("QDRANT_URL is not configured.");
  }

  if (!client) {
    client = new QdrantClient({
      url: qdrantConfig.url,
      apiKey: qdrantConfig.apiKey,
      checkCompatibility: false,
    });
  }

  return client;
}

/**
 * Qdrant point ids must be an unsigned integer or a UUID. Derive a
 * deterministic UUID (v5-style, SHA-1 based) from the candidate id so repeated
 * uploads for the same candidate update the same point.
 */
function toPointId(id: string): string {
  const h = createHash("sha1").update(id).digest("hex");

  return [
    h.slice(0, 8),
    h.slice(8, 12),
    `5${h.slice(13, 16)}`,
    `8${h.slice(17, 20)}`,
    h.slice(20, 32),
  ].join("-");
}

/**
 * Ensure the target collection exists with the given vector size. Cached per
 * process so the existence check runs at most once per collection.
 */
async function ensureCollection(vectorSize: number): Promise<void> {
  const name = qdrantConfig.collection;

  if (ensuredCollections.has(name)) {
    return;
  }

  const { exists } = await getClient().collectionExists(name);

  if (!exists) {
    await getClient().createCollection(name, {
      vectors: { size: vectorSize, distance: "Cosine" },
    });
  }

  ensuredCollections.add(name);
}

export async function storeVector(
  request: StoreVectorRequest
): Promise<StoreVectorResponse> {
  await ensureCollection(request.embedding.length);

  await getClient().upsert(qdrantConfig.collection, {
    wait: true,
    points: [
      {
        id: toPointId(request.id),
        vector: request.embedding,
        payload: { candidateId: request.id, ...(request.payload ?? {}) },
      },
    ],
  });

  return createSuccessResult("Vector stored successfully.");
}

export async function searchVector(
  request: SearchVectorRequest
): Promise<SearchResult[]> {
  const results = await getClient().search(qdrantConfig.collection, {
    vector: request.embedding,
    limit: request.limit ?? DEFAULT_SEARCH_LIMIT,
    with_payload: true,
  });

  return results.map((match) => {
    const candidateId = match.payload?.candidateId;

    return {
      id: typeof candidateId === "string" ? candidateId : String(match.id),
      score: match.score,
      payload: match.payload ?? undefined,
    };
  });
}
