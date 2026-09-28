// This app's offline/precaching service worker turned out to be the source
// of a run of real-device bugs (stale/serving-wrong-content navigations,
// hangs under genuine airplane mode, a black-screen regression) that never
// reproduced in any test harness available here, and kept resurfacing even
// after the code causing them was reverted — because reverting the SW's
// source doesn't undo whatever an already-installed, already-broken worker
// wrote into a device's Cache Storage. The reliability cost outweighed the
// offline benefit for a card game, so this worker no longer caches or
// intercepts anything: its only job is to remove itself. A device still
// running an old cache-based version of this file will fetch this one on
// its next visit (the browser's own SW-update check happens outside any
// currently-installed worker's control, so a stuck worker can't block it),
// install it, and this `activate` handler wipes that device's leftover
// caches and unregisters — after which the app falls back to plain,
// uncached network requests, same as any ordinary website.
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })(),
  );
});
