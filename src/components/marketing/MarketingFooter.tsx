import Link from 'next/link';

export default function MarketingFooter() {
  return (
    <div style={{ background: '#16141a' }}>
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-5 px-6 py-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 flex-none items-center justify-center rounded-[9px] bg-accent">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 3.2s-6.6 6.8-6.6 10.6a3.6 3.6 0 0 0 6.4 2.2c-0.4 1.9-1.5 3.3-3.1 4.2h6.6c-1.6-0.9-2.7-2.3-3.1-4.2a3.6 3.6 0 0 0 6.4-2.2c0-3.8-6.6-10.6-6.6-10.6z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">Least Count</div>
        </div>
        <div className="flex-1" />
        <div className="flex flex-wrap gap-5.5">
          <Link href="/privacy" className="text-[13px] font-medium text-white/72">
            Privacy
          </Link>
          <Link href="/support" className="text-[13px] font-medium text-white/72">
            Support
          </Link>
          <a href="#rules" className="text-[13px] font-medium text-white/72">
            How to play
          </a>
        </div>
        <div className="font-mono text-xs text-white/45">© 2026 Least Count</div>
      </div>
    </div>
  );
}
