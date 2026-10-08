---
title: Contact
nav:
  order: 6
  tooltip: Address and location
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Contact</span>
  <h1>Get in touch</h1>
  <p>We’re in the Department of Computer Science, in central Oxford.</p>
</div>

{% include section.html %}

<div class="omni-left">
  <h3>Address</h3>
  <p>
    OMNI Lab<br>
    Department of Computer Science<br>
    University of Oxford<br>
    15 Parks Road<br>
    Oxford OX1 3PH, United Kingdom
  </p>
  <p>The lab is a few steps from the Wolfson Building of the Department of Computer Science.</p>

  <h3>Enquiries</h3>
  <p>For collaborations and media enquiries, please use the contact details on Ana’s departmental profile.</p>

  <h3>Prospective students and postdocs</h3>
  <p>Please read <a href="{{ "recruitment" | relative_url }}">how to join the lab</a> before getting in touch.</p>
</div>

<div class="button-group">
  {%
    include button.html
    link="https://www.cs.ox.ac.uk/people/ana.namburete/"
    text="Departmental profile"
    icon="fa-solid fa-id-card"
  %}
  {%
    include button.html
    type="address"
    tooltip="Our location on Google Maps for easy navigation"
    link="https://goo.gl/maps/hJHW2pXSe1xK5XFM7"
  %}
</div>

{% include section.html %}

<img src="{{ site.url }}{{ site.baseurl }}/images/misc/location_map.png" alt="Map showing the Department of Computer Science on Parks Road" style="width: 85%">
