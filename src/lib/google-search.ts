import type { GoogleSearchResponse } from "@/types/google-api";
import type { SearchResponse, SearchResult } from "@/types/search";

const RESULTS_PER_PAGE = 10;

export const searchGoogle = async (
  query: string,
  page: number
): Promise<SearchResponse> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  const startIndex = (page - 1) * RESULTS_PER_PAGE + 1;
  const params = new URLSearchParams({
    cx: searchEngineId ?? "",
    key: apiKey ?? "",
    q: query,
    start: String(startIndex),
  });
  const url = `https://www.googleapis.com/customsearch/v1?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data: GoogleSearchResponse = await response.json();

    if (data.error) {
      return { page, query, results: [], totalResults: 0 };
    }

    const results: SearchResult[] = (data.items ?? []).map((item, index) => ({
      description: item.snippet,
      displayUrl: item.displayLink,
      id: `${page}-${index}-${item.link}`,
      title: item.title,
      url: item.link,
    }));

    const totalResults = Number.parseInt(
      data.searchInformation?.totalResults ?? "0",
      10
    );

    const searchTime = data.searchInformation?.searchTime;

    return { page, query, results, searchTime, totalResults };
  } catch {
    return { page, query, results: [], totalResults: 0 };
  }
};
