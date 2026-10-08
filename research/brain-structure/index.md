---
title: "Structure: brain atlases and segmentation"
---

{% include section.html dark=true %}

{% include omni-theme-hero.html theme="brain-structure" text="Spatiotemporal atlases of the developing brain, and the tools to label every scan against them, including in the presence of acoustic shadows and incomplete views." %}

{% include section.html %}

<div class="omni-theme-page">
<div>

<h2>The problem</h2>
<p>Fetal brain anatomy changes week by week, and ultrasound images are noisy and partly hidden by acoustic shadows from the skull. Labelling structures reliably needs a reference for what a typical brain looks like at each gestational age.</p>

<h2>Our approach</h2>
<ol class="omni-steps">
  <li><strong>Build the atlas</strong>A normative atlas of fetal brain maturation from large international cohorts (INTERGROWTH-21st).</li>
  <li><strong>Register</strong>Align each new scan to the atlas at the right gestational age.</li>
  <li><strong>Label</strong>Segment brain structures, with the atlas guiding the labels where shadows block the view.</li>
  <li><strong>Model shape</strong>Describe how each structure’s shape and size change across gestation.</li>
</ol>

{% include omni-theme-papers.html theme="brain-structure" limit=5 %}

</div>
<aside class="omni-aside">
  <div class="omni-aside-card">
    <span class="omni-label">People on this theme</span>
    {% include omni-person.html lookup="ana-namburete" %}
    {% include omni-person.html lookup="madeleine-wyburd" %}
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Collaborators</span>
    <div class="omni-collab"><b>Bartłomiej W. Papież</b></div>
    <div class="omni-collab"><b>INTERGROWTH-21st Consortium</b><span>Oxford Maternal and Perinatal Health Institute</span></div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Methods and expertise</span>
    <div class="omni-chips">
      <span>Segmentation</span>
      <span>Registration</span>
      <span>Statistical modelling</span>
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Code, data and demos</span>
    <a href="https://intergrowth21.com/intergrowth_nifti_viewer/">Fetal brain atlas viewer →</a>
    <a href="https://github.com/oxford-omni-lab">OMNI Ultrasound Toolkit on GitHub →</a>
  </div>
  {% include omni-other-themes.html current="brain-structure" %}
</aside>
</div>
