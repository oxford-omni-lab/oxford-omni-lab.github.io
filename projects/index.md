---
title: Projects
nav:
  order: 3
  tooltip: Overview over the lab's projects
---

# {% include icon.html icon="fa-solid fa-diagram-project" %}Projects

This page gives an overview over larger projects involving more people and multiple publications. For a complete list of our research outputs, please see the [Publications](publications) page.

<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin: 24px 0;">
  {% include button.html text="View Publications" link="publications" icon="fa-solid fa-book" %}
  {% include button.html type="github" text="GitHub" link="oxford-omni-lab" %}
</div>

{% include section.html %}

{% assign published_projects = site.projects | where: "published", true | sort: "number" | reverse %}

{% if published_projects.size > 0 %}

<div class="project-list">
  {% for project in published_projects %}
    {% include project-teaser.html project=project %}
  {% endfor %}
</div>
{% else %}
No projects are currently marked as published.
{% endif %}
