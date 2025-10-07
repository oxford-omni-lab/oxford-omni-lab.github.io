---
# Post Template - Complete with all possiTo add a link to a publication on the publications page, use:

```liquid
{% include publication-link.html doi="10.1002/hbm.70349" text="View citation" %}
```

Optional parameters:

- `doi` (required): Just the DOI number (e.g., "10.1002/hbm.70349") - the "doi:" prefix is added automatically
- `text` (optional): Custom link text (default: "View publication")
- `icon` (optional): Font Awesome icon class (e.g., "fa-solid fa-arrow-right")
- `style` (optional): CSS class for styling (e.g., "button")

Examples:

```liquid
{% include publication-link.html doi="10.1002/hbm.70349" text="Read the paper" %}
{% include publication-link.html doi="10.1002/hbm.70349" text="View citation" icon="fa-solid fa-arrow-right" %}
{% include publication-link.html doi="10.1007/978-3-031-72378-0_39" text="MICCAI 2024" %}
```: _posts/YYYY-MM-DD-title-slug.md

title: "Your Post Title Here" # Required: Main title displayed on the post
author: "Author Name" # Optional: Post author (can be team member name)
image: "images/posts/your-image.jpg" # Optional: Featured image for the post
tags: # Optional: Categories/topics for the post
  - tag1
  - tag2
date: 2025-07-15 # Optional: Publication date (defaults to filename date)
last_modified_at: 2025-07-15 # Optional: Last update date
excerpt: "Brief summary of the post content" # Optional: Custom excerpt (defaults to first paragraph)
description: "SEO meta description" # Optional: For search engine optimization
published: false # Optional: Set to false to keep as draft
permalink: /custom-url/ # Optional: Custom URL path
redirect_from: # Optional: Redirect from old URLs
  - /old-url-1/
  - /old-url-2/
layout: post # Optional: Custom layout (defaults to post)
---

<!-- excerpt start -->

This is the excerpt that will appear on the homepage and post listings. It should be a compelling summary of the post content.

<!-- excerpt end -->

## Main Content

Write your full post content here using standard Markdown syntax.

### Features you can use:

- **Bold text** and _italic text_
- Links to [external sites](https://example.com)
- Links to [internal pages]({% link research/index.md %})
- Images: ![Alt text]({{ site.baseurl }}/images/posts/image.jpg)
- Publications: `{% include publication-link.html doi="<doi>" text="View citation" %}`. For more details see below.
- Code blocks and inline `code`
- Lists and tables
- Quotes and callouts

### Including Publications

To add a link to a publication on the publications page, use:

```liquid
{% include publication-link.html doi="10.1002/hbm.70349" text="View citation" %}
```

Optional parameters:

- `doi` (required): The DOI from \_data/sources.yaml
- `text` (optional): Custom link text (default: "View publication")
- `icon` (optional): Font Awesome icon class (e.g., "fa-solid fa-arrow-right")
- `style` (optional): CSS class for styling (e.g., "button")

Examples:

```liquid
{% include publication-link.html doi="10.1002/hbm.70349" text="Read the paper" %}
{% include publication-link.html doi="10.1002/hbm.70349" text="View citation" icon="fa-solid fa-arrow-right" %}
```

### Other Includes

{% include button.html text="Button Text" link="https://example.com" %}

{% include alert.html type="info" text="Information callout" %}
