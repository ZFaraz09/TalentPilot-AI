import { z } from "zod";

import { ParsedResumeSchema } from "../../schemas/resume.schema.js";

export const CandidateIdSchema = z.string().min(1);
export const EmbeddingSchema = z.array(z.number());

export const ResumeUploadInputSchema = z.object({
  candidateId: CandidateIdSchema,
  resumeContent: z.string().min(1),
});

export const ResumeUploadOutputSchema = z.object({
  success: z.boolean(),
  candidateId: CandidateIdSchema,
  message: z.string(),
});

export const ParsedResumeStepSchema = z.object({
  candidateId: CandidateIdSchema,
  parsedResume: z.any(),
});

export const EmbeddedResumeStepSchema = ParsedResumeStepSchema.extend({
  embedding: EmbeddingSchema,
});

export const PersistableResumeStepSchema = z.object({
  candidateId: CandidateIdSchema,
  parsedResume: ParsedResumeSchema,
  embedding: EmbeddingSchema,
});

export const StoredVectorStepSchema = PersistableResumeStepSchema.extend({
  vectorStored: z.boolean(),
});

export type ResumeUploadInput = z.infer<typeof ResumeUploadInputSchema>;
export type ResumeUploadOutput = z.infer<typeof ResumeUploadOutputSchema>;