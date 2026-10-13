---
title: Gallery
---

{% comment %}
  Photos come from images/gallery and images/slider (older group photos).
  Name files by date and description, e.g. 251209_Christmas-Lunch-2025.jpeg:
  the date sets the year group, the rest becomes the caption.
  The newest photo in images/group is shown at the top.
  Clicking a photo opens the full-screen viewer (_scripts/gallery-grid.js).
{% endcomment %}

{% assign group_images = site.static_files | where_exp: "f", "f.path contains '/images/group/'" | sort: "basename" | reverse %}
{% assign hero = group_images[0] %}
{% assign stamp = hero.basename | slice: 0, 6 %}
{% assign hero_year = stamp | slice: 0, 2 %}
{% assign hero_month = stamp | slice: 2, 2 %}
{% assign hero_date = "20" | append: hero_year | append: "-" | append: hero_month | append: "-01" %}

{% assign photos = "" | split: "" %}
{% for f in site.static_files %}
  {% assign ext = f.extname | downcase %}
  {% unless ext == ".jpg" or ext == ".jpeg" or ext == ".png" %}{% continue %}{% endunless %}
  {% if f.path contains "/images/gallery/" or f.path contains "/images/slider/" %}
    {% if hero and f.basename == hero.basename %}{% continue %}{% endif %}
    {% assign photos = photos | push: f %}
  {% endif %}
{% endfor %}
{% assign photos = photos | sort: "name" | reverse %}

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Lab life</span>
  <h1>Gallery</h1>
  <p>The OMNI Lab over the years.</p>
</div>

{% if hero %}
<figure class="omni-group-photo omni-gallery-hero">
  <img src="{{ hero.path | relative_url | uri_escape }}" alt="Group photo of the OMNI Lab">
  <figcaption>The lab, {{ hero_date | date: "%B %Y" }}</figcaption>
</figure>
{% endif %}

{% include section.html %}

{% assign years = photos | group_by_exp: "f", "f.name | slice: 0, 2" %}
{% assign index = 0 %}
{% for year in years %}
<h2 class="omni-year">20{{ year.name }}</h2>
<div class="omni-gallery">
  {% for f in year.items %}
    {% assign rest = f.basename | split: "_" | shift | join: " " | replace: "-", " " | strip %}
    {% assign first_word = rest | split: " " | first %}
    {% if first_word == "Group" or first_word == "Group1" or rest == "" %}{% assign rest = "Group photo" %}{% endif %}
    <figure class="omni-gallery-item">
      <button type="button" onclick="openLightbox({{ index }})" aria-label="View {{ rest | xml_escape }} full screen">
        <img src="{{ f.path | relative_url | uri_escape }}" alt="{{ rest | xml_escape }}" loading="lazy">
      </button>
      <figcaption>{{ rest }}</figcaption>
    </figure>
    {% assign index = index | plus: 1 %}
  {% endfor %}
</div>
{% endfor %}

<!-- full-screen viewer (same as before; see _scripts/gallery-grid.js) -->
<div id="lightbox" class="lightbox" onclick="closeLightbox()">
  <div class="lightbox-content" onclick="event.stopPropagation()">
    <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
    <img id="lightbox-image" src="" alt="" />
    <button class="lightbox-nav lightbox-prev" onclick="changeLightboxImage(-1)">‹</button>
    <button class="lightbox-nav lightbox-next" onclick="changeLightboxImage(1)">›</button>
    <div class="lightbox-title" id="lightbox-title"></div>
    <div class="lightbox-counter">
      <span id="lightbox-current">1</span> / <span id="lightbox-total">{{ photos.size }}</span>
    </div>
  </div>
</div>

<script>
  window.galleryImages = [
    {% for f in photos %}
      {% assign rest = f.basename | split: "_" | shift | join: " " | replace: "-", " " | strip %}
      {% assign first_word = rest | split: " " | first %}
      {% if first_word == "Group" or first_word == "Group1" or rest == "" %}{% assign rest = "Group photo" %}{% endif %}
      { src: "{{ f.path | relative_url }}", alt: {{ rest | jsonify }}, title: {{ rest | jsonify }} }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>
