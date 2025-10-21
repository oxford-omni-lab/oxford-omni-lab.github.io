---
title: Handbook
nav:
  order: 6
  tooltip: Lab handbook and link to wiki
---

# {% include icon.html icon="fa-solid fa-book" %}Handbook

The Handbook is meant as a guide to the Oxford OMNI Lab, providing information about our culture, values, and how we work together. It is a living document that will be updated as we evolve.

{% include button.html type="pdf" text="Lab Handbook" link="../pdfs/misc/lab_handbook.pdf" %}

{% include section.html %}

## Wiki

For our Lab members we also have a Wiki with Information about processes, Lab resources, contact people and more institutional knowledge.

**The wiki can only be accessed by lab members with access to our cluster.**
**When accessing from outside the University, you need VPN to access the wiki.**

To access it please run the following command to tunnel the wiki server to your local machine and then **use the button below**:

```bash
ssh -fNT -L 8080:localhost:8080 wiki
```

{% include button.html
   text="Go to Wiki"
   link="http://127.0.0.1:8080/"
   type="docs"
   icon="fa-solid fa-book"
%}

{% include section.html %}

## Trouble shoot access

If you have trouble accessing the wiki, please check the following:

- Have you used VPN to connect to the University network or are you on the University network?
- Is a process already using port 8080 on your local machine? see below [port busy](#port-busy)
- try restarting the wiki, see below [restart wiki](#restart-wiki)
- If everything else fails, ask the lab [web admin](mailto:{{ site.web_admin_email }})

### port busy

```shell
# Check if port is busy
lsof -i :8080
```

If so use the PID to kill the process:

```shell
# Delete processes using port 8080
kill -9 $(lsof -ti:8080)
```

You should then be able to access the wiki using the command above.

### restart wiki

If you have access to the wiki server you can restart the wiki using the following commands:

```shell
# SSH into the wiki server
ssh wiki
```

then run the restart script:

```shell
# Restart the wiki
cd omni-wiki
./restart.sh
```
