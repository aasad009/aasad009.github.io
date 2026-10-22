# Rainforest landing-page update — October 21, 2026

This is an updated copy of the existing literature-audited comparative vertebrate biomechanics site. All research proposals, references, existing demo pages, imagery, and research-foundation framing are retained.

## New landing-page features

- **Glass-clinging gecko** enters once on page load, lands at the center, holds for approximately half a second, and exits. Its element is removed when the animation ends.
- **Rain droplets** attached to the rainforest-background glass layer. Droplets are lightweight CSS gradients with occasional small drips, concentrated away from the text.
- **Flying birds** cross the rainforest header with randomized positions, headings, sizes, and flights. Bird animations stop when the hero moves out of view or the tab is hidden; at most four are present simultaneously.
- **Rainforest ambience with soft musical pads**, a self-contained 32-second MP3 loop synthesized for this site. There are no external audio URLs or third-party music licenses. Sound is kept low and can be muted by the user in the header.

## Autoplay behavior

Browsers generally prevent unmuted autoplay. Sound starts at the first visitor gesture permitted by the browser, or when the user presses **Play rainforest sound**. It pauses when the tab is hidden. It will not force playback after the visitor deliberately mutes it.

## Accessibility and performance

- All decorative graphics have `aria-hidden="true"` and do not intercept pointer events.
- The audio toggle has an accessible label, pressed state, and visible focus treatment.
- `prefers-reduced-motion: reduce` disables the gecko's entrance, bird flights and moving droplets.
- New files are packaged locally: no animation libraries, fonts, CDN, or external services.

## Changed files

- `research-directions/index.html` — new overlay containers, audio button, audio element and asset references.
- `research-directions/assets/gecko-glass.svg` — transparent gecko graphic.
- `research-directions/assets/rainforest-effects.css` — all landing-page atmosphere styling.
- `research-directions/assets/rainforest-effects.js` — interactive effects and playback controls.
- `research-directions/assets/rainforest-ambience.mp3` — synthesized 32-second looping soundscape.

## How to publish

Upload/merge **the contents of `research-directions/`** over the existing `/research-directions/` directory in GitHub Pages or the actual hosting repository. Keep the relative `assets/` directory; do not upload only `index.html`. All three `direction-*` demos remain included and unchanged.

## Validation

- JavaScript passed `node --check`.
- New asset paths and all three demo link targets were verified against the packaged folder.
- Audio format, duration and bitrate were verified with `ffprobe`.
- A headless browser end-to-end screenshot test was attempted, but this environment's Chromium navigation policy blocked even localhost/file URLs. Therefore cross-browser visual behavior should be checked on a deployed preview before public release.
