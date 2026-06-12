import type { Meta, StoryObj } from '@storybook/react'
import CalloutCard from './CalloutCard'

/**
 * CalloutCard has two variants:
 *
 * **dark** — Used in the About strip on the homepage to display the four core
 * values. Always rendered on a dark background. Red left border, dark surface
 * background, light text.
 *
 * **light** — Used within case study content to highlight a key finding,
 * insight, or principle. White background, full border, 3px red left accent.
 *
 * ## Tokens used (dark)
 * - Background: `--color-surface-dark`
 * - Title: `--font-size-xs`, uppercase, `--color-bg`
 * - Body: `--font-size-sm`, `--color-text-on-dark`
 *
 * ## Tokens used (light)
 * - Background: `--color-surface`
 * - Border: `--color-border` (top/right/bottom) + `--color-accent` (left, 3px)
 * - Title: `--font-size-xs`, uppercase, `--color-text`
 * - Body: `--font-size-sm`, `--color-text-mid`
 */
const meta: Meta<typeof CalloutCard> = {
  title: 'Core Components/Cards/CalloutCard',
  tags: ['autodocs'],
  component: CalloutCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'dark: homepage values section. light: case study findings and insights.',
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
  name: 'Dark — production grid',
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

export const Light: Story = {
  args: {
    variant: 'light',
    title: 'AI used as decoration is worse than no AI',
    body: 'Features that invoke AI as a marketing claim while delivering pattern matching are not neutral. They create expectations they cannot meet.',
  },
}
