// lib/sources.ts
// Single source of truth for all referenceable pages on alikhandesign.com.
// Used in the system prompt (to tell the model what it can cite) and in the
// chat UI (to render source cards in the Source Inspector).

export interface SiteSource {
  id: number
  title: string
  url: string
  description: string // One sentence — used in system prompt and source card subtitle
}

export const SITE_SOURCES: SiteSource[] = [
  {
    id: 1,
    title: 'AI Feedback & Insights Agent',
    url: '/work/ai-agent',
    description: 'Agentic AI research pipeline at WTW — automated qualitative synthesis, PHI/PII redaction, and daily stakeholder reporting. 95% accuracy, 8+ hours to minutes.',
  },
  {
    id: 2,
    title: 'People-First Enrollment Redesign',
    url: '/work/people-first',
    description: 'Identity-first redesign of the Via Benefits Medicare enrollment entry point. 45% faster time-to-convert, 15% lift in enrollments, 50% reduction in rage clicks.',
  },
  {
    id: 3,
    title: 'IHE Scheduling Portal',
    url: '/work/ihe-portal',
    description: 'Trust-first redesign of the Signify Health in-home evaluation scheduling portal, based on qualitative research into six barrier categories.',
  },
  {
    id: 4,
    title: 'From Checkboxes to Conversations',
    url: '/work/squarespace-redesign',
    description: 'Self-initiated audit of Squarespace Blueprint AI — 22 prompts, 20 failure modes, three redesigned moments, and a working interactive prototype.',
  },
  {
    id: 5,
    title: 'About Ali',
    url: '/about',
    description: 'Ali\'s background, design philosophy, three pillars, and what he\'s looking for next.',
  },
  {
    id: 6,
    title: 'Honest Design System',
    url: '/work/honest-design-system',
    description: 'A token-based design system built for AI product interfaces — components, semantic tokens, and Storybook documentation.',
  },
  {
    id: 7,
    title: 'AI Interaction Pattern Library',
    url: '/work/pattern-library',
    description: 'An audit of six AI products to find where interface design still assumes deterministic software, then a pattern library built from what broke — source attribution, uncertainty communication, generation states, and more.',
  },
  {
    id: 8,
    title: 'Optimizing the Ancillary Insurance Journey',
    url: '/work/ancillary-journey',
    description: 'Qualitative research into Medicare enrollee navigation of dental, vision, and hearing coverage at WTW.',
  },
  {
    id: 9,
    title: 'Vivio Clinical App',
    url: '/work/vivio',
    description: 'Zero-to-one native iOS design for a heart failure diagnostic tool at Ventric Health, including a full design system achieving 1:1 code parity.',
  },
  {
    id: 10,
    title: 'Design Handoff Checklist',
    url: '/work/design-handoff',
    description: 'A mandatory Ready-for-Dev protocol built into the Jira workflow at WTW, standardizing design-to-dev handoff across 15 teams and 150+ developers.',
  },
  {
    id: 11,
    title: 'LLM Prompt Engineering for Website Audits',
    url: '/work/llm-prompts',
    description: 'A structured LLM prompt framework at WTW enforcing UX, engineering, accessibility, and content standards, deployed as an audit toolkit inside Microsoft Edge.',
  },
  {
    id: 12,
    title: 'Signify Health Rebrand',
    url: '/work/signify-rebrand',
    description: 'Led the website redesign translating Signify Health\'s new brand identity, developed with W2O Group, into a live digital experience.',
  },
  {
    id: 13,
    title: 'The Portfolio Is the Product',
    url: '/work/the-portfolio',
    description: 'A self-initiated rebuild of this portfolio site from scratch — a custom design system, AI used as an execution layer rather than a design substitute, shipped in under two weeks.',
  },
  {
    id: 14,
    title: 'AI Interaction Patterns (reference)',
    url: '/patterns',
    description: 'The live, documented pattern library itself — individual patterns like generation states, uncertainty communication, and source attribution, each with implementation detail.',
  },
]

// Formatted for injection into the system prompt
export function formatSourcesForPrompt(): string {
  return SITE_SOURCES.map(s => `[${s.id}] ${s.title} — ${s.description}`).join('\n')
}
