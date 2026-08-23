// lib/knowledge/caseStudies/patternLibrary.ts
// This project's content is unusually well-verified compared to most others
// being migrated - the six pattern categories below were fetched and read
// directly from the live pattern pages during this project's own Phase 4
// audit, not reconstructed from summary or memory.

import type { CaseStudyDetail } from '../types'

export const PATTERN_LIBRARY_DETAIL: CaseStudyDetail = {
  slug: 'pattern-library',

  outcome:
    'An audit of six AI products (including ChatGPT, Claude, Gemini, and Perplexity) to find where interface design still assumes deterministic software, turned into a documented pattern library covering six categories: Generation States, Uncertainty Communication, Source & Attribution, Limitation Handling, Correction & Refinement, and Error States - 23 standardized prompts used across the audit. Each pattern documents the problem, a prescription, specific design decisions, and honest tradeoffs, not just a recommendation.',

  businessConstraint:
    'This is explicitly a living reference, not a one-time deliverable - it has already been revisited and refined based on real product testing. When the Portfolio Assistant chatbot (a separate, later project) was audited against this library\'s own documented patterns, one requirement (Source & Attribution\'s "resolution" rule - citations should go to specific excerpts, not homepages) turned out to assume an evidentiary citation system, which doesn\'t describe every real system correctly. That distinction - evidentiary citation systems needing exact-excerpt resolution, versus navigational ones correctly resolving to a full page - was identified as a needed caveat to add back into this pattern\'s own documentation, discovered specifically by testing the library against a real, differently-purposed system rather than assumed in the abstract.',

  technicalConstraint:
    'Not documented as a single technical implementation - each of the six pattern categories has its own specific design-decision and tradeoff detail (for example, Generation States prescribes four minimum states - thinking, streaming, complete, and hung with a watchdog threshold and recovery affordance; Source & Attribution prescribes inline numbered badges over superscripts and an on-demand panel). Ask about a specific pattern category by name for that level of detail.',

  doNotFabricate: [
    'The six pattern categories are exact: Generation States, Uncertainty Communication, Source & Attribution, Limitation Handling, Correction & Refinement, Error States - not a different or shorter list.',
    'The caveat about Source & Attribution\'s resolution requirement (evidentiary vs. navigational citation systems) was identified as needing to be added to the live pattern page - as of the last verification, it may or may not have actually been written in yet. Do not assume it has been without checking.',
  ],
}
