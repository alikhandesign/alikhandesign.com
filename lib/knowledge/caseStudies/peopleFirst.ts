// lib/knowledge/caseStudies/peopleFirst.ts
import type { CaseStudyDetail } from '../types'

export const PEOPLE_FIRST_DETAIL: CaseStudyDetail = {
  slug: 'people-first',

  outcome:
    'Ali was the sole UX designer on the Via Benefits shopping experience team [2]. Via Benefits handled hundreds of thousands of Medicare enrollments annually for WTW\'s $1B+ book of business. The problem: the first screen asked users to choose between Medicare Plans and Individual and Family Plans - most retirees didn\'t know the difference and shouldn\'t have to, since the system was organized around WTW\'s product taxonomy, not how a human shops for insurance. Dual-track research (FullStory sessions showing a dense cluster of rage clicks at the plan-type selector, plus moderated interviews) confirmed users wanted to see what was available for someone like them, not answer a technical classification question first. The insight: the system only needed three data points - who you\'re shopping for, date of birth, zip code. Ali also designed an "Escape Hatch" for users who already knew their plan type. Outcomes: 45% faster time-to-convert (2m 55s to 1m 36s), 15% lift in enrollments, 50% reduction in rage clicks, 33% increase in task completion.',

  businessConstraint:
    'The product-first structure had calcified into institutional belief - changing it meant dismantling a foundational assumption the team had built around for years, not tweaking a single screen. Ali used FullStory data and interview findings to make the case to the Head of Product directly. Separately, and just as real a constraint: Ali originally scoped this much larger - a fully sequential, unified household shopping experience where users would select everyone they\'re shopping for upfront, walk through each person choosing what they need (health, dental, vision, ancillary), then view the whole household\'s plans together before checkout. That version would have required a large restructuring of how the system operated, so he scoped a more balanced approach instead: select who you\'re shopping for first, then shop for each person individually. That made the shift from Product-First to People-First far less taxing on the engineering team building it, while still delivering the core strategy change. The Via Benefits team has since moved toward that fuller, unified household vision Ali originally proposed, as a longer-running initiative still in progress - deprioritizing the full vision wasn\'t giving it up, it was recognizing the more ambitious version needed to be earned incrementally.',

  technicalConstraint:
    'Not documented in technical/architectural detail beyond what shaped the business-constraint scoping decision above (the engineering lift difference between a fully unified household flow and a person-by-person one). No specific stack, API, or data-model detail has been written up for this project.',

  doNotFabricate: [
    'The "originally wanted it bigger, scoped down for engineering feasibility" story is real and documented (Ali\'s own reflection) - but it describes a fully sequential household shopping flow being scoped to a person-by-person flow, not any other framing. Do not alter these specifics.',
    'The outcome figures are exact: 45% faster time-to-convert (2m 55s to 1m 36s), 15% lift in enrollments, 50% reduction in rage clicks, 33% increase in task completion. Do not round differently or restate as approximate.',
  ],

  // This project is password-gated on the real site - the gate protects the
  // detailed narrative (the stakeholder-pivot story, research synthesis
  // detail, and the reflection). All four headline metrics are genuinely
  // public, matching the top-level metrics prop on the real page exactly.
  publicSummary:
    'Via Benefits\' Medicare shopping experience made users choose an insurance product category before they could see any plans, even though most users didn\'t know which category applied to them. Ali led research (FullStory analysis and user interviews) diagnosing this as an identity-first, not product-first, problem, and redesigned the entry point accordingly. Publicly stated results: 45% faster time-to-convert, a 15% lift in total enrollments, a 50% reduction in rage clicks, and a 33% increase in task completion. Ali was the lead UX designer and researcher on this project. The specific stakeholder-pivot story, the research synthesis detail, and the reflection are part of Ali\'s password-protected work. If asked for that depth, point the visitor toward unlocking access on the site, or reaching out to Ali directly, without describing what the protected content actually contains.',
}
