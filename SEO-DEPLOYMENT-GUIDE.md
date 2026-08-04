# Multilingual SEO deployment

This version adds English and Persian search architecture without automatic language redirection.

## Main additions

- Stable `Person` identity linking Amirreza Asadi, Amir Asadi, A. Asadi, امیررضا اسدی, and امیر اسدی.
- Root `WebSite` and `ProfilePage` structured data.
- English and Persian URLs connected with reciprocal `hreflang` and `x-default` tags.
- Persian homepage, research-topic pages, and publication-summary pages.
- English evergreen research-topic pages for broader searches beyond exact paper titles.
- Descriptive graphical-abstract filenames, alt text, Open Graph images, and image sitemap entries.
- Publication authors linked to the same person entity.
- Visible publication funding acknowledgments.

## After uploading

1. Wait for GitHub Pages to complete the deployment.
2. Open `/sitemap.xml` and confirm that English and Persian URLs appear.
3. In Google Search Console, resubmit `sitemap.xml`.
4. Inspect and request indexing for `/`, `/fa/`, the six research-topic pages, and the four publication pages.
5. Validate the home page and publication pages in Schema Markup Validator.
6. Add `https://amirreza-asadi.com/` to Google Scholar, ORCID, LinkedIn, GitHub, and any available UCR profile.

Google may take days to weeks to recrawl and reassess rankings. No code change can guarantee a first-place result.
