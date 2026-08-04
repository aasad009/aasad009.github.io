# Website template system

This repository now uses **Jekyll**, the static-site generator built into GitHub Pages.
You edit shared templates and data once; GitHub generates every page automatically.

## Global changes

- Navigation: `_data/navigation.yml`
- Header/logo: `_includes/header.html`
- Footer: `_includes/footer.html`
- SEO tags: `_includes/seo.html`
- Shared page shell: `_layouts/default.html`
- Publication page design: `_layouts/publication.html`
- Homepage styling: `assets/css/main.css`
- Publication styling: `assets/css/publication.css`

Changing any of these files updates every applicable page on the next GitHub Pages build.

## Add a publication

1. Copy one file in `_publications/`.
2. Rename it, for example `_publications/new-paper.md`.
3. Edit only the YAML fields at the top.
4. Add a matching visual include only when a new custom diagram is wanted.

The homepage publication list and the paper page are generated automatically.

## Add or remove a navigation item

Edit `_data/navigation.yml` once. Do not edit individual pages.

## GitHub deployment

Upload this structure to the repository root. Keep these existing image files in the root:

- `Logo.png`
- `profile.png`
- `award-poster-2026.jpg`

In GitHub: Settings → Pages → Build and deployment → Source → **Deploy from a branch**.
Select the `main` branch and `/ (root)` folder. GitHub Pages will run Jekyll automatically.

## Local preview (optional)

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`.
