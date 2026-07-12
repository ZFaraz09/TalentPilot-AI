import { ParsedResume } from "../../../schemas/resume.schema.js";
import { CandidateRecord } from "./types.js";

export function toCandidateRecord(
  candidateId: string,
  resume: ParsedResume
): CandidateRecord {
  return {
    id: candidateId,
    fullName: resume.name,
    email: resume.email,
    skills: resume.skills,

    // TODO: Improve this logic once experience is structured
    experience: resume.experience.length,

    // Store the first education entry for now
   education:
  resume.education.length > 0
    ? `${resume.education[0].degree} - ${resume.education[0].institution}`
    : undefined,
  };
}