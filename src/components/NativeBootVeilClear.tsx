'use client';

import { useLayoutEffect } from 'react';
import { useIsNativePlatform } from '@/lib/useIsNativePlatform';

// Clears the pre-paint boot veil (see layout.tsx's inline script and
// globals.css's html[data-native-boot='1'] rules) once we can confirm we're
// actually in the native shell. Mounted in the root layout, not just the
// home page: every plain <a href> tap is a full top-level navigation (see
// GameLauncher's "Play now" comment), which reruns that inline script and
// re-sets the attribute on the freshly loaded document each time — only the
// root layout is guaranteed to mount on every one of those loads, so this
// used to live in page.tsx's own effect and only ever ran once, on "/",
// leaving every other page permanently hidden behind the veil after the
// first tap away from home.
export default function NativeBootVeilClear() {
  const isNative = useIsNativePlatform();

  useLayoutEffect(() => {
    if (isNative) {
      document.documentElement.removeAttribute('data-native-boot');
    }
  }, [isNative]);

  return null;
}
