---
title: Publications
nav:
  order: 3
  tooltip: Published works
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Publications</span>
  <h1>Papers, preprints and code</h1>
  <p>Newest first. Lab members are in bold; filter by research theme or search below.</p>
</div>

{% include section.html %}

{% comment %}
  Search and filters use the site's search script, so links such as
  publications/?search="Ana Namburete" (from member pages) keep working.
  Filter buttons come from _data/themes.yaml (filter_label).
{% endcomment %}

<div class="omni-pub-toolbar">
  <div class="search-box omni-search">
    <input type="text" class="search-input" oninput="onSearchInput(this)" placeholder="Search title, author or venue" aria-label="Search publications">
    <button disabled data-tooltip="Clear search" aria-label="clear search" onclick="onSearchClear()">
      {% include icon.html icon="fa-solid fa-magnifying-glass" %}
    </button>
  </div>
  {% if site.links.google-scholar %}
    <a class="omni-ext" href="https://scholar.google.com/citations?user={{ site.links.google-scholar }}">Google Scholar ↗</a>
  {% endif %}
</div>

<div class="omni-filters" data-filter-group>
  <a href="{{ "publications/" | relative_url }}" data-query="">All</a>
  {% for theme in site.data.themes %}
    {% capture q %}"tag: {{ theme.id }}"{% endcapture %}
    <a href="{{ "publications/" | relative_url }}?search={{ q | url_encode }}" data-query="{{ q | xml_escape }}">{{ theme.filter_label | default: theme.short }}</a>
  {% endfor %}
  {% capture q %}"tag: has-code"{% endcapture %}
  <a href="{{ "publications/" | relative_url }}?search={{ q | url_encode }}" data-query="{{ q | xml_escape }}">Has code</a>
</div>

{% include search-info.html %}

{% assign citations = site.data.citations | sort: "date" | reverse %}
{% assign years = citations | group_by_exp: "c", "c.date | date: '%Y'" %}
{% assign highlighted = site.data.citations | where: "highlight", true | sort: "date" %}

<div class="omni-pub-layout">
  <div class="omni-year-nav" role="navigation" aria-label="Jump to year">
    <span class="omni-label">Year</span>
    {% if highlighted.size > 0 %}<a href="#highlights" class="omni-year-nav-first">Highlights</a>{% endif %}
    {% for year in years limit: 5 %}
      <a href="#year-{{ year.name }}">{{ year.name }}</a>
    {% endfor %}
    {% if years.size > 5 %}
      <a href="#year-{{ years[5].name }}">{{ years[5].name }} and earlier</a>
    {% endif %}
  </div>

  <div>
    {% if highlighted.size > 0 %}
      <h2 id="highlights" class="omni-year">Highlights</h2>
      <div class="omni-highlights">
        {% for c in highlighted %}
          {% assign venue = site.data.venues[c.publisher] | default: c.publisher %}
          <div class="omni-highlight">
            <span class="omni-kicker">{{ venue }} · {{ c.date | date: "%Y" }}</span>
            <a class="omni-highlight-title" {% if c.link %}href="{{ c.link | relative_url | uri_escape }}"{% endif %}>{{ c.title }}</a>
            <p class="omni-pub-meta">{% include omni-authors.html authors=c.authors max=5 %}</p>
            {% if c.description %}<p>{{ c.description }}</p>{% endif %}
          </div>
        {% endfor %}
      </div>
    {% endif %}

    {% for year in years %}
      <h2 id="year-{{ year.name }}" class="omni-year">{{ year.name }}</h2>
      <ol class="omni-pub-list">
        {% for c in year.items %}
          {% include omni-pub-item.html citation=c %}
        {% endfor %}
      </ol>
    {% endfor %}
  </div>
</div>

