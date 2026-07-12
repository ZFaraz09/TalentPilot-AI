import { Pool } from "pg";

import { createSuccessResult } from "../../../shared/operation-result.js";
import { postgresConfig } from "./config.js";
import {
  CandidateRecord,
  SaveCandidateResponse,
  CandidateLookupRequest,
} from "./types.js";

interface CandidateRow {
  id: string;
  full_name: string;
  email: string;
  skills: string[];
  experience: number;
  education: string | null;
}

let pool: Pool | undefined;
let schemaReady: Promise<void> | undefined;

function getPool(): Pool {
  if (!postgresConfig.connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    pool = new Pool({ connectionString: postgresConfig.connectionString });
  }

  return pool;
}

/**
 * Create the candidates table if it does not exist. Runs at most once per
 * process; the promise is cached so concurrent callers share a single DDL run.
 */
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS ${postgresConfig.table} (
          id TEXT PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          skills TEXT[] NOT NULL DEFAULT '{}',
          experience INTEGER NOT NULL DEFAULT 0,
          education TEXT
        )`
      )
      .then(() => undefined);
  }

  return schemaReady;
}

/**
 * Insert or update a candidate record (idempotent by id).
 */
export async function saveCandidate(
  candidate: CandidateRecord
): Promise<SaveCandidateResponse> {
  await ensureSchema();

  await getPool().query(
    `INSERT INTO ${postgresConfig.table}
      (id, full_name, email, skills, experience, education)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO UPDATE SET
       full_name = EXCLUDED.full_name,
       email = EXCLUDED.email,
       skills = EXCLUDED.skills,
       experience = EXCLUDED.experience,
       education = EXCLUDED.education`,
    [
      candidate.id,
      candidate.fullName,
      candidate.email,
      candidate.skills,
      candidate.experience,
      candidate.education ?? null,
    ]
  );

  return createSuccessResult("Candidate saved successfully.");
}

/**
 * Find a candidate by id, or return null when not found.
 */
export async function findCandidate(
  request: CandidateLookupRequest
): Promise<CandidateRecord | null> {
  await ensureSchema();

  const result = await getPool().query<CandidateRow>(
    `SELECT id, full_name, email, skills, experience, education
     FROM ${postgresConfig.table}
     WHERE id = $1`,
    [request.id]
  );

  const row = result.rows[0];

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    skills: row.skills,
    experience: row.experience,
    education: row.education ?? undefined,
  };
}
