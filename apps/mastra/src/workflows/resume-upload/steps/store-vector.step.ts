import { createStep } from "@mastra/core/workflows";

import { storeVector } from "../../../tools/database/qdrant/index.js";
import {
  PersistableResumeStepSchema,
  StoredVectorStepSchema,
} from "../schema.js";

export const storeVectorStep = createStep({
  id: "store-vector",

  description: "Store candidate embedding in Qdrant.",

  inputSchema: PersistableResumeStepSchema,

  outputSchema: StoredVectorStepSchema,

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