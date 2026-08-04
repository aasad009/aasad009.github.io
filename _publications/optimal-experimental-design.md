---
layout: publication
slug: optimal-experimental-design
permalink: /publications/optimal-experimental-design/
title: Optimal Experimental Design for Repeatable Hyperelastic Material Characterization
short_title: Optimal experimental design
description: An information-aware framework for designing repeatable loading protocols for hyperelastic parameter identification.
authors:
  - Amirreza Asadi
  - Kaveh Laksari
journal: Journal of the Mechanical Behavior of Biomedical Materials
year: 2025
doi: 10.1016/j.jmbbm.2025.107104
code_url: https://github.com/klaksari/optimal_hyperelastic_parameter_ID
graphical_abstract: /OED_GA.png
graphical_abstract_alt: >-
  Graphical abstract showing candidate hyperelastic experiments, information-based selection, and reduced parameter uncertainty.
og_image: /OED_GA.png
abstract_html: >-
  <p>Reliable identification of hyperelastic material parameters is essential for modeling the mechanical behavior of materials, including biological tissues. Yet experimental configurations often lack quantitative design guidelines, which can produce high variance and poor reproducibility. This work introduces a stress–material Jacobian framework for selecting the loading mode, loading level, and number of experiments used in hyperelastic material characterization.</p><p>By analyzing the determinant and condition number of the Jacobian that relates stress space to material-parameter space, the framework identifies experimental configurations that reduce sensitivity to noise, improve robustness, and limit the number of required tests. The approach is demonstrated for Neo-Hookean, Mooney–Rivlin, and Ogden models under multiple loading conditions, and the results show improved parameter-identification reproducibility and robustness to measurement uncertainty.</p>
contributions:
  - Introduces the stress–material Jacobian as a quantitative measure of experimental information content.
  - Optimizes loading mode, deformation level, and measurement count for hyperelastic parameter identification.
  - Uses determinant and conditioning metrics to distinguish robust configurations from noise-sensitive ones.
  - Demonstrates the framework for Neo-Hookean, Mooney–Rivlin, and Ogden constitutive models.
methods:
  - label: Inputs
    value: Candidate loading modes, stretch levels, and measurement sets
  - label: Information object
    value: Stress–material Jacobian and its information matrix
  - label: Design criteria
    value: Determinant, condition number, robustness, and reproducibility
  - label: Output
    value: An experimentally efficient and better-conditioned characterization protocol
bibtex: |-
  @article{Asadi2025OptimalExperimentalDesign,
    author  = {Asadi, Amirreza and Laksari, Kaveh},
    title   = {Optimal Experimental Design for Repeatable Hyperelastic Material Characterization},
    journal = {Journal of the Mechanical Behavior of Biomedical Materials},
    volume  = {170},
    pages   = {107104},
    year    = {2025},
    doi     = {10.1016/j.jmbbm.2025.107104},
    url     = {https://doi.org/10.1016/j.jmbbm.2025.107104}
  }
related_slug: pi-unet
related_label: Follow-on publication
---
