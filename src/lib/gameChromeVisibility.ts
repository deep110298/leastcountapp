'use client';

import { useSyncExternalStore } from 'react';

// Lets a screen that renders its own inline chrome (a theme toggle positioned
// to fit its own header, action buttons anchored to the bottom) tell the
// global fixed-position chrome — the corner theme toggle, the offline
// banner — to step aside instead of overlapping it. A plain external store
// rather than context — this is a single flag with exactly two writers (a
// game board mounting/unmounting), not something that needs a provider tree.
let hidden = false;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function hideGlobalGameChrome() {
  hidden = true;
  emitChange();
}

export function showGlobalGameChrome() {
  hidden = false;
  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return hidden;
}

function getServerSnapshot() {
  return false;
}

export function useGlobalGameChromeHidden() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
