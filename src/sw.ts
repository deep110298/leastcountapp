import { defaultCache, PAGES_CACHE_NAME } from '@serwist/next/worker';
import type { PrecacheEntry, RuntimeCaching } from 'serwist';
import { ExpirationPlugin, NetworkFirst, Serwist } from 'serwist';

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[];
};

// @serwist/next/worker's defaultCache serves navigations (and RSC fetches)
// with NetworkFirst but no networkTimeoutSeconds, so it races only the
// network fetch — the precache fallback never runs until that fetch settles.
// Chromium's simulated offline (and Serwist's own tests) reject such a fetch
// almost instantly, so that gap is invisible there. A real device in genuine
// airplane mode doesn't fail nearly as fast — the OS network stack can leave
// the request pending far longer than a synthetic "offline" toggle does — so
// a tapped <a> (a plain document navigation) just hangs with no feedback in
// a bare WKWebView, reading as "nothing is clickable" rather than "offline."
// These three entries are copied from defaultCache (same matchers and cache
// names) with a bounded timeout added, so a stalled fetch falls back to the
// already-precached page quickly instead of waiting indefinitely. Placed
// before ...defaultCache below so they win the first-match lookup; they
// don't shadow anything else in defaultCache since their matchers only ever
// match actual navigation/RSC requests (by header), never static assets.
const NAVIGATION_NETWORK_TIMEOUT_SECONDS = 4;

const navigationCache: RuntimeCaching[] = [
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get('RSC') === '1' &&
      request.headers.get('Next-Router-Prefetch') === '1' &&
      sameOrigin &&
      !pathname.startsWith('/api/'),
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.rscPrefetch,
      networkTimeoutSeconds: NAVIGATION_NETWORK_TIMEOUT_SECONDS,
      plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 1440 * 60 })],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.rsc,
      networkTimeoutSeconds: NAVIGATION_NETWORK_TIMEOUT_SECONDS,
      plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 1440 * 60 })],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      !!request.headers.get('Content-Type')?.includes('text/html') && sameOrigin && !pathname.startsWith('/api/'),
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.html,
      networkTimeoutSeconds: NAVIGATION_NETWORK_TIMEOUT_SECONDS,
      plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 1440 * 60 })],
    }),
  },
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [...navigationCache, ...defaultCache],
});

serwist.addEventListeners();
