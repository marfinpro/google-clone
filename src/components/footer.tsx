export const Footer = () => {
  return (
    <footer className="mt-auto w-full border-gray-200 border-t bg-gray-50 text-gray-600 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-400">
      <div className="border-gray-200 border-b px-8 py-3 dark:border-zinc-700">
        <span>Indonesia</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 px-8 py-3 sm:flex-row">
        <nav
          aria-label="Footer navigation left"
          className="flex flex-wrap gap-x-6 gap-y-1"
        >
          <a className="hover:underline" href="/about">
            About
          </a>
          <a className="hover:underline" href="/advertising">
            Advertising
          </a>
          <a className="hover:underline" href="/business">
            Business
          </a>
          <a className="hover:underline" href="/how-search-works">
            How Search works
          </a>
        </nav>
        <nav
          aria-label="Footer navigation right"
          className="flex flex-wrap gap-x-6 gap-y-1"
        >
          <a className="hover:underline" href="/privacy">
            Privacy
          </a>
          <a className="hover:underline" href="/terms">
            Terms
          </a>
          <a className="hover:underline" href="/settings">
            Settings
          </a>
        </nav>
      </div>
    </footer>
  );
};
