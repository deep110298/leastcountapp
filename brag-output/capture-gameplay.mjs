// One-off script: capture REAL screenshots of an actual Least Count playthrough
// using a cached local Chrome via puppeteer-core (no new downloads).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("/Users/deepshah/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core");

const CHROME =
  "/Users/deepshah/.cache/puppeteer/chrome/mac_arm-147.0.7727.56/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const OUT = "/Users/deepshah/leastcountapp/brag-output/captures";
fs.mkdirSync(OUT, { recursive: true });

const RANK_VALUE = { A: 1, J: 10, Q: 10, K: 10 };
function rankValue(rank) {
  if (rank in RANK_VALUE) return RANK_VALUE[rank];
  return parseInt(rank, 10);
}

async function shot(page, name) {
  const p = path.join(OUT, name);
  await page.screenshot({ path: p });
  console.log("saved", name);
}

// Click an actual <button> whose own text is exactly this (not any element
// that merely contains the text — the deck's card-back graphic literally
// renders the label "Least Count" as branding, which a substring text
// selector would match instead of the real call button).
async function clickText(page, text) {
  const handle = await page.evaluateHandle(
    (t) => [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === t),
    text,
  );
  const el = handle.asElement();
  if (!el) throw new Error(`button not found: ${text}`);
  await el.click();
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    defaultViewport: { width: 375, height: 812, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();

  // 1. Home screen
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400)); // let client-side status cards populate
  await shot(page, "01-home.png");

  // 2. Setup screen
  await page.goto("http://localhost:3000/play/computer", { waitUntil: "networkidle0" });
  await shot(page, "02-setup.png");

  // pick Easy difficulty so a real win is reachable in a bounded number of turns
  await clickText(page, "Easy");
  await new Promise((r) => setTimeout(r, 150));

  // 3. Start game -> Wild card reveal modal
  await clickText(page, "Start game");
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "03-wildcard.png");

  // read the wild rank from the scoreboard's mono-label badge, e.g. "WILD · 5"
  // (scoped to .mono-label so the modal heading "This round's wild card" can't match)
  const wildRank = await page.evaluate(() => {
    const labels = [...document.querySelectorAll(".mono-label")].map((e) => e.textContent || "");
    for (const t of labels) {
      const m = t.match(/WILD\s*\W\s*([2-9]|10|[AJQK])\b/i);
      if (m) return m[1].toUpperCase();
    }
    return null;
  });
  console.log("wild rank:", wildRank);

  // 4. Continue -> dealt board
  await clickText(page, "Continue");
  await new Promise((r) => setTimeout(r, 300));
  await shot(page, "04-dealt.png");

  async function readHand() {
    return page.evaluate(() => {
      // Scope precisely to the live "Your hand" section — the Round-End
      // modal's hand-comparison rows also use a flex-wrap card row, and its
      // cards render as non-interactive <PlayingCard> with no onClick, so a
      // looser selector would find them too and clicking would do nothing.
      const section = [...document.querySelectorAll("section")].find((s) => {
        const label = s.querySelector(":scope > span");
        return label && /your hand/i.test(label.textContent || "");
      });
      if (!section) return [];
      const buttons = [...section.querySelectorAll("button[aria-label]")];
      return buttons
        .map((b) => b.getAttribute("aria-label"))
        .filter((label) => /of (spades|hearts|diamonds|clubs)$/i.test(label || "") || label === "Joker");
    });
  }

  // Dismiss whatever transient modal is up (wild-card reveal between rounds,
  // round-end review) so a multi-round playthrough keeps moving.
  async function dismissAnyModal() {
    const clicked = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) => {
        const t = b.textContent.trim();
        return t === "Continue" || t === "Next round";
      });
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (clicked) await new Promise((r) => setTimeout(r, 400));
    return clicked;
  }

  function pickHighest(hand) {
    let best = null;
    let bestValue = -1;
    for (const label of hand) {
      if (label === "Joker") continue;
      const rank = label.split(" ")[0];
      if (wildRank && rank === wildRank) continue; // keep the wild, it's worth 0
      const v = rankValue(rank);
      if (v > bestValue) {
        bestValue = v;
        best = label;
      }
    }
    return best || hand[0];
  }

  async function isPlayEnabled() {
    return page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim().startsWith("Play "));
      return !!btn && !btn.disabled;
    });
  }

  // Select-then-play, with retries: a card can occasionally be mid-exit-animation
  // (React AnimatePresence briefly keeps two copies in the DOM), so verify the
  // selection actually enabled the Play button before committing to it.
  async function playHighestCard() {
    for (let attempt = 0; attempt < 4; attempt++) {
      const hand = await readHand();
      console.log("hand:", hand);
      const best = pickHighest(hand);
      const handles = await page.$$(`[aria-label="${best}"]`);
      const handle = handles[handles.length - 1]; // last = the live (non-exiting) node
      if (handle) await handle.click();
      await new Promise((r) => setTimeout(r, 250));
      if (await isPlayEnabled()) return true;
      console.log(`  selection didn't take (attempt ${attempt + 1}), retrying...`);
      await new Promise((r) => setTimeout(r, 300));
    }
    return false;
  }

  async function playCardButtonClick() {
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim().startsWith("Play "));
      if (btn) btn.click();
    });
  }

  async function maybeDraw() {
    const drawBtn = await page.$('[aria-label="Draw from deck"]');
    if (drawBtn) {
      await drawBtn.click();
      await new Promise((r) => setTimeout(r, 350));
      return true;
    }
    return false; // draw was skipped (matched the pile) or it's not our turn to draw
  }

  // wait out the computer's ~800ms auto-turn if it's currently acting
  async function settleComputerTurn() {
    await new Promise((r) => setTimeout(r, 950));
  }

  async function takeTurn() {
    const before = await readHand();
    const ok = await playHighestCard();
    if (!ok) {
      console.log("  could not get a valid selection this turn, skipping");
      return;
    }
    await playCardButtonClick();
    await new Promise((r) => setTimeout(r, 350));
    await maybeDraw();
    await settleComputerTurn();
    const after = await readHand();
    if (after.length === before.length && after.every((c, i) => c === before[i])) {
      console.log("  WARNING: hand unchanged after turn");
    }
  }

  // turn 1: select highest card, screenshot selection, play it
  await playHighestCard();
  await shot(page, "05-selected.png");
  await playCardButtonClick();
  await new Promise((r) => setTimeout(r, 350));
  await shot(page, "06-draw-prompt.png");
  await maybeDraw();
  await shot(page, "07-after-draw-1.png");
  await settleComputerTurn();

  // turn 2
  await takeTurn();
  await shot(page, "08-after-draw-2.png");

  // keep playing turns until Least Count is enabled or we hit a safety cap
  for (let i = 0; i < 90; i++) {
    if (await dismissAnyModal()) continue;
    const enabled = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Least Count");
      return btn && !btn.disabled;
    });
    if (enabled) break;
    const gameOver = await page.evaluate(() => document.body.innerText.includes("Game over"));
    if (gameOver) {
      console.log("  game ended before a call — stopping");
      break;
    }
    const hand = await readHand();
    if (hand.length === 0) {
      await settleComputerTurn();
      continue;
    }
    await takeTurn();
  }
  await dismissAnyModal();
  await shot(page, "09-least-count-ready.png");

  const canCall = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Least Count");
    return btn && !btn.disabled;
  });
  if (canCall) {
    await clickText(page, "Least Count");
    await new Promise((r) => setTimeout(r, 250));
    await shot(page, "10-call-announcement.png");
    await new Promise((r) => setTimeout(r, 2200));
    await shot(page, "11-round-end.png");
  } else {
    console.log("never reached a callable hand within the turn cap — skipping call/round-end shots");
  }

  await browser.close();
  console.log("done");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
