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
  <p>Engineers, computer scientists and clinicians working together on fetal brain imaging. For more about how we work, see our <a href="{{ "handbook" | relative_url }}">lab handbook</a>.</p>
</div>

{% include section.html %}

{% assign group_images = site.static_files | where_exp: "item", "item.path contains 'images/group'" | where_exp: "item", "item.extname == '.jpg' or item.extname == '.JPG' or item.extname == '.jpeg' or item.extname == '.png'" | sort: "basename" | reverse %}
{% assign latest_group_image = group_images[0].path %}

{% include figure.html image=latest_group_image width="100%" %}

{% include section.html %}

## Current members

{% include list.html data="members" component="portrait" filter="group != 'alumni'" %}

{% include section.html %}

## Alumni

{% assign alumni_members = site.members | where: "group", "alumni" | sort: "left" | reverse %}
{% for member in alumni_members %}
{% include portrait.html
    name=member.name
    image=member.image
    role=member.role
    description=member.description
    left=member.left
    aliases=member.aliases
    links=member.links
    style="small"
  %}
{% endfor %}
