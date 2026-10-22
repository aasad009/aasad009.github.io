# Rainforest visual correction — October 2026

This release fixes two asset issues on the research-directions landing page.

- **Pixel sunglasses:** `researcher-pixel-shades-2026.webp` is produced directly from the provided photograph `Rainforest Hiker with Pixel Shades(1).png`. The older `researcher-portrait-forest.webp` is intentionally removed. The HTML references the new filename to avoid cached versions of the previous photo.
- **Rainforest header:** `rainforest-header-2026.webp` adds a lush illustrated rainforest landscape. It is an AI-generated, atmospheric background, not a documentary image of a specific field location. A dark CSS overlay preserves text readability.
- **Social preview:** `research-directions-share-rainforest-2026.jpg` supplies a matching Open Graph card.

**Upload the entire `research-directions` folder to the repository root**, replacing the previous folder. For a definite refresh, delete the old portrait asset and commit the new file paths. After GitHub Pages deploys, check in a private window. The homepage HTML refers to new filenames, so clearing the whole browser cache should not be required.

The three existing interactive demos, proposals, and scientific calculations are unchanged.
