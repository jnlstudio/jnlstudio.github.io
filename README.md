# JNL Studio | Two Worlds

Main entry for JNL Studio: one studio, two worlds.

Live: https://jnlstudio.github.io/

## Structure

```
docs/                 ← GitHub Pages source (branch main, folder /docs)
├── index.html
└── assets/
    ├── css/styles.css
    ├── js/worlds.js     ← phone split view only
    └── images/
        ├── jewellery-champagne-gold-ribbon.png
        └── creations-pink-3d-layered-ribbon.png
```

Plain HTML, CSS and a small script: no build step, no dependencies.

## Layout

- 901px and up: Jewellery and Creations side by side, menus always shown.
- 768–900px: the two worlds stacked.
- 767px and below: the two worlds side by side at 50/50. Tap one to open it to about 92%; the other folds into a strip that switches to it. Close (×) or Escape returns to 50/50. Without script, phones get the stacked layout.

## Icons

The JNL monogram lives at the site root and is shared by every JNL Studio site on jnlstudio.github.io:

- `docs/favicon.ico`: browser tab (16, 32, 48 px; 16 px uses a bolder Baskerville so it stays legible)
- `docs/apple-touch-icon.png` (180), `docs/icon-192.png`, `docs/icon-512.png`: full badge for home screens
- `docs/site.webmanifest`

Sub-sites link to `/favicon.ico` and `/apple-touch-icon.png`. To change the design, edit `icon-source/jnl-icons.html` and re-render with `icon-source/render.mjs`.

## Links

| World | Item | Destination |
|---|---|---|
| Jewellery | Personalised | https://jnlstudio.github.io/JNLPersonalised/ |
| Jewellery | Curated | https://jnlstudio.github.io/JNLCurated/ |
| Jewellery | View All | https://jnlstudio.github.io/Jewellery/ |
| Creations | Special Edition | https://jnlstudio.github.io/KeychainsGhostface/ |
| Creations | Sand Art Clock | https://jnlstudio.github.io/Clock/ |
| Creations | Home & Lifestyle | Coming soon |
| Creations | View All | https://jnlstudio.github.io/keychains/ |

## Local preview

```bash
python3 -m http.server 8000 -d docs
```

Then open http://localhost:8000/
