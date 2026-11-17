/*
 * The map in Activities: every place in `activities` and `cv` (data.js), found through their
 * `where` keys in `places`. Thin arcs start from Prague, my base. The map libraries and the
 * world outline (from cdn.jsdelivr.net) load only when the section comes near the screen.
 */
(function () {
  "use strict";
  const S = window.SITE, I18N = window.I18N, T = I18N.t, tr = I18N.tr;
  const root = document.getElementById("places");
  if (!root || !S.places) return;

  const CDN = "https://cdn.jsdelivr.net/npm/";
  const LIBS = [
    CDN + "d3-array@3.2.4/dist/d3-array.min.js",
    CDN + "d3-geo@3.1.0/dist/d3-geo.min.js",
    CDN + "topojson-client@3.1.0/dist/topojson-client.min.js"
  ];
  const ATLAS = CDN + "world-atlas@2.0.2/countries-50m.json";
  const HOME = "prague";
  const W = 960, H = 600;
  const NS = "http://www.w3.org/2000/svg";

  function h(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat(Infinity)) if (c != null && c !== false) node.append(c);
    return node;
  }
  function s(tag, attrs = {}, ...children) {
    const node = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) if (v != null) node.setAttribute(k, v);
    for (const c of children.flat(Infinity)) if (c != null && c !== false) node.append(c);
    return node;
  }
  const MONTHS = T("months").split(" ");
  const ym = (d) => { const [y, m] = d.split("-").map(Number); return { y, m: m || 1 }; };
  const fmt = (d) => { const { y, m } = ym(d); return `${MONTHS[m - 1]} ${y}`; };
  const now = new Date();
  const todayKey = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const isUpcoming = (d) => {
    const [y, m, day] = d.split("-").map(Number);
    return day ? y * 10000 + m * 100 + day > todayKey : y * 100 + m > Math.floor(todayKey / 100);
  };

  // ---------- what happened where ----------
  const places = Object.entries(S.places).map(([key, p]) => ({ key, ...p, items: [] }));
  const byKey = Object.fromEntries(places.map((p) => [p.key, p]));
  const keys = (w) => (Array.isArray(w) ? w : w ? [w] : []);
  S.activities.forEach((a) => keys(a.where).forEach((k) => byKey[k] && byKey[k].items.push({
    type: "event", date: a.date, title: a.title, sub: T(`kind.${a.kind}`), role: a.role, upcoming: isUpcoming(a.date)
  })));
  S.cv.forEach((e) => keys(e.where).forEach((k) => byKey[k] && byKey[k].items.push({
    type: "home", date: e.start, end: e.end, title: tr(e.title), sub: tr(e.org)
  })));
  const used = places.filter((p) => p.items.length);
  used.forEach((p) => p.items.sort((a, b) => (b.date > a.date ? 1 : -1)));
  const nEvents = S.activities.filter((a) => keys(a.where).length).length;
  const nCountries = new Set(used.map((p) => p.country)).size;

  // Marker style: a talk there beats a poster, which beats attending. Studied/worked adds a ring.
  function category(items) {
    const ev = items.filter((i) => i.type === "event");
    if (ev.some((i) => i.role === "talk")) return "talk";
    if (ev.some((i) => i.role === "poster")) return "poster";
    if (ev.length) return ev.every((i) => i.upcoming) ? "upcoming" : "attended";
    return "home";
  }

  // ---------- markup ----------
  const stage = root.querySelector(".places-stage");
  const svg = root.querySelector("#places-map");
  const panel = root.querySelector("#places-panel");
  let view = "europe";
  const views = h("div", { class: "places-views", role: "group", "aria-label": T("places.views") },
    ...["europe", "world"].map((v) => h("button", {
      class: "chip", type: "button", "data-view": v, "aria-pressed": String(v === view),
      onclick: () => { view = v; views.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.view === v))); if (ready) draw(); }
    }, T(`places.${v}`))));
  stage.prepend(views);
  const status = h("p", { class: "places-status" }, T("places.loading"));
  stage.append(status);

  let selected = null; // place keys of the selected marker
  function panelDefault() {
    const sorted = [...used].sort((a, b) => b.items.length - a.items.length || tr(a.name).localeCompare(tr(b.name)));
    panel.replaceChildren(
      h("p", { class: "people-summary" }, T("places.summary", { p: used.length, c: nCountries, n: nEvents })),
      h("p", { class: "panel-hint" }, T("places.hint")),
      h("ul", { class: "people-chips" }, ...sorted.map((p) =>
        h("li", {}, h("button", { class: "chip", type: "button", onclick: () => select([p.key]), onmouseenter: () => light([p.key]), onmouseleave: () => light(selected) },
          tr(p.name), h("span", { class: "n" }, String(p.items.length)))))));
  }
  function panelPlaces(ks) {
    const ps = ks.map((k) => byKey[k]);
    const items = ps.flatMap((p) => p.items.map((i) => ({ ...i, place: tr(p.name) }))).sort((a, b) => (b.date > a.date ? 1 : -1));
    panel.replaceChildren(
      h("button", { class: "panel-back", type: "button", onclick: () => select(null) }, T("places.back")),
      h("div", { class: "panel-paper" },
        h("p", { class: "kicker" }, T("places.kicker")),
        h("h3", {}, ps.map((p) => tr(p.name)).join(" · "))),
      h("ul", { class: "places-items" }, ...items.map((i) =>
        h("li", { class: i.type },
          h("span", { class: "pi-date" }, i.type === "home" ? `${fmt(i.date)} – ${i.end ? fmt(i.end) : T("cv.present")}` : fmt(i.date)),
          h("span", { class: "pi-title" }, i.title),
          h("span", { class: "pi-sub" }, ps.length > 1 ? `${i.sub} · ${i.place}` : i.sub),
          h("span", { class: "pi-tags" },
            i.type === "home" ? h("span", { class: "tag research" }, T("places.home")) : null,
            i.upcoming ? h("span", { class: "tag upcoming" }, T("tag.upcoming")) : null,
            i.role ? h("span", { class: `tag ${i.role}` }, T(`tag.${i.role}`)) : null)))));
  }
  const render = (ks) => (ks ? panelPlaces(ks) : panelDefault());
  function light(ks) {
    svg.classList.toggle("dimmed", !!ks);
    svg.querySelectorAll(".pl-pin, .pl-arc, .pl-label").forEach((n) => {
      const mine = (n.dataset.keys || "").split(" ");
      n.classList.toggle("lit", !!ks && ks.some((k) => mine.includes(k)));
    });
  }
  function preview(ks) { light(ks); render(ks); }
  function restore() { light(selected); render(selected); }
  function select(ks) { selected = ks; restore(); }
  svg.addEventListener("click", (e) => { if (!e.target.closest(".pl-pin")) select(null); });
  panelDefault();

  // ---------- drawing ----------
  let ready = false, countries, borders;
  function draw() {
    const d3 = window.d3;
    const lonlat = (p) => [p.at[1], p.at[0]];
    const inEurope = used.filter((p) => p.at[1] > -15 && p.at[1] < 40 && p.at[0] > 30);
    const proj = view === "europe"
      ? d3.geoConicConformal().parallels([38, 62]).rotate([-12, 0])
        .fitExtent([[60, 50], [W - 60, H - 40]], { type: "MultiPoint", coordinates: [...inEurope.map(lonlat), [-9, 36], [28, 70]] })
      : d3.geoNaturalEarth1().rotate([-5, 0])
        .fitExtent([[20, 30], [W - 20, H - 30]], { type: "MultiPoint", coordinates: [...used.map(lonlat), [-125, 0], [135, 0], [0, 72], [0, -12]] });
    const path = d3.geoPath(proj);
    const xy = (p) => proj(lonlat(p));

    // Merge markers that would overlap at this zoom; the place with the most going on gives the position.
    const radius = (n) => Math.min(24, 8 + 3.2 * Math.sqrt(n));
    const clusters = [];
    [...used].sort((a, b) => b.items.length - a.items.length).forEach((p) => {
      const [x, y] = xy(p);
      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) return; // off this view
      const near = clusters.find((c) => Math.hypot(c.x - x, c.y - y) < 20);
      if (near) { near.places.push(p); near.r = radius(near.places.reduce((n, q) => n + q.items.length, 0)); }
      else clusters.push({ x, y, places: [p], r: radius(p.items.length) });
    });

    const home = byKey[HOME];
    const gArcs = s("g"), gPins = s("g"), gLabels = s("g");
    used.forEach((p) => {
      if (p === home) return;
      gArcs.append(s("path", { class: "pl-arc", d: path({ type: "LineString", coordinates: [lonlat(home), lonlat(p)] }), "data-keys": p.key }));
    });
    clusters.forEach((c) => {
      const items = c.places.flatMap((p) => p.items);
      const ks = c.places.map((p) => p.key);
      const cat = category(items);
      const lived = items.some((i) => i.type === "home");
      const name = c.places.map((p) => tr(p.name)).join(" · ");
      const g = s("g", {
        class: `pl-pin ${cat}${lived ? " lived" : ""}`, tabindex: 0, role: "button", "data-keys": ks.join(" "),
        "aria-label": `${name}: ${items.length}`
      },
        lived ? s("circle", { class: "pl-ring", cx: c.x, cy: c.y, r: c.r + 4 }) : null,
        s("circle", { cx: c.x, cy: c.y, r: c.r }));
      g.addEventListener("mouseenter", () => preview(ks));
      g.addEventListener("mouseleave", restore);
      g.addEventListener("click", (e) => { e.stopPropagation(); select(ks); });
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(ks); } });
      gPins.append(g);
      // Labels only where they help: bases, and places with several visits.
      if (lived || items.length >= 2) {
        gLabels.append(s("text", { class: "pl-label", x: c.x + c.r + 8, y: c.y + 6, "data-keys": ks.join(" ") }, tr(c.places[0].name) + (c.places.length > 1 ? ` +${c.places.length - 1}` : "")));
      }
    });
    svg.replaceChildren(
      s("path", { class: "pl-sphere", d: path({ type: "Sphere" }) }),
      s("path", { class: "pl-grat", d: path(d3.geoGraticule10()) }),
      s("path", { class: "pl-land", d: path(countries) }),
      s("path", { class: "pl-border", d: path(borders) }),
      gArcs, gPins, gLabels);
    light(selected);
  }

  function loadScript(src) {
    return new Promise((ok, fail) => {
      const el = document.createElement("script");
      el.src = src; el.onload = ok; el.onerror = fail;
      document.head.append(el);
    });
  }
  let started = false;
  async function load() {
    if (started) return;
    started = true;
    try {
      for (const src of LIBS) await loadScript(src);
      const world = await fetch(ATLAS).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
      countries = window.topojson.feature(world, world.objects.countries);
      borders = window.topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
      ready = true;
      status.remove();
      draw();
    } catch (e) {
      status.textContent = T("places.failed");
    }
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((en) => en.isIntersecting)) return;
      io.disconnect();
      load();
    }, { rootMargin: "800px 0px" });
    io.observe(root);
  } else load();
  window.PlacesMap = { load }; // lets the map be loaded by hand (e.g. from the console)
})();
