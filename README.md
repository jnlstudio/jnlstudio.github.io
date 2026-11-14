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

One JNL monogram (Didot Bold on a solid rounded tile, no border), each JNL Studio site in its own colours:

| Site | Tile | Letters |
|---|---|---|
| Two Worlds (this site) | `#805A20` deep gold | `#FAF5E9` cream |
| Jewellery | `#49362b` espresso | `#f8f3ec` cream |
| JNL Personalised | `#9c6656` rose gold | `#fbf1ea` pearl |
| JNL Curated | `#0c0a09` black | `#d8bb7a` champagne |
| Clock | `#223e36` forest | `#e8bb62` mustard |
| KeychainsGhostface | `#f06495` pink | `#0e0d0c` black |
| keychains | `#c82919` red | `#ffffff` white |

This site: `docs/favicon.ico` (16/32/48, rounded tile), `docs/apple-touch-icon.png` (180), `docs/icon-192.png`, `docs/icon-512.png` (full-bleed), `docs/site.webmanifest`. Each sub-site keeps its own `favicon.ico` + `apple-touch-icon.png` in its repo root.

To change colours or the design: edit `icon-source/jnl-tile-icons.html`, then `node icon-source/render-all.mjs "$PWD/icon-source/jnl-tile-icons.html" <out-folder>` (needs Chrome and the Mac's Didot font). The earlier scalloped badge is kept as `icon-source/jnl-badge-v1.html`.

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
