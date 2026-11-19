/*
 * The hero's control pulse u(t): a line across the first screen that visitors can reshape.
 * For a qubit driven on resonance (rotating frame), the area under u(t) is the rotation
 * angle θ, and the chance the qubit ends up flipped from |0⟩ to |1⟩ is sin²(θ/2).
 * The line starts as a Gaussian π pulse.
 */
(function () {
  "use strict";
  const host = document.getElementById("hero-pulse");
  if (!host) return;
  const T = window.I18N.t, LOC = window.I18N.locale;
  const num = (x, d) => x.toLocaleString(LOC, { minimumFractionDigits: d, maximumFractionDigits: d });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const N = 220;                 // samples of u(t)
  const BASE = 0.7;              // baseline (u = 0) as a fraction of the strip height
  const u = new Float64Array(N); // u(t) in units of the strip height, positive is up
  const gauss = (i, c, s) => Math.exp(-((i - c) ** 2) / (2 * s * s));
  const PI_SHAPE = Float64Array.from({ length: N }, (_, i) => 0.52 * gauss(i, N / 2, N * 0.085));
  const A_PI = PI_SHAPE.reduce((a, b) => a + b, 0); // area that means θ = π

  const canvas = document.createElement("canvas");
  canvas.className = "pulse-canvas";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", T("pulse.aria"));
  const theta = document.createElement("strong"), prob = document.createElement("strong");
  const note = document.createElement("p"); note.className = "pulse-note"; note.setAttribute("aria-live", "polite");
  const reset = document.createElement("button");
  reset.type = "button"; reset.className = "pulse-reset"; reset.textContent = T("pulse.reset");
  const read = document.createElement("div"); read.className = "pulse-read";
  const cell = (label, value) => { const d = document.createElement("span"); d.append(value, " ", label); return d; };
  read.append(cell(T("pulse.area"), theta), cell(T("pulse.prob"), prob));
  const hint = document.createElement("p"); hint.className = "pulse-hint"; hint.textContent = T("pulse.hint");
  const foot = document.createElement("div"); foot.className = "pulse-foot";
  const left = document.createElement("div"); left.className = "pulse-left"; left.append(hint, reset);
  foot.append(left, read);
  host.append(canvas, foot, note);

  let W = 0, H = 0, dpr = 1, dirty = true, cursor = null, intro = reduceMotion ? 1 : 0;
  const ctx = canvas.getContext("2d");
  function size() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    dirty = true;
  }
  new ResizeObserver(() => { size(); wake(); }).observe(canvas);

  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const X = (i) => 8 + (i / (N - 1)) * (W - 16);
  const Y = (v) => H * BASE - v * H;
  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const blue = css("--blue"), coral = css("--coral"), faint = css("--ink-faint"), edge = css("--cluster-stroke");
    const shown = Math.max(1, Math.round(N * intro));
    // Area under the curve: what sets the rotation angle.
    for (const sign of [1, -1]) {
      ctx.beginPath();
      ctx.moveTo(X(0), Y(0));
      for (let i = 0; i < shown; i++) ctx.lineTo(X(i), Y(sign > 0 ? Math.max(0, u[i]) : Math.min(0, u[i])));
      ctx.lineTo(X(shown - 1), Y(0));
      ctx.closePath();
      ctx.fillStyle = sign > 0 ? blue : coral;
      ctx.globalAlpha = 0.13; ctx.fill(); ctx.globalAlpha = 1;
    }
    // Time axis.
    ctx.strokeStyle = edge; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(N - 1), Y(0)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = faint; ctx.font = "italic 15px 'Libre Baskerville', Georgia, serif";
    ctx.textAlign = "right"; ctx.fillText("t", X(N - 1), Y(0) + 20);
    // The pulse.
    ctx.strokeStyle = blue; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < shown; i++) i ? ctx.lineTo(X(i), Y(u[i])) : ctx.moveTo(X(i), Y(u[i]));
    ctx.stroke();
    ctx.fillStyle = blue; ctx.textAlign = "left";
    ctx.fillText("u(t)", X(0), Y(0) - 12);
    if (cursor) {
      ctx.strokeStyle = blue; ctx.globalAlpha = 0.35; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cursor.x, cursor.y, 14, 0, 2 * Math.PI); ctx.stroke(); ctx.globalAlpha = 1;
    }
  }

  function readout() {
    const th = (u.reduce((a, b) => a + b, 0) / A_PI) * Math.PI;
    theta.textContent = `θ = ${num(th / Math.PI, 2)}π`;
    prob.textContent = `${num(100 * Math.sin(th / 2) ** 2, 0)}%`;
    const r = Math.abs(th) / Math.PI, near = (x) => Math.abs(r - x) < 0.03;
    note.textContent = near(0) ? T("pulse.none") : near(0.5) ? T("pulse.half") : near(1) ? T("pulse.pi") : near(2) ? T("pulse.two") : "";
  }

  // Drawing: the stretch of the pulse under the cursor moves toward the cursor's height.
  function sculpt() {
    if (!cursor) return false;
    const c = ((cursor.x - 8) / (W - 16)) * (N - 1), s = (18 / (W - 16)) * (N - 1);
    const target = Math.max(-(1 - BASE) + 0.04, Math.min(BASE - 0.04, (H * BASE - cursor.y) / H));
    let moved = false;
    for (let i = Math.max(0, Math.floor(c - 4 * s)); i <= Math.min(N - 1, Math.ceil(c + 4 * s)); i++) {
      const k = 0.28 * gauss(i, c, s), d = (target - u[i]) * k;
      if (Math.abs(d) > 1e-5) { u[i] += d; moved = true; }
    }
    return moved;
  }
  const point = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  canvas.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && !e.buttons) return; // touch and pen draw while pressed
    cursor = point(e); dirty = true; wake();
  });
  canvas.addEventListener("pointerdown", (e) => { cursor = point(e); dirty = true; wake(); });
  const lift = () => { cursor = null; dirty = true; wake(); };
  canvas.addEventListener("pointerleave", lift);
  canvas.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") lift(); });
  reset.addEventListener("click", () => { u.set(PI_SHAPE); readout(); dirty = true; wake(); });

  // Render loop that sleeps when nothing changes.
  let running = false;
  function frame() {
    if (intro < 1) { intro = Math.min(1, intro + 0.025); dirty = true; }
    if (sculpt()) { readout(); dirty = true; }
    if (dirty) { draw(); dirty = false; }
    if (intro < 1 || cursor) next(); else running = false;
  }
  // requestAnimationFrame, with a timer as backup for when frames are throttled (hidden tab or pane).
  const next = () => { let done = false; const go = () => { if (!done) { done = true; frame(); } }; requestAnimationFrame(go); setTimeout(go, 50); };
  function wake() { if (!running) { running = true; next(); } }
  // Redraw in the right colours when the theme changes.
  new MutationObserver(() => { dirty = true; wake(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { dirty = true; wake(); });

  u.set(PI_SHAPE);
  readout();
  size();
  wake();
})();
