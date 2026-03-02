import { type NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search-service";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q");
  const page = Number(searchParams.get("page") ?? "1");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await search(query, page);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
