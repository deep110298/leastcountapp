'use client';

import { useOffline } from 'next/offline';

export default function OfflineBanner() {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div
      role="status"
      className="mono-label pointer-events-none fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] flex justify-center"
    >
      <span className="rounded-full border border-hairline-strong bg-surface px-3.5 py-1.5 text-[10px] text-ink-soft shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        Offline · playing on this device
      </span>
    </div>
  );
}
