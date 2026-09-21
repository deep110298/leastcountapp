'use client';

import { useState } from 'react';
import { MODES, type MarketingMode } from '@/lib/marketing/content';
import PhoneMockup from './PhoneMockup';

export default function MarketingModes() {
  const [modeId, setModeId] = useState<MarketingMode['id']>('computer');
  const active = MODES.find((m) => m.id === modeId) ?? MODES[0];

  return (
    <div id="modes" className="border-b border-hairline">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-6 py-19">
        <div className="flex max-w-[640px] flex-col gap-2.5">
          <div className="mono-label text-[11px] text-accent">Four ways to play</div>
          <div className="font-display text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
            Pick a mode to see it
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {MODES.map((m) => {
            const on = m.id === modeId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setModeId(m.id)}
                className="cursor-pointer rounded-[14px] border-2 px-5 py-2.5 text-[15px] font-bold transition-colors"
                style={{
                  borderColor: on ? 'var(--accent)' : 'var(--hairline)',
                  background: on ? 'var(--accent)' : 'var(--surface)',
                  color: on ? '#fff' : 'var(--ink-soft)',
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-12">
          <div className="flex flex-none flex-col items-center gap-3.5">
            <PhoneMockup modeId={modeId} />
            <div className="mono-label text-[10px] text-ink-faint">Screens from the app · not playable here</div>
          </div>

          <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-4.5">
            <div className="font-display text-[clamp(26px,2.8vw,34px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
              {active.title}
            </div>
            <div className="text-pretty text-[17px] leading-relaxed text-ink-soft">{active.body}</div>
            <div className="flex flex-col gap-2.5">
              {active.points.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <div className="mt-2 h-[7px] w-[7px] flex-none rounded-full bg-accent" />
                  <div className="text-[15px] leading-relaxed text-ink-soft">{p}</div>
                </div>
              ))}
            </div>
            <a
              href="#download"
              className="mt-1.5 self-start rounded-[15px] bg-accent px-6 py-3.5 text-base font-bold text-white shadow-[0_4px_0_var(--accent-shadow)]"
            >
              Play it on your phone
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
