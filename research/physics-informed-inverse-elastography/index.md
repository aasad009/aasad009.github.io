---
layout: research-topic
permalink: /research/physics-informed-inverse-elastography/
lang: en
dir: ltr
alternate_url: /fa/research/physics-informed-inverse-elastography/
title: Physics-Informed Inverse Elastography and Voxel-Wise Tissue Mapping
seo_title: Physics-Informed Inverse Elastography & Voxel-Wise Tissue Mapping | Amirreza Asadi
description: Physics-informed inverse elastography for three-dimensional voxel-wise hyperelastic parameter reconstruction from volumetric deformation and boundary reaction data.
kicker: Mechanics-based imaging
lede: Physics-informed inverse elastography combines volumetric deformation measurements with nonlinear constitutive equations and equilibrium constraints to estimate spatial maps of tissue material properties.
topic_terms:
  - Inverse elastography
  - Physics-informed neural networks
  - 3D U-Net
  - Voxel-wise material mapping
  - Hyperelastic inversion
  - Medical imaging
og_image: /assets/images/physics-informed-inverse-elastography-piunet-graphical-abstract.png
related_pages:
  - title: PI-UNet publication
    url: /publications/pi-unet/
    description: Stress-constrained voxel-wise multiparameter hyperelastic inversion.
  - title: Hyperelastic material characterization
    url: /research/hyperelastic-material-characterization/
    description: Identifiability and loading design for nonlinear constitutive parameters.
---
## What is inverse elastography?

Elastography uses measured tissue motion to infer mechanical properties. Many conventional approaches estimate an effective stiffness or wave-speed quantity. Nonlinear inverse elastography instead seeks constitutive parameters that describe how tissue responds over a range of deformations.

The inverse problem is challenging because internal stress is not usually measured directly, multiple parameter fields may explain similar displacement data, and imaging noise is amplified by spatial differentiation. Three-dimensional heterogeneous geometries further increase computational cost and non-uniqueness.

## Physics-informed learning

Physics-informed learning incorporates governing equations into optimization. In a stress-constrained formulation, a neural network predicts spatial material parameters, the constitutive model converts those fields and measured deformation into stress, and the loss penalizes violations of equilibrium and mismatch with known boundary reactions.

This differs from purely supervised image-to-image regression because the mechanical equations define what constitutes a physically consistent prediction. It also differs from classical iterative finite-element inversion because the learned mapping can amortize the reconstruction process across volumetric data.

## Voxel-wise multiparameter reconstruction

Voxel-wise mapping preserves spatial heterogeneity and aligns mechanical fields with medical images. Estimating multiple parameters allows the recovered maps to represent nonlinear constitutive behavior rather than a single scalar stiffness. A three-dimensional U-Net provides local and multiscale context while maintaining dense volumetric outputs.

In the PI-UNet study, multi-loading strain-derived inputs and boundary reaction information are used to estimate Mooney–Rivlin parameter fields. Synthetic benchmarks include a spherical inclusion, gray and white matter, and a tumor-like mechanical inclusion.

## Future experimental applications

Future work includes physical phantom validation, direct integration with MRI or ultrasound deformation measurements, uncertainty quantification, richer constitutive models, incomplete-boundary-data analysis, and evaluation across unseen geometries and loading protocols. The long-term goal is quantitative mechanics-based imaging that complements conventional image intensity with spatially resolved nonlinear tissue properties.
