// lib/knowledge/caseStudies/signifyRebrand.ts
// Source: provided directly by Ali. Replaces an earlier, genuinely thin
// placeholder version of this file that had almost no real content beyond
// the index summary.

import type { CaseStudyDetail } from '../types'

export const SIGNIFY_REBRAND_DETAIL: CaseStudyDetail = {
  slug: 'signify-rebrand',

  outcome:
    'Led the website redesign - structure, navigation, information architecture - within a broader Signify Health rebrand, in partnership with W2O Group, who owned the core brand identity elements (logo, messaging, visual language). Result: a 50% increase in total website traffic post-launch. Notable context, not a claimed result: CVS Health acquired Signify Health shortly after this rebrand shipped - the timing shows the rebrand landed during a period when the company\'s market position was clearly shifting, but the acquisition was not caused by the design work.',

  businessConstraint:
    'Roughly a 6-month timeline. The core constraint was brand continuity under change: Signify Health needed to look and feel updated to reflect its expanded scope, without alienating audiences - health plan partners, existing members - who already trusted the old identity. That shaped the website work directly: the new IA and navigation had to carry the updated positioning without breaking the sense of familiarity for returning visitors.',

  technicalConstraint:
    'Built on HubSpot CMS using HubL templating. Not a from-scratch build across the board - major pages were rebuilt to support W2O\'s new messaging, but a substantial number of legacy pages had to be ported over and reworked to fit the new IA and design language rather than rebuilt from zero. This was real, hands-on HubSpot/HubL implementation work, not just design handed off to a separate development team.',

  doNotFabricate: [
    'The 50% traffic increase is the only hard metric documented for this project - never invent adoption or stakeholder-reception numbers to go alongside it.',
    'Ali\'s scope was the website specifically - structure, navigation, IA, content gap closure. The core brand identity (logo, messaging, visual language) was W2O Group\'s work, not Ali\'s.',
    'The CVS Health acquisition followed the rebrand but was not caused by it - present this as timing/context only, never as a claimed result of the design work.',
    'This is a distinct project from the IHE Scheduling Portal - a different Signify Health engagement, a different research method, different metrics. The 73 NPS figure belongs to the IHE Scheduling Portal, not this project - never attribute it here.',
    'Built specifically on HubSpot and HubL - do not generalize this into a broader "custom CMS" claim or name a different framework.',
  ],
}
