"use client";

import { useRef } from "react";

interface SearchBarProps {
  autoFocus?: boolean;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  size?: "large" | "small";
}

export const SearchBar = ({
  defaultValue = "",
  onSearch,
  autoFocus = false,
  size = "large",
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch && inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  const containerClass =
    size === "large"
      ? "flex items-center w-full max-w-[584px] rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-transparent transition-shadow dark:bg-zinc-800 dark:border-zinc-700"
      : "flex items-center w-full max-w-[584px] rounded-full border border-gray-200 bg-white px-3 py-2 hover:shadow-md focus-within:shadow-md focus-within:border-transparent transition-shadow dark:bg-zinc-800 dark:border-zinc-700";

  const inputClass =
    size === "large"
      ? "flex-1 bg-transparent outline-none text-base text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400"
      : "flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400";

  return (
    <div className={containerClass}>
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
        aria-label="Search"
        autoFocus={autoFocus}
        className={inputClass}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        placeholder="Search Findin or type a URL"
        ref={inputRef}
        type="text"
      />
      <button
        aria-label="Clear search"
        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        onClick={handleClear}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    </div>
  );
};
