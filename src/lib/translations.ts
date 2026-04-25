export type Lang = "en" | "es";

export const translations = {
  en: {
    nav: {
      budget: "Budget",
      council: "Council",
      feed: "My Feed",
      dashboard: "Dashboard",
      getStarted: "Get started →",
      location: "College Park, MD",
    },
    hero: {
      eyebrow: "College Park, Maryland · FY2027 Proposed",
      proposedBadge: "Proposed · open for public comment until May 31",
      headline1: "Your city budget,",
      headline2: "in plain English.",
      subheadline:
        "$31.5 million. 34,000 residents. One place to see where the money goes and what the council is deciding right now.",
      stat1Label: "per resident / year",
      stat2Label: "per $100 — half the county avg",
      stat3Label: "council items this month",
      stat4Label: "UMD students · the largest constituency that rarely votes locally",
      pills: {
        multilingual: "English · Español · 中文",
        blockchain: "On-chain source verification",
        ai: "AI explanations with citations",
        ballot: "Ballot measure decoder",
      },
      cta1: "Explore the budget ↓",
      cta2: "My personalized feed →",
    },
    bridge:
      "Showing budget ↕ council connection — scroll down to see council items in this category",
    platform: {
      eyebrow: "Coming in the full platform",
      heading: "Civic intelligence for every resident",
      subheading:
        "The dashboard above is just the beginning. Civic Lens is building the full stack of civic transparency tools for College Park.",
      cards: {
        feed: {
          title: "Personalized Feed",
          desc: "Items affecting your district, in your language, with morning-after meeting recaps.",
        },
        bills: {
          title: "Bill Explainer",
          desc: "Steel-manned for/against, cost breakdown, and the council meetings that produced each bill.",
        },
        meetings: {
          title: "Meeting Decoder",
          desc: "AI transcript summaries with per-member vote breakdowns and video timestamped links.",
        },
        dashboard: {
          title: "Accountability Dashboard",
          desc: "Council voting records, attendance trends, and geographic distribution of decisions.",
        },
      },
      openFeed: "Open my feed →",
      available: "Available in English · Español · 中文",
    },
    blockchain: {
      eyebrow: "Source Verification",
      heading: "Every summary is verifiable",
      body: "When we summarize a city document, we hash it, store it on IPFS, and register the hash on the Polygon blockchain. Anyone can verify that our AI summarized the exact document the city published — not an edited version.",
      cta: "Try verifying a source document →",
      verified: "✓ Document integrity verified",
    },
    footer: {
      credit:
        "Data sourced from College Park FY26 Budget Ordinance 25-O-04 (adopted May 20, 2025) and official City Council agendas from",
      disclaimer:
        "This site is an independent civic project and is not affiliated with the City of College Park.",
      tagline: "Built for transparency · College Park, MD · 2026",
    },
    budget: {
      eyebrow: "City Budget · FY2027 Proposed",
      heading: "FY2027 Proposed Budget",
      subheading:
        "College Park's FY2027 proposed budget is $31.5M — roughly $927/resident/year, up 5.6% from FY26. Property tax rate stays at 33.5¢/$100 residential (38.5¢ commercial) — half the PG County average of 63.27¢/$100.",
      sourcePdf: "Source PDF ↗",
      byDepartment: "By Department",
      byRevenue: "By Revenue Source",
      clickHint: "Click a category to filter council items below ↓",
      ofOperatingBudget: "of operating budget",
      capitalHeading: "Capital Projects",
      capitalAmount: "$6.2M in FY27",
      capitalSubheading:
        "One-time investments in infrastructure, separate from the operating budget. Total 5-year CIP through FY31: $19.7M.",
      changesHeading: "What's new in FY27",
      changeLabels: { add: "New", remove: "Removed", neutral: "Unchanged" },
      townGown: {
        heading: "Town & Gown",
        subheading:
          "College Park is two cities sharing one zip code. Here's how the budget serves both.",
        cards: [
          {
            title: "Two budgets, one zip code",
            stat: "$2.98B vs. $31.5M",
            body: "UMD operates on a $2.98B FY26 budget within city limits — roughly 95× the city's $31.5M FY27 proposed budget.",
            sourceLabel: "Source",
            sourceUrl: "https://finance.umd.edu/budget/facts-and-figures/operating-budget",
          },
          {
            title: "Who pays city property tax",
            stat: "~50% renters",
            body: "Roughly half of College Park households are renters. Students in dorms don't pay city property tax directly; off-campus renters pay it indirectly through rent. The tax base depends on residents who often don't realize they're contributing.",
            sourceLabel: null,
            sourceUrl: null,
          },
          {
            title: "Police coverage isn't uniform",
            stat: "3 neighborhoods",
            body: "UMPD has concurrent jurisdiction in parts of the city but not Oak Springs, Daniels Park, or College Park Woods. Those areas rely entirely on the PG County Police contract — up for renewal this month.",
            sourceLabel: "Source",
            sourceUrl: "https://dbknews.com",
          },
        ],
      },
    },
    council: {
      eyebrow: "City Council",
      heading: "This week at City Hall",
      subtitle:
        "Recent and upcoming items from the College Park City Council — in plain English.",
      studentSubtitle:
        "Council items that affect UMD students directly — with the plain-language why for each.",
      filteredTo: "Filtered to",
      clearFilter: "(clear filter)",
      noItems: "No recent council items in this filter.",
      showAll: "Show all items",
      filterAll: "All items",
      filterStudents: "🎓 Students",
      officialAgenda: "Official Agenda ↗",
      studentImpactLabel: "Why this affects students:",
      status: {
        upcoming: "Upcoming",
        decided: "Decided",
        "under-study": "Under Study",
      },
    },
    data: {
      departments: {
        "general-government": {
          label: "General Government & Admin",
          description:
            "Mayor & Council, City Manager, Finance, HR, IT, City Clerk, Communications, Economic Development, and non-departmental expenses (debt service, transfers, contingency).",
        },
        "public-works": {
          label: "Public Works",
          description:
            "Refuse, recycling, street maintenance, snow & ice, leaf collection, fleet, parking garage, building maintenance, tree & landscape. Keeps the physical city running.",
        },
        "public-services": {
          label: "Public Services",
          description:
            "Contract police with PG County, code compliance, parking enforcement, traffic enforcement, animal welfare. Your public safety and code budget.",
        },
        "youth-family-senior": {
          label: "Youth, Family & Senior Services",
          description:
            "Senior programs, clinical services, youth & family programming, transportation for seniors. Adds 1 Emergency Support Specialist and 1 PT bus driver in FY27.",
        },
        "planning-community": {
          label: "Planning & Community Dev",
          description:
            "Zoning, planning support, and community development. Smaller than you might expect — most planning is done by Prince George's County.",
        },
      },
      revenue: {
        "property-tax": "Property Taxes",
        "other-taxes": "Other Taxes",
        "fines-fees": "Fines & Fees",
        other: "Licenses, Charges & Misc",
      },
      capital: {
        "complete-streets": {
          label: "Complete & Green Streets",
          description:
            "FY27 funding for the next phase of pedestrian and bike infrastructure. Cumulative project total: $9.0M through FY31.",
        },
        "pavement-management": {
          label: "Pavement Management Plan",
          description:
            "FY27 paving and street resurfacing across the city. Cumulative project total: $14.5M through FY31.",
        },
        "north-cp-community-center": {
          label: "North College Park Community Center",
          description:
            "New community center facility for North College Park. Most spending is in FY26 ($1.25M) with $250K continuing in FY27.",
        },
      },
      changes: [
        "5 new positions: Emergency Support Specialist, Housing Project Manager, Recreational Coordinator, Engineering/GIS Tech, plus a part-time bus driver",
        "3% cost-of-living adjustment (COLA) for all employees, per new union contract",
        "Stop-sign camera enforcement adds an estimated $655K in fines & fees revenue",
        "Property tax rate unchanged: 33.5¢/$100 residential, 38.5¢/$100 commercial",
        "No appropriated fund balance in FY27 (vs. $106K from FY24 surplus used in FY26)",
      ],
      councilItems: {
        "police-contract-renewal": {
          title: "PG County Police Services Contract Renewal",
          summary:
            "The council is considering renewing the city's contract with Prince George's County Police Department for law enforcement services through FY27.",
          detail:
            "College Park contracts with PGPD rather than maintaining its own police force. This renewal covers patrol coverage for Districts 1 and 4, setting staffing levels and the city's per-officer cost share.",
          meetingType: "City Council Regular Session",
          studentImpact:
            "Affects students living off-campus in Oak Springs, Daniels Park, and College Park Woods — neighborhoods outside UMPD's concurrent jurisdiction that rely solely on this contract.",
        },
        "complete-streets-bid": {
          title: "Complete & Green Streets Phase 2 — Bid Award",
          summary:
            "The council will vote on awarding the construction contract for the next phase of sidewalk and bike lane improvements along Paint Branch Parkway.",
          detail:
            "Phase 2 covers approximately 1.2 miles of new protected bike lanes and ADA-compliant sidewalk reconstruction. Three bids were received; staff recommends the low bidder at $1.4M.",
          meetingType: "City Council Regular Session",
          studentImpact:
            "Paint Branch Parkway is a primary commute route between off-campus housing and the UMD campus — these bike lanes and sidewalks change a daily route for thousands of students.",
        },
        "fy27-budget-first-reading": {
          title: "FY27 Budget — Introduction & Public Hearing",
          summary:
            "The City Manager has submitted the proposed FY27 budget. The ordinance is being introduced this month, with a public hearing in May and final adoption required by May 31.",
          detail:
            "The proposed FY27 budget totals $31.5M (up 5.6% from FY26). It adds 5 new positions, includes a 3% COLA, holds the property tax rate flat at 33.5¢/$100, and projects $655K in new revenue from stop-sign camera enforcement. Two listening sessions were held at City Hall before submission.",
          meetingType: "City Council Regular Session",
          studentImpact: null,
        },
        "duvall-field-design": {
          title: "Duvall Field Renovation — Design Approval",
          summary:
            "The council approved the final design plans for the Duvall Field renovation, clearing the project to move to construction bidding.",
          detail:
            "The approved design includes a full synthetic turf replacement, upgraded lighting to meet tournament standards, new bleachers, and accessible restroom facilities. Construction expected to begin summer 2026.",
          meetingType: "City Council Regular Session",
          studentImpact: null,
        },
        "accessory-dwelling-units": {
          title: "Accessory Dwelling Unit Zoning Ordinance",
          summary:
            "The council referred a proposed ordinance to allow accessory dwelling units (in-law suites, backyard cottages) in single-family zones to the Planning Board for review.",
          detail:
            "The ordinance would permit property owners in R-1 and R-2 zones to add a second dwelling unit up to 800 sq ft on lots over 6,000 sq ft. The Planning Board will hold a public hearing before returning a recommendation.",
          meetingType: "City Council Regular Session",
          studentImpact:
            "Directly affects student rental housing supply — ADUs would add small rental units in single-family neighborhoods where most off-campus students already live.",
        },
      },
    },
  },
  es: {
    nav: {
      budget: "Presupuesto",
      council: "Concejo",
      feed: "Mi Feed",
      dashboard: "Panel",
      getStarted: "Comenzar →",
      location: "College Park, MD",
    },
    hero: {
      eyebrow: "College Park, Maryland · FY2027 Propuesto",
      proposedBadge: "Propuesto · comentarios públicos abiertos hasta el 31 de mayo",
      headline1: "Tu presupuesto municipal,",
      headline2: "en palabras simples.",
      subheadline:
        "$31.5 millones. 34,000 residentes. Un lugar para ver a dónde va el dinero y qué decide el concejo ahora.",
      stat1Label: "por residente / año",
      stat2Label: "por $100 — la mitad del promedio del condado",
      stat3Label: "temas del concejo este mes",
      stat4Label: "estudiantes de UMD · la circunscripción más grande que raramente vota localmente",
      pills: {
        multilingual: "English · Español · 中文",
        blockchain: "Verificación de fuente en cadena",
        ai: "Explicaciones de IA con citas",
        ballot: "Decodificador de medidas electorales",
      },
      cta1: "Explorar el presupuesto ↓",
      cta2: "Mi feed personalizado →",
    },
    bridge:
      "Mostrando conexión presupuesto ↕ concejo — desplázate hacia abajo para ver los temas del concejo en esta categoría",
    platform: {
      eyebrow: "Próximamente en la plataforma completa",
      heading: "Inteligencia cívica para cada residente",
      subheading:
        "El panel anterior es solo el comienzo. Civic Lens está construyendo la pila completa de herramientas de transparencia cívica para College Park.",
      cards: {
        feed: {
          title: "Feed Personalizado",
          desc: "Temas que afectan tu distrito, en tu idioma, con resúmenes de reuniones al día siguiente.",
        },
        bills: {
          title: "Explicador de Ordenanzas",
          desc: "Argumentos a favor y en contra, desglose de costos, y las reuniones del concejo que produjeron cada ordenanza.",
        },
        meetings: {
          title: "Decodificador de Reuniones",
          desc: "Resúmenes de transcripciones por IA con desglose de votos por miembro y enlaces con marcas de tiempo de video.",
        },
        dashboard: {
          title: "Panel de Rendición de Cuentas",
          desc: "Registros de votación del concejo, tendencias de asistencia y distribución geográfica de decisiones.",
        },
      },
      openFeed: "Abrir mi feed →",
      available: "Disponible en inglés · Español · 中文",
    },
    blockchain: {
      eyebrow: "Verificación de Fuente",
      heading: "Cada resumen es verificable",
      body: "Cuando resumimos un documento municipal, lo hasheamos, lo almacenamos en IPFS y registramos el hash en la cadena de bloques Polygon. Cualquiera puede verificar que nuestra IA resumió el documento exacto que publicó la ciudad, no una versión editada.",
      cta: "Intenta verificar un documento fuente →",
      verified: "✓ Integridad del documento verificada",
    },
    footer: {
      credit:
        "Datos obtenidos de la Ordenanza Presupuestaria FY26 de College Park 25-O-04 (adoptada el 20 de mayo de 2025) y las agendas oficiales del Concejo Municipal de",
      disclaimer:
        "Este sitio es un proyecto cívico independiente y no está afiliado con la Ciudad de College Park.",
      tagline: "Construido para la transparencia · College Park, MD · 2026",
    },
    budget: {
      eyebrow: "Presupuesto Municipal · FY2027 Propuesto",
      heading: "Presupuesto Propuesto FY2027",
      subheading:
        "El presupuesto propuesto FY2027 de College Park es $31.5M — aproximadamente $927/residente/año, un aumento del 5.6% desde FY26. La tasa de impuesto a la propiedad se mantiene en 33.5¢/$100 residencial (38.5¢ comercial) — la mitad del promedio del Condado de PG de 63.27¢/$100.",
      sourcePdf: "PDF Fuente ↗",
      byDepartment: "Por Departamento",
      byRevenue: "Por Fuente de Ingresos",
      clickHint: "Haz clic en una categoría para filtrar los temas del concejo abajo ↓",
      ofOperatingBudget: "del presupuesto operativo",
      capitalHeading: "Proyectos de Capital",
      capitalAmount: "$6.2M en FY27",
      capitalSubheading:
        "Inversiones únicas en infraestructura, separadas del presupuesto operativo. Total del CIP a 5 años hasta FY31: $19.7M.",
      changesHeading: "Qué hay de nuevo en FY27",
      changeLabels: { add: "Nuevo", remove: "Eliminado", neutral: "Sin cambio" },
      townGown: {
        heading: "Ciudad y Universidad",
        subheading:
          "College Park son dos ciudades que comparten un mismo código postal. Así sirve el presupuesto a ambas.",
        cards: [
          {
            title: "Dos presupuestos, un código postal",
            stat: "$2.98B vs. $31.5M",
            body: "La UMD opera con un presupuesto de $2.98B en FY26 dentro de los límites de la ciudad — aproximadamente 95× el presupuesto propuesto de $31.5M de la ciudad para FY27.",
            sourceLabel: "Fuente",
            sourceUrl: "https://finance.umd.edu/budget/facts-and-figures/operating-budget",
          },
          {
            title: "Quién paga el impuesto a la propiedad",
            stat: "~50% inquilinos",
            body: "Aproximadamente la mitad de los hogares de College Park son inquilinos. Los estudiantes en dormitorios no pagan el impuesto a la propiedad de la ciudad directamente; los inquilinos fuera del campus lo pagan indirectamente a través del alquiler. La base tributaria depende de residentes que a menudo no se dan cuenta de que están contribuyendo.",
            sourceLabel: null,
            sourceUrl: null,
          },
          {
            title: "La cobertura policial no es uniforme",
            stat: "3 vecindarios",
            body: "La UMPD tiene jurisdicción concurrente en partes de la ciudad, pero no en Oak Springs, Daniels Park ni College Park Woods. Esas áreas dependen enteramente del contrato con la Policía del Condado de PG — que se renueva este mes.",
            sourceLabel: "Fuente",
            sourceUrl: "https://dbknews.com",
          },
        ],
      },
    },
    council: {
      eyebrow: "Concejo Municipal",
      heading: "Esta semana en el Ayuntamiento",
      subtitle:
        "Temas recientes y próximos del Concejo Municipal de College Park — en palabras simples.",
      studentSubtitle:
        "Temas del concejo que afectan directamente a los estudiantes de UMD — con el motivo en palabras simples.",
      filteredTo: "Filtrado por",
      clearFilter: "(borrar filtro)",
      noItems: "No hay temas del concejo en este filtro.",
      showAll: "Mostrar todos los temas",
      filterAll: "Todos los temas",
      filterStudents: "🎓 Estudiantes",
      officialAgenda: "Agenda Oficial ↗",
      studentImpactLabel: "Por qué esto afecta a los estudiantes:",
      status: {
        upcoming: "Próximo",
        decided: "Decidido",
        "under-study": "En Estudio",
      },
    },
    data: {
      departments: {
        "general-government": {
          label: "Gobierno General y Administración",
          description:
            "Alcalde y Concejo, Administrador de la Ciudad, Finanzas, RR.HH., TI, Secretaría Municipal, Comunicaciones, Desarrollo Económico y gastos no departamentales (servicio de deuda, transferencias, contingencia).",
        },
        "public-works": {
          label: "Obras Públicas",
          description:
            "Basura, reciclaje, mantenimiento de calles, nieve y hielo, recolección de hojas, flota, garaje de estacionamiento, mantenimiento de edificios, árboles y paisajismo. Mantiene la ciudad funcionando físicamente.",
        },
        "public-services": {
          label: "Servicios Públicos",
          description:
            "Policía contratada con el Condado de PG, cumplimiento de códigos, control de estacionamiento, control de tráfico, bienestar animal. Tu presupuesto de seguridad pública y cumplimiento de códigos.",
        },
        "youth-family-senior": {
          label: "Servicios para Jóvenes, Familias y Adultos Mayores",
          description:
            "Programas para adultos mayores, servicios clínicos, programas para jóvenes y familias, transporte para adultos mayores. Añade 1 Especialista de Apoyo de Emergencia y 1 conductor de autobús a tiempo parcial en FY27.",
        },
        "planning-community": {
          label: "Planificación y Desarrollo Comunitario",
          description:
            "Zonificación, apoyo a la planificación y desarrollo comunitario. Más pequeño de lo esperado — la mayor parte de la planificación la realiza el Condado de Prince George.",
        },
      },
      revenue: {
        "property-tax": "Impuestos a la Propiedad",
        "other-taxes": "Otros Impuestos",
        "fines-fees": "Multas y Tarifas",
        other: "Licencias, Cargos y Varios",
      },
      capital: {
        "complete-streets": {
          label: "Calles Completas y Verdes",
          description:
            "Financiamiento FY27 para la siguiente fase de infraestructura peatonal y ciclista. Total acumulado del proyecto: $9.0M hasta FY31.",
        },
        "pavement-management": {
          label: "Plan de Gestión de Pavimento",
          description:
            "Pavimentación y resurfacing de calles en toda la ciudad en FY27. Total acumulado del proyecto: $14.5M hasta FY31.",
        },
        "north-cp-community-center": {
          label: "Centro Comunitario del Norte de College Park",
          description:
            "Nueva instalación de centro comunitario para el norte de College Park. La mayor parte del gasto es en FY26 ($1.25M) con $250K continuando en FY27.",
        },
      },
      changes: [
        "5 nuevas posiciones: Especialista de Apoyo de Emergencia, Gerente de Proyectos de Vivienda, Coordinador Recreativo, Técnico de Ingeniería/GIS, más un conductor de autobús a tiempo parcial",
        "Ajuste de costo de vida del 3% (COLA) para todos los empleados, según el nuevo contrato sindical",
        "La aplicación de cámaras en señales de alto agrega un estimado de $655K en ingresos por multas y tarifas",
        "Tasa de impuesto a la propiedad sin cambios: 33.5¢/$100 residencial, 38.5¢/$100 comercial",
        "Sin saldo de fondo apropiado en FY27 (vs. $106K del superávit FY24 usado en FY26)",
      ],
      councilItems: {
        "police-contract-renewal": {
          title: "Renovación del Contrato de Servicios Policiales del Condado de PG",
          summary:
            "El concejo está considerando renovar el contrato de la ciudad con el Departamento de Policía del Condado de Prince George para servicios de aplicación de la ley hasta FY27.",
          detail:
            "College Park contrata con PGPD en lugar de mantener su propia fuerza policial. Esta renovación cubre la cobertura de patrullaje para los Distritos 1 y 4, estableciendo niveles de personal y la participación de costos por oficial de la ciudad.",
          meetingType: "Sesión Regular del Concejo Municipal",
          studentImpact:
            "Afecta a los estudiantes que viven fuera del campus en Oak Springs, Daniels Park y College Park Woods — vecindarios fuera de la jurisdicción concurrente de la UMPD que dependen únicamente de este contrato.",
        },
        "complete-streets-bid": {
          title: "Fase 2 de Calles Completas y Verdes — Adjudicación de Licitación",
          summary:
            "El concejo votará sobre la adjudicación del contrato de construcción para la siguiente fase de mejoras de aceras y carriles de bicicleta a lo largo de Paint Branch Parkway.",
          detail:
            "La Fase 2 cubre aproximadamente 1.2 millas de nuevos carriles de bicicleta protegidos y reconstrucción de aceras compatible con ADA. Se recibieron tres ofertas; el personal recomienda al postor más bajo con $1.4M.",
          meetingType: "Sesión Regular del Concejo Municipal",
          studentImpact:
            "Paint Branch Parkway es una ruta de commute principal entre las viviendas fuera del campus y el campus de UMD — estos carriles de bicicleta y aceras cambian una ruta diaria para miles de estudiantes.",
        },
        "fy27-budget-first-reading": {
          title: "Presupuesto FY27 — Introducción y Audiencia Pública",
          summary:
            "El Administrador de la Ciudad ha presentado el presupuesto propuesto FY27. La ordenanza se está introduciendo este mes, con una audiencia pública en mayo y adopción final requerida antes del 31 de mayo.",
          detail:
            "El presupuesto propuesto FY27 totaliza $31.5M (un aumento del 5.6% desde FY26). Añade 5 nuevas posiciones, incluye un COLA del 3%, mantiene la tasa de impuesto a la propiedad en 33.5¢/$100 y proyecta $655K en nuevos ingresos por aplicación de cámaras en señales de alto. Se celebraron dos sesiones de escucha en el Ayuntamiento antes de la presentación.",
          meetingType: "Sesión Regular del Concejo Municipal",
          studentImpact: null,
        },
        "duvall-field-design": {
          title: "Renovación del Campo Duvall — Aprobación del Diseño",
          summary:
            "El concejo aprobó los planes de diseño finales para la renovación del Campo Duvall, despejando el proyecto para pasar a licitación de construcción.",
          detail:
            "El diseño aprobado incluye un reemplazo completo de césped sintético, iluminación mejorada para cumplir con estándares de torneos, nuevas tribunas e instalaciones sanitarias accesibles. Se espera que la construcción comience en el verano de 2026.",
          meetingType: "Sesión Regular del Concejo Municipal",
          studentImpact: null,
        },
        "accessory-dwelling-units": {
          title: "Ordenanza de Zonificación de Unidades de Vivienda Accesoria",
          summary:
            "El concejo remitió una ordenanza propuesta para permitir unidades de vivienda accesoria (suites para suegros, casitas en el jardín) en zonas unifamiliares a la Junta de Planificación para revisión.",
          detail:
            "La ordenanza permitiría a los propietarios en zonas R-1 y R-2 agregar una segunda unidad de vivienda de hasta 800 pies cuadrados en lotes de más de 6,000 pies cuadrados. La Junta de Planificación celebrará una audiencia pública antes de devolver una recomendación.",
          meetingType: "Sesión Regular del Concejo Municipal",
          studentImpact:
            "Afecta directamente la oferta de vivienda estudiantil de alquiler — las ADUs agregarían pequeñas unidades de alquiler en vecindarios unifamiliares donde ya vive la mayoría de los estudiantes fuera del campus.",
        },
      },
    },
  },
} as const;
