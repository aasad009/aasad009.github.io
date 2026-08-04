---
layout: publication
slug: pi-unet
permalink: /publications/pi-unet/
title: Stress-Constrained Physics-Informed UNet for Voxel-Wise Multiparameter Hyperelastic Inversion in Volumetric Medical Imaging
seo_title: Physics-Informed 3D Inverse Elastography with PI-UNet | Amirreza Asadi
lang: en
dir: ltr
alternate_url: /fa/publications/pi-unet/
short_title: Stress-constrained PI-UNet
description: A physics-informed 3D UNet for voxel-wise multiparameter hyperelastic inversion from volumetric medical-imaging displacement data.
authors:
  - Amirreza Asadi
  - Kaveh Laksari
journal: Annals of Biomedical Engineering
year: 2026
doi: 10.1007/s10439-026-04321-4
graphical_abstract: /assets/images/physics-informed-inverse-elastography-piunet-graphical-abstract.png
graphical_abstract_alt: >-
  Selected study figures showing volumetric data generation, the PI-UNet architecture, and voxel-wise brain-tissue mechanical reconstruction.
og_image: /assets/images/physics-informed-inverse-elastography-piunet-graphical-abstract.png
funding: This work was supported by the National Institutes of Health through NIBIB Trailblazer Award R21EB032187 and NINDS Grant 1R01NS131554-01.
seo_sections:
  - heading: Physics-informed inverse elastography for voxel-wise tissue property mapping
    body: >-
      <p>Inverse elastography aims to infer tissue mechanical properties from measured motion or deformation. Instead of returning only a single stiffness-like quantity, this framework estimates multiple nonlinear Mooney–Rivlin parameters at every voxel, creating spatially resolved constitutive maps aligned with volumetric medical-imaging data.</p>
  - heading: How the stress-constrained PI-UNet works
    body: >-
      <p>The network receives a multi-loading volumetric strain stack and predicts voxel-wise material parameters. During optimization, the predicted fields are inserted into the nonlinear constitutive equations. The loss penalizes violations of static equilibrium through the divergence of first Piola–Kirchhoff stress and penalizes mismatch with accessible boundary reaction information.</p>
  - heading: Applications in nonlinear tissue characterization
    body: >-
      <p>The study evaluates synthetic three-dimensional benchmarks containing a spherical inclusion, gray and white matter, and a tumor-like mechanical inclusion. The reconstructed parameter maps preserve heterogeneous anatomy and provide mechanically meaningful features for future elastography, phantom validation, and mechanics-informed lesion analysis.</p>
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
