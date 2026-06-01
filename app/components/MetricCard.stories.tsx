import type { Meta, StoryObj } from '@storybook/react'
import MetricCard from './MetricCard'

const meta: Meta<typeof MetricCard> = {
  title: 'Card/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
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

export const WithLongValue: Story = {
  args: {
    company: 'WTW',
    value: '8 hrs → 8 min',
    description: 'Research synthesis time slashed using an agentic AI pipeline with 95% categorization accuracy.',
    href: '#',
  },
}
