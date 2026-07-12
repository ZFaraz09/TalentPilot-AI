import { ParsedResume } from "./types.js";

export async function parseResume(
  content: string
): Promise<ParsedResume> {
  return {
    rawText: content,
  };
}