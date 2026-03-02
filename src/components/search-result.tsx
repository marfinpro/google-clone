import type { SearchResult as SearchResultType } from "@/types/search";

interface SearchResultProps {
  result: SearchResultType;
}

export const SearchResult = ({ result }: SearchResultProps) => {
  return (
    <article className="mb-6 max-w-[652px]">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
          <svg
            aria-hidden="true"
            className="h-3 w-3 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span
            className="max-w-[400px] truncate text-gray-600 text-xs dark:text-gray-400"
            title={result.displayUrl}
          >
            {result.displayUrl}
          </span>
          <span
            className="max-w-[400px] truncate text-gray-500 text-xs dark:text-gray-500"
            title={result.url}
          >
            {result.url}
          </span>
        </div>
      </div>
      <h3 className="mb-1">
        <a
          className="text-blue-700 text-lg hover:underline dark:text-blue-400"
          href={result.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {result.title}
        </a>
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed dark:text-gray-300">
        {result.description}
      </p>
    </article>
  );
};
