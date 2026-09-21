const STATS = [
  { value: '25', label: 'Story worlds' },
  { value: '500', label: 'Levels, each tighter' },
  { value: '6', label: 'Players per room' },
  { value: '1', label: 'Daily deal for everyone' },
] as const;

export default function MarketingStats() {
  return (
    <div className="border-b border-hairline bg-surface-sunken">
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 px-6 py-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5">
            <div className="font-display text-[30px] font-bold leading-none tracking-[-0.02em] text-ink">
              {s.value}
            </div>
            <div className="mono-label text-[11px] text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
