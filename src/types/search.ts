export interface SearchResult {
  description: string;
  displayUrl: string;
  id: string;
  title: string;
  url: string;
}

export interface ImageResult {
  height: number;
  id: string;
  sourceUrl: string;
  thumbnailUrl: string;
  title: string;
  width: number;
}

export interface SearchResponse {
  page: number;
  query: string;
  results: SearchResult[];
  searchTime?: number;
  totalResults: number;
}

export interface ImageSearchResponse {
  images: ImageResult[];
  page: number;
  query: string;
  totalResults: number;
}
