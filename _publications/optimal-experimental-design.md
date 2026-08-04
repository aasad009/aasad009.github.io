---
layout: publication
interactive_demo: oed_sampling
slug: optimal-experimental-design
permalink: /publications/optimal-experimental-design/
title: Optimal Experimental Design for Repeatable Hyperelastic Material Characterization
seo_title: Optimal Experimental Design for Hyperelastic Parameter Identification | Amirreza Asadi
lang: en
dir: ltr
alternate_url: /fa/publications/optimal-experimental-design/
publication_date: 2025-06-21
short_title: Optimal experimental design
description: An information-aware framework for designing repeatable loading protocols for hyperelastic parameter identification.
authors:
  - Amirreza Asadi
  - Kaveh Laksari
journal: Journal of the Mechanical Behavior of Biomedical Materials
year: 2025
doi: 10.1016/j.jmbbm.2025.107104
code_url: https://github.com/klaksari/optimal_hyperelastic_parameter_ID
graphical_abstract: /assets/images/hyperelastic-optimal-experimental-design-graphical-abstract.png
graphical_abstract_alt: >-
  Information and conditioning landscapes used to select robust loading configurations for hyperelastic parameter identification.
og_image: /assets/images/hyperelastic-optimal-experimental-design-graphical-abstract.png
funding: This work was supported by the National Institutes of Health through NIBIB Trailblazer Award R21EB032187 and NINDS Grant 1R01NS131554-01.
seo_sections:
  - heading: Hyperelastic parameter identification and optimal loading design
    body: >-
      <p>Hyperelastic parameter identification is an inverse problem: measured deformation and stress are used to estimate the coefficients of a constitutive model. The estimated parameters can become unstable when the selected loading states provide redundant information or respond similarly to multiple parameters. This paper treats loading selection as a quantitative experimental-design problem rather than relying on uniformly spaced or operator-selected stretches.</p>
  - heading: What the stress–material Jacobian measures
    body: >-
      <p>The stress–material Jacobian measures how changes in constitutive parameters change the predicted stress response. Its determinant represents local information volume, while its condition number reveals whether parameter sensitivities are nearly collinear. Together, these quantities identify deformation modes and loading levels that are informative, well-conditioned, and less sensitive to measurement noise.</p>
  - heading: Why this matters for tissue mechanics
    body: >-
      <p>Biological soft tissues are often characterized with nonlinear models such as Neo-Hookean, Mooney–Rivlin, and Ogden formulations. Selecting informative tests can reduce the number of measurements while improving repeatability across noise realizations, making constitutive parameter estimates more useful for biomechanics simulations, comparison across studies, and mechanics-based imaging.</p>
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
