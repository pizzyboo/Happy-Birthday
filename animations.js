/* ================================================
   ANIMATIONS — Happy Birthday Scrapbook
   Floating hearts, sparkling stars, butterflies,
   and all ambient decorative motion effects.
   ================================================ */

'use strict';

/* ── Floating Hearts ─────────────────────────────
   Creates hearts that float upward from the bottom
   of the screen continuously.
   ─────────────────────────────────────────────── */
function initFloatingHearts(containerSelector = '.hearts-container', density = 8) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const heartEmojis = ['🤍', '🩷', '💗', '💓', '💖', '💕', '♡', '💝', '🩶', '💞'];

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ScrapUtils.pick(heartEmojis);

    // Random horizontal position
    heart.style.left = ScrapUtils.rand(2, 98) + '%';

    // Random size
    const size = ScrapUtils.rand(0.8, 2.2);
    heart.style.fontSize = size + 'rem';

    // Random duration & delay
    const duration = ScrapUtils.rand(6, 14);
    const delay = ScrapUtils.rand(0, 4);
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';

    // Slight horizontal drift via translateX
    heart.style.setProperty('--drift', ScrapUtils.rand(-30, 30) + 'px');

    container.appendChild(heart);

    // Remove after animation completes
    setTimeout(() => heart.remove(), (duration + delay) * 1000 + 500);
  }

  // Spawn initial batch staggered
  for (let i = 0; i < density; i++) {
    setTimeout(() => spawnHeart(), ScrapUtils.rand(0, 5000));
  }

  // Keep spawning
  setInterval(spawnHeart, ScrapUtils.rand(1200, 2200));
}

/* ── Sparkling Stars ─────────────────────────────
   Creates brief star/sparkle bursts at random or
   cursor positions.
   ─────────────────────────────────────────────── */
function initSparkles(autoSpawn = true) {
  const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '✦', '✧', '⁕', '✵'];

  function spawnSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'star-sparkle';
    sparkle.textContent = ScrapUtils.pick(sparkleEmojis);
    sparkle.style.left = x + 'px';
    sparkle.style.top  = y + 'px';
    sparkle.style.fontSize = ScrapUtils.rand(0.8, 1.6) + 'rem';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2100);
  }

  // Spawn at cursor on click
  document.addEventListener('click', (e) => {
    const x = e.clientX - 12;
    const y = e.clientY - 12;
    spawnSparkle(x, y);
    // Extra burst
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnSparkle(
        x + ScrapUtils.rand(-30, 30),
        y + ScrapUtils.rand(-30, 30)
      ), i * 80);
    }
  });

  // Auto-spawn randomly around the page
  if (autoSpawn) {
    setInterval(() => {
      const x = ScrapUtils.rand(0, window.innerWidth  - 20);
      const y = ScrapUtils.rand(0, window.innerHeight - 20);
      spawnSparkle(x, y);
    }, ScrapUtils.rand(2000, 4500));
  }
}

/* ── Cursor Trail ────────────────────────────────
   Leaves a faint sparkle trail on mouse move
   (subtle, not overwhelming).
   ─────────────────────────────────────────────── */
function initCursorTrail() {
  let lastTime = 0;
  const trailEmojis = ['·', '✦', '✧', '˚', '⁎'];

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 120) return; // throttle
    lastTime = now;

    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      z-index: 9998;
      font-size: ${ScrapUtils.rand(0.5, 0.9)}rem;
      color: var(--pink-deep);
      opacity: 0.7;
      animation: sparkle 1s ease forwards;
      transform: translate(-50%, -50%);
    `;
    dot.textContent = ScrapUtils.pick(trailEmojis);
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 1100);
  });
}

/* ── Sticker Wobble ──────────────────────────────
   Makes stickers gently wobble on hover.
   ─────────────────────────────────────────────── */
function initStickerHover() {
  document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('mouseenter', () => {
      sticker.style.transform = `rotate(${ScrapUtils.rand(-15, 15)}deg) scale(1.2)`;
      sticker.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    });
    sticker.addEventListener('mouseleave', () => {
      sticker.style.transform = '';
    });
  });
}

/* ── Background floating deco elements ──────────
   Randomly placed large faint emoji decorations
   behind content.
   ─────────────────────────────────────────────── */
function initBgDecos(count = 6) {
  const decos = ['🌸', '🌺', '🌷', '🌹', '🌻', '🍀', '🦋', '🌙', '⭐', '💮', '🌼'];
  const positions = [
    { top: '5%',  left: '3%'  },
    { top: '15%', right: '4%' },
    { top: '40%', left: '1%'  },
    { top: '60%', right: '2%' },
    { top: '80%', left: '4%'  },
    { top: '90%', right: '3%' },
  ];

  positions.slice(0, count).forEach((pos, i) => {
    const deco = document.createElement('div');
    deco.className = 'bg-deco';
    deco.textContent = ScrapUtils.pick(decos);
    Object.entries(pos).forEach(([k, v]) => deco.style[k] = v);
    // Slightly different float animation timing
    deco.style.animationDelay = (i * 0.7) + 's';
    deco.classList.add(i % 2 === 0 ? 'float-slow' : 'float-med');
    document.body.appendChild(deco);
  });
}

/* ── Page-load entrance animations ──────────────
   Staggers fade-in for elements with
   data-anim="fade" attribute.
   ─────────────────────────────────────────────── */
function initEntranceAnims() {
  const targets = document.querySelectorAll('[data-anim]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const type  = el.dataset.anim  || 'fade';
        const delay = el.dataset.delay || '0';

        el.style.transitionDelay = delay + 'ms';

        if (type === 'fade') {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
          });
        }

        if (type === 'pop') {
          el.style.opacity = '0';
          el.style.transform = 'scale(0.85)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.style.opacity = '1';
              el.style.transform = 'scale(1)';
            });
          });
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
}

/* ── Tilt on hover (3D feel for polaroids) ───────
   Subtle 3D tilt following mouse position inside
   the card element.
   ─────────────────────────────────────────────── */
function initPolaroidTilt() {
  document.querySelectorAll('.polaroid').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      const baseRot = parseFloat(card.dataset.rotate || 0);
      card.style.transform =
        `rotate(${baseRot + x * 0.3}deg) rotateX(${-y}deg) rotateY(${x}deg) translateY(-10px) scale(1.04)`;
    });

    card.addEventListener('mouseleave', () => {
      const baseRot = parseFloat(card.dataset.rotate || 0);
      card.style.transform = `rotate(${baseRot}deg)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });
}

/* ── Export ── */
window.ScrapAnimations = {
  initFloatingHearts,
  initSparkles,
  initCursorTrail,
  initStickerHover,
  initBgDecos,
  initEntranceAnims,
  initPolaroidTilt,
};
