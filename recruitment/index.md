---
title: Join us
nav:
  order: 7
  tooltip: Joining the lab
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Join us</span>
  <h1>Joining the lab</h1>
  <p>We are a computational lab working on algorithm design for large-scale fetal brain image analysis. We welcome enquiries from prospective DPhil students and postdocs.</p>
</div>

{% include section.html %}

{% comment %}
  Open positions come from _data/jobs.yaml (updated automatically; add your
  own in _data/jobs_manual.yaml). Only active positions are shown.
{% endcomment %}
{% assign active_jobs = site.data.jobs.jobs | where: "active", true %}

<div class="omni-soft-card">
  <span class="omni-label">Open positions</span>
  {% if active_jobs.size > 0 %}
    <h3>Current openings</h3>
    {% include job-listings.html %}
  {% else %}
    <h3>No advertised openings right now</h3>
    <p>Funded positions are listed here when they open. You are still welcome to get in touch about future opportunities.</p>
  {% endif %}
</div>

<div class="omni-left">
  <h2 style="margin: 56px 0 24px">Routes into the lab</h2>
</div>

<div class="omni-card-grid">
  <div class="omni-aside-card">
    <span class="omni-label">DPhil students</span>
    <h3>Doctoral study</h3>
    <p>Ana supervises through two EPSRC Centres for Doctoral Training: Healthcare Data Science (HDS) and Autonomous Intelligent Machines and Systems (AIMS). We look for backgrounds in deep learning, programming or brain image analysis.</p>
    <div class="omni-links">
      <a href="https://www.bdi.ox.ac.uk/study/cdt">HDS CDT ↗</a>
      <a href="https://www.ox.ac.uk/admissions/graduate/courses/autonomous-intelligent-machines-and-systems">AIMS CDT ↗</a>
    </div>
  </div>
  <div class="omni-aside-card">
    <span class="omni-label">Postdoctoral researchers</span>
    <h3>Postdoctoral research</h3>
    <p>We have more data and research ideas than postdocs. We offer a collaborative, supportive environment and mentorship towards an independent research career in machine learning and brain image analysis.</p>
  </div>
</div>

<div class="omni-left">
  <h2 style="margin: 56px 0 24px">How to apply</h2>
</div>

<div class="omni-apply">
  <div>
    <span class="omni-step">Step 1</span>
    <h3>Find your theme</h3>
    <p>Read our <a href="{{ "research" | relative_url }}">research themes</a> and pick the problem that fits your skills.</p>
  </div>
  <div>
    <span class="omni-step">Step 2</span>
    <h3>Check the route</h3>
    <p>For a DPhil, check the CDT application deadlines. For a postdoc, think about fellowships too.</p>
  </div>
  <div>
    <span class="omni-step">Step 3</span>
    <h3>Get in touch</h3>
    <p>Contact Ana via her departmental profile, with your CV, the theme you’re interested in, and a few lines on why.</p>
  </div>
</div>

<div class="omni-actions">
  {% include button.html link="https://www.cs.ox.ac.uk/people/ana.namburete/" text="Ana’s departmental profile ↗" %}
</div>

<div class="omni-callout omni-callout-pink">
  <div>
    <h3>Life in the lab</h3>
    <p>How we work together, and what we get up to.</p>
  </div>
  <div class="omni-actions">
    {% include button.html link="handbook" text="Lab handbook" style="bare" %}
    {% include button.html link="gallery" text="Gallery" style="bare" %}
  </div>
</div>
