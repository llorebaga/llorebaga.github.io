/*
 * The hero animation: a calm, decorative nod to the research, with nothing to read off it.
 * Soft ribbons drift like control pulses and flow into a slowly turning sphere, where a glowing
 * point traces smooth loops, like a qubit being steered. Sleeps when off screen; a still frame
 * for reduced motion.
 */
(function () {
  "use strict";
  const host = document.getElementById("hero-pulse");
  if (!host) return;
  const T_ = window.I18N.t;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const canvas = document.createElement("canvas");
  canvas.className = "pulse-canvas";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", T_("pulse.aria"));
  host.append(canvas);
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1;
  function size() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  }

  // Colours come from the page theme; re-read when it changes.
  let C = {};
  const readColors = () => {
    const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    C = { blue: css("--blue"), green: css("--green"), yellow: css("--yellow"), coral: css("--coral"), edge: css("--cluster-stroke") };
  };
  // Ribbons: each a gently modulated wave with its own colour, speed and drifting envelope.
  const RIBBONS = [
    { c: "blue", amp: 0.30, cyc: 1.6, w: 0.55, ph: 0.0, drift: 0.07, lw: 2.6, a: 0.9 },
    { c: "green", amp: 0.24, cyc: 2.1, w: 0.42, ph: 1.7, drift: 0.05, lw: 2.2, a: 0.75 },
    { c: "yellow", amp: 0.20, cyc: 2.7, w: 0.66, ph: 3.1, drift: 0.09, lw: 2.0, a: 0.7 },
    { c: "coral", amp: 0.16, cyc: 1.2, w: 0.33, ph: 4.4, drift: 0.04, lw: 1.8, a: 0.55 },
    { c: "blue", amp: 0.12, cyc: 3.3, w: 0.80, ph: 5.2, drift: 0.06, lw: 1.4, a: 0.4 }
  ];
  const TRAIL = 150;
  const trail = [];
  let time = 0;

  // The point on the sphere: a slow loop whose tilt itself wanders.
  const qubit = (t) => {
    const th = 1.35 + 0.75 * Math.sin(0.23 * t), ph = 0.8 * t + 0.6 * Math.sin(0.31 * t);
    return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  };

  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const R = Math.min(H * 0.4, W * 0.15), cx = W - R - 10, cy = H / 2;
    const x0 = 0, x1 = cx - R * 0.35, mid = H / 2, span = x1 - x0;

    // Ribbons, fading in from the left and melting into the sphere on the right.
    for (const rb of RIBBONS) {
      const grad = ctx.createLinearGradient(x0, 0, x1, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.18, C[rb.c]);
      grad.addColorStop(0.8, C[rb.c]);
      grad.addColorStop(1, "transparent");
      ctx.strokeStyle = grad; ctx.globalAlpha = rb.a; ctx.lineWidth = rb.lw; ctx.lineCap = "round"; ctx.lineJoin = "round";
      const centre = 0.5 + 0.3 * Math.sin(rb.drift * 2 * Math.PI * time + rb.ph);
      ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const f = i / 160, x = x0 + f * span;
        const env = 0.35 + 0.65 * Math.exp(-((f - centre) ** 2) / 0.09);
        const k = rb.cyc * 2 * Math.PI;
        const y = mid + H * rb.amp * env * (Math.sin(k * f - rb.w * time + rb.ph) + 0.25 * Math.sin(2.3 * k * f + 0.6 * rb.w * time + 2 * rb.ph));
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Sphere: soft fill, outline, a tilted equator and meridian, turning slowly.
    const view = 0.15 * time, el = 0.35, ce = Math.cos(el), se = Math.sin(el), cv = Math.cos(view), sv = Math.sin(view);
    const P = ([x, y, z]) => { const xr = x * cv - y * sv, yr = x * sv + y * cv; return [cx + R * xr, cy - R * (z * ce - yr * se), yr * ce + z * se]; };
    const glow = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
    glow.addColorStop(0, "rgba(255,255,255,0.0)");
    glow.addColorStop(1, C.blue);
    ctx.globalAlpha = 0.08; ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.fill();
    ctx.globalAlpha = 0.9; ctx.strokeStyle = C.edge; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.globalAlpha = 0.5;
    for (const ring of [(a) => [Math.cos(a), Math.sin(a), 0], (a) => [Math.cos(a), 0, Math.sin(a)]]) {
      ctx.beginPath();
      for (let i = 0; i <= 72; i++) { const [px, py] = P(ring((i / 72) * 2 * Math.PI)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke();
    }

    // The point and its fading trail; the far side of the sphere is dimmer.
    for (let i = 1; i < trail.length; i++) {
      const [ax, ay, ad] = P(trail[i - 1]), [bx, by, bd] = P(trail[i]);
      ctx.globalAlpha = (i / trail.length) * ((ad + bd) / 2 >= 0 ? 0.95 : 0.3);
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    }
    const [hx, hy, hd] = P(trail[trail.length - 1]);
    const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 14);
    halo.addColorStop(0, C.yellow); halo.addColorStop(1, "transparent");
    ctx.globalAlpha = hd >= 0 ? 0.7 : 0.3; ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(hx, hy, 14, 0, 2 * Math.PI); ctx.fill();
    ctx.globalAlpha = hd >= 0 ? 1 : 0.45; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(hx, hy, 4.5, 0, 2 * Math.PI); ctx.fill();
    ctx.globalAlpha = 1;
  }

  function advance(dt) {
    time += dt;
    trail.push(qubit(time));
    while (trail.length > TRAIL) trail.shift();
  }

  // ---------- loop: sleeps when off screen ----------
  let visible = true, running = false, last = 0;
  function frame(now) {
    running = false;
    if (!visible || document.hidden) return;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    advance(dt);
    draw();
    schedule();
  }
  function schedule() {
    if (running) return;
    running = true;
    let done = false;
    const go = (ts) => { if (!done) { done = true; frame(typeof ts === "number" ? ts : performance.now()); } };
    requestAnimationFrame(go); setTimeout(go, 60);
  }

  readColors();
  for (let i = 0; i < TRAIL; i++) advance(1 / 60);   // start with a full trail
  const redraw = () => { readColors(); draw(); };
  new ResizeObserver(() => { size(); draw(); }).observe(canvas);
  new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
  if (reduceMotion) { size(); draw(); return; }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); if (visible) { last = 0; schedule(); } }).observe(canvas);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { last = 0; schedule(); } });
  size(); schedule();
})();
