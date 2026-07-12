import {
  ParsedResumeSchema,
  type ParsedResume,
} from "../../../schemas/resume.schema.js";

/**
 * Parse raw resume content into a structured {@link ParsedResume}.
 *
 * This tool owns the (external) parsing integration. The current
 * implementation is a deterministic stub that returns a schema-valid structure
 * with the raw content preserved in `summary`; replace the body with a real
 * document parser / LLM extraction call. The return type is the single
 * source-of-truth `ParsedResume` schema type so the downstream workflow steps
 * (embed, store-vector, save-profile) stay type-consistent.
 */
export async function parseResume(content: string): Promise<ParsedResume> {
  return ParsedResumeSchema.parse({
    name: "Unknown Candidate",
    email: "unknown@example.com",
    summary: content,
    skills: [],
    experience: [],
    education: [],
  });
}
