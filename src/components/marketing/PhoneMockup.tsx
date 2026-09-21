import PlayingCard, { CardBack } from '@/components/leastcount/PlayingCard';
import type { MarketingMode } from '@/lib/marketing/content';

const STORY_LEVELS = [
  { n: 1, state: 'done' }, { n: 2, state: 'done' }, { n: 3, state: 'done' }, { n: 4, state: 'done' },
  { n: 5, state: 'done' }, { n: 6, state: 'done' }, { n: 7, state: 'done' }, { n: 8, state: 'current' },
  { n: 9, state: 'locked' }, { n: 10, state: 'locked' }, { n: 11, state: 'locked' }, { n: 12, state: 'locked' },
  { n: 13, state: 'locked' }, { n: 14, state: 'locked' }, { n: 15, state: 'locked' },
] as const;

const ROOM_PLAYERS = [
  { initial: 'D', name: 'Deep', tag: 'you', role: 'Host', color: 'var(--accent)' },
  { initial: 'A', name: 'Ananya', tag: null, role: 'online', color: 'var(--wild)' },
  { initial: 'R', name: 'Rohit', tag: null, role: 'online', color: '#ece8e3' },
  { initial: 'M', name: 'Meera', tag: null, role: 'joining…', color: '#ece8e3' },
] as const;

function ScoreRow() {
  return (
    <div className="rounded-[18px] border border-hairline bg-surface-sunken px-4 py-3 flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <div className="mono-label flex items-center gap-1.5 text-[10px] text-ink-muted">
          You<span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
        <div className="font-display text-[26px] font-bold leading-none">62</div>
      </div>
      <div className="mono-label text-center text-[10px] leading-[1.7] text-ink-muted">
        Round 4
        <br />
        <span className="text-ink-soft">Target 100</span>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <div className="mono-label text-[10px] text-ink-muted">Rival</div>
        <div className="font-display text-[26px] font-bold leading-none">71</div>
      </div>
    </div>
  );
}

function VsComputerScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4.5 pt-1">
        <ScoreRow />
      </div>
      <div className="flex justify-center pt-3">
        <div className="mono-label rounded-full border border-wild/30 bg-wild/10 px-3.5 py-1.5 text-[10px] text-wild">
          Wild card · Q
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center gap-7">
        <div className="flex flex-col items-center gap-2">
          <CardBack size="md" />
          <div className="mono-label text-[10px] text-ink-muted">Deck · 24</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <PlayingCard card={{ id: 'mock-discard', suit: 'diamonds', rank: '9' }} size="md" />
          <div className="mono-label text-[10px] text-ink-muted">Discard</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2.5 px-4.5 pb-4">
        <div className="mono-label flex items-center gap-2.5 text-[10px] text-ink-muted">
          Your hand<span className="text-accent">14 pts</span>
        </div>
        <div className="flex items-end gap-1.5">
          <PlayingCard card={{ id: 'mock-h1', suit: 'spades', rank: '3' }} size="sm" />
          <PlayingCard card={{ id: 'mock-h2', suit: 'hearts', rank: '4' }} size="sm" />
          <PlayingCard card={{ id: 'mock-h3', suit: 'clubs', rank: '9' }} size="sm" selected />
          <PlayingCard card={{ id: 'mock-h4', suit: 'spades', rank: 'Q' }} jokerRank="Q" size="sm" />
        </div>
      </div>
      <div className="flex gap-2.5 px-4.5 pb-3.5">
        <div className="flex-1 rounded-[15px] border-2 border-accent py-3 text-center text-[15px] font-bold text-accent">
          Play card
        </div>
        <div className="flex-1 rounded-[15px] bg-accent py-3 text-center text-[15px] font-bold text-white shadow-[0_4px_0_var(--accent-shadow)]">
          Call!
        </div>
      </div>
    </div>
  );
}

function DailyScreen() {
  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-4 pt-2">
      <div className="mono-label flex items-center justify-between text-[11px] text-ink-muted">
        <span>← Home</span>
        <span>Rules</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="mono-label text-[11px] text-accent">Day 375</div>
        <div className="font-display text-[28px] font-extrabold tracking-[-0.02em] leading-[1.1]">
          Daily challenge
        </div>
        <div className="text-[14px] leading-relaxed text-ink-soft">
          Everyone gets the same round-one deal. How you play it is up to you.
        </div>
      </div>
      <div className="flex flex-col gap-3.5 rounded-[20px] border border-hairline bg-surface-sunken p-4.5">
        <div className="flex items-center justify-between">
          <div className="mono-label text-[10px] text-ink-muted">Today&apos;s deal</div>
          <div className="mono-label text-[10px] text-wild">Wild · 7</div>
        </div>
        <div className="flex justify-center gap-1.5">
          <PlayingCard card={{ id: 'mock-d1', suit: 'spades', rank: '6' }} size="sm" />
          <PlayingCard card={{ id: 'mock-d2', suit: 'hearts', rank: '7' }} jokerRank="7" size="sm" />
          <PlayingCard card={{ id: 'mock-d3', suit: 'clubs', rank: 'K' }} size="sm" />
          <PlayingCard card={{ id: 'mock-d4', suit: 'diamonds', rank: '2' }} size="sm" />
          <PlayingCard card={{ id: 'mock-d5', suit: 'spades', rank: 'A' }} size="sm" />
        </div>
      </div>
      <div className="flex gap-2.5">
        <div className="flex-1 rounded-2xl border border-hairline bg-surface-sunken p-3.5">
          <div className="font-display text-[22px] font-bold leading-none">12</div>
          <div className="mono-label pt-1 text-[10px] text-ink-muted">Day streak</div>
        </div>
        <div className="flex-1 rounded-2xl border border-hairline bg-surface-sunken p-3.5">
          <div className="font-display text-[22px] font-bold leading-none">31</div>
          <div className="mono-label pt-1 text-[10px] text-ink-muted">Best streak</div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="rounded-[17px] bg-accent py-4 text-center text-[17px] font-bold text-white shadow-[0_5px_0_var(--accent-shadow)]">
        Play Day 375
      </div>
    </div>
  );
}

function StoryScreen() {
  return (
    <div className="flex h-full flex-col gap-3.5 px-5 pb-4 pt-2">
      <div className="mono-label flex items-center justify-between text-[11px] text-ink-muted">
        <span>← Worlds</span>
        <span>8 / 20</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="mono-label text-[11px] text-accent">World 6</div>
        <div className="font-display text-[28px] font-extrabold tracking-[-0.02em] leading-[1.1]">Wildcard</div>
        <div className="text-[14px] leading-relaxed text-ink-soft">
          Twenty levels. The target score tightens as you go, and the computer stops making
          mistakes.
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {STORY_LEVELS.map((lvl) => (
          <div
            key={lvl.n}
            className="flex aspect-square items-center justify-center rounded-[13px] font-display text-[15px] font-bold"
            style={{
              background: lvl.state === 'done' ? 'var(--accent)' : lvl.state === 'current' ? 'var(--surface)' : 'var(--surface-sunken-alt)',
              color: lvl.state === 'done' ? '#fff' : lvl.state === 'current' ? 'var(--accent)' : 'var(--ink-faint)',
              border: lvl.state === 'current' ? '2px solid var(--accent)' : undefined,
              boxShadow: lvl.state === 'current' ? '0 0 0 4px rgba(10,111,120,.14)' : undefined,
            }}
          >
            {lvl.n}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-hairline bg-surface-sunken px-4 py-3.5">
        <div className="mono-label text-[10px] text-ink-muted">Level 8 target</div>
        <div className="font-display text-[17px] font-bold">73</div>
      </div>
      <div className="flex-1" />
      <div className="rounded-[17px] bg-accent py-4 text-center text-[17px] font-bold text-white shadow-[0_5px_0_var(--accent-shadow)]">
        Play level 8
      </div>
    </div>
  );
}

function FriendsScreen() {
  return (
    <div className="flex h-full flex-col gap-3.5 px-5 pb-4 pt-2">
      <div className="mono-label text-[11px] text-ink-muted">← Leave room</div>
      <div className="flex flex-col items-center gap-1.5 rounded-[20px] border border-hairline bg-surface-sunken p-4">
        <div className="mono-label text-[10px] text-ink-muted">Room code</div>
        <div className="font-mono text-[38px] font-bold leading-none tracking-[.14em] text-accent">
          K4P9
        </div>
        <div className="flex w-full gap-2.5 pt-1.5">
          <div className="flex-1 rounded-[13px] border-2 border-hairline-strong py-2.5 text-center text-[13px] font-semibold">
            Copy code
          </div>
          <div className="flex-1 rounded-[13px] border-2 border-hairline-strong py-2.5 text-center text-[13px] font-semibold">
            Share link
          </div>
        </div>
      </div>
      <div className="mono-label flex items-center justify-between text-[10px] text-ink-muted">
        <span>Seated</span>
        <span>4 / 6</span>
      </div>
      <div className="flex flex-col gap-2">
        {ROOM_PLAYERS.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2.5 rounded-[15px] border border-hairline bg-surface-sunken px-3.5 py-2.5"
          >
            <div
              className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[10px] text-[13px] font-bold text-white"
              style={{ background: p.color, color: p.color === '#ece8e3' ? 'var(--ink)' : '#fff' }}
            >
              {p.initial}
            </div>
            <div className="flex-1 text-sm font-semibold">
              {p.name} {p.tag && <span className="font-normal text-ink-muted">({p.tag})</span>}
            </div>
            {p.role === 'Host' && <div className="mono-label text-[10px] text-accent">Host</div>}
            {p.role === 'online' && <div className="h-2 w-2 rounded-full bg-accent" />}
            {p.role === 'joining…' && <div className="mono-label text-[10px] text-ink-muted">joining…</div>}
          </div>
        ))}
        <div className="mono-label rounded-[15px] border-2 border-dashed border-hairline p-2.5 text-center text-[10px] text-ink-faint">
          2 seats open
        </div>
      </div>
      <div className="flex-1" />
      <div className="rounded-[17px] bg-accent py-4 text-center text-[17px] font-bold text-white shadow-[0_5px_0_var(--accent-shadow)]">
        Deal first round
      </div>
    </div>
  );
}

export default function PhoneMockup({ modeId }: { modeId: MarketingMode['id'] }) {
  return (
    <div className="rounded-[46px] bg-[#151318] p-2.5 shadow-[0_26px_60px_rgba(20,16,24,0.16)]">
      <div className="flex h-[706px] w-[330px] flex-col overflow-hidden rounded-[36px] bg-white">
        <div className="mono-label flex h-10 flex-none items-center justify-between px-6 text-xs text-[#16141a]">
          <span>9:41</span>
          <span className="tracking-[2px]">▮▮▮ ⌁</span>
        </div>
        <div className="min-h-0 flex-1 text-[#16141a]">
          {modeId === 'computer' && <VsComputerScreen />}
          {modeId === 'daily' && <DailyScreen />}
          {modeId === 'story' && <StoryScreen />}
          {modeId === 'friends' && <FriendsScreen />}
        </div>
        <div className="flex h-[22px] flex-none items-start justify-center">
          <div className="h-[5px] w-[120px] rounded-[3px] bg-[#d8d4cf]" />
        </div>
      </div>
    </div>
  );
}
