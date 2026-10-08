---
title: News
nav:
  order: 5
  tooltip: Videos, papers, talks, awards and lab life
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">News</span>
  <h1>What we’ve been up to</h1>
  <p>Videos, papers, talks, awards and lab life, newest first.</p>
</div>

{% include section.html dark=true %}

<div class="omni-left">
  <h2 style="margin: 0 0 28px">Watch</h2>
</div>

<div class="omni-watch">
  <div class="omni-watch-main">
    <a class="omni-video-thumb" href="https://www.mpls.ox.ac.uk/women-in-ai/ana.html" target="_blank" rel="noopener" aria-label="Watch: Ana Namburete in conversation">
      <span class="omni-play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
    </a>
    <span class="omni-kicker">Women in AI at Oxford</span>
    <h3>Ana Namburete in conversation</h3>
    <p class="omni-meta">Oxford MPLS · Women in AI profile series</p>
    <p class="omni-quote">“The babies who are most at risk are the ones least likely to benefit from the AI being developed to help them.”</p>
  </div>
  <div class="omni-watch-side">
    <div>
      <a class="omni-video-thumb" href="https://www.rigb.org/christmas-lectures/watch-2023-christmas-lectures" target="_blank" rel="noopener" aria-label="Watch: the 2023 Royal Institution Christmas Lectures">
        <span class="omni-play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
      </a>
      <span class="omni-kicker">Royal Institution Christmas Lectures</span>
      <h3>Ana features in the 2023 Christmas Lectures</h3>
      <p class="omni-meta">The Royal Institution · December 2023</p>
    </div>
  </div>
</div>

{% include section.html %}

{% comment %}
  Filter buttons use the site's search (news/?search="tag: paper"), so the
  tag links on each post keep working. Categories: _data/news_categories.yaml
{% endcomment %}
{% assign posts = site.posts %}
<div class="omni-filters" data-filter-group>
  <a href="{{ "news/" | relative_url }}" data-query="">All</a>
  {% for c in site.data.news_categories %}
    {% assign count = 0 %}
    {% for post in posts %}
      {% include omni-news-category.html post=post %}
      {% if omni_cat == c.label %}{% assign count = count | plus: 1 %}{% endif %}
    {% endfor %}
    {% if count > 0 %}
      {% capture q %}{% for t in c.tags %}"tag: {{ t }}"{% unless forloop.last %} {% endunless %}{% endfor %}{% endcapture %}
      <a href="{{ "news/" | relative_url }}?search={{ q | url_encode }}" data-query="{{ q | xml_escape }}">{{ c.label }}</a>
    {% endif %}
  {% endfor %}
</div>

{% include search-info.html %}

{% assign years = posts | group_by_exp: "p", "p.date | date: '%Y'" %}
{% assign recent_years = 3 %}
{% assign first_earlier = recent_years | plus: 1 %}

{% capture earlier %}{% for year in years offset: recent_years %}{{ year.name }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign earlier_years = earlier | split: "," %}

{% for year in years %}
{% if forloop.index == first_earlier %}
<details class="omni-earlier">
<summary>Show earlier news ({{ earlier_years.last }}–{{ earlier_years.first }}) ↓</summary>
{% endif %}
<h2 class="omni-year">{{ year.name }}</h2>
<ol class="omni-news-list">
    {% for post in year.items %}
      {% include omni-news-category.html post=post %}
      <li class="omni-filterable">
        <span class="omni-news-date">{{ post.date | date: "%b %-d" }}</span>
        <a class="omni-news-thumb" href="{{ post.url | relative_url | uri_escape }}" tabindex="-1" aria-hidden="true">
          {% if post.image %}<img src="{{ post.image | relative_url | uri_escape }}" alt="" loading="lazy">{% endif %}
        </a>
        <span class="omni-news-text">
          <span class="omni-pill">{{ omni_label }}</span>
          <a class="omni-news-title" href="{{ post.url | relative_url | uri_escape }}">{{ post.title }}</a>
        </span>
        {% for t in omni_tags %}<span class="tag" hidden>{{ t }}</span>{% endfor %}
      </li>
    {% endfor %}
</ol>
{% if forloop.last and forloop.index > recent_years %}
</details>
{% endif %}
{% endfor %}

