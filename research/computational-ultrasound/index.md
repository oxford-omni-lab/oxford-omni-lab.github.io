---
title: "Computational ultrasound: geometry and physics"
---

{% include section.html dark=true %}

{% include omni-theme-hero.html theme="computational-ultrasound" text="Methods that combine geometric reasoning with physics-informed models of how ultrasound images are formed: from recovering the 3D anatomy of the fetal brain from freehand 2D scans, to reducing artefacts such as acoustic shadows." %}

{% include section.html %}

<div class="omni-theme-page">
<div>

<h2>The problem</h2>
<p>One 2D slice shows only part of the brain. A 3D volume can be cut in any plane and measured as a whole, but 3D probes are expensive and rare where most pregnancies are scanned. Freehand 2D ultrasound is widely available; the challenge is recovering 3D anatomy from it.</p>

<h2>Our approach</h2>
<p>Two ideas run through this work.</p>
<div class="omni-principles">
  <div>
    <h4>Geometric reasoning</h4>
    <p>Every freehand frame is a slice through one underlying 3D anatomy. We estimate where each slice sits in space and enforce consistency between overlapping views, drawing on multi-view 3D vision.</p>
  </div>
  <div>
    <h4>Physics-informed models</h4>
    <p>Ultrasound is not a camera: images form as sound travels through tissue in the probe plane, attenuating and scattering. We build this image formation into reconstruction, which is also what allows acoustic shadows to be reduced rather than simply filled in.</p>
  </div>
</div>
<ol class="omni-steps">
  <li><strong>Scan</strong>A routine freehand 2D sweep, on any scanner.</li>
  <li><strong>Locate</strong>Estimate each frame’s position and orientation (its 6-DoF pose) in a shared anatomical coordinate frame.</li>
  <li><strong>Reconstruct</strong>Fuse the frames into a 3D volume with rendering models built around ultrasound’s slice-based image formation, rather than camera perspective.</li>
  <li><strong>Correct</strong>Separate attenuation from scatter with a differentiable ultrasound simulator, reducing acoustic shadows from the skull.</li>
</ol>

{% include omni-theme-papers.html theme="computational-ultrasound" limit=5 %}

</div>
<aside class="omni-aside">
  <div class="omni-aside-card">
    <span class="omni-label">People on this theme</span>
    {% include omni-person.html lookup="ana-namburete" %}
    {% include omni-person.html lookup="mark-eid" %}
    {% include omni-person.html lookup="valentin-bacher" %}
    {% include omni-person.html lookup="jayroop-ramesh" %}
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Collaborators</span>
    <div class="omni-collab"><b>João F. Henriques</b><span>Visual Geometry Group, University of Oxford</span></div>
    <div class="omni-collab"><b>Bernhard Kainz</b></div>
    <div class="omni-collab"><b>Michael Gray</b></div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Methods and expertise</span>
    <div class="omni-chips">
      <span>Multi-view geometry</span>
      <span>Pose estimation</span>
      <span>Physics-based simulation</span>
      <span>Differentiable rendering</span>
      <span>Inverse problems</span>
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Code, data and demos</span>
    <a href="https://www.robots.ox.ac.uk/~vgg/research/UltraGauss/">UltraGauss interactive demo →</a>
    <a href="https://vbacher.github.io/RFlash-ultrasound/">Shadow removal (RFlash) demo →</a>
    <a href="https://github.com/oxford-omni-lab">OMNI Ultrasound Toolkit on GitHub →</a>
  </div>
  {% include omni-other-themes.html current="computational-ultrasound" %}
</aside>
</div>
