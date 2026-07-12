import { describe, it, expect } from "vitest";

import { parseResume } from "./parser.tool.js";

describe("parseResume", () => {
  it("wraps the raw content in a ParsedResume object", async () => {
    const parsed = await parseResume("hello resume");

    expect(parsed).toEqual({ rawText: "hello resume" });
  });

  it("preserves the content verbatim, including empty strings", async () => {
    const parsed = await parseResume("");

    expect(parsed.rawText).toBe("");
  });
});
