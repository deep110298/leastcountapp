# Hyperframes Composition Brief: Least Count

## Objective
Create a short launch-style brag video for Least Count, a card game web/native app.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: vertical — 1080x1920
- Duration: ~19-20 seconds

## Source Material
- Project root: /Users/deepshah/leastcountapp
- Primary files read: `src/app/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/leastcount/GameBoard.tsx`, `SetupScreen.tsx`, `PlayingCard.tsx`, `WildCardRevealModal.tsx`, `CallAnnouncement.tsx`, `RoundEndModal.tsx`, `StoryModeCard.tsx`, `DailyChallengeCard.tsx`, `README.md`
- Product name: Least Count
- Tagline / strongest claim: "Keep your hand low, call when you think you're lowest, and beat the table." / the game has 25 worlds and 500 story-mode levels.
- Key UI or visual moment to recreate: the home screen's fanned hero cards (A♠, K♥, 7♣) dealing in with a float loop; the live game board (hand dealing, select+play, draw, hand value ticking down); the Wild Card reveal ("Every K is worth 0 points this round"); the Round-End reveal ("Good call." with both hands shown).
- Copy that must appear verbatim:
  - "LEAST COUNT"
  - "Keep your hand low, call when you think you're lowest, and beat the table."
  - "Least Count!" (call announcement)
  - "Good call."
  - "leastcountapp.com"

## Creative Direction
- Tone preset: default
- Creative direction: playful and self-aware about the game's absurd scale (a 500-level story mode built on top of a simple 2-player card game); never mean, never corporate.
- Interpretation: mixed-case type, comfortable weight, crossfades/clean wipes between scenes, 5 scenes at roughly 2.5-5s each.
- Angle: A simple, physical-feeling card game (real deck rules, tactile card UI, satisfying "call" moment) hides a surprisingly deep single-player campaign. Play an actual round — deal, play, draw, call — then land the punchline on the scale of the thing.
- Hook: "Everyone at the table thinks their hand is the lowest." / "You're all about to find out."
- Outro / punchline: "25 worlds. 500 levels. Still just a card game." → wordmark LEAST COUNT → tagline → leastcountapp.com
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign — reuse the app's real teal/wild/ember palette and card treatment, not a new look

## Visual Identity
- Background: `#ffffff` canvas (warm cream `#fdfbf7` for card/table surfaces)
- Text: `#16141a` (ink)
- Accent: `#0a6f78` (teal); secondary: `#c2367f` (wild/pink, zero-value cards + wild-card reveal), `#dd7322` (ember/orange, daily streak — optional accent only)
- Display font: Outfit (bold/extrabold, tight tracking) — fall back to a similar geometric sans (e.g. system sans-serif / Inter) if Outfit isn't available in the renderer
- Body font: IBM Plex Mono for small uppercase labels ("DECK", "YOUR HAND") — fall back to a monospace system font if unavailable
- Visual references from the project: fanned/floating playing cards with drop-shadow "pressed" buttons; card face design (rank + suit glyph, red for hearts/diamonds); pink circular "0" badge on wild-value cards; round teal glow blurred behind hero content

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 2.5s — two-line text beat: "Everyone at the table thinks their hand is the lowest." → "You're all about to find out."
2. Reveal (Home) — 3.5s — hero cards (A♠ K♥ 7♣) fan in one by one, "LEAST COUNT" headline slams up, tagline fades in
3. The round in motion — 5s — hand deals in, a card is selected + played, a card is drawn, hand-value number ticks down
4. The call & payoff — 5s — wild-card badge flash ("K = 0 pts this round"), tap "Least Count", call pop-in, Round-End reveal with both hands + "Good call." + score tally
5. Outro — 4s — "25 worlds. 500 levels. Still just a card game." → LEAST COUNT wordmark → tagline → leastcountapp.com

## Audio
- Audio role: warm, upbeat bed with light motion-matched SFX
- Audio arc: bed fades in low under the hook, holds steady through the flow, slight lift into the outro, fades out over the last ~0.5s
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3`
- Music treatment: ~0.32 volume under dialogue/text scenes, fade in over first ~0.5s, fade out over final ~0.5s
- Music cue guidance: bundled preset at `assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.json` (also see the `.md` summary) — 120.19 BPM, strong-cue cluster at 16.0-23.5s (intensity ~1.00). Target the Scene 4 "Good call." payoff near the ~16.0-17.5s cues and the Scene 5 wordmark slam near the ~18.5-20.0s cues; nudge scene boundaries by ±0.15s toward these only if it doesn't cost readability.
- Audio-reactive treatment: subtle — let the teal hero glow / table glow breathe slightly with music RMS; no waveform/equalizer visuals.
- Audio-coupled moments:
  - Scene 2 hero cards fanning in one by one — card sound per card, accent first + last
  - Scene 3 hand dealing in, card played, card drawn, hand-value tick-down — card + click sounds matched to each simulated tap
  - Scene 4 wild-card flash and "Good call." reveal — one dry announcement-style hit on each
  - Scene 5 wordmark slam — one bell-style hit
- SFX selection guidance: match the actual implemented motion — card-family sounds (slide/place/fan) for card actions, interface/ui click sounds for simulated taps, one restrained bell/impact hit for the wild-card beat, the "Good call." reveal, and the outro slam. 3-5 SFX total; never stack SFX on a frame that already has a music hit landing.
- SFX analysis guidance: see `~/.claude/skills/brag/assets/sfx/sfx-analysis.md` — prefer low/medium high-frequency-risk files for the repeated card/click sounds in Scene 3.
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music into `brag-output/composition/assets/music/`; Hyperframes copies any SFX it selects into `brag-output/composition/assets/sfx/`.

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion), `hyperframes-creative` (design spec, beats, audio-reactive), `hyperframes-keyframes` (seek-safe keyframes), and `hyperframes-cli` (lint/check/render). `/brag` is its own workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (the game board / card UI / wild-card and round-end modals).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints; ignore cues that hurt readability, scene pacing, or the product story.
- Major reveals may move toward nearby strong cues within about 0.15s. Smaller entrances may align to nearby beat points within about 0.10s. Use only 1-3 strong cue locks.
- Use SFX to support motion and interaction: card sounds for card-like reveals, short announcement cues for major payoffs, key/click sounds for user actions, and restraint when the edit is already busy.
- Honor the planned music fade-in/fade-out.
- Consider the audio-reactive workflow for a subtle glow/presence effect tied to RMS/frequency bands. Avoid waveform/equalizer visuals, musical-note graphics, generic particle systems, strobing, or heavy pulsing.
- Use local assets for audio and any required runtime/media dependencies.
- Run `hyperframes check` before render — it is brag's single gate.
