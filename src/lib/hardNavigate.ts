// A full top-level navigation instead of Next's client-side router.push.
// router.push() fetches the destination's RSC payload over the network —
// per Next's own offline-support guide, that retry-when-offline mechanism
// only covers routes a <Link> already prefetched into the router cache
// this session, so a programmatic push from a modal button (no <Link>
// involved) can silently do nothing while offline. A full navigation is
// a plain document request that the service worker's precache (src/sw.ts)
// serves directly, independent of the router's own prefetch state.
export function hardNavigate(path: string) {
  window.location.href = path;
}
