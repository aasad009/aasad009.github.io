# SOMA v2: integration into Direction B (21 October 2026)

## Source verified
- Original 75-second LinkedIn clip: https://www.linkedin.com/posts/alvaradopineroeduardo_eccv2026-computervision-digitalhumans-activity-7518393195492323328-IiVT
- Peer-reviewed project: https://vcai.mpi-inf.mpg.de/projects/SOMA/
- Paper: https://arxiv.org/abs/2606.09246; ECCV 2026, Alvarado et al.
- Public code: https://github.com/edualvarado/SOMA

## What the video actually shows
Layered animations of a human body revealing bone, skin and distinct muscles, alongside pose-driven deformation and comparisons with linear blend skinning. This is a visualization of trained inference results, not a direct clinical ground-truth scan of muscles from that video. The post reports SKIM v2 corrections and improved errors.

## Where included
Direction B (soft-tissue uncertainty in comparative joint function) is updated in its Word proposal and matched website page; Directions A and C are left scientifically unchanged.

## Proposed pathway
1. Infer pose and surface motion from simple RGB video with occlusion and camera uncertainty.
2. Use independently acquired species anatomy to train candidate internal tissue deformation priors, adapting SOMA-like multi-layer representations rather than directly transferring human weights.
3. Form a set of plausible muscle, capsule and ligament geometries/deformations; do not equate learned shapes with independently measured stress or stiffness.
4. Use independent XROMM trajectories, tissue geometry, passive load-displacement data and contact constraints to rule out incompatible constitutive/material models (a constitutive compatibility set).
5. Evaluate out of sample and compare whether inferred tissue sets change interpretation of a predefined joint-function contrast.

## Critical scientific limitations
- SOMA is subject-specific and uses dense multiview capture, marker suits and anatomy templates during training; a single uncalibrated RGB video is NOT validated for animal tissue inference.
- Unlike kinematic estimates, force, activation, material parameters and internal strain remain generally non-identifiable without independent data and assumptions.
- The SOMA team explicitly lists fixed-pose force/co-contraction dependence as unmodeled; cross-species transfer is untested.
- Human SKIM can support algorithm development, but never validates animal/joint inference; matched animal video, XROMM, anatomical and loading data are required.
- The demonstrated SOMA clip is linked, not copied or represented as footage/data from this proposal.

## New deliverables
An appropriately labeled proposed inference pipeline figure, original video/paper attribution, a concise research extension, revised experimental baseline and validation criteria, and a matching Word proposal.
