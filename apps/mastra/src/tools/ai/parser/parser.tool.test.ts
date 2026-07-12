import { describe, it, expect, vi, beforeEach } from "vitest";

const { generateTextMock } = vi.hoisted(() => ({
  generateTextMock: vi.fn(),
}));

vi.mock("ai", () => ({ generateText: generateTextMock }));

vi.mock("../../../config/llm.config.js", () => ({
  llm: {},
  CHAT_MODEL: "test-chat-model",
  EMBEDDING_MODEL: "test-embedding-model",
}));

import { parseResume } from "./parser.tool.js";
import { ParsedResumeSchema } from "../../../schemas/resume.schema.js";

const sampleResume = {
  name: "John Doe",
  email: "john@example.com",
  skills: ["Python", "SQL"],
  experience: [{ company: "Acme", role: "Engineer", duration: "2y" }],
  education: [{ degree: "BS", institution: "MIT" }],
  certifications: [],
  projects: [],
  languages: [],
};

describe("parseResume", () => {
  beforeEach(() => {
    generateTextMock.mockReset();
  });

  it("returns a schema-valid resume parsed from the model JSON", async () => {
    generateTextMock.mockResolvedValue({ text: JSON.stringify(sampleResume) });

    const parsed = await parseResume("some resume text");

    expect(parsed).toEqual(sampleResume);
    expect(ParsedResumeSchema.safeParse(parsed).success).toBe(true);
  });

  it("extracts JSON even when wrapped in markdown fences and prose", async () => {
    generateTextMock.mockResolvedValue({
      text: `Here is the result:\n\`\`\`json\n${JSON.stringify(sampleResume)}\n\`\`\``,
    });

    const parsed = await parseResume("resume body");

    expect(parsed.name).toBe("John Doe");
  });

  it("includes the resume content in the prompt", async () => {
    generateTextMock.mockResolvedValue({ text: JSON.stringify(sampleResume) });

    await parseResume("resume body");

    expect(generateTextMock.mock.calls[0][0].prompt).toContain("resume body");
  });

  it("throws when the model response has no JSON object", async () => {
    generateTextMock.mockResolvedValue({ text: "no json here" });

    await expect(parseResume("x")).rejects.toThrow();
  });
});
