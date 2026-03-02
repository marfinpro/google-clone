export interface GoogleSearchItem {
  displayLink: string;
  formattedUrl?: string;
  htmlFormattedUrl?: string;
  htmlSnippet?: string;
  link: string;
  pagemap?: {
    cse_thumbnail?: Array<{ src: string; width: string; height: string }>;
    metatags?: Record<string, string>[];
  };
  snippet: string;
  title: string;
}

export interface GoogleSearchResponse {
  error?: {
    code: number;
    message: string;
    errors: Array<{ message: string; domain: string; reason: string }>;
  };
  items?: GoogleSearchItem[];
  searchInformation: {
    totalResults: string;
    searchTime: number;
    formattedTotalResults: string;
    formattedSearchTime: string;
  };
}
