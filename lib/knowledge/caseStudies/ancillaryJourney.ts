// lib/knowledge/caseStudies/ancillaryJourney.ts
// Source: provided directly by Ali, with precise study details (participant
// demographics, exact scores, severity ratings) that must be preserved
// exactly, not rounded or generalized. Replaces an earlier, genuinely thin
// placeholder version of this file.

import type { CaseStudyDetail } from '../types'

export const ANCILLARY_JOURNEY_DETAIL: CaseStudyDetail = {
  slug: 'ancillary-journey',

  outcome:
    'The throughline wasn\'t one catastrophic blocker - it was a mismatch between what the interface assumed users already knew and what they actually knew, at two layers. Category-level: most participants weren\'t sure whether their existing Medicare plan already included dental/vision/hearing coverage - the category itself was unfamiliar territory, not just the site. Interface-level, three Severity-A findings: (1) the results-page tabs for switching between Dental/Vision/DVH went unnoticed by most users on landing; (2) text inside the plan-type selection box read as clickable links but wasn\'t, breaking users\' expectation and confusing the stand-alone-vs-bundle distinction; (3) the right-side "Shopping List" panel was almost universally missed, and even when pointed out, users couldn\'t agree on what it was for. Severity-B: "Provider Coverage" labeling confused about half of users, and sorting vs. filtering read as redundant to about half. Severity-C: dashboard person-selection didn\'t carry forward to the next step, and terms like "Individual & Family," "Hospital Indemnity," and "Major vs. Basic Services" needed plain-language help.\n\nThis was not a research-only engagement with no result: findings fed directly into shipped improvements to the Shopping Experience, including a clearer product hierarchy structure on the Select People/Select Products page.\n\nMeasured scores: System Usability (SEQ, out of 7.0) - Dental 6.5, Vision 6.9, DVH 6.9. Likeliness to enroll (out of 5.0) - Dental 3.8, Vision 3.9, DVH 3.6. Seven issues total on the Nielsen Norman severity scale: three rated A, two rated B, two rated C, no D-rated issues.',

  businessConstraint:
    'WTW allocated budget for one in-depth research project per year - this was that year\'s allocation. The 10-participant sample wasn\'t a deliberate scope-down from a larger target; it\'s the standard sample size for this kind of study, matching available budget. 10-15 would have given stronger statistical grounding, but there wasn\'t room to go above 10. This did not stay research-only - it had a real downstream build, feeding directly into shipped improvements to the Shopping Experience, including the clearer product hierarchy on the Select People/Select Products page. It was scoped as a stand-alone research engagement, but its findings had a genuine build attached, not just a handoff that went nowhere.',

  technicalConstraint:
    'Two distinct, real constraints. First, prototype fidelity: this ran against a prototype, not the live site, so there was no real plan data - the plan cards shown were surface-level overviews only, not pulled from actual carrier data. That was the ceiling on what participants could actually evaluate. Second, recruiting: the standard approach was unmoderated UserLytics testing, runnable at essentially unlimited volume - but UserLytics\' built-in demographic filters only went up to age 50+, which would have pulled in people who weren\'t Medicare-eligible or even thinking about it yet. Reaching the actual 65+, Medicare-eligible population this study needed required UserLytics\' personalized recruiting service instead of the standard panel - which is also why this ran moderated (10 sessions) rather than at the usual unmoderated volume: personalized recruiting for a narrow demographic doesn\'t scale the same way self-serve panel access does.',

  doNotFabricate: [
    'Platform is Via Benefits (WTW\'s Medicare shopping marketplace). "Ancillary" here means specifically Dental, Vision, and Hearing (DVH) - not medical/health coverage.',
    'Products are purchasable stand-alone (Dental only, Vision only) or bundled (DVH = all three together) - that distinction itself was a top confusion point (Severity A #2).',
    '"Hospital Indemnity" is a separate, adjacent product that appeared in the same tab set and caused its own confusion - it is not one of the three ancillary categories.',
    'This tested a prototype of a proposed shopping flow, never the live production site.',
    'Participants: 10 total, ages 65-70, all US-based with existing Medicare coverage (a mix of Medicare Advantage, Medigap, Part D) - 7 female, 3 male. They were not screened for existing ancillary coverage status one way or the other; the fact that most weren\'t sure if they had it was itself a finding, not a screening criterion.',
    '3 scenarios = search for a Dental plan, a Vision plan, and a DVH bundle plan, each performed for a named test persona within Via Benefits\' "shop for someone else" household flow.',
    'Exact scores: SEQ (ease, out of 7.0) - Dental 6.5, Vision 6.9, DVH 6.9. Likeliness to enroll (out of 5.0) - Dental 3.8, Vision 3.9, DVH 3.6. Never round or approximate these.',
    '7 issues total on the Nielsen Norman severity scale: issues 1-3 rated A, 4-5 rated B, 6-7 rated C. No D-rated issues in this deck.',
    'Ali\'s role on this specific study is documented as "UX Researcher" in the source materials - distinct from his general WTW title "UX Designer." Don\'t conflate the two.',
  ],

  // This project is password-gated on the real site - the gate protects a
  // link to the full research presentation deck, not the general problem
  // and approach narrative, which is fully public.
  publicSummary:
    'Via Benefits offered ancillary insurance products (dental, vision, hearing) as part of its Medicare shopping experience. Ali ran a mixed-methods research study - moderated usability sessions plus qualitative interviews - to understand where comprehension broke down for enrollees navigating this unfamiliar product category. The research produced prioritized findings: the need for plain-language category explanations before plan comparison, anchoring cost comparisons in annual out-of-pocket terms rather than monthly premiums, and using progressive disclosure to surface the most critical information first. The full research deck - specific session-by-session findings and usability issues with severity ratings - is part of Ali\'s password-protected work. If asked for that level of detail, point the visitor toward unlocking access on the site, or reaching out to Ali directly, without describing what the protected content actually contains.',
}
