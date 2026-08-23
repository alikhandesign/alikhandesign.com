// lib/knowledge/caseStudies/thePortfolio.ts
// Scoped to the broader portfolio site itself - the build, the deployment
// practices, the general philosophy of treating it as a living product.
// The chatbot living on this site has its own dedicated case study
// (portfolio-assistant.ts) - deliberately not duplicated here.

import type { CaseStudyDetail } from '../types'

export const THE_PORTFOLIO_DETAIL: CaseStudyDetail = {
  slug: 'the-portfolio',

  outcome:
    'The portfolio site itself - built on Next.js, TypeScript, and React, deployed on Vercel - treated as a continuously-improved product rather than a one-time build. Deployment safety was set up and empirically tested, not just configured: branch protection on the main branch was confirmed by directly attempting a push and having it rejected, not assumed to be working from the settings screen alone. All changes go through a feature-branch-and-pull-request workflow, reviewed and merged deliberately rather than pushed directly. Case study pages were migrated onto a shared, consistent page structure, and the Honest Design System component library is used throughout the site rather than one-off styling per page.',

  businessConstraint:
    'The site is deliberately structured to keep evolving rather than being treated as finished once launched - new sections, components, and capabilities get added incrementally, each going through the same branch-and-review discipline as any other change, regardless of how small.',

  technicalConstraint:
    'Next.js with TypeScript and React, deployed on Vercel. Branch protection enforced at the repository level - direct pushes to main are rejected, confirmed by testing the rejection directly rather than trusting configuration alone. The Honest Design System, a personal component library, is the shared design-system layer used across the site\'s pages.',

  doNotFabricate: [
    'Branch protection on main was confirmed working by directly attempting a push to the protected branch and observing it rejected - this is a real, tested fact, not an assumption based on a settings toggle.',
    'This entry covers the site broadly - the AI-powered Portfolio Assistant chatbot that lives on this site has its own separate, dedicated case study and should not be described in depth here.',
  ],
}
