/* ================================================
   SVGS.JS — Inline SVG Snippets
   Reference-accurate watercolor-style illustrations
   All return HTML strings for innerHTML injection
   ================================================ */
'use strict';

const SVG = {

  /* ── Satin Bow ── */
  bow: (size = 80, color = '#e8a0b0') => {
    const d = color;
    const l = '#f5c8d4'; const dk = '#c46080';
    return `<svg width="${size}" height="${Math.round(size*.65)}" viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Left wing -->
  <ellipse cx="18" cy="22" rx="17" ry="18" fill="url(#bl)" transform="rotate(-18 18 22)"/>
  <!-- Right wing -->
  <ellipse cx="62" cy="22" rx="17" ry="18" fill="url(#br)" transform="rotate(18 62 22)"/>
  <!-- Left tail -->
  <path d="M38 30 Q28 46 22 52 Q30 48 38 38Z" fill="${d}" opacity=".85"/>
  <!-- Right tail -->
  <path d="M42 30 Q52 46 58 52 Q50 48 42 38Z" fill="${d}" opacity=".85"/>
  <!-- Knot -->
  <ellipse cx="40" cy="26" rx="7" ry="6" fill="url(#bk)"/>
  <!-- Highlight sheen -->
  <ellipse cx="40" cy="23" rx="4" ry="2.5" fill="rgba(255,255,255,0.35)"/>
  <defs>
    <radialGradient id="bl" cx="45%" cy="30%" r="60%"><stop offset="0%" stop-color="${l}"/><stop offset="60%" stop-color="${d}"/><stop offset="100%" stop-color="${dk}"/></radialGradient>
    <radialGradient id="br" cx="55%" cy="30%" r="60%"><stop offset="0%" stop-color="${l}"/><stop offset="60%" stop-color="${d}"/><stop offset="100%" stop-color="${dk}"/></radialGradient>
    <radialGradient id="bk" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="${l}"/><stop offset="100%" stop-color="${dk}"/></radialGradient>
  </defs>
</svg>`;
  },

  /* ── Watercolor Rose ── */
  rose: (size = 60) => `<svg width="${size}" height="${size}" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Leaves -->
  <ellipse cx="14" cy="50" rx="9" ry="5" fill="#7ab87a" opacity=".75" transform="rotate(-35 14 50)"/>
  <ellipse cx="46" cy="50" rx="7" ry="4" fill="#5a9a5a" opacity=".6" transform="rotate(25 46 50)"/>
  <!-- Outer petals -->
  <ellipse cx="30" cy="38" rx="12" ry="10" fill="#e8a0b0" opacity=".7" transform="rotate(-10 30 38)"/>
  <ellipse cx="30" cy="36" rx="10" ry="9"  fill="#e8a0b0" opacity=".65" transform="rotate(20 30 36)"/>
  <ellipse cx="30" cy="35" rx="11" ry="9"  fill="#e8a0b0" opacity=".6" transform="rotate(150 30 35)"/>
  <!-- Mid petals -->
  <ellipse cx="30" cy="30" rx="9" ry="8" fill="#d9909e" opacity=".8" transform="rotate(-25 30 30)"/>
  <ellipse cx="30" cy="29" rx="8" ry="7" fill="#d9909e" opacity=".75" transform="rotate(55 30 29)"/>
  <ellipse cx="30" cy="28" rx="8" ry="7" fill="#d9909e" opacity=".7" transform="rotate(130 30 28)"/>
  <!-- Inner petals -->
  <ellipse cx="30" cy="26" rx="6" ry="5.5" fill="#c4788a" opacity=".9" transform="rotate(15 30 26)"/>
  <ellipse cx="30" cy="25" rx="5" ry="5"   fill="#c4788a" opacity=".85" transform="rotate(90 30 25)"/>
  <!-- Centre -->
  <circle cx="30" cy="24" r="3.5" fill="#a85870"/>
  <circle cx="29" cy="23" r="1.5" fill="rgba(255,255,255,.3)"/>
  <!-- Stem -->
  <path d="M30 48 Q28 55 26 60" stroke="#5a9a5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</svg>`,

  /* ── Mini Rose (no stem) ── */
  roseMini: (size = 36) => `<svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="8" cy="30" rx="6" ry="3.5" fill="#7ab87a" opacity=".7" transform="rotate(-30 8 30)"/>
  <ellipse cx="18" cy="26" rx="9" ry="7" fill="#e8a0b0" opacity=".65" transform="rotate(-8 18 26)"/>
  <ellipse cx="18" cy="24" rx="8" ry="7" fill="#e8a0b0" opacity=".6" transform="rotate(20 18 24)"/>
  <ellipse cx="18" cy="20" rx="7" ry="6" fill="#d9909e" opacity=".8" transform="rotate(-20 18 20)"/>
  <ellipse cx="18" cy="18" rx="6" ry="5" fill="#d9909e" opacity=".75" transform="rotate(60 18 18)"/>
  <ellipse cx="18" cy="16" rx="5" ry="4" fill="#c4788a" opacity=".9" transform="rotate(10 18 16)"/>
  <circle cx="18" cy="14" r="3" fill="#a85870"/>
  <circle cx="17" cy="13" r="1.2" fill="rgba(255,255,255,.3)"/>
</svg>`,

  /* ── Butterfly ── */
  butterfly: (size = 70) => `<svg width="${size}" height="${Math.round(size*.75)}" viewBox="0 0 70 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Upper left wing -->
  <path d="M34 26 Q14 4 6 12 Q0 22 18 30Z" fill="url(#bw1)" opacity=".9"/>
  <!-- Upper right wing -->
  <path d="M36 26 Q56 4 64 12 Q70 22 52 30Z" fill="url(#bw2)" opacity=".9"/>
  <!-- Lower left wing -->
  <path d="M33 28 Q10 32 8 44 Q18 50 32 36Z" fill="#d9909e" opacity=".75"/>
  <!-- Lower right wing -->
  <path d="M37 28 Q60 32 62 44 Q52 50 38 36Z" fill="#d9909e" opacity=".75"/>
  <!-- Wing markings -->
  <circle cx="22" cy="18" r="3" fill="rgba(160,60,80,.3)"/>
  <circle cx="48" cy="18" r="3" fill="rgba(160,60,80,.3)"/>
  <!-- Body -->
  <ellipse cx="35" cy="30" rx="2.5" ry="14" fill="#6b3a4a"/>
  <!-- Antennae -->
  <path d="M33 18 Q26 8 24 4" stroke="#6b3a4a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M37 18 Q44 8 46 4" stroke="#6b3a4a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <circle cx="24" cy="4" r="2" fill="#6b3a4a"/>
  <circle cx="46" cy="4" r="2" fill="#6b3a4a"/>
  <!-- Wing shimmer -->
  <path d="M34 26 Q22 14 18 18" stroke="rgba(255,255,255,.3)" stroke-width="1" fill="none"/>
  <path d="M36 26 Q48 14 52 18" stroke="rgba(255,255,255,.3)" stroke-width="1" fill="none"/>
  <defs>
    <radialGradient id="bw1" cx="60%" cy="30%" r="70%"><stop offset="0%" stop-color="#f2cdd4"/><stop offset="55%" stop-color="#d9909e"/><stop offset="100%" stop-color="#b06070"/></radialGradient>
    <radialGradient id="bw2" cx="40%" cy="30%" r="70%"><stop offset="0%" stop-color="#f2cdd4"/><stop offset="55%" stop-color="#d9909e"/><stop offset="100%" stop-color="#b06070"/></radialGradient>
  </defs>
</svg>`,

  /* ── Wax Seal ── */
  waxSeal: (size = 52, glyph = '🌹') => `<span style="
    display:inline-flex;align-items:center;justify-content:center;
    width:${size}px;height:${size}px;border-radius:50%;
    background:radial-gradient(circle at 36% 30%, #e8849a 0%, #c4607a 45%, #a04060 100%);
    box-shadow:inset 0 3px 8px rgba(255,255,255,.32),inset 0 -2px 6px rgba(0,0,0,.18),0 4px 14px rgba(160,60,90,.42);
    font-size:${Math.round(size*.52)}px;position:relative;flex-shrink:0;
  " aria-hidden="true"><span style="position:relative;z-index:1;">${glyph}</span><span style="
    position:absolute;inset:${Math.round(size*.1)}px;border-radius:50%;
    border:1.5px solid rgba(255,255,255,.25);pointer-events:none;
  "></span></span>`,

  /* ── Parchment Scroll (CSS only) ── */
  scrollFrame: `<div style="
    position:relative;
    background:linear-gradient(180deg,#fdf8ec 0%,#f5e8cc 40%,#fdf3e0 70%,#f9edd8 100%);
    border-radius:8px 8px 8px 8px;
    box-shadow:2px 3px 14px rgba(140,100,60,.22),inset 0 0 40px rgba(200,160,80,.08);
    border:1px solid rgba(200,160,80,.2);
    padding:22px 18px 18px;
  ">`,

  /* ── Cherries ── */
  cherries: (size = 70) => `<svg width="${size}" height="${Math.round(size*1.3)}" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Stems -->
  <path d="M22 32 Q20 18 30 10 Q40 18 48 32" stroke="#5a9a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M30 10 Q35 6 40 4" stroke="#5a9a5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Leaf -->
  <ellipse cx="38" cy="8" rx="8" ry="4.5" fill="#7ab87a" opacity=".8" transform="rotate(20 38 8)"/>
  <!-- Left cherry -->
  <circle cx="20" cy="48" r="16" fill="url(#ch1)"/>
  <circle cx="16" cy="42" r="4" fill="rgba(255,255,255,.22)"/>
  <!-- Right cherry -->
  <circle cx="50" cy="50" r="16" fill="url(#ch2)"/>
  <circle cx="46" cy="44" r="4" fill="rgba(255,255,255,.22)"/>
  <!-- Bow at top -->
  <path d="M28 12 Q25 6 20 8 Q22 14 28 14Z" fill="#e8a0b0"/>
  <path d="M32 12 Q35 6 40 8 Q38 14 32 14Z" fill="#e8a0b0"/>
  <circle cx="30" cy="12" r="3" fill="#d4788a"/>
  <defs>
    <radialGradient id="ch1" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#f5a8b8"/><stop offset="60%" stop-color="#e07888"/><stop offset="100%" stop-color="#c05068"/></radialGradient>
    <radialGradient id="ch2" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#f5a8b8"/><stop offset="60%" stop-color="#e07888"/><stop offset="100%" stop-color="#c05068"/></radialGradient>
  </defs>
</svg>`,

  /* ── Stacked Books with Ribbon ── */
  books: (size = 90) => `<svg width="${size}" height="${Math.round(size*.9)}" viewBox="0 0 90 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Book 3 (bottom) -->
  <rect x="8" y="56" width="74" height="14" rx="2" fill="#d4a0b0"/>
  <rect x="8" y="56" width="8"  height="14" rx="1" fill="#c48090"/>
  <!-- Book 2 -->
  <rect x="6" y="40" width="68" height="17" rx="2" fill="#c8b0c8"/>
  <rect x="6" y="40" width="8"  height="17" rx="1" fill="#b090b0"/>
  <!-- Book 1 (top) -->
  <rect x="10" y="26" width="60" height="15" rx="2" fill="#e8c0c8"/>
  <rect x="10" y="26" width="8"  height="15" rx="1" fill="#d0a0b0"/>
  <!-- Ribbon vertical -->
  <rect x="38" y="16" width="6" height="58" fill="#e8a0b0" opacity=".85"/>
  <!-- Ribbon bow -->
  <path d="M41 18 Q32 8 26 12 Q28 20 41 20Z" fill="url(#rb1)"/>
  <path d="M41 18 Q50 8 56 12 Q54 20 41 20Z" fill="url(#rb2)"/>
  <ellipse cx="41" cy="18" rx="4.5" ry="4" fill="url(#rk)"/>
  <ellipse cx="41" cy="17" rx="2.5" ry="1.5" fill="rgba(255,255,255,.35)"/>
  <!-- Ribbon tails -->
  <path d="M39 22 Q34 32 30 38" stroke="#e8a0b0" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M43 22 Q48 32 52 38" stroke="#e8a0b0" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <defs>
    <radialGradient id="rb1" cx="55%" cy="30%" r="70%"><stop offset="0%" stop-color="#f5c8d4"/><stop offset="100%" stop-color="#c46080"/></radialGradient>
    <radialGradient id="rb2" cx="45%" cy="30%" r="70%"><stop offset="0%" stop-color="#f5c8d4"/><stop offset="100%" stop-color="#c46080"/></radialGradient>
    <radialGradient id="rk" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#f5c8d4"/><stop offset="100%" stop-color="#c46080"/></radialGradient>
  </defs>
</svg>`,

  /* ── Rose Bouquet (tied with ribbon) ── */
  bouquet: (size = 80) => `<svg width="${size}" height="${Math.round(size*1.1)}" viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Stems -->
  <path d="M26 58 Q24 72 22 88" stroke="#5a9a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M32 56 Q32 72 32 88" stroke="#5a9a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M38 58 Q40 72 42 88" stroke="#5a9a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M46 60 Q50 72 52 88" stroke="#5a9a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Leaves -->
  <ellipse cx="20" cy="68" rx="8" ry="3.5" fill="#7ab87a" opacity=".7" transform="rotate(-30 20 68)"/>
  <ellipse cx="52" cy="66" rx="7" ry="3" fill="#5a9a5a" opacity=".65" transform="rotate(25 52 66)"/>
  <!-- Ribbon wrap -->
  <rect x="18" y="56" width="36" height="8" rx="3" fill="#f2cdd4"/>
  <!-- Baby's breath sprigs -->
  <circle cx="14" cy="28" r="2.5" fill="#f5c8d4"/>
  <circle cx="18" cy="22" r="2" fill="#f5c8d4"/>
  <circle cx="11" cy="22" r="1.5" fill="#f5c8d4"/>
  <circle cx="60" cy="30" r="2.5" fill="#f5c8d4"/>
  <circle cx="64" cy="24" r="2" fill="#f5c8d4"/>
  <circle cx="57" cy="24" r="1.5" fill="#f5c8d4"/>
  <!-- Rose 1 (large, center-left) -->
  <ellipse cx="28" cy="36" rx="11" ry="9" fill="#e8a0b0" opacity=".7" transform="rotate(-8 28 36)"/>
  <ellipse cx="28" cy="34" rx="9" ry="8"  fill="#e8a0b0" opacity=".65" transform="rotate(20 28 34)"/>
  <ellipse cx="28" cy="30" rx="8" ry="7"  fill="#d9909e" opacity=".8" transform="rotate(-20 28 30)"/>
  <ellipse cx="28" cy="28" rx="7" ry="6"  fill="#d9909e" opacity=".75" transform="rotate(55 28 28)"/>
  <ellipse cx="28" cy="26" rx="5" ry="4.5" fill="#c4788a" opacity=".9"/>
  <circle  cx="28" cy="24" r="3" fill="#a85870"/>
  <!-- Rose 2 (center) -->
  <ellipse cx="40" cy="28" rx="11" ry="9" fill="#e8a0b0" opacity=".7" transform="rotate(6 40 28)"/>
  <ellipse cx="40" cy="26" rx="9" ry="8"  fill="#d9909e" opacity=".8"/>
  <ellipse cx="40" cy="24" rx="7" ry="6"  fill="#d9909e" opacity=".75" transform="rotate(45 40 24)"/>
  <ellipse cx="40" cy="22" rx="5" ry="4.5" fill="#c4788a" opacity=".9"/>
  <circle  cx="40" cy="20" r="3" fill="#a85870"/>
  <!-- Rose 3 (right) -->
  <ellipse cx="53" cy="34" rx="10" ry="8" fill="#e8a0b0" opacity=".7" transform="rotate(-12 53 34)"/>
  <ellipse cx="53" cy="32" rx="8" ry="7"  fill="#d9909e" opacity=".8"/>
  <ellipse cx="53" cy="30" rx="6" ry="5.5" fill="#c4788a" opacity=".9" transform="rotate(30 53 30)"/>
  <circle  cx="53" cy="28" r="3" fill="#a85870"/>
</svg>`,

  /* ── Floral Sprig (baby's breath style) ── */
  sprig: (size = 50) => `<svg width="${size}" height="${Math.round(size*1.3)}" viewBox="0 0 50 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M25 65 Q24 50 22 40 Q18 28 12 18" stroke="#7ab87a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M22 40 Q14 34 8 30" stroke="#7ab87a" stroke-width="1" fill="none" stroke-linecap="round"/>
  <path d="M22 48 Q16 44 10 42" stroke="#7ab87a" stroke-width="1" fill="none" stroke-linecap="round"/>
  <path d="M22 40 Q28 32 32 26" stroke="#7ab87a" stroke-width="1" fill="none" stroke-linecap="round"/>
  <circle cx="12" cy="18" r="3.5" fill="#f2cdd4"/>  <circle cx="10" cy="14" r="2.5" fill="#f2cdd4"/>
  <circle cx="8"  cy="30" r="3"   fill="#f2cdd4"/>  <circle cx="6"  cy="26" r="2"   fill="#f5c8d4"/>
  <circle cx="10" cy="42" r="3"   fill="#f2cdd4"/>  <circle cx="7"  cy="38" r="2"   fill="#f5c8d4"/>
  <circle cx="32" cy="26" r="3.5" fill="#f2cdd4"/>  <circle cx="36" cy="22" r="2.5" fill="#f5c8d4"/>
  <circle cx="16" cy="10" r="2"   fill="#f5c8d4"/>  <circle cx="20" cy="6"  r="2.5" fill="#f2cdd4"/>
</svg>`,

};

window.SVG = SVG;
