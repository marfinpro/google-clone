import type { SearchResponse, SearchResult } from "@/types/search";

const ALL_RESULTS: SearchResult[] = [
  {
    id: "1",
    title: "Google - Search the world's information",
    url: "https://www.google.com",
    displayUrl: "www.google.com",
    description:
      "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
  },
  {
    id: "2",
    title: "Wikipedia - The Free Encyclopedia",
    url: "https://www.wikipedia.org",
    displayUrl: "www.wikipedia.org",
    description:
      "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.",
  },
  {
    id: "3",
    title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
    url: "https://stackoverflow.com",
    displayUrl: "stackoverflow.com",
    description:
      "Stack Overflow is the largest, most trusted online community for developers to learn, share their knowledge, and build their careers.",
  },
  {
    id: "4",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    displayUrl: "developer.mozilla.org",
    description:
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
  },
  {
    id: "5",
    title: "GitHub - Where the world builds software",
    url: "https://github.com",
    displayUrl: "github.com",
    description:
      "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, and more.",
  },
  {
    id: "6",
    title: "Next.js by Vercel - The React Framework",
    url: "https://nextjs.org",
    displayUrl: "nextjs.org",
    description:
      "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.",
  },
  {
    id: "7",
    title:
      "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML",
    url: "https://tailwindcss.com",
    displayUrl: "tailwindcss.com",
    description:
      "A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
  },
  {
    id: "8",
    title: "TypeScript - JavaScript with syntax for types",
    url: "https://www.typescriptlang.org",
    displayUrl: "www.typescriptlang.org",
    description:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  },
  {
    id: "9",
    title: "React – A JavaScript library for building user interfaces",
    url: "https://react.dev",
    displayUrl: "react.dev",
    description:
      "React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video.",
  },
  {
    id: "10",
    title:
      "Vercel - Build and deploy the best web experiences with the Frontend Cloud",
    url: "https://vercel.com",
    displayUrl: "vercel.com",
    description:
      "Vercel's Frontend Cloud gives developers frameworks, workflows, and infrastructure to build a faster, more personalized web.",
  },
];

const RESULTS_PER_PAGE = 10;

export const getMockResults = (query: string, page: number): SearchResponse => {
  const lowerQuery = query.toLowerCase();

  const filtered = ALL_RESULTS.filter(
    (result) =>
      result.title.toLowerCase().includes(lowerQuery) ||
      result.description.toLowerCase().includes(lowerQuery) ||
      result.displayUrl.toLowerCase().includes(lowerQuery)
  );

  const results = filtered.length > 0 ? filtered : ALL_RESULTS;

  const totalResults = results.length;
  const startIndex = (page - 1) * RESULTS_PER_PAGE;
  const pageResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  return {
    results: pageResults,
    totalResults,
    query,
    page,
  };
};
