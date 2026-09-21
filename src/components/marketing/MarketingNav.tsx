import Link from 'next/link';
import { APP_STORE_URL } from '@/lib/marketing/content';

export default function MarketingNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-hairline bg-canvas/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1160px] items-center gap-6 px-6 py-3.5">
        <Link href="#top" className="flex items-center gap-2.5 text-ink">
          <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-accent">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M12 3.2s-6.6 6.8-6.6 10.6a3.6 3.6 0 0 0 6.4 2.2c-0.4 1.9-1.5 3.3-3.1 4.2h6.6c-1.6-0.9-2.7-2.3-3.1-4.2a3.6 3.6 0 0 0 6.4-2.2c0-3.8-6.6-10.6-6.6-10.6z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="font-display text-[17px] font-bold tracking-tight">Least Count</div>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-5">
          <a href="#modes" className="hidden text-sm font-semibold text-ink-soft sm:inline">
            Modes
          </a>
          <a href="#rules" className="hidden text-sm font-semibold text-ink-soft sm:inline">
            How to play
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-accent px-[18px] py-2.5 text-sm font-bold text-white shadow-[0_3px_0_var(--accent-shadow)]"
          >
            Get the app
          </a>
        </div>
      </div>
    </div>
  );
}
