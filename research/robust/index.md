---
title: "Robust everywhere: harmonisation and deployment"
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker"><a href="{{ "research" | relative_url }}">Research</a> / Robust everywhere</span>
  <h1>Robust everywhere: harmonisation and deployment</h1>
  <p>Building models that generalise across scanners, sites and clinical settings, including portable devices.</p>
</div>

{% include section.html %}

<div class="omni-theme-page">
<div>

<h2>The problem</h2>
<p>Ultrasound is available almost everywhere, but images differ between scanner makes, settings and sites, and models trained in one hospital often fail in another. Patient data usually cannot leave the hospital, and many clinics use small portable scanners with little computing power.</p>

<h2>Our approach</h2>

<ol>
  <li><strong>Harmonise.</strong> Remove scanner and site differences so measurements mean the same thing everywhere.</li>
  <li><strong>Adapt.</strong> Domain adaptation, including source-free methods that need no access to the original training data.</li>
  <li><strong>Federate.</strong> Train across hospitals without patient data leaving any of them.</li>
  <li><strong>Compress.</strong> Lightweight models that run in real time on portable scanners.</li>
</ol>

<h2>Key papers</h2>
{% include omni-theme-papers.html theme="robust" limit=12 %}
<p><a class="omni-more" href="{{ "publications" | relative_url }}">All publications →</a></p>

</div>
<aside class="omni-aside">
  <div class="omni-aside-card">
    <span class="omni-label">People on this theme</span>
    <div class="omni-people">
        {% include portrait.html lookup="ana-namburete" style="tiny" %}
        {% include portrait.html lookup="nicola-dinsdale" style="tiny" %}
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Collaborators</span>
    <ul>
      <li>Mark Jenkinson</li>
    </ul>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Methods and expertise</span>
    <p>Domain shift · robustness · efficient and federated ML</p>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Code, data and demos</span>
    <ul>
      <li><a href="https://github.com/oxford-omni-lab">OMNI Ultrasound Toolkit on GitHub →</a></li>
    </ul>
  </div>
  {% include omni-other-themes.html current="robust" %}
</aside>
</div>
