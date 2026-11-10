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
  <p>A normative atlas of fetal brain maturation from 3D ultrasound, built from the INTERGROWTH-21<sup>st</sup> study, with labelled brain structures and growth curves. Explore it below. The files are available from the <a href="{{ atlas.downloads.official }}">INTERGROWTH-21<sup>st</sup> website</a>.</p>
  <div class="omni-actions">
    <a class="button" href="#viewer">Explore the atlas</a>
    <a class="button" href="#growth" data-style="bare">Growth curves</a>
    <a class="button" href="#download" data-style="bare">Download and cite</a>
  </div>
</div>

<figure class="omni-atlas-teaser">
  <img src="{{ "atlas/assets/atlas_teaser.jpg" | relative_url }}" alt="Axial slices of the atlas at every second week from 14 to 30 weeks' gestation, drawn at the same scale, with brain structures in colour from 18 to 26 weeks" loading="lazy">
  <figcaption>The atlas has one image per week from 14 to 30 weeks. Shown here is every second week, all at the same scale, with labelled brain structures from 18 to 26 weeks.</figcaption>
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
    <p>Normative growth of 28 brain measures from {{ atlas.growth_weeks }} weeks' gestation (structure and lobe volumes, cortical surface area, depth and thickness, and Sylvian fissure depth), from 4,205 3D ultrasound scans in the INTERGROWTH-21<sup>st</sup> study (Wyburd et al., 2026). The band shows the 3<sup>rd</sup> to 97<sup>th</sup> centile and the line the median.</p>
  </div>
  <div class="omni-growth-controls">
    <label for="omni-structure">Structure</label>
    <select id="omni-structure"></select>
    <a id="omni-growth-csv" href="{{ atlas.growth_dir | append: "/" | append: atlas.growth_table | relative_url }}" download>Download the table (CSV)</a>
  </div>
  <figure class="omni-growth-chart">
    <svg id="omni-growth-svg" role="img" aria-label="Growth curve"></svg>
    <figcaption class="omni-growth-key">
      <span><i class="k-outer"></i>3<sup>rd</sup> to 97<sup>th</sup> centile</span>
      <span><i class="k-median"></i>50<sup>th</sup> centile</span>
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
    <strong>Before comparing your own measurements.</strong> These growth models were learned from a coordinated multi-site study (INTERGROWTH-21<sup>st</sup>), in which every scan was acquired with the same protocol and the same ultrasound machine (Philips HD9). Scans from other machines, probes or acquisition protocols, or structures measured with other segmentation methods, may differ systematically from these curves, so interpret any comparison with caution.
  </div>
  <p class="omni-muted omni-left">Measures are for one hemisphere (the side further from the probe), except total brain and cavum septum pellucidum. Curves are from the published equations (Supplementary Table 8). For academic research use only; not a clinical tool and not for commercial use.</p>
</div>

{% include section.html %}

<div id="download" class="omni-left">
  <h2>Download and cite</h2>

  {% assign wk = "{week}" %}
  {% assign structures = atlas.label_sets | where: "file", "structures_GA{week}.nii.gz" | first %}
  {% assign lobes = atlas.label_sets | where: "file", "lobes_GA{week}.nii.gz" | first %}
  {% assign ref1 = atlas.references[0] %}
  {% assign ref2 = atlas.references[1] %}

  <div class="omni-demo-grid omni-atlas-downloads">
    <div class="omni-demo"><div class="omni-demo-body">
      <span class="omni-label">Atlas</span>
      <h3>Brain images by gestational week</h3>
      <p>One 3D volume per week ({{ atlas.weeks | first }} to {{ atlas.weeks | last }} weeks), in NIfTI format (.nii.gz).</p>
      <div class="omni-dl-row">
        <span class="omni-dl-label">Download a week</span>
        <div class="omni-dl-chips">
          {% for w in atlas.weeks %}<a class="omni-chip" href="{{ atlas.data_dir | append: "/" | append: atlas.brain | replace: wk, w | relative_url }}" download>{{ w }} wk</a>{% endfor %}
        </div>
      </div>
      <p class="omni-cite">Cite: <a href="#ref-1">{{ ref1.short | replace: "Nature", "<em>Nature</em>" }}</a></p>
      <div class="omni-links">
        <a href="https://doi.org/{{ ref1.id | remove_first: "doi:" }}">Read the paper ↗</a>
        <a href="{{ atlas.downloads.official }}">Official files and terms ↗</a>
      </div>
    </div></div>

    <div class="omni-demo"><div class="omni-demo-body">
      <span class="omni-label">Labels and growth curves</span>
      <h3>Brain structures and centiles</h3>
      <p>Label maps aligned to the atlas (10 structures and 5 cortical lobes), tables of label names and colours, and growth centiles by week.</p>
      {% if structures %}
      <div class="omni-dl-row">
        <span class="omni-dl-label">Brain structures</span>
        <div class="omni-dl-chips">
          {% for w in atlas.weeks %}{% if w >= structures.weeks[0] and w <= structures.weeks[1] %}<a class="omni-chip" href="{{ atlas.data_dir | append: "/" | append: structures.file | replace: wk, w | relative_url }}" download>{{ w }} wk</a>{% endif %}{% endfor %}
        </div>
      </div>
      {% endif %}
      {% if lobes %}
      <div class="omni-dl-row">
        <span class="omni-dl-label">Lobes</span>
        <div class="omni-dl-chips">
          {% for w in atlas.weeks %}{% if w >= lobes.weeks[0] and w <= lobes.weeks[1] %}<a class="omni-chip" href="{{ atlas.data_dir | append: "/" | append: lobes.file | replace: wk, w | relative_url }}" download>{{ w }} wk</a>{% endif %}{% endfor %}
        </div>
      </div>
      {% endif %}
      <div class="omni-dl-row">
        <span class="omni-dl-label">Tables (CSV)</span>
        <div class="omni-dl-chips">
          {% for ls in atlas.label_sets %}<a class="omni-chip" href="{{ atlas.data_dir | append: "/" | append: ls.table | relative_url }}" download>{{ ls.name }} labels</a>{% endfor %}<a class="omni-chip" href="{{ growth_csv | relative_url }}" download>Growth centiles</a>
        </div>
      </div>
      <p class="omni-cite">Cite: <a href="#ref-2">{{ ref2.short | replace: "Nature Communications", "<em>Nature Communications</em>" }}</a></p>
      <div class="omni-links">
        <a href="https://doi.org/{{ ref2.id | remove_first: "doi:" }}">Read the paper ↗</a>
      </div>
    </div></div>

    <div class="omni-demo"><div class="omni-demo-body">
      <span class="omni-label">Your own scans</span>
      <h3>Label and measure new scans</h3>
      <p>The OMNI ultrasound toolkit runs the same pipeline used in the paper: align a 3D scan to the atlas, label the brain structures, compute volumes and compare them with the growth curves.</p>
      <div class="omni-links">
        <a href="https://oxford-omni-lab-org.github.io/OMNI_ultrasound/NormativeGrowthTrajec/index.html">Documentation and code ↗</a>
      </div>
    </div></div>
  </div>

  <p>The official copies of the atlas and labels, with the full terms of use, are on the INTERGROWTH-21<sup>st</sup> website.</p>
  <div class="omni-actions">
    {% include button.html link=atlas.downloads.official text="Download from INTERGROWTH-21<sup>st</sup> ↗" newtab=true %}
    {% include button.html link=growth_csv text="Growth curve table (CSV)" style="bare" %}
  </div>

  <p><strong>Free for academic use. Commercial use is not permitted.</strong> Please cite the papers below{% if atlas.downloads.licence %} (licence: {{ atlas.downloads.licence }}){% endif %}.</p>

  <h3 class="omni-refs-title">References</h3>
  <ol class="omni-refs">
    {% for r in atlas.references %}
      {% capture anchor %}ref-{{ forloop.index }}{% endcapture %}
      {% include omni-reference.html id=r.id details=r.details anchor=anchor %}
    {% endfor %}
  </ol>
</div>

<script src="{{ "atlas/assets/niivue-0.69.0.min.js" | relative_url }}"></script>
<script src="{{ "atlas/assets/atlas.js" | relative_url }}"></script>
