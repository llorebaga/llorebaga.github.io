/*
 * "Research, explained": three small, real simulations.
 *   qc     single-qubit control on the Bloch sphere (piecewise-constant pulse, gradient optimizer)
 *          and its speed limit: a pulse of strength |u| <= 1 turns the qubit at most OMEGA per unit time
 *   po     local descent vs. a certified lower bound on a one-variable polynomial landscape
 *   qcomp  the 15-to-1 magic-state factory: its four checks, and Monte Carlo runs of many batches
 */
(function () {
  "use strict";
  const S = window.SITE;
  const E = S.explainers;
  const T = window.I18N.t, tr = window.I18N.tr, LOC = window.I18N.locale;
  const num = (x, digits = 0) => x.toLocaleString(LOC, { maximumFractionDigits: digits, minimumFractionDigits: digits });
  const SVGNS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function h(tag, attrs = {}, ...children) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat(Infinity)) if (c != null && c !== false) n.append(c);
    return n;
  }
  function s(tag, attrs = {}, ...children) {
    const n = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) if (v != null) n.setAttribute(k, v);
    for (const c of children.flat(Infinity)) if (c != null) n.append(c);
    return n;
  }
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const svgPoint = (svg, e) => {
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  };
  // Runs step(dt) every frame until it returns false. If frames are being skipped
  // (background tab, hidden panel), a timer takes over so the animation still finishes.
  function animate(step) {
    let last = performance.now(), stopped = false;
    const schedule = () => {
      let done = false;
      const go = () => { if (done) return; done = true; tick(); };
      requestAnimationFrame(go);
      setTimeout(go, 60);
    };
    const tick = () => {
      if (stopped) return;
      const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (step(dt) === false) { stopped = true; return; }
      schedule();
    };
    schedule();
    return () => { stopped = true; };
  }

  // =====================================================================
  // 1. Quantum control on the Bloch sphere
  // =====================================================================
  function buildQubit(host) {
    // Resonant drive, no drift: the arrow turns about x at speed OMEGA*u, |u| <= 1. Flipping it from 0 to 1
    // means turning it by π, so no pulse can do it in less than LIMIT = π / OMEGA: the speed limit.
    const N = 8, OMEGA = 3, DELTA = 0, SUB = 14, LIMIT = Math.PI / OMEGA;
    let dur = 3;
    let u = new Array(N).fill(0);
    let az = -0.6, el = 0.35; // view angles

    // Bloch vector dynamics dr/dt = w x r with w = (OMEGA*u, 0, DELTA): a rotation about w.
    function rotate(v, w, t) {
      const n = Math.hypot(w[0], w[1], w[2]); if (n < 1e-12) return v.slice();
      const k = [w[0] / n, w[1] / n, w[2] / n], th = n * t, c = Math.cos(th), sn = Math.sin(th);
      const kv = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
      const kx = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
      return [0, 1, 2].map((i) => v[i] * c + kx[i] * sn + k[i] * kv * (1 - c));
    }
    function evolve(ctrl, withPath) {
      let r = [0, 0, 1];
      const path = withPath ? [r] : null;
      const DT = dur / N;
      for (let k = 0; k < N; k++) {
        const w = [OMEGA * ctrl[k], 0, DELTA];
        if (withPath) for (let j = 0; j < SUB; j++) { r = rotate(r, w, DT / SUB); path.push(r); }
        else r = rotate(r, w, DT);
      }
      return { r, path, F: (1 - r[2]) / 2 }; // fidelity with |1> (south pole)
    }

    // --- sphere view ---
    const C = 160, R = 118;
    const project = ([x, y, z]) => {
      const x1 = x * Math.cos(az) - y * Math.sin(az), y1 = x * Math.sin(az) + y * Math.cos(az);
      return { x: C + R * x1, y: C - R * (z * Math.cos(el) - y1 * Math.sin(el)), d: y1 * Math.cos(el) + z * Math.sin(el) };
    };
    const sphere = s("svg", { viewBox: "0 0 320 320", class: "bloch", role: "img", "aria-label": T("qc.sphereAria") });
    sphere.innerHTML = `<defs><radialGradient id="bl-g" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="var(--surface)"/><stop offset="1" stop-color="var(--surface-2)"/></radialGradient></defs>`;
    const gBack = s("g"), gFront = s("g"), gTraj = s("g", { class: "bl-traj" }), gTop = s("g");
    sphere.append(s("circle", { cx: C, cy: C, r: R, class: "bl-ball", fill: "url(#bl-g)" }), gBack, gTraj, gFront, gTop);

    function ring(fn, cls) {
      // Great circle split into back (dashed) and front (solid) parts.
      const pts = []; for (let i = 0; i <= 96; i++) pts.push(project(fn((i / 96) * 2 * Math.PI)));
      let front = "", back = "";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], seg = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
        if ((a.d + b.d) / 2 >= 0) front += seg; else back += seg;
      }
      gBack.append(s("path", { d: back, class: `${cls} back` }));
      gFront.append(s("path", { d: front, class: cls }));
    }
    function label(p3, text, cls = "bl-label", dx = 0, dy = 0) {
      const p = project(p3);
      gTop.append(s("text", { x: p.x + dx, y: p.y + dy, class: cls }, text));
    }
    let lastPath = null;
    function draw(res) {
      gBack.replaceChildren(); gFront.replaceChildren(); gTraj.replaceChildren(); gTop.replaceChildren();
      ring((t) => [Math.cos(t), Math.sin(t), 0], "bl-line");
      ring((t) => [Math.cos(t), 0, Math.sin(t)], "bl-line faint");
      ring((t) => [0, Math.cos(t), Math.sin(t)], "bl-line faint");
      const axis = (a, b) => { const p = project(a), q = project(b); gBack.append(s("line", { x1: p.x, y1: p.y, x2: q.x, y2: q.y, class: "bl-axis" })); };
      axis([0, 0, -1], [0, 0, 1]);
      // target (south pole) and start (north pole)
      const tgt = project([0, 0, -1]), st = project([0, 0, 1]);
      gTop.append(s("circle", { cx: tgt.x, cy: tgt.y, r: 11, class: "bl-target" }), s("circle", { cx: tgt.x, cy: tgt.y, r: 4, class: "bl-target-dot" }));
      gTop.append(s("circle", { cx: st.x, cy: st.y, r: 4, class: "bl-start" }));
      label([0, 0, 1], "0", "bl-label", 10, -8);
      label([0, 0, -1], T("qc.target"), "bl-label", 16, 20);
      // trajectory
      const path = res.path; lastPath = path;
      for (let i = 1; i < path.length; i++) {
        const a = project(path[i - 1]), b = project(path[i]);
        gTraj.append(s("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: (a.d + b.d) / 2 >= 0 ? "front" : "back", style: `opacity:${0.35 + 0.65 * i / path.length}` }));
      }
      // state arrow
      const e = project(res.r);
      gTop.append(s("line", { x1: C, y1: C, x2: e.x, y2: e.y, class: "bl-arrow" }), s("circle", { cx: e.x, cy: e.y, r: 7, class: "bl-head" }));
    }

    // --- pulse editor ---
    const PW = 320, PH = 150, PT = 14, PB = 24, mid = PT + (PH - PT - PB) / 2, amp = (PH - PT - PB) / 2;
    const pulse = s("svg", { viewBox: `0 0 ${PW} ${PH}`, class: "pulse", role: "group", "aria-label": T("qc.pulseAria") });
    const bw = (PW - 20) / N;
    const bars = [];
    pulse.append(s("line", { x1: 10, y1: mid, x2: PW - 10, y2: mid, class: "pulse-zero" }));
    pulse.append(s("text", { x: 10, y: PH - 6, class: "pulse-axis" }, T("qc.time")));
    pulse.append(s("text", { x: PW - 10, y: 11, class: "pulse-axis", "text-anchor": "end" }, T("qc.strength")));
    for (let k = 0; k < N; k++) {
      const r = s("rect", { class: "pulse-bar", x: 10 + k * bw + 3, width: bw - 6, rx: 4 });
      const hit = s("rect", { class: "pulse-hit", x: 10 + k * bw, y: PT, width: bw, height: PH - PT - PB });
      bars.push(r); pulse.append(r, hit);
    }
    function drawBars() {
      u.forEach((v, k) => {
        const y = v >= 0 ? mid - v * amp : mid, hgt = Math.max(2, Math.abs(v) * amp);
        bars[k].setAttribute("y", v >= 0 ? y - (Math.abs(v) * amp < 2 ? 1 : 0) : mid);
        bars[k].setAttribute("height", hgt);
        bars[k].classList.toggle("neg", v < 0);
      });
    }
    let painting = false;
    const paint = (e) => {
      const p = svgPoint(pulse, e);
      const k = clamp(Math.floor((p.x - 10) / bw), 0, N - 1);
      u[k] = clamp((mid - p.y) / amp, -1, 1);
      if (Math.abs(u[k]) < 0.04) u[k] = 0;
      stopOpt(); update();
    };
    pulse.addEventListener("pointerdown", (e) => { painting = true; pulse.setPointerCapture(e.pointerId); paint(e); });
    pulse.addEventListener("pointermove", (e) => { if (painting) paint(e); });
    pulse.addEventListener("pointerup", () => { painting = false; });
    pulse.addEventListener("pointercancel", () => { painting = false; });

    // sphere rotation by dragging
    let rot = null;
    sphere.addEventListener("pointerdown", (e) => { rot = { x: e.clientX, y: e.clientY, az, el }; sphere.setPointerCapture(e.pointerId); });
    sphere.addEventListener("pointermove", (e) => {
      if (!rot) return;
      az = rot.az - (e.clientX - rot.x) * 0.01;
      el = clamp(rot.el + (e.clientY - rot.y) * 0.01, -1.2, 1.2);
      draw(evolve(u, true));
    });
    sphere.addEventListener("pointerup", () => { rot = null; });

    // --- readout + optimizer ---
    const fidNum = h("span", { class: "fid-num" }, "0%");
    const fidBar = h("span", { class: "fid-fill" });
    const status = h("p", { class: "ex-status", "aria-live": "polite" });
    function update() {
      const res = evolve(u, true);
      draw(res); drawBars();
      const pct = res.F * 100;
      fidNum.textContent = `${pct >= 99.95 ? "100" : num(pct, 1)}%`;
      fidBar.style.width = `${pct}%`;
      fidBar.classList.toggle("done", res.F > 0.999);
      status.textContent = dur < LIMIT ? T("qc.below") : res.F > 0.999 ? T("qc.done") :
        u.every((v) => v === 0) ? T("qc.none") :
        res.F > 0.9 ? T("qc.close") : T("qc.keep");
      return res;
    }
    let stopOpt = () => {};
    function optimize() {
      stopOpt();
      // At zero pulse the landscape is flat (a saddle), so nudge off it first.
      if (u.every((v) => Math.abs(v) < 0.05)) u = u.map(() => (Math.random() - 0.5) * 0.6);
      let it = 0, eta = 0.8;
      const run = () => {
        for (let rep = 0; rep < 2; rep++) {
          const F0 = evolve(u).F, g = u.map((_, k) => { const up = u.slice(); up[k] += 1e-4; return (evolve(up).F - F0) / 1e-4; });
          let trial = u.map((v, k) => clamp(v + eta * g[k], -1, 1));
          if (evolve(trial).F >= F0) { u = trial; eta = Math.min(eta * 1.2, 3); } else eta *= 0.5;
          it++;
        }
        const F = update().F;
        return !(F > 0.9995 || it > (dur < LIMIT ? 120 : 400));
      };
      if (reduceMotion) { while (run()); return; }
      stopOpt = animate(run);
    }
    const optBtn = h("button", { type: "button", class: "btn", onclick: optimize }, T("qc.optimize"));
    const resetBtn = h("button", { type: "button", class: "link-btn", onclick: () => { stopOpt(); u = new Array(N).fill(0); update(); } }, T("qc.reset"));
    // Time allowed; the slider is flagged when it is below the speed limit.
    const time = h("input", { type: "range", min: 0.5, max: 3, step: 0.05, value: dur, class: "range qc-time", "aria-label": T("qc.timeAria") });
    const timeOut = h("strong", {});
    const showTime = () => { timeOut.textContent = num(dur, 2); time.classList.toggle("below", dur < LIMIT); };
    time.addEventListener("input", () => { dur = +time.value; showTime(); update(); });
    showTime();

    host.append(
      h("div", { class: "qubit-grid" },
        h("div", { class: "qubit-sphere" }, sphere),
        h("div", { class: "qubit-controls" },
          h("p", { class: "viz-label" }, T("qc.pulse")),
          pulse,
          h("label", { class: "range-row" }, h("span", {}, T("qc.timeLabel"), timeOut), time),
          h("p", { class: "ex-note" }, T("qc.limitNote", { t: num(LIMIT, 2) })),
          h("div", { class: "fid" }, h("span", { class: "fid-label" }, T("qc.match")), fidNum),
          h("div", { class: "fid-track" }, fidBar),
          status,
          h("div", { class: "links" }, optBtn, resetBtn)))
    );
    update();
  }

  // =====================================================================
  // 2. Local descent vs. certified global minimum
  // =====================================================================
  function buildLandscape(host) {
    const W = 520, H = 300, PADX = 16, TOP = 20, BOT = 34, G = 700;
    let X0 = -2.3, X1 = 2.3;
    const PRESETS = [
      [-1.75, -1.15, -0.25, 0.55, 1.45],
      [-1.95, -1.45, -0.95, -0.35, 0.25, 0.8, 1.35, 1.7, 2.0],
      [-1.5, -0.2, 1.3]
    ];
    let preset = 0, roots, xs, ys, yMin, yMax, gx, gi;
    // p'(x) = prod (x - r_i) with an odd number of roots, so p rises at both ends;
    // sorted roots alternate minimum / maximum / ... / minimum.
    const dp = (x) => roots.reduce((acc, r) => acc * (x - r), 1);
    function setRoots(rs) {
      roots = rs.slice().sort((a, b) => a - b);
      X0 = roots[0] - 0.42; X1 = roots[roots.length - 1] + 0.42;
      xs = []; ys = [];
      let acc = 0, prev = dp(X0);
      for (let i = 0; i <= G; i++) {
        const x = X0 + (X1 - X0) * i / G, d = dp(x);
        if (i) acc += (prev + d) / 2 * ((X1 - X0) / G);
        xs.push(x); ys.push(acc); prev = d;
      }
      // Square-root scale: tames the steep outer walls and keeps shallow valleys visible.
      const lo = Math.min(...ys);
      const eps = 0.02 * (Math.max(...ys) - lo);
      ys = ys.map((y) => Math.sqrt(y - lo + eps));
      yMin = Math.min(...ys); yMax = Math.max(...ys);
      gi = ys.indexOf(yMin); gx = xs[gi];
    }
    const px = (x) => PADX + (x - X0) / (X1 - X0) * (W - 2 * PADX);
    const py = (y) => TOP + (1 - (y - yMin) / (yMax - yMin)) * (H - TOP - BOT);
    const yAt = (x) => { const t = (clamp(x, X0, X1) - X0) / (X1 - X0) * G, i = Math.min(G - 1, Math.floor(t)), f = t - i; return ys[i] * (1 - f) + ys[i + 1] * f; };
    const slope = (x) => (yAt(x + 1e-3) - yAt(x - 1e-3)) / 2e-3;
    const score = (y) => num(8 + (y - yMin) / (yMax - yMin) * 92, 1); // an arbitrary "cost" scale

    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "land", role: "img", "aria-label": T("po.aria") });
    const area = s("path", { class: "land-area" }), curve = s("path", { class: "land-curve" });
    const floorFill = s("rect", { class: "floor-fill", x: 0, width: W }), floorLine = s("line", { class: "floor-line", x1: 0, x2: W });
    const floorText = s("text", { class: "floor-text", x: W - PADX, "text-anchor": "end" });
    const gMark = s("g", { class: "gmark" }), trail = s("g", { class: "trail" });
    const ball = s("circle", { class: "ball", r: 9 });
    const hint = s("text", { class: "land-hint", x: W / 2, y: TOP + 8, "text-anchor": "middle" }, T("po.hint"));
    svg.append(area, floorFill, floorLine, curve, trail, gMark, ball, floorText, hint);
    const status = h("p", { class: "ex-status", "aria-live": "polite" }, T("po.intro"));

    let stopBall = () => {}, stopFloor = () => {}, ballX = null, floorOn = false;
    function drawCurve() {
      let d = "";
      xs.forEach((x, i) => { d += `${i ? "L" : "M"}${px(x).toFixed(1)} ${py(ys[i]).toFixed(1)}`; });
      curve.setAttribute("d", d);
      area.setAttribute("d", `${d}L${px(X1)} ${H}L${px(X0)} ${H}Z`);
    }
    function placeBall(x) {
      ball.setAttribute("cx", px(x)); ball.setAttribute("cy", py(yAt(x)) - 9);
      ball.style.display = "inline";
    }
    function setFloor(y, final) {
      const Y = py(y);
      floorLine.setAttribute("y1", Y); floorLine.setAttribute("y2", Y);
      floorFill.setAttribute("y", Y); floorFill.setAttribute("height", Math.max(0, H - Y));
      floorText.setAttribute("y", Y + 16);
      const left = px(gx) > W / 2; // keep the label away from the global-minimum marker
      floorText.setAttribute("x", left ? PADX : W - PADX);
      floorText.setAttribute("text-anchor", left ? "start" : "end");
      floorText.textContent = final ? T("po.certified", { v: score(y) }) : T("po.raising");
      [floorLine, floorFill, floorText].forEach((n) => (n.style.display = "inline"));
    }
    function hideFloor() { [floorLine, floorFill, floorText].forEach((n) => (n.style.display = "none")); gMark.replaceChildren(); floorOn = false; }
    function reset() {
      stopBall(); stopFloor(); hideFloor(); trail.replaceChildren(); ball.style.display = "none"; ballX = null;
      hint.style.display = "";
      drawCurve();
      status.textContent = T("po.intro");
    }

    function drop(x) {
      stopBall(); trail.replaceChildren(); hint.style.display = "none";
      ballX = x; placeBall(x);
      // Damped rolling in normalized units (x and height both scaled to [0, 1]),
      // so the motion looks the same on every landscape. It settles in the nearest valley.
      const sx = X1 - X0, sy = yMax - yMin;
      let v = 0, steps = 0, still = 0, time = 0;
      const step = (dt) => {
        time += dt;
        for (let k = 0; k < 4; k++) {
          const h = dt / 4, sl = slope(ballX) * sx / sy;
          v += (-9 * sl - 6 * v) * h;
          ballX = clamp(ballX + v * h * sx, X0, X1);
          if (ballX === X0 || ballX === X1) v = 0;
        }
        if (steps++ % 3 === 0) trail.append(s("circle", { cx: px(ballX), cy: py(yAt(ballX)) - 9, r: 2.2 }));
        placeBall(ballX);
        still = Math.abs(v) < 0.01 && Math.abs(slope(ballX) * sx / sy) < 0.03 ? still + 1 : 0;
        if (still > 10 || time > 10) { settled(); return false; }
      };
      status.textContent = T("po.rolling");
      if (reduceMotion) { while (step(1 / 60) !== false); return; }
      stopBall = animate(step);
    }
    function settled() {
      const found = yAt(ballX), gap = found - yMin;
      if (floorOn) compare();
      else status.textContent = T("po.stopped", { v: score(found) });
      return gap;
    }
    function compare() {
      if (ballX == null) { status.textContent = T("po.floorOnly", { v: score(yMin) }); return; }
      const gap = yAt(ballX) - yMin;
      status.textContent = gap < (yMax - yMin) * 0.004
        ? T("po.lucky")
        : T("po.stuck", { a: score(yAt(ballX)), b: score(yMin) });
    }
    function certify() {
      stopFloor(); gMark.replaceChildren();
      const from = yMin - (yMax - yMin) * 0.45;
      let t = 0;
      const step = (dt) => {
        t = Math.min(1, t + dt / 1.6);
        const e = 1 - Math.pow(1 - t, 3);
        setFloor(from + (yMin - from) * e, t >= 1);
        if (t >= 1) {
          floorOn = true;
          const X = px(gx), Y = py(yMin);
          gMark.append(s("circle", { cx: X, cy: Y, r: 14, class: "gmark-ring" }), s("circle", { cx: X, cy: Y, r: 4.5, class: "gmark-dot" }));
          compare();
          return false;
        }
      };
      if (reduceMotion) { t = 1; step(0); return; }
      stopFloor = animate(step);
    }
    svg.addEventListener("click", (e) => {
      const p = svgPoint(svg, e);
      drop(X0 + clamp((p.x - PADX) / (W - 2 * PADX), 0, 1) * (X1 - X0));
    });

    host.append(
      h("div", { class: "land-wrap" }, svg),
      status,
      h("div", { class: "links" },
        h("button", { type: "button", class: "btn", onclick: certify }, T("po.certify")),
        h("button", { type: "button", class: "link-btn", onclick: () => { drop(X0 + 0.1 + Math.random() * (X1 - X0 - 0.2)); } }, T("po.random")),
        h("button", { type: "button", class: "link-btn", onclick: () => { preset = (preset + 1) % PRESETS.length; setRoots(PRESETS[preset]); reset(); } }, T("po.new"))),
      h("p", { class: "ex-fine" }, T("po.fine"))
    );
    setRoots(PRESETS[0]);
    reset();
  }

  // =====================================================================
  // 3. Quantum computing: the 15-to-1 magic-state factory
  // =====================================================================
  // Input i (1..15) is wired to check j when bit j of i is set (the columns of the [15,11,3] Hamming
  // code's parity-check matrix). A batch passes when the faulty inputs' numbers XOR to zero; it then
  // carries a logical fault exactly when the number of faulty inputs is odd.
  function buildFactory(host) {
    const W = 520, H = 252, N = 15, CHECKS = ["A", "B", "C", "D"];
    // Hamming [15,11] weight enumerator: how many fault patterns of each size pass every check.
    const ENUM = { 0: 1, 3: 35, 4: 105, 5: 168, 6: 280, 7: 435, 8: 435, 9: 280, 10: 168, 11: 105, 12: 35, 15: 1 };
    function exact(p) {
      let keep = 0, bad = 0;
      for (const [w, a] of Object.entries(ENUM)) {
        const pr = a * p ** w * (1 - p) ** (N - w);
        keep += pr; if (w % 2) bad += pr;
      }
      return { keep, out: bad / keep };
    }
    const RATES = [0.001, 0.002, 0.005, 0.01, 0.02, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15];
    const pct = (x) => `${num(100 * x, x < 0.01 ? 2 : x < 0.1 ? 1 : 0)}%`;
    const sig2 = (x) => { const e = Math.floor(Math.log10(x)) - 1; return Math.round(x / 10 ** e) * 10 ** e; };
    const rate = (x) => (x >= 0.01 ? pct(x) : x < 1e-15 ? T("mf.tiny") : T("mf.oneIn", { n: num(sig2(1 / x)) }));

    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "mf", role: "group", "aria-label": T("mf.aria") });
    const pos = (i) => [40 + ((i - 1) % 5) * 54, 52 + Math.floor((i - 1) / 5) * 72];
    const inputs = [];
    svg.append(s("text", { class: "mf-head", x: 148, y: 16, "text-anchor": "middle" }, T("mf.inputs")));
    for (let i = 1; i <= N; i++) {
      const [x, y] = pos(i);
      const bits = CHECKS.map((_, j) => s("rect", { class: `mf-bit${i & (1 << j) ? " on" : ""}`, x: x - 15 + j * 8, y: y + 23, width: 6, height: 6, rx: 1.5, "data-check": j }));
      const g = s("g", { class: "mf-in", tabindex: 0, role: "button", "aria-pressed": "false", "aria-label": T("mf.inAria", { i }) },
        s("circle", { cx: x, cy: y, r: 17 }), s("text", { x, y, "text-anchor": "middle", "dominant-baseline": "central" }, String(i)), ...bits);
      g.addEventListener("click", () => toggle(i));
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } });
      inputs[i] = g;
      svg.append(g);
    }
    svg.append(s("text", { class: "mf-head", x: 352, y: 16, "text-anchor": "middle" }, T("mf.checks")));
    const lamps = CHECKS.map((c, j) => {
      const y = 34 + j * 50;
      const g = s("g", { class: "mf-lamp", tabindex: 0, role: "img", "aria-label": T("mf.checkAria", { c }) },
        s("rect", { x: 328, y, width: 48, height: 34, rx: 10 }),
        s("text", { x: 352, y: y + 17, "text-anchor": "middle", "dominant-baseline": "central" }, c));
      const on = () => show(j), off = () => show(null);
      g.addEventListener("mouseenter", on); g.addEventListener("mouseleave", off);
      g.addEventListener("focus", on); g.addEventListener("blur", off);
      svg.append(g);
      return g;
    });
    svg.append(
      s("line", { class: "mf-arrow", x1: 296, y1: 126, x2: 318, y2: 126 }), s("path", { class: "mf-head-tip", d: "M318 120 L326 126 L318 132 Z" }),
      s("line", { class: "mf-arrow", x1: 386, y1: 126, x2: 418, y2: 126 }), s("path", { class: "mf-head-tip", d: "M418 120 L426 126 L418 132 Z" }),
      s("text", { class: "mf-head", x: 466, y: 16, "text-anchor": "middle" }, T("mf.output")));
    const outCircle = s("circle", { cx: 466, cy: 126, r: 30 });
    const outText = s("text", { x: 466, y: 126, "text-anchor": "middle", "dominant-baseline": "central" }, "T");
    const outWord = s("text", { class: "mf-word", x: 466, y: 178, "text-anchor": "middle" });
    const out = s("g", { class: "mf-out" }, outCircle, outText);
    svg.append(out, outWord, s("text", { class: "mf-key", x: 16, y: H - 6 }, T("mf.key")));

    const status = h("p", { class: "ex-status", "aria-live": "polite" });
    const faulty = new Set();
    function show(j) {
      inputs.forEach((g, i) => g && g.classList.toggle("hl", j != null && !!(i & (1 << j))));
      svg.querySelectorAll(".mf-bit").forEach((b) => b.classList.toggle("hl", j != null && +b.dataset.check === j));
    }
    function update() {
      let syn = 0;
      faulty.forEach((i) => { syn ^= i; });
      inputs.forEach((g, i) => { if (!g) return; const f = faulty.has(i); g.classList.toggle("bad", f); g.setAttribute("aria-pressed", String(f)); });
      lamps.forEach((g, j) => g.classList.toggle("fire", !!(syn & (1 << j))));
      const fired = CHECKS.filter((_, j) => syn & (1 << j)).length, n = faulty.size;
      const state = !n ? "clean" : syn ? "trash" : n % 2 ? "fooled" : "clean";
      out.setAttribute("class", `mf-out ${state}`);
      outText.textContent = state === "trash" ? "✕" : "T";
      outWord.textContent = T(`mf.w.${state}`);
      status.textContent =
        !n ? T("mf.intro") :
        syn ? T("mf.caught", { n: fired }) :
        n % 2 ? T(n === 3 ? "mf.fooled3" : "mf.fooled", { n }) :
        T("mf.cancel", { n });
    }
    function toggle(i) { faulty.has(i) ? faulty.delete(i) : faulty.add(i); update(); }
    function set(list) { faulty.clear(); list.forEach((i) => faulty.add(i)); update(); }
    function sneaky() {
      const a = 1 + Math.floor(Math.random() * N);
      let b; do b = 1 + Math.floor(Math.random() * N); while (b === a);
      set([a, b, a ^ b]);
    }

    // --- many batches at once ---
    const slider = h("input", { type: "range", min: 0, max: RATES.length - 1, value: 3, class: "range", "aria-label": T("mf.rateAria") });
    const pOut = h("strong", {});
    const stats = h("div", { class: "mf-stats", "aria-live": "polite" });
    const p = () => RATES[+slider.value];
    function runOne() {
      const list = [];
      for (let i = 1; i <= N; i++) if (Math.random() < p()) list.push(i);
      set(list);
    }
    function bar(label, x, cls) {
      const w = clamp((Math.log10(x) + 13) / 13 * 100, 2, 100); // log scale from 1e-13 to 1
      return h("div", { class: "wall-row" }, h("span", { class: "wall-name" }, label),
        h("span", { class: "wall-track" }, h("span", { class: `wall-fill ${cls}`, style: `width:${w}%` })), h("span", { class: "wall-val" }, rate(x)));
    }
    function runMany() {
      const B = 100000, q = p();
      let kept = 0, bad = 0;
      for (let b = 0; b < B; b++) {
        let syn = 0, n = 0;
        for (let i = 1; i <= N; i++) if (Math.random() < q) { syn ^= i; n++; }
        if (!syn) { kept++; if (n % 2) bad++; }
      }
      const th = exact(q), two = exact(th.out);
      stats.replaceChildren(
        h("p", { class: "mf-line" }, T("mf.kept", { kept: num(kept), b: num(B), bad: num(bad) })),
        bar(T("mf.barIn"), q, "in"),
        bar(T("mf.barOut"), th.out, "out"),
        bar(T("mf.barTwo"), two.out, "two"),
        h("p", { class: "mf-line" },
          bad ? T("mf.measured", { m: rate(bad / kept), e: rate(th.out) }) : T("mf.none", { kept: num(kept), e: rate(th.out) }),
          " ", T("mf.cost", { c: num(N / th.keep, 1) })),
        ...(th.out >= q ? [h("p", { class: "mf-line warn" }, T("mf.useless"))] : []));
    }
    function onRate() { pOut.textContent = pct(p()); stats.replaceChildren(h("p", { class: "mf-line faint" }, T("mf.prompt"))); }
    slider.addEventListener("input", onRate);

    host.append(
      h("div", { class: "mf-wrap" }, svg),
      status,
      h("div", { class: "links" },
        h("button", { type: "button", class: "btn", onclick: sneaky }, T("mf.sneaky")),
        h("button", { type: "button", class: "link-btn", onclick: () => set([]) }, T("mf.clear"))),
      h("div", { class: "mf-many" },
        h("label", { class: "range-row" }, h("span", {}, T("mf.rate"), pOut), slider),
        h("div", { class: "links" },
          h("button", { type: "button", class: "btn", onclick: runMany }, T("mf.runMany")),
          h("button", { type: "button", class: "link-btn", onclick: runOne }, T("mf.runOne"))),
        stats),
      h("p", { class: "ex-fine" }, T("mf.fine"))
    );
    update(); onRate();
  }

  // =====================================================================
  // Tabs
  // =====================================================================
  const BUILDERS = { qc: buildQubit, po: buildLandscape, qcomp: buildFactory };
  const COLORS = { qc: "var(--blue)", po: "var(--green)", qcomp: "var(--coral)" };
  const keys = Object.keys(E);
  const tabs = document.getElementById("ex-tabs"), panels = document.getElementById("ex-panels");
  const pubById = Object.fromEntries(S.publications.map((p) => [p.id, p]));
  const built = {};
  let current = null;

  keys.forEach((k, i) => {
    const ex = E[k];
    tabs.append(h("button", {
      type: "button", role: "tab", id: `ex-tab-${k}`, "aria-controls": `ex-panel-${k}`, "aria-selected": "false", tabindex: "-1",
      class: "ex-tab", onclick: () => open(k, false)
    }, h("span", { class: "ex-num", style: `background:${COLORS[k]}` }, String(i + 1)), h("span", {}, tr(ex.tab))));

    const viz = h("div", { class: "ex-viz" });
    panels.append(h("div", { class: "ex-panel card", role: "tabpanel", id: `ex-panel-${k}`, "aria-labelledby": `ex-tab-${k}`, hidden: true },
      h("div", { class: "ex-text" },
        h("h3", {}, tr(ex.title)),
        tr(ex.body).map((p) => h("p", {}, p)),
        h("p", { class: "ex-try" }, h("strong", {}, T("ex.try")), tr(ex.tryIt)),
        h("p", { class: "ex-papers" }, T("ex.papers"),
          ex.papers.filter((id) => pubById[id]).map((id, j) => [j ? ", " : "",
            h("a", { href: `#pub-${id}`, title: pubById[id].title }, id)]))),
      viz));
    built[k] = { viz, done: false };
  });
  tabs.addEventListener("keydown", (e) => {
    const i = keys.indexOf(current);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const k = keys[(i + (e.key === "ArrowRight" ? 1 : keys.length - 1)) % keys.length];
      open(k, false); document.getElementById(`ex-tab-${k}`).focus();
    }
  });
  // The paper links reuse the publication list's own anchors.
  panels.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#pub-"]');
    if (!a) return;
    const card = document.querySelector(a.getAttribute("href"));
    if (!card) return;
    e.preventDefault();
    card.scrollIntoView({ block: "center", behavior: "smooth" });
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
    setTimeout(() => card.classList.remove("flash"), 1800);
  });

  function open(k, scroll) {
    if (!E[k]) return;
    current = k;
    keys.forEach((key) => {
      const on = key === k;
      const tab = document.getElementById(`ex-tab-${key}`);
      tab.setAttribute("aria-selected", String(on)); tab.tabIndex = on ? 0 : -1;
      document.getElementById(`ex-panel-${key}`).hidden = !on;
    });
    if (!built[k].done) { built[k].done = true; BUILDERS[k](built[k].viz); }
    if (scroll) document.getElementById("explained").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }
  open(keys[0], false);
  window.Explainer = { open: (k) => open(k, true) };
  // Last script on the page: everything is rendered, so a language switch can return to the same spot.
  window.I18N.restoreScroll();
})();
