# Website template guide

## Shared structure

- `_layouts/default.html`: common HTML shell, language and direction attributes.
- `_includes/header.html`: shared navigation and English/Persian switch.
- `_includes/footer.html`: shared footer.
- `_includes/seo.html`: canonical, Open Graph, citation metadata, and hreflang.
- `_includes/structured-data.html`: WebSite, ProfilePage, Person, Article, and ScholarlyArticle JSON-LD.
- `_includes/science-background.html`: reusable mechanics-inspired hero graphics.
- `_layouts/publication.html`: reusable English and Persian publication-page template.
- `_layouts/research-topic.html`: reusable long-form research-topic template.

## Adding an English research page

Create `research/<slug>/index.md` with `layout: research-topic`, `lang: en`, an English permalink, and `alternate_url` pointing to its Persian counterpart.

## Adding a Persian research page

Create `fa/research/<slug>/index.md` with `layout: research-topic`, `lang: fa`, `dir: rtl`, and a reciprocal `alternate_url`. Use Persian visible content rather than hidden keyword lists.

## Adding a publication

Create one English file under `_publications/`. Add a Persian summary under `fa/publications/<slug>/index.md`. Give both pages reciprocal `alternate_url` values. Add `graphical_abstract`, descriptive alt text, DOI, authors, journal, abstract, contributions, methods, and BibTeX.

## Global edits

Navigation labels are in `_data/navigation_en.yml` and `_data/navigation_fa.yml`. Global design is in `assets/css/main.css`; publication-only styles are in `assets/css/publication.css`.
