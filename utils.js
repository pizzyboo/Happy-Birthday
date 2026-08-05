/* ================================================
   SHARED UTILITIES — Happy Birthday Scrapbook
   Helper functions used across all pages
   ================================================ */

'use strict';

/* ── Random helpers ── */
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (arr) => arr[randInt(0, arr.length - 1)];

/* ── DOM helper ── */
const el = (selector) => document.querySelector(selector);
const els = (selector) => [...document.querySelectorAll(selector)];
const make = (tag, cls = '', attrs = {}) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
};

/* ── Expose globally ── */
window.ScrapUtils = { rand, randInt, pick, el, els, make };
