import { searchDuckDuckGo } from "@/lib/duckduckgo-search";
import { searchGoogle } from "@/lib/google-search";
import { searchSearXNG } from "@/lib/searxng-search";
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

  try {
    const result = await searchSearXNG(query, page);
    if (result.results.length > 0) {
      return result;
    }
  } catch {
    // SearXNG unavailable — fall through to DuckDuckGo
  }

  return await searchDuckDuckGo(query, page);
};
