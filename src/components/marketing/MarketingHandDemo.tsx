'use client';

import { useState } from 'react';
import PlayingCard from '@/components/leastcount/PlayingCard';
import { HAND_POOL, HAND_POOL_WILD_RANK } from '@/lib/marketing/content';

export default function MarketingHandDemo() {
  const [picked, setPicked] = useState<number[]>([0, 2, 3]);

  const total = picked.reduce((sum, i) => sum + HAND_POOL[i].value, 0);
  const verdict =
    picked.length === 0
      ? { text: 'Empty hand. Tap a few cards to see how they add up.', color: 'var(--ink-muted)' }
      : total <= 10
        ? { text: 'Under the limit — you could call this turn.', color: 'var(--accent)' }
        : { text: 'Too high to call. Dump the big cards first.', color: 'var(--wild)' };

  const toggle = (i: number) =>
    setPicked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className="border-b border-hairline">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-3.5 px-6 py-19">
        <div className="mono-label text-[11px] text-accent">Try the maths</div>
        <div className="max-w-[720px] text-balance text-center font-display text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
          Tap cards to build a hand. Can you call?
        </div>
        <div className="max-w-[560px] text-pretty text-center text-[17px] leading-relaxed text-ink-soft">
          Aces are 1, faces are 10, and every card of the round&apos;s wild rank is worth nothing.
          You may only call at 10 or less.
        </div>

        <div className="flex flex-wrap justify-center gap-3 py-6">
          {HAND_POOL.map((c, i) => (
            <PlayingCard
              key={i}
              card={{ id: `pool-${i}`, suit: c.suit, rank: c.rank }}
              jokerRank={c.wild ? c.rank : undefined}
              size="lg"
              selected={picked.includes(i)}
              onClick={() => toggle(i)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4.5 rounded-[22px] border border-hairline bg-surface-sunken px-7 py-5.5">
          <div className="flex flex-col gap-1">
            <div className="mono-label text-[10px] text-ink-muted">Hand total</div>
            <div className="font-display text-[34px] font-bold leading-none">{total}</div>
          </div>
          <div className="h-10 w-px bg-hairline" />
          <div className="max-w-[320px] text-[16px] font-semibold leading-relaxed" style={{ color: verdict.color }}>
            {verdict.text}
          </div>
        </div>
        <div className="mono-label pt-1.5 text-[10px] text-ink-faint">
          Wild rank this round · {HAND_POOL_WILD_RANK}
        </div>
      </div>
    </div>
  );
}
