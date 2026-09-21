'use client';

import { useSyncExternalStore } from 'react';
import { Capacitor } from '@capacitor/core';
import GameLauncher from '@/components/leastcount/GameLauncher';
import MarketingHome from '@/components/marketing/MarketingHome';

// The published iOS app loads this exact URL (leastcountapp.com) as its
// entire UI — see capacitor.config.ts's server.url. So this route has to
// serve two different things from the same path: the game launcher inside
// the native app shell, and a marketing page for everyone else on the web.
// Whether we're inside that native shell is a browser-only fact with no
// server-side equivalent and never changes after load, which is exactly
// what useSyncExternalStore is for: it reports `false` (marketing) for SSR
// and the initial client render, then the real value once mounted, without
// the extra render pass (and lint violation) a setState-in-effect would add.
const subscribe = () => () => {};
const getSnapshot = () => Capacitor.isNativePlatform();
const getServerSnapshot = () => false;

export default function Home() {
  const isNative = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isNative ? <GameLauncher /> : <MarketingHome />;
}
