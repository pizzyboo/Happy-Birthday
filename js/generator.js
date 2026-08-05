/* ================================================
   GENERATOR.JS — Scrapbook Birthday Website Generator
   Handles: photo uploads, captions, name/title editing,
   birthday letter, music upload, and scrapbook generation.
   ================================================ */
'use strict';

const ScrapGenerator = (() => {

  /* ── State ── */
  const state = {
    photos: [],       // Array of { dataUrl, caption, file }
    title: '',
    recipientName: '',
    senderName: '',
    letter: '',
    musicFile: null,
    musicName: '',
    maxPhotos: 9,
  };

  /* ── DOM refs ── */
  let titleInput, recipientInput, senderInput, letterTextarea;
  let musicFileInput, musicNameDisplay;
  let uploadSlots = [];

  /* ── Init ── */
  function init() {
    titleInput      = document.getElementById('gen-title');
    recipientInput  = document.getElementById('gen-recipient');
    senderInput     = document.getElementById('gen-sender');
    letterTextarea  = document.getElementById('gen-letter');
    musicFileInput  = document.getElementById('gen-music');
    musicNameDisplay = document.getElementById('music-name');

    if (titleInput)     titleInput.addEventListener('input', updatePreviewTitle);
    if (recipientInput) recipientInput.addEventListener('input', updatePreviewRecipient);
    if (letterTextarea) letterTextarea.addEventListener('input', autoResizeTextarea);

    if (musicFileInput) {
      musicFileInput.addEventListener('change', handleMusicUpload);
    }

    buildUploadSlots();

    const generateBtn = document.getElementById('btn-generate');
    if (generateBtn) generateBtn.addEventListener('click', handleGenerate);

    // Load from sessionStorage if available (for back navigation)
    loadFromSession();
  }

  /* ── Build photo upload slots ── */
  function buildUploadSlots() {
    const grid = document.getElementById('upload-grid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 0; i < state.maxPhotos; i++) {
      const slot = createUploadSlot(i);
      grid.appendChild(slot);
      uploadSlots.push(slot);
    }
  }

  /* ── Create a single upload slot ── */
  function createUploadSlot(index) {
    const slot = document.createElement('div');
    slot.className = 'upload-slot';
    slot.setAttribute('aria-label', `Photo ${index + 1} upload slot`);
    slot.dataset.index = index;

    // Hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.setAttribute('aria-label', `Upload photo ${index + 1}`);
    fileInput.addEventListener('change', (e) => handlePhotoUpload(e, index));

    // Plus icon
    const icon = document.createElement('div');
    icon.className = 'slot-icon';
    icon.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="13" stroke="rgba(196,122,138,0.5)" stroke-width="1.5" stroke-dasharray="3 2"/>
        <line x1="14" y1="8" x2="14" y2="20" stroke="#d9909e" stroke-width="2" stroke-linecap="round"/>
        <line x1="8" y1="14" x2="20" y2="14" stroke="#d9909e" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>add photo</span>`;

    // Caption input (shown after photo added)
    const captionWrap = document.createElement('div');
    captionWrap.className = 'slot-caption';
    captionWrap.style.display = 'none';
    const captionInput = document.createElement('input');
    captionInput.type = 'text';
    captionInput.placeholder = 'add a caption...';
    captionInput.maxLength = 40;
    captionInput.setAttribute('aria-label', `Caption for photo ${index + 1}`);
    captionInput.addEventListener('input', (e) => {
      if (state.photos[index]) state.photos[index].caption = e.target.value;
      saveToSession();
    });
    captionInput.addEventListener('click', (e) => e.stopPropagation());
    captionWrap.appendChild(captionInput);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'slot-remove';
    removeBtn.setAttribute('aria-label', `Remove photo ${index + 1}`);
    removeBtn.innerHTML = '&times;';
    removeBtn.style.cssText = `
      position:absolute;top:4px;right:4px;background:rgba(255,255,255,.85);
      border:1px solid rgba(196,122,138,.4);border-radius:50%;
      width:20px;height:20px;font-size:.75rem;cursor:pointer;
      display:none;align-items:center;justify-content:center;
      color:#8b4055;z-index:20;padding:0;line-height:1;
    `;
    removeBtn.addEventListener('click', (e) => { e.stopPropagation(); removePhoto(index); });

    slot.appendChild(fileInput);
    slot.appendChild(icon);
    slot.appendChild(captionWrap);
    slot.appendChild(removeBtn);

    // Click to trigger file input
    slot.addEventListener('click', () => { if (!state.photos[index]) fileInput.click(); });

    return slot;
  }

  /* ── Handle photo upload ── */
  function handlePhotoUpload(e, index) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      state.photos[index] = { dataUrl, caption: state.photos[index]?.caption || '', file };

      const slot = uploadSlots[index];
      if (!slot) return;

      // Show preview image
      let preview = slot.querySelector('.slot-preview');
      if (!preview) {
        preview = document.createElement('img');
        preview.className = 'slot-preview';
        preview.alt = `Photo ${index + 1}`;
        slot.insertBefore(preview, slot.querySelector('.slot-caption'));
      }
      preview.src = dataUrl;

      // Hide plus icon, show caption & remove btn
      const icon = slot.querySelector('.slot-icon');
      const captionWrap = slot.querySelector('.slot-caption');
      const removeBtn = slot.querySelector('.slot-remove');
      if (icon) icon.style.display = 'none';
      if (captionWrap) {
        captionWrap.style.display = 'block';
        const captionInput = captionWrap.querySelector('input');
        if (captionInput && state.photos[index].caption) captionInput.value = state.photos[index].caption;
      }
      if (removeBtn) removeBtn.style.display = 'flex';

      updatePhotoCount();
      saveToSession();
    };
    reader.readAsDataURL(file);
  }

  /* ── Remove a photo ── */
  function removePhoto(index) {
    delete state.photos[index];
    const slot = uploadSlots[index];
    if (!slot) return;

    const preview = slot.querySelector('.slot-preview');
    const icon = slot.querySelector('.slot-icon');
    const captionWrap = slot.querySelector('.slot-caption');
    const removeBtn = slot.querySelector('.slot-remove');
    if (preview) preview.remove();
    if (icon) icon.style.display = '';
    if (captionWrap) { captionWrap.style.display = 'none'; const ci = captionWrap.querySelector('input'); if (ci) ci.value = ''; }
    if (removeBtn) removeBtn.style.display = 'none';

    updatePhotoCount();
    saveToSession();
  }

  /* ── Update photo count display ── */
  function updatePhotoCount() {
    const count = state.photos.filter(Boolean).length;
    const counter = document.getElementById('photo-count');
    if (counter) counter.textContent = `${count} photo${count !== 1 ? 's' : ''} added`;
  }

  /* ── Handle music upload ── */
  function handleMusicUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    state.musicFile = file;
    state.musicName = file.name.replace(/\.[^.]+$/, '');
    if (musicNameDisplay) {
      musicNameDisplay.textContent = state.musicName;
      musicNameDisplay.style.opacity = '1';
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.musicDataUrl = ev.target.result;
      saveToSession();
    };
    reader.readAsDataURL(file);
  }

  /* ── Update preview title live ── */
  function updatePreviewTitle(e) {
    state.title = e.target.value;
    const preview = document.getElementById('preview-title');
    if (preview) preview.textContent = state.title || 'Happy Birthday!';
    saveToSession();
  }

  /* ── Update recipient name live ── */
  function updatePreviewRecipient(e) {
    state.recipientName = e.target.value;
    const previews = document.querySelectorAll('.preview-recipient');
    previews.forEach(el => { el.textContent = state.recipientName || 'you'; });
    saveToSession();
  }

  /* ── Auto-resize textarea ── */
  function autoResizeTextarea(e) {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    state.letter = el.value;
    saveToSession();
  }

  /* ── Collect current form values ── */
  function collectFormValues() {
    if (titleInput)     state.title         = titleInput.value.trim();
    if (recipientInput) state.recipientName = recipientInput.value.trim();
    if (senderInput)    state.senderName    = senderInput.value.trim();
    if (letterTextarea) state.letter        = letterTextarea.value.trim();

    // Sync captions from inputs
    uploadSlots.forEach((slot, i) => {
      if (state.photos[i]) {
        const captionInput = slot.querySelector('.slot-caption input');
        if (captionInput) state.photos[i].caption = captionInput.value.trim();
      }
    });
  }

  /* ── Validate before generating ── */
  function validate() {
    const photos = state.photos.filter(Boolean);
    if (photos.length === 0) {
      showValidationMsg('Please add at least one photo to create your scrapbook.');
      return false;
    }
    if (!state.recipientName && recipientInput) {
      recipientInput.focus();
      showValidationMsg("Please enter the birthday person's name.");
      return false;
    }
    return true;
  }

  function showValidationMsg(msg) {
    let toast = document.getElementById('gen-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gen-toast';
      toast.style.cssText = `
        position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
        background:linear-gradient(135deg,#fce8ed,#fdf0f4);
        border:1.5px solid rgba(196,122,138,.45);border-radius:24px;
        padding:12px 24px;font-family:'Indie Flower',cursive;
        font-size:.95rem;color:#8b4055;
        box-shadow:0 6px 24px rgba(180,80,100,.22);
        z-index:9999;opacity:0;transition:opacity .3s ease;
        text-align:center;max-width:88vw;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3500);
  }

  /* ── Handle generate button ── */
  function handleGenerate(e) {
    e.preventDefault();
    collectFormValues();
    if (!validate()) return;
    saveToSession();

    // Navigate to preview
    const btn = document.getElementById('btn-generate');
    if (btn) {
      btn.textContent = 'Creating your scrapbook...';
      btn.style.pointerEvents = 'none';
    }
    setTimeout(() => { window.location.href = 'pages/preview.html'; }, 400);
  }

  /* ── Save state to sessionStorage ── */
  function saveToSession() {
    const toSave = {
      title:         state.title,
      recipientName: state.recipientName,
      senderName:    state.senderName,
      letter:        state.letter,
      musicName:     state.musicName,
      musicDataUrl:  state.musicDataUrl || '',
      photos: state.photos.map(p => p ? { dataUrl: p.dataUrl, caption: p.caption } : null),
    };
    try {
      sessionStorage.setItem('scrapbookData', JSON.stringify(toSave));
    } catch(err) {
      // sessionStorage full — skip silently
      console.warn('sessionStorage full, skipping save:', err);
    }
  }

  /* ── Load from sessionStorage ── */
  function loadFromSession() {
    try {
      const raw = sessionStorage.getItem('scrapbookData');
      if (!raw) return;
      const data = JSON.parse(raw);

      if (data.title && titleInput) {
        titleInput.value = data.title;
        state.title = data.title;
      }
      if (data.recipientName && recipientInput) {
        recipientInput.value = data.recipientName;
        state.recipientName = data.recipientName;
      }
      if (data.senderName && senderInput) {
        senderInput.value = data.senderName;
        state.senderName = data.senderName;
      }
      if (data.letter && letterTextarea) {
        letterTextarea.value = data.letter;
        state.letter = data.letter;
        letterTextarea.style.height = letterTextarea.scrollHeight + 'px';
      }
      if (data.musicName) {
        state.musicName = data.musicName;
        state.musicDataUrl = data.musicDataUrl;
        if (musicNameDisplay) { musicNameDisplay.textContent = data.musicName; musicNameDisplay.style.opacity = '1'; }
      }
      if (Array.isArray(data.photos)) {
        data.photos.forEach((p, i) => {
          if (p && p.dataUrl) {
            state.photos[i] = { dataUrl: p.dataUrl, caption: p.caption || '' };
            restorePhotoSlot(i, p.dataUrl, p.caption || '');
          }
        });
        updatePhotoCount();
      }
    } catch(err) {
      console.warn('Could not load session data:', err);
    }
  }

  /* ── Restore a slot visually from saved data ── */
  function restorePhotoSlot(index, dataUrl, caption) {
    const slot = uploadSlots[index];
    if (!slot) return;

    let preview = slot.querySelector('.slot-preview');
    if (!preview) {
      preview = document.createElement('img');
      preview.className = 'slot-preview';
      preview.alt = `Photo ${index + 1}`;
      slot.insertBefore(preview, slot.querySelector('.slot-caption'));
    }
    preview.src = dataUrl;

    const icon = slot.querySelector('.slot-icon');
    const captionWrap = slot.querySelector('.slot-caption');
    const removeBtn = slot.querySelector('.slot-remove');
    if (icon) icon.style.display = 'none';
    if (captionWrap) {
      captionWrap.style.display = 'block';
      const ci = captionWrap.querySelector('input');
      if (ci && caption) ci.value = caption;
    }
    if (removeBtn) removeBtn.style.display = 'flex';
  }

  /* ── Public API ── */
  return { init, getState: () => state };

})();

/* ── Auto-init on DOM ready ── */
document.addEventListener('DOMContentLoaded', ScrapGenerator.init);
