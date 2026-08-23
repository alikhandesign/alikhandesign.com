// lib/knowledge/registry.ts
// Maps a project slug to its migrated four-lens detail, for the
// lookup_case_study tool's server-side handler in route.ts.
//
// Adding a new project's detail: create lib/knowledge/caseStudies/<name>.ts
// following the AI_AGENT_DETAIL pattern, then add one line here. A slug not
// present in this map simply hasn't been migrated yet - that's an expected,
// gracefully-handled state during migration, not an error condition.

import type { CaseStudyDetail } from './types'
import { AI_AGENT_DETAIL } from './caseStudies/aiAgent'
import { PEOPLE_FIRST_DETAIL } from './caseStudies/peopleFirst'
import { IHE_PORTAL_DETAIL } from './caseStudies/ihePortal'
import { SQUARESPACE_REDESIGN_DETAIL } from './caseStudies/squarespaceRedesign'
import { VIVIO_DETAIL } from './caseStudies/vivio'
import { DESIGN_HANDOFF_DETAIL } from './caseStudies/designHandoff'
import { LLM_PROMPTS_DETAIL } from './caseStudies/llmPrompts'
import { ANCILLARY_JOURNEY_DETAIL } from './caseStudies/ancillaryJourney'
import { SIGNIFY_REBRAND_DETAIL } from './caseStudies/signifyRebrand'
import { HONEST_DESIGN_SYSTEM_DETAIL } from './caseStudies/honestDesignSystem'
import { PATTERN_LIBRARY_DETAIL } from './caseStudies/patternLibrary'
import { THE_PORTFOLIO_DETAIL } from './caseStudies/thePortfolio'

export const CASE_STUDY_REGISTRY: Record<string, CaseStudyDetail> = {
  'ai-agent': AI_AGENT_DETAIL,
  'people-first': PEOPLE_FIRST_DETAIL,
  'ihe-portal': IHE_PORTAL_DETAIL,
  'squarespace-redesign': SQUARESPACE_REDESIGN_DETAIL,
  'vivio': VIVIO_DETAIL,
  'design-handoff': DESIGN_HANDOFF_DETAIL,
  'llm-prompts': LLM_PROMPTS_DETAIL,
  'ancillary-journey': ANCILLARY_JOURNEY_DETAIL,
  'signify-rebrand': SIGNIFY_REBRAND_DETAIL,
  'honest-design-system': HONEST_DESIGN_SYSTEM_DETAIL,
  'pattern-library': PATTERN_LIBRARY_DETAIL,
  'the-portfolio': THE_PORTFOLIO_DETAIL,
}

export function getCaseStudyDetail(slug: string): CaseStudyDetail | null {
  return CASE_STUDY_REGISTRY[slug] ?? null
}
