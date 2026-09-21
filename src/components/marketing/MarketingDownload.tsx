import AppleBadgeButton from './AppleBadgeButton';

export default function MarketingDownload() {
  return (
    <div
      id="download"
      className="bg-accent"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,.055) 0 2px, transparent 2px 11px), ' +
          'repeating-linear-gradient(-45deg, rgba(255,255,255,.055) 0 2px, transparent 2px 11px)',
      }}
    >
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-5.5 px-6 py-21">
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-white">
          <svg viewBox="0 0 24 24" width="42" height="42" aria-hidden="true">
            <path
              d="M12 3.2s-6.6 6.8-6.6 10.6a3.6 3.6 0 0 0 6.4 2.2c-0.4 1.9-1.5 3.3-3.1 4.2h6.6c-1.6-0.9-2.7-2.3-3.1-4.2a3.6 3.6 0 0 0 6.4-2.2c0-3.8-6.6-10.6-6.6-10.6z"
              fill="var(--accent)"
            />
          </svg>
        </div>
        <div className="max-w-[780px] text-balance text-center font-display text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
          The table is waiting.
        </div>
        <div className="max-w-[520px] text-pretty text-center text-lg leading-relaxed text-white/88">
          Least Count plays on the phone, not in the browser. Grab it free and start with today&apos;s
          deal.
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-1.5">
          <AppleBadgeButton variant="light" />
        </div>
      </div>
    </div>
  );
}
