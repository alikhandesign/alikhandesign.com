import type { Meta, StoryObj } from '@storybook/react'
import FeaturedProjectCard from './FeaturedProjectCard'

/**
 * FeaturedProjectCard is a single component used in two contexts: the homepage
 * featured work section and the My Work page's projects grid.
 *
 * ## Design rationale
 * The decision to use one component across both contexts — rather than a separate
 * HomepageCard and ProjectCard — reflects a core systems principle: if two things
 * look the same and do the same job, they should be the same component.
 *
 * Compared to CaseStudyCard, FeaturedProjectCard is intentionally simpler:
 * - Vertical layout (not horizontal) — takes less visual space, appropriate for
 *   content that doesn't need the same weight as a deep case study
 * - No outcomes metrics — projects show range and craft, not quantified impact
 * - Smaller image area — reinforces the lighter-touch nature of the content
 *
 * This hierarchy is deliberate. A hiring manager scanning the My Work page should
 * immediately understand that case studies are the primary evidence and projects
 * are supporting work — without reading a single word of explanation.
 *
 * ## Hover state
 * On hover, the border transitions from `--border` to `--accent` via `--transition-base`
 * (150ms ease). Consistent with CaseStudyCard and MetricCard — all card types share
 * this interactive affordance.
 *
 * ## The Type property
 * The `type` prop controls two things: the Tag variant (accent for Case Study,
 * default for Project) and the CTA label ("Read case study →" or "View project →").
 * Tags are derived entirely from `type` — there is no separate `tags` prop on this
 * component, unlike CaseStudyCard. This keeps the API minimal and prevents
 * misconfiguration.
 *
 * ## Token standardization
 * During the build, font size values were inconsistently set to raw pixel values
 * (12px, 13px, 14px) in the original implementation. These were corrected to use
 * token references (`--text-xs`, `--text-base`) as part of a codebase-wide
 * font size standardization pass.
 *
 * ## Image area
 * The image area currently renders as a warm placeholder (`--border` fill, 200px
 * fixed height). An `imageSrc` prop will be added when case study assets are finalized.
 *
 * ## Tokens used
 * - Background: `--surface`
 * - Border: `--border` (hover: `--accent`)
 * - Border radius: `--radius`
 * - Image area: 200px fixed height, `--border` fill
 * - Content padding: `--space-6` (1.5rem)
 * - Title: `--text-xl`, `--font-serif`, weight 400, line height 1.25
 * - Company: `--text-xs`, `--text-muted`, `--letter-spacing-sm`
 * - Description: `--text-base`, `--text-muted`, line height 1.6
 * - CTA: `--text-base`, `--accent`, `--font-weight-medium`
 *
 * ## Usage
 * - Homepage (`/`): Featured Work section, 2 cards side by side
 * - My Work (`/work`): Projects grid, up to 5 cards in a 3-column grid
 */
const meta: Meta<typeof FeaturedProjectCard> = {
  title: 'Core Components/Cards/FeaturedProjectCard',
  tags: ['autodocs'],
  component: FeaturedProjectCard,
  argTypes: {
    type: {
      control: 'select',
      options: ['Case Study', 'Project'],
      description: 'Controls the Tag variant and CTA label. Also determines the image placeholder label. Tags are derived from type — there is no separate tags prop.',
    },
    title: { control: 'text', description: 'Project title, displayed in DM Serif Display.' },
    company: { control: 'text', description: 'Client or employer name.' },
    description: { control: 'text', description: 'Short summary. Aim for 1-2 sentences.' },
    href: { control: 'text', description: 'Full relative URL to the case study or project page.' },
  },
}

export default meta
type Story = StoryObj<typeof FeaturedProjectCard>

export const CaseStudyType: Story = {
  name: 'Type — Case Study',
  args: {
    type: 'Case Study',
    title: 'People-First Enrollment Redesign',
    company: 'Via Benefits · WTW',
    description: 'Dismantling a legacy product-first gate to drive a 15% lift in total enrollments and 45% faster time-to-convert.',
    href: '#',
  },
}

export const ProjectType: Story = {
  name: 'Type — Project',
  args: {
    type: 'Project',
    title: 'Optimizing the Ancillary Insurance Journey',
    company: 'Willis Towers Watson',
    description: 'A qualitative deep dive into how Medicare enrollees navigate dental, vision, and hearing coverage — identifying comprehension gaps and friction points.',
    href: '#',
  },
}
