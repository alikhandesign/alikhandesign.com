import type { Meta, StoryObj } from '@storybook/react'
import MetricCard from './MetricCard'

/**
 * MetricCard is used on the homepage Impact section to surface quantified outcomes
 * from case studies. It's the first content a visitor encounters after the hero —
 * a deliberate choice to lead with evidence before asking them to explore further.
 *
 * ## Design rationale
 * The card uses a 3px accent bar at the top as a visual anchor — the same pattern
 * used in PasswordGate and CalloutCard. This creates a consistent visual language
 * across the system: a red top or left accent bar signals highlighted content.
 *
 * The metric value is displayed in DM Serif Display at `--text-5xl` (3rem) — the
 * largest type size used in any card component. This is intentional. The number
 * is the message. Everything else is supporting context.
 *
 * ## Hover state
 * On hover, the border transitions from `--border` to `--accent` via `--transition-base`
 * (150ms ease). Consistent with FeaturedProjectCard and CaseStudyCard — all card
 * types share this interactive affordance.
 *
 * ## Token standardization
 * During the build, horizontal padding was originally set to `1.75rem` — a value
 * not in the spacing scale. This was corrected to `--space-8` (2rem). The visual
 * difference is 4px and imperceptible in practice.
 *
 * ## No variants, no tags, no image
 * MetricCard has no type variants, no tag row, and no image area. It is a single-
 * purpose component: one company, one metric, one description, one CTA link.
 *
 * ## Value prop format
 * The value prop accepts any string. Common formats: percentage ("45%"), ratio
 * ("8 hrs → 8 min"), score ("73 NPS"), or large number ("3.5M+"). For long
 * formatted strings, the component wraps naturally — recommended max ~20 characters
 * to avoid awkward line breaks at 3rem in DM Serif Display.
 *
 * ## Tokens used
 * - Background: `--surface`
 * - Border: `--border` (hover: `--accent`)
 * - Border radius: `--radius`
 * - Accent bar: 3px, `--accent`
 * - Padding: `--space-8` (2rem) all sides
 * - Company: `--text-xs`, `--letter-spacing-md`, uppercase, `--text-muted`, `--font-weight-medium`
 * - Value: `--text-5xl` (3rem), `--font-serif`, `--text`, line height 1
 * - Description: `--text-base`, `--text-muted`, line height 1.6
 * - CTA: `--text-base`, `--accent`, `--font-weight-medium`
 *
 * ## Usage
 * Used exclusively on the homepage (`/`) in the Impact section.
 * Always appears as exactly 3 cards in a 3-column grid — one per case study.
 */
const meta: Meta<typeof MetricCard> = {
  title: 'Card/MetricCard',
  tags: ['autodocs'],
  component: MetricCard,
  argTypes: {
    company: { control: 'text', description: 'Client or employer name. Displayed as small uppercase label above the metric.' },
    value: { control: 'text', description: 'The metric value at 3rem. Accepts any string — percentage, ratio, score, or number. Recommended max ~20 characters.' },
    description: { control: 'text', description: 'One sentence explaining the metric in context.' },
    href: { control: 'text', description: 'Link to the corresponding case study page.' },
  },
}

export default meta
type Story = StoryObj<typeof MetricCard>

export const Default: Story = {
  args: {
    company: 'Via Benefits',
    value: '45%',
    description: 'Faster time-to-convert after replacing a product-first gate with an identity-driven enrollment flow.',
    href: '#',
  },
}

export const LongValue: Story = {
  name: 'Long Value Format',
  args: {
    company: 'WTW',
    value: '8 hrs → 8 min',
    description: 'Research synthesis time reduced using an agentic AI pipeline with 95% categorization accuracy.',
    href: '#',
  },
}
