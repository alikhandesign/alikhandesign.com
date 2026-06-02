import type { Meta, StoryObj } from '@storybook/react'
import MetricCard from './MetricCard'

/**
 * MetricCard is used on the homepage Impact section to surface quantified outcomes
 * from case studies. It's the first content a visitor encounters after the hero —
 * a deliberate choice to lead with evidence before asking them to explore further.
 *
 * ## Design rationale
 * The card uses a 3px accent bar at the top as a visual anchor — the same pattern
 * used in the PasswordGate and Callout components. This creates a subtle but
 * consistent visual language across the system: a red top bar signals "this is
 * a highlighted or featured piece of content."
 *
 * The metric value is displayed in DM Serif Display at 3rem — the largest type
 * size used in any card component. This is intentional. The number is the message.
 * Everything else (company, description, CTA) is supporting context.
 *
 * ## Hover state
 * On hover the border transitions from `--border` to `--accent`. This matches the
 * hover behavior of FeaturedProjectCard and CaseStudyCard, creating a consistent
 * interactive affordance across all card types. The transition uses `--transition-base`
 * (150ms ease) for a snappy but not jarring response.
 *
 * ## Token standardization decision
 * During the build, the horizontal padding was originally set to `1.75rem` — a value
 * not in the spacing scale. This was corrected to `--space-8` (2rem) to maintain
 * token consistency. The visual difference is 4px and imperceptible in practice.
 *
 * ## Tokens used
 * - Background: `--surface`
 * - Border: `--border` (hover: `--accent`)
 * - Border radius: `--radius`
 * - Accent bar: 3px, `--accent`
 * - Padding: `--space-8` (2rem) all sides
 * - Company: 12px, `--text-muted`, uppercase, 0.1em letter spacing
 * - Value: 3rem, `--font-serif`, `--text`
 * - Description: 14px, `--text-muted`, line height 1.6
 * - CTA: 14px, `--accent`, weight 500
 *
 * ## Usage
 * Used exclusively on the homepage (`/`) in the Impact section.
 * Always appears in a 3-column grid. Each card links to its corresponding case study.
 */
const meta: Meta<typeof MetricCard> = {
  title: 'Card/MetricCard',
  tags: ['autodocs'],
  component: MetricCard,
  argTypes: {
    company: { control: 'text', description: 'Client or employer name. Displayed as small uppercase label.' },
    value: { control: 'text', description: 'The metric value. Displayed in DM Serif Display at 3rem. Can be a number, percentage, or formatted string like "8 hrs → 8 min".' },
    description: { control: 'text', description: 'One sentence explaining the metric in context.' },
    href: { control: 'text', description: 'Link to the corresponding case study.' },
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
