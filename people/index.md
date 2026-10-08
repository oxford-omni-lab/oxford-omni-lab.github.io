---
title: People
nav:
  order: 2
  tooltip: About our People
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">People</span>
  <h1>The team</h1>
  <p>Engineers, computer scientists and clinicians working together on fetal brain imaging.</p>
</div>

{% include section.html %}

{% comment %}
  The newest photo in images/group is shown. Name group photos by date,
  e.g. 260624_Group.JPG for 24 June 2026; the caption uses that date.
{% endcomment %}
{% assign group_images = site.static_files | where_exp: "item", "item.path contains 'images/group'" | where_exp: "item", "item.extname == '.jpg' or item.extname == '.JPG' or item.extname == '.jpeg' or item.extname == '.png'" | sort: "basename" | reverse %}
{% assign latest_group_image = group_images[0] %}
{% assign stamp = latest_group_image.basename | slice: 0, 6 %}
{% assign photo_year = stamp | slice: 0, 2 %}
{% assign photo_month = stamp | slice: 2, 2 %}
{% assign photo_date = "20" | append: photo_year | append: "-" | append: photo_month | append: "-01" %}

{% if latest_group_image %}
<figure class="omni-group-photo">
  <img src="{{ latest_group_image.path | relative_url | uri_escape }}" alt="Group photo of the OMNI Lab">
  <figcaption>The lab, {{ photo_date | date: "%B %Y" }}</figcaption>
</figure>
{% endif %}

<div class="omni-left">
  <h2 style="margin: 56px 0 28px">Current members</h2>
</div>

{% assign current_members = site.members | where_exp: "m", "m.group != 'alumni'" %}
<div class="omni-members">
  {% for member in current_members %}
    {% include omni-member-card.html member=member %}
  {% endfor %}
</div>

<div class="omni-left">
  <h2 style="margin: 64px 0 28px">Alumni</h2>
</div>

{% assign alumni_members = site.members | where: "group", "alumni" | sort: "left" | reverse %}
<div class="omni-alumni">
  {% for member in alumni_members %}
    {% include omni-person.html member=member until=true %}
  {% endfor %}
</div>
