"""
Spatio-temporal teaser for the fetal brain atlas.

One column per gestational week, all drawn at the same scale so the brain's
growth is visible. Rows: the atlas, the atlas with brain-structure labels,
and the atlas with lobe labels. A week (or row) with no file is left blank.

Usage:
  python make_teaser.py DATA_DIR OUT.jpg [--weeks 14 16 18 ...]
DATA_DIR holds brain_GA{w}.nii.gz, structures_GA{w}.nii.gz, lobes_GA{w}.nii.gz
and structures.csv / lobes.csv (index,name,r,g,b), as on the /atlas page.
"""
import argparse, csv, os
import numpy as np, nibabel as nib
from PIL import Image, ImageDraw, ImageFont

p = argparse.ArgumentParser()
p.add_argument("data"); p.add_argument("out")
p.add_argument("--weeks", type=int, nargs="+", default=list(range(14, 31, 2)))
p.add_argument("--level", type=float, default=0.62,
               help="axial level as a fraction of the brain's height (0 = bottom, 1 = top)")
p.add_argument("--rows", nargs="+", default=["atlas", "structures"], help="rows to draw: atlas, structures, lobes")
p.add_argument("--cell", type=int, default=200, help="cell size in pixels")
p.add_argument("--mm", type=float, default=0.6, help="mm per pixel (same for every week)")
a = p.parse_args()

def lut(name):
    path = os.path.join(a.data, name)
    if not os.path.exists(path): return {}
    return {int(r["index"]): (int(r["r"]), int(r["g"]), int(r["b"])) for r in csv.DictReader(open(path))}
LUTS = {"structures": lut("structures.csv"), "lobes": lut("lobes.csv")}

def load(kind, w):
    f = os.path.join(a.data, f"{kind}_GA{w}.nii.gz")
    if not os.path.exists(f): return None, None
    img = nib.load(f)
    return np.asarray(img.dataobj), img.header.get_zooms()[:3]

def axial(vol, k):
    # same display orientation as the website viewer (anterior up)
    return np.rot90(vol[:, :, k], 2)

def cell_image(w, row):
    brain, zoom = load("brain", w)
    if brain is None: return None
    brain = brain.astype(np.float32)
    mask = brain > np.percentile(brain[brain > 0], 20)
    zs = np.where(mask.any(axis=(0, 1)))[0]
    k = int(round(zs.min() + a.level * (zs.max() - zs.min())))
    g = np.clip(axial(brain, k) / np.percentile(brain[brain > 0], 99.5), 0, 1) * 255
    rgb = np.stack([g, g, g], -1)
    if row != "atlas":
        lab, _ = load(row, w)
        if lab is None: return None
        lab = axial(lab, k)
        for idx, c in LUTS[row].items():
            m = lab == idx
            rgb[m] = rgb[m] * 0.35 + np.array(c) * 0.65
    im = Image.fromarray(rgb.astype(np.uint8))
    # resample to a common physical scale
    scale = zoom[0] / a.mm
    im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
    c = Image.new("RGB", (a.cell, a.cell))
    c.paste(im, ((a.cell - im.width) // 2, (a.cell - im.height) // 2))
    return c

rows = a.rows
label_w, foot = 0, 46
W = a.cell * len(a.weeks)
H = a.cell * len(rows) + foot
out = Image.new("RGB", (W, H), (0, 0, 0))
d = ImageDraw.Draw(out)
try:
    font = ImageFont.truetype("DejaVuSans.ttf", 22)
except OSError:
    font = ImageFont.load_default()
NAMES = {"atlas": "Atlas", "structures": "Brain structures", "lobes": "Lobes"}
small = font.font_variant(size=17) if hasattr(font, "font_variant") else font
for ci, w in enumerate(a.weeks):
    for ri, row in enumerate(rows):
        c = cell_image(w, row)
        if c is not None:
            out.paste(c, (ci * a.cell, ri * a.cell))
    t = f"{w} wk" if ci == 0 else str(w)
    tw = d.textlength(t, font=font)
    d.text((ci * a.cell + (a.cell - tw) / 2, len(rows) * a.cell + 10), t, fill=(235, 235, 235), font=font)
for ri, row in enumerate(rows):
    d.text((14, ri * a.cell + 12), NAMES.get(row, row), fill=(150, 150, 150), font=small)
out.save(a.out, quality=92)
print("saved", a.out, out.size)
