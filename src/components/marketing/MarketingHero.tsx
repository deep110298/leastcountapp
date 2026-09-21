import type { CSSProperties } from 'react';
import PlayingCard, { CardBack } from '@/components/leastcount/PlayingCard';
import AppleBadgeButton from './AppleBadgeButton';

const FAN_CARDS = [
  { key: 'back', tilt: '-13deg', lift: '12px', floatDelay: '0s' },
  { key: 'ace', tilt: '0deg', lift: '-10px', floatDelay: '0.3s' },
  { key: 'king', tilt: '13deg', lift: '12px', floatDelay: '0.6s' },
] as const;

export default function MarketingHero() {
  return (
    <div id="top" className="relative overflow-hidden border-b border-hairline">
      <div className="pointer-events-none absolute -left-[450px] -top-[180px] left-1/2 h-[640px] w-[900px] bg-[radial-gradient(ellipse_at_50%_50%,rgba(10,111,120,0.10),transparent_68%)]" />
      <div className="relative mx-auto flex max-w-[1160px] flex-wrap items-center gap-14 px-6 py-18 pb-20">
        <div className="flex min-w-0 flex-1 basis-[380px] flex-col gap-5">
          <h1 className="text-balance font-display text-[clamp(40px,5.4vw,66px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink">
            Keep your hand low.
            <br />
            Call it first.
          </h1>
          <p className="max-w-[520px] text-pretty text-[clamp(16px,1.5vw,19px)] leading-relaxed text-ink-soft">
            The classic Indian card game, built for your phone. Play a rival computer, run the
            25-world story, take the same daily deal as everyone else, or open a room for up to
            six friends.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <AppleBadgeButton variant="dark" />
          </div>
          <div className="mono-label text-[11px] text-ink-muted">Free to play · iOS 15+</div>
        </div>

        <div className="flex min-w-0 flex-[0_1_420px] items-center justify-center py-3">
          <div className="flex scale-[1.9] items-center">
            {FAN_CARDS.map((c) => (
              <div
                key={c.key}
                className="hero-card-inner"
                style={
                  {
                    transform: `rotate(${c.tilt}) translateY(${c.lift})`,
                    marginRight: c.key !== 'king' ? '-30px' : undefined,
                    zIndex: c.key === 'ace' ? 2 : undefined,
                    '--float-delay': c.floatDelay,
                  } as CSSProperties
                }
              >
                {c.key === 'back' && <CardBack size="lg" />}
                {c.key === 'ace' && <PlayingCard card={{ id: 'hero-ace', suit: 'spades', rank: 'A' }} size="lg" />}
                {c.key === 'king' && (
                  <PlayingCard card={{ id: 'hero-king', suit: 'hearts', rank: 'K' }} size="lg" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
