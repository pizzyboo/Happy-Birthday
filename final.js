/* ================================================
   FINAL PAGE LOGIC — Envelope, Letter, Music
   ================================================ */

'use strict';

/* ── Envelope interaction ────────────────────────
   Click the envelope to open it and reveal the letter.
   ─────────────────────────────────────────────── */
function initEnvelope() {
  /* Supports both .envelope-wrap (old) and .env-outer (new) */
  const envelopeWrap  = document.querySelector('.envelope-wrap') || document.querySelector('.env-outer');
  const letterContainer = document.querySelector('.letter-container');
  const hintText      = document.querySelector('.env-hint');
  let opened = false;

  if (!envelopeWrap || !letterContainer) return;

  envelopeWrap.addEventListener('click', () => {
    if (opened) return;
    opened = true;

    // 1. Open the envelope (CSS class handles animation)
    envelopeWrap.classList.add('open');

    // 2. Hide hint text
    if (hintText) hintText.style.opacity = '0';

    // 3. Reveal letter after flap animation
    setTimeout(() => {
      letterContainer.classList.add('revealed');
    }, 500);

    // 4. Launch confetti burst
    setTimeout(() => {
      ScrapConfetti.launchConfetti(150);
      ScrapConfetti.startConfettiDrizzle(600);
    }, 700);

    // 5. Stop drizzle after 8 seconds (keep it festive but not forever)
    setTimeout(() => {
      ScrapConfetti.stopConfettiDrizzle();
    }, 8000);

    // 6. Scale down envelope slightly after open
    setTimeout(() => {
      envelopeWrap.style.transform = 'scale(0.9) translateY(-10px)';
      envelopeWrap.style.transition = 'transform 0.5s ease';
      envelopeWrap.style.cursor = 'default';
    }, 900);
  });
}

/* ── Background music ────────────────────────────
   Uses the Web Audio API to generate a soft
   gentle melody (no external files needed).
   Falls back gracefully if AudioContext unavailable.
   ─────────────────────────────────────────────── */
let audioCtx = null;
let isPlaying = false;
let melodyTimeout = null;

// A gentle pentatonic-ish melody in C major
const MELODY = [
  // note (freq Hz), duration (s), volume
  [523.25, 0.4, 0.18],  // C5
  [587.33, 0.4, 0.16],  // D5
  [659.25, 0.5, 0.18],  // E5
  [783.99, 0.4, 0.16],  // G5
  [880.00, 0.6, 0.18],  // A5
  [783.99, 0.4, 0.14],  // G5
  [659.25, 0.4, 0.16],  // E5
  [523.25, 0.5, 0.18],  // C5
  [440.00, 0.4, 0.14],  // A4
  [493.88, 0.4, 0.16],  // B4
  [523.25, 0.8, 0.18],  // C5 (long)
  [0,      0.3, 0   ],  // rest
  [659.25, 0.3, 0.14],  // E5
  [698.46, 0.3, 0.14],  // F5
  [783.99, 0.4, 0.16],  // G5
  [880.00, 0.4, 0.16],  // A5
  [987.77, 0.5, 0.18],  // B5
  [880.00, 0.3, 0.14],  // A5
  [783.99, 0.4, 0.16],  // G5
  [659.25, 0.4, 0.16],  // E5
  [587.33, 0.4, 0.14],  // D5
  [523.25, 1.0, 0.18],  // C5 (long)
  [0,      0.5, 0   ],  // rest
];

function playNote(freq, duration, volume, startTime) {
  if (!audioCtx || freq === 0) return;

  const osc   = audioCtx.createOscillator();
  const gain  = audioCtx.createGain();
  const pan   = audioCtx.createStereoPanner();

  // Soft sine wave
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Envelope: gentle attack and release
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.06);
  gain.gain.setValueAtTime(volume, startTime + duration - 0.1);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  // Slight reverb-like second oscillator
  const osc2  = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, startTime);
  gain2.gain.setValueAtTime(0, startTime);
  gain2.gain.linearRampToValueAtTime(volume * 0.15, startTime + 0.06);
  gain2.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.connect(gain);
  gain.connect(pan);
  pan.connect(audioCtx.destination);

  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
  osc2.start(startTime);
  osc2.stop(startTime + duration + 0.05);
}

function playMelody() {
  if (!isPlaying || !audioCtx) return;

  let t = audioCtx.currentTime + 0.05;

  MELODY.forEach(([freq, dur]) => {
    t += dur;
  });

  // Schedule all notes
  let scheduleTime = audioCtx.currentTime + 0.05;
  MELODY.forEach(([freq, dur, vol]) => {
    playNote(freq, dur, vol, scheduleTime);
    scheduleTime += dur;
  });

  // Total melody duration
  const totalDur = MELODY.reduce((s, [, d]) => s + d, 0);

  // Loop
  melodyTimeout = setTimeout(() => {
    if (isPlaying) playMelody();
  }, totalDur * 1000 + 200);
}

function initMusic() {
  const playBtn   = document.querySelector('.btn-music');
  const noteLabel = document.querySelector('.music-note');

  if (!playBtn) return;

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      // Start
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        isPlaying = true;
        playMelody();
        playBtn.textContent = '⏸';
        if (noteLabel) noteLabel.textContent = '🎵';
      } catch(e) {
        console.warn('Web Audio API not available:', e);
        playBtn.textContent = '🔇';
      }
    } else {
      // Pause
      isPlaying = false;
      if (melodyTimeout) clearTimeout(melodyTimeout);
      if (audioCtx) {
        audioCtx.suspend();
      }
      playBtn.textContent = '▶';
      if (noteLabel) noteLabel.textContent = '🎶';
    }
  });
}

/* ── Init everything on final page ── */
document.addEventListener('DOMContentLoaded', () => {
  initEnvelope();
  initMusic();
});

window.ScrapFinal = { initEnvelope, initMusic };
