import {
  StoreVectorRequest,
  StoreVectorResponse,
  SearchVectorRequest,
  SearchResult,
} from "./types.js";

export async function storeVector(
  request: StoreVectorRequest
): Promise<StoreVectorResponse> {
  console.log("Store Vector:", request.id);

  return {
    success: true,
    message: "Vector stored successfully.",
  };
}

export async function searchVector(
  request: SearchVectorRequest
): Promise<SearchResult[]> {
  console.log("Search Vector: limit =", request.limit ?? "default");

  return [];
}