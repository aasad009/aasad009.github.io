# Simulated evolutionary-biology reviewer evaluation — three interactive demonstrations

**Date:** 21 October 2026. **Reviewer status:** An independent, skeptical review *simulated by ChatGPT*, not an assessment by Stephanie Pierce or any member of her lab. **Evidence:** Standalone source inspection and Chromium interaction tests (in-memory HTML because local-server navigation was blocked by the execution environment); no biological specimen measurements.

## Comparative judgment

| Evaluated aspect | Bones → missing muscles | Soft tissue → joint inference | Regionalized spine → whole-column mechanics |
|---|---:|---:|---:|
| Addresses a concrete evolutionary question | 9.0 | 9.1 | 9.0 |
| Distinguishes established work from proposed novelty | 8.7 | 8.6 | 8.8 |
| Interactive clarity and immediate accessibility | 8.8 | 8.7 | 8.7 |
| Alternative hypotheses and counterfactual controls | 8.5 | 8.6 | 9.0 |
| Explicit uncertainty/assumption labeling | 8.7 | 8.2 | 8.9 |
| Operational reproducibility of the demo | 8.6 | 8.5 | 9.0 |
| Biological/anatomical realism of *the synthetic demo* | 5.5 | 5.5 | 5.0 |
| Validation on actual extant/fossil specimens | Not performed | Not performed | Not performed |

These illustrative 0–10 ratings are an author's reviewer rubric; they are **not** independent or empirical scores. The demos communicate the research questions effectively but cannot substitute for planned comparative zoological or paleontological data. Scores for realistic biological validity cannot honestly exceed 8 before further specimen-derived modeling and evaluation.

## Demo A — Which Muscles Can Fossil Bones Actually Predict?

**Closest-competitor issue.** Extant phylogenetic bracketing, published Bishop–Pierce muscle maps, and 3D polygonal muscle reconstruction already exist. The intended contribution is not a new claim of bone-to-muscle reconstruction in general: it is a formal characterization of what is and is not identifiable, with held-out phylogenetic calibration and mechanical constraints that improve independently measured anatomy or moment arms.

**Interactive experiments provided.** Select synthetic skeletal configurations and preservation levels; compare size-only, bracketing and mechanics-screen approaches; adjust prior breadth and screening strength; choose two schematic muscle groups; reveal a synthetic held-out path. The resulting candidate sets, accepted counts and central 80% path interval update. A fossil-like configuration intentionally has no soft-tissue ground truth. All values are 2D nondimensional proxies.

**Actual numerical checks.** With the same synthetic default, the mechanics-screen retained 259/320 candidates at threshold 50; 316/320 at threshold 0; and 130/320 at threshold 100. The size-only control retained all 320 unfiltered candidates. Stronger screening thus reduces candidate count as expected. Synthetic coverage of one reference was shown but deliberately not called calibration.

**Remaining critical concerns.** The bone geometry and paths are schematic, not registered 3D animal anatomy; the filter uses abstract geometry and moment-arm proxies, not validated muscle wrapping, physiological force–length curves or volumetric packing. Bayesian interval calibration is **not** established; intervals come from synthetic input distributions. Before presenting a paper, test leave-one-lineage-out coverage and uncertainty width on registered extant CT/diceCT and dissection data.

## Demo B — When Does Missing Soft Tissue Change an Evolutionary Conclusion?

**Closest-competitor issue.** APSE and experimentally documented tissue-removal effects precede this project. This demo's claim is not that soft tissues affect movement; it is that multiple anatomically and constitutively compatible tissues could change the *robustness* of a prespecified between-taxon mechanical comparison.

**Interactive experiments provided.** Four retained tissue-response selections; PCA response atlas; animated synthetic hip; reduced-order feasible-motion envelope; counterfactual that changes geometry and material response separately and together. It maintains a separate under-demo research proposal stating the 6-DOF, load-achievable and phylogenetic validation plan.

**Actual control check.** Changing the simulated geometry and material selections switched the displayed sign of the comparative functional contrast. These are toy calculations, **not** observed evolutionary reversals. No JavaScript runtime errors were detected in Chromium.

**Remaining critical concerns.** A reduced-order 2-DOF toy hip is not a 6-DOF biomechanical restoration. Tissue response library/prior maps are unvalidated for fossil taxa, and real active locomotor functions require more than passive pose viability. No direct claims about prehistoric locomotion are supported.

## Demo C — Did Vertebral Regionalization Change What the Whole Spine Can Do?

**Closest-competitor issue.** The Pierce–Jones vertebral studies already studied anatomy and jointwise mobility. The proposed additional experiment is whether **whole-column mechanical coupling** changes held-out deformation predictions and inferential conclusions in a way that isolated-joint models miss.

**Interactive experiments provided.** Regionally clustered versus shuffled segments with the same stiffness inventory; lateral, sagittal and torsional loading; adjustable neighbor-joint coupling; a segment-level response histogram and whole-spine comparison. This is a dimensionless 10-joint thought experiment.

**Analytical null test.** At coupling 0, the simulated observed and shuffled columns both generated 37.9° total rotation, with exactly +0.0% difference. At nonzero coupling (default 0.7), they differed by +5.6% for the default scenario. These values are model outputs, **not evolutionary measurements or calibrated taxon parameters**.

**Remaining critical concerns.** Joint stiffness values, species configurations and couplings are hypothetical; no rib, muscle, ligament or contact calibration has occurred. Some qualitative regional-order effects can emerge from assumptions about the coupling law; a successful biological study must outperform an analytic independent-joint baseline on held-out extant whole-column load–deformation measurements and compare fossil configurations under identical scaled loading and phylogenetic controls.

## Site usability and deployment review

- Landing page has three independently linked cards and **two explicit visual arrows**, replaced numerical 1–2–3 ordering.
- Each page has the full latest two-page Word proposal's substantive text under the interactive demonstration, with functioning DOI and relevant research links.
- No web framework or external runtime JavaScript library required. Images are local assets; outbound citations require internet access.
- In-memory Chromium QA covered desktop 1440×940 and mobile 390×844 layouts. All demo scripts executed without uncaught runtime errors and without document-level horizontal overflow. Live GitHub Pages deployment **has not been performed**.
- Source Word proposals are included for editing. Existing research results are not mislabeled as fossil experimental findings.

## Would a paleontology postdoc accept these as *research evidence*?

No. They are strong **illustrations of falsifiable research designs**, not scientific validation. What would change the verdict is access to real paired bone–muscle data for A, layered XROMM/soft-tissue data for B, and independently loaded extant whole-column data for C. Evidence of generalization must precede fossil claims. These empirical dependencies, rather than visual polish, determine whether the projects produce major evolutionary findings.
