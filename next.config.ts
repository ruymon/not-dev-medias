import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	typedRoutes: true,
	turbopack: {
		root: import.meta.dirname,
	},
};

export default nextConfig;
