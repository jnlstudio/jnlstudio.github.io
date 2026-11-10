# JNL Studio | Two Worlds

Main entry for JNL Studio: one studio, two worlds.

Live: https://jnlstudio.github.io/

## Structure

```
docs/                 ← GitHub Pages source (branch main, folder /docs)
├── index.html
└── assets/
    ├── css/styles.css
    └── images/
        ├── jewellery-champagne-gold-ribbon.png
        └── creations-pink-3d-layered-ribbon.png
```

Plain HTML and CSS: no build step, no dependencies.

## Links

| World | Item | Destination |
|---|---|---|
| Jewellery | Personalised | https://jnlstudio.github.io/JNLPersonalised/ |
| Jewellery | Curated | https://jnlstudio.github.io/JNLCurated/ |
| Jewellery | View All | https://jnlstudio.github.io/Jewellery/ |
| Creations | Special Edition | https://jnlstudio.github.io/KeychainsGhostface/ |
| Creations | Tile Time Clock | https://jnlstudio.github.io/Clock/ |
| Creations | Custom Designs | Coming soon |
| Creations | View All | https://jnlstudio.github.io/keychains/ |

## Local preview

```bash
python3 -m http.server 8000 -d docs
```

Then open http://localhost:8000/
