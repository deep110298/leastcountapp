'use client';

import { useLayoutEffect } from 'react';
import GameLauncher from '@/components/leastcount/GameLauncher';
import MarketingHome from '@/components/marketing/MarketingHome';
import { useIsNativePlatform } from '@/lib/useIsNativePlatform';

// The published iOS app loads this exact URL (leastcountapp.com) as its
// entire UI — see capacitor.config.ts's server.url. So this route has to
// serve two different things from the same path: the game launcher inside
// the native app shell, and a marketing page for everyone else on the web.
export default function Home() {
  const isNative = useIsNativePlatform();

  // Drops the pre-paint veil (see layout.tsx) the instant GameLauncher is
  // the one actually committed to the DOM — a layout effect runs
  // synchronously before the browser's next paint, so this never shows a
  // frame of the marketing page it was hiding.
  useLayoutEffect(() => {
    if (isNative) {
      document.documentElement.removeAttribute('data-native-boot');
    }
  }, [isNative]);

  return isNative ? <GameLauncher /> : <MarketingHome />;
}
