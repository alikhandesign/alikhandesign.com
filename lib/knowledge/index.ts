// lib/knowledge/index.ts
// The always-in-context directory of every case study - one-line summary and
// tags per project, never the full four-lens detail. Deep detail for a
// specific project is retrieved on demand via the lookup_case_study tool,
// only for projects that have a corresponding file in ./caseStudies/.
//
// Tag confidence varies by project: some are drawn from detailed, repeatedly
// verified session content; others are lighter and more conservative where
// less has been directly re-verified here. Light tags are honest, not lazy -
// better to under-tag than to imply certainty about a stack or skill that
// hasn't actually been checked.

import type { CaseStudyIndexEntry } from './types'

export const CASE_STUDY_INDEX: CaseStudyIndexEntry[] = [
  {
    slug: 'ai-agent',
    title: 'AI Feedback & Insights Agent',
    oneLineSummary:
      'A self-initiated pipeline automating manual survey-comment categorization at WTW, taking accuracy from 78% to 95% through iterative refinement.',
    tags: {
      skills: ['AI product design', 'research synthesis', 'taxonomy design', 'prompt engineering'],
      stack: ['Qualtrics API', 'Qualtrics Text IQ', 'Microsoft Copilot Studio', 'Dataverse', 'Microsoft Teams'],
      roleType: ['AI interaction design', 'research operations'],
    },
  },
  {
    slug: 'people-first',
    title: 'People-First Enrollment Redesign',
    oneLineSummary:
      'Redesigned the first screen of WTW\'s Medicare shopping flow around how people actually shop, not the internal product taxonomy - the clearest example of research changing a stakeholder\'s mind.',
    tags: {
      skills: ['UX research', 'stakeholder influence', 'information architecture'],
      stack: ['FullStory'],
      roleType: ['product design', 'UX research'],
    },
  },
  {
    slug: 'ihe-portal',
    title: 'IHE Scheduling Portal',
    oneLineSummary:
      'Member-facing scheduling portal for in-home health evaluations, coordinating a large clinician network without clinicians being the portal\'s end users.',
    tags: {
      skills: ['member-facing healthcare UX', 'scheduling flows'],
      stack: [],
      roleType: ['product design'],
    },
  },
  {
    slug: 'squarespace-redesign',
    title: 'From Checkboxes to Conversations',
    oneLineSummary:
      'A competitive audit and redesign proposal reframing a settings-heavy AI product surface as a conversational interaction, documenting real failure modes across the audited surface.',
    tags: {
      skills: ['AI interaction design', 'competitive audit', 'conversational UI'],
      stack: [],
      roleType: ['AI interaction design'],
    },
  },
  {
    slug: 'honest-design-system',
    title: 'Honest Design System',
    oneLineSummary:
      'A personal design system built and documented from scratch, with every component required to have a live consumer before being considered complete.',
    tags: {
      skills: ['design systems', 'component architecture', 'documentation'],
      stack: ['Figma', 'Storybook', 'React', 'TypeScript'],
      roleType: ['design systems'],
    },
  },
  {
    slug: 'pattern-library',
    title: 'AI Interaction Pattern Library',
    oneLineSummary:
      'An audit of six AI products (ChatGPT, Claude, Gemini, Perplexity, and others) to find where interface design still assumes deterministic software, turned into a documented pattern library.',
    tags: {
      skills: ['competitive audit', 'AI interaction design', 'pattern documentation'],
      stack: [],
      roleType: ['AI interaction design', 'research'],
    },
  },
  {
    slug: 'ancillary-journey',
    title: 'Optimizing the Ancillary Insurance Journey',
    oneLineSummary:
      'A research study identifying friction in how retirees discover and enroll in ancillary insurance products alongside their primary Medicare plan.',
    tags: {
      skills: ['UX research', 'journey mapping'],
      stack: ['Figma Slides'],
      roleType: ['UX research'],
    },
  },
  {
    slug: 'vivio',
    title: 'Vivio Clinical App',
    oneLineSummary:
      'FDA-cleared clinical diagnostic app designed as sole designer with no primary research budget - strong diagnostic outcomes, with an honestly-acknowledged gap in real clinician workflow validation.',
    tags: {
      skills: ['clinical/medical device UX', 'FDA-regulated design', 'secondary research'],
      stack: [],
      roleType: ['clinical product design'],
    },
  },
  {
    slug: 'design-handoff',
    title: 'Design Handoff Checklist',
    oneLineSummary:
      'A mandatory Ready-for-Dev protocol adopted across 15 teams and 150+ developers, gating design handoff on documented breakpoints, state logic, and interaction logic.',
    tags: {
      skills: ['design ops', 'cross-functional process design', 'design systems governance'],
      stack: ['Jira'],
      roleType: ['design ops'],
    },
  },
  {
    slug: 'llm-prompts',
    title: 'LLM Prompt Engineering for Website Audits',
    oneLineSummary:
      'A structured LLM prompt framework built as an audit toolkit, with a documented accessibility-auditing application.',
    tags: {
      skills: ['prompt engineering', 'accessibility auditing'],
      stack: ['Microsoft Edge'],
      roleType: ['AI interaction design'],
    },
  },
  {
    slug: 'signify-rebrand',
    title: 'Signify Health Rebrand',
    oneLineSummary:
      'Visual rebrand work at Signify Health.',
    tags: {
      skills: ['visual design', 'brand'],
      stack: [],
      roleType: ['visual design'],
    },
  },
  {
    slug: 'the-portfolio',
    title: 'The Portfolio Is the Product',
    oneLineSummary:
      'This site itself as a case study - the Portfolio Assistant, its eval framework, deployment safety practices, and this knowledge-base architecture, all treated as a live, ongoing product.',
    tags: {
      skills: ['AI interaction design', 'full-stack design engineering', 'evaluation methodology'],
      stack: ['Next.js', 'TypeScript', 'React', 'Vercel', 'Claude API'],
      roleType: ['AI interaction design', 'design engineering'],
    },
  },
  {
    slug: 'portfolio-assistant',
    title: 'The Portfolio Assistant',
    oneLineSummary:
      'The AI chatbot on this site itself - a real, shipped example of system prompt design, guardrails, an automated eval framework, native tool-calling, on-demand retrieval, and prompt caching, with a real, tested debugging history behind it.',
    tags: {
      skills: ['AI interaction design', 'prompt engineering', 'evaluation methodology', 'guardrail design'],
      stack: ['Claude API', 'Next.js', 'TypeScript', 'Vercel', 'Upstash Redis'],
      roleType: ['AI interaction design', 'design engineering'],
    },
  },
]

export function formatIndexForPrompt(): string {
  return CASE_STUDY_INDEX.map((entry) => {
    const allTags = [...entry.tags.skills, ...entry.tags.stack, ...entry.tags.roleType].join(', ')
    return `[${entry.slug}] ${entry.title} — ${entry.oneLineSummary} (tags: ${allTags})`
  }).join('\n')
}
