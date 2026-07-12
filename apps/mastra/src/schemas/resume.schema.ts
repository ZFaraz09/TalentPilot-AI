import { z } from "zod";

/**
 * Individual work experience.
 */
export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(), // e.g. "2 years", "Jan 2022 - Mar 2024"
});

/**
 * Individual education record.
 */
export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.string().optional(),
});

/**
 * Parsed resume returned by the Resume Parser.
 */
export const ParsedResumeSchema = z.object({
  name: z.string(),

  email: z.string().email(),

  phone: z.string().optional(),

  location: z.string().optional(),

  summary: z.string().optional(),

  skills: z.array(z.string()),

  experience: z.array(ExperienceSchema),

  education: z.array(EducationSchema),

  certifications: z.array(z.string()).default([]),

  projects: z.array(z.string()).default([]),

  languages: z.array(z.string()).default([]),
});

/**
 * TypeScript type inferred from schema.
 */
export type ParsedResume = z.infer<typeof ParsedResumeSchema>;