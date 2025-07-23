---
# Post Template - Complete with all possible flags
# Save as: _posts/YYYY-MM-DD-title-slug.md

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
- Publications: [Paper](/publications?search="your title")
- Code blocks and inline `code`
- Lists and tables
- Quotes and callouts

{% include button.html text="Button Text" link="https://example.com" %}

{% include alert.html type="info" text="Information callout" %}
