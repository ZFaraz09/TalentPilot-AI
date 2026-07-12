import { generateObject } from "ai";

import { llm } from "../../../config/llm.config.js";
import {
  ParsedResumeSchema,
  type ParsedResume,
} from "../../../schemas/resume.schema.js";

const PARSER_INSTRUCTIONS = [
  "You are an expert resume parser.",
  "Extract structured information from the resume text into the provided schema.",
  "Only use information present in the text; do not invent facts.",
  "If a required field is missing, use an empty value of the correct type.",
  "The email must be a valid email address; if none is present, use",
  '"unknown@example.com".',
].join(" ");

/**
 * Parse raw resume content into a structured {@link ParsedResume} using Gemini.
 *
 * This tool owns the LLM integration for resume extraction; the return value is
 * validated against the single source-of-truth `ParsedResumeSchema` by
 * `generateObject`, so downstream workflow steps receive a schema-valid object.
 */
export async function parseResume(content: string): Promise<ParsedResume> {
  const { object } = await generateObject({
    model: llm,
    schema: ParsedResumeSchema,
    prompt: `${PARSER_INSTRUCTIONS}\n\nResume:\n${content}`,
  });

  return object;
}
