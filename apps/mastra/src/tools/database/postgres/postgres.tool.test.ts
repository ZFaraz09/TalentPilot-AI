import { describe, it, expect, vi, beforeEach } from "vitest";

const { queryMock } = vi.hoisted(() => ({ queryMock: vi.fn() }));

vi.mock("pg", () => ({ Pool: vi.fn(() => ({ query: queryMock })) }));

vi.mock("./config.js", () => ({
  postgresConfig: { connectionString: "postgres://test", table: "candidates" },
}));

import { saveCandidate, findCandidate } from "./postgres.tool.js";

const candidate = {
  id: "cand-1",
  fullName: "Jane Doe",
  email: "jane@example.com",
  skills: ["TypeScript"],
  experience: 3,
  education: "BS - MIT",
};

describe("saveCandidate", () => {
  beforeEach(() => {
    queryMock.mockReset();
    queryMock.mockResolvedValue({ rows: [] });
  });

  it("returns a success result", async () => {
    const result = await saveCandidate(candidate);

    expect(result).toEqual({
      success: true,
      message: "Candidate saved successfully.",
    });
  });

  it("upserts the candidate with mapped parameters", async () => {
    await saveCandidate(candidate);

    const insertCall = queryMock.mock.calls.find((call) =>
      String(call[0]).includes("INSERT INTO")
    );

    expect(insertCall?.[1]).toEqual([
      "cand-1",
      "Jane Doe",
      "jane@example.com",
      ["TypeScript"],
      3,
      "BS - MIT",
    ]);
  });
});

describe("findCandidate", () => {
  beforeEach(() => {
    queryMock.mockReset();
    queryMock.mockResolvedValue({ rows: [] });
  });

  it("returns null when no candidate is found", async () => {
    const result = await findCandidate({ id: "missing" });

    expect(result).toBeNull();
  });

  it("maps a found row to a CandidateRecord", async () => {
    queryMock.mockImplementation(async (sql: string) =>
      String(sql).includes("SELECT")
        ? {
            rows: [
              {
                id: "cand-1",
                full_name: "Jane Doe",
                email: "jane@example.com",
                skills: ["TypeScript"],
                experience: 3,
                education: null,
              },
            ],
          }
        : { rows: [] }
    );

    const result = await findCandidate({ id: "cand-1" });

    expect(result).toEqual({
      id: "cand-1",
      fullName: "Jane Doe",
      email: "jane@example.com",
      skills: ["TypeScript"],
      experience: 3,
      education: undefined,
    });
  });
});
