// Static data for the College Park FY2026 dashboard
// In production these come from Supabase; for Phase 1 they live here.

export const BUDGET = {
  perResident: 870,
  totalOperating: 29_600_000,
  departments: [
    {
      id: "public-works",
      label: "Public Works",
      amount: 8_200_000,
      pct: 28,
      color: "#1b4332",
      icon: "🔧",
      description:
        "Roads, sidewalks, stormwater, street lighting, and trash collection. Keeps the physical city running.",
    },
    {
      id: "public-services",
      label: "Public Services",
      amount: 6_500_000,
      pct: 22,
      color: "#2d6a4f",
      icon: "🚔",
      description:
        "Police contract with PG County, fire services, and emergency management. Your public safety budget.",
    },
    {
      id: "general-government",
      label: "General Government",
      amount: 5_300_000,
      pct: 18,
      color: "#40916c",
      icon: "🏛️",
      description:
        "City Manager's office, City Council operations, finance, HR, IT, and legal services.",
    },
    {
      id: "planning-community",
      label: "Planning & Community Dev",
      amount: 4_700_000,
      pct: 16,
      color: "#52b788",
      icon: "📐",
      description:
        "Zoning, building permits, economic development, and housing programs. Shapes what gets built where.",
    },
    {
      id: "youth-family-senior",
      label: "Youth, Family & Senior Services",
      amount: 4_900_000,
      pct: 16,
      color: "#74c69d",
      icon: "🤝",
      description:
        "Recreation programs, senior center, after-school activities, and community events for all ages.",
    },
  ],
  revenue: [
    { id: "property-tax", label: "Property Tax",  amount: 15_392_000, pct: 52, color: "#2d6a4f" },
    { id: "other-taxes",  label: "Other Taxes",   amount: 6_808_000,  pct: 23, color: "#40916c" },
    { id: "fines-fees",   label: "Fines & Fees",  amount: 3_848_000,  pct: 13, color: "#74c69d" },
    { id: "other",        label: "Other Revenue", amount: 3_552_000,  pct: 12, color: "#b7e4c7" },
  ],
  capital: [
    {
      id: "complete-streets",
      label: "Complete & Green Streets",
      amount: 4_200_000,
      department: "public-works",
      description:
        "Pedestrian and bicycle infrastructure improvements across the city, including sidewalk repairs and protected bike lanes.",
    },
    {
      id: "duvall-field",
      label: "Duvall Field Renovation",
      amount: 3_100_000,
      department: "youth-family-senior",
      description:
        "Renovation of Duvall Field athletic complex, including turf replacement and facility upgrades.",
    },
    {
      id: "north-cp-community-center",
      label: "North CP Community Center",
      amount: 3_000_000,
      department: "youth-family-senior",
      description:
        "New community center facility for North College Park neighborhood residents.",
    },
  ],
  changes: [
    { type: "add",     text: "4 new positions added citywide" },
    { type: "add",     text: "4.5% cost-of-living adjustment (COLA) for all employees" },
    { type: "remove",  text: "Student housing subsidy not renewed for FY26" },
    { type: "neutral", text: "Property tax rate unchanged at 33.5¢/$100" },
    { type: "neutral", text: "No new debt issued; capital projects funded from reserves" },
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
  },
  {
    id: "fy27-budget-first-reading",
    title: "FY27 Budget — First Reading",
    summary:
      "The council held its first public reading of the proposed FY27 operating budget, opening the floor for resident comment before final adoption in May.",
    detail:
      "The proposed FY27 budget totals approximately $31.1M, up roughly 5% from FY26. Key new items include two additional Public Works positions and expanded senior services hours.",
    date: "2026-04-08",
    meetingType: "City Council Regular Session",
    status: "decided" as const,
    budgetCategory: "general-government",
    tags: ["budget", "fy27"],
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
