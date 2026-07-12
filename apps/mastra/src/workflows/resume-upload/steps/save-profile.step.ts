import { createStep } from "@mastra/core/workflows";
import { z } from "zod";

import { saveCandidate } from "../../../tools/database/postgres/index.js";
import { toCandidateRecord } from "../../../tools/database/postgres/mapper.js";
import { ParsedResumeSchema } from "../../../schemas/resume.schema.js";

export const saveProfileStep = createStep({
  id: "save-profile",

  description: "Save parsed candidate profile into PostgreSQL.",

  inputSchema: z.object({
    candidateId: z.string(),
    parsedResume: ParsedResumeSchema,
    embedding: z.array(z.number()),
    vectorStored: z.boolean(),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    candidateId: z.string(),
    message: z.string(),
  }),

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