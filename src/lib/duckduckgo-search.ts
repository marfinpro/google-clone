import type { SearchResponse, SearchResult } from "@/types/search";

const DDG_URL = "https://html.duckduckgo.com/html/";

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const TITLE_REGEX =
  /class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;

const SNIPPET_REGEX = /class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;

const HTML_TAG_REGEX = /<[^>]+>/g;
const HTML_ENTITY_REGEX = /&#x27;/g;
const AMP_ENTITY_REGEX = /&amp;/g;

const decodeHtmlEntities = (text: string): string =>
  text
    .replace(HTML_TAG_REGEX, "")
    .replace(HTML_ENTITY_REGEX, "'")
    .replace(AMP_ENTITY_REGEX, "&")
    .trim();

const extractHostname = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const searchDuckDuckGo = async (
  query: string,
  _page: number
): Promise<SearchResponse> => {
  const startTime = performance.now();

  const response = await fetch(DDG_URL, {
    body: new URLSearchParams({ q: query }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": BROWSER_USER_AGENT,
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`DuckDuckGo responded with status ${response.status}`);
  }

  const html = await response.text();
  const searchTime = (performance.now() - startTime) / 1000;

  const titleMatches = [...html.matchAll(TITLE_REGEX)];
  const snippetMatches = [...html.matchAll(SNIPPET_REGEX)];

  const results: SearchResult[] = titleMatches.map((match, index) => {
    const rawUrl = match[1];
    const title = decodeHtmlEntities(match[2]);
    const snippet = snippetMatches[index]
      ? decodeHtmlEntities(snippetMatches[index][1])
      : "";

    let url = rawUrl;
    try {
      const parsed = new URL(rawUrl, "https://duckduckgo.com");
      const uddg = parsed.searchParams.get("uddg");
      if (uddg) {
        url = uddg;
      }
    } catch {
      // use rawUrl as-is
    }

    return {
      description: snippet,
      displayUrl: extractHostname(url),
      id: `ddg-${index}-${url}`,
      title,
      url,
    };
  });

  return {
    page: 1,
    query,
    results,
    searchTime,
    totalResults: results.length > 0 ? results.length * 100 : 0,
  };
};
