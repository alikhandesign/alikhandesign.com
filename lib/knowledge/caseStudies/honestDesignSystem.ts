// lib/knowledge/caseStudies/honestDesignSystem.ts
import type { CaseStudyDetail } from '../types'

export const HONEST_DESIGN_SYSTEM_DETAIL: CaseStudyDetail = {
  slug: 'honest-design-system',

  outcome:
    'A personal design system built and documented from scratch, currently comprising 39 components, with a live Storybook instance documenting each one.',

  businessConstraint:
    'The system enforces a specific governing rule: every component must earn its place through live usage - each one is required to have a real, live consumer somewhere on the actual site before it\'s considered complete, rather than being built speculatively ahead of a real need. This is a deliberate constraint against over-building a design system in the abstract.',

  technicalConstraint:
    'Built and documented in Figma alongside a live Storybook instance for each component. One documented exception to the "every component needs a live consumer" rule exists deliberately: a component handling failure-mode taxonomy display is excluded from that rule, since it\'s a hardcoded one-off with a single consumer, not a reusable pattern - the exception itself is treated as worth naming explicitly, not silently allowed.',

  doNotFabricate: [
    'The component count (39) reflects a specific point in time and may have changed since - if precision matters, this should be confirmed rather than assumed permanently accurate.',
    'The "every component needs a live consumer" rule is a real, deliberately-enforced governing principle for this system, not a general industry best practice being described abstractly - it\'s specific to how Ali runs this particular system.',
  ],
}
