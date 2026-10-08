---
---

{% include section.html dark=true %}

<div class="omni-hero">
  <div class="omni-hero-text">
    <span class="omni-kicker">Department of Computer Science · University of Oxford</span>
    <h1>Machine learning for the developing brain, built for ultrasound.</h1>
    <p>We develop machine learning methods that turn routine ultrasound into quantitative information about the developing brain.</p>
    <div class="omni-actions">
      {% include button.html link="research" text="Explore our research" %}
      {% include button.html link="publications" text="Browse publications" style="bare" %}
    </div>
  </div>
  <div class="omni-hero-video">
    {% include omni-video.html src="images/video/omni-overview.mp4" poster="images/video/omni-overview_poster.jpg" label="Overview of the OMNI Lab's research" controls=true %}
  </div>
</div>

{% include section.html dark=true %}

<div class="omni-section-head">
  <div>
    <h2>Research themes</h2>
    <p>Four interconnected problems, from reconstructing 3D anatomy to understanding development after birth.</p>
  </div>
  <a class="omni-more" href="{{ "research" | relative_url }}">All research →</a>
</div>

{% include omni-theme-cards.html %}

{% include section.html %}

{% assign featured = site.data.citations | where: "id", "doi:10.1038/s41586-023-06630-3" | first %}

<div class="omni-feature">
  <div>
    <span class="omni-kicker">Featured paper · Nature · 2023</span>
    <h2>{{ featured.title | default: "Normative spatiotemporal fetal brain maturation with satisfactory development at 2 years" }}</h2>
    <p>Using 3D ultrasound scans from the international INTERGROWTH-21st study, we built a normative atlas of how the fetal brain matures week by week, in pregnancies where the children went on to develop well at 2 years. The atlas gives clinicians and researchers a reference for what typical brain development looks like during pregnancy.</p>
    <div class="omni-actions">
      {% include button.html link="https://doi.org/10.1038/s41586-023-06630-3" text="Read the paper" style="dark" %}
      {% include button.html link="https://intergrowth21.com/intergrowth_nifti_viewer/" text="Explore the atlas" style="bare" %}
    </div>
  </div>
  <div class="omni-feature-figure">
    <img src="{{ featured.image | default: "images/publications/USAtlas.gif" | relative_url }}" alt="The fetal brain atlas across gestational weeks" loading="lazy">
  </div>
</div>

{% include section.html tone="soft" %}

<div class="omni-section-head">
  <h2>Latest news</h2>
  <a class="omni-more" href="{{ "news" | relative_url }}">All news →</a>
</div>

<div class="omni-news-cards">
  {% for post in site.posts limit:3 %}
    {% include omni-news-card.html post=post %}
  {% endfor %}
</div>

{% include section.html size="tight" %}

<div class="omni-join">
  <h3>Joining the lab</h3>
  <p>We welcome enquiries from prospective DPhil and MSc students and postdocs. <a href="{{ "recruitment" | relative_url }}">See how to apply</a>.</p>
</div>
