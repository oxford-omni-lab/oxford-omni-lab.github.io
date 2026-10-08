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

{% include section.html %}

<div class="omni-left">
  <h2>Watch</h2>
  <div class="omni-demo-grid">
    <div class="omni-demo">
      <div class="omni-demo-body">
        <span class="omni-label">Oxford MPLS · Women in AI profile series</span>
        <h3>Women in AI at Oxford: Ana Namburete in conversation</h3>
        <p class="omni-quote">“The babies who are most at risk are the ones least likely to benefit from the AI being developed to help them.”</p>
        <div class="omni-actions">
          {% include button.html link="https://www.mpls.ox.ac.uk/women-in-ai/ana.html" text="Watch" icon="fa-solid fa-play" %}
        </div>
      </div>
    </div>
    <div class="omni-demo">
      <div class="omni-demo-body">
        <span class="omni-label">The Royal Institution · December 2023</span>
        <h3>Royal Institution Christmas Lectures</h3>
        <p>Ana features in the 2023 Christmas Lectures.</p>
        <div class="omni-actions">
          {% include button.html link="https://www.rigb.org/christmas-lectures/watch-2023-christmas-lectures" text="Watch" icon="fa-solid fa-play" %}
        </div>
      </div>
    </div>
  </div>
</div>

{% include section.html %}

{% include search-box.html %}

{% include tags.html tags=site.tags %}

{% include search-info.html %}

{% include list.html data="posts" component="post-excerpt" style="small"%}
