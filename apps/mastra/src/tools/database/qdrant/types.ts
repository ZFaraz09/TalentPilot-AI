/**
 * Request to store a vector.
 */
export interface StoreVectorRequest {
  id: string;
  embedding: number[];
  payload?: Record<string, unknown>;
}

/**
 * Result after storing a vector.
 */
export interface StoreVectorResponse {
  success: boolean;
  message: string;
}

/**
 * Search request.
 */
export interface SearchVectorRequest {
  embedding: number[];
  limit?: number;
}

/**
 * Search response.
 */
export interface SearchResult {
  id: string;
  score: number;
  payload?: Record<string, unknown>;
}