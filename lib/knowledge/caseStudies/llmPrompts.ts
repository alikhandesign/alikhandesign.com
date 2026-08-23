// lib/knowledge/caseStudies/llmPrompts.ts
import type { CaseStudyDetail } from '../types'

export const LLM_PROMPTS_DETAIL: CaseStudyDetail = {
  slug: 'llm-prompts',

  outcome:
    'An LLM-powered website audit engine [11] that started as a UX-only request and became a cross-functional tool covering UX, engineering, accessibility, and content standards, after Ali discovered the same enforcement gap existed across all four disciplines. It uses a weighted rubric and severity scoring, and cut page review time from hours to minutes.',

  businessConstraint:
    'The tool put expertise that used to bottleneck on one or two specialists - especially in content strategy - into anyone\'s hands, rather than requiring a specialist reviewer for every page audit. This reflects a broader shift in how Ali thinks about impact: building infrastructure and standards that let other people do better work without him being in the room, rather than measuring his contribution only by what he personally ships.',

  technicalConstraint:
    'Structured as a prompt framework enforcing standards across four distinct disciplines (UX, engineering, accessibility, content) with a weighted rubric and severity scoring, rather than a single-purpose UX-only checker. Specific model, integration, or deployment details beyond this are not documented.',

  doNotFabricate: [
    'This expanded from an initial UX-only audit request to cover four disciplines specifically because Ali found the same enforcement gap existed across all of them - it wasn\'t originally scoped as a four-discipline tool from the start.',
    'No specific accuracy, adoption, or usage metrics beyond "hours to minutes" review time are documented - do not invent a percentage or adoption count.',
  ],
}
