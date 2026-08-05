/* ================================================
   PAGE TRANSITIONS — Happy Birthday Scrapbook
   Smooth fade/slide transitions between pages
   ================================================ */

'use strict';

/* ── Transition overlay ──────────────────────────
   Injects a full-screen overlay div and fades it
   out on page load, or fades it in before navigation.
   ─────────────────────────────────────────────── */
function initTransitions() {
  // Create overlay if it doesn't exist
  let overlay = document.getElementById('page-transition');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'page-transition';
    document.body.appendChild(overlay);
  }

  // Fade in overlay content (page just loaded — fade overlay away)
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'none';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.55s ease';
      overlay.style.opacity = '0';
    });
  });

  // Intercept all internal anchor clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');

    // Skip external links, anchors, and javascript: links
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('javascript') || href.startsWith('mailto')) return;

    e.preventDefault();

    // Fade overlay in, then navigate
    overlay.style.transition = 'opacity 0.35s ease';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    setTimeout(() => {
      window.location.href = href;
    }, 360);
  });
}

/* ── Expose ── */
window.ScrapTransitions = { initTransitions };
