export interface SearXNGResult {
  content?: string;
  engine?: string;
  engines?: string[];
  parsed_url?: string[];
  title: string;
  url: string;
}

export interface SearXNGResponse {
  answers?: string[];
  infoboxes?: unknown[];
  number_of_results?: number;
  query: string;
  results: SearXNGResult[];
}
