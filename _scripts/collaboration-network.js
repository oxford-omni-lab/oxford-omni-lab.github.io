(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function collaborationNetworkReady(callback) {
    if (window.d3) {
      callback();
      return;
    }

    window.addEventListener("load", function () {
      if (window.d3) callback();
    });
  }

  function normalizeUrl(url) {
    if (!url) return "";
    if (url.indexOf("http") === 0) return url;
    var base = document.querySelector("base");
    return new URL(url, base ? base.href : window.location.origin).toString();
  }

  function textLines(text, limit) {
    var words = String(text || "").split(/\s+/).filter(Boolean);
    var lines = [];
    var line = "";

    words.forEach(function (word) {
      var next = line ? line + " " + word : word;
      if (next.length > limit && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });

    if (line) lines.push(line);
    return lines.slice(0, 3);
  }

  function cssNumber(element, name, fallback) {
    var value = getComputedStyle(element).getPropertyValue(name).trim();
    var parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function buildGraph(data) {
    var center = {
      id: "center",
      type: "center",
      name: data.center.name,
      logo: data.center.logo,
      logoAlt: data.center.logo_alt || data.center.name,
    };

    var fields = (data.fields || []).map(function (field) {
      return {
        id: "field-" + field.id,
        fieldId: field.id,
        type: "field",
        name: field.title,
      };
    });

    var fieldIds = new Set(fields.map(function (field) { return field.fieldId; }));
    var collaborators = (data.collaborators || [])
      .filter(function (collaborator) { return fieldIds.has(collaborator.field); })
      .map(function (collaborator, index) {
        return {
          id: "collaborator-" + index,
          type: "collaborator",
          name: collaborator.name,
          fieldId: collaborator.field,
          parentId: "field-" + collaborator.field,
          logo: collaborator.logo,
          logoAlt: collaborator.logo_alt || collaborator.name,
          description: collaborator.description,
          url: collaborator.url,
        };
      });

    var links = fields.map(function (field) {
      return {
        id: "center-" + field.id,
        source: center.id,
        target: field.id,
        type: "field",
      };
    }).concat(collaborators.map(function (collaborator) {
      return {
        id: collaborator.parentId + "-" + collaborator.id,
        source: collaborator.parentId,
        target: collaborator.id,
        type: "collaborator",
      };
    }));

    return {
      nodes: [center].concat(fields, collaborators),
      links: links,
      center: center,
      fields: fields,
      collaborators: collaborators,
    };
  }

  function radialLayout(graph, width, height, sizes) {
    var centerX = width / 2;
    var centerY = height / 2;
    var fieldRadius = Math.min(width, height) * 0.22;
    var collaboratorRadius = Math.min(width, height) * 0.39;
    var fieldAngleStep = (Math.PI * 2) / Math.max(graph.fields.length, 1);

    graph.center.x = centerX;
    graph.center.y = centerY;
    graph.center.r = sizes.center;

    graph.fields.forEach(function (field, index) {
      var angle = -Math.PI / 2 + index * fieldAngleStep;
      field.angle = angle;
      field.x = centerX + Math.cos(angle) * fieldRadius;
      field.y = centerY + Math.sin(angle) * fieldRadius;
      field.r = sizes.field;
    });

    graph.fields.forEach(function (field) {
      var group = graph.collaborators.filter(function (collaborator) {
        return collaborator.fieldId === field.fieldId;
      });
      var spread = Math.min(Math.PI / 2.3, Math.max(Math.PI / 5, group.length * 0.18));
      var start = field.angle - spread / 2;
      var step = group.length > 1 ? spread / (group.length - 1) : 0;

      group.forEach(function (collaborator, index) {
        var angle = group.length > 1 ? start + index * step : field.angle;
        collaborator.x = centerX + Math.cos(angle) * collaboratorRadius;
        collaborator.y = centerY + Math.sin(angle) * collaboratorRadius;
        collaborator.r = sizes.collaborator;
      });
    });
  }

  function treeLayout(graph, width, sizes) {
    var y = 72;
    var centerX = width / 2;

    graph.center.x = centerX;
    graph.center.y = y;
    graph.center.r = sizes.centerMobile;
    y += 128;

    graph.fields.forEach(function (field) {
      var group = graph.collaborators.filter(function (collaborator) {
        return collaborator.fieldId === field.fieldId;
      });

      field.x = centerX;
      field.y = y;
      field.r = sizes.fieldMobile;
      y += 94;

      group.forEach(function (collaborator, index) {
        var side = index % 2 === 0 ? -1 : 1;
        var row = Math.floor(index / 2);
        collaborator.x = centerX + side * Math.min(110, width * 0.28);
        collaborator.y = y + row * 78;
        collaborator.r = sizes.collaboratorMobile;
      });

      y += Math.max(1, Math.ceil(group.length / 2)) * 78 + 42;
    });

    return Math.max(y, 760);
  }

  function drawNetwork(root) {
    var json = root.querySelector("[data-network-json]");
    var canvas = root.querySelector("[data-network-canvas]");
    var card = root.querySelector("[data-network-card]");
    var cardTitle = root.querySelector("[data-network-card-title]");
    var cardDescription = root.querySelector("[data-network-card-description]");
    var cardLink = root.querySelector("[data-network-card-link]");
    var data = JSON.parse(json.textContent);
    var graph = buildGraph(data);
    var selectedId = null;
    var activeId = null;
    var sizes = {};

    var svg = d3.select(canvas)
      .append("svg")
      .attr("class", "collaboration-network-svg")
      .attr("role", "group")
      .attr("aria-label", "OMNI collaboration network");

    var linkLayer = svg.append("g").attr("class", "network-links");
    var nodeLayer = svg.append("g").attr("class", "network-nodes");

    function linkedToActive(link) {
      if (!activeId) return false;
      var active = graph.nodes.find(function (node) { return node.id === activeId; });
      if (!active) return false;
      if (active.type === "field") {
        return link.source === "center" && link.target === active.id;
      }
      if (active.type === "collaborator") {
        return (link.source === active.parentId && link.target === active.id) ||
          (link.source === "center" && link.target === active.parentId);
      }
      return link.source === "center";
    }

    function nodeInActivePath(node) {
      if (!activeId) return false;
      if (node.id === "center") return true;
      if (node.id === activeId) return true;
      var active = graph.nodes.find(function (item) { return item.id === activeId; });
      return active && active.type === "collaborator" && node.id === active.parentId;
    }

    function setActive(id, persist) {
      activeId = id;
      if (persist) selectedId = selectedId === id ? null : id;
      if (persist && selectedId === null) activeId = null;

      nodeLayer.selectAll(".collaboration-network-node")
        .classed("is-active", function (node) { return nodeInActivePath(node); })
        .classed("is-selected", function (node) { return selectedId && nodeInActivePath(node); })
        .classed("is-dimmed", function (node) { return activeId && !nodeInActivePath(node); });

      linkLayer.selectAll(".collaboration-network-link")
        .classed("is-active", linkedToActive)
        .classed("is-dimmed", function (link) { return activeId && !linkedToActive(link); });

      applyNodeSizing();

      var active = graph.nodes.find(function (node) { return node.id === activeId; });
      if (active && active.type === "collaborator") {
        showCard(active);
      } else {
        hideCard();
      }
    }

    function clearActive() {
      if (selectedId) return;
      activeId = null;
      setActive(null, false);
    }

    function clearActiveAfterHover() {
      window.setTimeout(function () {
        if (!selectedId && !card.matches(":hover")) clearActive();
      }, 80);
    }

    function hideCard() {
      card.classList.remove("is-visible");
      if (!selectedId) {
        window.setTimeout(function () {
          if (!card.classList.contains("is-visible")) card.hidden = true;
        }, 180);
      }
    }

    function showCard(node) {
      var rect = canvas.getBoundingClientRect();
      var x = Math.max(148, Math.min(node.x, rect.width - 148));
      var y = node.y + node.r + 18;

      card.hidden = false;
      card.style.left = x + "px";
      card.style.top = y + "px";
      cardTitle.textContent = node.name;
      cardTitle.href = node.url;
      cardDescription.textContent = node.description;
      cardLink.href = node.url;
      requestAnimationFrame(function () {
        card.classList.add("is-visible");
      });
    }

    function applyNodeSizing() {
      var duration = prefersReducedMotion ? 1 : 180;

      nodeLayer.selectAll(".collaboration-network-node").select(".node-shell")
        .transition()
        .duration(duration)
        .attr("r", function (node) {
          return node.type === "collaborator" && nodeInActivePath(node) ? node.r * sizes.hoverScale : node.r;
        });

      nodeLayer.selectAll(".collaboration-network-node").select(".node-ring")
        .transition()
        .duration(duration)
        .attr("r", function (node) {
          var radius = node.type === "collaborator" && nodeInActivePath(node) ? node.r * sizes.hoverScale : node.r;
          return radius + 3;
        });

      nodeLayer.selectAll(".collaboration-network-node").select(".node-logo")
        .transition()
        .duration(duration)
        .attr("x", function (node) {
          var size = node.r * (node.type === "collaborator" && nodeInActivePath(node) ? sizes.hoverLogoScale : sizes.logoScale);
          return -size / 2;
        })
        .attr("y", function (node) {
          var size = node.r * (node.type === "collaborator" && nodeInActivePath(node) ? sizes.hoverLogoScale : sizes.logoScale);
          return -size / 2;
        })
        .attr("width", function (node) {
          return node.r * (node.type === "collaborator" && nodeInActivePath(node) ? sizes.hoverLogoScale : sizes.logoScale);
        })
        .attr("height", function (node) {
          return node.r * (node.type === "collaborator" && nodeInActivePath(node) ? sizes.hoverLogoScale : sizes.logoScale);
        });
    }

    function updateSizes() {
      sizes = {
        center: cssNumber(root, "--network-center-bubble-size", 58),
        centerMobile: cssNumber(root, "--network-center-bubble-size-mobile", 52),
        field: cssNumber(root, "--network-field-bubble-size", 42),
        fieldMobile: cssNumber(root, "--network-field-bubble-size-mobile", 39),
        collaborator: cssNumber(root, "--network-collaborator-bubble-size", 31),
        collaboratorMobile: cssNumber(root, "--network-collaborator-bubble-size-mobile", 30),
        hoverScale: cssNumber(root, "--network-hover-bubble-scale", 1.35),
        logoScale: cssNumber(root, "--network-logo-size-scale", 1.16),
        hoverLogoScale: cssNumber(root, "--network-hover-logo-size-scale", 1.68),
      };
    }

    function render() {
      updateSizes();
      var width = canvas.clientWidth || 1000;
      var isMobile = width < 760;
      var height = isMobile ? treeLayout(graph, width, sizes) : 680;
      if (!isMobile) radialLayout(graph, width, height, sizes);

      svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("height", height);
      canvas.style.minHeight = height + "px";

      var nodeById = new Map(graph.nodes.map(function (node) { return [node.id, node]; }));

      var links = linkLayer.selectAll(".collaboration-network-link")
        .data(graph.links, function (link) { return link.id; })
        .join("path")
        .attr("class", "collaboration-network-link")
        .attr("d", function (link) {
          var source = nodeById.get(link.source);
          var target = nodeById.get(link.target);
          return "M" + source.x + "," + source.y + "L" + target.x + "," + target.y;
        });

      var nodes = nodeLayer.selectAll(".collaboration-network-node")
        .data(graph.nodes, function (node) { return node.id; })
        .join(function (enter) {
          var group = enter.append("g")
            .attr("class", function (node) {
              return "collaboration-network-node is-" + node.type;
            })
            .attr("tabindex", function (node) { return node.type === "collaborator" ? 0 : null; })
            .attr("role", function (node) { return node.type === "collaborator" ? "link" : "img"; })
            .attr("aria-label", function (node) { return node.name; });

          group.append("circle")
            .attr("class", "node-shell");

          group.append("circle")
            .attr("class", "node-ring")
            .attr("fill", "none")
            .attr("stroke", "transparent");

          group.filter(function (node) { return node.logo; })
            .append("image")
            .attr("class", "node-logo")
            .attr("href", function (node) { return normalizeUrl(node.logo); })
            .attr("preserveAspectRatio", "xMidYMid meet");

          group.filter(function (node) { return node.type === "field" || !node.logo; })
            .append("text")
            .attr("class", "node-label")
            .selectAll("tspan")
            .data(function (node) { return textLines(node.name, node.type === "center" ? 12 : 16); })
            .join("tspan")
            .attr("x", 0)
            .attr("dy", function (_, index) { return index === 0 ? 0 : 15; })
            .text(function (line) { return line; });

          group
            .append("title")
            .text(function (node) { return node.name; });

          return group;
        });

      nodes
        .attr("transform", function (node) { return "translate(" + node.x + "," + node.y + ")"; })
        .on("mouseenter", function (_, node) {
          if (node.type === "collaborator" && !selectedId) setActive(node.id, false);
        })
        .on("mouseleave", clearActiveAfterHover)
        .on("focus", function (_, node) {
          if (node.type === "collaborator" && !selectedId) setActive(node.id, false);
        })
        .on("blur", clearActive)
        .on("click", function (event, node) {
          if (node.type !== "collaborator") return;
          event.stopPropagation();
          setActive(node.id, true);
        })
        .on("keydown", function (event, node) {
          if (node.type !== "collaborator") return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setActive(node.id, true);
          }
          if (event.key === "Escape") {
            selectedId = null;
            activeId = null;
            setActive(null, false);
          }
        });

      nodes.select(".node-shell")
        .attr("r", function (node) { return node.r; });

      nodes.select(".node-ring")
        .attr("r", function (node) { return node.r + 3; });

      nodes.select(".node-logo")
        .attr("x", function (node) { return -node.r * sizes.logoScale / 2; })
        .attr("y", function (node) { return -node.r * sizes.logoScale / 2; })
        .attr("width", function (node) { return node.r * sizes.logoScale; })
        .attr("height", function (node) { return node.r * sizes.logoScale; });

      nodes.select(".node-label")
        .attr("y", function (node) { return node.type === "center" ? 5 : 4; });

      applyNodeSizing();
      if (activeId) setActive(activeId, false);
      return { links: links, nodes: nodes };
    }

    function playIntro() {
      root.classList.add("is-ready");

      if (prefersReducedMotion) {
        root.classList.add("has-played");
        return;
      }

      var order = { center: 0, field: 1, collaborator: 2 };
      nodeLayer.selectAll(".collaboration-network-node")
        .style("opacity", 0)
        .transition()
        .delay(function (node, index) { return order[node.type] * 260 + index * 45; })
        .duration(420)
        .style("opacity", 1)
        .on("end", function () { root.classList.add("has-played"); });

      linkLayer.selectAll(".collaboration-network-link")
        .style("opacity", 0)
        .attr("stroke-dasharray", function () { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function () { return this.getTotalLength(); })
        .transition()
        .delay(function (link, index) { return (link.type === "field" ? 240 : 620) + index * 35; })
        .duration(520)
        .style("opacity", 1)
        .attr("stroke-dashoffset", 0)
        .on("end", function () {
          d3.select(this).attr("stroke-dasharray", null);
        });
    }

    render();

    var resizeObserver = new ResizeObserver(function () {
      render();
    });
    resizeObserver.observe(canvas);

    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        playIntro();
        observer.disconnect();
      }
    }, { threshold: 0.28 });
    observer.observe(root);

    document.addEventListener("click", function (event) {
      if (!root.contains(event.target)) {
        selectedId = null;
        activeId = null;
        setActive(null, false);
      }
    });

    root.addEventListener("click", function (event) {
      if (event.target.closest(".collaboration-network-card")) return;
      selectedId = null;
      activeId = null;
      setActive(null, false);
    });

    card.addEventListener("mouseleave", clearActiveAfterHover);
  }

  collaborationNetworkReady(function () {
    document.querySelectorAll("[data-collaboration-network]").forEach(drawNetwork);
  });
}());
