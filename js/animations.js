/* ================================================
   ANIMATIONS.JS — Scrapbook Birthday Generator
   Floating hearts, sparkles, cursor trail,
   entrance animations, polaroid tilt, confetti.
   ================================================ */
'use strict';

/* ── Utility: random number in range ── */
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ================================================
   FLOATING HEARTS  — uses love 1.png / love 2.png assets
   ================================================ */
function initFloatingHearts(containerSel = '.hearts-container', density = 8) {
  const container = document.querySelector(containerSel);
  if (!container) return;

  /* Resolve asset base: prefer SVG._base if loaded, else guess from path */
  const base = (typeof SVG !== 'undefined') ? SVG._base
    : (window.location.pathname.includes('/pages/') ? '../assets/' : './assets/');

  const assetFiles = ['love 1.png', 'love 2.png', 'sparkle.png'];

  function spawn() {
    const el = document.createElement('div');
    el.className = 'heart';

    const file  = pick(assetFiles);
    const sz    = Math.round(rand(18, 36));
    const src   = base + encodeURIComponent(file);
    el.innerHTML = `<img src="${src}" width="${sz}" height="${sz}"
      alt="" draggable="false"
      style="object-fit:contain;opacity:.82;filter:drop-shadow(0 1px 3px rgba(120,60,80,.18));">`;

    el.style.left     = rand(2, 96) + '%';
    el.style.fontSize = '0'; /* img drives size */
    const dur = rand(7, 15);
    el.style.animationDuration = dur + 's';
    el.style.animationDelay   = rand(0, 3) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 3.5) * 1000);
  }

  for (let i = 0; i < density; i++) setTimeout(spawn, rand(0, 4000));
  setInterval(spawn, rand(1400, 2600));
}

/* ================================================
   SPARKLE STARS  — uses sparkle.png asset
   ================================================ */
function initSparkles(autoSpawn = true) {
  const base = (typeof SVG !== 'undefined' && SVG._base) ? SVG._base
    : (window.location.pathname.includes('/pages/') ? '../assets/' : './assets/');
  const src = base + encodeURIComponent('sparkle.png');

  function spawn(x, y) {
    const el = document.createElement('div');
    el.className = 'star-sparkle';
    const sz = Math.round(rand(20, 38));
    el.innerHTML = `<img src="${src}" width="${sz}" height="${sz}"
      alt="" draggable="false"
      style="object-fit:contain;filter:drop-shadow(0 1px 3px rgba(180,120,80,.2));">`;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }

  document.addEventListener('click', e => {
    spawn(e.clientX - 14, e.clientY - 14);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawn(e.clientX + rand(-32, 32), e.clientY + rand(-32, 32)), i * 80);
    }
  });

  if (autoSpawn) {
    setInterval(() => spawn(rand(0, window.innerWidth - 30), rand(0, window.innerHeight - 30)), rand(2400, 5000));
  }
}

/* ================================================
   CURSOR TRAIL  — uses sparkle + heart assets
   ================================================ */
function initCursorTrail() {
  let lastTime = 0;
  const base = (typeof SVG !== 'undefined' && SVG._base) ? SVG._base
    : (window.location.pathname.includes('/pages/') ? '../assets/' : './assets/');
  const trailAssets = ['sparkle.png', 'love 1.png', 'love 2.png'];

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastTime < 130) return;
    lastTime = now;

    const file = pick(trailAssets);
    const sz   = Math.round(rand(12, 22));
    const el   = document.createElement('div');
    el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      pointer-events:none;z-index:9998;
      animation:sparkle 1s ease forwards;transform:translate(-50%,-50%);`;
    el.innerHTML = `<img src="${base + encodeURIComponent(file)}"
      width="${sz}" height="${sz}" alt="" draggable="false"
      style="object-fit:contain;opacity:.65;">`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  });
}

/* ================================================
   ENTRANCE ANIMATIONS (IntersectionObserver)
   ================================================ */
function initEntranceAnims() {
  const targets = document.querySelectorAll('[data-anim]');
  if (!targets.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.12 });

  targets.forEach(t => obs.observe(t));
}

/* ================================================
   POLAROID 3D TILT
   ================================================ */
function initPolaroidTilt(selector = '.pol-card') {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 8;
      const y = ((e.clientY - r.top)  / r.height - .5) * 8;
      const base = parseFloat(card.dataset.r || 0);
      card.style.transform = `rotate(${base + x * .3}deg) rotateX(${-y}deg) rotateY(${x}deg) translateY(-10px) scale(1.04)`;
      card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
      const base = parseFloat(card.dataset.r || 0);
      card.style.transform = `rotate(${base}deg)`;
      card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
    });
  });
}

/* ================================================
   STICKER HOVER WOBBLE
   ================================================ */
function initStickerHover(selector = '.pol-card, .q-card, .wax-seal, .bow-satin, .css-rose') {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = (el.style.transform || '') + ` scale(1.05)`;
      el.style.transition = 'transform .3s cubic-bezier(.34,1.56,.64,1)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = el.style.transform.replace(/ scale\([^)]+\)/, '');
    });
  });
}

/* ================================================
   PAGE TRANSITION
   ================================================ */
function initTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // Fade in overlay on link click
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      const href = link.href;
      overlay.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

  // Fade overlay away on load
  window.addEventListener('load', () => {
    overlay.style.opacity = '0';
  });
}

/* ================================================
   CONFETTI BURST
   ================================================ */
const Confetti = (() => {
  const colors = ['#f2cdd4','#e898b0','#d9909e','#f5e6d3','#fce8ed','#c4788a','#a85870','#fdf0f2'];
  let drizzleTimer = null;

  function launchBurst(count = 120) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnPiece(true), rand(0, 600));
    }
  }

  function startDrizzle(rate = 400) {
    if (drizzleTimer) return;
    drizzleTimer = setInterval(() => spawnPiece(false), rate);
  }

  function stopDrizzle() {
    clearInterval(drizzleTimer);
    drizzleTimer = null;
  }

  function spawnPiece(burst) {
    const el = document.createElement('div');
    const size = rand(6, 14);
    const color = pick(colors);
    const shape = pick(['circle','rect','diamond']);
    let clipPath = 'none';
    if (shape === 'diamond') clipPath = 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)';

    el.style.cssText = `
      position:fixed;pointer-events:none;z-index:9990;
      width:${size}px;height:${shape==='rect'?size*.55:size}px;
      background:${color};border-radius:${shape==='circle'?'50%':'2px'};
      clip-path:${clipPath};
      left:${burst ? rand(20,80) : rand(0,100)}%;
      top:${burst ? rand(-10,10) : -20}px;
      opacity:1;
    `;

    document.body.appendChild(el);

    const startX = parseFloat(el.style.left);
    const driftX  = rand(-60, 60);
    const fallDur = rand(1800, 3600);
    const rotateDeg = rand(180, 720);
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const prog = (ts - start) / fallDur;
      if (prog >= 1) { el.remove(); return; }

      const yPos = prog * window.innerHeight * 1.3;
      const xPos = startX + driftX * prog + Math.sin(prog * Math.PI * 4) * 18;
      const rot  = prog * rotateDeg;
      const opacity = prog > .8 ? (1 - prog) / .2 : 1;

      el.style.top  = yPos + 'px';
      el.style.left = xPos + '%';
      el.style.transform = `rotate(${rot}deg)`;
      el.style.opacity = opacity;

      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  return { launchBurst, startDrizzle, stopDrizzle };
})();

/* ================================================
   BACKGROUND AMBIENT DECORATIONS  — asset images
   ================================================ */
function initBgDecos(count = 5) {
  const base = (typeof SVG !== 'undefined' && SVG._base) ? SVG._base
    : (window.location.pathname.includes('/pages/') ? '../assets/' : './assets/');

  const positions = [
    { top:'6%',  left:'2%'  }, { top:'18%', right:'3%' },
    { top:'42%', left:'1%'  }, { top:'62%', right:'2%' },
    { top:'84%', left:'3%'  }, { top:'90%', right:'3%' },
  ];
  const files = ['flower 1.png', 'butterfly.png', 'flower 2.png',
                 'love 1.png',   'bow.png',        'sparkle.png'];

  positions.slice(0, count).forEach((pos, i) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:fixed;pointer-events:none;z-index:0;opacity:0.11;
      animation:gentleFloat ${4 + i}s ease-in-out infinite ${i * .6}s;`;
    Object.entries(pos).forEach(([k, v]) => wrap.style[k] = v);
    const sz  = 44;
    const src = base + encodeURIComponent(files[i % files.length]);
    wrap.innerHTML = `<img src="${src}" width="${sz}" height="${sz}"
      alt="" draggable="false" style="object-fit:contain;">`;
    document.body.appendChild(wrap);
  });
}

/* ================================================
   MUSIC PLAYER CONTROLLER
   ================================================ */
function initMusicPlayer(audioSrc = null) {
  const player = document.getElementById('music-player');
  const btn    = document.getElementById('btn-music');
  const label  = document.getElementById('music-label');
  if (!player || !btn) return;

  let audio = null;
  let playing = false;

  // Try to load from sessionStorage if no src given
  if (!audioSrc) {
    try {
      const data = JSON.parse(sessionStorage.getItem('scrapbookData') || '{}');
      if (data.musicDataUrl) { audioSrc = data.musicDataUrl; }
      if (data.musicName && label) label.textContent = data.musicName;
    } catch(e) {}
  }

  if (!audioSrc) { if (player) player.style.display = 'none'; return; }

  audio = new Audio(audioSrc);
  audio.loop = true;
  audio.volume = 0.55;

  btn.addEventListener('click', () => {
    if (playing) { audio.pause(); btn.textContent = '\u25B6'; playing = false; }
    else { audio.play().catch(() => {}); btn.textContent = '\u23F8'; playing = true; }
  });

  // Auto-play after user interaction
  document.addEventListener('click', function autoPlay() {
    if (!playing && audio) { audio.play().then(() => { btn.textContent = '\u23F8'; playing = true; }).catch(()=>{}); }
    document.removeEventListener('click', autoPlay);
  }, { once: true });
}

/* ================================================
   EXPORT
   ================================================ */
window.ScrapAnimations = {
  initFloatingHearts,
  initSparkles,
  initCursorTrail,
  initEntranceAnims,
  initPolaroidTilt,
  initStickerHover,
  initTransitions,
  initBgDecos,
  initMusicPlayer,
};

window.ScrapConfetti = Confetti;
