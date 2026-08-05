/* ================================================
   CONFETTI — Happy Birthday Scrapbook
   Falling confetti pieces for the final page
   ================================================ */

'use strict';

/* ── Confetti colours ── */
const CONFETTI_COLORS = [
  '#f7c5d0', '#f0a0b8', '#fde8ed',
  '#c8e6f5', '#b8d8f0', '#e8f4fb',
  '#f9efc7', '#f5e6d3', '#d4edda',
  '#d4a87a', '#f7c5d0', '#ffffff',
  '#ffd6e0', '#c5e1cb', '#ffe4b5',
];

const CONFETTI_SHAPES = ['square', 'circle', 'ribbon'];

/* ── Launch a burst of confetti ─────────────────
   count  — number of pieces
   origin — { x, y } in px (default: top of viewport)
   ─────────────────────────────────────────────── */
function launchConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createPiece(), ScrapUtils.rand(0, 2200));
  }
}

function createPiece() {
  const piece = document.createElement('div');
  piece.className = 'confetti-piece';

  const color  = ScrapUtils.pick(CONFETTI_COLORS);
  const shape  = ScrapUtils.pick(CONFETTI_SHAPES);
  const size   = ScrapUtils.rand(6, 14);
  const left   = ScrapUtils.rand(0, 100);
  const dur    = ScrapUtils.rand(3, 7);
  const drift  = ScrapUtils.rand(-80, 80);
  const rotate = ScrapUtils.rand(0, 360);

  piece.style.left            = left + 'vw';
  piece.style.width           = size + 'px';
  piece.style.height          = shape === 'ribbon' ? size * 3 + 'px' : size + 'px';
  piece.style.background      = color;
  piece.style.borderRadius    = shape === 'circle' ? '50%' : shape === 'ribbon' ? '2px' : '2px';
  piece.style.animationDuration = dur + 's';
  piece.style.animationDelay  = '0s';
  piece.style.setProperty('--drift', drift + 'px');
  piece.style.transform       = `rotate(${rotate}deg)`;
  piece.style.opacity         = '0.9';

  document.body.appendChild(piece);
  setTimeout(() => piece.remove(), (dur + 0.5) * 1000);
}

/* ── Continuous gentle confetti ─────────────────
   Keeps a low steady drizzle of confetti.
   ─────────────────────────────────────────────── */
let confettiInterval = null;

function startConfettiDrizzle(interval = 400) {
  if (confettiInterval) return;
  confettiInterval = setInterval(() => {
    createPiece();
    createPiece();
  }, interval);
}

function stopConfettiDrizzle() {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }
}

/* ── Expose ── */
window.ScrapConfetti = { launchConfetti, startConfettiDrizzle, stopConfettiDrizzle };
