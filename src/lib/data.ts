// Static data for the College Park FY2027 Proposed dashboard

export const BUDGET = {
  perResident: 927,
  totalOperating: 31_500_000,
  sourcePdfUrl: "https://www.collegeparkmd.gov/DocumentCenter/View/7603/FY27-Budget-Proposed-",
  departments: [
    {
      id: "general-government",
      label: "General Government & Admin",
      amount: 9_779_587,
      pct: 34,
      color: "#1b4332",
      icon: "🏛️",
      description:
        "Mayor & Council, City Manager, Finance, HR, IT, City Clerk, Communications, Economic Development, and non-departmental expenses (debt service, transfers, contingency).",
    },
    {
      id: "public-works",
      label: "Public Works",
      amount: 8_646_793,
      pct: 30,
      color: "#2d6a4f",
      icon: "🔧",
      description:
        "Refuse, recycling, street maintenance, snow & ice, leaf collection, fleet, parking garage, building maintenance, tree & landscape. Keeps the physical city running.",
    },
    {
      id: "public-services",
      label: "Public Services",
      amount: 6_683_839,
      pct: 24,
      color: "#40916c",
      icon: "🚔",
      description:
        "Contract police with PG County, code compliance, parking enforcement, traffic enforcement, animal welfare. Your public safety and code budget.",
    },
    {
      id: "youth-family-senior",
      label: "Youth, Family & Senior Services",
      amount: 2_477_503,
      pct: 9,
      color: "#52b788",
      icon: "🤝",
      description:
        "Senior programs, clinical services, youth & family programming, transportation for seniors. Adds 1 Emergency Support Specialist and 1 PT bus driver in FY27.",
    },
    {
      id: "planning-community",
      label: "Planning & Community Dev",
      amount: 815_965,
      pct: 3,
      color: "#74c69d",
      icon: "📐",
      description:
        "Zoning, planning support, and community development. Smaller than you might expect — most planning is done by Prince George's County.",
    },
  ],
  revenue: [
    { id: "property-tax", label: "Property Taxes",           amount: 16_325_000, pct: 52, color: "#2d6a4f" },
    { id: "other-taxes",  label: "Other Taxes",              amount:  7_099_640, pct: 22, color: "#40916c" },
    { id: "fines-fees",   label: "Fines & Fees",             amount:  4_554_400, pct: 14, color: "#74c69d" },
    { id: "other",        label: "Licenses, Charges & Misc", amount:  3_547_414, pct: 11, color: "#b7e4c7" },
  ],
  capital: [
    {
      id: "complete-streets",
      label: "Complete & Green Streets",
      amount: 2_176_959,
      department: "public-works",
      description:
        "FY27 funding for the next phase of pedestrian and bike infrastructure. Cumulative project total: $9.0M through FY31.",
    },
    {
      id: "pavement-management",
      label: "Pavement Management Plan",
      amount: 925_000,
      department: "public-works",
      description:
        "FY27 paving and street resurfacing across the city. Cumulative project total: $14.5M through FY31.",
    },
    {
      id: "north-cp-community-center",
      label: "North College Park Community Center",
      amount: 1_250_000,
      department: "youth-family-senior",
      description:
        "New community center facility for North College Park. Most spending is in FY26 ($1.25M) with $250K continuing in FY27.",
    },
  ],
  changes: [
    { type: "add",     text: "5 new positions: Emergency Support Specialist, Housing Project Manager, Recreational Coordinator, Engineering/GIS Tech, plus a part-time bus driver" },
    { type: "add",     text: "3% cost-of-living adjustment (COLA) for all employees, per new union contract" },
    { type: "add",     text: "Stop-sign camera enforcement adds an estimated $655K in fines & fees revenue" },
    { type: "neutral", text: "Property tax rate unchanged: 33.5¢/$100 residential, 38.5¢/$100 commercial" },
    { type: "remove",  text: "No appropriated fund balance in FY27 (vs. $106K from FY24 surplus used in FY26)" },
  ],
};

export const COUNCIL_ITEMS = [
  {
    id: "police-contract-renewal",
    title: "PG County Police Services Contract Renewal",
    summary:
      "The council is considering renewing the city's contract with Prince George's County Police Department for law enforcement services through FY27.",
    detail:
      "College Park contracts with PGPD rather than maintaining its own police force. This renewal covers patrol coverage for Districts 1 and 4, setting staffing levels and the city's per-officer cost share.",
    date: "2026-04-22",
    meetingType: "City Council Regular Session",
    status: "upcoming" as const,
    budgetCategory: "public-services",
    tags: ["public-safety", "contracts"],
    agendaUrl: "https://www.collegeparkmd.gov/AgendaCenter/ViewFile/Agenda/_04212026-2248",
    studentRelevant: true,
    studentImpact:
      "Affects students living off-campus in Oak Springs, Daniels Park, and College Park Woods — neighborhoods outside UMPD's concurrent jurisdiction that rely solely on this contract.",
  },
  {
    id: "complete-streets-bid",
    title: "Complete & Green Streets Phase 2 — Bid Award",
    summary:
      "The council will vote on awarding the construction contract for the next phase of sidewalk and bike lane improvements along Paint Branch Parkway.",
    detail:
      "Phase 2 covers approximately 1.2 miles of new protected bike lanes and ADA-compliant sidewalk reconstruction. Three bids were received; staff recommends the low bidder at $1.4M.",
    date: "2026-04-22",
    meetingType: "City Council Regular Session",
    status: "upcoming" as const,
    budgetCategory: "public-works",
    tags: ["infrastructure", "transportation", "capital-projects"],
    agendaUrl: "https://www.collegeparkmd.gov/AgendaCenter/ViewFile/Agenda/_04212026-2248",
    studentRelevant: true,
    studentImpact:
      "Paint Branch Parkway is a primary commute route between off-campus housing and the UMD campus — these bike lanes and sidewalks change a daily route for thousands of students.",
  },
  {
    id: "fy27-budget-first-reading",
    title: "FY27 Budget — Introduction & Public Hearing",
    summary:
      "The City Manager has submitted the proposed FY27 budget. The ordinance is being introduced this month, with a public hearing in May and final adoption required by May 31.",
    detail:
      "The proposed FY27 budget totals $31.5M (up 5.6% from FY26). It adds 5 new positions, includes a 3% COLA, holds the property tax rate flat at 33.5¢/$100, and projects $655K in new revenue from stop-sign camera enforcement. Two listening sessions were held at City Hall before submission.",
    date: "2026-04-22",
    meetingType: "City Council Regular Session",
    status: "upcoming" as const,
    budgetCategory: "general-government",
    tags: ["budget", "fy27", "public-comment"],
    agendaUrl: "https://www.collegeparkmd.gov/AgendaCenter/ViewFile/Agenda/_04212026-2248",
  },
  {
    id: "duvall-field-design",
    title: "Duvall Field Renovation — Design Approval",
    summary:
      "The council approved the final design plans for the Duvall Field renovation, clearing the project to move to construction bidding.",
    detail:
      "The approved design includes a full synthetic turf replacement, upgraded lighting to meet tournament standards, new bleachers, and accessible restroom facilities. Construction expected to begin summer 2026.",
    date: "2026-03-25",
    meetingType: "City Council Regular Session",
    status: "decided" as const,
    budgetCategory: "youth-family-senior",
    tags: ["parks", "capital-projects", "recreation"],
    agendaUrl: "https://www.collegeparkmd.gov/AgendaCenter/ViewFile/Agenda/_03242026-2230",
  },
  {
    id: "accessory-dwelling-units",
    title: "Accessory Dwelling Unit Zoning Ordinance",
    summary:
      "The council referred a proposed ordinance to allow accessory dwelling units (in-law suites, backyard cottages) in single-family zones to the Planning Board for review.",
    detail:
      "The ordinance would permit property owners in R-1 and R-2 zones to add a second dwelling unit up to 800 sq ft on lots over 6,000 sq ft. The Planning Board will hold a public hearing before returning a recommendation.",
    date: "2026-03-11",
    meetingType: "City Council Regular Session",
    status: "under-study" as const,
    budgetCategory: "planning-community",
    tags: ["housing", "zoning"],
    agendaUrl: "https://www.collegeparkmd.gov/AgendaCenter/ViewFile/Agenda/_03102026-2220",
    studentRelevant: true,
    studentImpact:
      "Directly affects student rental housing supply — ADUs would add small rental units in single-family neighborhoods where most off-campus students already live.",
  },
];

export const STATUS_CONFIG = {
  upcoming:      { label: "Upcoming",    cls: "bg-amber-100 text-amber-800" },
  decided:       { label: "Decided",     cls: "bg-green-100 text-green-800" },
  "under-study": { label: "Under Study", cls: "bg-sky-100 text-sky-800" },
} as const;

export const CHANGE_CONFIG = {
  add:     { label: "New",       cls: "bg-green-100 text-green-800" },
  remove:  { label: "Removed",   cls: "bg-red-100 text-red-800" },
  neutral: { label: "Unchanged", cls: "bg-stone-100 text-stone-600" },
} as const;

export function fmt(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
}

export function fmtDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
