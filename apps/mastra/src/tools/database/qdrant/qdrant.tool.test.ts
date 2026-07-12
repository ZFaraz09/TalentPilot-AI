import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { storeVector, searchVector } from "./qdrant.tool.js";

describe("storeVector", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a successful store response", async () => {
    const response = await storeVector({
      id: "cand-1",
      embedding: [0.1, 0.2, 0.3],
    });

    expect(response).toEqual({
      success: true,
      message: "Vector stored successfully.",
    });
  });

  it("logs the store request", async () => {
    const logSpy = vi.spyOn(console, "log");
    const request = { id: "cand-1", embedding: [0.1], payload: { a: 1 } };

    await storeVector(request);

    expect(logSpy).toHaveBeenCalledWith("Store Vector:", request.id);
  });
});

describe("searchVector", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an empty result set", async () => {
    const results = await searchVector({ embedding: [0.1, 0.2] });

    expect(results).toEqual([]);
  });

  it("logs the search request", async () => {
    const logSpy = vi.spyOn(console, "log");
    const request = { embedding: [0.1], limit: 5 };

    await searchVector(request);

    expect(logSpy).toHaveBeenCalledWith("Search Vector: limit =", 5);
  });
});
