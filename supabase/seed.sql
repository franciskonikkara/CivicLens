-- ============================================================
-- Civic Lens — Demo Seed Data
-- Run AFTER schema.sql in the Supabase SQL editor
-- ============================================================

-- ── Council members ───────────────────────────────────────────
insert into public.council_members (id, name, district, title, is_active) values
  ('c1000000-0000-0000-0000-000000000001', 'Denise Mitchell',  'district-1', 'Mayor',                    true),
  ('c1000000-0000-0000-0000-000000000002', 'Stuart Adams',     'district-1', 'Council Member',           true),
  ('c1000000-0000-0000-0000-000000000003', 'Llatetra Brown Esters', 'district-2', 'Council Member',      true),
  ('c1000000-0000-0000-0000-000000000004', 'Monroe Dennis',    'district-2', 'Council Member',           true),
  ('c1000000-0000-0000-0000-000000000005', 'Fazlul Kabir',     'district-3', 'Council Member',           true),
  ('c1000000-0000-0000-0000-000000000006', 'Robert Day',       'district-3', 'Council Member',           true),
  ('c1000000-0000-0000-0000-000000000007', 'Maria Mackie',     'district-4', 'Council Member',           true),
  ('c1000000-0000-0000-0000-000000000008', 'Claudia Doyle',    'district-4', 'Council Member',           true)
on conflict (id) do nothing;

-- ── Documents ────────────────────────────────────────────────
insert into public.documents (id, title, source_url, sha256_hash, ipfs_cid, onchain_tx, doc_type) values
  (
    'd1000000-0000-0000-0000-000000000001',
    'FY2027 Proposed Budget — Ordinance 25-O-07',
    'https://www.collegeparkmd.gov/DocumentCenter/View/7603/FY27-Budget-Proposed-',
    '68ab4322a859acf0b2509d707a73f0a92f2c800377b4ffe736988e8ca0cbb469',
    'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    '0x9f2c4e8b1a3d6f7c0e5b2a4d8f1c3e6b9a2d4f7c0e1b3a5d8f2c4e7b0a3d5f8',
    'budget'
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'Council Meeting Agenda — April 22, 2026',
    'https://www.collegeparkmd.gov/AgendaCenter/ViewFile/Agenda/_04212026-2248',
    null, null, null,
    'agenda'
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'Complete & Green Streets Phase 2 — Staff Report',
    'https://www.collegeparkmd.gov/DocumentCenter/View/CompleteStreets-Phase2',
    null, null, null,
    'staff-report'
  )
on conflict (id) do nothing;

-- ── Meetings ─────────────────────────────────────────────────
insert into public.meetings (id, date, title, video_url, summary_en, summary_es, summary_zh, decisions, document_id) values
  (
    'm1000000-0000-0000-0000-000000000001',
    '2026-04-22',
    'City Council Regular Session — April 22, 2026',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'The council took up three major items: the FY2027 budget introduction, the Complete & Green Streets Phase 2 bid award, and the PG County police contract renewal. The budget totaling $31.5M was introduced for public comment with a hearing scheduled for May 12. The council voted 7–1 to award the Complete Streets construction contract to the low bidder at $1.4M. The police contract renewal was tabled pending additional cost review.',
    'El concejo abordó tres temas importantes: la introducción del presupuesto para el AF2027, la adjudicación de la licitación de la Fase 2 de Complete & Green Streets, y la renovación del contrato policial con el condado PG. El presupuesto por $31.5M fue introducido para comentarios públicos con una audiencia programada para el 12 de mayo. El concejo votó 7-1 para adjudicar el contrato de construcción. La renovación del contrato policial fue pospuesta.',
    '市议会讨论了三个主要事项：2027财年预算导入、Complete & Green Streets第二阶段招标授予以及PG县警察合同续签。总额3150万美元的预算已提交公众意见征集，公开听证会定于5月12日举行。市议会以7比1投票将建设合同授予最低报价方，金额140万美元。警察合同续签因需进一步审查成本而被搁置。',
    '[{"title":"Complete & Green Streets Phase 2 — Bid Award","passed":true,"votes":{"for":7,"against":1,"abstain":0}},{"title":"FY2027 Budget Introduction","passed":true,"votes":{"for":8,"against":0,"abstain":0}},{"title":"PGPD Contract Renewal","passed":false,"votes":{"for":4,"against":3,"abstain":1}}]',
    'd1000000-0000-0000-0000-000000000002'
  ),
  (
    'm1000000-0000-0000-0000-000000000002',
    '2026-03-25',
    'City Council Regular Session — March 25, 2026',
    null,
    'The council unanimously approved the final design plans for the Duvall Field renovation, clearing the project for construction bidding. The approved design includes synthetic turf replacement, upgraded LED lighting to tournament standards, new bleachers, and accessible restroom facilities. Construction is expected to begin in summer 2026 at an estimated cost of $3.1M.',
    'El concejo aprobó por unanimidad los planos de diseño finales para la renovación del Campo Duvall, despejando el proyecto para licitación de construcción. El diseño aprobado incluye reemplazo de césped sintético, iluminación LED actualizada, nuevas gradas e instalaciones sanitarias accesibles. Se espera que la construcción comience en el verano de 2026.',
    '市议会一致批准了Duvall Field翻新项目的最终设计方案，使该项目可以进入施工招标阶段。批准的设计包括人工草皮更换、升级至锦标赛标准的LED照明、新看台以及无障碍卫生设施。预计施工将于2026年夏季开始，估计费用为310万美元。',
    '[{"title":"Duvall Field Renovation — Design Approval","passed":true,"votes":{"for":8,"against":0,"abstain":0}}]',
    null
  ),
  (
    'm1000000-0000-0000-0000-000000000003',
    '2026-03-11',
    'City Council Regular Session — March 11, 2026',
    null,
    'The council referred the proposed Accessory Dwelling Unit (ADU) zoning ordinance to the Planning Board for review and a public hearing. The ordinance would allow property owners in R-1 and R-2 residential zones to add a second dwelling unit up to 800 sq ft on lots over 6,000 sq ft. Proponents cited the housing shortage; opponents raised concerns about parking and neighborhood character.',
    'El concejo remitió la propuesta de ordenanza de unidades de vivienda adicionales (ADU) a la Junta de Planificación para revisión y audiencia pública. La ordenanza permitiría a los propietarios en zonas residenciales R-1 y R-2 agregar una segunda unidad hasta 800 pies cuadrados en lotes de más de 6,000 pies cuadrados.',
    '市议会将拟议的附属居住单元（ADU）分区法令提交规划委员会审查并举行公开听证会。该法令将允许R-1和R-2住宅区的业主在面积超过6000平方英尺的地块上增建不超过800平方英尺的第二套住宅。',
    '[{"title":"ADU Ordinance — Referral to Planning Board","passed":true,"votes":{"for":6,"against":2,"abstain":0}}]',
    null
  )
on conflict (id) do nothing;

-- ── Votes for April 22 meeting ────────────────────────────────
insert into public.votes (meeting_id, council_member_id, vote) values
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000005', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000006', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000007', 'yes'),
  ('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000008', 'no'),
  -- March 25 (unanimous Duvall Field)
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000003', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000004', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000005', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000006', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000007', 'yes'),
  ('m1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000008', 'yes')
on conflict do nothing;

-- ── Bills / Ordinances ────────────────────────────────────────
insert into public.bills (id, external_id, title, status, jurisdiction, summaries, arguments_for, arguments_against, fiscal_impact, introduced_at, document_id) values
  (
    'b1000000-0000-0000-0000-000000000001',
    '25-O-07',
    'FY2027 Operating and Capital Budget',
    'upcoming',
    'college-park-md',
    '{"en":"The proposed FY2027 budget totals $31.5M, a 5.6% increase from FY2026. It adds 5 new city positions, grants all employees a 3% cost-of-living raise, holds the residential property tax rate flat at 33.5¢ per $100 assessed value, and projects $655K in new revenue from stop-sign camera enforcement. Capital projects include Complete & Green Streets ($2.2M), Pavement Management ($925K), and the North College Park Community Center ($1.25M).","es":"El presupuesto propuesto para el AF2027 totaliza $31.5M, un aumento del 5.6% respecto al AF2026. Agrega 5 nuevos puestos municipales, otorga a todos los empleados un aumento por costo de vida del 3%, mantiene la tasa de impuesto predial residencial en 33.5¢ por $100 de valor tasado, y proyecta $655K en nuevos ingresos de cámaras en señales de alto.","zh":"2027财年拟议预算总额为3150万美元，比2026财年增长5.6%。新增5个城市职位，为所有员工提供3%的生活成本调整，将住宅财产税率维持在每$100评估价值33.5¢不变，并预计通过停车标志摄像头执法获得65.5万美元新收入。"}',
    '[{"point":"Holds residential tax rate flat for the seventh consecutive year","strength":5},{"point":"Funds critical infrastructure — streets and community center","strength":4},{"point":"Stop-sign cameras improve pedestrian safety near schools","strength":4}]',
    '[{"point":"5.6% spending increase outpaces inflation","strength":3},{"point":"Stop-sign camera revenue relies on ongoing enforcement","strength":3},{"point":"New positions add permanent salary obligations","strength":3}]',
    'Net new spending of approximately $1.7M over FY2026. No new debt issued; capital projects funded from prior-year reserves and grants. Average household impact: $924.60/year at current assessment levels — unchanged from FY2026.',
    '2026-04-22',
    'd1000000-0000-0000-0000-000000000001'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    '25-O-08',
    'Accessory Dwelling Unit Zoning Ordinance',
    'under-study',
    'college-park-md',
    '{"en":"This ordinance would allow homeowners in R-1 and R-2 single-family zones to add an accessory dwelling unit (ADU) — sometimes called an in-law suite or backyard cottage — up to 800 sq ft on lots larger than 6,000 sq ft. ADUs must meet all building, fire, and accessibility codes. Owner-occupancy of the primary residence is required. The Planning Board will hold a public hearing before returning a recommendation to the Council.","es":"Esta ordenanza permitiría a los propietarios en zonas unifamiliares R-1 y R-2 agregar una unidad de vivienda adicional (ADU) de hasta 800 pies cuadrados en lotes de más de 6,000 pies cuadrados. Las ADUs deben cumplir con todos los códigos de construcción, incendios y accesibilidad. Se requiere que el propietario ocupe la residencia principal.","zh":"该法令将允许R-1和R-2单户住宅区的业主在面积超过6000平方英尺的地块上增建不超过800平方英尺的附属居住单元（ADU）——有时也称为辅助套间或后院小屋。ADU必须符合所有建筑、消防和无障碍规范。要求业主居住在主要住宅内。"}',
    '[{"point":"Increases housing supply in a high-demand market near UMD","strength":5},{"point":"Allows homeowners to generate rental income from existing property","strength":4},{"point":"Enables multi-generational living arrangements","strength":4},{"point":"Lower cost alternative to new apartment construction","strength":3}]',
    '[{"point":"May strain on-street parking in dense single-family neighborhoods","strength":4},{"point":"Changes neighborhood character and density","strength":3},{"point":"Enforcement of owner-occupancy requirement is difficult","strength":3}]',
    'No direct fiscal impact to the city. Potential increase in property tax base over time as ADUs increase assessed values. Staff estimates 15–40 new ADU permits per year.',
    '2026-03-11',
    null
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    '25-O-06',
    'Complete & Green Streets Phase 2 — Bid Award',
    'decided',
    'college-park-md',
    '{"en":"The council awarded the Phase 2 construction contract for the Complete & Green Streets program to the low bidder at $1.4M. Phase 2 covers approximately 1.2 miles of protected bike lanes and ADA-compliant sidewalk reconstruction along Paint Branch Parkway — a primary commute corridor between off-campus housing and the UMD campus. Work is expected to begin in June 2026 and complete by December 2026.","es":"El concejo adjudicó el contrato de construcción de la Fase 2 del programa Complete & Green Streets al postor más bajo por $1.4M. La Fase 2 cubre aproximadamente 1.2 millas de carriles bici protegidos y reconstrucción de aceras conformes con ADA a lo largo de Paint Branch Parkway.","zh":"市议会将Complete & Green Streets计划第二阶段建设合同授予最低报价方，金额为140万美元。第二阶段覆盖沿Paint Branch Parkway约1.2英里的受保护自行车道和符合ADA标准的人行道重建——这是校外住宅与UMD校园之间的主要通勤走廊。"}',
    '[{"point":"Closes a dangerous gap in the bike network between campus and off-campus housing","strength":5},{"point":"ADA sidewalk reconstruction improves accessibility for all residents","strength":5},{"point":"Low bid came in under engineering estimate — good value","strength":4}]',
    '[{"point":"Construction will cause traffic delays on Paint Branch Pkwy for 6 months","strength":3},{"point":"Some on-street parking removed for bike lanes","strength":3}]',
    '$1.4M from the FY2026 Complete & Green Streets capital appropriation. Total cumulative program funding through FY2031: $9.0M.',
    '2026-04-22',
    'd1000000-0000-0000-0000-000000000003'
  )
on conflict (id) do nothing;

-- ── Document chunks (for Q&A RAG) ────────────────────────────
insert into public.chunks (document_id, content, chunk_index) values
  (
    'd1000000-0000-0000-0000-000000000001',
    'College Park FY2027 Proposed Budget Summary. Total operating appropriations: $28,403,687. Total capital appropriations: $3,123,192. Combined total: $31,526,879. This represents a 5.6% increase over the FY2026 adopted budget of $29.8M. The budget adds 5 new full-time equivalent positions and includes a 3% COLA for all employees per the new union contract.',
    1
  ),
  (
    'd1000000-0000-0000-0000-000000000001',
    'Property tax rate: $0.335 per $100 of assessed value for residential real property — unchanged for the seventh consecutive year. Commercial real property: $0.385 per $100. Based on the average College Park residential assessment of $276,000, the average annual City tax bill is approximately $924.60 per household.',
    2
  ),
  (
    'd1000000-0000-0000-0000-000000000001',
    'FY2027 Department Appropriations: General Government & Admin $9,779,587 (34%); Public Works $8,646,793 (30%); Public Services — police, code enforcement, parking — $6,683,839 (24%); Youth, Family & Senior Services $2,477,503 (9%); Planning & Community Development $815,965 (3%). New positions: Emergency Support Specialist, Housing Project Manager, Recreational Coordinator, Engineering/GIS Technician, part-time Bus Driver.',
    3
  ),
  (
    'd1000000-0000-0000-0000-000000000001',
    'Revenue projections FY2027: Property taxes $16,325,000 (52% of total); Other local taxes $7,099,640; Fines, fees and permits $4,554,400 including approximately $655,000 from new stop-sign camera enforcement program authorized by Resolution 25-R-12; Licenses, charges and miscellaneous $3,547,414.',
    4
  ),
  (
    'd1000000-0000-0000-0000-000000000001',
    'Capital Improvement Program FY2027: Complete & Green Streets $2,176,959 — cumulative project total $9.0M through FY2031; Pavement Management Plan $925,000 — cumulative total $14.5M through FY2031; North College Park Community Center $1,250,000. No new general obligation debt is authorized. All capital projects funded from prior-year reserves, state grants, and county grants.',
    5
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'April 22, 2026 Council Meeting Agenda items: (1) Introduction of Ordinance 25-O-07 FY2027 Budget — public hearing scheduled May 12, 2026; (2) Resolution 26-R-08 — Award of construction contract for Complete & Green Streets Phase 2 to ABC Construction Inc., low bidder at $1,428,500; (3) Resolution 26-R-09 — PG County Police Services Contract renewal discussion and first reading.',
    1
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'Complete & Green Streets Phase 2 Staff Report. Project description: 1.2 miles of protected bike lanes and ADA-compliant sidewalk reconstruction along Paint Branch Parkway from Metzerott Road to University Boulevard. Three bids received: ABC Construction $1,428,500 (recommended); XYZ Paving $1,612,000; Metro Contractors $1,780,000. Staff recommends award to low bidder. Budget: $2,176,959 available in FY2027 capital appropriation.',
    1
  )
on conflict do nothing;
