import { createSuccessResult } from "../../../shared/operation-result.js";
import {
  StoreVectorRequest,
  StoreVectorResponse,
  SearchVectorRequest,
  SearchResult,
} from "./types.js";

export async function storeVector(
  request: StoreVectorRequest
): Promise<StoreVectorResponse> {
  console.log("Store Vector:", request);

  return createSuccessResult("Vector stored successfully.");
}

export async function searchVector(
  request: SearchVectorRequest
): Promise<SearchResult[]> {
  console.log("Search Vector:", request);

  return [];
}