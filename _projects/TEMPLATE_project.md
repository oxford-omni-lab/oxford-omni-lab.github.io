---
title: Title # This title will appear on the project teaser and the project page
start: 2026 # Cickoff year of the project. Currently not used.
excerpt: Project description # A short description of the project that will appear on the project teaser. Try to keep it concise and informative.
image: images/projects/photo.jpg # Teaser image for the project. Should be 600x400px and ideally show some aspect of the project. It will appear on the projects page
published: False # Whether the project should be shown on the projects page. Set to false for drafts.
publication_tags: # These tags should math the tags in sources.yaml. They will be used to fetch publication teasers.
  - example tag
number: 0 # This number is used to order the projects on the projects page. Higher numbers will appear first to add newer projects with increasing numbers.
---

# Template Project

This is a description of the template project. It is a very exciting project that we are working on.

{% include section.html %}

## Project Aims

{% include section.html %}

## Data

{% include section.html %}

<!--
This section will automatically fetch and display publications that are tagged with any of the tags specified in the `publication_tags` field in the front matter. Make sure to add appropriate tags to your publications in `_data/sources.yaml` to have them appear here. PLEASE DO NOT MANNUALY CHANGE THIS SECTION
-->

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
