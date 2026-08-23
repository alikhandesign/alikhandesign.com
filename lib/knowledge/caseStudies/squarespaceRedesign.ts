// lib/knowledge/caseStudies/squarespaceRedesign.ts
import type { CaseStudyDetail } from '../types'

export const SQUARESPACE_REDESIGN_DETAIL: CaseStudyDetail = {
  slug: 'squarespace-redesign',

  outcome:
    'A self-initiated audit triggered by Ali\'s own experience trying to rebuild his portfolio after being laid off [4]. Two test tracks, 22 prompts total, 20 documented failure modes. Track A (new user) walked the full Blueprint AI onboarding - selecting "Design" versus "UI/UX Design" changed the hero image from a chair to a phone and the headline by two words, with everything else identical; adding a Portfolio page populated it with floristry photography. Track B (power user) ran 12 specific portfolio-focused prompts - the AI called him by the wrong name (Alexandre), generated 600 words of chemical synthesis documentation for his AI research pipeline, and after 12 prompts establishing his actual professional context, produced a therapy intake profile for a stranger. Session Blindness (no persistent user model) appeared in 11 of 12 Track B prompts. Core diagnosis: Squarespace\'s AI is a categorization engine wearing a personalization promise - every onboarding category maps to Squarespace\'s product inventory, not to the actual user. An interactive prototype exists at squarespace-ai-redesign.vercel.app. Ali then built his own portfolio site instead of using Squarespace.',

  businessConstraint:
    'This was entirely self-initiated - born directly out of a real personal need (rebuilding a portfolio after a layoff) rather than a client or employer request. The three redesigned moments proposed were scoped specifically to address the documented failure modes, not a full product rebuild: conversational intake (three open-ended questions building real context before generating anything), a Transparent Builder (click any section to see the AI\'s reasoning and override it), and a Context Layer (a persistent panel showing what the AI understands, updated through edits, with confidence levels).',

  technicalConstraint:
    'The core technical diagnosis is architectural, not cosmetic: the system lacks a persistent user model across a session ("Session Blindness"), which is why context established early in a conversation (professional background, prior answers) fails to carry forward to later prompts. The proposed fix (a visible Context Layer with confidence levels) is a UI expression of a deeper requirement - the underlying system needs actual session-level state, not just better prompts.',

  doNotFabricate: [
    'The specific failure examples are real and exact: the wrong name (Alexandre), the chemical synthesis documentation, the therapy intake profile for a stranger, the floristry photography, the chair-vs-phone hero image swap. Do not generalize these into vaguer or different examples.',
    'This was a self-initiated audit and prototype, not paid client work - never imply it was commissioned by Squarespace or anyone else.',
  ],
}
