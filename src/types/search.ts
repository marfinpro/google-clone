export interface SearchResult {
  description: string;
  displayUrl: string;
  id: string;
  title: string;
  url: string;
}

export interface SearchResponse {
  page: number;
  query: string;
  results: SearchResult[];
  totalResults: number;
}
