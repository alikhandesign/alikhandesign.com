export type WorkType = 'case-study' | 'project'

export interface WorkItem {
  slug: string
  title: string
  type: WorkType
}

// Single source of truth for work order.
// The next/prev links on each page are derived from this list automatically.
// Case studies and projects are interleaved — update this order once
// all work pages are complete.
export const workItems: WorkItem[] = [
  // ── Case Studies ──────────────────────────────────────────────────────
  { slug: 'pattern-library',     title: 'AI Interface Pattern Library',       type: 'case-study' },
  { slug: 'ai-agent',            title: 'AI Feedback & Insights Agent',        type: 'case-study' },
  { slug: 'people-first',        title: 'People-First Enrollment Redesign',    type: 'case-study' },
  { slug: 'ihe-portal',          title: 'IHE Scheduling Portal',               type: 'case-study' },
  { slug: 'squarespace-redesign',title: 'From Checkboxes to Conversations',    type: 'case-study' },
  { slug: 'the-portfolio',       title: 'The Portfolio Is the Product',        type: 'case-study' },
  { slug: 'honest-design-system',title: 'Honest Design System',                type: 'case-study' },
  // ── Projects ─────────────────────────────────────────────────────────
  // Order TBD — add slugs here once project pages are complete
  { slug: 'vivio',               title: 'Vivio Clinical App',                  type: 'project'    },
  { slug: 'ancillary-journey',   title: 'Optimizing the Ancillary Insurance Journey', type: 'project' },
  { slug: 'signify-rebrand',     title: 'Signify Health Rebrand',              type: 'project'    },
  { slug: 'llm-prompts',         title: 'LLM Prompt Engineering for Website Audits', type: 'project' },
  { slug: 'design-handoff',      title: 'Design Handoff Checklist',            type: 'project'    },
]

/**
 * Returns the next work item for a given slug.
 * Wraps around — last item links back to first.
 * Returns null only if the slug isn't found.
 */
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

/**
 * Server-side: returns work items merged with KV overrides.
 * Order and visibility from KV take precedence over work.config.ts defaults.
 * Falls back to config file order with all items visible if KV has no data.
 * Only call this from server components or API routes.
 */
export async function getWorkItems(): Promise<(WorkItem & { visible: boolean })[]> {
  try {
    const { Redis } = await import('@upstash/redis')
    const kv = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })

    const [kvOrder, kvConfig] = await Promise.all([
      kv.get<string[]>('admin:work:order'),
      kv.get<Record<string, { visible: boolean }>>('admin:work:config'),
    ])

    // Determine order
    const orderedSlugs: string[] = kvOrder
      ? kvOrder
      : workItems.map(i => i.slug)

    // Build ordered list, merging visibility from KV
    return orderedSlugs
      .map(slug => workItems.find(i => i.slug === slug))
      .filter((item): item is WorkItem => !!item)
      .map(item => ({
        ...item,
        visible: kvConfig?.[item.slug]?.visible ?? true,
      }))
  } catch {
    // KV unavailable — return all items visible in config order
    return workItems.map(item => ({ ...item, visible: true }))
  }
}
