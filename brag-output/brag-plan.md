# Brag Plan: Least Count

## What is this app?
Least Count is a card game (browser + native iOS/Android via Capacitor) where you keep your hand's total value low, call it when you think you're the lowest, and race to beat a target score — solo against a computer AI, live with friends in shared rooms, in a daily challenge with streaks, or across a 25-world, 500-level story mode.

## The angle
A simple, physical-feeling card game (real deck rules, tactile card UI, satisfying "call" moment) hides a surprisingly deep single-player campaign. The joke/hook is the gap between "it's just cards" and "500 levels." Play the actual round — deal, play, draw, call — then land the punchline on the scale of the thing.

## Hook (first 2-3 seconds)
A dry, observational line that sets up the game's core tension before any UI appears:
"Everyone at the table thinks their hand is the lowest."
(beat)
"You're all about to find out."

## Key moments (the middle)
- A real round in motion: hand deals in, a card gets selected and played, a card is drawn/taken from the discard pile, the hand-value number visibly ticks down.
- The wild card beat: this round's rank flashes as worth 0 points — a rules quirk that reads as a fun "gotcha" visual (pink badge, big rank in a circle).
- The payoff: the call lands ("Least Count!"), then the round-end reveal shows both hands side by side with "Good call." and the score tally.

## Outro / punchline
"25 worlds. 500 levels. Still just a card game."
Then wordmark: LEAST COUNT — tagline — leastcountapp.com

## User flow worth showing
Entry → key action → result, pulled straight from `GameBoard.tsx`:
1. Hand deals in (cards fan out with a spring/float motion).
2. Player selects a card, taps **Play**; taps the deck or the face-up discard card to draw.
3. Hand value (shown live as "N pts") drops as cards are shed; once at/under threshold, player taps **Least Count** to call.
4. Round-End modal reveals both hands and points awarded, with "Good call." confirming the caller had the lowest hand.

## Tone
- Preset: default
- Creative direction: playful and self-aware about the game's absurd scale (500 levels for a card game), never mean, never corporate.
- Interpretation: mixed-case type, comfortable weight, crossfades/clean wipes between scenes, 4-5 scenes at 3-5s each. Humor comes from the product's own scale claim, not from mockery.

## Format: vertical — 1080x1920
Chosen over the landscape default because Least Count is a mobile-first app (Tailwind mobile layouts, wrapped natively via Capacitor for iOS/Android) — a vertical frame shows real screens edge-to-edge instead of letterboxing them, and matches where this kind of clip actually gets shared (Stories/Reels/TikTok/Shorts, App Store preview).

## Duration: ~19-20 seconds

## Visual identity (from the project)
- Background: `#ffffff` (canvas; warm cream `#fdfbf7` for card surfaces)
- Accent: `#0a6f78` (teal — primary buttons, hand value, deck)
- Secondary accents: `#c2367f` (wild/pink — zero-value cards, wild-card reveal), `#dd7322` (ember/orange — daily streak)
- Text: `#16141a` (ink)
- Display font: Outfit (bold/extrabold, tight tracking — headline weight)
- Body/label font: IBM Plex Mono (uppercase, letter-spaced — used for all small labels: "Deck", "Your hand", streak badges)
- Strongest visual element: the home screen's fanned hero cards (A♠, K♥, 7♣) dealing in with a soft float loop, teal glow blurred behind them — plus the "pressed button" treatment (flat color, hard offset shadow, button drops on tap) used throughout

## Share copy (draft)
Built a card game with a 500-level story mode... for a 2-player card game. Least Count — play the computer, play your friends, or just try not to lose the daily streak. leastcountapp.com 🃏

## Audio direction
- Role: warm, upbeat bed with light motion-matched SFX
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` (full track, most energetic — best match for `default` tone per the bundled track guide)
- Music treatment: start at low-mid volume (~0.32) under the hook line, hold steady through the flow, slight presence lift into the outro, fade out over the last ~0.5s
- Music cue guidance: preset read from `assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.md` — 120.19 BPM, strong-cue cluster at 16.0-23.5s (all intensity ~1.00). Our ~19.5s runtime lands the Scene 4 payoff and Scene 5 outro inside that cluster — target the "Good call." reveal near the ~16.0s or 17.0s strong cue, and the outro wordmark slam near the ~18.5-20.0s cues (nudge scene boundaries ±0.15s toward these, don't force it if it costs readability).
- Audio-reactive treatment: subtle — let the teal hero glow / card-table glow breathe slightly with music RMS; no waveform/equalizer visuals.
- SFX posture: moderate, 3-5 cues total (matches `default` tone energy) — motion-matched to card actions, not decorative.
- Audio-coupled moments: hero cards fanning in one-by-one (Scene 2), card played + card drawn (Scene 3), hand-value tick-down (Scene 3), wild-card reveal thump and "Good call." reveal (Scene 4), outro wordmark slam (Scene 5).
- Restraint rule: no more than one SFX per beat; never stack SFX on the same frame as a text entrance if it competes with the music hit already landing there.

## Storyboard

### Scene 1 — Hook — 2.5s
Plain canvas background, centered display type, two-line reveal: "Everyone at the table thinks their hand is the lowest." settles, then "You're all about to find out." replaces it.
Sequential/interaction: none
Audio intent: quiet anticipation under the music intro, no SFX — let the line breathe
Audio-coupled idea: none
Music: bed fades in under the line, low volume
Transition mood: clean → Scene 2

### Scene 2 — Reveal (Home) — 3.5s
Real home-screen recreation: the three hero cards (A♠, K♥, 7♣) deal in one by one with the float/tilt motion from the actual UI, "LEAST COUNT" headline slams up beneath them, tagline fades in ("Keep your hand low, call when you think you're lowest, and beat the table"), teal radial glow behind the cards.
Sequential/interaction: yes — the 3 hero cards fan in one by one, each with a card sound
Audio intent: the reveal's "there it is" moment — bright, confident
Audio-coupled idea: `casino/card-fan-*` or `casino/card-place-*` on each of the 3 cards landing, accenting the first and last
Transition mood: clean crossfade → Scene 3

### Scene 3 — The round in motion — 5s
Recreate the actual GameBoard: player's hand deals in (spring motion, cards fanning), cursor/finger taps a card to select it (lifts with teal glow ring), taps **Play**, then taps the deck to draw — a fresh card flies to hand. The "N pts" hand-value label visibly ticks down as cards are shed.
Sequential/interaction: yes — hand cards deal in one by one; simulate a tap-to-select then tap-to-play interaction; simulate a tap-to-draw
Audio intent: light, mechanical, satisfying — the feeling of playing a real hand of cards
Audio-coupled idea: `casino/card-slide-*` on the deal, `interface/click_*`/`ui/mouseclick1` on the simulated tap-to-select and tap-to-play, `casino/card-place-*` when the played card lands, a soft tick on the hand-value number dropping
Transition mood: hard cut into the call → Scene 4

### Scene 4 — The call & payoff — 5s
Quick beat: the pink "Wild card" badge flashes ("Every K is worth 0 points this round"). Cut to the player tapping **Least Count** — the "X calls Least Count!" pop-in appears, then the Round-End modal reveals both hands side by side with "Good call." and the score tally ticking up.
Sequential/interaction: yes — wild-card badge appears, then both hand summaries reveal in sequence (player's, then computer's)
Audio intent: a quick surprise beat (wild card), then a clear win payoff
Audio-coupled idea: `interface/bong_001` or `impact/impactSoft_medium_*` on the wild-card flash; `interface/click_*` on the Least Count tap; `impact/impactBell_heavy_000` on "Good call." landing
Transition mood: soft crossfade → Scene 5

### Scene 5 — Outro — 4s
"25 worlds. 500 levels. Still just a card game." settles, then wipes to the LEAST COUNT wordmark, tagline, and leastcountapp.com.
Sequential/interaction: none
Audio intent: confident landing, let the music/logo hit carry it
Audio-coupled idea: `impact/impactBell_heavy_000` or `_004` on the wordmark slam
Music: bed holds through the line, fades out over the last ~0.5s
Transition mood: clean → end

**Music mood for this video:** upbeat, clean, playful
**Audio summary:** A bright, mid-energy bed carries the whole video; light card/UI SFX mark each real interaction (deal, select, play, draw, call), with one dry bell-style hit each on the wild-card beat, the "Good call." payoff, and the closing wordmark — 3-5 cues total, nothing stacked or decorative.
