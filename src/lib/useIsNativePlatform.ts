'use client';

import { useSyncExternalStore } from 'react';
import { Capacitor } from '@capacitor/core';

// Whether we're inside the native Capacitor app shell is a browser-only fact
// with no server-side equivalent and never changes after load, which is
// exactly what useSyncExternalStore is for: it reports `false` for SSR and
// the initial client render, then the real value once mounted.
const subscribe = () => () => {};
const getSnapshot = () => Capacitor.isNativePlatform();
const getServerSnapshot = () => false;

export function useIsNativePlatform(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
