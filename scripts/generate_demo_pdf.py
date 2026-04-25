"""
Generates a realistic College Park FY27 Budget Ordinance PDF
for the Civic Lens source verification demo.
Output: C:/Users/Francis/Downloads/CP-Ordinance-25-O-07-FY27-Budget.pdf
"""

import hashlib
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT

OUTPUT = r"C:\Users\Francis\Downloads\CP-Ordinance-25-O-07-FY27-Budget.pdf"

# ── Colour palette ─────────────────────────────────────────────────────────────
FOREST   = colors.HexColor("#2d6a4f")
INK      = colors.HexColor("#1a1a1a")
STONE    = colors.HexColor("#78716c")
CREAM_BG = colors.HexColor("#f5f0e8")
LIGHT_GR = colors.HexColor("#d8f3dc")

# ── Styles ─────────────────────────────────────────────────────────────────────
base = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, parent=base["Normal"], **kw)

sTitle    = S("sTitle",    fontSize=18, leading=22, textColor=INK,    spaceAfter=4,  alignment=TA_CENTER, fontName="Helvetica-Bold")
sSubtitle = S("sSubtitle", fontSize=11, leading=14, textColor=STONE,  spaceAfter=2,  alignment=TA_CENTER)
sOrdNum   = S("sOrdNum",   fontSize=13, leading=16, textColor=FOREST,  spaceAfter=16, alignment=TA_CENTER, fontName="Helvetica-Bold")
sSection  = S("sSection",  fontSize=10, leading=13, textColor=FOREST,  spaceBefore=14, spaceAfter=4, fontName="Helvetica-Bold")
sBody     = S("sBody",     fontSize=9,  leading=13, textColor=INK,    spaceAfter=6,  alignment=TA_JUSTIFY)
sBold     = S("sBold",     fontSize=9,  leading=13, textColor=INK,    spaceAfter=6,  fontName="Helvetica-Bold")
sSmall    = S("sSmall",    fontSize=8,  leading=11, textColor=STONE,  spaceAfter=4)
sRight    = S("sRight",    fontSize=8,  leading=11, textColor=STONE,  alignment=TA_RIGHT)
sTableHdr = S("sTableHdr", fontSize=8.5, leading=11, textColor=colors.white, fontName="Helvetica-Bold", alignment=TA_CENTER)
sTableCell= S("sTableCell",fontSize=8.5, leading=11, textColor=INK,   alignment=TA_LEFT)
sTableAmt = S("sTableAmt", fontSize=8.5, leading=11, textColor=INK,   alignment=TA_RIGHT, fontName="Helvetica")
sFooter   = S("sFooter",   fontSize=7.5, leading=10, textColor=STONE, alignment=TA_CENTER)
sSig      = S("sSig",      fontSize=9,  leading=13, textColor=INK,   spaceBefore=20)

# ── Budget table data ───────────────────────────────────────────────────────────
DEPARTMENTS = [
    ("General Government & Admin",        "$9,779,587",  "34%"),
    ("Public Works",                       "$8,646,793",  "30%"),
    ("Public Services",                    "$6,683,839",  "24%"),
    ("Youth, Family & Senior Services",    "$2,477,503",   "9%"),
    ("Planning & Community Development",     "$815,965",   "3%"),
]
TOTAL_OP = "$28,403,687"

REVENUE = [
    ("Property Taxes (33.5¢/$100 residential; 38.5¢/$100 commercial)", "$16,325,000", "57%"),
    ("Other Local Taxes",                                               "$7,099,640",  "25%"),
    ("Fines, Fees & Permits",                                          "$4,554,400",  "16%"),
    ("Licenses, Charges & Miscellaneous",                              "$3,547,414",   "0%"),
    # (adjusted for deficit — see note)
]

CAP_PROJECTS = [
    ("Complete & Green Streets (FY27 phase)",   "$2,176,959",  "Public Works"),
    ("Pavement Management Plan",                  "$925,000",  "Public Works"),
    ("North College Park Community Center",     "$1,250,000",  "Youth & Senior Svcs"),
]
TOTAL_CAP = "$4,351,959"


def money_table(headers, rows, total_row=None):
    col_widths = [3.4*inch, 1.2*inch, 0.7*inch]
    data = [[Paragraph(h, sTableHdr) for h in headers]]
    for row in rows:
        data.append([
            Paragraph(row[0], sTableCell),
            Paragraph(row[1], sTableAmt),
            Paragraph(row[2], sTableAmt),
        ])
    if total_row:
        data.append([
            Paragraph(total_row[0], sBold),
            Paragraph(total_row[1], sTableAmt),
            Paragraph(total_row[2] if len(total_row) > 2 else "", sTableAmt),
        ])

    style = TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0),  FOREST),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, LIGHT_GR]),
        ("GRID",          (0, 0), (-1, -1), 0.3, colors.HexColor("#d1fae5")),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
    ])
    if total_row:
        style.add("LINEABOVE",  (0, -1), (-1, -1), 1, FOREST)
        style.add("BACKGROUND", (0, -1), (-1, -1), LIGHT_GR)

    return Table(data, colWidths=col_widths, style=style, hAlign="LEFT")


def cap_table(headers, rows, total_row=None):
    col_widths = [2.5*inch, 1.2*inch, 1.6*inch]
    data = [[Paragraph(h, sTableHdr) for h in headers]]
    for row in rows:
        data.append([Paragraph(c, sTableCell if i < 2 else sTableCell) for i, c in enumerate(row)])
    if total_row:
        data.append([Paragraph(c, sBold) for c in total_row])

    style = TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0),  FOREST),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, LIGHT_GR]),
        ("GRID",          (0, 0), (-1, -1), 0.3, colors.HexColor("#d1fae5")),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
    ])
    if total_row:
        style.add("LINEABOVE", (0, -1), (-1, -1), 1, FOREST)

    return Table(data, colWidths=col_widths, style=style, hAlign="LEFT")


# ── Build document ─────────────────────────────────────────────────────────────
def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        leftMargin=1.0*inch,
        rightMargin=1.0*inch,
        topMargin=0.85*inch,
        bottomMargin=0.85*inch,
        title="Ordinance No. 25-O-07 — FY2027 Budget",
        author="City of College Park, Maryland",
        subject="Fiscal Year 2027 Operating and Capital Budget Ordinance",
        creator="Civic Lens Demo",
    )

    story = []

    # ── Header ─────────────────────────────────────────────────────────────────
    story.append(Paragraph("CITY OF COLLEGE PARK, MARYLAND", sTitle))
    story.append(Paragraph("Mayor and City Council", sSubtitle))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=2, color=FOREST))
    story.append(Spacer(1, 8))
    story.append(Paragraph("ORDINANCE NO. 25-O-07", sOrdNum))
    story.append(Paragraph(
        "AN ORDINANCE ADOPTING THE OPERATING BUDGET AND CAPITAL IMPROVEMENT PROGRAM "
        "FOR FISCAL YEAR 2027 (JULY 1, 2026 – JUNE 30, 2027) AND LEVYING TAXES "
        "THEREFOR PURSUANT TO ARTICLE V, SECTION 5-4 OF THE COLLEGE PARK CITY CHARTER",
        S("sCtr", fontSize=9, leading=13, textColor=INK, alignment=TA_CENTER, spaceAfter=10)
    ))
    story.append(HRFlowable(width="100%", thickness=0.5, color=STONE))
    story.append(Spacer(1, 10))

    # ── Recitals ───────────────────────────────────────────────────────────────
    story.append(Paragraph("RECITALS", sSection))
    recitals = [
        "<b>WHEREAS</b>, the City Manager has submitted to the Mayor and City Council a proposed "
        "Operating Budget for Fiscal Year 2027 totaling <b>$31,526,879</b>, comprising "
        "$28,403,687 in departmental appropriations and $3,123,192 in capital improvement "
        "project appropriations; and",

        "<b>WHEREAS</b>, the Mayor and City Council held public listening sessions on "
        "February 24, 2026 and March 10, 2026 to receive resident input on budget priorities; and",

        "<b>WHEREAS</b>, the Mayor and City Council introduced the proposed budget at the "
        "Regular Session of April 22, 2026 and conducted a duly noticed public hearing "
        "on May 12, 2026; and",

        "<b>WHEREAS</b>, the Mayor and City Council, having considered the City Manager's "
        "proposed budget, the testimony received at the public hearings, and the fiscal "
        "needs of the City, find the proposed budget, as modified herein, to be in the "
        "best interests of the citizens of College Park;",
    ]
    for r in recitals:
        story.append(Paragraph(r, sBody))

    story.append(Paragraph(
        "<b>NOW, THEREFORE, BE IT ORDAINED</b> by the Mayor and City Council of "
        "College Park, Maryland, as follows:",
        sBody
    ))

    # ── Section 1 ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SECTION 1.  OPERATING BUDGET APPROPRIATIONS", sSection))
    story.append(Paragraph(
        "The following sums are hereby appropriated from anticipated revenues for the "
        "operation of the City of College Park for Fiscal Year 2027 (July 1, 2026 – "
        "June 30, 2027):",
        sBody
    ))

    story.append(money_table(
        ["Department / Program Area", "FY2027 Appropriation", "% of Total"],
        DEPARTMENTS,
        ("TOTAL OPERATING APPROPRIATIONS", TOTAL_OP, "100%")
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Appropriations include a <b>3.0% cost-of-living adjustment (COLA)</b> for all "
        "classified employees pursuant to the collective bargaining agreement ratified "
        "January 2026, and funding for <b>five (5) new full-time equivalent positions</b>: "
        "Emergency Support Specialist (Public Services), Housing Project Manager "
        "(Planning &amp; Community Development), Recreational Coordinator (Youth, Family &amp; "
        "Senior Services), Engineering/GIS Technician (Public Works), and a part-time "
        "Bus Driver (Youth, Family &amp; Senior Services).",
        sBody
    ))

    # ── Section 2 ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SECTION 2.  CAPITAL IMPROVEMENT PROGRAM", sSection))
    story.append(Paragraph(
        "The following capital improvement projects are hereby appropriated for "
        "Fiscal Year 2027. Capital funds are derived from prior-year fund balances, "
        "state and county grants, and bond proceeds as specified in the Capital "
        "Improvement Program document on file with the City Clerk. No new general "
        "obligation debt is authorized by this Ordinance.",
        sBody
    ))

    story.append(cap_table(
        ["Project", "FY2027 Appropriation", "Responsible Department"],
        CAP_PROJECTS,
        ["TOTAL CAPITAL APPROPRIATIONS", TOTAL_CAP, ""]
    ))
    story.append(Spacer(1, 8))

    # ── Section 3 ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SECTION 3.  TAX LEVY", sSection))
    story.append(Paragraph(
        "For the purpose of raising revenue to fund the appropriations set forth in "
        "Sections 1 and 2 above, and pursuant to the authority granted by Article 25A "
        "of the Annotated Code of Maryland and the College Park City Charter, there is "
        "hereby levied for Fiscal Year 2027 the following property tax rates:",
        sBody
    ))

    tax_data = [
        [Paragraph("Classification", sTableHdr), Paragraph("Rate per $100 Assessed Value", sTableHdr)],
        [Paragraph("Residential Real Property", sTableCell), Paragraph("$0.335", sTableAmt)],
        [Paragraph("Commercial Real Property", sTableCell), Paragraph("$0.385", sTableAmt)],
        [Paragraph("Personal Property", sTableCell), Paragraph("$0.750", sTableAmt)],
    ]
    tax_table = Table(tax_data, colWidths=[3.4*inch, 2.2*inch], style=TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0),  FOREST),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, LIGHT_GR]),
        ("GRID",          (0, 0), (-1, -1), 0.3, colors.HexColor("#d1fae5")),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
    ]), hAlign="LEFT")
    story.append(tax_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "The residential property tax rate of <b>$0.335 per $100 of assessed value is "
        "unchanged from Fiscal Year 2026</b>, representing the seventh consecutive year "
        "without a residential rate increase. Based on the average College Park residential "
        "assessment of $276,000, the average annual City tax liability is approximately "
        "<b>$924.60</b> per household.",
        sBody
    ))

    # ── Section 4 ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SECTION 4.  REVENUE PROJECTIONS", sSection))
    story.append(Paragraph(
        "The following revenue sources are projected to fund the FY2027 budget. "
        "Projections are based on actual FY2026 collections, County assessment data, "
        "and departmental estimates approved by the Finance Director.",
        sBody
    ))

    story.append(money_table(
        ["Revenue Source", "FY2027 Projection", "% of Total"],
        REVENUE,
        ("TOTAL PROJECTED REVENUE", "$31,526,453", "100%")
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<i>Note: Stop-sign camera enforcement, authorized by City Council Resolution "
        "25-R-12 (November 2025), is projected to generate approximately <b>$655,000</b> "
        "in new Fines &amp; Fees revenue in FY2027 (partial-year basis). Revenue figures "
        "are estimates; actual collections may vary.</i>",
        sSmall
    ))

    # ── Section 5 ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SECTION 5.  BUDGET AMENDMENTS", sSection))
    story.append(Paragraph(
        "The City Manager is authorized to transfer appropriations between line items "
        "within a department without Council approval, provided no transfer exceeds "
        "ten percent (10%) of the department's total appropriation. Transfers between "
        "departments, and any transfer exceeding ten percent of departmental appropriations, "
        "shall require approval by resolution of the Mayor and City Council.",
        sBody
    ))

    # ── Section 6 ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SECTION 6.  EFFECTIVE DATE", sSection))
    story.append(Paragraph(
        "This Ordinance shall take effect on <b>July 1, 2026</b>. The Fiscal Year 2027 "
        "budget as adopted herein supersedes all prior appropriations for Fiscal Year 2027 "
        "and shall remain in effect through June 30, 2027, unless amended by subsequent "
        "ordinance of the Mayor and City Council.",
        sBody
    ))

    # ── Signatures ─────────────────────────────────────────────────────────────
    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=0.5, color=STONE))
    story.append(Spacer(1, 10))

    story.append(Paragraph("INTRODUCED: April 22, 2026", sBody))
    story.append(Paragraph("PUBLIC HEARING: May 12, 2026", sBody))
    story.append(Paragraph("ADOPTED: May 27, 2026", sBody))
    story.append(Spacer(1, 16))

    sig_data = [
        [
            Paragraph("_____________________________", sBody),
            Paragraph("_____________________________", sBody),
        ],
        [
            Paragraph("Denise Mitchell, Mayor", sBold),
            Paragraph("Robert Catlin, City Clerk", sBold),
        ],
        [
            Paragraph("City of College Park, Maryland", sSmall),
            Paragraph("City of College Park, Maryland", sSmall),
        ],
    ]
    sig_table = Table(sig_data, colWidths=[3.0*inch, 3.0*inch], style=TableStyle([
        ("LEFTPADDING",  (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING",   (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 2),
    ]), hAlign="LEFT")
    story.append(sig_table)

    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=1, color=FOREST))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "City of College Park, Maryland  ·  8400 Baltimore Avenue, College Park, MD 20740  ·  "
        "(301) 864-8666  ·  www.collegeparkmd.gov  ·  Document Reference: 25-O-07",
        sFooter
    ))

    doc.build(story)
    return OUTPUT


# ── Run ────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    path = build()
    sha256 = hashlib.sha256(open(path, "rb").read()).hexdigest()
    print(f"PDF saved to: {path}")
    print(f"SHA-256: {sha256}")
    print(f"\nUse this hash in your Civic Lens demo verification page.")
    print(f"Register it on-chain with:")
    print(f"  registerDocument(bytes32(0x{sha256[:16]}...),")
    print(f'    "https://www.collegeparkmd.gov/DocumentCenter/View/FY27-Budget",')
    print(f'    "ipfs://Qm<your-pinata-cid>")')
