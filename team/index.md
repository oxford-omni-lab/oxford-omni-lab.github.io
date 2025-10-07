---
title: Team
nav:
  order: 1
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

{% include section.html %}

Our group was founded in 2017 by [Dr. Ana Namburete](/members/ana-namburete) with the aim of improving fetal brain assessment using machine learning and neuroimaging. We are a collaborative and open-minded group of researchers, eager to push the frontiers of biomedical imaging. For more about our lab culture, please see our lab handbook.

We are **always** looking for new DPhil/MSc students and Postdocs to [join the team](../recruitment) **!**

{% include button.html text="Lab Handbook" link="handbook" icon="fa-solid fa-book"%}

{% include section.html %}

{% include list.html data="members" component="portrait" filter="group != 'alumni'" %}

{% include section.html background="images/misc/background_dark.png" dark=true %}

{% assign group_images = site.static_files | where_exp: "item", "item.path contains 'images/group'" | where_exp: "item", "item.extname == '.jpg' or item.extname == '.JPG' or item.extname == '.jpeg' or item.extname == '.png'" | sort: "basename" | reverse %}
{% assign latest_group_image = group_images[0].path %}

{% include figure.html image=latest_group_image width="100%" %}

{% include section.html %}

## Alumni

{% assign alumni_members = site.members | where: "group", "alumni" | sort: "left" | reverse %}
{% for member in alumni_members %}
{% include portrait.html
    name=member.name
    image=member.image
    role=member.role
    description=member.description
    left=member.left
    aliases=member.aliases
    links=member.links
    style="small"
  %}
{% endfor %}
