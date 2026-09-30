/*
 * Languages. The page language comes from ?lang=, then the visitor's saved
 * choice, then their browser language, then English.
 *
 *   I18N.t("key", { n: 3 })   interface label, with {placeholders}
 *   I18N.tr(value)            content from data.js: a string or { en, ca }
 *
 * Static HTML uses data-i18n="key" (text), data-i18n-html="key" (markup)
 * and data-i18n-attr="attr:key; attr2:key2".
 */
(function () {
  "use strict";
  const LANGS = { en: "English", ca: "Català" };

  const STR = {
    en: {
      "meta.description": "Llorenç Balada Gaggioli: Marie Skłodowska-Curie PhD Fellow at CTU Prague and LAAS-CNRS, working on quantum optimal control, polynomial optimization and tensor networks.",
      "skip": "Skip to content",
      "nav.main": "Main",
      "nav.research": "Research",
      "nav.publications": "Publications",
      "nav.activities": "Activities",
      "nav.cv": "CV",
      "nav.contact": "Contact",
      "nav.menu": "Open menu",
      "nav.theme": "Toggle dark mode",
      "nav.language": "Language",
      "hero.photoAlt": "Portrait of Llorenç Balada Gaggioli",
      "social.email": "Email",
      "news.title": "Latest news",
      "news.read": "Read →",
      "about.title": "About me",
      "research.kicker": "Research",
      "research.title": "PhD research map",
      "map.aria": "Research map: three research topics and the papers that connect them",
      "map.topicAria": "{name}: show related papers",
      "map.hint": "Hover a bubble to preview, click to pin it here. Papers sit between the topics they connect.",
      "map.papers": "{n} papers →",
      "map.back": "← All topics",
      "map.topic": "Topic",
      "map.explain": "Explain it simply",
      "map.filter": "Filter publications",
      "map.inList": "In the list",
      "legend": "Legend",
      "tag.published": "Published",
      "tag.preprint": "Preprint",
      "tag.first": "First author",
      "explained.kicker": "Research, explained",
      "explained.title": "What I work on, in three experiments",
      "explained.lead": "No equations needed. Each one is a small, real simulation of an idea behind my research.",
      "explained.tabs": "Research topics",
      "pubs.kicker": "Publications",
      "pubs.title": "Papers & preprints",
      "pubs.filterAria": "Filter publications",
      "pubs.all": "All",
      "pubs.first": "First author",
      "pubs.published": "Published",
      "pubs.empty": "Nothing here yet.",
      "pubs.abstract": "Abstract",
      "pubs.journal": "Journal",
      "pubs.code": "Code",
      "pubs.onMap": "On the map",
      "pubs.cite": "Cite",
      "cite.title": "Cite this paper",
      "cite.close": "Close",
      "cite.copy": "Copy BibTeX",
      "cite.link": "Copy link to paper",
      "cite.copied": "Copied ✓",
      "cite.linkCopied": "Link copied ✓",
      "acts.kicker": "Activities",
      "acts.title": "Talks, conferences & schools",
      "acts.filterAria": "Filter activities",
      "acts.all": "All",
      "acts.upcoming": "Upcoming",
      "acts.talks": "Talks",
      "acts.posters": "Posters",
      "kind.conference": "Conference", "kinds.conference": "Conferences",
      "kind.workshop": "Workshop", "kinds.workshop": "Workshops",
      "kind.school": "School", "kinds.school": "Schools",
      "kind.visit": "Research visit", "kinds.visit": "Research visits",
      "kind.course": "Course", "kinds.course": "Courses",
      "tag.upcoming": "Upcoming",
      "tag.talk": "Talk",
      "tag.poster": "Poster",
      "cv.kicker": "Curriculum vitae",
      "cv.title": "Path so far",
      "cv.full": "Full CV (PDF)",
      "cv.present": "present",
      "cv.research": "Research",
      "cv.education": "Education",
      "footer.title": "Get in touch",
      "footer.funding": "Funded by the European Union under the Marie Skłodowska-Curie Actions, as part of the <a href=\"https://tenors-network.eu/\">TENORS</a> doctoral network.",
      "footer.flag": "Flag of the European Union",
      "footer.top": "Back to top ↑",
      "noscript": "This site needs JavaScript to show its content. Email: llorenc.balada.gaggioli@fel.cvut.cz",
      "months": "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec",

      "ex.try": "Try it. ",
      "ex.papers": "In my papers: ",
      "qc.sphereAria": "Bloch sphere showing the qubit state",
      "qc.target": "1 (target)",
      "qc.pulse": "Control pulse",
      "qc.pulseAria": "Control pulse editor: drag bars up or down",
      "qc.time": "time →",
      "qc.strength": "pulse strength",
      "qc.match": "Match with target",
      "qc.done": "Target reached: the qubit was flipped from 0 to 1.",
      "qc.none": "No pulse yet: the arrow just stays at the north pole.",
      "qc.close": "Very close. Fine-tune the bars, or let the optimizer finish.",
      "qc.keep": "Keep shaping the pulse to bring the arrow down to the target.",
      "qc.optimize": "Optimize",
      "qc.reset": "Reset",
      "po.aria": "An optimization landscape with several valleys",
      "po.hint": "Click anywhere to drop a ball",
      "po.intro": "Each point is an option; lower is better. The deepest valley is the best possible option.",
      "po.certified": "Certified: no option costs less than {v}",
      "po.raising": "Raising the floor…",
      "po.rolling": "The ball rolls downhill, like a local optimization method…",
      "po.stopped": "The ball stopped at cost {v}. Is this the deepest valley? The ball cannot tell. Press Certify to find out.",
      "po.floorOnly": "The floor stopped at cost {v}: the best possible value, and it comes with a proof.",
      "po.lucky": "The ball happened to find the deepest valley, but only the floor proves that no better option exists.",
      "po.stuck": "The ball got stuck in a local valley (cost {a}). The certified floor reveals a deeper one, with cost {b}.",
      "po.certify": "Certify global minimum",
      "po.random": "Drop a random ball",
      "po.new": "New landscape",
      "po.fine": "For one variable the certificate is exact. The moment–SOS hierarchies I work with extend the same idea to problems with thousands of variables.",
      "lr.original": "Original",
      "lr.rebuilt": "Rebuilt",
      "lr.origAria": "Original photo",
      "lr.recAria": "Photo rebuilt from a few patterns",
      "lr.patternsAria": "Number of patterns",
      "lr.photoLabel": "A photo is a big table of numbers…",
      "lr.patterns": "Simple patterns used: ",
      "lr.note": "{kept} numbers instead of {total} ({pct}% of the original).",
      "lr.stateLabel": "…and so is a quantum state, but a much bigger one",
      "lr.qubits": "Qubits: ",
      "lr.qubitsAria": "Number of qubits",
      "lr.exact": "Exact description",
      "lr.tn": "Tensor network",
      "lr.v1": "{n} qubits: the exact description still fits in a laptop's memory.",
      "lr.v2": "{n} qubits: exact simulation now needs one of the world's largest supercomputers.",
      "lr.v3": "{n} qubits: beyond every supercomputer on Earth. The tensor network needs just {tn}.",
      "lr.v4": "{n} qubits: more memory than all the data humanity has ever stored. The tensor network: {tn}.",
      "lr.fine": "Memory on a logarithmic scale. The tensor network assumes limited entanglement (bond dimension 32), which is exactly the kind of structure that real problems often have."
    },

    ca: {
      "meta.description": "Llorenç Balada Gaggioli: investigador predoctoral Marie Skłodowska-Curie a la CTU de Praga i al LAAS-CNRS, treballa en control òptim quàntic, optimització polinòmica i xarxes de tensors.",
      "skip": "Vés al contingut",
      "nav.main": "Principal",
      "nav.research": "Recerca",
      "nav.publications": "Publicacions",
      "nav.activities": "Activitats",
      "nav.cv": "CV",
      "nav.contact": "Contacte",
      "nav.menu": "Obre el menú",
      "nav.theme": "Canvia el mode fosc",
      "nav.language": "Idioma",
      "hero.photoAlt": "Retrat de Llorenç Balada Gaggioli",
      "social.email": "Correu",
      "news.title": "Novetats",
      "news.read": "Llegeix →",
      "about.title": "Sobre mi",
      "research.kicker": "Recerca",
      "research.title": "Mapa de la recerca del doctorat",
      "map.aria": "Mapa de recerca: tres temes de recerca i els articles que els connecten",
      "map.topicAria": "{name}: mostra els articles relacionats",
      "map.hint": "Passa per sobre d'una bombolla per veure-la i fes-hi clic per fixar-la aquí. Els articles se situen entre els temes que connecten.",
      "map.papers": "{n} articles →",
      "map.back": "← Tots els temes",
      "map.topic": "Tema",
      "map.explain": "Explica-ho fàcil",
      "map.filter": "Filtra les publicacions",
      "map.inList": "A la llista",
      "legend": "Llegenda",
      "tag.published": "Publicat",
      "tag.preprint": "Preprint",
      "tag.first": "Primer autor",
      "explained.kicker": "La recerca, explicada",
      "explained.title": "En què treballo, en tres experiments",
      "explained.lead": "No cal cap equació. Cadascun és una petita simulació real d'una idea que hi ha darrere la meva recerca.",
      "explained.tabs": "Temes de recerca",
      "pubs.kicker": "Publicacions",
      "pubs.title": "Articles i preprints",
      "pubs.filterAria": "Filtra les publicacions",
      "pubs.all": "Tots",
      "pubs.first": "Primer autor",
      "pubs.published": "Publicats",
      "pubs.empty": "Encara no hi ha res.",
      "pubs.abstract": "Resum",
      "pubs.journal": "Revista",
      "pubs.code": "Codi",
      "pubs.onMap": "Al mapa",
      "pubs.cite": "Cita",
      "cite.title": "Cita aquest article",
      "cite.close": "Tanca",
      "cite.copy": "Copia el BibTeX",
      "cite.link": "Copia l'enllaç a l'article",
      "cite.copied": "Copiat ✓",
      "cite.linkCopied": "Enllaç copiat ✓",
      "acts.kicker": "Activitats",
      "acts.title": "Xerrades, congressos i escoles",
      "acts.filterAria": "Filtra les activitats",
      "acts.all": "Totes",
      "acts.upcoming": "Properes",
      "acts.talks": "Xerrades",
      "acts.posters": "Pòsters",
      "kind.conference": "Congrés", "kinds.conference": "Congressos",
      "kind.workshop": "Workshop", "kinds.workshop": "Workshops",
      "kind.school": "Escola", "kinds.school": "Escoles",
      "kind.visit": "Estada de recerca", "kinds.visit": "Estades de recerca",
      "kind.course": "Curs", "kinds.course": "Cursos",
      "tag.upcoming": "Properament",
      "tag.talk": "Xerrada",
      "tag.poster": "Pòster",
      "cv.kicker": "Currículum",
      "cv.title": "El camí fins ara",
      "cv.full": "CV complet (PDF)",
      "cv.present": "actualitat",
      "cv.research": "Recerca",
      "cv.education": "Formació",
      "footer.title": "Contacte",
      "footer.funding": "Finançat per la Unió Europea dins de les Accions Marie Skłodowska-Curie, com a part de la xarxa doctoral <a href=\"https://tenors-network.eu/\">TENORS</a>.",
      "footer.flag": "Bandera de la Unió Europea",
      "footer.top": "Torna a dalt ↑",
      "noscript": "Aquest lloc necessita JavaScript per mostrar el contingut. Correu: llorenc.balada.gaggioli@fel.cvut.cz",
      "months": "gen. febr. març abr. maig juny jul. ag. set. oct. nov. des.",

      "ex.try": "Prova-ho. ",
      "ex.papers": "Als meus articles: ",
      "qc.sphereAria": "Esfera de Bloch que mostra l'estat del qubit",
      "qc.target": "1 (objectiu)",
      "qc.pulse": "Pols de control",
      "qc.pulseAria": "Editor del pols de control: arrossega les barres amunt o avall",
      "qc.time": "temps →",
      "qc.strength": "intensitat del pols",
      "qc.match": "Coincidència amb l'objectiu",
      "qc.done": "Objectiu assolit: el qubit ha passat de 0 a 1.",
      "qc.none": "Encara no hi ha cap pols: la fletxa es queda al pol nord.",
      "qc.close": "Molt a prop. Ajusta les barres o deixa que l'optimitzador acabi la feina.",
      "qc.keep": "Continua donant forma al pols per portar la fletxa fins a l'objectiu.",
      "qc.optimize": "Optimitza",
      "qc.reset": "Reinicia",
      "po.aria": "Un paisatge d'optimització amb diverses valls",
      "po.hint": "Fes clic on vulguis per deixar caure una bola",
      "po.intro": "Cada punt és una opció; més avall vol dir millor. La vall més profunda és la millor opció possible.",
      "po.certified": "Certificat: cap opció costa menys de {v}",
      "po.raising": "Aixecant el terra…",
      "po.rolling": "La bola rodola pendent avall, com un mètode d'optimització local…",
      "po.stopped": "La bola s'ha aturat a un cost de {v}. És la vall més profunda? La bola no ho pot saber. Prem Certifica per descobrir-ho.",
      "po.floorOnly": "El terra s'ha aturat a un cost de {v}: el millor valor possible, i amb una prova que ho garanteix.",
      "po.lucky": "La bola ha trobat per casualitat la vall més profunda, però només el terra demostra que no n'hi ha cap de millor.",
      "po.stuck": "La bola s'ha quedat atrapada en una vall local (cost {a}). El terra certificat revela que n'hi ha una de més profunda, amb cost {b}.",
      "po.certify": "Certifica el mínim global",
      "po.random": "Deixa caure una bola a l'atzar",
      "po.new": "Paisatge nou",
      "po.fine": "Amb una sola variable el certificat és exacte. Les jerarquies de moments–SOS amb què treballo estenen la mateixa idea a problemes amb milers de variables.",
      "lr.original": "Original",
      "lr.rebuilt": "Reconstruïda",
      "lr.origAria": "Foto original",
      "lr.recAria": "Foto reconstruïda amb pocs patrons",
      "lr.patternsAria": "Nombre de patrons",
      "lr.photoLabel": "Una foto és una gran taula de nombres…",
      "lr.patterns": "Patrons simples utilitzats: ",
      "lr.note": "{kept} nombres en lloc de {total} (un {pct}% de l'original).",
      "lr.stateLabel": "…i un estat quàntic també, però molt més gran",
      "lr.qubits": "Qubits: ",
      "lr.qubitsAria": "Nombre de qubits",
      "lr.exact": "Descripció exacta",
      "lr.tn": "Xarxa de tensors",
      "lr.v1": "{n} qubits: la descripció exacta encara cap a la memòria d'un portàtil.",
      "lr.v2": "{n} qubits: la simulació exacta ja necessita un dels superordinadors més grans del món.",
      "lr.v3": "{n} qubits: més enllà de qualsevol superordinador de la Terra. La xarxa de tensors només necessita {tn}.",
      "lr.v4": "{n} qubits: més memòria que totes les dades que la humanitat ha emmagatzemat mai. La xarxa de tensors: {tn}.",
      "lr.fine": "Memòria en escala logarítmica. La xarxa de tensors suposa un entrellaçament limitat (dimensió d'enllaç 32), que és justament el tipus d'estructura que sovint tenen els problemes reals."
    }
  };

  function detect() {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q && STR[q]) return q;
    } catch (e) {}
    try {
      const saved = localStorage.getItem("lang");
      if (saved && STR[saved]) return saved;
    } catch (e) {}
    const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"])
      .map((l) => String(l).slice(0, 2).toLowerCase());
    return prefs.find((l) => STR[l]) || "en";
  }

  const lang = detect();
  document.documentElement.lang = lang;

  function t(key, vars) {
    let s = (STR[lang] && STR[lang][key]) ?? STR.en[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  }
  function tr(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && "en" in v) return v[lang] ?? v.en;
    return v;
  }
  function apply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((x) => x.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("meta.description"));
  }
  // Switching reloads with ?lang= so the URL is shareable; the scroll position is kept.
  function set(l) {
    if (!STR[l] || l === lang) return;
    try { localStorage.setItem("lang", l); } catch (e) {}
    try { sessionStorage.setItem("langScroll", String(window.scrollY)); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set("lang", l);
    url.hash = "";
    location.href = url.toString();
  }
  function restoreScroll() {
    try {
      const y = sessionStorage.getItem("langScroll");
      if (y != null) { sessionStorage.removeItem("langScroll"); window.scrollTo({ top: +y, behavior: "instant" }); }
    } catch (e) {}
  }

  window.I18N = { lang, langs: LANGS, t, tr, apply, set, restoreScroll, locale: lang === "ca" ? "ca-ES" : "en-GB" };
})();
