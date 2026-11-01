import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prerender a static shell for every route and stream only what depends on
  // the request (here, the subjects search params).
  cacheComponents: true,
  // Prefetch one reusable App Shell per route instead of one per link.
  partialPrefetching: true,
  // Type-check every `href` against the routes in `src/app`.
  typedRoutes: true,
  // Pin the Turbopack root to this project so a stray lockfile in a parent
  // directory can't be picked up as the workspace root.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
