---
title: Demos
nav:
  order: 4
  tooltip: Interactive demos, atlases and open-source software
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Demos and tools</span>
  <h1>Try our work</h1>
  <p>Interactive demos, atlases and open-source software from the lab.</p>
  <p class="omni-note">Demos open on our partners’ sites in a new tab.</p>
</div>

{% include section.html %}

<div class="omni-rows">

  <div class="omni-row">
    <div class="omni-media">
      <img src="{{ "images/video/card2_structure_poster.jpg" | relative_url }}" alt="Atlas-guided segmentation of the fetal brain in axial, coronal and sagittal views" loading="lazy">
    </div>
    <div>
      <span class="omni-kicker">Interactive atlas</span>
      <h3>Fetal brain atlas</h3>
      <p>A digital atlas of normative fetal brain maturation from the INTERGROWTH-21st study, linked to healthy neurodevelopment at 2 years. Explore it in your browser with the online viewer. Freely available for academic, clinical and commercial use, provided the <em>Nature</em> paper is cited (see the atlas page for full terms).</p>
      <p class="omni-meta">Themes: Structure · From scan to outcome</p>
      <div class="omni-actions">
        {% include button.html link="https://intergrowth21.com/intergrowth_nifti_viewer/" text="Open the atlas viewer ↗" newtab=true %}
        {% include button.html link="https://intergrowth21.com/research/brain-atlas-project" text="About the atlas ↗" newtab=true style="bare" %}
        {% include button.html link="https://doi.org/10.1038/s41586-023-06630-3" text="Nature paper ↗" newtab=true style="bare" %}
      </div>
    </div>
  </div>

  <div class="omni-row">
    <div class="omni-media">
      <img src="{{ "images/video/card1_reconstruction_poster.jpg" | relative_url }}" alt="Freehand 2D ultrasound frames placed in 3D" loading="lazy">
    </div>
    <div>
      <span class="omni-kicker">Interactive demo</span>
      <h3>UltraGauss</h3>
      <p>Ultrafast reconstruction of 3D ultrasound volumes with ultrasound-specific Gaussian splatting: high-quality volumes in minutes on a single GPU. With the Visual Geometry Group (VGG), Oxford.</p>
      <p class="omni-meta">Theme: Computational ultrasound · <em>ICLR</em> 2026</p>
      <div class="omni-actions">
        {% include button.html link="https://www.robots.ox.ac.uk/~vgg/research/UltraGauss/" text="Try the demo ↗" newtab=true %}
        {% include button.html link="https://arxiv.org/abs/2505.05643" text="Paper ↗" newtab=true style="bare" %}
      </div>
    </div>
  </div>

  <div class="omni-row">
    <div class="omni-media">
      <img src="{{ "images/research/rflash_shadow.jpg" | relative_url }}" alt="Fetal brain ultrasound with acoustic shadows" loading="lazy">
    </div>
    <div>
      <span class="omni-kicker">Interactive demo</span>
      <h3>Shadow removal (RFlash)</h3>
      <p>Acoustic shadows from the skull hide deeper brain anatomy. RFlash splits each ultrasound image into attenuation and scatter with a differentiable simulator, then reduces the shadows. Compare results with the original images using interactive sliders, on fetal brain and abdominal scans.</p>
      <p class="omni-meta">Theme: Computational ultrasound · preprint, 2026</p>
      <div class="omni-actions">
        {% include button.html link="https://vbacher.github.io/RFlash-ultrasound/" text="Project page and demo ↗" newtab=true %}
        {% include button.html link="https://arxiv.org/abs/2609.29373" text="Paper ↗" newtab=true style="bare" %}
        {% include button.html link="https://github.com/vbacher/RFlash" text="Code ↗" newtab=true style="bare" %}
      </div>
    </div>
  </div>

  <div class="omni-row">
    <div class="omni-media">
      <img src="{{ "images/research/structure_3d_brain.jpg" | relative_url }}" alt="Fetal brain structures segmented by the toolkit" loading="lazy">
    </div>
    <div>
      <span class="omni-kicker">Open-source software</span>
      <h3>OMNI Ultrasound Toolkit</h3>
      <p>Open-source tools that automate fetal brain segmentation and volumetric analysis from 3D ultrasound.</p>
      <p class="omni-meta">All themes</p>
      <div class="omni-actions">
        {% include button.html link="https://github.com/oxford-omni-lab" text="GitHub ↗" newtab=true %}
        {% include button.html link="https://github.com/oxford-omni-lab" text="Documentation" style="bare" newtab=true %}
      </div>
    </div>
  </div>

</div>

<div class="omni-callout">
  <div>
    <h3>Using our tools in your research?</h3>
    <p>We’d love to hear about it. Please cite the relevant paper.</p>
  </div>
  <div class="omni-actions">
    {% include button.html link="contact" text="Get in touch" style="bare" %}
  </div>
</div>
