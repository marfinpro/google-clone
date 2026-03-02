"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Footer } from "@/components/footer";
import { GoogleLogo } from "@/components/google-logo";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLucky = () => {
    const query = inputRef.current?.value.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900">
      <header className="flex justify-end gap-4 p-4">
        <a
          className="text-gray-700 text-sm hover:underline dark:text-gray-300"
          href="https://mail.google.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gmail
        </a>
        <a
          className="text-gray-700 text-sm hover:underline dark:text-gray-300"
          href="https://images.google.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Images
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-32">
        <div className="mb-8">
          <GoogleLogo size="large" />
        </div>

        <form
          aria-label="Search the web"
          className="w-full max-w-[584px]"
          onSubmit={handleSearch}
        >
          <div className="mb-8 flex w-full items-center rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow focus-within:border-transparent focus-within:shadow-md hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800">
            <svg
              aria-hidden="true"
              className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400"
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
              aria-label="Search Google"
              autoFocus
              className="flex-1 bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400"
              placeholder="Search Google or type a URL"
              ref={inputRef}
              type="text"
            />
          </div>

          <div className="flex justify-center gap-3">
            <button
              className="rounded bg-gray-50 px-4 py-2 text-gray-800 text-sm hover:border hover:border-gray-300 hover:shadow-sm focus:outline-none dark:bg-zinc-700 dark:text-gray-200 dark:hover:border-zinc-500"
              type="submit"
            >
              Google Search
            </button>
            <button
              className="rounded bg-gray-50 px-4 py-2 text-gray-800 text-sm hover:border hover:border-gray-300 hover:shadow-sm focus:outline-none dark:bg-zinc-700 dark:text-gray-200 dark:hover:border-zinc-500"
              onClick={handleLucky}
              type="button"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
