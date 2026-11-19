/*
 * The hero animation: optimal control of a qubit, computed live (not a recording).
 *
 * The qubit has a fixed drift and one bounded control, H(t) = (Δ/2)σz + (u(t)/2)σx, with
 * |u| ≤ U_MAX and u piecewise constant on N slices of a total time T. A gradient optimizer
 * (GRAPE-style, with Adam steps) shapes u(t) until the qubit, starting in |0⟩, reaches a
 * target state. Each success shortens T and tries again; when no pulse is found within the
 * iteration budget, the last time that worked is shown as the shortest time found, and the
 * pulse there is close to bang-bang (pinned at ±U_MAX), as time-optimal control predicts.
 * Then a new target is drawn and it starts over.
 */
(function () {
  "use strict";
  const host = document.getElementById("hero-pulse");
  if (!host) return;
  const T_ = window.I18N.t;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- physics ----------
  const N = 44, DELTA = 1, U_MAX = 2.4, T0 = 4.2, SHRINK = 0.9, F_OK = 0.995, BUDGET = 260;
  // One slice: ψ ← exp(-i (hx σx + hz σz) dt) ψ, with hx = u/2, hz = Δ/2. ψ = [ar, ai, br, bi].
  function step(psi, u, dt) {
    const hx = u / 2, hz = DELTA / 2, w = Math.hypot(hx, hz), c = Math.cos(w * dt), s = Math.sin(w * dt) / w;
    const [ar, ai, br, bi] = psi;
    const Har = hz * ar + hx * br, Hai = hz * ai + hx * bi; // (Hψ)_a
    const Hbr = hx * ar - hz * br, Hbi = hx * ai - hz * bi; // (Hψ)_b
    psi[0] = c * ar + s * Hai; psi[1] = c * ai - s * Har;   // cψ - i s Hψ
    psi[2] = c * br + s * Hbi; psi[3] = c * bi - s * Hbr;
  }
  const bloch = ([ar, ai, br, bi]) => [2 * (ar * br + ai * bi), 2 * (ar * bi - ai * br), ar * ar + ai * ai - br * br - bi * bi];
  // Target state from its Bloch angles: cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩.
  let target, tgt;
  function newTarget() {
    const th = 2.2 + Math.random() * 0.9, ph = Math.random() * 2 * Math.PI;
    target = [Math.cos(th / 2), 0, Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)];
    tgt = bloch(target);
  }
  function fidelity(u, T) {
    const psi = [1, 0, 0, 0], dt = T / N;
    for (let k = 0; k < N; k++) step(psi, u[k], dt);
    const [tr, ti, sr, si] = target, [ar, ai, br, bi] = psi;
    const re = tr * ar + ti * ai + sr * br + si * bi, im = tr * ai - ti * ar + sr * bi - si * br; // ⟨target|ψ⟩
    return re * re + im * im;
  }

  // ---------- optimizer (gradient ascent on the fidelity, Adam steps, clipped to the bounds) ----------
  let u, T, best, bestT, iter, F, phase, hold, m, v, t;
  function newRound() {
    newTarget();
    const a = Math.random() * 6, b = Math.random() * 6;
    u = Float64Array.from({ length: N }, (_, k) => 0.9 + 0.5 * Math.sin(a + k / 5) + 0.3 * Math.sin(b + k / 2.3));
    T = T0; best = null; bestT = null; iter = 0; phase = "opt"; hold = 0;
    m = new Float64Array(N); v = new Float64Array(N); t = 0;
    F = fidelity(u, T);
  }
  function optStep() {
    const eps = 1e-5, g = new Float64Array(N), F0 = fidelity(u, T);
    for (let k = 0; k < N; k++) { const keep = u[k]; u[k] = keep + eps; g[k] = (fidelity(u, T) - F0) / eps; u[k] = keep; }
    t++;
    for (let k = 0; k < N; k++) {
      m[k] = 0.9 * m[k] + 0.1 * g[k]; v[k] = 0.999 * v[k] + 0.001 * g[k] * g[k];
      const mh = m[k] / (1 - 0.9 ** t), vh = v[k] / (1 - 0.999 ** t);
      u[k] = Math.max(-U_MAX, Math.min(U_MAX, u[k] + 0.06 * mh / (Math.sqrt(vh) + 1e-8)));
    }
    F = fidelity(u, T); iter++;
    if (F >= F_OK) {                   // it works at this time: remember it, then try a shorter one
      best = Float64Array.from(u); bestT = T;
      T *= SHRINK; iter = 0; t = 0; m.fill(0); v.fill(0);
      F = fidelity(u, T);
    } else if (iter > BUDGET) {        // no pulse found in time: the last success is the shortest time found
      if (best) { u = best; T = bestT; F = fidelity(u, T); }
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
  let view = 0.6;                      // slowly turning view of the Bloch sphere

  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const blue = css("--blue"), green = css("--green"), yellow = css("--yellow"), faint = css("--ink-faint"), edge = css("--cluster-stroke"), ink = css("--ink");
    const R = Math.min(H * 0.4, W * 0.16), cx = W - R - 6, cy = H / 2;
    const x0 = 6, x1 = cx - R - 34, mid = H * 0.5, amp = H * 0.36;
    const X = (time) => x0 + (time / T0) * (x1 - x0), Y = (val) => mid - (val / U_MAX) * amp;
    ctx.font = "italic 14px 'Libre Baskerville', Georgia, serif";

    // Bounds ±U_MAX and the time axis.
    ctx.strokeStyle = edge; ctx.lineWidth = 1; ctx.setLineDash([3, 5]);
    for (const val of [U_MAX, -U_MAX]) { ctx.beginPath(); ctx.moveTo(x0, Y(val)); ctx.lineTo(x1, Y(val)); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x1, Y(0)); ctx.stroke();
    // Current duration T.
    ctx.strokeStyle = phase === "hold" ? green : faint; ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.moveTo(X(T), Y(U_MAX) - 6); ctx.lineTo(X(T), Y(-U_MAX) + 6); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = faint; ctx.textAlign = "right"; ctx.fillText("t", x1, Y(0) - 7);
    ctx.textAlign = "left"; ctx.fillStyle = blue; ctx.fillText("u(t)", x0, Y(U_MAX) - 8);

    // The pulse: piecewise constant, filled to the axis.
    const dt = T / N;
    ctx.beginPath(); ctx.moveTo(X(0), Y(0));
    for (let k = 0; k < N; k++) { ctx.lineTo(X(k * dt), Y(u[k])); ctx.lineTo(X((k + 1) * dt), Y(u[k])); }
    ctx.lineTo(X(T), Y(0)); ctx.closePath();
    ctx.fillStyle = blue; ctx.globalAlpha = 0.12; ctx.fill(); ctx.globalAlpha = 1;
    ctx.beginPath();
    for (let k = 0; k < N; k++) { k ? ctx.lineTo(X(k * dt), Y(u[k])) : ctx.moveTo(X(0), Y(u[0])); ctx.lineTo(X((k + 1) * dt), Y(u[k])); }
    ctx.strokeStyle = blue; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();
    if (phase === "hold") {
      ctx.fillStyle = green; ctx.font = "600 12px Inter, system-ui, sans-serif"; ctx.textAlign = "center";
      ctx.fillText(T_("pulse.min"), Math.min(Math.max(X(T), x0 + 60), x1 - 60), Y(-U_MAX) + 22);
    }

    // Bloch sphere: outline, equator, axis, the path the pulse drives, and the target.
    const el = 0.38, ce = Math.cos(el), se = Math.sin(el), cv = Math.cos(view), sv = Math.sin(view);
    const P = ([x, y, z]) => { const xr = x * cv - y * sv, yr = x * sv + y * cv; return [cx + R * xr, cy - R * (z * ce - yr * se), yr]; };
    ctx.strokeStyle = edge; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath();
    for (let a = 0; a <= 64; a++) { const [px, py] = P([Math.cos(a / 32 * Math.PI), Math.sin(a / 32 * Math.PI), 0]); a ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke();
    const [nx, ny] = P([0, 0, 1]), [sx, sy] = P([0, 0, -1]);
    ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(sx, sy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = faint; ctx.font = "13px 'Libre Baskerville', Georgia, serif"; ctx.textAlign = "center";
    ctx.fillText("|0⟩", nx, ny - 8); ctx.fillText("|1⟩", sx, sy + 17);
    // Path under the current pulse.
    const psi = [1, 0, 0, 0], sub = 4;
    ctx.beginPath(); let [px, py] = P(bloch(psi)); ctx.moveTo(px, py);
    for (let k = 0; k < N; k++) for (let j = 0; j < sub; j++) { step(psi, u[k], dt / sub); [px, py] = P(bloch(psi)); ctx.lineTo(px, py); }
    ctx.strokeStyle = blue; ctx.lineWidth = 2; ctx.stroke();
    const [tx, ty] = P(tgt);
    ctx.strokeStyle = green; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(tx, ty, 8, 0, 2 * Math.PI); ctx.stroke();
    ctx.fillStyle = yellow; ctx.strokeStyle = ink; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(px, py, 5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
  }

  // ---------- loop: a few optimizer steps per frame; sleeps when off screen ----------
  const STEPS_PER_S = 40;            // optimizer steps per second, the same on every screen
  let visible = true, running = false, last = 0, acc = 0;
  function frame(now) {
    running = false;
    if (!visible || document.hidden) return;
    const dtf = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    view += dtf * 0.25;
    if (phase === "opt") { acc += dtf * STEPS_PER_S; while (acc >= 1 && phase === "opt") { optStep(); acc--; } }
    else if ((hold += dtf) > 3.2) newRound();
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
