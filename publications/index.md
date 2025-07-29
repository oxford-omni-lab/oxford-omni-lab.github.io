---
title: Publications
nav:
  order: 3
  tooltip: Published works
---

# {% include icon.html icon="fa-solid fa-book" %}Publications

{% include section.html %}

## Highlights

{% assign highlighted = site.data.citations | where: "highlight", true %}
{% for citation in highlighted %}
{% include citation.html citation=citation style="rich" %}
{% endfor %}

{% include section.html %}

## All

{% include search-box.html %}

{% include search-info.html %}

{% include list.html data="citations" component="citation" style="rich" %}
