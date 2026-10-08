---
title: "Robust everywhere: harmonisation and deployment"
---

{% include section.html dark=true %}

{% include omni-theme-hero.html theme="robust" text="Building models that generalise across scanners, sites and clinical settings, including portable devices." %}

{% include section.html %}

<div class="omni-theme-page">
<div>

<h2>The problem</h2>
<p>Ultrasound is available almost everywhere, but images differ between scanner makes, settings and sites, and models trained in one hospital often fail in another. Patient data usually cannot leave the hospital, and many clinics use small portable scanners with little computing power.</p>

<h2>Our approach</h2>
<ol class="omni-steps">
  <li><strong>Harmonise</strong>Remove scanner and site differences so measurements mean the same thing everywhere.</li>
  <li><strong>Adapt</strong>Domain adaptation, including source-free methods that need no access to the original training data.</li>
  <li><strong>Federate</strong>Train across hospitals without patient data leaving any of them.</li>
  <li><strong>Compress</strong>Lightweight models that run in real time on portable scanners.</li>
</ol>

{% include omni-theme-papers.html theme="robust" limit=5 %}

</div>
<aside class="omni-aside">
  <div class="omni-aside-card">
    <span class="omni-label">People on this theme</span>
    {% include omni-person.html lookup="ana-namburete" %}
    {% include omni-person.html lookup="nicola-dinsdale" %}
    {% include omni-person.html lookup="hoda-kalabizadeh" %}
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Collaborators</span>
    <div class="omni-collab"><b>Mark Jenkinson</b></div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Methods and expertise</span>
    <div class="omni-chips">
      <span>Domain shift</span>
      <span>Robustness</span>
      <span>Efficient and federated ML</span>
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Code, data and demos</span>
    <a href="https://github.com/oxford-omni-lab">OMNI Ultrasound Toolkit on GitHub →</a>
  </div>
  {% include omni-other-themes.html current="robust" %}
</aside>
</div>
