import { describe, it, expect, vi, beforeEach } from "vitest";

const { embedMock } = vi.hoisted(() => ({ embedMock: vi.fn() }));

vi.mock("ai", () => ({ embed: embedMock }));

vi.mock("@ai-sdk/google", () => {
  const google = Object.assign(vi.fn(() => "chat-model"), {
    textEmbeddingModel: vi.fn(() => "embed-model"),
  });
  return { google };
});

import { generateEmbedding } from "./embedding.tool.js";

describe("generateEmbedding", () => {
  beforeEach(() => {
    embedMock.mockReset();
  });

  it("returns the embedding with its dimensions and model", async () => {
    embedMock.mockResolvedValue({ embedding: [0.1, 0.2, 0.3] });

    const result = await generateEmbedding({ text: "hello" });

    expect(result.embedding).toEqual([0.1, 0.2, 0.3]);
    expect(result.dimensions).toBe(3);
    expect(result.model).toBe("gemini-embedding-001");
  });

  it("passes the request text to the embedding provider", async () => {
    embedMock.mockResolvedValue({ embedding: [] });

    await generateEmbedding({ text: "resume text" });

    expect(embedMock).toHaveBeenCalledWith(
      expect.objectContaining({ value: "resume text" })
    );
  });
});
