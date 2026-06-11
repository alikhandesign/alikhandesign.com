import type { Meta, StoryObj } from '@storybook/react'
import CalloutCard from './CalloutCard'

/**
 * CalloutCard has two variants:
 *
 * **dark** (default) — Used in the About strip on the homepage to display the
 * four core values. Always rendered on a dark background. Red left border,
 * dark surface background, light text.
 *
 * **light** — Used within case study content to highlight key findings,
 * insights, or principles. White background, full border, red left border accent.
 *
 * ## Tokens used (dark)
 * - Background: `--color-surface-dark`
 * - Title: `--text-xs`, uppercase, `--color-bg`
 * - Body: `--text-sm`, `--color-text-on-dark`
 *
 * ## Tokens used (light)
 * - Background: `--color-surface`
 * - Border: `--color-border` (full) + `--color-accent` (left, 3px)
 * - Title: `--text-xs`, uppercase, `--color-text`
 * - Body: `--text-sm`, `--color-text-mid`
 */
const meta: Meta<typeof CalloutCard> = {
  title: 'Core Components/Cards/CalloutCard',
  tags: ['autodocs'],
  component: CalloutCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'dark: homepage AI principles section. light: case study findings and insights.',
    },
    title: { control: 'text' },
    body: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof CalloutCard>

export const Dark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: {
    variant: 'dark',
    title: 'Empathy',
    body: 'Learned through research, not assumed.',
  },
}

export const DarkGrid: Story = {
  name: 'Dark — Production Grid',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 560 }}>
      <CalloutCard variant="dark" title="Empathy" body="Learned through research, not assumed." />
      <CalloutCard variant="dark" title="Curiosity" body="Lifelong student of people and systems." />
      <CalloutCard variant="dark" title="Honesty" body="Data as a mediator, not decoration." />
      <CalloutCard variant="dark" title="Giving Back" body="Volunteering, fostering, pro bono work." />
    </div>
  ),
}

export const LightInsight: Story = {
  name: 'Light — Case Study Insight',
  args: {
    variant: 'light',
    title: 'AI used as decoration is worse than no AI',
    body: 'Features that invoke AI as a marketing claim while delivering pattern matching are not neutral. They create expectations they cannot meet.',
  },
}

export const LightFinding: Story = {
  name: 'Light — Research Finding',
  args: {
    variant: 'light',
    title: 'The one-sided exchange insight',
    body: 'Members knew what the visiting clinician could not do. The visit felt like a checkbox exercise masquerading as care.',
  },
}
