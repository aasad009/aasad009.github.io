PI-UNet Convergence Viewer
==========================

This folder is ready to upload to a static website repository.

Generated content
-----------------
index.html
manifest.json
data/reference.bin
data/frame_*.bin

Recommended repository location
-------------------------------
assets/interactive/piunet-convergence/

Recommended HTML/Jekyll embed
-----------------------------
<div class="piunet-viewer-frame">
  <iframe
    src="{{ '/assets/interactive/piunet-convergence/index.html' | relative_url }}"
    title="Interactive PI-UNet C10, C01, and shear-modulus convergence viewer"
    loading="lazy"
    allowfullscreen>
  </iframe>
</div>

Recommended CSS
---------------
.piunet-viewer-frame {
  width: 100%;
  height: min(820px, 88vh);
  min-height: 680px;
  overflow: hidden;
  border: 1px solid rgba(120, 130, 150, 0.35);
  border-radius: 16px;
  background: #fff;
}

.piunet-viewer-frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

Preview note
------------
The viewer loads manifest.json and compressed binary frames with fetch().
Opening index.html directly from a local file may therefore be blocked.
Preview it through a web server or after uploading to GitHub Pages.

Local preview:
  cd piunet_convergence_viewer
  python -m http.server 8000

Then open:
  http://localhost:8000/

Export summary
--------------
Source shape:          (128, 128, 128)
Website shape:         (32, 32, 32)
Exported snapshots:    101
Compressed data size:  21.99 MiB
Uncompressed size:     25.62 MiB
