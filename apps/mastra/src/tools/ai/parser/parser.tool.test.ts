import { describe, it, expect } from "vitest";

import { parseResume } from "./parser.tool.js";
import { ParsedResumeSchema } from "../../../schemas/resume.schema.js";

describe("parseResume", () => {
  it("returns a schema-valid ParsedResume", async () => {
    const parsed = await parseResume("hello resume");

    expect(ParsedResumeSchema.safeParse(parsed).success).toBe(true);
  });

  it("preserves the raw content in the summary field", async () => {
    const parsed = await parseResume("some resume content");

    expect(parsed.summary).toBe("some resume content");
  });

  it("returns empty structured collections for the stub implementation", async () => {
    const parsed = await parseResume("anything");

    expect(parsed.skills).toEqual([]);
    expect(parsed.experience).toEqual([]);
    expect(parsed.education).toEqual([]);
  });
});
