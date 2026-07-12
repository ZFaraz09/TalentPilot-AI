import { describe, it, expect } from "vitest";

import {
  ResumeUploadInputSchema,
  ResumeUploadOutputSchema,
} from "./schema.js";

describe("ResumeUploadInputSchema", () => {
  it("accepts a valid upload input", () => {
    const parsed = ResumeUploadInputSchema.parse({
      candidateId: "cand-1",
      resumeContent: "resume text",
    });

    expect(parsed).toEqual({
      candidateId: "cand-1",
      resumeContent: "resume text",
    });
  });

  it("rejects an empty candidateId", () => {
    const result = ResumeUploadInputSchema.safeParse({
      candidateId: "",
      resumeContent: "resume text",
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty resume content", () => {
    const result = ResumeUploadInputSchema.safeParse({
      candidateId: "cand-1",
      resumeContent: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    expect(ResumeUploadInputSchema.safeParse({}).success).toBe(false);
  });
});

describe("ResumeUploadOutputSchema", () => {
  it("accepts a valid output", () => {
    const parsed = ResumeUploadOutputSchema.parse({
      success: true,
      candidateId: "cand-1",
      message: "done",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects a non-boolean success flag", () => {
    const result = ResumeUploadOutputSchema.safeParse({
      success: "yes",
      candidateId: "cand-1",
      message: "done",
    });

    expect(result.success).toBe(false);
  });
});
