---
title: OMNI-Pipeline
start: 2026
excerpt: "Overview of the OMNI-Pipeline project, its aims, data, and related publications."
image: images/projects/omni-pipeline/photo.jpg # dummy for now
published: true
publication_tags:
  - OMNI Pipeline
number: 1
---

# OMNI-Pipeline

This is a description of the OMNI-Pipeline project. It is a very exciting project that we are working on.

{% include section.html %}

## Project Aims

{% include section.html %}

## Data

{% include section.html %}

# Publications

{% assign project_papers = site.data.citations | sort: "date" | reverse %}
{% assign has_publications = false %}

{% for citation in project_papers %}
{% assign matches_project = false %}
{% if citation.tags and page.publication_tags %}
{% for project_tag in page.publication_tags %}
{% if citation.tags contains project_tag %}
{% assign matches_project = true %}
{% break %}
{% endif %}
{% endfor %}
{% endif %}

{% if matches_project %}
{% include research-teaser.html citation=citation %}
{% assign has_publications = true %}
{% endif %}
{% endfor %}

{% unless has_publications %}
No publications are currently linked to this project.
{% endunless %}
