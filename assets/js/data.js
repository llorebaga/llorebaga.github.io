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
      cv: "assets/docs/CV_Llorenc_Balada_Gaggioli.pdf"
    },
    cvUpdated: "2026-10", // shown next to the CV button
    address: {
      en: ["Office KN:E-302", "Karlovo náměstí 13", "Praha 2, Czech Republic"],
      ca: ["Despatx KN:E-302", "Karlovo náměstí 13", "Praga 2, República Txeca"]
    }
  },

  about: {
    en: [
      "In October 2024 I started my PhD as part of the <a href=\"https://tenors-network.eu/\">TENORS</a> project (Marie Skłodowska-Curie Doctoral Network), working on quantum optimal control under the supervision of Jakub Mareček, Didier Henrion and Milan Korda. I am part of the Optimization group at the <a href=\"https://www.aic.fel.cvut.cz/\">AIC</a> (Artificial Intelligence Centre) in Prague, and during 2025 I have also been part of the <a href=\"https://www.laas.fr/en/teams/pop/\">Polynomial Optimization group</a> at LAAS, Toulouse."
    ],
    ca: [
      "L'octubre de 2024 vaig començar el doctorat dins del projecte <a href=\"https://tenors-network.eu/\">TENORS</a> (xarxa doctoral Marie Skłodowska-Curie), on treballo en control òptim quàntic sota la supervisió de Jakub Mareček, Didier Henrion i Milan Korda. Formo part del grup d'Optimització de l'<a href=\"https://www.aic.fel.cvut.cz/\">AIC</a> (Centre d'Intel·ligència Artificial) de Praga i, durant el 2025, també he format part del <a href=\"https://www.laas.fr/en/teams/pop/\">grup d'Optimització Polinòmica</a> del LAAS, a Tolosa."
    ]
  },

  research: {
    en: "I study <strong>quantum optimal control</strong>, one of the keys to developing quantum technologies. My tools are <strong>tensor networks</strong>, which let us work with very large systems, and <strong>polynomial optimization</strong>, which finds global solutions to optimization problems. My research looks for connections between these seemingly distinct areas to design new techniques for quantum optimal control.",
    ca: "Estudio el <strong>control òptim quàntic</strong>, una de les claus per desenvolupar les tecnologies quàntiques. Les meves eines són les <strong>xarxes de tensors</strong>, que permeten treballar amb sistemes molt grans, i l'<strong>optimització polinòmica</strong>, que troba solucions globals als problemes d'optimització. La meva recerca busca connexions entre aquestes àrees aparentment diferents per dissenyar noves tècniques de control òptim quàntic."
  },

  news: [
    { date: "2026-11", kind: "published", paper: "LR2Q", text: {
      en: "Published in APS Open Science: <em>Low-rank geometry of two-qubit gates</em>.",
      ca: "Publicat a APS Open Science: <em>Low-rank geometry of two-qubit gates</em>." } },
    { date: "2026-10", kind: "preprint", paper: "MSD", text: {
      en: "New preprint with Jakub Mareček: <em>The limits of magic-state distillation</em>.",
      ca: "Nou preprint amb Jakub Mareček: <em>The limits of magic-state distillation</em>." } },
    { date: "2026-10", kind: "preprint", paper: "RCS", text: {
      en: "New preprint: <em>Time-optimal robust quantum control for partially known errors</em>.",
      ca: "Nou preprint: <em>Time-optimal robust quantum control for partially known errors</em>." } },
    { date: "2026-06", kind: "preprint", paper: "RCQC", text: {
      en: "New preprint with Younes Naceur: <em>Reachability and optimal-time certificates for quantum control</em>.",
      ca: "Nou preprint amb Younes Naceur: <em>Reachability and optimal-time certificates for quantum control</em>." } },
    { date: "2026-04", kind: "preprint", paper: "ComPOP", text: {
      en: "New preprint with Didier Henrion and Milan Korda: <em>Composition and tensor train structure in polynomial optimization</em>.",
      ca: "Nou preprint amb Didier Henrion i Milan Korda: <em>Composition and tensor train structure in polynomial optimization</em>." } },
    { date: "2026-04", kind: "preprint", paper: "LR2Q", text: {
      en: "New preprint: <em>Low-rank geometry of two-qubit gates</em>.",
      ca: "Nou preprint: <em>Low-rank geometry of two-qubit gates</em>." } }
  ],

  // Research areas in the research map. mapLabel: the lines inside the map bubble.
  // The first three form the original triangle; others set their own position `at` and radius `r`.
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
    },
    // A fourth, smaller topic in the top-left corner (outside the original triangle).
    qcomp: {
      name: { en: "Quantum Computing", ca: "Computació quàntica" },
      mapLabel: { en: ["Quantum", "Computing"], ca: ["Computació", "quàntica"] },
      at: [228, 150],
      links: ["qc"], // connector to the Quantum Control circle
      r: 80,
      blurb: {
        en: "Fault-tolerant quantum computing: how much it costs to produce the resources, such as magic states, that make universal quantum computation possible.",
        ca: "Computació quàntica tolerant a errors: quant costa produir els recursos, com els estats màgics, que fan possible la computació quàntica universal."
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
      id: "LR2Q",
      title: "Low-rank geometry of two-qubit gates",
      authors: ["Llorenç Balada Gaggioli"],
      venue: "APS Open Science 1, 000206",
      date: "2026-11-05",
      status: "published",
      firstAuthor: true,
      topics: ["qc", "lr"],
      map: [795, 295],
      links: { journal: "https://doi.org/10.1103/nrx9-9p92", code: "https://github.com/llorebaga/LR_2qubit" },
      cite: { journal: "APS Open Science", volume: "1", number: "000206", doi: "10.1103/nrx9-9p92" },
      plain: {
        hook: { en: "How far is an entangling gate from the gates that cannot entangle at all?", ca: "A quina distància és una porta entrellaçadora de les portes que no poden entrellaçar gens?" },
        text: {
          en: [
            "Two-qubit gates are the operations that create entanglement in a quantum computer. Gates that act on each qubit separately, called local gates, can never entangle, so a natural question is how far a given gate is from that harmless set.",
            "I answer it with geometry. Every two-qubit gate has a fingerprint: its position inside a three-dimensional shape called the Weyl chamber. The distance to the local gates turns out to be a distance to a family of low-rank objects (determinantal varieties). This turns the Weyl chamber into a map where distances measure how non-local, and so how complex, a gate is.",
            "Two concrete results come out of it. Among the perfect entanglers, the gates that can turn two unentangled qubits into a maximally entangled pair, the square root of iSWAP is the closest to the local gates. And no perfect entangler can be imitated by a local gate with an average fidelity above 79.8%."
          ],
          ca: [
            "Les portes de dos qubits són les operacions que creen entrellaçament en un ordinador quàntic. Les portes que actuen sobre cada qubit per separat, anomenades portes locals, no poden entrellaçar mai, així que és natural preguntar-se a quina distància es troba una porta d'aquest conjunt inofensiu.",
            "Hi responc amb geometria. Cada porta de dos qubits té una empremta: la seva posició dins d'una figura tridimensional anomenada cambra de Weyl. La distància a les portes locals resulta ser una distància a una família d'objectes de rang baix (varietats determinantals). Així la cambra de Weyl es converteix en un mapa on les distàncies mesuren com de no local, i per tant com de complexa, és una porta.",
            "En surten dos resultats concrets. Entre els entrellaçadors perfectes, les portes que poden convertir dos qubits no entrellaçats en una parella entrellaçada al màxim, l'arrel quadrada de la porta iSWAP és la més propera a les portes locals. I cap entrellaçador perfecte no es pot imitar amb una porta local amb una fidelitat mitjana superior al 79,8%."
          ]
        }
      },
      abstract: "We present a framework based on the determinantal geometry of two-qubit gates. Combining the Weyl chamber representation with operator Schmidt theory, we interpret gate synthesis as a distance problem to determinantal varieties. This gives an operational geometry to the Weyl chamber, quantifying nonlocal complexity. We show that the square root iSWAP gate is the closest perfect entangler to the variety of local operations, and that no perfect entangler can be approximated by a local gate with average gate fidelity above 79.8%. The three different determinantal costs form a synthesis-adapted coordinate system that encodes nonlocal complexity and generally reconstructs the Weyl chamber."
    },
    {
      id: "MSD",
      title: "The limits of magic-state distillation",
      authors: ["Llorenç Balada Gaggioli", "Jakub Mareček"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2026-10-22",
      status: "preprint",
      firstAuthor: true,
      topics: ["qcomp"],
      map: [186, 290],
      links: { arxiv: "https://arxiv.org/abs/2610.31115" },
      plain: {
        hook: { en: "What is the fewest noisy ingredients a magic-state factory can get away with?", ca: "Quin és el mínim d'ingredients sorollosos amb què pot funcionar una fàbrica d'estats màgics?" },
        text: {
          en: [
            "Fault-tolerant quantum computers need special resource states, called magic states, to run every possible algorithm. They are made in factories that take many noisy copies and distil a few cleaner ones, and these factories are one of the biggest costs of the whole machine.",
            "We show that, when the goal is to tolerate faulty inputs, any factory built from stabilizer operations, however adaptive, postselected or multistage, does no better than a projection onto a single error-correcting code. That turns an endless space of designs into a finite list of codes that can be searched.",
            "Searching all of them gives exact answers. Making the error of one T state shrink quadratically needs exactly nine noisy inputs, the well-known eight-input CCZ factory is already optimal, and suppressing errors to order d needs at least 2d inputs for one T state."
          ],
          ca: [
            "Els ordinadors quàntics tolerants a errors necessiten uns estats de recurs especials, els estats màgics, per poder executar qualsevol algorisme. Es produeixen en fàbriques que prenen moltes còpies sorolloses i en destil·len unes poques de més netes, i aquestes fàbriques són un dels costos més grans de tota la màquina.",
            "Demostrem que, quan l'objectiu és tolerar entrades defectuoses, qualsevol fàbrica construïda amb operacions estabilitzadores, per adaptativa, postseleccionada o de moltes etapes que sigui, no ho fa millor que una projecció sobre un sol codi corrector d'errors. Això converteix un espai de dissenys infinit en una llista finita de codis que es pot explorar.",
            "Explorant-los tots obtenim respostes exactes. Perquè l'error d'un estat T es redueixi de manera quadràtica calen exactament nou entrades sorolloses, la coneguda fàbrica CCZ de vuit entrades ja és òptima, i reduir els errors fins a l'ordre d requereix com a mínim 2d entrades per a un estat T."
          ]
        }
      },
      abstract: "Magic-state factories are a major cost of fault-tolerant quantum computing, yet how few noisy inputs they need is known only for restricted protocols. We show that, for tolerating input faults, any stabilizer protocol, however adaptive, postselected or multistage, is no better than a projection onto one stabilizer code, and that for rational targets a fault pattern is harmful exactly when its complement is. Searches over all codes show that quadratic distillation of one T state needs exactly nine inputs and that the eight-input CCZ factory is optimal. At order d, one T state needs n ≥ 2d."
    },
    {
      id: "RCS",
      title: "Time-optimal robust quantum control for partially known errors",
      authors: ["Llorenç Balada Gaggioli"],
      venue: { en: "arXiv preprint", ca: "Preprint a arXiv" },
      date: "2026-10-15",
      status: "preprint",
      firstAuthor: true,
      topics: ["qc"],
      map: [448, 58],
      links: { arxiv: "https://arxiv.org/abs/2610.21596", code: "https://github.com/llorebaga/RobustSubspace" },
      plain: {
        hook: { en: "If you know what kind of error you face, how fast can you cancel it?", ca: "Si saps de quin tipus és l'error, com de ràpid el pots cancel·lar?" },
        text: {
          en: [
            "Quantum devices suffer small, constant errors whose exact size is unknown, and robust control designs operations that work regardless. Usually one assumes either that the form of the error is known, or that nothing is known at all. Reality often sits in between: you may know that the error only shifts energy levels, or that it acts on each part of the system separately.",
            "I ask how quickly a control can cancel, to first order, every error in such a class. A constant control can do it exactly when all the errors in the class have zero diagonal in some common basis, and then an evenly spaced ladder of energy levels does the job after one period. A speed limit that holds for any time-dependent control with limited drive power shows that this simple solution is the fastest possible in several natural cases, such as unknown level shifts or unknown local errors on two subsystems.",
            "When nothing is known about the error, the control has to change in time, and knowing the error class shortens the minimum time by a factor √(d²+1). So partial knowledge of the error changes both how long an optimal robust control takes and what it looks like."
          ],
          ca: [
            "Els dispositius quàntics pateixen errors petits i constants de mida desconeguda, i el control robust dissenya operacions que funcionin igualment. Normalment se suposa o bé que es coneix la forma de l'error, o bé que no se'n sap res. Sovint la realitat és entremig: pots saber que l'error només desplaça els nivells d'energia, o que actua sobre cada part del sistema per separat.",
            "Em pregunto com de ràpid un control pot cancel·lar, a primer ordre, tots els errors d'una d'aquestes classes. Un control constant ho aconsegueix exactament quan tots els errors de la classe tenen la diagonal nul·la en una base comuna, i aleshores una escala de nivells d'energia igualment espaiats ho fa en un sol període. Un límit de velocitat vàlid per a qualsevol control que variï en el temps amb potència limitada mostra que aquesta solució senzilla és la més ràpida possible en diversos casos naturals, com ara desplaçaments de nivells desconeguts o errors locals desconeguts en dos subsistemes.",
            "Quan no se sap res de l'error, el control ha de variar en el temps, i conèixer la classe de l'error escurça el temps mínim en un factor √(d²+1). Per tant, saber una part de l'error canvia tant la durada del control robust òptim com la seva forma."
          ]
        }
      },
      abstract: "Robust quantum control usually assumes one of two extremes: the error is of a known form and only its strength is unknown, or nothing at all is known about it. In practice one often sits in between. The size of a static error is unknown, but its class is known, for example, it only shifts energy levels, or it acts on each subsystem separately. We ask how fast a control can cancel, to first order, every error in such a class. A time-independent Hamiltonian can do this if and only if all errors in the class have zero diagonal in a common basis. In that case an equally spaced energy ladder in this basis does it after one period. A lower bound that holds for any time-dependent control with bounded drive power shows that this simple constant control is optimal for several natural classes, including unknown level shifts and unknown local errors on two subsystems. Completely unknown errors need a time-dependent control, and there, knowing the error class shortens the minimum time by a factor √(d²+1). So partial knowledge of the error changes not only how long an optimal robust control takes, but also its form."
    },
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
      plain: {
        hook: { en: "Proofs of what a quantum controller can and cannot do in a given time.", ca: "Proves del que un control quàntic pot i no pot fer en un temps donat." },
        text: {
          en: [
            "Every quantum operation has to finish in a finite time with limited control power. Can the target be reached in that time at all, and what is the shortest time that could ever work? Usually nobody knows: optimizers find good pulses but cannot tell whether better ones exist.",
            "We build certificates from moment relaxations, a tool from polynomial optimization, adapted here to differential equations. For a given time and given control limits, they give guaranteed upper bounds on the best fidelity that can be reached and lower bounds on the time needed to reach it, so any pulse can be compared with the true limit.",
            "We use it to prepare entangled states of two and three qubits, to make one-qubit gates with different control setups, and to move an excitation along a chain of n qubits. The result is a kind of quantum speed limit that takes the actual hardware into account."
          ],
          ca: [
            "Tota operació quàntica s'ha d'acabar en un temps finit i amb una potència de control limitada. Es pot arribar a l'objectiu en aquest temps? Quin és el temps més curt que podria funcionar? Normalment ningú no ho sap: els optimitzadors troben bons polsos, però no poden dir si n'hi ha de millors.",
            "Construïm certificats a partir de relaxacions de moments, una eina de l'optimització polinòmica, adaptada aquí a equacions diferencials. Per a un temps i uns límits de control donats, donen cotes superiors garantides per a la millor fidelitat que es pot assolir i cotes inferiors per al temps necessari per assolir-la, de manera que qualsevol pols es pot comparar amb el límit real.",
            "Ho fem servir per preparar estats entrellaçats de dos i tres qubits, per fer portes d'un qubit amb diferents configuracions de control i per moure una excitació al llarg d'una cadena de n qubits. El resultat és una mena de límit de velocitat quàntic que té en compte el maquinari real."
          ]
        }
      },
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
      plain: {
        hook: { en: "Optimizing functions that are computed step by step, like a chain.", ca: "Optimitzar funcions que es calculen pas a pas, com una cadena." },
        text: {
          en: [
            "Many functions are computed as a chain of simple steps: a dynamical system moving forward in time, a Markov chain, or a neural network layer after layer. Each step passes on a small set of intermediate values, or states, much smaller than the whole problem.",
            "We design two moment–SOS hierarchies that exploit this chain structure: one through the sparsity pattern of the problem, the other by encoding the structure directly at the level of measures. Both give certified bounds, not just good guesses.",
            "In practice they handle problems with hundreds or even a thousand variables, and we apply them to Markov chain optimization, quantum optimal control and neural networks."
          ],
          ca: [
            "Moltes funcions es calculen com una cadena de passos senzills: un sistema dinàmic que avança en el temps, una cadena de Markov o una xarxa neuronal capa rere capa. Cada pas transmet un petit conjunt de valors intermedis, o estats, molt més petit que el problema sencer.",
            "Dissenyem dues jerarquies de moments–SOS que aprofiten aquesta estructura de cadena: una a través del patró d'esparsitat del problema i l'altra codificant l'estructura directament a nivell de les mesures. Totes dues donen cotes certificades, no només bones aproximacions.",
            "A la pràctica resolen problemes amb centenars o fins i tot mil variables, i les apliquem a l'optimització de cadenes de Markov, al control òptim quàntic i a xarxes neuronals."
          ]
        }
      },
      abstract: "We study polynomial optimization problems whose objective has a composition or tensor train structure. These polynomials can be evaluated as a sequence of maps, giving rise to intermediate variables (“states”) of dimension lower than the ambient dimension. Structures like these arise naturally in dynamical systems, Markov chains, and neural networks. We develop two moment-SOS (sums of squares) hierarchies that exploit this composition structure in different ways. The first one, termed state-lifting chordal, is based on the correlative sparsity graph of the problem. The second one, termed state-lifting push-forward, encodes the structure at the level of the measures directly. Numerical experiments demonstrate that the proposed methods can compute certified bounds for problems with hundreds or even a thousand variables. To illustrate the versatility of the hierarchies we apply them to Markov chain optimization, quantum optimal control, and neural networks."
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
      plain: {
        hook: { en: "Modelling noise as randomness inside the equation itself, and steering around it with geometry.", ca: "Modelar el soroll com a atzar dins de la mateixa equació, i esquivar-lo amb geometria." },
        text: {
          en: [
            "Real quantum systems are noisy. We model this by adding a random Hermitian matrix to the Schrödinger equation, which gives the random Schrödinger equation.",
            "From the size of the noise we derive bounds on how far off the final gate can be, and we show that for some kinds of noise these bounds are tight.",
            "In some situations, making the error as small as possible is the same as finding the shortest path, a geodesic, in the space of gates, measured with a geometry that encodes how the control pulse couples to the noise. This extends the geometric view of gate complexity started by Nielsen and co-workers."
          ],
          ca: [
            "Els sistemes quàntics reals són sorollosos. Ho modelem afegint una matriu hermítica aleatòria a l'equació de Schrödinger, cosa que dona l'equació de Schrödinger aleatòria.",
            "A partir de la mida del soroll obtenim cotes de com d'allunyada pot quedar la porta final, i mostrem que per a alguns tipus de soroll aquestes cotes són ajustades.",
            "En algunes situacions, fer l'error tan petit com sigui possible equival a trobar el camí més curt, una geodèsica, en l'espai de les portes, mesurat amb una geometria que codifica com s'acobla el pols de control amb el soroll. Això amplia la visió geomètrica de la complexitat de les portes que van iniciar Nielsen i col·laboradors."
          ]
        }
      },
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
      plain: {
        hook: { en: "Simulating controlled quantum systems that are too big to write down directly.", ca: "Simular sistemes quàntics controlats massa grans per escriure'ls directament." },
        text: {
          en: [
            "To control a quantum system you have to simulate how it evolves under your pulses. With many interacting particles the exact description grows exponentially and soon becomes impossible to store.",
            "We write the system as a matrix product operator, a chain of small tensors, and instead of chopping time into tiny steps we describe the evolution with the Magnus expansion and Chebyshev polynomials.",
            "The method scales to many-body systems, and we use it to optimize a gate-synthesis problem that would be impractical with ordinary dense matrices."
          ],
          ca: [
            "Per controlar un sistema quàntic cal simular com evoluciona sota els polsos. Amb moltes partícules que interaccionen, la descripció exacta creix exponencialment i aviat és impossible d'emmagatzemar.",
            "Escrivim el sistema com un operador de producte de matrius (MPO), una cadena de tensors petits, i en lloc de trossejar el temps en passos minúsculs descrivim l'evolució amb l'expansió de Magnus i polinomis de Txebixov.",
            "El mètode escala a sistemes de molts cossos, i el fem servir per optimitzar un problema de síntesi de portes que seria poc pràctic amb matrius denses ordinàries."
          ]
        }
      },
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
      plain: {
        hook: { en: "When a polynomial hides a simple structure, its global minimum can be found at huge scale.", ca: "Quan un polinomi amaga una estructura senzilla, se'n pot trobar el mínim global a gran escala." },
        text: {
          en: [
            "Polynomial optimization can certify the true global minimum of a polynomial, but the standard methods grow quickly with the number of variables.",
            "Many polynomials are simple underneath: they are sums of a few products of one-variable pieces, which is what a low canonical polyadic rank means. LRPOP is a hierarchy of semidefinite relaxations whose size is set by this rank instead of the number of variables.",
            "It solves problems with thousands of variables and total degree in the thousands, far beyond existing sparse methods. Working in the Bernstein basis keeps the numerics stable, and the bounds converge from below to the global minimum."
          ],
          ca: [
            "L'optimització polinòmica pot certificar el veritable mínim global d'un polinomi, però els mètodes habituals creixen ràpidament amb el nombre de variables.",
            "Molts polinomis són senzills en el fons: són sumes de pocs productes de peces d'una sola variable, que és el que vol dir tenir un rang canònic poliàdic baix. LRPOP és una jerarquia de relaxacions semidefinides la mida de la qual la fixa aquest rang i no pas el nombre de variables.",
            "Resol problemes amb milers de variables i grau total de milers, molt més enllà dels mètodes esparsos existents. Treballar en la base de Bernstein manté estables els càlculs, i les cotes convergeixen per sota cap al mínim global."
          ]
        }
      },
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
      plain: {
        hook: { en: "Finding the best control pulse in one run, instead of thousands of tries.", ca: "Trobar el millor pols de control en una sola execució, en lloc de milers d'intents." },
        text: {
          en: [
            "Designing quantum control pulses often means searching a landscape full of local optima. Standard optimizers have to be restarted many times, each run needs many simulations, and even then they cannot be sure they found the best.",
            "QCPOP recasts the control problem as a polynomial optimization problem and uses global methods that find the globally optimal solution directly.",
            "On a problem where gradient methods need thousands of runs to reach a similar fidelity, QCPOP finds the optimum in a single run, with speed-ups that can be a thousandfold or more. Casting quantum control as polynomial optimization also settles an open question about whether exact solutions to quantum control problems can be computed."
          ],
          ca: [
            "Dissenyar polsos de control quàntic sovint vol dir explorar un paisatge ple d'òptims locals. Els optimitzadors habituals s'han de reiniciar moltes vegades, cada execució requereix moltes simulacions, i ni així poden estar segurs d'haver trobat el millor.",
            "QCPOP reformula el problema de control com un problema d'optimització polinòmica i fa servir mètodes globals que en troben directament la solució òptima global.",
            "En un problema on els mètodes de gradient necessiten milers d'execucions per arribar a una fidelitat semblant, QCPOP troba l'òptim en una sola execució, amb acceleracions que poden ser de mil vegades o més. Formular el control quàntic com a optimització polinòmica també resol una qüestió oberta sobre si les solucions exactes dels problemes de control quàntic es poden calcular."
          ]
        }
      },
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
      plain: {
        hook: { en: "Designing quantum gates with a guarantee that the solution is the best one.", ca: "Dissenyar portes quàntiques amb la garantia que la solució és la millor." },
        text: {
          en: [
            "Quantum computers need fast and accurate gates, and designing them is a quantum optimal control problem.",
            "We describe the evolution with the Magnus expansion and set up a polynomial optimization problem whose global solution can be found without approximating the exponential. Optimizing over the Hermitian matrices that generate the gates, instead of over the gates themselves, keeps the polynomial small.",
            "The method comes with a certificate that the solution is globally optimal, works in a single shot and is generally faster than local methods. Compared with the widely used CRAB and GRAPE methods, it keeps the accuracy of QCPOP while being more efficient."
          ],
          ca: [
            "Els ordinadors quàntics necessiten portes ràpides i precises, i dissenyar-les és un problema de control òptim quàntic.",
            "Descrivim l'evolució amb l'expansió de Magnus i plantegem un problema d'optimització polinòmica la solució global del qual es pot trobar sense aproximar l'exponencial. Optimitzar sobre les matrius hermítiques que generen les portes, en lloc de sobre les portes mateixes, manté petit el polinomi.",
            "El mètode dona un certificat que la solució és òptima globalment, funciona en una sola execució i en general és més ràpid que els mètodes locals. Comparat amb CRAB i GRAPE, dos mètodes molt utilitzats, manté la precisió de QCPOP i és més eficient."
          ]
        }
      },
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
      plain: {
        hook: { en: "Choosing building blocks for quantum chemistry whose products stay independent.", ca: "Triar peces per a la química quàntica els productes de les quals es mantinguin independents." },
        text: {
          en: [
            "Quantum chemistry calculations describe electrons with sets of basis functions. Sets whose products of pairs of functions are linearly independent, called LIP basis sets, have remarkable applications, but they are rare.",
            "We show how to transform a given set of functions so that their products are as independent as possible, by maximizing the determinant of the right Gram matrix.",
            "This makes LIP basis sets more useful, explains why canonical molecular orbitals form LIPs more readily than atomic orbitals, and shows that several orthogonalization techniques are special cases of one nonlinear optimization problem."
          ],
          ca: [
            "Els càlculs de química quàntica descriuen els electrons amb conjunts de funcions de base. Els conjunts on els productes de parelles de funcions són linealment independents, anomenats bases LIP, tenen aplicacions notables, però són escassos.",
            "Mostrem com transformar un conjunt de funcions perquè els seus productes siguin tan independents com sigui possible, maximitzant el determinant de la matriu de Gram adequada.",
            "Això fa més útils les bases LIP, aclareix per què els orbitals moleculars canònics formen LIP més fàcilment que els orbitals atòmics, i mostra que diverses tècniques d'ortogonalització són casos particulars d'un mateix problema d'optimització no lineal."
          ]
        }
      },
      abstract: "Basis sets consisting of functions that form linearly independent products (LIPs) have remarkable applications in quantum chemistry but are scarce because of mathematical limitations. We show how to linearly transform a given set of basis functions to maximize the linear independence of their products by maximizing the determinant of the appropriate Gram matrix. The proposed method enhances the utility of the LIP basis set technology and clarifies why canonical molecular orbitals form LIPs more readily than atomic orbitals. The same approach can also be used to orthogonalize basis functions themselves, which means that various orthogonalization techniques may be viewed as special cases of a certain nonlinear optimization problem."
    }
  ],

  // Projects featured after "Research, explained". stat: optional live number read from the project's page.
  projects: [
    {
      id: "qoc",
      name: "QOC",
      url: "https://llorebaga.github.io/QOC/",
      logo: "assets/img/qoc-logo.svg",
      title: { en: "Quantum optimal control, mapped", ca: "el control òptim quàntic, cartografiat" },
      kicker: { en: "Project", ca: "Projecte" },
      blurb: {
        en: "QOC is my living guide to the whole field of quantum optimal control: its methods, its limits, its people and its open questions, with new arXiv papers tracked every day.",
        ca: "QOC és la meva guia viva de tot el camp del control òptim quàntic: els seus mètodes, els seus límits, la seva gent i les seves preguntes obertes, amb el seguiment diari dels nous articles d'arXiv."
      },
      cta: { en: "Visit QOC", ca: "Visita QOC" },
      stat: {
        pattern: "([\\d,.]+)\\s*quantum control papers on arXiv",
        label: { en: "quantum control papers tracked since 2000", ca: "articles de control quàntic seguits des del 2000" }
      },
      links: [
        { href: "https://llorebaga.github.io/QOC/map/", label: { en: "Field map", ca: "Mapa del camp" } },
        { href: "https://llorebaga.github.io/QOC/papers/", label: { en: "Latest papers", ca: "Articles recents" } },
        { href: "https://llorebaga.github.io/QOC/groups/", label: { en: "Research groups", ca: "Grups de recerca" } },
        { href: "https://llorebaga.github.io/QOC/open-problems/", label: { en: "Open problems", ca: "Problemes oberts" } }
      ]
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
      papers: ["QCPOP", "UGS", "RCQC", "RSE", "RCS"]
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
    { date: "2026-11-25", kind: "workshop", title: "TENORS Doctoral Days", place: { en: "Firenze", ca: "Florència" }, role: "" },
    { date: "2026-11-12", kind: "workshop", title: "Optimization Workshop", place: { en: "Prague", ca: "Praga" }, role: "" },
    { date: "2026-11-04", kind: "visit", title: "IDEADED", place: "Viladecans", role: "talk" },
    { date: "2026-10", kind: "visit", title: "HSBC", place: { en: "London", ca: "Londres" }, role: "talk" },
    { date: "2026-10", kind: "visit", title: "Quantic, BSC", place: "Barcelona", role: "talk" },
    { date: "2026-09", kind: "visit", title: "Grup d'Informació Quàntica, UAB", place: "Barcelona", role: "talk" },
    { date: "2026-09", kind: "visit", title: "HSBC", place: { en: "Singapore", ca: "Singapur" }, role: "" },
    { date: "2026-07", kind: "workshop", title: "TENORS Workshop 2", place: "Trento", role: "talk" },
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
    { start: "2026-08", end: "2026-09", kind: "research",
      title: { en: "PhD industrial secondment", ca: "Estada doctoral a la indústria" },
      org: "HSBC", orgUrl: "https://www.hsbc.com/" },
    { start: "2025-10", end: "2026-07", kind: "research",
      title: { en: "PhD secondment", ca: "Estada doctoral" },
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
