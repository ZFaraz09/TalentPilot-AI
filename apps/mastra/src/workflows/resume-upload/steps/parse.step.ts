import { createStep } from "@mastra/core/workflows";

import { parseResume } from "../../../tools/ai/parser/index.js";
import {
  ParsedResumeStepSchema,
  ResumeUploadInputSchema,
} from "../schema.js";

export const parseResumeStep = createStep({
  id: "parse-resume",

  description: "Parse uploaded resume into structured data.",

  inputSchema: ResumeUploadInputSchema,

  outputSchema: ParsedResumeStepSchema,

  execute: async ({ inputData }) => {
    const parsedResume = await parseResume(inputData.resumeContent);

    return {
      candidateId: inputData.candidateId,
      parsedResume,
    };
  },
});