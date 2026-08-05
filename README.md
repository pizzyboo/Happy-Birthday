# 🎂 Happy Birthday Scrapbook Website

A handcrafted, cutecore digital scrapbook built with pure HTML, CSS, and JavaScript.

## How to Use

1. **Open `index.html`** in any modern browser — no server needed.

## Adding Your Own Photos

Each photo page has a placeholder `<div>` inside `.img-wrap`. Replace it with a real `<img>` tag:

```html
<!-- Remove this div: -->
<div class="img-placeholder pp1"> ... </div>

<!-- Add this instead: -->
<img src="../images/photo1.jpg" alt="Your description here" />
```

Save your photos to the `images/` folder and name them:
- `images/photo1.jpg` → photo1.html
- `images/photo2.jpg` → photo2.html
- `images/photo3.jpg` → photo3.html
- `images/photo4.jpg` → photo4.html
- `images/photo5.jpg` → photo5.html

## Personalising the Letter

Edit the letter text in `pages/final.html` inside the `.letter-paper` div.
Change the greeting, body paragraphs, and signature to your own words.

## Project Structure

```
Happy-Birthday/
├── index.html          ← Homepage (scrapbook collage)
├── css/
│   ├── style.css       ← Shared styles, palette, fonts, animations
│   ├── home.css        ← Homepage-specific layout
│   ├── photo.css       ← Photo detail pages
│   └── final.css       ← Envelope, letter, confetti, music
├── js/
│   ├── utils.js        ← Helper functions
│   ├── animations.js   ← Hearts, sparkles, entrance effects
│   ├── transitions.js  ← Page fade transitions
│   ├── confetti.js     ← Confetti system
│   └── final.js        ← Envelope animation + Web Audio music
├── pages/
│   ├── photo1.html     ← Memory 1: Sunshine & Smiles
│   ├── photo2.html     ← Memory 2: Always Dreaming
│   ├── photo3.html     ← Memory 3: Golden Hours
│   ├── photo4.html     ← Memory 4: Wild & Free
│   ├── photo5.html     ← Memory 5: Counting Stars
│   └── final.html      ← Envelope + Letter + Confetti + Music
├── images/             ← Add your photos here
└── assets/             ← Any extra assets
```
