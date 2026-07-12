import type { OperationResult } from "../../../shared/operation-result.js";

/**
 * Candidate record stored in PostgreSQL.
 */
export interface CandidateRecord {
  id: string;
  fullName: string;
  email: string;
  skills: string[];
  experience: number;
  education?: string;
}

/**
 * Save operation response.
 */
export type SaveCandidateResponse = OperationResult;

/**
 * Candidate lookup request.
 */
export interface CandidateLookupRequest {
  id: string;
}