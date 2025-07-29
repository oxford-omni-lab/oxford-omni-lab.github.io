---
---

# Welcome to the Oxford Machine Learning in NeuroImaging Lab

### Department of Computer Science, University of Oxford

We are an interdisciplinary research group dedicated to advancing the understanding of early brain development through the integration of machine learning and neuroimaging. Our work focuses on developing data-efficient, scalable methods to extract clinically relevant information from ultrasound: the most widely used, and often only available, imaging modality in pregnancy care worldwide.

Our goal is to enable high-resolution, quantitative analysis of fetal brain development from routine clinical scans. By leveraging large-scale population datasets and collaborations across clinical and computational sciences, we aim to both improve scientific understanding of early brain maturation and develop practical tools for use in diverse healthcare settings.

{% include section.html background="images/misc/background.png" dark=true %}

<video controls width="100%" style="max-width:600px; margin: 20px auto;" poster="images/publications/USAtlas_stillframe.png">
  <source src="images/publications/USAtlas.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

{% include section.html %}

## Research areas

**Fetal Brain Maturation**
Modelling brain development trajectories from 14 weeks gestation using large-scale ultrasound datasets.

**Model Compression**
Creating lightweight neural networks for real-time analysis on portable devices.

**2D-to-3D Reconstruction**
Employing neural radiance fields (NeRFs) to generate volumetric brain images from standard 2D ultrasound videos.

**Federated Learning**
Training privacy-preserving models across multiple clinical sites without data sharing.

**Neurodevelopmental Outcomes**
Linking prenatal imaging features to postnatal cognitive and behavioral assessments.

{% include section.html %}

## About us

{% capture text %}

Our Lab works on improving the diagnostics of the central nervous system by analysing and processing Ultrasound and MRI images of the brain. We are working on **Characterizing the Fetal Brain 2D-3D US Reconstruction Clinical Translation** and **Deep Learning Methodology**

{%
  include button.html
  link="research"
  text="See our research"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/research/USAtlas-ezgif.com-video-to-gif-converter.gif"
  link="research"
  title="Our Research"
  text=text
%}

{% capture text %}

We are a collaborative and open-minded group of people, eager to push the frontiers of biomedical imaging.

{%
  include button.html
  link="team"
  text="Meet our team"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{% assign group_images = site.static_files | where_exp: "item", "item.path contains 'images/group'" | where_exp: "item", "item.extname == '.jpg' or item.extname == '.JPG' or item.extname == '.jpeg' or item.extname == '.png'" | sort: "basename" | reverse %}
{% assign latest_group_image = group_images[0].path %}

{%
  include feature.html
  image=latest_group_image
  link="team"
  title="Our Team"
  flip=true
  text=text
%}

{% include section.html %}

## News

{% for post in site.posts limit:8 %}
{% include post-excerpt.html
    title=post.title
    date=post.date
    url=post.url
    author=post.author
    tags=post.tags
    content=post.content
    excerpt=post.excerpt
    image=post.image
    style="tiny"
  %}
{% endfor %}

{% include section.html %}

### Tools and Resources

We are committed to open science. Many of our tools, pretrained models, and datasets are publicly available through our [GitHub](https://github.com/oxford-omni-lab) page, and we actively contribute to community efforts in medical imaging and AI.

### Joining the OMNI Lab

If you are interested in joining please go to the [recruitment](recruitment) page.

{% include section.html %}

## Collaborators, Partners & Funding

Our work is supported by collaborations with the Nuffield Department of Women’s and Reproductive Health, the Wellcome Centre for Integrative Neuroimaging (WIN), and the Visual Geometry Group, among others.

We are grateful for funding from the University of Oxford [EPSRC Impact Acceleration scheme, and EPSRC Doctoral Prizes](https://www.ukri.org/councils/epsrc/), [Bill and Medlinda Gates Foundation](https://www.gatesfoundation.org/), the Academy of Medical Sciences [Springboard Awards scheme](https://acmedsci.ac.uk/), and the [Royal Academy of Engineering](https://raeng.org.uk/).

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 30px; margin: 40px 0;">
  <img src="images/partners/Logo_AMS.jpeg" alt="AMS" style="height: 60px; max-width: 150px; object-fit: contain;">
  <img src="images/partners/Logo_BMFG.png" alt="BMFG" style="height: 60px; max-width: 150px; object-fit: contain;">
  <img src="images/partners/Logo_EPSRC.png" alt="EPSRC" style="height: 60px; max-width: 150px; object-fit: contain;">
  <img src="images/partners/Logo_OxfordCS.jpeg" alt="Oxford Computer Science" style="height: 60px; max-width: 150px; object-fit: contain;">
</div>

{% include section.html %}
