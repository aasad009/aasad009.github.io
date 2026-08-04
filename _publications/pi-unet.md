---
layout: publication
slug: pi-unet
permalink: /publications/pi-unet/
title: Stress-Constrained Physics-Informed UNet for Voxel-Wise Multiparameter Hyperelastic Inversion in Volumetric Medical Imaging
short_title: Stress-constrained PI-UNet
description: A physics-informed 3D UNet for voxel-wise multiparameter hyperelastic inversion from volumetric medical-imaging displacement data.
authors:
  - Amirreza Asadi
  - Kaveh Laksari
journal: Annals of Biomedical Engineering
year: 2026
doi: 10.1007/s10439-026-04321-4
graphical_abstract: /PIUNET_GA.png
graphical_abstract_alt: >-
  Graphical abstract showing volumetric deformation inputs, a stress-constrained physics-informed UNet, voxel-wise parameter maps, and mechanics-consistent tissue reconstruction.
og_image: /PIUNET_GA.png
visual_include: visual-pi-unet.html
abstract_html: >-
  <p><strong>Purpose.</strong> To develop a physics-informed computational framework for voxel-wise, multiparameter hyperelastic characterization of heterogeneous soft tissues from volumetric displacement data, with the goal of improving spatially resolved biomechanical imaging and enabling mechanically informed detection of pathological regions.</p><p><strong>Methods.</strong> A physics-informed UNet estimates spatial distributions of Mooney–Rivlin material parameters from strain-derived volumetric inputs. The framework uses finite-element datasets representing a spherical inclusion, an anatomically realistic gray/white-matter brain, and a brain with a tumor-like inclusion. Its physics-informed loss enforces mechanical equilibrium through the divergence of the first Piola–Kirchhoff stress and incorporates boundary-traction constraints.</p><p><strong>Results.</strong> The PI-UNet reconstructs heterogeneous material fields across the benchmark configurations, captures stiffness contrasts and anatomical structure, and remains robust under displacement noise when moderate smoothing is applied. In the tumor model, clustering of the reconstructed mechanical fields localizes the lesion with high spatial agreement to the ground truth.</p><p><strong>Conclusion.</strong> The framework provides a scalable and physically grounded approach for three-dimensional voxel-wise hyperelastic inversion from imaging-derived data and establishes a foundation for spatially resolved tissue characterization and mechanically informed lesion detection.</p>
contributions:
  - Reconstructs spatial maps of multiple Mooney–Rivlin parameters rather than a single scalar stiffness field.
  - Enforces equilibrium through the divergence of first Piola–Kirchhoff stress and incorporates boundary tractions.
  - Operates on three-dimensional strain-derived volumetric inputs using a UNet architecture.
  - Connects information-aware loading design with physics-constrained nonlinear inverse imaging.
methods:
  - label: Inputs
    value: Volumetric strain-derived channels and boundary reaction information
  - label: Network
    value: Three-dimensional physics-informed UNet
  - label: Outputs
    value: Voxel-wise Mooney–Rivlin parameter maps
  - label: Physics constraints
    value: Mechanical equilibrium and boundary-traction consistency
bibtex: |-
  @article{Asadi2026StressConstrainedPIUNet,
    author  = {Asadi, Amirreza and Laksari, Kaveh},
    title   = {Stress-Constrained Physics-Informed UNet for Voxel-Wise Multiparameter Hyperelastic Inversion in Volumetric Medical Imaging},
    journal = {Annals of Biomedical Engineering},
    year    = {2026},
    doi     = {10.1007/s10439-026-04321-4},
    url     = {https://doi.org/10.1007/s10439-026-04321-4}
  }
related_slug: optimal-experimental-design
related_label: Foundational publication
---
