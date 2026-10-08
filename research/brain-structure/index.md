---
title: "Structure: brain atlases and segmentation"
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker"><a href="{{ "research" | relative_url }}">Research</a> / Structure</span>
  <h1>Structure: brain atlases and segmentation</h1>
  <p>Spatiotemporal atlases of the developing brain, and the tools to label every scan against them, including in the presence of acoustic shadows and incomplete views.</p>
</div>

{% include section.html %}

<div class="omni-theme-page">
<div>

<h2>The problem</h2>
<p>Fetal brain anatomy changes week by week, and ultrasound images are noisy and partly hidden by acoustic shadows from the skull. Labelling structures reliably needs a reference for what a typical brain looks like at each gestational age.</p>

<h2>Our approach</h2>

<ol>
  <li><strong>Build the atlas.</strong> A normative atlas of fetal brain maturation from large international cohorts (INTERGROWTH-21st).</li>
  <li><strong>Register.</strong> Align each new scan to the atlas at the right gestational age.</li>
  <li><strong>Label.</strong> Segment brain structures, with the atlas guiding the labels where shadows block the view.</li>
  <li><strong>Model shape.</strong> Describe how each structure’s shape and size change across gestation.</li>
</ol>

<h2>Key papers</h2>
{% include omni-theme-papers.html theme="brain-structure" limit=12 %}
<p><a class="omni-more" href="{{ "publications" | relative_url }}">All publications →</a></p>

</div>
<aside class="omni-aside">
  <div class="omni-aside-card">
    <span class="omni-label">People on this theme</span>
    <div class="omni-people">
        {% include portrait.html lookup="ana-namburete" style="tiny" %}
        {% include portrait.html lookup="madeleine-wyburd" style="tiny" %}
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Collaborators</span>
    <ul>
      <li>Bartłomiej W. Papież</li>
      <li>INTERGROWTH-21st Consortium, Oxford Maternal and Perinatal Health Institute</li>
    </ul>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Methods and expertise</span>
    <p>Segmentation · registration · statistical modelling</p>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Code, data and demos</span>
    <ul>
      <li><a href="{{ "demos" | relative_url }}">Fetal brain atlas viewer →</a></li>
      <li><a href="https://github.com/oxford-omni-lab">OMNI Ultrasound Toolkit on GitHub →</a></li>
    </ul>
  </div>
  {% include omni-other-themes.html current="brain-structure" %}
</aside>
</div>
