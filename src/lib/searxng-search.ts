import type { SearchResponse, SearchResult } from "@/types/search";
import type { SearXNGResponse } from "@/types/searxng-api";

const DEFAULT_SEARXNG_URL = "https://etsi.me/search";

export const searchSearXNG = async (
  query: string,
  page: number
): Promise<SearchResponse> => {
  const baseUrl = process.env.SEARXNG_URL ?? DEFAULT_SEARXNG_URL;

  const params = new URLSearchParams({
    format: "json",
    pageno: String(page),
    q: query,
  });

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`SearXNG responded with status ${response.status}`);
    }

    const data: SearXNGResponse = await response.json();

    const results: SearchResult[] = data.results.map((item, index) => {
      let displayUrl: string;
      try {
        displayUrl = item.parsed_url?.[1] ?? new URL(item.url).hostname;
      } catch {
        displayUrl = item.url;
      }
      return {
        description: item.content ?? "",
        displayUrl,
        id: `${page}-${index}-${item.url}`,
        title: item.title,
        url: item.url,
      };
    });

    const totalResults = data.number_of_results ?? results.length;

    return { page, query, results, totalResults };
  } catch {
    return { page, query, results: [], totalResults: 0 };
  }
};
