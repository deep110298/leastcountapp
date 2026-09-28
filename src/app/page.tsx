'use client';

import GameLauncher from '@/components/leastcount/GameLauncher';
import MarketingHome from '@/components/marketing/MarketingHome';
import { useIsNativePlatform } from '@/lib/useIsNativePlatform';

// The published iOS app loads this exact URL (leastcountapp.com) as its
// entire UI — see capacitor.config.ts's server.url. So this route has to
// serve two different things from the same path: the game launcher inside
// the native app shell, and a marketing page for everyone else on the web.
//
// The boot veil (see layout.tsx) used to get cleared from here, but that
// only ever ran on this one page — see NativeBootVeilClear, now mounted in
// the root layout instead, for why every other page needs it too.
export default function Home() {
  const isNative = useIsNativePlatform();

  return isNative ? <GameLauncher /> : <MarketingHome />;
}
