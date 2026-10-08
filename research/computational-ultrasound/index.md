---
title: "Computational ultrasound: geometry and physics"
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker"><a href="{{ "research" | relative_url }}">Research</a> / Computational ultrasound</span>
  <h1>Computational ultrasound: geometry and physics</h1>
  <p>Methods that combine geometric reasoning with physics-informed models of how ultrasound images are formed: from recovering the 3D anatomy of the fetal brain from freehand 2D scans, to reducing artefacts such as acoustic shadows.</p>
</div>

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

<p>In practice:</p>

<ol>
  <li><strong>Scan.</strong> A routine freehand 2D sweep, on any scanner.</li>
  <li><strong>Locate.</strong> Estimate each frame’s position and orientation (its 6-DoF pose) in a shared anatomical coordinate frame.</li>
  <li><strong>Reconstruct.</strong> Fuse the frames into a 3D volume with rendering models built around ultrasound’s slice-based image formation, rather than camera perspective.</li>
  <li><strong>Correct.</strong> Separate attenuation from scatter with a differentiable ultrasound simulator, reducing acoustic shadows from the skull.</li>
</ol>

<h2>Key papers</h2>
{% include omni-theme-papers.html theme="computational-ultrasound" limit=12 %}
<p><a class="omni-more" href="{{ "publications" | relative_url }}">All publications →</a></p>

</div>
<aside class="omni-aside">
  <div class="omni-aside-card">
    <span class="omni-label">People on this theme</span>
    <div class="omni-people">
        {% include portrait.html lookup="ana-namburete" style="tiny" %}
        {% include portrait.html lookup="mark-eid" style="tiny" %}
        {% include portrait.html lookup="valentin-bacher" style="tiny" %}
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Collaborators</span>
    <ul>
      <li>João F. Henriques, Visual Geometry Group, University of Oxford</li>
      <li>Bernhard Kainz</li>
      <li>Michael Gray</li>
    </ul>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Methods and expertise</span>
    <p>Multi-view geometry · pose estimation · physics-based simulation · differentiable rendering · inverse problems</p>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Code, data and demos</span>
    <ul>
      <li><a href="{{ "demos" | relative_url }}">UltraGauss interactive demo →</a></li>
      <li><a href="{{ "demos" | relative_url }}">Shadow removal (RFlash) demo →</a></li>
      <li><a href="https://github.com/oxford-omni-lab">OMNI Ultrasound Toolkit on GitHub →</a></li>
    </ul>
  </div>
  {% include omni-other-themes.html current="computational-ultrasound" %}
</aside>
</div>
