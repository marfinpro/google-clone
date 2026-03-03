import type { ImageResult, ImageSearchResponse } from "@/types/search";

const DDG_BASE = "https://duckduckgo.com";

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const VQD_PATTERN = /vqd=([^&"';,\s]+)/;

interface DDGImageResult {
  height: number;
  image: string;
  thumbnail: string;
  title: string;
  url: string;
  width: number;
}

interface DDGImageResponse {
  results: DDGImageResult[];
}

const fetchVqd = async (
  query: string
): Promise<{ cookie: string; vqd: string }> => {
  const response = await fetch(
    `${DDG_BASE}/?q=${encodeURIComponent(query)}&iar=images&iax=images&ia=images`,
    {
      headers: {
        Accept: "text/html",
        "User-Agent": BROWSER_USER_AGENT,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get VQD token: ${response.status}`);
  }

  const setCookies = response.headers.getSetCookie?.() ?? [];
  const cookie = setCookies.map((c) => c.split(";")[0]).join("; ");

  const html = await response.text();
  const match = html.match(VQD_PATTERN);

  if (!match) {
    throw new Error("Could not extract VQD token");
  }

  return { cookie, vqd: match[1] };
};

export const searchImages = async (
  query: string,
  _page: number
): Promise<ImageSearchResponse> => {
  const { cookie, vqd } = await fetchVqd(query);

  const params = new URLSearchParams({
    f: ",,,,,",
    l: "us-en",
    o: "json",
    p: "1",
    q: query,
    vqd,
  });

  const response = await fetch(`${DDG_BASE}/i.js?${params.toString()}`, {
    headers: {
      Accept: "application/json",
      Cookie: cookie,
      Referer: `${DDG_BASE}/`,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": BROWSER_USER_AGENT,
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!response.ok) {
    throw new Error(
      `DuckDuckGo Images responded with status ${response.status}`
    );
  }

  const data: DDGImageResponse = await response.json();

  const images: ImageResult[] = data.results.map((item, index) => ({
    height: item.height,
    id: `img-${index}`,
    sourceUrl: item.url,
    thumbnailUrl: item.thumbnail,
    title: item.title,
    width: item.width,
  }));

  return {
    images,
    page: 1,
    query,
    totalResults: images.length > 0 ? images.length * 10 : 0,
  };
};
