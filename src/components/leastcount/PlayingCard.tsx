import type { PlayingCard as PlayingCardData, Rank } from '@/lib/leastCount/types';

const SUIT_SYMBOL: Record<PlayingCardData['suit'], string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

const RED_SUITS = new Set(['hearts', 'diamonds']);

interface PlayingCardProps {
  card: PlayingCardData;
  jokerRank?: Rank;
  selected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const SIZE_CLASSES: Record<NonNullable<PlayingCardProps['size']>, string> = {
  sm: 'w-10 h-14 text-sm',
  md: 'w-14 h-20 text-lg',
  lg: 'w-16 h-24 text-xl',
};

const CARD_SHADOW: Record<NonNullable<PlayingCardProps['size']>, string> = {
  sm: 'shadow-[0_3px_0_rgba(20,16,24,0.13)]',
  md: 'shadow-[0_4px_0_rgba(20,16,24,0.13)]',
  lg: 'shadow-[0_6px_0_rgba(20,16,24,0.13)]',
};

const SELECTED_SHADOW = 'shadow-[0_0_0_4px_rgba(10,111,120,0.25),0_8px_0_rgba(20,16,24,0.13)]';

export default function PlayingCard({
  card,
  jokerRank,
  selected,
  disabled,
  size = 'md',
  onClick,
}: PlayingCardProps) {
  const isPhysicalJoker = card.rank === 'JOKER';
  const isRed = !isPhysicalJoker && RED_SUITS.has(card.suit);
  const isWildRank = card.rank === jokerRank;
  const isZeroValue = isPhysicalJoker || isWildRank;
  const isRaised = selected || isZeroValue;

  const borderClasses = selected
    ? `-translate-y-3.5 border-2 border-accent ${SELECTED_SHADOW}`
    : isZeroValue
      ? `border-2 border-wild ${CARD_SHADOW[size]}`
      : disabled
        ? `border border-card-back-border ${CARD_SHADOW[size]}`
        : `border border-hairline-card ${CARD_SHADOW[size]}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick || disabled}
      className={`relative flex flex-shrink-0 flex-col items-center justify-center rounded-lg font-mono font-bold transition-transform ${SIZE_CLASSES[size]} ${
        disabled && !isRaised ? 'bg-card-back-a' : isRaised ? 'bg-card-paper-warm' : 'bg-card-paper'
      } ${isRed ? 'text-card-red' : isPhysicalJoker ? 'text-wild' : 'text-card-ink'} ${borderClasses} ${
        onClick && !disabled ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
      aria-pressed={selected}
      aria-label={isPhysicalJoker ? 'Joker' : `${card.rank} of ${card.suit}`}
    >
      {isPhysicalJoker ? (
        <span className="text-xs leading-tight">JOKER</span>
      ) : (
        <>
          <span className="leading-none">{card.rank}</span>
          <span className="leading-none">{SUIT_SYMBOL[card.suit]}</span>
        </>
      )}
      {isZeroValue && (
        <span className="absolute -top-2 -right-2 rounded-full bg-wild px-1 text-[9px] font-bold leading-tight text-white">
          0
        </span>
      )}
    </button>
  );
}

const BACK_BADGE_SIZE: Record<NonNullable<PlayingCardProps['size']>, string> = {
  sm: 'h-6 w-6',
  md: 'h-8.5 w-8.5',
  lg: 'h-10 w-10',
};

const BACK_LOGO_SIZE: Record<NonNullable<PlayingCardProps['size']>, string> = {
  sm: 'h-3 w-3',
  md: 'h-4.5 w-4.5',
  lg: 'h-5.5 w-5.5',
};

const BACK_SUIT_SIZE: Record<NonNullable<PlayingCardProps['size']>, string> = {
  sm: 'text-[5px] gap-0.5',
  md: 'text-[7px] gap-1',
  lg: 'text-[8px] gap-1',
};

// A woven diamond crosshatch over the accent color, echoing a real playing
// card's back pattern rather than a flat fill.
const CROSSHATCH_STYLE = {
  backgroundColor: 'var(--accent)',
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1.5px, transparent 1.5px, transparent 9px), ' +
    'repeating-linear-gradient(-45deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1.5px, transparent 1.5px, transparent 9px)',
};

export function CardBack({ size = 'md' }: { size?: PlayingCardProps['size'] }) {
  return (
    <div
      className={`relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-accent-shadow/40 ${CARD_SHADOW[size ?? 'md']} ${SIZE_CLASSES[size ?? 'md']}`}
      style={CROSSHATCH_STYLE}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-full bg-white shadow-[0_1.5px_0_rgba(0,0,0,0.12)] ${BACK_BADGE_SIZE[size ?? 'md']}`}
      >
        <svg viewBox="0 0 24 24" fill="none" className={BACK_LOGO_SIZE[size ?? 'md']} aria-hidden="true">
          <path
            d="M12 3.2s-6.6 6.8-6.6 10.6a3.6 3.6 0 0 0 6.4 2.2c-0.4 1.9-1.5 3.3-3.1 4.2h6.6c-1.6-0.9-2.7-2.3-3.1-4.2a3.6 3.6 0 0 0 6.4-2.2c0-3.8-6.6-10.6-6.6-10.6z"
            fill="var(--accent)"
          />
        </svg>
        <span className={`flex items-center leading-none text-wild ${BACK_SUIT_SIZE[size ?? 'md']}`}>
          <span>♣</span>
          <span>♥</span>
        </span>
      </div>
    </div>
  );
}
