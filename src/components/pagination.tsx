interface PaginationProps {
  currentPage: number;
  query: string;
  totalResults: number;
}

const RESULTS_PER_PAGE = 10;

export const Pagination = ({
  currentPage,
  totalResults,
  query,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const visiblePages = Math.min(totalPages, 10);

  const logoLetters = [
    { id: "g1", letter: "G", color: "#4285F4" },
    { id: "o1", letter: "o", color: "#EA4335" },
    { id: "o2", letter: "o", color: "#FBBC05" },
    { id: "o3", letter: "o", color: "#4285F4" },
    { id: "o4", letter: "o", color: "#34A853" },
    { id: "o5", letter: "o", color: "#EA4335" },
    { id: "g2", letter: "g", color: "#4285F4" },
    { id: "l1", letter: "l", color: "#34A853" },
    { id: "e1", letter: "e", color: "#EA4335" },
  ];

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-col items-center gap-4"
    >
      <div aria-hidden="true" className="flex items-center gap-1">
        {logoLetters.map(({ id, letter, color }) => (
          <span className="font-normal text-3xl" key={id} style={{ color }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <a
            aria-label="Previous page"
            className="px-4 py-2 text-blue-700 text-sm hover:underline dark:text-blue-400"
            href={`/search?q=${encodeURIComponent(query)}&page=${currentPage - 1}`}
          >
            &laquo; Previous
          </a>
        )}
        {Array.from({ length: visiblePages }, (_, i) => i + 1).map((page) => (
          <a
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
            className={`rounded px-3 py-1 text-sm ${
              page === currentPage
                ? "font-bold text-gray-900 dark:text-white"
                : "text-blue-700 hover:underline dark:text-blue-400"
            }`}
            href={`/search?q=${encodeURIComponent(query)}&page=${page}`}
            key={page}
          >
            {page}
          </a>
        ))}
        {currentPage < totalPages && (
          <a
            aria-label="Next page"
            className="px-4 py-2 text-blue-700 text-sm hover:underline dark:text-blue-400"
            href={`/search?q=${encodeURIComponent(query)}&page=${currentPage + 1}`}
          >
            Next &raquo;
          </a>
        )}
      </div>
    </nav>
  );
};
