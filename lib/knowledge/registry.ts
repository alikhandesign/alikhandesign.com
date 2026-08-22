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

export const CASE_STUDY_REGISTRY: Record<string, CaseStudyDetail> = {
  'ai-agent': AI_AGENT_DETAIL,
}

export function getCaseStudyDetail(slug: string): CaseStudyDetail | null {
  return CASE_STUDY_REGISTRY[slug] ?? null
}
