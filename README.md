# y2kdream

A family of low-saturation, oklch-tuned, "soft on the eyes" themes inspired by the Y2K era — dusty pinks, sage greens, peachy creams, lavender dusks, sky daydreams.

Two scheme families:

- **Original** (dusty / eye-friendly)
- **Euphoria** (vibrant pixel-dreamscape)

Each scheme: 6 color families × light + dark = 12 themes. **24 Warp themes total.**

## Showcases (open in browser)

- `y2kdream-families.html` — original family showcase (palettes + Warp previews)
- `y2kdream-euphoria.html` — euphoria family showcase
- `y2kdream.html` — design system page (tokens + UI mockup + live tweak panel)

## Sub-projects

- `warp-themes/` + `backgrounds/` — Warp terminal themes (here)
- `y2kdream-nvim` — Neovim port (lush.nvim, two combined variants: `y2kdream-hallucinate` + `y2kdream-liminal`)

## Install — Warp

1. Copy chosen `.yaml` from `warp-themes/` and matching `.svg` from `backgrounds/` into `~/.warp/themes/`.
2. Open Warp → Settings → Appearance → Themes → pick your y2kdream variant.

```sh
mkdir -p ~/.warp/themes
cp warp-themes/y2kdream-forest-dark.yaml ~/.warp/themes/
cp backgrounds/forest.svg ~/.warp/themes/
```

## Original (dusty)

| Family   | Light | Dark | Background |
|----------|-------|------|------------|
| Forest   | y2kdream-forest-light.yaml   | y2kdream-forest-dark.yaml   | forest.svg   |
| Peach    | y2kdream-peach-light.yaml    | y2kdream-peach-dark.yaml    | peach.svg    |
| Rose     | y2kdream-rose-light.yaml     | y2kdream-rose-dark.yaml     | rose.svg     |
| Butter   | y2kdream-butter-light.yaml   | y2kdream-butter-dark.yaml   | butter.svg   |
| Lavender | y2kdream-lavender-light.yaml | y2kdream-lavender-dark.yaml | lavender.svg |
| Sky      | y2kdream-sky-light.yaml      | y2kdream-sky-dark.yaml      | sky.svg      |

## Euphoria (vibrant)

| Family   | Light | Dark | Background |
|----------|-------|------|------------|
| Forest   | y2kdream-euphoria-forest-light.yaml   | y2kdream-euphoria-forest-dark.yaml   | euphoria-forest.svg   |
| Peach    | y2kdream-euphoria-peach-light.yaml    | y2kdream-euphoria-peach-dark.yaml    | euphoria-peach.svg    |
| Rose     | y2kdream-euphoria-rose-light.yaml     | y2kdream-euphoria-rose-dark.yaml     | euphoria-rose.svg     |
| Butter   | y2kdream-euphoria-butter-light.yaml   | y2kdream-euphoria-butter-dark.yaml   | euphoria-butter.svg   |
| Lavender | y2kdream-euphoria-lavender-light.yaml | y2kdream-euphoria-lavender-dark.yaml | euphoria-lavender.svg |
| Sky      | y2kdream-euphoria-sky-light.yaml      | y2kdream-euphoria-sky-dark.yaml      | euphoria-sky.svg      |

Background opacity: 35 (original) / 30 (euphoria). Bump down for more contrast.

## Knowledge base

- `inst/` — design notes, palette derivations, philosophy. Backed by private remote `egoisth777/y2kdreams-inst`.
