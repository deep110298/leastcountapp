import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support — Least Count App',
};

export default function Support() {
  return (
    <div className="min-h-dvh bg-canvas px-6 pb-16 text-ink">
      <div className="mx-auto w-full max-w-xl">
        <div className="pt-[max(1rem,env(safe-area-inset-top))] pb-6">
          <Link href="/" className="mono-label text-xs font-bold text-ink-soft hover:text-ink">
            ← Home
          </Link>
        </div>

        <h1 className="font-display text-[32px] font-extrabold leading-tight tracking-tight">Support</h1>
        <p className="mt-1.5 text-sm text-ink-muted">Help with Least Count App</p>

        <div className="mt-8 flex flex-col gap-7 text-[15px] leading-relaxed text-ink-soft">
          <section>
            <p>
              Got a question, found a bug, or something&apos;s not working right? This page covers the most common
              questions — if you don&apos;t find your answer, email us and we&apos;ll help you out directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">How do I learn the rules?</h2>
            <p className="mt-2">
              Every match has a <strong className="text-ink">Rules</strong> button at the top of the screen — tap it
              any time, including mid-game, for the full rulebook.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">I can&apos;t join a Friends-mode room</h2>
            <p className="mt-2">
              Double-check the room code with whoever created the room — codes are case-insensitive but must match
              exactly. Friends mode needs an active internet connection to sync between players, unlike Play vs
              Computer, Daily Challenge, and Story Mode, which all work fine offline once loaded. If the room
              creator has closed the app, the room is gone and a new one needs to be created.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">A match in Friends mode looks frozen or out of sync</h2>
            <p className="mt-2">
              This is almost always a dropped connection. Leave the room and rejoin with the same code to resync —
              your seat and hand are preserved as long as the room is still active.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">Where&apos;s dark mode?</h2>
            <p className="mt-2">
              Tap the sun/moon icon on the home screen to switch themes. During an actual match, the same toggle
              moves to sit just under the Rules button.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">My Story Mode or Daily Challenge progress disappeared</h2>
            <p className="mt-2">
              Progress is saved locally on your device — there&apos;s no account system, so it isn&apos;t backed up
              anywhere. Clearing the app&apos;s storage, or reinstalling on a new device, starts progress over from
              scratch.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">Still stuck?</h2>
            <p className="mt-2">
              Email{' '}
              <a href="mailto:shahdeep276@gmail.com" className="text-accent underline underline-offset-2">
                shahdeep276@gmail.com
              </a>{' '}
              with what happened and, if you can, which mode you were playing — we read every message.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
