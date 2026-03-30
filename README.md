# Shaurya Harkar Resume Website

A polished terminal-inspired resume website built as a static site for GitHub Pages.

## Stack

- HTML
- CSS
- JavaScript
- JSON-driven content
- GitHub Pages static hosting

## Local Preview

Serve the repository root so `data.json` can be loaded correctly:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Content Updates

- Edit `data.json` to update resume content.
- Replace `profile.jpg` to change the portrait.

## Deployment

Use GitHub Pages with:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

The `.nojekyll` file is included so GitHub Pages serves the static files directly.

Pages URL:

```text
https://harkarshaurya-eng.github.io/Shaurya-Harkar-Resume/
```
