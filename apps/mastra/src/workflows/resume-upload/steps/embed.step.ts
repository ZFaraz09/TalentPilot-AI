import { createStep } from "@mastra/core/workflows";
import { z } from "zod";

import { generateEmbedding } from "../../../tools/ai/embedding/index.js";

export const embedResumeStep = createStep({
  id: "embed-resume",

  description: "Generate semantic embedding from the parsed resume.",

  inputSchema: z.object({
    candidateId: z.string(),
    parsedResume: z.any(),
  }),

  outputSchema: z.object({
    candidateId: z.string(),
    parsedResume: z.any(),
    embedding: z.array(z.number()),
  }),

  execute: async ({ inputData }) => {
    const resumeText = JSON.stringify(inputData.parsedResume);

    const { embedding } = await generateEmbedding({
      text: resumeText,
    });

    return {
      candidateId: inputData.candidateId,
      parsedResume: inputData.parsedResume,
      embedding,
    };
  },
});