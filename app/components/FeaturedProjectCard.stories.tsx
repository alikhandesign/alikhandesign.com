import type { Meta, StoryObj } from '@storybook/react'
import FeaturedProjectCard from './FeaturedProjectCard'

const meta: Meta<typeof FeaturedProjectCard> = {
  title: 'Card/FeaturedProjectCard',
  component: FeaturedProjectCard,
  argTypes: {
    type: { control: 'select', options: ['Case Study', 'Project'] },
    title: { control: 'text' },
    company: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof FeaturedProjectCard>

export const Default: Story = {
  args: {
    type: 'Case Study',
    title: 'People-First Enrollment Redesign',
    company: 'Via Benefits · WTW',
    description: 'Dismantling a legacy product-first gate to drive a 15% lift in total enrollments and 45% faster time-to-convert.',
    href: '#',
  },
}
