---
title: Research
nav:
  order: 1
  tooltip: Problems we work on
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Research</span>
  <h1>Problems we work on</h1>
  <p>Ultrasound is the most widely used imaging in pregnancy care, and often the only one available. We develop methods that turn routine scans into quantitative measures of the developing brain.</p>
</div>

{% include section.html %}

{% include omni-theme-rows.html %}

{% include section.html %}

<div class="omni-left">
  <h2>Software and data</h2>
  <h3>OMNI Ultrasound Toolkit</h3>
  <p>Open-source tools that automate fetal brain segmentation and volumetric analysis from 3D ultrasound.</p>
  <div class="button-group" style="justify-content: flex-start">
    {% include button.html type="github" text="GitHub" link="oxford-omni-lab" %}
    {% include button.html link="demos" text="All demos and tools" icon="fa-solid fa-arrow-right" flip=true style="bare" %}
    {% include button.html link="publications" text="All publications" icon="fa-solid fa-arrow-right" flip=true style="bare" %}
  </div>
  <h3>Built on international cohorts</h3>
  <p>Our work draws on the INTERGROWTH-21st and INTERBIO-21st consortia and our clinical partners.</p>
</div>

{% include section.html %}

<div class="omni-left">
  <h2>Other work</h2>
  <p class="omni-muted">Recent papers that don't sit under one of the themes above.</p>
</div>

{% assign excluded_tags = "" | split: "|" %}
{% for theme in site.data.themes %}
  {% assign excluded_tags = excluded_tags | concat: theme.tags %}
{% endfor %}
{% assign all_citations = site.data.citations | sort: "date" | reverse %}
{% assign remaining_count = 0 %}
{% for citation in all_citations %}
{% assign has_excluded_tag = false %}
{% if citation.tags %}
{% for tag in citation.tags %}
{% if excluded_tags contains tag %}
{% assign has_excluded_tag = true %}
{% break %}
{% endif %}
{% endfor %}
{% endif %}
{% unless has_excluded_tag %}
{% include research-teaser.html citation=citation %}
{% assign remaining_count = remaining_count | plus: 1 %}
{% endunless %}
{% if remaining_count >= 10 %}
{% break %}
{% endif %}
{% endfor %}
