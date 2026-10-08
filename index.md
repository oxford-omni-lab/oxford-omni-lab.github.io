---
---

{% include section.html dark=true size="wide" %}

<div class="omni-hero">
  <div>
    <span class="omni-kicker">Department of Computer Science · University of Oxford</span>
    <h1>Machine learning for the developing brain, built for ultrasound.</h1>
    <p>We develop machine learning methods that turn routine ultrasound into quantitative information about the developing brain.</p>
    <div class="button-group">
      {% include button.html link="research" text="Explore our research" icon="fa-solid fa-arrow-right" flip=true %}
      {% include button.html link="publications" text="Browse publications" style="bare" %}
    </div>
  </div>
  <div>
    {% include omni-video.html src="images/video/omni-overview.mp4" poster="images/video/omni-overview_poster.jpg" label="Overview of the OMNI Lab's research" controls=true %}
  </div>
</div>

{% include section.html %}

<div class="omni-left">
  <h2>Research themes</h2>
  <p>Four interconnected problems, from reconstructing 3D anatomy to understanding development after birth.</p>
  {% include omni-theme-cards.html %}
  <p><a class="omni-more" href="{{ "research" | relative_url }}">All research →</a></p>
</div>

{% include section.html %}

<div class="omni-left">
  <span class="omni-kicker">Featured paper · Nature · 2023</span>
  <p>Using 3D ultrasound scans from the international INTERGROWTH-21st study, we built a normative atlas of how the fetal brain matures week by week, in pregnancies where the children went on to develop well at 2 years.</p>
</div>

{% include citation.html lookup="doi:10.1038/s41586-023-06630-3" style="rich" %}

{% include section.html %}

<div class="omni-left">
  <h2>Latest news</h2>
  {% for post in site.posts limit:3 %}
    {% include post-excerpt.html
      title=post.title
      date=post.date
      url=post.url
      author=post.author
      tags=post.tags
      content=post.content
      excerpt=post.excerpt
      image=post.image
      style="tiny"
    %}
  {% endfor %}
  <p><a class="omni-more" href="{{ "news" | relative_url }}">All news →</a></p>
</div>

{% include section.html %}

<div class="omni-left">
  <h3>Tools and resources</h3>
  <p>Many of our tools, pretrained models and datasets are openly available. See our <a href="{{ "demos" | relative_url }}">demos and tools</a> and our <a href="https://github.com/oxford-omni-lab">GitHub</a> page.</p>
  <h3>Joining the lab</h3>
  <p>We welcome enquiries from prospective DPhil and MSc students and postdocs. <a href="{{ "recruitment" | relative_url }}">See how to apply</a>.</p>
</div>
