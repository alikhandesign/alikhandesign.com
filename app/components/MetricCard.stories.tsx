import type { Meta, StoryObj } from '@storybook/react'
import MetricCard from './MetricCard'

const meta: Meta<typeof MetricCard> = {
  title: 'Card/MetricCard',
  tags: ['autodocs'],
  component: MetricCard,
  argTypes: {
    company: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
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
