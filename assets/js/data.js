/*
 * All website content lives here. Edit this file to update the site —
 * no build step needed. Dates use "YYYY-MM" (or "YYYY-MM-DD") so the site
 * can sort entries and flag upcoming events automatically.
 */
window.SITE = {
  person: {
    name: "Llorenç Balada Gaggioli",
    shortName: "LLBG",
    role: "Marie Skłodowska-Curie PhD Fellow",
    tagline: "Quantum optimal control, polynomial optimization & tensor networks",
    affiliations: [
      { name: "CTU Prague", detail: "Optimization group, AIC", url: "https://www.aic.fel.cvut.cz/research-areas/optimization" },
      { name: "LAAS-CNRS", detail: "POP group, Toulouse", url: "https://www.laas.fr/en/teams/pop/" },
      { name: "TENORS", detail: "MSCA Doctoral Network", url: "https://tenors-network.eu/" }
    ],
    email: "llorenc.balada.gaggioli@fel.cvut.cz",
    photo: "assets/img/profile.jpg",
    links: {
      scholar: "https://scholar.google.com/citations?hl=en&user=3zhaXhgAAAAJ",
      github: "https://github.com/llorebaga",
      linkedin: "https://www.linkedin.com/in/lloren%C3%A7/",
      cv: "https://drive.google.com/file/d/15PzmkshPGyUGtTX9MOb_gjPfW7Bm3Ndv/view"
    },
    address: ["Office KN:E-302", "Karlovo náměstí 13", "Praha 2, Czech Republic"]
  },

  about: [
    "In October 2024 I started my PhD as part of the <a href=\"https://tenors-network.eu/\">TENORS</a> project (Marie Skłodowska-Curie Doctoral Network), working on quantum optimal control under the supervision of Jakub Mareček, Didier Henrion and Milan Korda. I am part of the Optimization group at the <a href=\"https://www.aic.fel.cvut.cz/\">AIC</a> (Artificial Intelligence Centre) in Prague, and since October 2025 also of the <a href=\"https://www.laas.fr/en/teams/pop/\">Polynomial Optimization group</a> at LAAS, Toulouse."
  ],

  research: "I study <strong>quantum optimal control</strong>, one of the keys to developing quantum technologies. My tools are <strong>tensor networks</strong>, which let us work with very large systems, and <strong>polynomial optimization</strong>, which finds global solutions to optimization problems. My research looks for connections between these seemingly distinct areas to design new techniques for quantum optimal control.",

  news: [
    { date: "2026-06", text: "New preprint with Younes Naceur: <em>Reachability and optimal-time certificates for quantum control</em>.", paper: "RCQC" },
    { date: "2026-04", text: "New preprint with Didier Henrion and Milan Korda: <em>Composition and tensor train structure in polynomial optimization</em>.", paper: "ComPOP" },
    { date: "2026-04", text: "New single-author preprint: <em>Low-rank geometry of two-qubit gates</em>.", paper: "LR2Q" }
  ],

  // The three research areas in the research map.
  topics: {
    qc: {
      name: "Quantum Control",
      blurb: "Designing control pulses that steer quantum systems, such as gates or state preparation, quickly and accurately."
    },
    po: {
      name: "Polynomial Optimization",
      blurb: "Moment–SOS hierarchies: convex relaxations that give globally optimal solutions and certified bounds."
    },
    lr: {
      name: "Low-rank Structure",
      blurb: "Tensor networks and tensor decompositions (MPOs, tensor trains, CP rank) that make large problems tractable."
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
      venue: "arXiv preprint",
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
      venue: "arXiv preprint",
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
      venue: "arXiv preprint",
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
      abstract: "We present a method for describing the time evolution of many-body controlled quantum systems using matrix product operators (MPOs). Existing techniques for solving the time-dependent Schrödinger equation (TDSE) with an MPO Hamiltonian often rely on time discretization. In contrast, our approach uses the Magnus expansion and Chebyshev polynomials to model the time evolution, and the MPO representation to efficiently encode the system's dynamics. This results in a scalable method that can be used efficiently for many-body controlled quantum systems. We apply this technique to quantum optimal control, specifically for a gate synthesis problem, demonstrating that it can be used for large-scale optimization problems that are otherwise impractical to formulate in a dense matrix representation."
    },
    {
      id: "LRPOP",
      title: "Global optimization of low-rank polynomials",
      authors: ["Llorenç Balada Gaggioli", "Didier Henrion", "Milan Korda"],
      venue: "arXiv preprint",
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
      abstract: "Optimization of constrained quantum control problems powers quantum technologies. This task becomes very difficult when these control problems are nonconvex and plagued with dense local extrema. For such problems, current optimization methods must be repeated many times to find good solutions, each time requiring many simulations of the system. Here, we present quantum control via polynomial optimization (QCPOP), a method that eliminates this problem by directly finding globally optimal solutions. The resulting increase in speed, which can be a thousandfold or more, makes it possible to solve problems that were previously intractable. This remarkable advance is due to global optimization methods recently developed for polynomial functions. We demonstrate the power of this method by showing that it obtains an optimal solution in a single run for a problem in which local extrema are so dense that gradient methods require thousands of runs to reach a similar fidelity. Since QCPOP is able to find the global optimum for quantum control, we expect that it will not only enhance the utility of quantum control by making it much easier to find the necessary protocols, but also provide a key tool for understanding the precise limits of quantum technologies. Finally, we note that the ability to cast quantum control as polynomial optimization resolves an open question regarding the computability of exact solutions to quantum control problems."
    },
    {
      id: "UGS",
      title: "Unitary gate synthesis via polynomial optimization",
      authors: ["Llorenç Balada Gaggioli", "Denys I. Bondar", "Jiri Vala", "Roman Ovsiannikov", "Jakub Mareček"],
      venue: "arXiv preprint",
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
      abstract: "Basis sets consisting of functions that form linearly independent products (LIPs) have remarkable applications in quantum chemistry but are scarce because of mathematical limitations. We show how to linearly transform a given set of basis functions to maximize the linear independence of their products by maximizing the determinant of the appropriate Gram matrix. The proposed method enhances the utility of the LIP basis set technology and clarifies why canonical molecular orbitals form LIPs more readily than atomic orbitals. The same approach can also be used to orthogonalize basis functions themselves, which means that various orthogonalization techniques may be viewed as special cases of a certain nonlinear optimization problem."
    }
  ],

  /*
   * Activities. kind: conference | workshop | school | visit | course
   * role: "talk" | "poster" | "" (attended). Entries dated after today show as "Upcoming".
   */
  activities: [
    { date: "2026-11", kind: "workshop", title: "TENORS Doctoral Days", place: "Firenze", role: "" },
    { date: "2026-10", kind: "visit", title: "HSBC", place: "London", role: "" },
    { date: "2026-09", kind: "visit", title: "Grup d'Informació Quàntica, UAB", place: "Barcelona", role: "" },
    { date: "2026-09", kind: "visit", title: "HSBC", place: "Singapore", role: "" },
    { date: "2026-07", kind: "workshop", title: "TENORS Workshop 2", place: "Trento", role: "" },
    { date: "2026-06", kind: "conference", title: "SIAM Conference on Optimization", place: "Edinburgh", role: "talk" },
    { date: "2026-06", kind: "workshop", title: "DO Workshop", place: "Carcassonne", role: "talk" },
    { date: "2026-06", kind: "workshop", title: "IBM Quantum Optimization Workshop", place: "Prague", role: "" },
    { date: "2026-05", kind: "workshop", title: "The Role of Geometry in Quantum Physics: Foundations and Emerging Technologies", place: "Oaxaca", role: "poster" },
    { date: "2026-04", kind: "school", title: "Advanced School on Geometry of Quantum Physics", place: "Ciudad de México", role: "" },
    { date: "2026-02", kind: "school", title: "TENORS Learning Week 2", place: "Tromsø", role: "" },
    { date: "2025-12", kind: "conference", title: "Quantum Algorithms and Optimization", place: "Athens", role: "poster" },
    { date: "2025-11", kind: "workshop", title: "Optimization Workshop", place: "Spálené Poříčí", role: "talk" },
    { date: "2025-11", kind: "school", title: "TENSOR25", place: "Pauline Church, Göttingen", role: "poster" },
    { date: "2025-10", kind: "course", title: "Advanced Optimization Methods", place: "Prague · Winter semester 2025", role: "" },
    { date: "2025-09", kind: "workshop", title: "TENORS Workshop 1", place: "University of Konstanz", role: "poster" },
    { date: "2025-09", kind: "school", title: "VCQ & quantA Summer School", place: "TU Wien", role: "poster" },
    { date: "2025-07", kind: "conference", title: "Advances in Quantum Control: Techniques, Applications, and Challenges", place: "Max Planck Institute for the Physics of Complex Systems, Dresden", role: "poster" },
    { date: "2025-06", kind: "conference", title: "CEQIP", place: "Smolenice Castle", role: "" },
    { date: "2025-05", kind: "school", title: "Mathematics and Physics of Quantum Computing and Quantum Learning", place: "Porquerolles", role: "poster" },
    { date: "2025-04", kind: "conference", title: "Scalability Conference", place: "University of Oxford", role: "poster" },
    { date: "2025-03", kind: "conference", title: "Operator Theory and Polynomial Optimization in Quantum Information Theory", place: "Physikzentrum Bad Honnef", role: "poster" },
    { date: "2025-02", kind: "school", title: "TENORS Learning Week 1", place: "Inria, Université Côte d'Azur", role: "" },
    { date: "2024-11", kind: "workshop", title: "Quantum Optimization Workshop", place: "Brdy", role: "talk" },
    { date: "2024-11", kind: "course", title: "LMI Optimization with Applications in Control", place: "Prague", role: "" }
  ],

  // CV timeline. end: null means "present".
  cv: [
    { start: "2025-10", end: null, kind: "research", title: "Research stay in polynomial optimization", org: "LAAS-CNRS, Toulouse", orgUrl: "https://www.laas.fr/en/", group: "POP group", groupUrl: "https://www.laas.fr/en/teams/pop/" },
    { start: "2024-10", end: null, kind: "research", title: "PhD in quantum control · MSCA Fellow (TENORS)", org: "Czech Technical University in Prague", orgUrl: "https://fit.cvut.cz/en", group: "Optimization group, AIC", groupUrl: "https://www.aic.fel.cvut.cz/research-areas/optimization" },
    { start: "2024-06", end: "2024-09", kind: "research", title: "Research internship in quantum foundations", org: "ICFO, Barcelona", orgUrl: "https://www.icfo.eu/", group: "Quantum Information Theory group", groupUrl: "https://www.icfo.eu/research-group/7/quantum-information/home/437/" },
    { start: "2023-09", end: "2024-06", kind: "education", title: "Final-year Master's studies in Mathematics and Physics", org: "University of Manchester", orgUrl: "https://www.physics.manchester.ac.uk/" },
    { start: "2023-05", end: "2023-08", kind: "research", title: "Mitacs research internship in quantum chemistry", org: "Western University, London (Ontario)", orgUrl: "https://www.uwo.ca/", group: "Staroverov group", groupUrl: "https://publish.uwo.ca/~vstarove/" },
    { start: "2022-08", end: "2023-05", kind: "education", title: "Study abroad year", org: "National University of Singapore", orgUrl: "https://nus.edu.sg/" },
    { start: "2022-06", end: "2022-07", kind: "research", title: "Research internship in quantum thermodynamics", org: "University of Manchester", orgUrl: "https://www.physics.manchester.ac.uk/", group: "Quantum Systems group", groupUrl: "https://theory.physics.manchester.ac.uk/groups/index.php/home/groups/manqs/" },
    { start: "2020-09", end: "2022-06", kind: "education", title: "Master's in Mathematics and Physics", org: "University of Manchester", orgUrl: "https://www.physics.manchester.ac.uk/" }
  ]
};
