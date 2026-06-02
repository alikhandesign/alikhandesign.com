import type { Meta, StoryObj } from '@storybook/react'
import CalloutCard from './CalloutCard'

/**
 * CalloutCard is used in the About strip on the homepage to display the four
 * core values: Empathy, Curiosity, Honesty, and Giving Back.
 *
 * It uses a 3px left accent border — the same pattern as MetricCard and
 * PasswordGate — to signal elevated or featured content. The dark surface
 * background (`--dark-surface`) is designed to sit inside dark section contexts.
 *
 * Always rendered on a dark background. Never used on light surfaces.
 */
const meta: Meta<typeof CalloutCard> = {
  title: 'Card/CalloutCard',
  tags: ['autodocs'],
  component: CalloutCard,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    title: { control: 'text', description: 'Short label displayed in small uppercase text.' },
    body: { control: 'text', description: 'One sentence description of the value or concept.' },
  },
}

export default meta
type Story = StoryObj<typeof CalloutCard>

export const Default: Story = {
  args: {
    title: 'Empathy',
    body: 'Learned through research, not assumed.',
  },
}
