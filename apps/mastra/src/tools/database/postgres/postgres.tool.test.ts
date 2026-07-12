import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { saveCandidate, findCandidate } from "./postgres.tool.js";
import type { CandidateRecord } from "./types.js";

const candidate: CandidateRecord = {
  id: "cand-1",
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  skills: ["math"],
  experience: 2,
  education: "BSc - University of London",
};

describe("saveCandidate", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a successful save response", async () => {
    const response = await saveCandidate(candidate);

    expect(response).toEqual({
      success: true,
      message: "Candidate saved successfully.",
    });
  });

  it("logs the candidate being saved", async () => {
    const logSpy = vi.spyOn(console, "log");

    await saveCandidate(candidate);

    expect(logSpy).toHaveBeenCalledWith("Saving candidate:", candidate);
  });
});

describe("findCandidate", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null when no candidate is found", async () => {
    const result = await findCandidate({ id: "missing" });

    expect(result).toBeNull();
  });

  it("logs the lookup request", async () => {
    const logSpy = vi.spyOn(console, "log");
    const request = { id: "cand-1" };

    await findCandidate(request);

    expect(logSpy).toHaveBeenCalledWith("Finding candidate:", request);
  });
});
