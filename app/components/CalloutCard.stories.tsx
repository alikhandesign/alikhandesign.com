import type { Meta, StoryObj } from '@storybook/react'
import CalloutCard from './CalloutCard'

const meta: Meta<typeof CalloutCard> = {
  title: 'Card/CalloutCard',
  component: CalloutCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof CalloutCard>

export const Default: Story = {
  args: {
    title: 'Empathy',
    body: 'Learned through research, not assumed.',
  },
  parameters: { backgrounds: { default: 'dark' } },
}
