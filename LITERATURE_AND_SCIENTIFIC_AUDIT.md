# Literature and readability audit — 21 October 2026

This is a source-grounded editorial review of the complete GitHub Pages package, including the three interactive pages, embedded proposals, linked Word copies, and home page. The original demo mechanics, controls and imagery have been retained; the revised research prose and references were updated together in HTML and Word.

## Confirmed literature and changes

**Musculoskeletal atlas** — Added Riem et al. (2026), *Journal of Applied Physiology*, DOI 10.1152/japplphysiol.00772.2025: quantitative bone–muscle-volume correlations in 102 healthy humans, not a cross-species atlas. Also emphasized Demuth et al. (2022), DOI 10.1038/s41598-022-07074-x, whose 3D polygonal reconstructions were compared with measured muscle masses. Removed suggestions that muscle reconstruction or bone–muscle correlations are original; defined the intended new result as anatomically meaningful, well-calibrated prediction on a completely withheld clade. Bishop & Pierce's 2024 (two Anatomical Record papers) and 2026 (MCZ Bulletin) reconstructions are cited as established anatomy.

**Joint-function sets** — Added Dalman & Saul (2026), *Journal of Biomechanics*, DOI 10.1016/j.jbiomech.2025.113114, which found ligament slack length influential when propagating soft-tissue uncertainty in a shoulder model. The proposal now explicitly competes against uncertainty in attachments, slack length and prestrain. Wright & Pierce (2026), DOI 10.1242/jeb.251911, experimentally distinguished tissue-layer contributions in tegu versus opossum; the proposal acknowledges those discoveries are already published. The seven-family isotropic hyperelastic atlas remains an approach to uncertainty, not a sufficient animal muscle law.

**Whole-spine mechanics** — Added Gillet, Jones & Pierce (2024), DOI 10.1038/s41467-024-51963-w, on cetacean axial regionalization, and Roberts & Head (2026), DOI 10.1038/s41467-026-72071-x, which finds complex regionalization in multiple reptile lineages. Removed framing suggesting that regionalized spines are exclusive to mammals. Jones et al. (2024), DOI 10.1098/rspb.2024.0820, and Dryad 10.5061/dryad.2547d7wx9 remain explicit *digital bending* baselines, not full loaded intact-spine experimental data.

**User's contributions** — Existing website links and framing distinguish published experimental-design and PI-UNet computational benchmarks from the 2026 bioRxiv constitutive atlas preprint. No vertebrate experiments are claimed from these papers.

## Limits reviewers would still see

- This is a strong, testable *research agenda*, not current validation. Secured access to diverse specimen-matched bone and muscle data is unknown.
- Muscle identity and homology require an anatomist; neither bone geometry nor mechanical screening uniquely recovers muscle architecture or force.
- Joint results require loads, contacts, attachments and anisotropic/active tissue physics. A two-DOF demonstration is not equivalent to a validated six-DOF animal model.
- Coupled-spine mechanics must beat the independent-joint null on actual held-out intact-spine data; artificial stiffness shuffling is not an evolutionary trajectory.
- The current demos remain purely illustrative. Do not label their numerical predictions empirical or calibrated to taxon-specific specimens.
- The 2026 reference audit used the specific closest sources cited above; it is not a claim that every publication in global literature through October 2026 was exhaustively indexed.

## Reviewer conclusion

Section headings were rewritten for readability (including "What previous research establishes—and what remains open" and "What would count as evidence"). The three proposals are more precise and better grounded in near-current literature than the supplied versions. Their novelty claims are framed as future blinded predictions and evolutionary/comparative tests, not established breakthroughs. The strongest immediate risk is empirical data access; a second risk is overselling illustrative 2D models as real anatomy, which the demo labeling avoids. No observational study was performed here.

**Verification record:** All 3 DOCX files rendered to 2 pages each with no overflow in the page previews. All HTML local image/link paths exist, 3/3 demo JavaScript logic remains byte-for-byte the same as the source package, and JS syntax checks pass. A fresh graphical browser test could not run because this execution environment blocks navigation to its temporary localhost server. Previous demo behaviors were not revalidated visually in this pass.
