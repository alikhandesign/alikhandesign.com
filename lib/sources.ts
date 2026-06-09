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
    url: '/work/ai-insights-agent',
    description: 'Agentic AI research pipeline at WTW — automated qualitative synthesis, PHI/PII redaction, and daily stakeholder reporting. 95% accuracy, 8+ hours to minutes.',
  },
  {
    id: 2,
    title: 'People-First Enrollment Redesign',
    url: '/work/people-first-enrollment',
    description: 'Identity-first redesign of the Via Benefits Medicare enrollment entry point. 45% faster time-to-convert, 15% lift in enrollments, 50% reduction in rage clicks.',
  },
  {
    id: 3,
    title: 'IHE Scheduling Portal',
    url: '/work/ihe-scheduling',
    description: 'Trust-first redesign of the Signify Health in-home evaluation scheduling portal, based on qualitative research into six barrier categories.',
  },
  {
    id: 4,
    title: 'From Checkboxes to Conversations',
    url: '/work/squarespace-ai',
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
    title: 'AI Pattern Library',
    url: '/patterns',
    description: 'A documented library of interaction patterns for AI product interfaces — source attribution, epistemic transparency, generation states, and more.',
  },
  {
    id: 8,
    title: 'Optimizing the Ancillary Insurance Journey',
    url: '/work/ancillary-insurance',
    description: 'Qualitative research into Medicare enrollee navigation of dental, vision, and hearing coverage at WTW.',
  },
]

// Formatted for injection into the system prompt
export function formatSourcesForPrompt(): string {
  return SITE_SOURCES.map(s => `[${s.id}] ${s.title} — ${s.description}`).join('\n')
}
