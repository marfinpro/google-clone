import { searchGoogle } from "@/lib/google-search";
import { getMockResults } from "@/lib/mock-data";
import type { SearchResponse } from "@/types/search";

export const search = async (
  query: string,
  page: number
): Promise<SearchResponse> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (apiKey && searchEngineId) {
    return await searchGoogle(query, page);
  }

  return getMockResults(query, page);
};
