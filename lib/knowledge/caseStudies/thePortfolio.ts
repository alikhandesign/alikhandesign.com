// lib/knowledge/caseStudies/thePortfolio.ts
// Unlike most other migrated projects, this content is drawn directly from
// real, first-hand work done across this project's own build sessions, not
// reconstructed from external documentation - the portfolio site (including
// this knowledge base structure itself) is the subject of the case study.

import type { CaseStudyDetail } from '../types'

export const THE_PORTFOLIO_DETAIL: CaseStudyDetail = {
  slug: 'the-portfolio',

  outcome:
    'This site itself, including the Portfolio Assistant chatbot, treated as a live, ongoing product rather than a finished artifact. A real automated eval framework was built (fetches the live system prompt, runs test cases against the production model, grades with an independent judge model) - its first real run scored 12/15, and the retroactive first-attempt pass rate across 28 test scenarios was 54%, improving to 100% after iterative fixing. That framework found and fixed two genuine security-relevant regressions in production guardrails that had been passing reliably for weeks, and closed the loop on a fabricated fact that had been quietly distorting responses. Deployment safety (branch protection, staged preview deployments) was set up and empirically tested, not just configured - a real direct push to the protected branch was attempted and confirmed rejected. A production Dashboard was built from real conversation logs, including categorized guardrail-trigger tracking and a user feedback mechanism.',

  businessConstraint:
    'The chatbot has an explicit business goal - increasing the likelihood a visitor takes an action toward inviting Ali to interview - and every feature decision is weighed against that goal, not against "what would a general-purpose assistant do." Concrete example: an uncertainty-communication banner (flagging hedged vs. confident claims visually) was deliberately not built, because a system that has to detect its own uncertainty reliably risks flagging a confident, correct answer as shaky, which does more harm to trust than no signal at all - contrasted directly against a different feature (a contact-suggestion signal) that was left to model judgment, because getting that one wrong costs almost nothing. A JD-match percentage score was explicitly proposed and declined for a related reason: a fake-precision number conflicts with the entire system\'s design philosophy around not overclaiming confidence.',

  technicalConstraint:
    'The chat backend uses native tool-calling (not text parsing) for two structured signals alongside every visible reply: a private, working estimate of who\'s likely asking (recruiter, hiring manager, product manager, engineer) that revises turn to turn, and an on-demand case-study lookup tool that retrieves a specific project\'s detail only when a question genuinely needs it, keeping the default system prompt lean as the case-study corpus grows. Building this correctly required a genuine multi-step request loop, not a single API call - a real, confirmed bug existed where the code discarded a complete, valid answer because of a wrong assumption about what a particular API stop condition meant, found only once real per-iteration logging was added to make the actual behavior visible instead of guessed at.',

  doNotFabricate: [
    'The 54% to 100% first-attempt pass rate is specific to the retroactive eval scoring across 28 test scenarios from the project\'s own testing batches - it is not a claim about live user satisfaction or real visitor outcomes, which are not yet measured.',
    'The debugging process for the audience-sensing and case-study-lookup features involved at least one real misdiagnosis along the way (content initially flagged as fabricated turned out to be genuine, already-documented material) that was caught and corrected once checked against the actual source - this is part of the honest process, not something to omit or gloss over as if every fix was correct on the first attempt.',
  ],
}
