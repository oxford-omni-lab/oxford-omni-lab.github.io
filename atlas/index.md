---
title: Fetal brain atlas
---

{% assign atlas = site.data.atlas %}
{% assign data = atlas.data_dir | append: "/" | relative_url %}
{% assign growth_csv = atlas.growth_dir | append: "/" | append: atlas.growth_table %}

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker"><a href="{{ "demos" | relative_url }}">Demos and tools</a> / Fetal brain atlas</span>
  <h1>Fetal brain atlas</h1>
  <p>A normative atlas of fetal brain maturation from 3D ultrasound, built from the INTERGROWTH-21st study, with labelled brain structures and growth curves. Explore it below. The files are available from the <a href="{{ atlas.downloads.official }}">INTERGROWTH-21st website</a>.</p>
  <div class="omni-actions">
    <a class="button" href="#viewer">Explore the atlas</a>
    <a class="button" href="#growth" data-style="bare">Growth curves</a>
    <a class="button" href="#download" data-style="bare">Download and cite</a>
  </div>
</div>

<figure class="omni-atlas-teaser">
  <img src="{{ "atlas/assets/atlas_teaser.jpg" | relative_url }}" alt="Axial slices of the atlas every two weeks from 14 to 30 weeks' gestation, drawn at the same scale, with brain structures in colour from 18 to 26 weeks" loading="lazy">
  <figcaption>The atlas every two weeks from 14 to 30 weeks, all at the same scale, with labelled brain structures from 18 to 26 weeks.</figcaption>
</figure>

{% include section.html size="wide" %}

{% if atlas.example_images or atlas.example_growth %}
<div class="omni-atlas-banner" role="note"><strong>Example data.</strong>
  {% if atlas.example_images %}The viewer is showing synthetic placeholder images.{% endif %}
  {% if atlas.example_growth %}The growth curves are placeholder numbers.{% endif %}
  They are not results and must not be used.</div>
{% endif %}

{% comment %} Keep this opening tag on one line, and write "|" as &#124;: otherwise the Markdown processor turns it into text or a table. {% endcomment %}
{% capture label_sets %}{% for ls in atlas.label_sets %}{{ ls.name }}|{{ ls.file }}|{{ ls.table }}|{% if ls.weeks %}{{ ls.weeks | first }}-{{ ls.weeks | last }}{% endif %};{% endfor %}{% endcapture %}
<div id="viewer" class="omni-atlas" data-base="{{ data }}" data-brain="{{ atlas.brain }}" data-label-sets="{{ label_sets | replace: '|', '&#124;' }}" data-rotate="{{ atlas.rotate_axial | default: 0 }}" data-start-pos="{{ atlas.start_position | join: ',' }}" data-weeks="{{ atlas.weeks | join: ',' }}" data-start="{{ atlas.start_week }}">

  <div class="omni-atlas-stage">
    <canvas id="omni-atlas-canvas" aria-label="Fetal brain atlas viewer"></canvas>
    <div class="omni-atlas-readout" aria-live="polite">Click on the brain to name a structure</div>
    <noscript><p>The viewer needs JavaScript. You can still download the files below.</p></noscript>
  </div>

  <div class="omni-atlas-panel">
    <div class="omni-atlas-week">
      <label for="omni-week">Gestational age</label>
      <output id="omni-week-out">22 weeks</output>
      <input id="omni-week" type="range" step="1">
      <div class="omni-atlas-ticks"><span id="omni-week-min"></span><span id="omni-week-max"></span></div>
      <button type="button" class="omni-atlas-play" id="omni-play" aria-pressed="false">▶ Play through gestation</button>
    </div>

    <div class="omni-atlas-group">
      <span class="omni-label">View</span>
      <div class="omni-seg" role="group" aria-label="View">
        <button type="button" data-view="3" aria-pressed="true">All</button>
        <button type="button" data-view="0">Axial</button>
        <button type="button" data-view="1">Coronal</button>
        <button type="button" data-view="2">Sagittal</button>
        <button type="button" data-view="4">3D</button>
      </div>
    </div>

    <div class="omni-atlas-group">
      <label class="omni-switch"><input type="checkbox" id="omni-labels" checked> Show labels</label>
      <select id="omni-labelset" aria-label="Which labels to show" hidden></select>
      <p class="omni-muted omni-atlas-note" id="omni-labelset-note"></p>
      <label for="omni-opacity" class="omni-muted">Opacity</label>
      <input id="omni-opacity" type="range" min="0" max="1" step="0.05" value="0.4">
    </div>

    <div class="omni-atlas-group">
      <span class="omni-label">Legend</span>
      <ul class="omni-atlas-legend" id="omni-legend"></ul>
    </div>

  </div>
</div>

<div class="omni-atlas-below">
  <p class="omni-muted">Drag to move through the brain · scroll to change slice · right-drag to adjust contrast · in 3D, drag to rotate</p>
  <p class="omni-atlas-files"><a id="omni-dl-brain" href="#">Download this week's image</a> <a id="omni-dl-labels" href="#">Download this week's labels</a></p>
</div>

{% include section.html %}

<div id="growth" class="omni-growth"
  data-src="{{ atlas.growth_dir | append: "/" | append: atlas.growth_table | relative_url }}"
  data-units="{{ atlas.growth_units }}">
  <div class="omni-left">
    <h2>Growth curves</h2>
    <p>Normative growth of 28 brain measures from {{ atlas.growth_weeks }} weeks' gestation (structure and lobe volumes, cortical surface area, depth and thickness, and Sylvian fissure depth), from 4,205 3D ultrasound scans in the INTERGROWTH-21st study (Wyburd et al., 2026). The band shows the 3rd to 97th centile and the line the median.</p>
  </div>
  <div class="omni-growth-controls">
    <label for="omni-structure">Structure</label>
    <select id="omni-structure"></select>
    <a id="omni-growth-csv" href="{{ atlas.growth_dir | append: "/" | append: atlas.growth_table | relative_url }}" download>Download the table (CSV)</a>
  </div>
  <figure class="omni-growth-chart">
    <svg id="omni-growth-svg" role="img" aria-label="Growth curve"></svg>
    <figcaption class="omni-growth-key">
      <span><i class="k-outer"></i>3rd to 97th centile</span>
      <span><i class="k-median"></i>50th centile</span>
      <span><i class="k-point"></i>Your measurement</span>
    </figcaption>
  </figure>

  <form class="omni-calc" id="omni-calc" hidden onsubmit="return false">
    <span class="omni-label">Compare a measurement</span>
    <div class="omni-calc-row">
      <label><span>Gestational age (weeks)</span> <input id="omni-calc-ga" type="number" step="0.1" min="18" max="27" inputmode="decimal"></label>
      <label><span>Measurement (<span id="omni-calc-unit">{{ atlas.growth_units }}</span>)</span> <input id="omni-calc-vol" type="number" step="any" min="0" inputmode="decimal"></label>
    </div>
    <output id="omni-calc-out" aria-live="polite"></output>
  </form>

  <div class="omni-growth-note" role="note">
    <strong>Before comparing your own measurements.</strong> These growth models were learned from a coordinated multi-site study (INTERGROWTH-21st), in which every scan was acquired with the same protocol and the same ultrasound machine (Philips HD9). Scans from other machines, probes or acquisition protocols, or structures measured with other segmentation methods, may differ systematically from these curves, so interpret any comparison with caution.
  </div>
  <p class="omni-muted omni-left">Measures are for one hemisphere (the side further from the probe), except total brain and cavum septum pellucidum. Curves are from the published equations (Supplementary Table 8). For academic research use only; not a clinical tool and not for commercial use.</p>
</div>

{% include section.html %}

<div id="download" class="omni-left">
  <h2>Download and cite</h2>

  <div class="omni-demo-grid">
    <div class="omni-demo"><div class="omni-demo-body">
      <span class="omni-label">Atlas</span>
      <h3>Brain images by gestational week</h3>
      <p>One 3D volume per week ({{ atlas.weeks | first }} to {{ atlas.weeks | last }} weeks), in NIfTI format.</p>
      <p class="omni-muted">Cite: Namburete et al., <em>Nature</em> 2023.</p>
    </div></div>
    <div class="omni-demo"><div class="omni-demo-body">
      <span class="omni-label">Labels and growth curves</span>
      <h3>Brain structures and centiles</h3>
      <p>Label maps aligned to the atlas (10 structures and 5 cortical lobes), a table of label names and colours, and growth centiles by week (CSV).</p>
      <p class="omni-muted">Cite: Wyburd et al., <em>Nature Communications</em> 2026.</p>
    </div></div>
    <div class="omni-demo"><div class="omni-demo-body">
      <span class="omni-label">Your own scans</span>
      <h3>Label and measure new scans</h3>
      <p>The OMNI ultrasound toolkit runs the same pipeline used in the paper: align a 3D scan to the atlas, label the brain structures, compute volumes and compare them with the growth curves.</p>
      <p><a class="omni-link" href="https://oxford-omni-lab-org.github.io/OMNI_ultrasound/NormativeGrowthTrajec/index.html">Documentation and code ↗</a></p>
    </div></div>
  </div>

  <p>The official copies of the atlas and labels, with the full terms of use, are on the INTERGROWTH-21st website.</p>
  <div class="omni-actions">
    {% include button.html link=atlas.downloads.official text="Download from INTERGROWTH-21st ↗" newtab=true %}
    {% include button.html link=growth_csv text="Growth curve table (CSV)" style="bare" %}
  </div>

  <p><strong>Free for academic use. Commercial use is not permitted.</strong> Please cite the papers below{% if atlas.downloads.licence %} (licence: {{ atlas.downloads.licence }}){% endif %}.</p>

  <h3>References</h3>
  {% include citation.html lookup="doi:10.1038/s41586-023-06630-3" style="rich" %}
  <p>Wyburd MK, Kennedy SH, Fernandes M, et al., Namburete AIL. Normative growth trajectories of fetal brain regions validated by satisfactory maturation of neurodevelopmental domains at 2 years of age. <em>Nature Communications</em> 17, 3073 (2026). <a href="https://doi.org/10.1038/s41467-026-69657-w">doi:10.1038/s41467-026-69657-w</a></p>
</div>

<script src="{{ "atlas/assets/niivue-0.69.0.min.js" | relative_url }}"></script>
<script src="{{ "atlas/assets/atlas.js" | relative_url }}"></script>
