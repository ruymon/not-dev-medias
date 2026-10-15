/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the Turbopack root to this project so a stray lockfile in a parent
  // directory can't be picked up as the workspace root.
  turbopack: {
    root: import.meta.dirname,
  },
  env: {
    // Versions the service worker, so every deploy refreshes the offline
    // cache. The commit on Vercel, the build time anywhere else.
    NEXT_PUBLIC_BUILD_ID:
      process.env.VERCEL_GIT_COMMIT_SHA ?? Date.now().toString(),
  },
  async headers() {
    return [
      {
        // The worker must never be served stale, or a deploy could not
        // replace it.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
