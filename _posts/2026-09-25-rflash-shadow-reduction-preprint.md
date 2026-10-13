---
title: Shadow reduction in ultrasound using differentiable simulation and radiance field decomposition
author: OMNI Lab
image: images/publications/2609-rflash.gif
tags:
  - preprint
date: 2026-09-25
excerpt: "Our new preprint introduces RFlash, which reduces acoustic shadows in ultrasound images using a differentiable ultrasound simulator."
---

<!-- excerpt start -->

Our new preprint introduces RFlash, which reduces acoustic shadows in ultrasound images using a differentiable ultrasound simulator.

<!-- excerpt end -->

Acoustic shadows from the skull hide deeper brain anatomy in fetal ultrasound. RFlash splits each ultrasound image into attenuation and scatter with a differentiable simulator, then reduces the shadows. The work was led by Valentin Bacher, with collaborators including Bernhard Kainz and Michael Gray.

You can compare results with the original images using interactive sliders, on fetal brain and abdominal scans, on the [project page](https://vbacher.github.io/RFlash-ultrasound/). The code is available on [GitHub](https://github.com/vbacher/RFlash).

**Read the preprint**: [arXiv:2609.29373](https://arxiv.org/abs/2609.29373).

{% include publication-link.html doi="10.48550/arXiv.2609.29373" text="View citation on our publications page" icon="fa-solid fa-book" %}
