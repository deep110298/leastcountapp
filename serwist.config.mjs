import { serwist } from '@serwist/next/config';

// Turbopack-compatible "configurator mode" build — the default `withSerwist`
// webpack plugin (@serwist/next's main export) doesn't support Turbopack,
// which this project builds with. `serwist build serwist.config.mjs` runs
// as a postbuild step: it bundles src/sw.ts with esbuild and injects a
// precache manifest of everything `next build` just emitted, including the
// 525 statically-prerendered Story Mode routes (see generateStaticParams in
// their page.tsx files) so the whole mode is available offline, not just
// levels the player happened to visit online first.
export default await serwist.withNextConfig(() => ({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
}));
