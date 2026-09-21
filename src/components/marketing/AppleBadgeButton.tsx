import { APP_STORE_URL } from '@/lib/marketing/content';

const VARIANTS = {
  dark: { bg: '#16141a', fg: '#ffffff', shadow: '0 4px 0 #000', label: 'rgba(255,255,255,.75)' },
  light: { bg: '#ffffff', fg: '#16141a', shadow: '0 4px 0 rgba(7,81,88,.9)', label: '#6f6a74' },
} as const;

export default function AppleBadgeButton({ variant = 'dark' }: { variant?: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-2xl px-[22px] py-3.5"
      style={{ background: v.bg, color: v.fg, boxShadow: v.shadow }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" className="block">
        <path
          d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.79-3.33.79-.69 0-1.75-.77-2.87-.75-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.87.69 1.19-.02 1.94-1.08 2.66-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.34-3.5zM14.88 5.99c.61-.74 1.02-1.77.91-2.79-.88.04-1.94.59-2.57 1.32-.56.65-1.05 1.7-.92 2.7.98.08 1.98-.5 2.58-1.23z"
          fill={v.fg}
        />
      </svg>
      <div className="flex flex-col gap-px">
        <div className="mono-label text-[10px]" style={{ color: v.label }}>
          Download on the
        </div>
        <div className="font-display text-[17px] font-bold leading-tight">App Store</div>
      </div>
    </a>
  );
}
