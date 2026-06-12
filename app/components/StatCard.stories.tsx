import type { Meta, StoryObj } from '@storybook/react'
import StatCard from './StatCard'

/**
 * Outcome metric card used in case study "The Outcomes" sections.
 * Displays a single stat — a large serif value and a short label — with a
 * 3px red accent bar along the top edge.
 *
 * Always used in a grid of 2–4. The grid wrapper lives in the page, not
 * in this component.
 *
 * ## Tokens used
 * - Background: `--color-surface`
 * - Border: `--color-border`
 * - Value: `--font-size-3xl`, `--color-accent`, font-serif
 * - Label: `--font-size-xs`, `--color-text-muted`
 * - Accent bar: `--color-accent`, 3px
 */
const meta: Meta<typeof StatCard> = {
  title: 'Core Components/Cards/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Default: Story = {
  args: {
    value: '45%',
    label: 'Faster time-to-convert',
  },
}

export const OutcomesGrid: Story = {
  name: 'Outcomes grid — production layout',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 560 }}>
      <StatCard value="45%" label="Faster time-to-convert" />
      <StatCard value="15%" label="Lift in total enrollments" />
      <StatCard value="50%" label="Reduction in rage clicks" />
      <StatCard value="33%" label="Increase in task completion" />
    </div>
  ),
}
