import { describe, it, expect } from "vitest";

import {
  ExperienceSchema,
  EducationSchema,
  ParsedResumeSchema,
} from "./resume.schema.js";

describe("ExperienceSchema", () => {
  it("accepts a complete experience entry", () => {
    const parsed = ExperienceSchema.parse({
      company: "Acme",
      role: "Engineer",
      duration: "2 years",
    });

    expect(parsed).toEqual({
      company: "Acme",
      role: "Engineer",
      duration: "2 years",
    });
  });

  it("rejects an entry missing required fields", () => {
    const result = ExperienceSchema.safeParse({ company: "Acme" });

    expect(result.success).toBe(false);
  });
});

describe("EducationSchema", () => {
  it("treats year as optional", () => {
    const parsed = EducationSchema.parse({
      degree: "BSc",
      institution: "MIT",
    });

    expect(parsed.year).toBeUndefined();
  });

  it("keeps the year when provided", () => {
    const parsed = EducationSchema.parse({
      degree: "BSc",
      institution: "MIT",
      year: "2020",
    });

    expect(parsed.year).toBe("2020");
  });
});

describe("ParsedResumeSchema", () => {
  const minimalResume = {
    name: "Grace Hopper",
    email: "grace@example.com",
    skills: ["cobol"],
    experience: [],
    education: [],
  };

  it("applies defaults for optional array fields", () => {
    const parsed = ParsedResumeSchema.parse(minimalResume);

    expect(parsed.certifications).toEqual([]);
    expect(parsed.projects).toEqual([]);
    expect(parsed.languages).toEqual([]);
  });

  it("preserves provided optional array fields", () => {
    const parsed = ParsedResumeSchema.parse({
      ...minimalResume,
      certifications: ["AWS"],
      projects: ["Compiler"],
      languages: ["English"],
    });

    expect(parsed.certifications).toEqual(["AWS"]);
    expect(parsed.projects).toEqual(["Compiler"]);
    expect(parsed.languages).toEqual(["English"]);
  });

  it("rejects an invalid email address", () => {
    const result = ParsedResumeSchema.safeParse({
      ...minimalResume,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("requires the name field", () => {
    const { name, ...withoutName } = minimalResume;
    const result = ParsedResumeSchema.safeParse(withoutName);

    expect(result.success).toBe(false);
  });

  it("requires skills to be an array of strings", () => {
    const result = ParsedResumeSchema.safeParse({
      ...minimalResume,
      skills: [1, 2, 3],
    });

    expect(result.success).toBe(false);
  });

  it("validates nested experience and education entries", () => {
    const parsed = ParsedResumeSchema.parse({
      ...minimalResume,
      experience: [{ company: "Navy", role: "Officer", duration: "10 years" }],
      education: [{ degree: "PhD", institution: "Yale", year: "1934" }],
    });

    expect(parsed.experience).toHaveLength(1);
    expect(parsed.education[0].degree).toBe("PhD");
  });
});
