import { describe, it, expect, vi, beforeEach } from "vitest";

const { generateObjectMock } = vi.hoisted(() => ({
  generateObjectMock: vi.fn(),
}));

vi.mock("ai", () => ({ generateObject: generateObjectMock }));

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
    generateObjectMock.mockReset();
  });

  it("returns the structured resume produced by the model", async () => {
    generateObjectMock.mockResolvedValue({ object: sampleResume });

    const parsed = await parseResume("some resume text");

    expect(parsed).toEqual(sampleResume);
    expect(ParsedResumeSchema.safeParse(parsed).success).toBe(true);
  });

  it("asks the model to extract against the ParsedResume schema", async () => {
    generateObjectMock.mockResolvedValue({ object: sampleResume });

    await parseResume("resume body");

    const call = generateObjectMock.mock.calls[0][0];
    expect(call.schema).toBe(ParsedResumeSchema);
    expect(call.prompt).toContain("resume body");
  });
});
