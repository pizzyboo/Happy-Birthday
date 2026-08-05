/* ================================================
   SVGS.JS — Asset-Based Decorations
   Uses uploaded PNG assets from /assets/ folder.
   Path prefix is set per-page via SVG.setBase().
     - pages/ context:  SVG.setBase('../assets/')  (default)
     - root context:    SVG.setBase('./assets/')
   ================================================ */
'use strict';

const SVG = {

  /* ── Asset base path (default: pages/ context) ── */
  _base: '../assets/',

  setBase(path) { this._base = path; },

  /* ── Internal helpers ── */
  _img(file, size, extra) {
    const src = this._base + encodeURIComponent(file);
    return `<img src="${src}" width="${size}" height="${size}" alt=""
      aria-hidden="true" draggable="false" loading="lazy"
      style="display:inline-block;object-fit:contain;${extra || ''}">`;
  },
  _imgWH(file, w, h, extra) {
    const src = this._base + encodeURIComponent(file);
    return `<img src="${src}" width="${w}" height="${h}" alt=""
      aria-hidden="true" draggable="false" loading="lazy"
      style="display:inline-block;object-fit:contain;${extra || ''}">`;
  },

  /* ================================================
     DECORATION FUNCTIONS
     Signature mirrors the old SVG.xxx(size) calls so
     existing inj() lines in HTML need zero changes.
   ================================================ */

  /* Bow / ribbon */
  bow(size = 80) {
    return this._img('bow.png', size,
      'filter:drop-shadow(0 2px 7px rgba(100,50,70,.22));');
  },

  /* Butterfly */
  butterfly(size = 70) {
    return this._img('butterfly.png', Math.round(size * .92),
      'filter:drop-shadow(0 2px 5px rgba(80,40,60,.18));');
  },

  /* Flower 1 – primary / larger */
  flower(size = 44) {
    return this._img('flower 1.png', size,
      'filter:drop-shadow(0 1px 4px rgba(80,40,60,.15));');
  },

  /* Flower 2 – accent / secondary */
  flower2(size = 36) {
    return this._img('flower 2.png', size,
      'filter:drop-shadow(0 1px 4px rgba(80,40,60,.15));');
  },

  /* Love / heart 1 (filled) */
  heart(size = 40) {
    return this._img('love 1.png', size,
      'filter:drop-shadow(0 1px 4px rgba(100,40,60,.18));');
  },

  /* Love / heart 2 (lace / outline) */
  heartLace(size = 40) {
    return this._img('love 2.png', size,
      'filter:drop-shadow(0 1px 4px rgba(100,40,60,.15));');
  },

  /* Wax seal */
  waxSeal(size = 52, _glyph) {
    return this._img('wax-seal.png', size,
      'filter:drop-shadow(0 3px 8px rgba(80,30,50,.28));');
  },

  /* Sparkle */
  sparkle(size = 32) {
    return this._img('sparkle.png', size,
      'filter:drop-shadow(0 1px 3px rgba(120,80,40,.15));');
  },

  /* Postage stamp shell – keeps CSS border, flower inside */
  stamp(size = 52, _content, label = 'BDAY') {
    const inner = this._img('flower 1.png', Math.round(size * .72));
    return `<div style="display:inline-block;position:relative;
        background:#fdf6f0;padding:5px 5px 18px;
        box-shadow:1px 2px 8px rgba(120,60,80,.18);">
      <div style="position:absolute;inset:-7px;
        background-image:radial-gradient(circle 5px at 50% 50%,#fffaf7 40%,transparent 41%);
        background-size:13px 13px;background-repeat:repeat;
        z-index:-1;background-color:#fdf6f0;pointer-events:none;"></div>
      ${inner}
      <span style="position:absolute;bottom:3px;left:0;right:0;text-align:center;
        font-family:'Patrick Hand',cursive;font-size:.5rem;color:#9a6070;
        letter-spacing:.08em;text-transform:uppercase;">${label}</span>
    </div>`;
  },

  /* Ribbon strip – pure CSS, no asset */
  ribbon(width = 120, color = '#e8c0cc') {
    return `<div style="width:${width}px;height:11px;border-radius:3px;
      background:linear-gradient(90deg,${color}bb,${color},${color}bb);
      box-shadow:0 1px 3px rgba(100,50,70,.10);"></div>`;
  },

  /* ── Backward-compat aliases ── */
  rose(size = 60)    { return this.flower(size); },
  roseMini(size = 36){ return this.flower2(Math.round(size * .88)); },
  sprig(size = 50)   { return this.flower2(Math.round(size * .82)); },
  bouquet(size = 80) { return this.flower(size); },
};

window.SVG = SVG;
