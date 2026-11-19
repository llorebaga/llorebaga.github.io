/*
 * The hero animation: a qubit driven to its speed limit, computed live (not a recording).
 *
 * The qubit is driven on resonance with a two-quadrature control, H(t) = (ux(t) σx + uy(t) σy)/2,
 * whose strength is bounded, |u(t)| ≤ U_MAX. The Bloch vector then turns at angular speed |u| ≤ U_MAX,
 * so reaching a target at angle θ from |0⟩ takes at least T* = θ / U_MAX: a proven limit that no pulse
 * of this strength can beat, drawn as the shaded zone. A gradient optimizer (GRAPE-style, Adam steps)
 * shapes u(t) from a random start; after each success the pulse is shortened, never below T*. At T* the
 * pulse it finds is the one the proof says is fastest: full strength all the way, a single arc on the sphere.
 * Then a new target is drawn and it starts over.
 */
(function () {
  "use strict";
  const host = document.getElementById("hero-pulse");
  if (!host) return;
  const T_ = window.I18N.t;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- physics ----------
  const N = 40, U_MAX = 2.4, T_AXIS = 3.4, T_START = 3.1, SHRINK = 0.86, F_OK = 0.995, BUDGET = 320;
  // Rotate the Bloch vector r about (ux, uy, 0) by the angle |u| dt.
  function rot(r, ux, uy, dt) {
    const w = Math.hypot(ux, uy);
    if (w < 1e-12) return;
    const kx = ux / w, ky = uy / w, a = w * dt, c = Math.cos(a), s = Math.sin(a);
    const [x, y, z] = r, kv = kx * x + ky * y;
    r[0] = x * c + ky * z * s + kx * kv * (1 - c);
    r[1] = y * c - kx * z * s + ky * kv * (1 - c);
    r[2] = z * c + (kx * y - ky * x) * s;
  }
  let tgt, tLim;
  function newTarget() {
    const th = 1.5 + Math.random() * 1.45, ph = Math.random() * 2 * Math.PI;
    tgt = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
    tLim = th / U_MAX;                       // the speed limit for this target
  }
  function fidelity(ux, uy, T) {
    const r = [0, 0, 1], dt = T / N;
    for (let k = 0; k < N; k++) rot(r, ux[k], uy[k], dt);
    return (1 + r[0] * tgt[0] + r[1] * tgt[1] + r[2] * tgt[2]) / 2;
  }
  const clip = (ux, uy, k) => { const a = Math.hypot(ux[k], uy[k]); if (a > U_MAX) { ux[k] *= U_MAX / a; uy[k] *= U_MAX / a; } };

  // ---------- optimizer (gradient ascent on the fidelity, Adam steps, kept within the strength bound) ----------
  let ux, uy, T, best, bestT, iter, F, phase, hold, reached, m, v, t;
  function resetAdam() { m = new Float64Array(2 * N); v = new Float64Array(2 * N); t = 0; iter = 0; }
  function newRound() {
    newTarget();
    const a = Math.random() * 6, b = Math.random() * 6, c = Math.random() * 6, d = Math.random() * 6;
    ux = Float64Array.from({ length: N }, (_, k) => 0.9 * Math.sin(a + k / 6) + 0.5 * Math.sin(b + k / 2.6));
    uy = Float64Array.from({ length: N }, (_, k) => 0.9 * Math.sin(c + k / 7) + 0.5 * Math.sin(d + k / 3.1));
    T = T_START; best = null; bestT = null; phase = "opt"; hold = 0; reached = false;
    resetAdam();
    F = fidelity(ux, uy, T);
  }
  function optStep() {
    const eps = 1e-5, g = new Float64Array(2 * N), F0 = fidelity(ux, uy, T);
    for (let k = 0; k < N; k++) {
      let keep = ux[k]; ux[k] = keep + eps; g[k] = (fidelity(ux, uy, T) - F0) / eps; ux[k] = keep;
      keep = uy[k]; uy[k] = keep + eps; g[N + k] = (fidelity(ux, uy, T) - F0) / eps; uy[k] = keep;
    }
    t++;
    for (let j = 0; j < 2 * N; j++) {
      m[j] = 0.9 * m[j] + 0.1 * g[j]; v[j] = 0.999 * v[j] + 0.001 * g[j] * g[j];
      const step = 0.07 * (m[j] / (1 - 0.9 ** t)) / (Math.sqrt(v[j] / (1 - 0.999 ** t)) + 1e-8);
      if (j < N) ux[j] += step; else uy[j - N] += step;
    }
    for (let k = 0; k < N; k++) clip(ux, uy, k);
    F = fidelity(ux, uy, T); iter++;
    if (F >= F_OK) {                          // it works at this time: keep it, then try a shorter one
      best = [Float64Array.from(ux), Float64Array.from(uy)]; bestT = T;
      if (T <= tLim * 1.01) { reached = true; phase = "hold"; hold = 0; return; }
      T = Math.max(tLim * 1.005, T * SHRINK);  // the proof says shorter than tLim is impossible
      resetAdam();
      F = fidelity(ux, uy, T);
    } else if (iter > BUDGET) {               // no pulse found in time: show the last one that worked
      if (best) { [ux, uy] = best; T = bestT; F = fidelity(ux, uy, T); }
      phase = "hold"; hold = 0;
    }
  }

  // ---------- drawing ----------
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
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  let view = 0.6;                             // slowly turning view of the Bloch sphere

  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const blue = css("--blue"), green = css("--green"), yellow = css("--yellow"), faint = css("--ink-faint"), edge = css("--cluster-stroke"), ink = css("--ink");
    const R = Math.min(H * 0.4, W * 0.16), cx = W - R - 6, cy = H / 2;
    const x0 = 6, x1 = cx - R - 34, top = 30, base = H - 36;
    const X = (time) => x0 + (time / T_AXIS) * (x1 - x0), Y = (a) => base - (a / U_MAX) * (base - top);
    const xl = X(tLim);

    // The proven speed limit: no pulse of this strength finishes inside the shaded zone.
    ctx.save();
    ctx.beginPath(); ctx.rect(x0, top - 8, xl - x0, base - top + 8); ctx.clip();
    ctx.fillStyle = green; ctx.globalAlpha = 0.08; ctx.fillRect(x0, top - 8, xl - x0, base - top + 8);
    ctx.globalAlpha = 0.28; ctx.strokeStyle = green; ctx.lineWidth = 1;
    for (let s = -H; s < xl - x0 + H; s += 8) { ctx.beginPath(); ctx.moveTo(x0 + s, base); ctx.lineTo(x0 + s + (base - top + 8), top - 8); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = green; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xl, top - 8); ctx.lineTo(xl, base); ctx.stroke();

    // Strength bound, time axis, labels.
    ctx.strokeStyle = edge; ctx.lineWidth = 1; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(x0, Y(U_MAX)); ctx.lineTo(x1, Y(U_MAX)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(x0, base); ctx.lineTo(x1, base); ctx.stroke();
    ctx.font = "italic 14px 'Libre Baskerville', Georgia, serif";
    ctx.fillStyle = faint; ctx.textAlign = "right"; ctx.fillText("t", x1, base - 7);
    ctx.textAlign = "left"; ctx.fillStyle = blue; ctx.fillText("|u(t)|", x0, top - 14);
    ctx.font = "600 12px Inter, system-ui, sans-serif"; ctx.fillStyle = green;
    ctx.fillText(T_(reached ? "pulse.reached" : "pulse.limit"), x0, base + 22);

    // Current duration T.
    if (!reached) {
      ctx.strokeStyle = faint; ctx.lineWidth = 1; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(X(T), top - 8); ctx.lineTo(X(T), base + 6); ctx.stroke(); ctx.setLineDash([]);
    }
    // The pulse strength |u(t)|: piecewise constant, filled to the axis.
    const dt = T / N, amp = (k) => Math.hypot(ux[k], uy[k]);
    ctx.beginPath(); ctx.moveTo(X(0), base);
    for (let k = 0; k < N; k++) { ctx.lineTo(X(k * dt), Y(amp(k))); ctx.lineTo(X((k + 1) * dt), Y(amp(k))); }
    ctx.lineTo(X(T), base); ctx.closePath();
    ctx.fillStyle = blue; ctx.globalAlpha = 0.14; ctx.fill(); ctx.globalAlpha = 1;
    ctx.beginPath();
    for (let k = 0; k < N; k++) { k ? ctx.lineTo(X(k * dt), Y(amp(k))) : ctx.moveTo(X(0), Y(amp(0))); ctx.lineTo(X((k + 1) * dt), Y(amp(k))); }
    ctx.strokeStyle = blue; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();

    // Bloch sphere: outline, equator, axis, the path the pulse drives, and the target.
    const el = 0.38, ce = Math.cos(el), se = Math.sin(el), cv = Math.cos(view), sv = Math.sin(view);
    const P = ([x, y, z]) => { const xr = x * cv - y * sv, yr = x * sv + y * cv; return [cx + R * xr, cy - R * (z * ce - yr * se)]; };
    ctx.strokeStyle = edge; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath();
    for (let a = 0; a <= 64; a++) { const [px, py] = P([Math.cos(a / 32 * Math.PI), Math.sin(a / 32 * Math.PI), 0]); a ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke();
    const [nx, ny] = P([0, 0, 1]), [sx, sy] = P([0, 0, -1]);
    ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(sx, sy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = faint; ctx.font = "13px 'Libre Baskerville', Georgia, serif"; ctx.textAlign = "center";
    ctx.fillText("|0⟩", nx, ny - 8); ctx.fillText("|1⟩", sx, sy + 17);
    const r = [0, 0, 1], sub = 4;
    ctx.beginPath(); let [px, py] = P(r); ctx.moveTo(px, py);
    for (let k = 0; k < N; k++) for (let j = 0; j < sub; j++) { rot(r, ux[k], uy[k], dt / sub); [px, py] = P(r); ctx.lineTo(px, py); }
    ctx.strokeStyle = reached ? green : blue; ctx.lineWidth = 2; ctx.stroke();
    const [tx, ty] = P(tgt);
    ctx.strokeStyle = green; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(tx, ty, 8, 0, 2 * Math.PI); ctx.stroke();
    ctx.fillStyle = yellow; ctx.strokeStyle = ink; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(px, py, 5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
  }

  // ---------- loop: a few optimizer steps per frame; sleeps when off screen ----------
  const STEPS_PER_S = 40;                     // optimizer steps per second, the same on every screen
  let visible = true, running = false, last = 0, acc = 0;
  function frame(now) {
    running = false;
    if (!visible || document.hidden) return;
    const dtf = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    view += dtf * 0.25;
    if (phase === "opt") { acc += dtf * STEPS_PER_S; while (acc >= 1 && phase === "opt") { optStep(); acc--; } }
    else if ((hold += dtf) > 3.4) newRound();
    draw();
    schedule();
  }
  // requestAnimationFrame, with a timer as backup when frames are throttled.
  function schedule() {
    if (running) return;
    running = true;
    let done = false;
    const go = (ts) => { if (!done) { done = true; frame(typeof ts === "number" ? ts : performance.now()); } };
    requestAnimationFrame(go); setTimeout(go, 60);
  }

  newRound();
  new ResizeObserver(() => { size(); draw(); }).observe(canvas);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", draw);
  if (reduceMotion) {
    // One still frame: run the whole search at once and show its result.
    let guard = 0;
    while (phase === "opt" && guard++ < 20000) optStep();
    size(); draw();
    return;
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); if (visible) { last = 0; schedule(); } }).observe(canvas);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { last = 0; schedule(); } });
  size(); schedule();
})();
