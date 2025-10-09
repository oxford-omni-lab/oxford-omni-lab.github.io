---
# Member Template - Complete with all possible flags
# Save as: _members/firstname-lastname.md

name: "Full Name" # Required: Member's full name as displayed
image: "images/members/photo.jpg" # Optional: Profile photo path
role: principal-investigator # Required: Role type (must match types.yaml)
description: "Job Title or Role Description" # Optional: Additional role description
pronouns: "they/them" # Optional: Personal pronouns (displayed only on personal page)
group: current # Optional: Group membership (current, alumni, etc.)
joined: 2020 # Optional: Year joined the lab
left: 2025 # Optional: Year left the lab (for alumni)
aliases: # Optional: Alternative names for citation matching
  - "F. Name"
  - "Full Middle Name"
  - "Name, F."
links: # Optional: Social media and contact links
  email: "email@domain.com" # Email address (will be protected in the html files)
  home-page: "https://personal-website.com" # Personal website
  orcid: "0000-0000-0000-0000" # ORCID identifier
  google-scholar: "scholar_id" # Google Scholar profile ID
  github: "username" # GitHub username
  twitter: "username" # Twitter handle
  linkedin: "username" # LinkedIn profile
  bluesky: "username" # Bluesky handle
  facebook: "username" # Facebook profile
  instagram: "username" # Instagram handle
  youtube: "channel_id" # YouTube channel
  phone: "+44-123-456-7890" # Phone number
  address: "Department, University, City" # Physical address
redirect_from: # Optional: Redirect from old URLs
  - /old-member-url/
---

# Available role types (must match types.yaml):

# - principal-investigator: Lab PI/Director

# - postdoc: Postdoctoral Researcher

# - dphil: DPhil/PhD Student

# - graduate: Masters/Graduate Student

# - undergrad: Undergraduate Student

# - programmer: Software Developer

# - clinical-fellow: Clinical Fellow

# - associate-member: Visiting/Associate Member

# - alumni: Former member

# - mascot: Lab mascot

Write the member's biography here using Markdown. This can include:

- Educational background
- Research interests
- Notable achievements
- Current projects
- Publications
- Personal interests

## Research Focus

Describe their specific research areas and contributions.

## Recent Work

Highlight recent publications, projects, or achievements.

{% include button.html text="Personal Website" link="https://example.com" %}
