/*
 * Illustrations for "Papers, in plain words": one small drawing per paper id.
 * Each function returns an SVG string (viewBox 0 0 320 200). Colours come from
 * CSS classes (.il-*) in style.css, so the drawings follow the light/dark theme.
 * Papers without a drawing here get the generic `_default` one.
 */
(function () {
  "use strict";
  const L = (v) => window.I18N.tr(v);
  const svg = (body) => `<svg class="il" viewBox="0 0 320 200" aria-hidden="true" focusable="false">${body}</svg>`;
  const text = (x, y, s, cls = "", anchor = "middle") =>
    `<text class="il-text ${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;
  const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const path = (list) => "M" + list.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
  // Arrow with a drawn head (no <marker>, so ids never clash between drawings).
  function arrow(x1, y1, x2, y2, cls = "") {
    const a = Math.atan2(y2 - y1, x2 - x1), s = 6;
    const head = [[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]];
    return `<line class="il-arrow ${cls}" x1="${x1}" y1="${y1}" x2="${x2 - 4 * Math.cos(a)}" y2="${y2 - 4 * Math.sin(a)}"/><polygon class="il-head ${cls}" points="${pts(head)}"/>`;
  }
  // Small deterministic random numbers, so drawings look the same on every visit.
  function rng(seed) {
    let t = seed;
    return () => { t = (t * 1664525 + 1013904223) % 4294967296; return t / 4294967296; };
  }

  const ILL = {
    // Weyl chamber: the perfect entanglers, the local gates, and sqrt(iSWAP) as the closest perfect entangler.
    LR2Q() {
      // Weyl-chamber coordinates (c1, c2, c3), projected to the page.
      const P = (c1, c2, c3) => [40 + 250 * c1 + 70 * c2 - 10 * c3, 170 - 84 * c2 - 196 * c3];
      const O = P(0, 0, 0), A1 = P(1, 0, 0), A2 = P(0.5, 0.5, 0), A3 = P(0.5, 0.5, 0.5);
      const cnot = P(0.5, 0, 0), siswap = P(0.25, 0.25, 0), siswapD = P(0.75, 0.25, 0);
      const sswap = P(0.25, 0.25, 0.25), sswapD = P(0.75, 0.25, 0.25);
      const line = (a, b, cls = "il-edge") => `<line class="${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
      // The perfect entanglers: the polyhedron with vertices CNOT, sqrt(iSWAP) (and its inverse), iSWAP, sqrt(SWAP) (and its inverse).
      const peEdges = [[cnot, siswap], [cnot, siswapD], [siswap, A2], [siswapD, A2], [sswap, sswapD], [cnot, sswap], [cnot, sswapD],
        [siswap, sswap], [siswapD, sswapD], [A2, sswap], [A2, sswapD]];
      return svg(
        `<polygon class="il-region" points="${pts([siswap, cnot, siswapD, sswapD, sswap])}"/>` +
        line(O, A2, "il-edge back") + line(A1, A2, "il-edge back") + line(A2, A3, "il-edge back") +
        peEdges.map(([a, b]) => line(a, b, "il-pe")).join("") +
        line(O, A1) + line(O, A3) + line(A1, A3) +
        `<circle class="il-dot green" cx="${O[0]}" cy="${O[1]}" r="6"/><circle class="il-dot green" cx="${A1[0]}" cy="${A1[1]}" r="6"/>` +
        `<circle class="il-dot" cx="${cnot[0]}" cy="${cnot[1]}" r="3.5"/><circle class="il-dot" cx="${A3[0]}" cy="${A3[1]}" r="3.5"/>` +
        `<circle class="il-halo" cx="${siswap[0]}" cy="${siswap[1]}" r="10"/><circle class="il-dot blue" cx="${siswap[0]}" cy="${siswap[1]}" r="5"/>` +
        `<line class="il-faint" x1="88" y1="74" x2="${sswap[0] - 4}" y2="${sswap[1] - 2}"/>` +
        text(28, 66, L({ en: "perfect", ca: "entrellaçadors" }), "strong", "start") +
        text(28, 79, L({ en: "entanglers", ca: "perfectes" }), "strong", "start") +
        text(siswap[0] - 12, siswap[1] + 14, "√iSWAP", "strong", "end") +
        text(cnot[0], 188, "CNOT") + text(A3[0], A3[1] - 9, "SWAP") +
        text(O[0], 188, L({ en: "local", ca: "local" }), "green") + text(A1[0], 188, L({ en: "local", ca: "local" }), "green")
      );
    },

    // Magic-state factory: nine noisy inputs, one stabilizer code, one cleaner T state.
    MSD() {
      const r = rng(7);
      let inputs = "";
      for (const x of [34, 58, 82]) for (const y of [58, 84, 110]) {
        inputs += `<circle class="il-ring" cx="${x + (r() - 0.5) * 4}" cy="${y + (r() - 0.5) * 4}" r="11"/><circle class="il-yellow" cx="${x}" cy="${y}" r="8"/>`;
      }
      let code = "";
      const gx = [148, 170, 192], gy = [66, 86, 106];
      for (const y of gy) code += `<line class="il-faint" x1="${gx[0]}" y1="${y}" x2="${gx[2]}" y2="${y}"/>`;
      for (const x of gx) code += `<line class="il-faint" x1="${x}" y1="${gy[0]}" x2="${x}" y2="${gy[2]}"/>`;
      for (const x of gx) for (const y of gy) code += `<circle class="il-dot blue" cx="${x}" cy="${y}" r="3.5"/>`;
      return svg(
        inputs +
        arrow(98, 84, 122, 84) +
        `<rect class="il-box" x="126" y="46" width="88" height="78" rx="12"/>` + code +
        arrow(218, 84, 246, 84) +
        `<circle class="il-green" cx="270" cy="84" r="17"/>` + text(270, 90, "T", "on-dark serif") +
        text(58, 144, L({ en: "9 noisy", ca: "9 entrades" })) + text(58, 157, L({ en: "inputs", ca: "sorolloses" })) +
        text(170, 144, L({ en: "one code", ca: "un sol codi" })) +
        text(270, 122, L({ en: "1 cleaner", ca: "1 estat T" })) + text(270, 135, L({ en: "T state", ca: "més net" })) +
        text(160, 186, L({ en: "fewest inputs: exactly 9", ca: "mínim d'entrades: exactament 9" }), "strong")
      );
    },

    // Evenly spaced energy ladder, and an error that averages out over one period.
    RCS() {
      let ladder = "";
      const ys = [40, 70, 100, 130, 160];
      ys.forEach((y) => { ladder += `<line class="il-level" x1="28" y1="${y}" x2="92" y2="${y}"/>`; });
      for (let i = 0; i < ys.length - 1; i++) ladder += arrow(110, ys[i] + 15, 110, ys[i] + 4, "small") + arrow(110, ys[i] + 15, 110, ys[i + 1] - 4, "small");
      const x0 = 155, x1 = 295, mid = 100, amp = 42;
      const curve = [];
      for (let x = x0; x <= x1; x += 2) curve.push([x, mid - amp * Math.sin((2 * Math.PI * (x - x0)) / (x1 - x0))]);
      const half = curve.filter(([x]) => x <= (x0 + x1) / 2), rest = curve.filter(([x]) => x >= (x0 + x1) / 2);
      return svg(
        ladder +
        `<path class="il-pos" d="${path([[x0, mid], ...half, [(x0 + x1) / 2, mid]])} Z"/>` +
        `<path class="il-neg" d="${path([[(x0 + x1) / 2, mid], ...rest, [x1, mid]])} Z"/>` +
        `<line class="il-faint" x1="146" y1="${mid}" x2="304" y2="${mid}"/>` +
        `<path class="il-curve" d="${path(curve)}"/>` +
        text(190, 92, "+", "big-sign") + text(260, 122, "−", "big-sign") +
        `<path class="il-faint" d="M${x0} 164 V170 H${x1} V164"/>` +
        text(225, 186, L({ en: "one period", ca: "un període" })) +
        text(60, 186, L({ en: "equal steps", ca: "graons iguals" })) +
        text(225, 30, L({ en: "the error averages to zero", ca: "l'error es compensa" }), "strong")
      );
    },

    // Certified limit: fidelity versus time, an impossible region, pulses below it, a minimum time.
    RCQC() {
      const bound = "M40 166 C 95 120 150 62 205 44 L 300 44";
      return svg(
        `<path class="il-impossible" d="${bound} L 300 30 L 40 30 Z"/>` +
        `<line class="il-faint" x1="205" y1="44" x2="205" y2="172" stroke-dasharray="4 4"/>` +
        `<path class="il-curve" d="${bound}"/>` +
        [[100, 150], [140, 124], [185, 96], [230, 74], [268, 64]].map(([x, y]) => `<circle class="il-yellow" cx="${x}" cy="${y}" r="6"/>`).join("") +
        arrow(40, 172, 304, 172) + arrow(40, 172, 40, 24) +
        text(48, 30, L({ en: "fidelity", ca: "fidelitat" }), "", "start") +
        text(304, 190, L({ en: "time", ca: "temps" }), "", "end") +
        text(205, 190, L({ en: "min. time", ca: "temps mínim" }), "strong") +
        text(92, 66, L({ en: "impossible", ca: "impossible" }), "faint") +
        text(296, 41, L({ en: "certified limit", ca: "límit certificat" }), "strong", "end") +
        text(150, 150, L({ en: "pulses", ca: "polsos" }), "yellow")
      );
    },

    // A chain of maps passing small intermediate states.
    ComPOP() {
      let dots = "";
      for (let i = 0; i < 8; i++) dots += `<circle class="il-dot" cx="33" cy="${52 + i * 14}" r="3"/>`;
      const f = (x, label) => `<rect class="il-blue" x="${x}" y="80" width="34" height="40" rx="8"/>` + text(x + 17, 105, label, "on-dark serif");
      const st = (x) => `<rect class="il-yellow" x="${x}" y="86" width="14" height="28" rx="4"/>`;
      return svg(
        `<rect class="il-box" x="18" y="40" width="30" height="120" rx="8"/>` + dots +
        arrow(50, 100, 66, 100) + f(68, "f₁") + arrow(104, 100, 118, 100) + st(120) +
        arrow(136, 100, 150, 100) + f(152, "f₂") + arrow(188, 100, 202, 100) + st(204) +
        arrow(220, 100, 234, 100) + f(236, "f₃") + arrow(272, 100, 286, 100) +
        `<circle class="il-green" cx="296" cy="100" r="8"/>` +
        `<line class="il-faint" x1="127" y1="118" x2="158" y2="132"/><line class="il-faint" x1="211" y1="118" x2="180" y2="132"/>` +
        text(169, 146, L({ en: "small states", ca: "estats petits" }), "yellow") +
        text(14, 182, L({ en: "many variables", ca: "moltes variables" }), "", "start") +
        text(170, 60, L({ en: "a chain of simple steps", ca: "una cadena de passos senzills" }), "strong")
      );
    },

    // Space of gates: the geodesic between two gates, and noisy paths around it.
    RSE() {
      const A = [68, 138], B = [250, 76], C = [150, 78];
      const q = (t) => [(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * C[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * C[1] + t * t * B[1]];
      let noisy = "";
      [3, 11, 23].forEach((seed, k) => {
        const r = rng(seed), list = [];
        for (let i = 0; i <= 24; i++) {
          const t = i / 24, [x, y] = q(t), w = Math.sin(Math.PI * t) * 16;
          list.push([x + (r() - 0.5) * w * 0.6, y + (k - 1) * w * 0.7 + (r() - 0.5) * w]);
        }
        noisy += `<path class="il-noise" d="${path(list)}"/>`;
      });
      let grid = "";
      for (const k of [-36, 0, 36]) grid += `<path class="il-faint" d="M${34 + Math.abs(k) * 0.9} ${108 + k} Q 160 ${88 + k} ${286 - Math.abs(k) * 0.9} ${108 + k}"/>`;
      for (const d of [-80, 0, 80]) grid += `<path class="il-faint" d="M${160 + d} ${44 + Math.abs(d) * 0.12} Q ${160 + d * 1.25} 108 ${160 + d} ${172 - Math.abs(d) * 0.12}"/>`;
      return svg(
        `<ellipse class="il-surface" cx="160" cy="108" rx="140" ry="72"/>` + grid + noisy +
        `<path class="il-curve" d="M${A} Q ${C} ${B}"/>` +
        `<circle class="il-dot" cx="${A[0]}" cy="${A[1]}" r="5"/><circle class="il-dot" cx="${B[0]}" cy="${B[1]}" r="5"/>` +
        text(150, 76, L({ en: "geodesic", ca: "geodèsica" }), "strong") +
        text(236, 156, L({ en: "noisy paths", ca: "camins sorollosos" }), "yellow") +
        text(160, 194, L({ en: "the space of gates", ca: "l'espai de les portes" }))
      );
    },

    // Matrix product operator: a chain of small tensors, evolved in time.
    TEMPO() {
      let chain = "";
      const xs = [48, 93, 138, 183, 228, 273];
      chain += `<line class="il-bond" x1="${xs[0]}" y1="112" x2="${xs[xs.length - 1]}" y2="112"/>`;
      xs.forEach((x) => {
        chain += `<line class="il-bond" x1="${x}" y1="76" x2="${x}" y2="148"/>` +
          `<rect class="il-blue" x="${x - 14}" y="98" width="28" height="28" rx="6"/>`;
      });
      const wave = [];
      for (let x = 40; x <= 280; x += 3) wave.push([x, 50 + 8 * Math.cos(((x - 40) / 240) * 4 * Math.PI) * Math.exp(-(x - 40) / 400)]);
      return svg(
        `<path class="il-curve thin" d="${path(wave)}"/>` + arrow(40, 30, 290, 30) +
        text(290, 22, L({ en: "time", ca: "temps" }), "", "end") +
        chain +
        text(160, 178, L({ en: "a chain of small tensors (MPO)", ca: "una cadena de tensors petits (MPO)" }), "strong")
      );
    },

    // A big tensor as a sum of a few rank-one pieces.
    LRPOP() {
      let gridLines = "";
      for (const t of [1, 2]) {
        gridLines += `<line class="il-faint" x1="${28 + t * 20}" y1="70" x2="${28 + t * 20}" y2="130"/>`;
        gridLines += `<line class="il-faint" x1="28" y1="${70 + t * 20}" x2="88" y2="${70 + t * 20}"/>`;
      }
      const term = (x, cls) =>
        `<rect class="${cls}" x="${x}" y="70" width="8" height="56" rx="3"/>` + text(x + 16, 104, "⊗", "op") +
        `<rect class="${cls}" x="${x + 24}" y="94" width="24" height="8" rx="3"/>` + text(x + 56, 104, "⊗", "op") +
        `<line class="${cls}-bar" x1="${x + 64}" y1="112" x2="${x + 76}" y2="88"/>`;
      return svg(
        `<polygon class="il-cube top" points="28,70 48,52 108,52 88,70"/>` +
        `<polygon class="il-cube side" points="88,70 108,52 108,112 88,130"/>` +
        `<rect class="il-cube" x="28" y="70" width="60" height="60"/>` + gridLines +
        text(118, 104, "=", "op") +
        term(132, "il-blue") + text(222, 104, "+", "op") + term(232, "il-green") +
        text(68, 156, L({ en: "big tensor", ca: "tensor gran" })) +
        text(222, 156, L({ en: "a few simple pieces", ca: "unes poques peces simples" }), "strong") +
        text(160, 186, L({ en: "size set by the rank, not the variables", ca: "la mida la fixa el rang, no les variables" }))
      );
    },

    // A rugged landscape: a ball stuck in a local valley, and the certified global floor.
    QCPOP() {
      const f = (x) => 112 + 20 * Math.sin((x - 20) / 13) + 13 * Math.sin((x - 20) / 5.1 + 1) + 34 * Math.exp(-(((x - 214) / 16) ** 2));
      const curve = [];
      for (let x = 20; x <= 300; x += 2) curve.push([x, f(x)]);
      let g = curve[0];
      curve.forEach((p) => { if (p[1] > g[1]) g = p; });
      // A local valley on the left, well above the global one.
      let loc = null;
      for (let i = 1; i < curve.length - 1 && !loc; i++) {
        const [x, y] = curve[i];
        if (x > 40 && x < 150 && y >= curve[i - 1][1] && y >= curve[i + 1][1] && y < g[1] - 12) loc = curve[i];
      }
      loc = loc || curve[20];
      return svg(
        `<path class="il-land" d="${path(curve)} L300 182 L20 182 Z"/>` +
        `<path class="il-curve" d="${path(curve)}"/>` +
        `<line class="il-floor" x1="20" y1="${g[1] + 2}" x2="300" y2="${g[1] + 2}"/>` +
        `<circle class="il-yellow" cx="${loc[0]}" cy="${loc[1] - 8}" r="7"/>` +
        `<circle class="il-target" cx="${g[0]}" cy="${g[1]}" r="9"/>` +
        text(loc[0], loc[1] - 22, L({ en: "stuck", ca: "atrapada" }), "yellow") +
        text(24, g[1] + 16, L({ en: "certified floor", ca: "terra certificat" }), "green", "start") +
        text(g[0], 34, L({ en: "global optimum, in one run", ca: "òptim global, en una execució" }), "strong") +
        arrow(g[0], 42, g[0], g[1] - 13)
      );
    },

    // Pulse -> Hermitian generator H -> gate U, with a certificate of global optimality.
    UGS() {
      const hs = [18, 34, 48, 30, 52, 40, 22, 36];
      const bars = hs.map((v, i) => `<rect class="il-bar" x="${20 + i * 10}" y="${128 - v}" width="7" height="${v}" rx="2"/>`).join("");
      return svg(
        `<line class="il-faint" x1="16" y1="128" x2="100" y2="128"/>` + bars +
        arrow(104, 108, 120, 108) +
        `<rect class="il-box" x="122" y="86" width="40" height="44" rx="10"/>` + text(142, 115, "H", "serif-ink") +
        arrow(166, 108, 196, 108) + `<text class="il-text" x="181" y="98" text-anchor="middle">e<tspan font-size="8" dy="-5">−iH</tspan></text>` +
        `<line class="il-bond" x1="200" y1="92" x2="304" y2="92"/><line class="il-bond" x1="200" y1="124" x2="304" y2="124"/>` +
        `<rect class="il-blue" x="232" y="76" width="40" height="64" rx="8"/>` + text(252, 115, "U", "on-dark serif") +
        `<circle class="il-green" cx="290" cy="44" r="13"/><path class="il-check" d="M283 44 l5 5 l9 -10"/>` +
        text(272, 48, L({ en: "global optimum", ca: "òptim global" }), "green", "end") +
        text(58, 148, L({ en: "pulse", ca: "pols" })) +
        text(142, 148, L({ en: "generator", ca: "generador" })) +
        text(252, 160, L({ en: "gate", ca: "porta" })) +
        text(160, 190, L({ en: "certified, in a single shot", ca: "certificat, en una sola execució" }), "strong")
      );
    },

    // Basis functions, the Gram matrix of their products, and its determinant pushed up.
    LIP() {
      const cols = ["il-curve", "il-curve green", "il-curve yellow"];
      let bumps = "";
      [[58, 40], [100, 56], [142, 72]].forEach(([base, c], i) => {
        const list = [];
        for (let x = 16; x <= 98; x += 2) list.push([x, base - 22 * Math.exp(-(((x - c) / 10) ** 2))]);
        bumps += `<path class="${cols[i]}" d="${path(list)}"/>` + text(108, base + 4, `φ${"₁₂₃"[i]}`, "", "start");
      });
      const r = rng(5);
      let cells = "";
      for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
        const op = i === j ? 0.95 : 0.08 + r() * 0.2;
        cells += `<rect class="il-cell" x="${160 + j * 20}" y="${30 + i * 20}" width="18" height="18" rx="3" opacity="${op.toFixed(2)}"/>`;
      }
      return svg(
        bumps + arrow(124, 92, 150, 92) + cells +
        text(220, 22, L({ en: "products φᵢφⱼ", ca: "productes φᵢφⱼ" })) +
        text(220, 172, L({ en: "make them as independent as possible", ca: "fer-los tan independents com es pugui" }), "strong") +
        text(220, 188, L({ en: "(maximize the determinant)", ca: "(maximitzar el determinant)" }))
      );
    },

    _default(p) {
      return svg(`<circle class="il-yellow" cx="160" cy="100" r="44"/>` + text(160, 106, p.id, "id"));
    }
  };

  window.ILLUSTRATIONS = ILL;
})();
