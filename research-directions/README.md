# Interactive research demos — website upload package

## Upload location

Copy the entire `research-directions/` folder into the **root** of the `aasad009/aasad009.github.io` repository (at the same level as the existing `index.html`, `assets/`, and `CNAME`). Do **not** replace the repository root index.html or CNAME.

When the site is deployed through GitHub Pages, the intended links are:

- Overview: https://amirreza-asadi.com/research-directions/
- Direction 1: https://amirreza-asadi.com/research-directions/direction-1/
- Direction 2: https://amirreza-asadi.com/research-directions/direction-2/
- Direction 3: https://amirreza-asadi.com/research-directions/direction-3/

These URLs will only work after upload and a successful GitHub Pages rebuild. The folder can be hosted as normal static files, without adding Jekyll templates, package managers, or dependencies.

## Files

- `index.html` — professional landing page with three cards
- `direction-1/index.html` — interactive tissue-to-joint atlas (V6)
- `direction-2/index.html` — fixed, standalone spinal load-transfer demo
- `direction-3/index.html` — micro-to-macro mechanical evolution demo
- `assets/` — offline landing-page preview images

Each demo is a self-contained HTML page with no external scripts or runtime asset fetches. The source files are retained without alterations so existing interaction behavior is preserved.

## Deploy using GitHub web UI

1. Extract the ZIP package locally.
2. Open [the website repository](https://github.com/aasad009/aasad009.github.io).
3. Upload the `research-directions` folder and everything inside it into the repository root (preserving the directory structure), then commit the changes. If the web upload UI does not accept folders, upload the files into their corresponding paths or use Git/GitHub Desktop.
4. Confirm the homepage at `https://amirreza-asadi.com/research-directions/` loads and all three cards open their respective demos.
5. Share the overview URL in the reply email.

## Scientific limitations

These are proposal illustrations, **not validated biological or clinical predictions**. Tissue priors, anatomical geometry, and population or evolutionary trajectories are not yet independently calibrated to comparative experimental measurements. Direction 2 uses a simplified biomechanical transfer model. Direction 3 uses a candidate micro-to-macro mapping, not a discovered or experimentally established universal law.

## Attribution and licenses

The site package contains only authored demos and their screenshots/visualizations. It does **not** bundle downloaded anatomical meshes or third-party libraries. If later substituting real specimen anatomy or external model files, preserve their required licenses and attribution.
