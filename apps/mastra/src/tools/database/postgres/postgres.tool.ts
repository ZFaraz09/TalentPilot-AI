import {
  CandidateRecord,
  SaveCandidateResponse,
  CandidateLookupRequest,
} from "./types.js";

/**
 * Save a candidate.
 */
export async function saveCandidate(
  candidate: CandidateRecord
): Promise<SaveCandidateResponse> {
  console.log("Saving candidate:", candidate);

  return {
    success: true,
    message: "Candidate saved successfully.",
  };
}

/**
 * Find a candidate by ID.
 */
export async function findCandidate(
  request: CandidateLookupRequest
): Promise<CandidateRecord | null> {
  console.log("Finding candidate:", request);

  return null;
}