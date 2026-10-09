---
title: Handbook
---

{% include section.html dark=true %}

<div class="omni-intro">
  <span class="omni-kicker">Lab life</span>
  <h1>Handbook</h1>
  <p>A guide to the OMNI Lab: our culture, our values, and how we work together. It is a living document that we update as we grow.</p>
  <div class="omni-actions">
    {% include button.html link="pdfs/misc/lab_handbook.pdf" text="Download the handbook (PDF)" %}
  </div>
</div>

{% include section.html %}

<div class="omni-left">
  <h2 style="margin: 0 0 28px">What’s inside</h2>
</div>

<div class="omni-inside">
  <div class="omni-aside-card">
    <h3>Science and mission</h3>
    <p>What we work on, and the values behind it: openness, collaboration and practical impact.</p>
  </div>
  <div class="omni-aside-card">
    <h3>Roles and expectations</h3>
    <p>How we run the lab, and what students, early-career researchers and the PI can expect.</p>
  </div>
  <div class="omni-aside-card">
    <h3>Culture</h3>
    <p>Work and wellbeing, workplace conduct, equality, diversity and inclusion, and good citizenship.</p>
  </div>
  <div class="omni-aside-card">
    <h3>Development</h3>
    <p>Careers, open and responsible research, use of AI, collaborations, travel and public engagement.</p>
  </div>
</div>

<div class="omni-soft-card omni-wiki">
  <span class="omni-label">For lab members</span>
  <h3>Lab wiki</h3>
  <p>Processes, resources and know-how. Connect to the University network or VPN, then open a tunnel to the wiki server:</p>
  <pre class="omni-code"><code>ssh -fNT -L 8080:localhost:8080 wiki</code></pre>
  <p>Then open the wiki in your browser:</p>
  <div class="omni-actions">
    {% include button.html link="http://127.0.0.1:8080/" text="Open the wiki (127.0.0.1:8080)" style="bare" %}
  </div>

  <details class="omni-troubleshoot">
    <summary>Trouble accessing the wiki?</summary>
    <ul>
      <li>Are you on the University network, or connected through the VPN?</li>
      <li>Is another process already using port 8080 on your computer? See “Port busy” below.</li>
      <li>Try restarting the wiki. See “Restart the wiki” below.</li>
      <li>If nothing works, ask the lab’s {% include email-link.html email=site.web_admin_email text="web administrator" %}.</li>
    </ul>
    <h4>Port busy</h4>
    <p>Check whether port 8080 is in use:</p>
    <pre class="omni-code"><code>lsof -i :8080</code></pre>
    <p>If it is, stop the process using it, then run the tunnel command again:</p>
    <pre class="omni-code"><code>kill -9 $(lsof -ti:8080)</code></pre>
    <h4>Restart the wiki</h4>
    <p>If you have access to the wiki server, log in and run the restart script:</p>
    <pre class="omni-code"><code>ssh wiki
cd omni-wiki
./restart.sh</code></pre>
  </details>
</div>
