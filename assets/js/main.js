(function () {
  "use strict";
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const SVGNS = "http://www.w3.org/2000/svg";

  // ---------- helpers ----------
  function h(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat(Infinity)) if (c != null && c !== false) node.append(c);
    return node;
  }
  function s(tag, attrs = {}, ...children) {
    const node = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) if (v != null) node.setAttribute(k, v);
    for (const c of children.flat(Infinity)) if (c != null && c !== false) node.append(c);
    return node;
  }
  const parseYM = (d) => { const [y, m] = d.split("-").map(Number); return { y, m: m || 1 }; };
  const fmtMonth = (d) => { const { y, m } = parseYM(d); return `${MONTHS[m - 1]} ${y}`; };
  const now = new Date();
  const nowKey = now.getFullYear() * 100 + (now.getMonth() + 1);
  const ymKey = (d) => { const { y, m } = parseYM(d); return y * 100 + m; };
  const icon = (path, vb = "0 0 24 24") => { const svg = s("svg", { viewBox: vb, "aria-hidden": "true" }); svg.innerHTML = `<path d="${path}"/>`; return svg; };

  const ICONS = {
    mail: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.4.1L12 11.7l7.6-6.1a.5.5 0 0 0-.1 0h-15a.5.5 0 0 0-.1 0ZM20 7.9l-7.4 5.9a1 1 0 0 1-1.2 0L4 7.9v10.6c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V7.9Z",
    scholar: "M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.84 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.16 4.44L24 9.5 12 0Z",
    github: "M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z",
    linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
    cv: "M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V9h5.5L13 3.5ZM8 13h8v1.5H8V13Zm0 3.5h8V18H8v-1.5Z",
    doc: "M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V9h5.5L13 3.5Z",
    arrow: "M6.4 18.3 5 16.9l9.6-9.6H8v-2h10v10h-2V8.7l-9.6 9.6Z",
    target: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z",
    cursor: "M5 3l14 7-6 2-2 6L5 3Z",
    quote: "M4 11.5C4 7.9 6.2 5.3 9.6 4.5l.6 1.7C8.3 6.9 7.3 8.3 7.2 10H10v7H4v-5.5Zm10 0c0-3.6 2.2-6.2 5.6-7l.6 1.7c-1.9.7-2.9 2.1-3 3.8H20v7h-6v-5.5Z"
  };

  const P = S.person;
  const pubById = Object.fromEntries(S.publications.map((p) => [p.id, p]));
  const topicKeys = Object.keys(S.topics);
  const byMe = (a) => a === P.name;

  // ---------- hero ----------
  $("#photo").src = P.photo;
  $("#name").textContent = P.name;
  $("#role").textContent = P.role;
  $("#tagline").textContent = P.tagline;
  $("#affiliations").append(...P.affiliations.map((a) =>
    h("li", {}, h("a", { href: a.url, target: "_blank", rel: "noopener" }, a.name, h("span", {}, a.detail)))
  ));
  const social = (href, label, path, cls = "") =>
    h("a", { class: `social ${cls}`, href, target: href.startsWith("mailto:") ? null : "_blank", rel: "noopener" }, icon(path), label);
  $("#socials").append(
    social(`mailto:${P.email}`, "Email", ICONS.mail, "primary"),
    social(P.links.scholar, "Scholar", ICONS.scholar),
    social(P.links.github, "GitHub", ICONS.github),
    social(P.links.linkedin, "LinkedIn", ICONS.linkedin),
    social(P.links.cv, "CV", ICONS.cv)
  );

  // ---------- news & about ----------
  $("#news").append(...S.news.map((n) =>
    h("li", {},
      h("span", { class: "news-date" }, fmtMonth(n.date)),
      h("p", {},
        h("span", { html: n.text }),
        n.paper ? h("a", { class: "paper-link", href: `#pub-${n.paper}`, onclick: (e) => { e.preventDefault(); focusPub(n.paper); } }, "Read →") : null)
    )
  ));
  $("#about").append(...S.about.map((t) => h("p", { html: t })));
  $("#research-text").innerHTML = S.research;

  // ---------- research map ----------
  // Geometry follows the original hand-made map.
  const TOPIC_POS = { qc: [560, 150], po: [250, 520], lr: [870, 520] };
  const CLUSTERS = {
    "qc+po": { at: [350, 330], edges: [["qc", [484, 215, 418, 271]], ["po", [297, 431, 308, 410]]] },
    "qc+lr": { at: [770, 330], edges: [["qc", [636, 215, 702, 271]], ["lr", [823, 431, 812, 410]]] },
    "po+lr": { at: [560, 610], edges: [["po", [346, 548, 474, 585]], ["lr", [774, 548, 646, 585]]] }
  };
  const clusterKey = (topics) => {
    const t = [...topics].sort((a, b) => topicKeys.indexOf(a) - topicKeys.indexOf(b));
    return t.length === 2 ? t.join("+") : null;
  };
  const map = $("#map");
  const litables = []; // {node, keys:Set}
  const reg = (node, keys) => { litables.push({ node, keys: new Set(keys) }); return node; };

  const gClusters = s("g"), gEdges = s("g"), gTopics = s("g"), gPapers = s("g");
  for (const [key, c] of Object.entries(CLUSTERS)) {
    const [a, b] = key.split("+");
    gClusters.append(reg(s("circle", { class: "m-cluster", cx: c.at[0], cy: c.at[1], r: 90 }), [`c:${key}`, `t:${a}`, `t:${b}`]));
    for (const [t, [x1, y1, x2, y2]] of c.edges) {
      gEdges.append(reg(s("line", { class: "m-edge", x1, y1, x2, y2 }), [`c:${key}`, `t:${t}`, `e:${key}:${t}`]));
    }
  }
  for (const [key, [cx, cy]] of Object.entries(TOPIC_POS)) {
    const words = S.topics[key].name.split(" ");
    const text = s("text", { x: cx, y: cy - (words.length - 1) * 15 + 7 },
      ...words.map((w, i) => s("tspan", { x: cx, dy: i ? 30 : 0 }, w)));
    const g = reg(s("g", { class: "m-topic", tabindex: 0, role: "button", "aria-label": `${S.topics[key].name}: show related papers`, "data-topic": key },
      s("circle", { cx, cy, r: 100 }), text), [`t:${key}`]);
    g.addEventListener("mouseenter", () => preview({ topic: key }));
    g.addEventListener("mouseleave", restore);
    g.addEventListener("click", () => select({ topic: key }));
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select({ topic: key }); } });
    gTopics.append(g);
  }
  for (const p of S.publications) {
    if (!p.map) continue;
    const [cx, cy] = p.map;
    const keys = [`p:${p.id}`, ...p.topics.map((t) => `t:${t}`)];
    const ck = clusterKey(p.topics);
    if (ck) keys.push(`c:${ck}`, ...p.topics.map((t) => `e:${ck}:${t}`));
    else if (p.topics.length === 1) {
      // Single-topic paper: draw a short connector to its topic bubble.
      const [tx, ty] = TOPIC_POS[p.topics[0]];
      const dx = cx - tx, dy = cy - ty, d = Math.hypot(dx, dy);
      gEdges.append(reg(s("line", {
        class: "m-edge",
        x1: tx + dx / d * 100, y1: ty + dy / d * 100, x2: cx - dx / d * 34, y2: cy - dy / d * 34
      }), [`p:${p.id}`, `t:${p.topics[0]}`]));
      keys.push(`e:solo:${p.id}`);
    }
    const g = reg(s("g", {
      class: `m-paper ${p.status}${p.firstAuthor ? " first" : ""}`, tabindex: 0, role: "button",
      "aria-label": `${p.id}: ${p.title} (${p.status}${p.firstAuthor ? ", first author" : ""})`, "data-id": p.id
    }, s("g", { class: "bubble" }, s("circle", { cx, cy, r: 34 }), s("text", { x: cx, y: cy }, p.id))), keys);
    g.addEventListener("mouseenter", () => preview({ paper: p.id }));
    g.addEventListener("mouseleave", restore);
    g.addEventListener("click", (e) => { e.stopPropagation(); select({ paper: p.id }); });
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select({ paper: p.id }); } });
    gPapers.append(g);
  }
  map.append(gClusters, gEdges, gTopics, gPapers);

  let selected = null; // {paper} | {topic} | null
  function highlight(state) {
    litables.forEach(({ node }) => node.classList.remove("lit", "active"));
    if (!state) { map.classList.remove("dimmed"); return; }
    map.classList.add("dimmed");
    let want;
    if (state.paper) {
      const p = pubById[state.paper];
      const ck = clusterKey(p.topics);
      want = new Set([`p:${p.id}`, ...p.topics.map((t) => `t:${t}`)]);
      if (ck) { want.add(`c:${ck}`); p.topics.forEach((t) => want.add(`e:${ck}:${t}`)); }
      litables.forEach(({ node, keys }) => {
        const isPaperNode = node.dataset && node.dataset.id;
        const isTopicNode = node.dataset && node.dataset.topic;
        const hit = isPaperNode ? keys.has(`p:${p.id}`)
          : isTopicNode ? p.topics.includes(node.dataset.topic)
          : [...keys].some((k) => want.has(k) && (k.startsWith("c:") || k.startsWith("e:") || k.startsWith("p:")));
        if (hit) node.classList.add("lit");
        if (isPaperNode && keys.has(`p:${p.id}`)) node.classList.add("active");
      });
    } else {
      const t = state.topic;
      litables.forEach(({ node, keys }) => {
        if (keys.has(`t:${t}`)) node.classList.add("lit");
        if (node.dataset && node.dataset.topic === t) node.classList.add("active");
      });
    }
  }

  const panel = $("#map-panel");
  function tagsFor(p) {
    return [
      h("span", { class: `tag ${p.status}` }, p.status === "published" ? "Published" : "Preprint"),
      p.firstAuthor ? h("span", { class: "tag" }, "First author") : null,
      ...p.topics.map((t) => h("span", { class: "tag topic" }, S.topics[t].name))
    ];
  }
  function linkButtons(p) {
    const out = [];
    if (p.links.journal) out.push(h("a", { class: "link-btn", href: p.links.journal, target: "_blank", rel: "noopener" }, icon(ICONS.doc), "Journal"));
    if (p.links.arxiv) out.push(h("a", { class: "link-btn", href: p.links.arxiv, target: "_blank", rel: "noopener" }, icon(ICONS.doc), "arXiv"));
    if (p.links.code) out.push(h("a", { class: "link-btn", href: p.links.code, target: "_blank", rel: "noopener" }, icon(ICONS.github), "Code"));
    return out;
  }
  const authorLine = (p) => p.authors.map((a, i) => [i ? ", " : "", byMe(a) ? h("strong", {}, a) : a]);
  const snippet = (text, n = 260) => text.length > n ? text.slice(0, text.lastIndexOf(" ", n)) + "…" : text;

  function panelDefault() {
    panel.replaceChildren(
      h("p", { class: "panel-hint" }, icon(ICONS.cursor), "Hover a bubble to preview, click to pin it here. Papers sit between the topics they connect."),
      h("ul", { class: "panel-topics" }, ...topicKeys.map((k) => {
        const n = S.publications.filter((p) => p.map && p.topics.includes(k)).length;
        return h("li", {}, h("button", { type: "button", onclick: () => select({ topic: k }), onmouseenter: () => highlight({ topic: k }), onmouseleave: () => highlight(selected) },
          h("h3", {}, S.topics[k].name),
          h("p", {}, S.topics[k].blurb),
          h("p", { class: "count" }, `${n} papers →`)));
      }))
    );
  }
  function panelPaper(p) {
    panel.replaceChildren(
      h("button", { class: "panel-back", type: "button", onclick: () => select(null) }, "← All topics"),
      h("div", { class: "panel-paper" },
        h("div", { class: "tagrow" }, tagsFor(p)),
        h("h3", {}, p.title),
        h("p", { class: "authors" }, authorLine(p)),
        h("p", { class: "venue" }, `${p.venue} · ${fmtMonth(p.date)}`),
        h("p", { class: "snippet" }, snippet(p.abstract))),
      h("div", { class: "links" }, ...linkButtons(p),
        h("a", { class: "link-btn", href: `#pub-${p.id}`, onclick: (e) => { e.preventDefault(); focusPub(p.id); } }, icon(ICONS.arrow), "In the list"))
    );
  }
  function panelTopic(k) {
    const papers = S.publications.filter((p) => p.map && p.topics.includes(k));
    panel.replaceChildren(
      h("button", { class: "panel-back", type: "button", onclick: () => select(null) }, "← All topics"),
      h("div", { class: "panel-paper" },
        h("p", { class: "kicker" }, "Topic"),
        h("h3", {}, S.topics[k].name),
        h("p", { class: "snippet", style: "margin-top:10px" }, S.topics[k].blurb)),
      h("ul", { class: "panel-topics", style: "gap:4px;margin-bottom:16px" }, ...papers.map((p) =>
        h("li", {}, h("button", { type: "button", onclick: () => select({ paper: p.id }), onmouseenter: () => highlight({ paper: p.id }), onmouseleave: () => highlight(selected) },
          h("p", { style: "margin:0;font-size:14px" }, h("strong", {}, p.id), " · ", p.title))))),
      h("div", { class: "links" },
        window.SITE.explainers && window.SITE.explainers[k] ? h("a", { class: "link-btn", href: "#explained", onclick: (e) => { e.preventDefault(); if (window.Explainer) window.Explainer.open(k); } }, icon(ICONS.cursor), "Explain it simply") : null,
        h("a", { class: "link-btn", href: "#publications", onclick: (e) => { e.preventDefault(); setPubFilter(k); $("#publications").scrollIntoView(); } }, icon(ICONS.arrow), "Filter publications"))
    );
  }
  function render(state) {
    if (!state) panelDefault();
    else if (state.paper) panelPaper(pubById[state.paper]);
    else panelTopic(state.topic);
  }
  function preview(state) { highlight(state); render(state); }
  function restore() { highlight(selected); render(selected); }
  function select(state) { selected = state; restore(); }
  map.addEventListener("click", (e) => { if (e.target === map) select(null); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && selected && !$("#cite-dialog").open) select(null);
  });
  panelDefault();

  // Entrance: topics grow, edges draw, papers pop in, the first time the map is seen.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    map.querySelectorAll(".m-edge").forEach((l) => l.style.setProperty("--len", `${Math.ceil(l.getTotalLength())}`));
    map.querySelectorAll(".m-topic").forEach((g, i) => g.style.setProperty("--d", `${i * 0.12}s`));
    map.querySelectorAll(".m-paper .bubble").forEach((b, i) => b.style.setProperty("--d", `${0.75 + i * 0.07}s`));
    map.classList.add("pre");
    const mio = new IntersectionObserver((entries) => {
      if (!entries.some((en) => en.isIntersecting)) return;
      mio.disconnect();
      map.classList.add("play");
      setTimeout(() => map.classList.remove("pre", "play"), 2200);
    }, { threshold: 0.3 });
    mio.observe(map);
  }

  // ---------- publications ----------
  const pubFilters = [
    { key: "all", label: "All", test: () => true },
    ...topicKeys.map((k) => ({ key: k, label: S.topics[k].name, test: (p) => p.topics.includes(k) })),
    { key: "first", label: "First author", test: (p) => p.firstAuthor },
    { key: "published", label: "Published", test: (p) => p.status === "published" }
  ];
  let pubFilter = "all";
  const pubList = $("#pubs");
  const pubFilterBar = $("#pub-filters");
  pubFilterBar.append(...pubFilters.map((f) =>
    h("button", { class: "chip", type: "button", "data-key": f.key, "aria-pressed": String(f.key === pubFilter), onclick: () => setPubFilter(f.key) },
      f.label, h("span", { class: "n" }, String(S.publications.filter(f.test).length)))
  ));
  function setPubFilter(key) {
    pubFilter = key;
    pubFilterBar.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.key === key)));
    renderPubs();
  }
  function renderPubs() {
    const f = pubFilters.find((x) => x.key === pubFilter);
    const items = S.publications.filter(f.test);
    pubList.replaceChildren(...items.map((p) =>
      h("li", { class: "pub card", id: `pub-${p.id}` },
        h("div", { class: `pub-badge ${p.status}${p.firstAuthor ? " first" : ""}`, "aria-hidden": "true" }, p.id),
        h("div", {},
          h("h3", {}, p.title),
          h("p", { class: "authors" }, authorLine(p)),
          h("div", { class: "meta" }, h("span", { class: "venue" }, `${p.venue} · ${fmtMonth(p.date)}`), tagsFor(p)),
          h("div", { class: "links" }, ...linkButtons(p),
            p.map ? h("button", { class: "link-btn", type: "button", onclick: () => { select({ paper: p.id }); $("#research").scrollIntoView(); } }, icon(ICONS.target), "On the map") : null,
            h("button", { class: "link-btn", type: "button", onclick: () => openCite(p.id) }, icon(ICONS.quote), "Cite")),
          h("details", {}, h("summary", {}, "Abstract"), h("p", {}, p.abstract))))
    ));
    if (!items.length) pubList.append(h("li", { class: "pubs-empty" }, "Nothing here yet."));
  }
  function focusPub(id, instant = false) {
    if (!pubFilters.find((f) => f.key === pubFilter).test(pubById[id])) setPubFilter("all");
    const card = document.getElementById(`pub-${id}`);
    card.scrollIntoView({ block: "center", behavior: instant ? "instant" : "smooth" });
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
    setTimeout(() => card.classList.remove("flash"), 1800);
    history.replaceState(null, "", `#pub-${id}`);
  }
  renderPubs();

  // ---------- citations ----------
  const TEX = {
    "ç": "{\\c{c}}", "č": "{\\v{c}}", "ě": "{\\v{e}}", "ř": "{\\v{r}}", "š": "{\\v{s}}", "Š": "{\\v{S}}", "ž": "{\\v{z}}",
    "á": "{\\'a}", "é": "{\\'e}", "í": "{\\'i}", "ó": "{\\'o}", "ú": "{\\'u}", "è": "{\\`e}", "à": "{\\`a}",
    "ä": "{\\\"a}", "ö": "{\\\"o}", "ü": "{\\\"u}", "ñ": "{\\~n}", "ł": "{\\l}"
  };
  const tex = (str) => str.replace(/[^\x00-\x7F]/g, (c) => TEX[c] || c);
  const ascii = (str) => str.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  // Compound surnames that the "last word is the surname" rule would get wrong.
  const SURNAMES = { "Llorenç Balada Gaggioli": ["Balada Gaggioli", "Llorenç"] };
  const splitName = (n) => SURNAMES[n] || [n.split(" ").slice(-1)[0], n.split(" ").slice(0, -1).join(" ")];
  const STOP = new Set(["a", "an", "the", "of", "on", "and", "for", "via", "with", "in"]);
  function bibtex(p) {
    const [last] = splitName(p.authors[0]);
    const year = p.date.slice(0, 4);
    const word = p.title.split(/\s+/).find((w) => !STOP.has(w.toLowerCase())) || "paper";
    const key = ascii(last).toLowerCase().replace(/[^a-z]/g, "") + year + ascii(word).toLowerCase().replace(/[^a-z]/g, "");
    // Brace words with capitals (after the first) so bibliography styles keep their case.
    const title = p.title.split(" ").map((w, i) => (i && /[A-Z]/.test(w) ? `{${tex(w)}}` : tex(w))).join(" ");
    const authors = p.authors.map((a) => { const [l, f] = splitName(a); return tex(f ? `${l}, ${f}` : l); }).join(" and ");
    const arxiv = p.links.arxiv && p.links.arxiv.match(/abs\/(.+)$/);
    const fields = p.cite
      ? [["title", title], ["author", authors], ["journal", p.cite.journal], ["volume", p.cite.volume], ["pages", p.cite.number], ["year", year], ["doi", p.cite.doi]]
      : [["title", title], ["author", authors], ["year", year], ...(arxiv ? [["eprint", arxiv[1]], ["archivePrefix", "arXiv"], ["url", p.links.arxiv]] : [])];
    const pad = Math.max(...fields.map(([k]) => k.length));
    return `@${p.cite ? "article" : "misc"}{${key},\n${fields.map(([k, v]) => `  ${k.padEnd(pad)} = {${v}}`).join(",\n")}\n}`;
  }
  const citeDialog = $("#cite-dialog");
  let citing = null;
  async function copyText(text, btn, done) {
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const r = document.createRange(); r.selectNodeContents($("#cite-bib"));
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); document.execCommand("copy");
    }
    const old = btn.textContent; btn.textContent = done;
    setTimeout(() => { btn.textContent = old; }, 1600);
  }
  function openCite(id) {
    citing = pubById[id];
    $("#cite-paper").textContent = citing.title;
    $("#cite-bib").textContent = bibtex(citing);
    citeDialog.showModal();
  }
  $("#cite-copy").addEventListener("click", (e) => copyText($("#cite-bib").textContent, e.currentTarget, "Copied ✓"));
  $("#cite-link").addEventListener("click", (e) => copyText(`${location.origin}${location.pathname}#pub-${citing.id}`, e.currentTarget, "Link copied ✓"));
  citeDialog.addEventListener("click", (e) => { if (e.target === citeDialog) citeDialog.close(); });

  // ---------- activities ----------
  const KIND = { conference: "Conference", workshop: "Workshop", school: "School", visit: "Research visit", course: "Course" };
  const KIND_COLOR = { conference: "var(--blue)", workshop: "var(--green)", school: "var(--yellow)", visit: "#c77d9b", course: "var(--ink-faint)" };
  const actFilters = [
    { key: "all", label: "All", test: () => true },
    { key: "upcoming", label: "Upcoming", test: (a) => ymKey(a.date) > nowKey },
    { key: "talk", label: "Talks", test: (a) => a.role === "talk" },
    { key: "poster", label: "Posters", test: (a) => a.role === "poster" },
    ...Object.keys(KIND).map((k) => ({ key: k, label: `${KIND[k]}s`, test: (a) => a.kind === k }))
  ].filter((f) => S.activities.some(f.test));
  let actFilter = "all";
  const actBar = $("#act-filters");
  actBar.append(...actFilters.map((f) =>
    h("button", { class: "chip", type: "button", "data-key": f.key, "aria-pressed": String(f.key === actFilter), onclick: () => { actFilter = f.key; actBar.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.key === f.key))); renderActs(); } },
      f.label, h("span", { class: "n" }, String(S.activities.filter(f.test).length)))
  ));
  function renderActs() {
    const f = actFilters.find((x) => x.key === actFilter);
    const items = S.activities.filter(f.test).sort((a, b) => ymKey(b.date) - ymKey(a.date));
    const years = [...new Set(items.map((a) => parseYM(a.date).y))];
    $("#acts").replaceChildren(...years.map((y) =>
      h("div", { class: "act-year" },
        h("h3", {}, String(y)),
        h("ul", { class: "act-list" }, ...items.filter((a) => parseYM(a.date).y === y).map((a) => {
          const upcoming = ymKey(a.date) > nowKey;
          return h("li", { class: `act${upcoming ? " is-upcoming" : ""}` },
            h("span", { class: "act-month" }, MONTHS[parseYM(a.date).m - 1]),
            h("div", {},
              h("div", { class: "act-title" }, a.title),
              h("div", { class: "act-place" }, h("span", { class: "kind-dot", style: `background:${KIND_COLOR[a.kind]}` }), `${KIND[a.kind]} · ${a.place}`)),
            h("div", { class: "act-tags" },
              upcoming ? h("span", { class: "tag upcoming" }, "Upcoming") : null,
              a.role ? h("span", { class: `tag ${a.role}` }, a.role === "talk" ? "Talk" : "Poster") : null));
        })))
    ));
  }
  renderActs();

  // Shared links like /#pub-UGS open with that paper highlighted.
  const deep = location.hash.match(/^#pub-(.+)$/);
  if (deep && pubById[deep[1]]) setTimeout(() => focusPub(deep[1], true), 300);

  // ---------- CV ----------
  $("#cv-link").href = P.links.cv;
  $("#timeline").append(...S.cv.map((e) =>
    h("li", { class: `tl ${e.kind}${e.end ? "" : " current"}` },
      h("div", { class: "tl-date" }, `${fmtMonth(e.start)} – ${e.end ? fmtMonth(e.end) : "present"}`),
      h("div", {},
        h("h3", {}, e.title, h("span", { class: `tag tl-kind ${e.kind}` }, e.kind === "education" ? "Education" : "Research")),
        h("p", {},
          h("a", { href: e.orgUrl, target: "_blank", rel: "noopener" }, e.org),
          e.group ? [" · ", h("a", { href: e.groupUrl, target: "_blank", rel: "noopener" }, e.group)] : null)))
  ));

  // ---------- footer ----------
  const mail = $("#footer-email");
  mail.href = `mailto:${P.email}`;
  mail.textContent = P.email;
  $("#address").append(...P.address.flatMap((l, i) => (i ? [h("br"), l] : [l])));
  $("#year").textContent = String(now.getFullYear());
  const star = (cx, cy, r) => {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.4 : r;
      d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)}`;
    }
    return s("path", { d: d + "Z" });
  };
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    $("#eu-stars").append(star(30 + 12 * Math.sin(a), 20 - 12 * Math.cos(a), 2.2));
  }

  // ---------- chrome: nav, theme, reveal ----------
  const topbar = $(".topbar");
  const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = $(".menu-toggle"), links = $("#nav-links");
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { menuBtn.setAttribute("aria-expanded", "false"); links.classList.remove("open"); }
  });

  const navLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((sec) => spy.observe(sec));

  const root = document.documentElement;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : mq.matches;
  const syncTheme = () => root.classList.toggle("is-dark", isDark());
  $(".theme-toggle").addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    syncTheme();
  });
  mq.addEventListener("change", syncTheme);
  syncTheme();

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const els = document.querySelectorAll(".section-head, .map-wrap, .intro-grid > *, .pub, .act-year, .tl");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }
})();
