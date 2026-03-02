import { type NextRequest, NextResponse } from "next/server";
import { getMockResults } from "@/lib/mock-data";

// Placeholder API route for future Google Custom Search API integration
//
// To integrate with the real Google Custom Search API:
// 1. Get your API key: https://console.cloud.google.com/
// 2. Get your Search Engine ID: https://programmablesearchengine.google.com/
// 3. Set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID in your .env.local
// 4. Replace the getMockResults call below with a fetch to:
//    https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={GOOGLE_SEARCH_ENGINE_ID}&q={query}&start={start}

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const data = getMockResults(query, page);

  return NextResponse.json(data);
};
