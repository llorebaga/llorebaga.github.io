/*
 * All website content lives here. Edit this file to update the site —
 * no build step needed. Dates use "YYYY-MM" (or "YYYY-MM-DD") so the site
 * can sort entries and flag upcoming events automatically.
 *
 * Languages: any text can be a plain string (same in every language) or
 * { en: "...", ca: "..." }. Missing translations fall back to English.
 * Interface labels (buttons, menus...) live in assets/js/i18n.js.
 */
window.SITE = {
  person: {
    name: "Llorenç Balada Gaggioli",
    shortName: "LLBG",
    role: { en: "Marie Skłodowska-Curie PhD Fellow", ca: "Investigador predoctoral Marie Skłodowska-Curie" },
    tagline: {
      en: "Quantum optimal control, polynomial optimization & tensor networks",
      ca: "Control òptim quàntic, optimització polinòmica i xarxes de tensors"
    },
    affiliations: [
      { name: "CTU Prague", detail: { en: "Optimization group, AIC", ca: "Grup d'Optimització, AIC" }, url: "https://www.aic.fel.cvut.cz/research-areas/optimization" },
      { name: "LAAS-CNRS", detail: { en: "POP group, Toulouse", ca: "Grup POP, Tolosa" }, url: "https://www.laas.fr/en/teams/pop/" },
      { name: "TENORS", detail: { en: "MSCA Doctoral Network", ca: "Xarxa doctoral MSCA" }, url: "https://tenors-network.eu/" }
    ],
    email: "llorenc.balada.gaggioli@fel.cvut.cz",
    photo: "assets/img/profile.jpg",
    links: {
      scholar: "https://scholar.google.com/citations?hl=en&user=3zhaXhgAAAAJ",
      github: "https://github.com/llorebaga",
      linkedin: "https://www.linkedin.com/in/lloren%C3%A7/",
      cv: "https://drive.google.com/file/d/15PzmkshPGyUGtTX9MOb_gjPfW7Bm3Ndv/view"
    },
    address: {
      en: ["Office KN:E-302", "Karlovo náměstí 13", "Praha 2, Czech Republic"],
      ca: ["Despatx KN:E-302", "Karlovo náměstí 13", "Praga 2, República Txeca"]
    }
  },

  about: {
    en: [
      "In October 2024 I started my PhD as part of the <a href=\"https://tenors-network.eu/\">TENORS</a> project (Marie Skłodowska-Curie Doctoral Network), working on quantum optimal control under the supervision of Jakub Mareček, Didier Henrion and Milan Korda. I am part of the Optimization group at the <a href=\"https://www.aic.fel.cvut.cz/\">AIC</a> (Artificial Intelligence Centre) in Prague, and since October 2025 also of the <a href=\"https://www.laas.fr/en/teams/pop/\">Polynomial Optimization group</a> at LAAS, Toulouse."
    ],
    ca: [
      "L'octubre de 2024 vaig començar el doctorat dins del projecte <a href=\"https://tenors-network.eu/\">TENORS</a> (xarxa doctoral Marie Skłodowska-Curie), on treballo en control òptim quàntic sota la supervisió de Jakub Mareček, Didier Henrion i Milan Korda. Formo part del grup d'Optimització de l'<a href=\"https://www.aic.fel.cvut.cz/\">AIC</a> (Centre d'Intel·ligència Artificial) de Praga i, des de l'octubre de 2025, també del <a href=\"https://www.laas.fr/en/teams/pop/\">grup d'Optimització Polinòmica</a> del LAAS, a Tolosa."
    ]
  },

  research: {
    en: "I study <strong>quantum optimal control</strong>, one of the keys to developing quantum technologies. My tools are <strong>tensor networks</strong>, which let us work with very large systems, and <strong>polynomial optimization</strong>, which finds global solutions to optimization problems. My research looks for connections between these seemingly distinct areas to design new techniques for quantum optimal control.",
    ca: "Estudio el <strong>control òptim quàntic</strong>, una de les claus per desenvolupar les tecnologies quàntiques. Les meves eines són les <strong>xarxes de tensors</strong>, que permeten treballar amb sistemes molt grans, i l'<strong>optimització polinòmica</strong>, que troba solucions globals als problemes d'optimització. La meva recerca busca connexions entre aquestes àrees aparentment diferents per dissenyar noves tècniques de control òptim quàntic."
  },

  news: [
    { date: "2026-06", paper: "RCQC", text: {
      en: "New preprint with Younes Naceur: <em>Reachability and optimal-time certificates for quantum control</em>.",
      ca: "Nou preprint amb Younes Naceur: <em>Reachability and optimal-time certificates for quantum control</em>." } },
    { date: "2026-04", paper: "ComPOP", text: {
      en: "New preprint with Didier Henrion and Milan Korda: <em>Composition and tensor train structure in polynomial optimization</em>.",
      ca: "Nou preprint amb Didier Henrion i Milan Korda: <em>Composition and tensor train structure in polynomial optimization</em>." } },
    { date: "2026-04", paper: "LR2Q", text: {
      en: "New single-author preprint: <em>Low-rank geometry of two-qubit gates</em>.",
      ca: "Nou preprint en solitari: <em>Low-rank geometry of two-qubit gates</em>." } }
  ],

  // The three research areas in the research map. mapLabel: the lines inside the map bubble.
  topics: {
    qc: {
      name: { en: "Quantum Control", ca: "Control quàntic" },
      mapLabel: { en: ["Quantum", "Control"], ca: ["Control", "quàntic"] },
      blurb: {
        en: "Designing control pulses that steer quantum systems, such as gates or state preparation, quickly and accurately.",
        ca: "Dissenyar polsos de control que guien sistemes quàntics, com ara portes lògiques o preparació d'estats, de manera ràpida i precisa."
      }
    },
    po: {
      name: { en: "Polynomial Optimization", ca: "Optimització polinòmica" },
      mapLabel: { en: ["Polynomial", "Optimization"], ca: ["Optimització", "polinòmica"] },
      blurb: {
        en: "Moment–SOS hierarchies: convex relaxations that give globally optimal solutions and certified bounds.",
        ca: "Jerarquies de moments–SOS: relaxacions convexes que donen solucions òptimes globals i cotes certificades."
      }
    },
    lr: {
      name: { en: "Low-rank Structure", ca: "Estructura de rang baix" },
      mapLabel: { en: ["Low-rank", "Structure"], ca: ["Estructura", "de rang baix"] },
      blurb: {
        en: "Tensor networks and tensor decompositions (MPOs, tensor trains, CP rank) that make large problems tractable.",
        ca: "Xarxes de tensors i descomposicions tensorials (MPO, tensor trains, rang CP) que fan tractables problemes molt grans."
      }
    }
  },

  /*
   * Publications, newest first.
   * status: "published" | "preprint"   firstAuthor: true if I am first author
   * topics: keys from `topics` above (papers in two topics sit in the overlap)
   * map: [x, y] position of the bubble in the research map (omit to leave it off the map)
   */
  publications: [
    {
      id: "RCQC",
      title: "Reachability and optimal-time certificates for quantum control",
      authors: ["Younes Naceur", "Llorenç Balada Gaggioli"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2026-06-24",
      status: "preprint",
      firstAuthor: false,
      topics: ["qc", "po"],
      map: [310, 360],
      links: { arxiv: "https://arxiv.org/abs/2606.24645" },
      abstract: "Finite-time control is central to quantum technologies, yet rigorous limits on reachable targets and optimal control times remain largely unknown. We develop a framework for finite-time reachability and optimal-time certificates in constrained quantum control based on moment relaxations with implicitly time-dependent differential constraints. For fixed control horizons and control constraints, the method yields rigorous upper bounds on achievable terminal fidelities, lower bounds on the optimal control times required to reach them, and certificate gaps for benchmarking explicit control pulses. We demonstrate the versatility of our framework in three use cases: entangled-state preparation in two and three qubits, one-qubit gate synthesis across different control geometries, and excitation transfer in an n-qubit chain. Our work establishes differential moment hierarchies as a practical tool for certifying reachability limits and optimal control times in quantum control, providing hardware-aware quantum speed limits while highlighting structure exploitation as a key ingredient for scalable certification."
    },
    {
      id: "ComPOP",
      title: "Composition and tensor train structure in polynomial optimization",
      authors: ["Llorenç Balada Gaggioli", "Didier Henrion", "Milan Korda"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2026-04-19",
      status: "preprint",
      firstAuthor: true,
      topics: ["po", "lr"],
      map: [600, 610],
      links: { arxiv: "https://arxiv.org/abs/2604.17563", code: "https://github.com/llorebaga/SLPOP" },
      abstract: "We study polynomial optimization problems whose objective has a composition or tensor train structure. These polynomials can be evaluated as a sequence of maps, giving rise to intermediate variables (“states”) of dimension lower than the ambient dimension. Structures like these arise naturally in dynamical systems, Markov chains, and neural networks. We develop two moment-SOS (sums of squares) hierarchies that exploit this composition structure in different ways. The first one, termed state-lifting chordal, is based on the correlative sparsity graph of the problem. The second one, termed state-lifting push-forward, encodes the structure at the level of the measures directly. Numerical experiments demonstrate that the proposed methods can compute certified bounds for problems with hundreds or even a thousand variables. To illustrate the versatility of the hierarchies we apply them to Markov chain optimization, quantum optimal control, and neural networks."
    },
    {
      id: "LR2Q",
      title: "Low-rank geometry of two-qubit gates",
      authors: ["Llorenç Balada Gaggioli"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2026-04-16",
      status: "preprint",
      firstAuthor: true,
      topics: ["qc", "lr"],
      map: [795, 295],
      links: { arxiv: "https://arxiv.org/abs/2604.15102", code: "https://github.com/llorebaga/LR_2qubit" },
      abstract: "We present a framework based on the determinantal geometry of two-qubit gates. Combining the Weyl chamber representation with operator Schmidt theory, we interpret gate synthesis as a distance problem to determinantal varieties. This gives an operational geometry to the Weyl chamber, quantifying nonlocal complexity. We show that the square root iSWAP gate is the closest perfect entangler to the variety of local operations, and that no perfect entangler can be approximated by a local gate with average gate fidelity above 79.8%. The three different determinantal costs form a synthesis-adapted coordinate system that encodes nonlocal complexity and generally reconstructs the Weyl chamber."
    },
    {
      id: "RSE",
      title: "Geometric quantum control and the random Schrödinger equation",
      authors: ["Rufus Lawrence", "Aleš Wodecki", "Johannes Aspman", "Llorenç Balada Gaggioli", "Jakub Mareček"],
      venue: "Physical Review Research 8, 013150",
      date: "2026-02-10",
      status: "published",
      firstAuthor: false,
      topics: ["qc"],
      map: [672, 58],
      links: { journal: "https://journals.aps.org/prresearch/abstract/10.1103/y8nw-n1wb", code: "https://github.com/llorebaga/RandomSE" },
      cite: { journal: "Physical Review Research", volume: "8", number: "013150", doi: "10.1103/y8nw-n1wb" },
      abstract: "We introduce the random Schrödinger equation, with a noise term given by a random Hermitian matrix as a means to model noisy quantum systems. We derive bounds on the error of the synthesised unitary in terms of bounds on the norm of the noise, and show that for certain noise processes these bounds are tight. We then show that in certain situations, minimising the error is equivalent to finding a geodesic on SU(n) with respect to a Riemannian metric encoding the coupling between the control pulse and the noise process. Our work thus extends the series of seminal papers by Nielsen et al. on the geometry of quantum gate complexity."
    },
    {
      id: "TEMPO",
      title: "Time evolution of controlled many-body quantum systems with matrix product operators",
      authors: ["Llorenç Balada Gaggioli", "Jakub Mareček"],
      venue: "Physical Review A 112, 062612",
      date: "2025-12-09",
      status: "published",
      firstAuthor: true,
      topics: ["qc", "lr"],
      map: [745, 350],
      links: { journal: "https://journals.aps.org/pra/abstract/10.1103/9mfk-gg3x", code: "https://github.com/llorebaga/QCMPO" },
      cite: { journal: "Physical Review A", volume: "112", number: "062612", doi: "10.1103/9mfk-gg3x" },
      abstract: "We present a method for describing the time evolution of many-body controlled quantum systems using matrix product operators (MPOs). Existing techniques for solving the time-dependent Schrödinger equation (TDSE) with an MPO Hamiltonian often rely on time discretization. In contrast, our approach uses the Magnus expansion and Chebyshev polynomials to model the time evolution, and the MPO representation to efficiently encode the system's dynamics. This results in a scalable method that can be used efficiently for many-body controlled quantum systems. We apply this technique to quantum optimal control, specifically for a gate synthesis problem, demonstrating that it can be used for large-scale optimization problems that are otherwise impractical to formulate in a dense matrix representation."
    },
    {
      id: "LRPOP",
      title: "Global optimization of low-rank polynomials",
      authors: ["Llorenç Balada Gaggioli", "Didier Henrion", "Milan Korda"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2025-12-09",
      status: "preprint",
      firstAuthor: true,
      topics: ["po", "lr"],
      map: [520, 610],
      links: { arxiv: "https://arxiv.org/abs/2512.08394", code: "https://github.com/llorebaga/LRPOP" },
      abstract: "This work considers polynomial optimization problems where the objective admits a low-rank canonical polyadic tensor decomposition. We introduce LRPOP (low-rank polynomial optimization), a new hierarchy of semidefinite programming relaxations for which the size of the semidefinite blocks is determined by the canonical polyadic rank rather than the number of variables. As a result, LRPOP can solve low-rank polynomial optimization problems that are far beyond the reach of existing sparse hierarchies. In particular, we solve problems with up to thousands of variables with total degree in the thousands. Numerical conditioning for problems of this size is improved by using the Bernstein basis. The LRPOP hierarchy converges from below to the global minimum of the polynomial under standard assumptions."
    },
    {
      id: "QCPOP",
      title: "Globally optimal control of quantum dynamics",
      authors: ["Denys I. Bondar", "Llorenç Balada Gaggioli", "Georgios Korpas", "Jakub Mareček", "Jiri Vala", "Kurt Jacobs"],
      venue: "Physical Review Research 7, 043202",
      date: "2025-11-21",
      status: "published",
      firstAuthor: false,
      topics: ["qc", "po"],
      map: [340, 288],
      links: { journal: "https://journals.aps.org/prresearch/abstract/10.1103/g4fb-xm13" },
      cite: { journal: "Physical Review Research", volume: "7", number: "043202", doi: "10.1103/g4fb-xm13" },
      abstract: "Optimization of constrained quantum control problems powers quantum technologies. This task becomes very difficult when these control problems are nonconvex and plagued with dense local extrema. For such problems, current optimization methods must be repeated many times to find good solutions, each time requiring many simulations of the system. Here, we present quantum control via polynomial optimization (QCPOP), a method that eliminates this problem by directly finding globally optimal solutions. The resulting increase in speed, which can be a thousandfold or more, makes it possible to solve problems that were previously intractable. This remarkable advance is due to global optimization methods recently developed for polynomial functions. We demonstrate the power of this method by showing that it obtains an optimal solution in a single run for a problem in which local extrema are so dense that gradient methods require thousands of runs to reach a similar fidelity. Since QCPOP is able to find the global optimum for quantum control, we expect that it will not only enhance the utility of quantum control by making it much easier to find the necessary protocols, but also provide a key tool for understanding the precise limits of quantum technologies. Finally, we note that the ability to cast quantum control as polynomial optimization resolves an open question regarding the computability of exact solutions to quantum control problems."
    },
    {
      id: "UGS",
      title: "Unitary gate synthesis via polynomial optimization",
      authors: ["Llorenç Balada Gaggioli", "Denys I. Bondar", "Jiri Vala", "Roman Ovsiannikov", "Jakub Mareček"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2025-08-02",
      status: "preprint",
      firstAuthor: true,
      topics: ["qc", "po"],
      map: [395, 350],
      links: { arxiv: "https://arxiv.org/abs/2508.01356", code: "https://github.com/llorebaga/UGS" },
      abstract: "Quantum optimal control plays a crucial role in the development of quantum technologies, particularly in the design and implementation of fast and accurate gates for quantum computing. Here, we present a method to synthesize gates using the Magnus expansion. In particular, we formulate a polynomial optimization problem that allows us to find the global solution without resorting to approximations of the exponential. The global method we use provides a certificate of globality and lets us do single-shot optimization, which implies it is generally faster than local methods. By optimizing over Hermitian matrices generating the unitaries, instead of the unitaries themselves, we can reduce the size of the polynomial to optimize, leading to faster convergence and better scalability, compared to the QCPOP method. Numerical experiments comparing our results with CRAB and GRAPE show that we maintain high accuracy of QCPOP, while improving computational efficiency."
    },
    {
      id: "LIP",
      title: "Maximization of linear independence of basis function products",
      authors: ["Georgii N. Sizov", "Vincent Lazeran", "Llorenç Balada Gaggioli", "Viktor N. Staroverov"],
      venue: "The Journal of Chemical Physics 160, 234106",
      date: "2024-06-18",
      status: "published",
      firstAuthor: false,
      topics: [],
      links: { journal: "https://doi.org/10.1063/5.0210971" },
      cite: { journal: "The Journal of Chemical Physics", volume: "160", number: "234106", doi: "10.1063/5.0210971" },
      abstract: "Basis sets consisting of functions that form linearly independent products (LIPs) have remarkable applications in quantum chemistry but are scarce because of mathematical limitations. We show how to linearly transform a given set of basis functions to maximize the linear independence of their products by maximizing the determinant of the appropriate Gram matrix. The proposed method enhances the utility of the LIP basis set technology and clarifies why canonical molecular orbitals form LIPs more readily than atomic orbitals. The same approach can also be used to orthogonalize basis functions themselves, which means that various orthogonalization techniques may be viewed as special cases of a certain nonlinear optimization problem."
    }
  ],

  // "Research, explained": plain-language text next to each interactive visualization.
  explainers: {
    qc: {
      tab: { en: "Steering qubits", ca: "Guiar qubits" },
      title: { en: "Steering a qubit", ca: "Guiar un qubit" },
      body: {
        en: [
          "A qubit, the building block of a quantum computer, can be pictured as an arrow pointing somewhere on a sphere. North means 0, south means 1, and every direction in between is a quantum superposition of the two.",
          "We move the arrow with carefully shaped pulses of microwaves or laser light. Quantum control is the art of designing those pulses so the qubit ends up exactly where we want, as fast and as reliably as possible, and for machines with many qubits at once."
        ],
        ca: [
          "Un qubit, la peça bàsica d'un ordinador quàntic, es pot imaginar com una fletxa que apunta cap a algun lloc d'una esfera. El nord vol dir 0, el sud vol dir 1, i qualsevol direcció entremig és una superposició quàntica de tots dos.",
          "Movem la fletxa amb polsos de microones o de llum làser dissenyats amb molta cura. El control quàntic és l'art de dissenyar aquests polsos perquè el qubit acabi exactament on volem, tan ràpid i de manera tan fiable com sigui possible, i en màquines amb molts qubits alhora."
        ]
      },
      tryIt: {
        en: "Drag the bars to shape the pulse and steer the arrow from north (0) to the target at the south pole (1). Or press Optimize and let the computer search for you. Drag the sphere to rotate it.",
        ca: "Arrossega les barres per donar forma al pols i porta la fletxa del nord (0) fins a l'objectiu, al pol sud (1). O prem Optimitza i deixa que l'ordinador ho busqui per tu. Arrossega l'esfera per girar-la."
      },
      papers: ["QCPOP", "UGS", "RCQC", "RSE"]
    },
    po: {
      tab: { en: "Finding the true best", ca: "Trobar el millor de veritat" },
      title: { en: "Finding the true best", ca: "Trobar el millor de veritat" },
      body: {
        en: [
          "Designing the best pulse is an optimization problem: among countless options, find the one that works best. Picture every option as a point in a landscape, where lower is better.",
          "Most methods behave like a ball rolling downhill. They quickly find a valley, but not necessarily the deepest one. Polynomial optimization works differently: it raises a mathematical floor from below that can never cross the landscape. Where the floor stops is a proof that nothing lies lower, a certified global optimum."
        ],
        ca: [
          "Dissenyar el millor pols és un problema d'optimització: entre infinitat d'opcions, cal trobar la que funciona millor. Imagina cada opció com un punt d'un paisatge, on més avall vol dir millor.",
          "La majoria de mètodes es comporten com una bola que rodola pendent avall: troben ràpidament una vall, però no necessàriament la més profunda. L'optimització polinòmica funciona d'una altra manera: aixeca des de sota un terra matemàtic que mai no pot travessar el paisatge. On s'atura el terra hi ha la prova que no hi ha res més avall: un òptim global certificat."
        ]
      },
      tryIt: {
        en: "Click anywhere on the landscape to drop a ball, then press Certify to raise the floor. Try a new landscape to see it again.",
        ca: "Fes clic a qualsevol punt del paisatge per deixar caure una bola i després prem Certifica per aixecar el terra. Prova un paisatge nou per tornar-ho a veure."
      },
      papers: ["QCPOP", "UGS", "RCQC", "LRPOP", "ComPOP"]
    },
    lr: {
      tab: { en: "Hidden simplicity", ca: "Simplicitat amagada" },
      title: { en: "Hidden simplicity", ca: "Simplicitat amagada" },
      body: {
        en: [
          "Exact descriptions of quantum systems grow exponentially: every extra qubit doubles the amount of numbers needed. Around 50 qubits, even the largest supercomputers run out of memory.",
          "Luckily, many real problems hide a simple structure. Just as a photo can be rebuilt from a handful of simple patterns, tensor networks and low-rank decompositions describe enormous objects with a tiny fraction of the numbers. My work exploits this structure so that control and optimization methods scale to large systems."
        ],
        ca: [
          "Les descripcions exactes dels sistemes quàntics creixen exponencialment: cada qubit de més duplica la quantitat de nombres necessaris. Cap als 50 qubits, fins i tot els superordinadors més grans es queden sense memòria.",
          "Per sort, molts problemes reals amaguen una estructura senzilla. De la mateixa manera que una foto es pot reconstruir amb un grapat de patrons simples, les xarxes de tensors i les descomposicions de rang baix descriuen objectes enormes amb una fracció minúscula dels nombres. La meva feina aprofita aquesta estructura perquè els mètodes de control i d'optimització escalin a sistemes grans."
        ]
      },
      tryIt: {
        en: "Rebuild the photo from more or fewer patterns, then add qubits and watch the exact description hit an exponential wall.",
        ca: "Reconstrueix la foto amb més o menys patrons i després afegeix qubits per veure com la descripció exacta topa amb un mur exponencial."
      },
      papers: ["TEMPO", "LR2Q", "LRPOP", "ComPOP"]
    }
  },

  /*
   * Activities. kind: conference | workshop | school | visit | course
   * role: "talk" | "poster" | "" (attended). Entries dated after today show as "Upcoming".
   * Event titles stay in their original language; places can be translated.
   */
  activities: [
    { date: "2026-11", kind: "workshop", title: "TENORS Doctoral Days", place: { en: "Firenze", ca: "Florència" }, role: "" },
    { date: "2026-10", kind: "visit", title: "HSBC", place: { en: "London", ca: "Londres" }, role: "" },
    { date: "2026-09", kind: "visit", title: "Grup d'Informació Quàntica, UAB", place: "Barcelona", role: "" },
    { date: "2026-09", kind: "visit", title: "HSBC", place: { en: "Singapore", ca: "Singapur" }, role: "" },
    { date: "2026-07", kind: "workshop", title: "TENORS Workshop 2", place: "Trento", role: "" },
    { date: "2026-06", kind: "conference", title: "SIAM Conference on Optimization", place: { en: "Edinburgh", ca: "Edimburg" }, role: "talk" },
    { date: "2026-06", kind: "workshop", title: "DO Workshop", place: { en: "Carcassonne", ca: "Carcassona" }, role: "talk" },
    { date: "2026-06", kind: "workshop", title: "IBM Quantum Optimization Workshop", place: { en: "Prague", ca: "Praga" }, role: "" },
    { date: "2026-05", kind: "workshop", title: "The Role of Geometry in Quantum Physics: Foundations and Emerging Technologies", place: "Oaxaca", role: "poster" },
    { date: "2026-04", kind: "school", title: "Advanced School on Geometry of Quantum Physics", place: { en: "Ciudad de México", ca: "Ciutat de Mèxic" }, role: "" },
    { date: "2026-02", kind: "school", title: "TENORS Learning Week 2", place: "Tromsø", role: "" },
    { date: "2025-12", kind: "conference", title: "Quantum Algorithms and Optimization", place: { en: "Athens", ca: "Atenes" }, role: "poster" },
    { date: "2025-11", kind: "workshop", title: "Optimization Workshop", place: "Spálené Poříčí", role: "talk" },
    { date: "2025-11", kind: "school", title: "TENSOR25", place: { en: "Pauline Church, Göttingen", ca: "Església Paulina, Göttingen" }, role: "poster" },
    { date: "2025-10", kind: "course", title: "Advanced Optimization Methods", place: { en: "Prague · Winter semester 2025", ca: "Praga · Semestre d'hivern 2025" }, role: "" },
    { date: "2025-09", kind: "workshop", title: "TENORS Workshop 1", place: { en: "University of Konstanz", ca: "Universitat de Constança" }, role: "poster" },
    { date: "2025-09", kind: "school", title: "VCQ & quantA Summer School", place: "TU Wien", role: "poster" },
    { date: "2025-07", kind: "conference", title: "Advances in Quantum Control: Techniques, Applications, and Challenges", place: { en: "Max Planck Institute for the Physics of Complex Systems, Dresden", ca: "Institut Max Planck de Física de Sistemes Complexos, Dresden" }, role: "poster" },
    { date: "2025-06", kind: "conference", title: "CEQIP", place: { en: "Smolenice Castle", ca: "Castell de Smolenice" }, role: "" },
    { date: "2025-05", kind: "school", title: "Mathematics and Physics of Quantum Computing and Quantum Learning", place: "Porquerolles", role: "poster" },
    { date: "2025-04", kind: "conference", title: "Scalability Conference", place: { en: "University of Oxford", ca: "Universitat d'Oxford" }, role: "poster" },
    { date: "2025-03", kind: "conference", title: "Operator Theory and Polynomial Optimization in Quantum Information Theory", place: "Physikzentrum Bad Honnef", role: "poster" },
    { date: "2025-02", kind: "school", title: "TENORS Learning Week 1", place: "Inria, Université Côte d'Azur", role: "" },
    { date: "2024-11", kind: "workshop", title: "Quantum Optimization Workshop", place: "Brdy", role: "talk" },
    { date: "2024-11", kind: "course", title: "LMI Optimization with Applications in Control", place: { en: "Prague", ca: "Praga" }, role: "" }
  ],

  // CV timeline. end: null means "present".
  cv: [
    { start: "2025-10", end: null, kind: "research",
      title: { en: "Research stay in polynomial optimization", ca: "Estada de recerca en optimització polinòmica" },
      org: { en: "LAAS-CNRS, Toulouse", ca: "LAAS-CNRS, Tolosa" }, orgUrl: "https://www.laas.fr/en/",
      group: { en: "POP group", ca: "Grup POP" }, groupUrl: "https://www.laas.fr/en/teams/pop/" },
    { start: "2024-10", end: null, kind: "research",
      title: { en: "PhD in quantum control · MSCA Fellow (TENORS)", ca: "Doctorat en control quàntic · Investigador MSCA (TENORS)" },
      org: { en: "Czech Technical University in Prague", ca: "Universitat Tècnica Txeca de Praga" }, orgUrl: "https://fit.cvut.cz/en",
      group: { en: "Optimization group, AIC", ca: "Grup d'Optimització, AIC" }, groupUrl: "https://www.aic.fel.cvut.cz/research-areas/optimization" },
    { start: "2024-06", end: "2024-09", kind: "research",
      title: { en: "Research internship in quantum foundations", ca: "Pràctiques de recerca en fonaments de la física quàntica" },
      org: "ICFO, Barcelona", orgUrl: "https://www.icfo.eu/",
      group: { en: "Quantum Information Theory group", ca: "Grup de Teoria de la Informació Quàntica" }, groupUrl: "https://www.icfo.eu/research-group/7/quantum-information/home/437/" },
    { start: "2023-09", end: "2024-06", kind: "education",
      title: { en: "Final-year Master's studies in Mathematics and Physics", ca: "Darrer curs del màster en Matemàtiques i Física" },
      org: { en: "University of Manchester", ca: "Universitat de Manchester" }, orgUrl: "https://www.physics.manchester.ac.uk/" },
    { start: "2023-05", end: "2023-08", kind: "research",
      title: { en: "Mitacs research internship in quantum chemistry", ca: "Pràctiques de recerca Mitacs en química quàntica" },
      org: { en: "Western University, London (Ontario)", ca: "Western University, London (Ontàrio)" }, orgUrl: "https://www.uwo.ca/",
      group: { en: "Staroverov group", ca: "Grup Staroverov" }, groupUrl: "https://publish.uwo.ca/~vstarove/" },
    { start: "2022-08", end: "2023-05", kind: "education",
      title: { en: "Study abroad year", ca: "Any d'estudis a l'estranger" },
      org: { en: "National University of Singapore", ca: "Universitat Nacional de Singapur" }, orgUrl: "https://nus.edu.sg/" },
    { start: "2022-06", end: "2022-07", kind: "research",
      title: { en: "Research internship in quantum thermodynamics", ca: "Pràctiques de recerca en termodinàmica quàntica" },
      org: { en: "University of Manchester", ca: "Universitat de Manchester" }, orgUrl: "https://www.physics.manchester.ac.uk/",
      group: { en: "Quantum Systems group", ca: "Grup de Sistemes Quàntics" }, groupUrl: "https://theory.physics.manchester.ac.uk/groups/index.php/home/groups/manqs/" },
    { start: "2020-09", end: "2022-06", kind: "education",
      title: { en: "Master's in Mathematics and Physics", ca: "Màster en Matemàtiques i Física" },
      org: { en: "University of Manchester", ca: "Universitat de Manchester" }, orgUrl: "https://www.physics.manchester.ac.uk/" }
  ]
};
