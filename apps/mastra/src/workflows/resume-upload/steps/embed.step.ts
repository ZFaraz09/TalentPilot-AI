import { createStep } from "@mastra/core/workflows";

import { generateEmbedding } from "../../../tools/ai/embedding/index.js";
import {
  EmbeddedResumeStepSchema,
  ParsedResumeStepSchema,
} from "../schema.js";

export const embedResumeStep = createStep({
  id: "embed-resume",

  description: "Generate semantic embedding from the parsed resume.",

  inputSchema: ParsedResumeStepSchema,

  outputSchema: EmbeddedResumeStepSchema,

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