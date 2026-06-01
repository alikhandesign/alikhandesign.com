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
 * - Single CTA label — "Read case study" or "View project" depending on type
 *
 * This hierarchy is deliberate. A hiring manager scanning the My Work page should
 * immediately understand that case studies are the primary evidence and projects
 * are supporting work — without reading a single word of explanation.
 *
 * ## The Type property
 * The `type` prop controls two things: the Tag variant (accent for Case Study,
 * default for Project) and the CTA label. This keeps the component flexible
 * without requiring two separate components for what is functionally the same pattern.
 *
 * ## Tokens used
 * - Background: `--surface`
 * - Border: `--border` (hover: `--accent` via `.work-card`)
 * - Border radius: `--radius`
 * - Image area height: 200px fixed
 * - Image placeholder: `--border`
 * - Title: 1.25rem, `--font-serif`, weight 400
 * - Company: 12px, `--text-muted`
 * - Description: 14px, `--text-muted`
 * - CTA: 13px, `--accent`, weight 500
 * - Content padding: 1.5rem (24px / `--space-6`)
 *
 * ## Usage
 * - Homepage (`/`): Featured Work section, shows 2 case studies side by side
 * - My Work (`/work`): Projects grid, shows up to 5 projects in a 3-column grid
 */
const meta: Meta<typeof FeaturedProjectCard> = {
  title: 'Card/FeaturedProjectCard',
  tags: ['autodocs'],
  component: FeaturedProjectCard,
  argTypes: {
    type: {
      control: 'select',
      options: ['Case Study', 'Project'],
      description: 'Controls the Tag variant and CTA label. Case Study uses accent Tag and "Read case study →". Project uses default Tag and "View project →".',
    },
    title: { control: 'text', description: 'Project title, displayed in DM Serif Display' },
    company: { control: 'text', description: 'Client or employer name' },
    description: { control: 'text', description: 'Short summary, 1-2 sentences' },
    href: { control: 'text', description: 'Link to the case study or project page' },
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
