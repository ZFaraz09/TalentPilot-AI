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
export interface SaveCandidateResponse {
  success: boolean;
  message: string;
}

/**
 * Candidate lookup request.
 */
export interface CandidateLookupRequest {
  id: string;
}