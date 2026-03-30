# Shaurya Harkar Resume Website

A polished terminal-inspired resume website built as a static site for GitHub Pages.

## Stack

- HTML
- CSS
- JavaScript
- JSON-driven content
- GitHub Pages deployment via GitHub Actions

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

This repo includes `.github/workflows/deploy-pages.yml`.

After pushing to `main`, GitHub Actions will publish the static site to GitHub Pages using:

- `index.html`
- `styles.css`
- `main.js`
- `data.json`
- `profile.jpg`

Expected Pages URL:

```text
https://harkarshaurya-eng.github.io/Shaurya-Harkar-Resume/
```
