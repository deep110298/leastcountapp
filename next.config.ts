import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Retries a soft navigation instead of throwing when the network is
    // down — complements the service worker (src/sw.ts), which handles the
    // "no network at all, even for the app shell" case that this alone
    // doesn't cover (see node_modules/next/dist/docs/01-app/02-guides/offline-support.md).
    useOffline: true,
  },
};

export default nextConfig;
