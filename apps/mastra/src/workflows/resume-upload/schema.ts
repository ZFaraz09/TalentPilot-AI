import { z } from "zod";

export const ResumeUploadInputSchema = z.object({
  candidateId: z.string().min(1),
  resumeContent: z.string().min(1),
});

export const ResumeUploadOutputSchema = z.object({
  success: z.boolean(),
  candidateId: z.string(),
  message: z.string(),
});

export type ResumeUploadInput = z.infer<typeof ResumeUploadInputSchema>;
export type ResumeUploadOutput = z.infer<typeof ResumeUploadOutputSchema>;