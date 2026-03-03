import Link from "next/link";
import { FindinLogo } from "@/components/findin-logo";
import { ImageResultCard } from "@/components/image-result-card";
import { Pagination } from "@/components/pagination";
import { SearchResult } from "@/components/search-result";
import { ThemeToggle } from "@/components/theme-toggle";
import { searchImages } from "@/lib/image-search";
import { search } from "@/lib/search-service";
import type { ImageSearchResponse, SearchResponse } from "@/types/search";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string; tab?: string }>;
}

const NAV_TABS = ["All", "Images", "News", "Videos", "Maps"];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const page = Number(params.page ?? "1");
  const activeTab = params.tab ?? "all";

  let results: SearchResponse["results"] = [];
  let totalResults = 0;
  let searchTime: number | undefined;
  let imageResults: ImageSearchResponse["images"] = [];

  if (query) {
    try {
      if (activeTab === "images") {
        const data = await searchImages(query, page);
        imageResults = data.images;
        totalResults = data.totalResults;
      } else {
        const data = await search(query, page);
        results = data.results;
        totalResults = data.totalResults;
        searchTime = data.searchTime;
      }
    } catch {
      // show empty results on error
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900">
      <header className="sticky top-0 z-10 border-gray-200 border-b bg-white px-6 py-3 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-4">
          <Link aria-label="Go to Findin homepage" href="/">
            <FindinLogo size="small" />
          </Link>

          <form
            action="/search"
            aria-label="Search the web"
            className="flex max-w-146 flex-1 items-center rounded-full border border-gray-200 bg-white px-3 py-2 transition-shadow focus-within:border-transparent focus-within:shadow-md hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
            method="GET"
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-4 w-4 shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <input
              aria-label="Search"
              autoFocus
              className="flex-1 bg-transparent text-gray-900 text-sm outline-none dark:text-white"
              defaultValue={query}
              name="q"
              type="text"
            />
          </form>

          <ThemeToggle />
        </div>

        <nav
          aria-label="Search category tabs"
          className="mt-2 flex gap-6 text-sm"
        >
          {NAV_TABS.map((tab) => {
            const tabKey = tab.toLowerCase();
            const isActive = tabKey === activeTab;
            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={`pb-2 ${
                  isActive
                    ? "border-blue-600 border-b-2 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
                href={`/search?q=${encodeURIComponent(query)}&tab=${tabKey}`}
                key={tab}
              >
                {tab}
              </a>
            );
          })}
        </nav>
      </header>

      <main className="px-6 py-6 md:pl-40">
        {query ? (
          <>
            <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
              About {totalResults.toLocaleString()} results
              {searchTime !== undefined &&
                ` (${searchTime.toFixed(2)} seconds)`}
            </p>

            {activeTab === "images" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {imageResults.map((image) => (
                  <ImageResultCard image={image} key={image.id} />
                ))}
              </div>
            ) : (
              <div>
                {results.map((result) => (
                  <SearchResult key={result.id} result={result} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={page}
              query={query}
              totalResults={totalResults}
            />
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Enter a search query to see results.
          </p>
        )}
      </main>
    </div>
  );
}
