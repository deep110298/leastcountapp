'use client';

import { useState } from 'react';
import PlayingCard from '@/components/leastcount/PlayingCard';
import { STEPS } from '@/lib/marketing/content';

export default function MarketingRules() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div id="rules" className="border-b border-hairline bg-surface-sunken">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-6 py-19">
        <div className="flex max-w-[640px] flex-col gap-2.5">
          <div className="mono-label text-[11px] text-accent">How to play</div>
          <div className="font-display text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
            One turn, five rules
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-10">
          <div className="flex min-w-0 flex-1 basis-[300px] flex-col gap-2.5">
            {STEPS.map((st, i) => {
              const on = i === step;
              return (
                <button
                  key={st.n}
                  type="button"
                  onClick={() => setStep(i)}
                  className="flex cursor-pointer items-start gap-3.5 rounded-[18px] border-2 px-4.5 py-4 text-left transition-colors"
                  style={{
                    background: on ? 'var(--surface)' : 'transparent',
                    borderColor: on ? 'var(--accent)' : 'var(--hairline)',
                  }}
                >
                  <div
                    className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[9px] font-mono text-xs font-bold"
                    style={{
                      background: on ? 'var(--accent)' : '#ece8e3',
                      color: on ? '#fff' : 'var(--ink-muted)',
                    }}
                  >
                    {st.n}
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <div className="text-[17px] font-bold text-ink">{st.title}</div>
                    {on && <div className="text-[15px] leading-relaxed text-ink-soft">{st.body}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex min-w-0 flex-[0_1_420px] flex-col items-center gap-5 rounded-3xl border border-hairline bg-surface p-7">
            <div className="mono-label self-start text-[11px] text-ink-muted">{s.caption}</div>
            <div className="flex min-h-[132px] flex-wrap items-center justify-center gap-2.5 pb-3">
              {s.cards.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <PlayingCard
                    card={{ id: `rule-${step}-${i}`, suit: c.suit, rank: c.rank }}
                    jokerRank={c.wild ? c.rank : undefined}
                    size="md"
                  />
                  <div className="mono-label text-[10px] text-ink-muted">{c.note}</div>
                </div>
              ))}
            </div>
            <div className="text-pretty text-center text-[15px] leading-relaxed text-ink-soft">{s.figure}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
