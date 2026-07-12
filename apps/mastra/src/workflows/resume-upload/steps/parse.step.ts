import { createStep } from "@mastra/core/workflows";
import { z } from "zod";

import { parseResume } from "../../../tools/ai/parser/index.js";

export const parseResumeStep = createStep({
  id: "parse-resume",

  description: "Parse uploaded resume into structured data.",

  inputSchema: z.object({
    candidateId: z.string(),
    resumeContent: z.string(),
  }),

  outputSchema: z.object({
    candidateId: z.string(),
    parsedResume: z.any(),
  }),

  execute: async ({ inputData }) => {
    const parsedResume = await parseResume(inputData.resumeContent);

    return {
      candidateId: inputData.candidateId,
      parsedResume,
    };
  },
});