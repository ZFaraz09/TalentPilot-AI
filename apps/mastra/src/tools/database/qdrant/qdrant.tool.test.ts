import { describe, it, expect, vi, beforeEach } from "vitest";

const { upsertMock, searchMock, existsMock, createMock } = vi.hoisted(() => ({
  upsertMock: vi.fn(),
  searchMock: vi.fn(),
  existsMock: vi.fn(),
  createMock: vi.fn(),
}));

vi.mock("@qdrant/js-client-rest", () => ({
  QdrantClient: vi.fn(() => ({
    upsert: upsertMock,
    search: searchMock,
    collectionExists: existsMock,
    createCollection: createMock,
  })),
}));

vi.mock("./config.js", () => ({
  qdrantConfig: { url: "http://test", apiKey: "key", collection: "candidates" },
}));

import { storeVector, searchVector } from "./qdrant.tool.js";

describe("storeVector", () => {
  beforeEach(() => {
    upsertMock.mockReset().mockResolvedValue({});
    existsMock.mockReset().mockResolvedValue({ exists: true });
    createMock.mockReset().mockResolvedValue({});
  });

  it("returns a success result", async () => {
    const result = await storeVector({ id: "cand-1", embedding: [0.1, 0.2] });

    expect(result).toEqual({
      success: true,
      message: "Vector stored successfully.",
    });
  });

  it("upserts a point with the candidate id in the payload", async () => {
    await storeVector({ id: "cand-1", embedding: [0.1, 0.2], payload: { a: 1 } });

    expect(upsertMock).toHaveBeenCalledWith(
      "candidates",
      expect.objectContaining({
        wait: true,
        points: [
          expect.objectContaining({
            vector: [0.1, 0.2],
            payload: expect.objectContaining({ candidateId: "cand-1", a: 1 }),
          }),
        ],
      })
    );
  });
});

describe("searchVector", () => {
  beforeEach(() => {
    searchMock.mockReset();
  });

  it("returns an empty result set when there are no matches", async () => {
    searchMock.mockResolvedValue([]);

    const results = await searchVector({ embedding: [0.1] });

    expect(results).toEqual([]);
  });

  it("maps matches to SearchResult using the payload candidate id", async () => {
    searchMock.mockResolvedValue([
      { id: "point-uuid", score: 0.9, payload: { candidateId: "cand-1", name: "Jane" } },
    ]);

    const results = await searchVector({ embedding: [0.1], limit: 5 });

    expect(results).toEqual([
      { id: "cand-1", score: 0.9, payload: { candidateId: "cand-1", name: "Jane" } },
    ]);
    expect(searchMock).toHaveBeenCalledWith(
      "candidates",
      expect.objectContaining({ limit: 5 })
    );
  });
});
