/*
  OMNI Lab fetal brain atlas page: NiiVue viewer + growth-curve chart.
  Settings come from data-* attributes on #viewer and #growth (see atlas/index.md
  and _data/atlas.yaml). No other configuration is needed here.
*/
(function () {
  "use strict";

  // ---------------------------------------------------------------- helpers
  const $ = (sel) => document.querySelector(sel);

  const parseCSV = (text) => {
    const lines = text.trim().split(/\r?\n/);
    const head = lines.shift().split(",").map((h) => h.trim());
    return lines.map((line) => {
      const cells = line.split(",");
      const row = {};
      head.forEach((h, i) => (row[h] = (cells[i] || "").trim()));
      return row;
    });
  };

  const getCSV = (url) =>
    fetch(url).then((r) => {
      if (!r.ok) throw new Error(url + " " + r.status);
      return r.text().then(parseCSV);
    });

  // ---------------------------------------------------------------- viewer
  const setupViewer = async () => {
    const root = $("#viewer");
    if (!root || !window.niivue) return;
    const { Niivue, SLICE_TYPE } = window.niivue;

    const base = root.dataset.base;
    const weeks = root.dataset.weeks.split(",").map(Number);
    let week = Number(root.dataset.start) || weeks[Math.floor(weeks.length / 2)];
    const fileFor = (pattern) => base + pattern.replace("{week}", week);

    const readout = $(".omni-atlas-readout");
    const slider = $("#omni-week");
    const weekOut = $("#omni-week-out");
    const opacity = $("#omni-opacity");
    const showLabels = $("#omni-labels");
    const legend = $("#omni-legend");

    // label sets ("Name|file pattern|table.csv;..."): each becomes a colour map
    const sets = await Promise.all(
      root.dataset.labelSets.split(";").filter(Boolean).map(async (spec) => {
        const [name, file, tablePath, range] = spec.split("|");
        const [from, to] = (range || "").split("-").map(Number);
        const table = await getCSV(base + tablePath);
        const maxIndex = Math.max(...table.map((r) => Number(r.index)));
        const names = new Array(maxIndex + 1).fill("");
        const cmap = { R: [0], G: [0], B: [0], A: [0], I: [0], labels: [""] };
        table.forEach((r) => {
          const i = Number(r.index);
          names[i] = r.name;
          cmap.R.push(Number(r.r));
          cmap.G.push(Number(r.g));
          cmap.B.push(Number(r.b));
          cmap.A.push(255);
          cmap.I.push(i);
          cmap.labels.push(r.name);
        });
        return { name, file, table, names, cmap, from: from || 0, to: to || 99 };
      })
    );
    let set = sets[0];
    let chosen = set; // what the visitor picked; used again when weeks change
    const available = (x) => week >= x.from && week <= x.to;
    const rangeText = (x) => (x.from === x.to ? `${x.from} weeks only` : `${x.from} to ${x.to} weeks`);

    const setPicker = $("#omni-labelset");
    const setNote = $("#omni-labelset-note");
    const refreshPicker = () => {
      setPicker.innerHTML = sets
        .map((x, i) => {
          const off = available(x) ? "" : " disabled";
          const extra = available(x) ? "" : ` (${rangeText(x)})`;
          return `<option value="${i}"${off}${x === set ? " selected" : ""}>${x.name}${extra}</option>`;
        })
        .join("");
      setPicker.hidden = sets.length < 2;
      const missing = sets.filter((x) => !available(x));
      setNote.textContent = missing.length
        ? missing.map((x) => `${x.name}: ${x.from === x.to ? "available at" : "available for"} ${rangeText(x)}.`).join(" ")
        : "";
    };
    // pick the visitor's choice if it exists this week, otherwise the first that does
    const chooseSet = () => {
      set = available(chosen) ? chosen : sets.find(available) || null;
      refreshPicker();
      drawLegend();
    };

    const drawLegend = () => {
      if (!set) {
        legend.innerHTML = "<li>No labels for this week</li>";
        return;
      }
      legend.innerHTML = set.table
        .map(
          (r) =>
            `<li data-index="${r.index}"><i style="background: rgb(${r.r}, ${r.g}, ${r.b})"></i>${r.name}</li>`
        )
        .join("");
    };
    chooseSet();

    // display rotation about the head's vertical axis (degrees clockwise in
    // the axial view); corrects files whose header axes are turned
    const turns = ((Number(root.dataset.rotate) || 0) / 90) % 4;
    const rotate = (affine) => {
      let a = affine.map((row) => row.slice());
      for (let t = 0; t < (turns + 4) % 4; t++) {
        // new x = old y, new y = -old x  (90 degrees clockwise seen from above)
        a = [a[1].slice(), a[0].map((v) => -v), a[2].slice(), a[3].slice()];
      }
      return a;
    };

    const nv = new Niivue({
      backColor: [0.08, 0.06, 0.07, 1],
      crosshairColor: [0.92, 0.42, 0.6, 1],
      crosshairWidth: 1,
      show3Dcrosshair: true,
      multiplanarShowRender: 1, // always show the 3D view in "All"
      isColorbar: false,
      dragAndDropEnabled: false,
    });
    await nv.attachTo("omni-atlas-canvas");
    nv.setSliceType(SLICE_TYPE.MULTIPLANAR);

    const highlight = (index) => {
      legend.querySelectorAll("li").forEach((li) => {
        li.classList.toggle("is-active", Number(li.dataset.index) === index);
      });
    };

    nv.onLocationChange = (data) => {
      const values = data && data.values ? data.values : [];
      const lab = values[1] ? Math.round(values[1].value) : 0;
      const mm = data && data.mm ? Array.from(data.mm).slice(0, 3).map((v) => v.toFixed(1)).join(", ") : "";
      const where = mm ? ` \u00b7 ${mm} mm` : "";
      if (set && lab > 0 && set.names[lab]) {
        readout.textContent = set.names[lab] + where;
        highlight(lab);
      } else {
        readout.textContent = "Outside the labelled structures" + where;
        highlight(-1);
      }
    };

    let loading = 0;
    let loaded = false; // the first load uses the start position
    const load = async () => {
      const ticket = ++loading;
      root.classList.add("is-loading");
      const keepPos = loaded && nv.scene && nv.scene.crosshairPos ? [...nv.scene.crosshairPos] : null;
      try {
        chooseSet();
        const list = [{ url: fileFor(root.dataset.brain), colormap: "gray" }];
        if (set)
          list.push({
            url: fileFor(set.file),
            opacity: showLabels.checked ? Number(opacity.value) : 0,
          });
        await nv.loadVolumes(list);
        if (ticket !== loading) return;
        if (turns)
          nv.volumes.forEach((v, i) => nv.setVolumeAffine(i, rotate(v.hdr.affine)));
        if (set) nv.volumes[1].setColormapLabel(set.cmap);
        nv.setInterpolation(false);
        nv.updateGLVolume();
        const start = (root.dataset.startPos || "").split(",").map(Number);
        if (keepPos) {
          nv.scene.crosshairPos = keepPos;
          nv.drawScene();
        } else if (start.length === 3 && start.every(Number.isFinite)) {
          // start position in mm, as shown in the viewer's readout
          nv.scene.crosshairPos = nv.mm2frac(start);
          nv.drawScene();
        }
      } catch (err) {
        readout.textContent = "Could not load week " + week + " (" + err.message + ")";
      }
      loaded = true;
      root.classList.remove("is-loading");
      $("#omni-dl-brain").href = fileFor(root.dataset.brain);
      const dl = $("#omni-dl-labels");
      dl.hidden = !set;
      if (set) {
        dl.href = fileFor(set.file);
        dl.textContent = `Download this week's labels (${set.name.toLowerCase()})`;
      }
    };

    // week slider (uses positions so missing weeks are skipped cleanly)
    slider.min = 0;
    slider.max = weeks.length - 1;
    slider.value = Math.max(0, weeks.indexOf(week));
    $("#omni-week-min").textContent = weeks[0] + " wk";
    $("#omni-week-max").textContent = weeks[weeks.length - 1] + " wk";
    const showWeek = () => (weekOut.textContent = week + " weeks");
    showWeek();
    slider.addEventListener("input", () => {
      week = weeks[Number(slider.value)];
      showWeek();
    });
    slider.addEventListener("change", load);

    // play through gestation
    const play = $("#omni-play");
    let timer = null;
    const stop = () => {
      clearInterval(timer);
      timer = null;
      play.setAttribute("aria-pressed", "false");
      play.textContent = "\u25b6 Play through gestation";
    };
    play.addEventListener("click", () => {
      if (timer) return stop();
      play.setAttribute("aria-pressed", "true");
      play.textContent = "\u275a\u275a Pause";
      timer = setInterval(async () => {
        let i = Number(slider.value) + 1;
        if (i >= weeks.length) i = 0;
        slider.value = i;
        week = weeks[i];
        showWeek();
        await load();
      }, 1400);
    });

    // views
    document.querySelectorAll("[data-view]").forEach((btn) =>
      btn.addEventListener("click", () => {
        document
          .querySelectorAll("[data-view]")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        nv.setSliceType(Number(btn.dataset.view));
      })
    );

    // labels on/off and opacity
    const applyOpacity = () => {
      if (nv.volumes.length > 1)
        nv.setOpacity(1, showLabels.checked ? Number(opacity.value) : 0);
    };
    showLabels.addEventListener("change", applyOpacity);
    setPicker.addEventListener("change", () => {
      chosen = sets[Number(setPicker.value)];
      chooseSet();
      readout.textContent = "Click on the brain to name a structure";
      load();
    });
    if (weeks.length < 2) root.classList.add("is-single-week");
    opacity.addEventListener("input", applyOpacity);

    await load();
  };

  // ---------------------------------------------------------------- growth chart
  const setupGrowth = async () => {
    const root = $("#growth");
    if (!root) return;
    const svg = $("#omni-growth-svg");
    const select = $("#omni-structure");
    const units = root.dataset.units || "";
    let rows;
    try {
      rows = await getCSV(root.dataset.src);
    } catch (err) {
      svg.outerHTML = "<p>Growth table not available.</p>";
      return;
    }
    // options, grouped when the table has a "group" column
    const groups = [];
    rows.forEach((r) => {
      const g = r.group || "";
      let entry = groups.find((x) => x.name === g);
      if (!entry) groups.push((entry = { name: g, items: [] }));
      if (!entry.items.includes(r.structure)) entry.items.push(r.structure);
    });
    select.innerHTML = groups
      .map((g) => {
        const opts = g.items.map((s) => `<option>${s}</option>`).join("");
        return g.name ? `<optgroup label="${g.name}">${opts}</optgroup>` : opts;
      })
      .join("");
    const unitsFor = (name) => {
      const r = rows.find((x) => x.structure === name);
      return (r && r.units) || units;
    };
    const unitLabel = $("#omni-calc-unit");
    const showUnits = () => {
      if (unitLabel) unitLabel.textContent = unitsFor(select.value);
    };
    showUnits();
    select.addEventListener("change", showUnits);
    const num = (v) => (v === undefined || v === "" ? null : Number(v));
    const series = () =>
      rows
        .filter((r) => r.structure === select.value)
        .map((r) => ({
          x: Number(r.ga_weeks),
          mean: num(r.mean), sd: num(r.sd),
          p3: num(r.p3), p10: num(r.p10), p50: num(r.p50), p90: num(r.p90), p97: num(r.p97),
        }))
        .sort((a, b) => a.x - b.x);

    // optional measurement entered by the visitor
    let point = null;
    const fmt = (v) => (v >= 10 ? v.toFixed(1) : v >= 1 ? v.toFixed(2) : v.toFixed(3));
    const weekLabel = (x) => {
      const w = Math.floor(x + 1e-9);
      const d = Math.round((x - w) * 7);
      return d ? `${w}+${d}` : `${w}`;
    };

    const NS = "http://www.w3.org/2000/svg";
    const el = (name, attrs, text) => {
      const node = document.createElementNS(NS, name);
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const nice = (max) => {
      const step = Math.pow(10, Math.floor(Math.log10(max)));
      const m = max / step;
      const s = m <= 2 ? 0.25 : m <= 5 ? 0.5 : 1;
      return { top: Math.ceil(max / (s * step)) * s * step, step: s * step };
    };

    const draw = () => {
      const data = series();
      const u = unitsFor(select.value);
      const W = 760, H = 380, L = 64, R = 20, T = 16, B = 48;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = "";
      const x0 = data[0].x, x1 = data[data.length - 1].x;
      const hi = Math.max(...data.map((d) => d.p97 ?? d.p50), point ? point.y : 0);
      const { top, step } = nice(hi * 1.05);
      const sx = (v) => L + ((v - x0) / (x1 - x0)) * (W - L - R);
      const sy = (v) => T + (1 - v / top) * (H - T - B);

      for (let v = 0; v <= top + 1e-9; v += step) {
        svg.append(el("line", { x1: L, x2: W - R, y1: sy(v), y2: sy(v), class: "grid" }));
        svg.append(el("text", { x: L - 8, y: sy(v) + 4, class: "tick", "text-anchor": "end" },
          Number(v.toFixed(3)).toString()));
      }
      for (let w = Math.ceil(x0); w <= x1; w++)
        svg.append(el("text", { x: sx(w), y: H - B + 20, class: "tick", "text-anchor": "middle" }, w));
      svg.append(el("text", { x: (L + W - R) / 2, y: H - 6, class: "axis", "text-anchor": "middle" },
        "Gestational age (weeks)"));
      svg.append(el("text", { x: 14, y: (T + H - B) / 2, class: "axis", "text-anchor": "middle",
        transform: `rotate(-90 14 ${(T + H - B) / 2})` }, `${select.value} (${u})`));

      const band = (lo, up, cls) => {
        if (data.some((d) => d[lo] === null || d[up] === null)) return;
        const top = data.map((d) => `${sx(d.x)},${sy(d[up])}`);
        const bottom = data.slice().reverse().map((d) => `${sx(d.x)},${sy(d[lo])}`);
        svg.append(el("polygon", { points: top.concat(bottom).join(" "), class: cls }));
      };
      band("p3", "p97", "band-outer");
      band("p10", "p90", "band-inner");
      svg.append(el("polyline", { points: data.map((d) => `${sx(d.x)},${sy(d.p50)}`).join(" "), class: "median" }));
      if (point && point.x >= x0 && point.x <= x1)
        svg.append(el("circle", { cx: sx(point.x), cy: sy(point.y), r: 6, class: "point" }));

      // hover readout
      const guide = el("line", { y1: T, y2: H - B, class: "guide", visibility: "hidden" });
      const tip = el("text", { class: "tip", visibility: "hidden" });
      svg.append(guide, tip);
      svg.onpointermove = (e) => {
        const box = svg.getBoundingClientRect();
        const px = ((e.clientX - box.left) / box.width) * W;
        const d = data.reduce((a, b) => (Math.abs(sx(b.x) - px) < Math.abs(sx(a.x) - px) ? b : a));
        guide.setAttribute("x1", sx(d.x));
        guide.setAttribute("x2", sx(d.x));
        guide.setAttribute("visibility", "visible");
        const range = d.p3 !== null ? ` (3rd\u201397th: ${fmt(d.p3)}\u2013${fmt(d.p97)})` : "";
        tip.textContent = `${weekLabel(d.x)} wk \u00b7 median ${fmt(d.p50)} ${u}${range}`;
        tip.setAttribute("x", Math.min(sx(d.x) + 8, W - 360));
        tip.setAttribute("y", T + 14);
        tip.setAttribute("visibility", "visible");
      };
      svg.onpointerleave = () => {
        guide.setAttribute("visibility", "hidden");
        tip.setAttribute("visibility", "hidden");
      };
      svg.setAttribute("aria-label", `Growth curve for ${select.value}, ${x0} to ${x1} weeks`);
    };

    // centile calculator (needs mean and sd columns)
    const calc = $("#omni-calc");
    const canCalc = rows.length && rows[0].mean !== undefined && rows[0].sd !== undefined;
    if (calc && canCalc) {
      calc.hidden = false;
      const gaIn = $("#omni-calc-ga");
      const volIn = $("#omni-calc-vol");
      const out = $("#omni-calc-out");
      const phi = (z) => {
        // standard normal cumulative distribution (Abramowitz and Stegun 26.2.17)
        const t = 1 / (1 + 0.2316419 * Math.abs(z));
        const p = 0.3989423 * Math.exp(-z * z / 2) *
          t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        return z > 0 ? 1 - p : p;
      };
      const run = () => {
        const data = series();
        const ga = Number(gaIn.value), vol = Number(volIn.value);
        point = null;
        if (!gaIn.value || !volIn.value) {
          out.textContent = "";
        } else if (ga < data[0].x || ga > data[data.length - 1].x) {
          out.textContent = `Enter a gestational age between ${data[0].x} and ${data[data.length - 1].x} weeks.`;
        } else {
          // interpolate mean and sd between the nearest table rows
          let i = data.findIndex((d) => d.x >= ga);
          if (i < 1) i = 1;
          const a = data[i - 1], b = data[i];
          const f = b.x === a.x ? 0 : (ga - a.x) / (b.x - a.x);
          const mean = a.mean + f * (b.mean - a.mean);
          const sd = a.sd + f * (b.sd - a.sd);
          const z = (vol - mean) / sd;
          const c = phi(z) * 100;
          const cText = c < 0.1 ? "below the 0.1st" : c > 99.9 ? "above the 99.9th" : `${c.toFixed(1)}`;
          out.textContent = `z-score ${z.toFixed(2)} \u00b7 centile ${cText} (expected ${fmt(mean)} ${unitsFor(select.value)} at ${ga} weeks)`;
          point = { x: ga, y: vol };
        }
        draw();
      };
      [gaIn, volIn].forEach((n) => n.addEventListener("input", run));
      select.addEventListener("change", run);
    }

    select.addEventListener("change", draw);
    draw();
  };

  const start = () => {
    setupViewer().catch((e) => console.error(e));
    setupGrowth().catch((e) => console.error(e));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
