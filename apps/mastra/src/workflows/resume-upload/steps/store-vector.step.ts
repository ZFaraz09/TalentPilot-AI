import { createStep } from "@mastra/core/workflows";
import { z } from "zod";

import { storeVector } from "../../../tools/database/qdrant/index.js";
import { ParsedResumeSchema } from "../../../schemas/resume.schema.js";

export const storeVectorStep = createStep({
  id: "store-vector",

  description: "Store candidate embedding in Qdrant.",

  inputSchema: z.object({
    candidateId: z.string(),
    parsedResume: ParsedResumeSchema,
    embedding: z.array(z.number()),
  }),

  outputSchema: z.object({
    candidateId: z.string(),
    parsedResume: ParsedResumeSchema,
    embedding: z.array(z.number()),
    vectorStored: z.boolean(),
  }),

  execute: async ({ inputData }) => {
    await storeVector({
      id: inputData.candidateId,
      embedding: inputData.embedding,
      payload: inputData.parsedResume,
    });

    return {
      candidateId: inputData.candidateId,
      parsedResume: inputData.parsedResume,
      embedding: inputData.embedding,
      vectorStored: true,
    };
  },
});