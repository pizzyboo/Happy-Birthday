/* ================================================
   DATA-SEED.JS
   Pre-loads Anin's photos, captions, and letter
   into sessionStorage so every page reflects the
   correct content without going through the generator.

   Called once from index.html or any entry page.
   Safe to call multiple times (checks existing data).
   ================================================ */
'use strict';

(async function seedScrapbookData() {

  /* ── Captions for each photo ── */
  const CAPTIONS = [
    'Bento Coffee',
    'Back from Bandung',
    'Chicken place outing',
    'Before going home',
    'My favourite photo of you',
    'That beautiful outfit',
  ];

  /* ── Short caption shown under polaroid ── */
  const SHORT_CAPTIONS = [
    'Bento Coffee',
    'Bandung trip',
    'Chicken place',
    'Before going home',
    'Always beautiful',
    'That outfit',
  ];

  /* ── Full story shown on photo detail page ── */
  const STORIES = [
    `This was the first time I went to Bento Coffee! I was so happy that we got to hang out together, and I'm really grateful that you invited me. Even though there were a few annoying memories involving someone, that day was still so much fun. I'll always remember it fondly.`,
    `We took this photo after coming back from Bandung! I was genuinely so happy that we got to travel there together. Even though we spent most of the time at your dad's house, I still loved every moment because I got to spend it with you.`,
    `This was when we went out to eat at that famous chicken place, right? Well, even though a few things didn't go as planned, we still managed to have fun together! I loved the food... but I like you even more. LOL.`,
    `This is our latest photo before we went back to our hometowns! I'm so happy and grateful that you all celebrated my birthday. Even though I'm not with you right now, I hope you're always happy, sis. \u2661`,
    `Well... I honestly don't have a story for this one. I just really like this photo of you. Hehe. As always, you're absolutely beautiful!`,
    `Aww... it's such a shame I never got to see you wearing this beautiful outfit in real life! I remember you asked me whether you should buy it, and honestly... it looks so adorable on you. It suits you perfectly. You're as beautiful as always.`,
  ];

  /* ── Letter content ── */
  const LETTER = [
    `First of all, happy birthday to you!`,
    `I'm sorry that I can't be with you on your special day, but I hope this little website can make you smile. This is actually the first project I've ever made for someone, so please forgive me if it's far from perfect. I really hope you like it.`,
    `I don't have an expensive gift for you right now (sorry, sis \uD83D\uDE2D), so for the moment all I can give you are my words and my prayers.`,
    `I'm truly, truly grateful that we became friends. You're such a kind, thoughtful, and beautiful person, and I'm really thankful to have you in my life.`,
    `As you grow another year older, I hope you're always surrounded by kind people who genuinely care about you. I hope your wishes slowly come true, your dreams become reality one by one, and that you continue growing into an even happier and stronger person. Most importantly, I pray that you're always blessed with good health, endless happiness, and abundant opportunities in everything you do.`,
    `Huff... I'm not very good at putting my feelings into words, so I don't really know what else to say.`,
    `But one thing I'll always mean is this:`,
    `Happy Birthday, my twin.`,
    `I hope our friendship lasts for a very, very long time, and that happiness always finds its way to you.`,
    `Enjoy your special day.`,
    `You truly deserve all the love and happiness in the world.`,
  ].join('\n\n');

  /* ── Helper: fetch a local file and encode as base64 data URL ── */
  async function toDataUrl(path) {
    try {
      const resp = await fetch(path);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.warn('[data-seed] Could not load', path, err.message);
      return null;
    }
  }

  /* ── Resolve base path depending on page location ── */
  const isInPages = window.location.pathname.includes('/pages/');
  const assetsBase = isInPages ? '../assets/' : './assets/';

  /* ── Load existing session data so we don't clobber user edits ── */
  let existing = {};
  try {
    existing = JSON.parse(sessionStorage.getItem('scrapbookData') || '{}');
  } catch(e) {}

  /* ── Only seed if photos haven't been loaded yet ── */
  const alreadySeeded = Array.isArray(existing.photos) &&
                        existing.photos.filter(Boolean).length >= 6 &&
                        existing._seeded === true;
  if (alreadySeeded) return;

  /* ── Load all 6 photos in parallel ── */
  const photoDataUrls = await Promise.all(
    [1,2,3,4,5,6].map(n => toDataUrl(`${assetsBase}photo ${n}.jpeg`))
  );

  /* ── Build photos array ── */
  const photos = photoDataUrls.map((dataUrl, i) => {
    if (!dataUrl) return null;
    return {
      dataUrl,
      caption:      SHORT_CAPTIONS[i] || `Memory ${i + 1}`,
      story:        STORIES[i]        || '',
      fullCaption:  CAPTIONS[i]       || `Memory ${i + 1}`,
    };
  });

  /* ── Compose full scrapbook data ── */
  const seedData = {
    title:         'Happy Birthday, Anin!!',
    recipientName: 'Anin',
    senderName:    'your twin',
    letter:        LETTER,
    musicName:     existing.musicName     || '',
    musicDataUrl:  existing.musicDataUrl  || '',
    photos,
    _seeded: true,
  };

  /* ── Save to sessionStorage ── */
  try {
    sessionStorage.setItem('scrapbookData', JSON.stringify(seedData));
    console.info('[data-seed] Scrapbook data seeded successfully (%d photos).', photos.filter(Boolean).length);
  } catch (err) {
    /* Storage quota — try without music */
    try {
      seedData.musicDataUrl = '';
      sessionStorage.setItem('scrapbookData', JSON.stringify(seedData));
      console.warn('[data-seed] Saved without music (storage quota).');
    } catch (err2) {
      console.error('[data-seed] Could not save to sessionStorage:', err2);
    }
  }

})();
