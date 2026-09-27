'use client';

import { motion } from 'framer-motion';

// The bar attached under a player's hand, shown once per game (see
// showHandHint in GameBoard.tsx / MultiplayerGameBoard.tsx) to teach that
// cards can be dragged into any order.
export default function DragHandleHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="hint-sweep flex w-full items-center justify-center gap-1.5 bg-surface-sunken py-2"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-ink-faint" aria-hidden="true">
        <circle cx="9" cy="6" r="1.8" />
        <circle cx="15" cy="6" r="1.8" />
        <circle cx="9" cy="12" r="1.8" />
        <circle cx="15" cy="12" r="1.8" />
        <circle cx="9" cy="18" r="1.8" />
        <circle cx="15" cy="18" r="1.8" />
      </svg>
      <span className="text-xs font-semibold text-ink-muted">Drag to arrange your hand</span>
    </motion.div>
  );
}
