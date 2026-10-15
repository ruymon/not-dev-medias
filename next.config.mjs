/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the Turbopack root to this project so a stray lockfile in a parent
  // directory can't be picked up as the workspace root.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
