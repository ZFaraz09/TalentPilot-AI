import { createStep } from "@mastra/core/workflows";

import { saveCandidate } from "../../../tools/database/postgres/index.js";
import { toCandidateRecord } from "../../../tools/database/postgres/mapper.js";
import {
  ResumeUploadOutputSchema,
  StoredVectorStepSchema,
} from "../schema.js";

export const saveProfileStep = createStep({
  id: "save-profile",

  description: "Save parsed candidate profile into PostgreSQL.",

  inputSchema: StoredVectorStepSchema,

  outputSchema: ResumeUploadOutputSchema,

  execute: async ({ inputData }) => {
    const candidate = toCandidateRecord(
      inputData.candidateId,
      inputData.parsedResume
    );

    const result = await saveCandidate(candidate);

    return {
      success: result.success,
      candidateId: inputData.candidateId,
      message: result.message,
    };
  },
});