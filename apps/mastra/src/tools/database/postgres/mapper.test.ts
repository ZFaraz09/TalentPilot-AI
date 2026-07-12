import { describe, it, expect } from "vitest";

import { toCandidateRecord } from "./mapper.js";
import type { ParsedResume } from "../../../schemas/resume.schema.js";

function makeResume(overrides: Partial<ParsedResume> = {}): ParsedResume {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    skills: ["math", "engines"],
    experience: [
      { company: "Analytical Engines", role: "Programmer", duration: "3 years" },
      { company: "Royal Society", role: "Analyst", duration: "1 year" },
    ],
    education: [
      { degree: "BSc Mathematics", institution: "University of London" },
    ],
    certifications: [],
    projects: [],
    languages: [],
    ...overrides,
  };
}

describe("toCandidateRecord", () => {
  it("maps the basic identity fields from the resume", () => {
    const resume = makeResume();

    const record = toCandidateRecord("cand-1", resume);

    expect(record.id).toBe("cand-1");
    expect(record.fullName).toBe("Ada Lovelace");
    expect(record.email).toBe("ada@example.com");
    expect(record.skills).toEqual(["math", "engines"]);
  });

  it("uses the number of experience entries as the experience count", () => {
    const record = toCandidateRecord("cand-1", makeResume());

    expect(record.experience).toBe(2);
  });

  it("reports zero experience when there are no experience entries", () => {
    const record = toCandidateRecord("cand-1", makeResume({ experience: [] }));

    expect(record.experience).toBe(0);
  });

  it("formats education from the first education entry", () => {
    const record = toCandidateRecord("cand-1", makeResume());

    expect(record.education).toBe("BSc Mathematics - University of London");
  });

  it("uses only the first education entry when several are present", () => {
    const resume = makeResume({
      education: [
        { degree: "BSc", institution: "First University" },
        { degree: "MSc", institution: "Second University" },
      ],
    });

    const record = toCandidateRecord("cand-1", resume);

    expect(record.education).toBe("BSc - First University");
  });

  it("leaves education undefined when there are no education entries", () => {
    const record = toCandidateRecord("cand-1", makeResume({ education: [] }));

    expect(record.education).toBeUndefined();
  });

  it("does not mutate the source resume skills array", () => {
    const resume = makeResume({ skills: ["a", "b"] });

    const record = toCandidateRecord("cand-1", resume);
    record.skills.push("c");

    expect(resume.skills).toEqual(["a", "b", "c"]);
    // Documents that the mapper shares the skills reference rather than cloning.
    expect(record.skills).toBe(resume.skills);
  });
});
