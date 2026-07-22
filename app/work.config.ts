export type WorkType = 'case-study' | 'project'

export interface WorkItem {
  slug: string
  title: string
  type: WorkType
}

// Single source of truth for work order.
// The next/prev links on each page are derived from this list automatically.
export const workItems: WorkItem[] = [
  // ── Case Studies ──────────────────────────────────────────────────────
  { slug: 'ai-agent',            title: 'AI Feedback & Insights Agent',        type: 'case-study' },
  { slug: 'people-first',        title: 'People-First Enrollment Redesign',    type: 'case-study' },
  { slug: 'pattern-library',     title: 'AI Interface Pattern Library',        type: 'case-study' },
  { slug: 'ihe-portal',          title: 'IHE Scheduling Portal',               type: 'case-study' },
  { slug: 'squarespace-redesign',title: 'From Checkboxes to Conversations',    type: 'case-study' },
  { slug: 'the-portfolio',       title: 'The Portfolio Is the Product',        type: 'case-study' },
  { slug: 'honest-design-system',title: 'Honest Design System',                type: 'case-study' },
  // ── Projects ─────────────────────────────────────────────────────────
  { slug: 'vivio',               title: 'Vivio Clinical App',                  type: 'project'    },
  { slug: 'ancillary-journey',   title: 'Optimizing the Ancillary Insurance Journey', type: 'project' },
  { slug: 'signify-rebrand',     title: 'Signify Health Rebrand',              type: 'project'    },
  { slug: 'llm-prompts',         title: 'LLM Prompt Engineering for Website Audits', type: 'project' },
  { slug: 'design-handoff',      title: 'Design Handoff Checklist',            type: 'project'    },
]

// Metadata for each work item when surfaced in the Featured Work section
export const featuredMeta: Record<string, { company: string; description: string }> = {
  'ai-agent':             { company: 'Willis Towers Watson', description: 'An agentic AI pipeline that automated qualitative synthesis — reducing a full day of analysis to minutes with 95% accuracy.' },
  'people-first':         { company: 'Via Benefits · WTW',   description: 'Dismantling a legacy product-first gate to drive a 15% lift in total enrollments and 45% faster time-to-convert.' },
  'pattern-library':      { company: 'Self-initiated',       description: 'An empirically grounded pattern library treating AI-specific interaction problems — uncertainty, silence, failure, correction — as a distinct design domain.' },
  'ihe-portal':           { company: 'Signify Health',       description: 'Research-led redesign of a scheduling portal to remove trust and access barriers for Medicare members declining a free clinical service.' },
  'squarespace-redesign': { company: 'Self-initiated',       description: 'A systematic audit of Squarespace\'s AI tools across two user journeys — uncovering 20 distinct failure modes and the design decisions that caused them.' },
  'the-portfolio':        { company: 'Self-initiated',       description: 'Building a portfolio from scratch as a deliberate demonstration of craft — the site itself as the argument for why the work matters.' },
  'honest-design-system': { company: 'Self-initiated',       description: 'A token-first design system built specifically for this portfolio — Figma and code in 1:1 correspondence, with a live Storybook documentation site.' },
  'vivio':                { company: 'Ventric Health',       description: 'Zero-to-one design system and native iOS app for a non-invasive heart failure diagnostic tool — designed for failure states as carefully as the happy path.' },
  'ancillary-journey':    { company: 'Willis Towers Watson', description: 'Mixed-methods research into how Medicare enrollees navigate ancillary insurance — mapping comprehension gaps across the shopping flow to surface actionable findings.' },
  'signify-rebrand':      { company: 'Signify Health',       description: 'Brand and web redesign translating an evolved mission into a live digital experience — resulting in a 50% increase in website traffic post-launch.' },
  'llm-prompts':          { company: 'Willis Towers Watson', description: 'A structured prompt framework for AI-powered UX audits — producing heuristic-grounded, prioritized findings in hours instead of days.' },
  'design-handoff':       { company: 'Willis Towers Watson', description: 'A shared design-to-development handoff framework that eliminated implicit expectations and reduced rework across design and engineering teams.' },
}

export interface NextWork {
  title: string
  href: string
  type: WorkType
}

export function getNextWork(slug: string): NextWork | null {
  const index = workItems.findIndex(item => item.slug === slug)
  if (index === -1) return null
  const next = workItems[(index + 1) % workItems.length]
  return { title: next.title, href: `/work/${next.slug}`, type: next.type }
}

export async function getWorkItems(): Promise<(WorkItem & { visible: boolean })[]> {
  try {
    const { getWorkKVConfig } = await import('@/lib/kv')
    const { order: kvOrder, config: kvConfig } = await getWorkKVConfig()
    const orderedSlugs: string[] = kvOrder ? kvOrder : workItems.map(i => i.slug)
    return orderedSlugs
      .map(slug => workItems.find(i => i.slug === slug))
      .filter((item): item is WorkItem => !!item)
      .map(item => ({ ...item, visible: kvConfig?.[item.slug]?.visible ?? true }))
  } catch {
    return workItems.map(item => ({ ...item, visible: true }))
  }
}

export async function getFeaturedSlugs(): Promise<string[]> {
  try {
    const { getWorkKVConfig } = await import('@/lib/kv')
    const { featured } = await getWorkKVConfig()
    if (Array.isArray(featured) && featured.length > 0) return featured
    return ['ai-agent', 'people-first']
  } catch {
    return ['ai-agent', 'people-first']
  }
}
