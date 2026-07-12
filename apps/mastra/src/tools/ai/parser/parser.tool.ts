import { generateText } from "ai";

import { llm } from "../../../config/llm.config.js";
import {
  ParsedResumeSchema,
  type ParsedResume,
} from "../../../schemas/resume.schema.js";

const OUTPUT_SHAPE = [
  "Return ONLY a single JSON object (no markdown fences, no commentary) with",
  "exactly these keys:",
  'name (string), email (a valid email address; use "unknown@example.com" if',
  "none is present), phone (string, optional), location (string, optional),",
  "summary (string, optional), skills (string[]), experience (array of",
  "{ company: string, role: string, duration: string }), education (array of",
  "{ degree: string, institution: string, year: string (optional) }),",
  "certifications (string[]), projects (string[]), languages (string[]).",
  "All year values must be strings. Only use information present in the resume;",
  "do not invent facts, and use empty arrays for missing collections.",
].join(" ");

/**
 * Extract the first JSON object from a model response, tolerating optional
 * markdown code fences and surrounding prose.
 */
function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Resume parser response did not contain a JSON object.");
  }

  return JSON.parse(raw.slice(start, end + 1));
}

/**
 * Parse raw resume content into a structured {@link ParsedResume} using the
 * configured LLM.
 *
 * The model is prompted for a strict JSON shape and the response is validated
 * against the single source-of-truth `ParsedResumeSchema`, so downstream
 * workflow steps always receive a schema-valid object. This uses free-form
 * generation rather than provider-native structured output because the
 * OpenAI-compatible gateway does not support JSON-schema response formats.
 */
export async function parseResume(content: string): Promise<ParsedResume> {
  const { text } = await generateText({
    model: llm,
    prompt: `You are an expert resume parser. ${OUTPUT_SHAPE}\n\nResume:\n${content}`,
  });

  return ParsedResumeSchema.parse(extractJson(text));
}
