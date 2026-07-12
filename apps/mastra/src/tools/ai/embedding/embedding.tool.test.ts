import { describe, it, expect } from "vitest";

import { generateEmbedding } from "./embedding.tool.js";

describe("generateEmbedding", () => {
  it("returns the placeholder embedding response", async () => {
    const response = await generateEmbedding({ text: "some resume text" });

    expect(response).toEqual({
      embedding: [],
      dimensions: 0,
      model: "pending",
    });
  });

  it("returns an embedding whose dimensions match its length", async () => {
    const response = await generateEmbedding({ text: "another text" });

    expect(response.embedding).toHaveLength(response.dimensions);
  });
});
