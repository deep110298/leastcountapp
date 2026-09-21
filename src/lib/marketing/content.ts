import type { Rank, Suit } from '@/lib/leastCount/types';

export const APP_STORE_URL = 'https://apps.apple.com/us/app/least-count-app/id6812502853';

export interface MarketingMode {
  id: 'computer' | 'daily' | 'story' | 'friends';
  label: string;
  title: string;
  body: string;
  points: string[];
}

export const MODES: MarketingMode[] = [
  {
    id: 'computer',
    label: 'vs Computer',
    title: 'A rival that actually plays well',
    body: 'Pick a target score and take on a computer that tracks the pile, hoards the wild rank and calls the moment it is safe.',
    points: [
      'Three difficulty presets, plus story-mode strengths beyond hard.',
      'Wrong call costs you 40 points and nothing to your rival.',
      'Pause mid-round and pick the match back up later.',
    ],
  },
  {
    id: 'daily',
    label: 'Daily challenge',
    title: 'Same deal, every player, once a day',
    body: 'One shuffle per calendar day, identical for everyone. The first round is fixed; how you play it is not.',
    points: [
      'Play to 100 against a named rival that changes daily.',
      'Streaks track every day you clear it.',
      'Look back at any past day you missed.',
    ],
  },
  {
    id: 'story',
    label: 'Story mode',
    title: 'Twenty-five worlds, five hundred levels',
    body: 'From Ante to Grand Slam. Each world names its own stakes, and the target score tightens level by level.',
    points: [
      'Targets fall from 150 down to 45 as you climb.',
      'The computer gains strength from world three onward.',
      'Progress is saved per level, so you can dip in for one hand.',
    ],
  },
  {
    id: 'friends',
    label: 'With friends',
    title: 'Six seats, one room code',
    body: 'Share a four-character code and play in real time. Two players use one deck; three or more shuffle two together.',
    points: [
      'Live scores, turn order and quick-chat pings.',
      'Reach the limit and you are out; last player standing wins.',
      'Join straight from a shared link, no account needed.',
    ],
  },
];

export interface MarketingStepCard {
  rank: Rank;
  suit: Suit;
  note: string;
  wild?: boolean;
}

export interface MarketingStep {
  n: number;
  title: string;
  body: string;
  caption: string;
  figure: string;
  cards: MarketingStepCard[];
}

export const STEPS: MarketingStep[] = [
  {
    n: 1,
    title: 'Know what a card is worth',
    body: 'Numbers count as their face value, aces as 1, and J, Q, K as 10 each. A Joker is always 0.',
    caption: 'Card values',
    figure: 'Low cards are the whole game. A hand of 3♠ 4♥ A♣ is worth 8 — already callable.',
    cards: [
      { rank: '3', suit: 'spades', note: '3 pts' },
      { rank: 'A', suit: 'clubs', note: '1 pt' },
      { rank: 'K', suit: 'hearts', note: '10 pts' },
    ],
  },
  {
    n: 2,
    title: 'One rank goes wild',
    body: 'Each round a card is set aside at random. Its rank is worth 0 for everyone, on top of the Joker.',
    caption: 'Wild rank · Q',
    figure: 'Holding two queens the round Q turns wild? That is twenty points wiped off your hand.',
    cards: [
      { rank: 'Q', suit: 'spades', note: '0 pts', wild: true },
      { rank: 'Q', suit: 'diamonds', note: '0 pts', wild: true },
    ],
  },
  {
    n: 3,
    title: 'Play, then draw',
    body: 'Put a card on the pile. Match the top card and your turn ends there. Miss, and you draw a replacement.',
    caption: 'Your turn',
    figure: 'Draw blind from the deck, or take the exact card your play just covered — the choice is the skill.',
    cards: [
      { rank: '9', suit: 'diamonds', note: 'pile' },
      { rank: '9', suit: 'clubs', note: 'match' },
    ],
  },
  {
    n: 4,
    title: 'Dump a set at once',
    body: 'Two or more cards of the same rank leave together, and you still draw only one replacement.',
    caption: 'Playing a set',
    figure: 'Three eights is twenty-four points gone in a single turn for the price of one draw.',
    cards: [
      { rank: '8', suit: 'spades', note: '8' },
      { rank: '8', suit: 'hearts', note: '8' },
      { rank: '8', suit: 'diamonds', note: '8' },
    ],
  },
  {
    n: 5,
    title: 'Call at ten or less',
    body: 'Instead of playing, call. Lowest hand — ties included — scores nothing and everyone else takes their total. Call wrong and you alone take 40.',
    caption: 'The call',
    figure: 'Everything hangs on this read. Call early and you risk 40; wait too long and someone calls over you.',
    cards: [
      { rank: '4', suit: 'spades', note: '4' },
      { rank: '2', suit: 'hearts', note: '2' },
      { rank: 'A', suit: 'diamonds', note: '1' },
    ],
  },
];

export interface MarketingPoolCard {
  rank: Rank;
  suit: Suit;
  value: number;
  wild?: boolean;
}

export const HAND_POOL: MarketingPoolCard[] = [
  { rank: '3', suit: 'spades', value: 3 },
  { rank: '7', suit: 'diamonds', value: 7 },
  { rank: 'A', suit: 'clubs', value: 1 },
  { rank: 'Q', suit: 'spades', value: 0, wild: true },
  { rank: '9', suit: 'hearts', value: 9 },
  { rank: 'K', suit: 'clubs', value: 10 },
];

export const HAND_POOL_WILD_RANK: Rank = 'Q';
