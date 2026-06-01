import type { Meta, StoryObj } from '@storybook/react'
import FeaturedProjectCard from './FeaturedProjectCard'

const meta: Meta<typeof FeaturedProjectCard> = {
  title: 'Card/FeaturedProjectCard',
  component: FeaturedProjectCard,
  tags: ['autodocs'],
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

export const CaseStudy: Story = {
  args: {
    type: 'Case Study',
    title: 'People-First Enrollment Redesign',
    company: 'Via Benefits · WTW',
    description: 'Dismantling a legacy product-first gate to drive a 15% lift in total enrollments and 45% faster time-to-convert.',
    href: '#',
  },
}

export const Project: Story = {
  args: {
    type: 'Project',
    title: 'Optimizing the Ancillary Insurance Journey',
    company: 'Willis Towers Watson',
    description: 'A qualitative deep dive into how Medicare enrollees navigate dental, vision, and hearing coverage.',
    href: '#',
  },
}
