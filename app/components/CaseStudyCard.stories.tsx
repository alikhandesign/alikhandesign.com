import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyCard from './CaseStudyCard'

const meta: Meta<typeof CaseStudyCard> = {
  title: 'Card/CaseStudyCard',
  component: CaseStudyCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CaseStudyCard>

export const Default: Story = {
  args: {
    title: 'AI Feedback & Insights Agent',
    company: 'Willis Towers Watson',
    tags: ['Agentic Workflow Design', 'AI Design'],
    description: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy.',
    outcomes: [
      { val: '95%', label: 'Categorization accuracy' },
      { val: '8 hrs → 8 min', label: 'Synthesis time reduction' },
    ],
    href: '#',
  },
}

export const MultipleOutcomes: Story = {
  args: {
    title: 'People-First Enrollment Redesign',
    company: 'Via Benefits · WTW',
    tags: ['UX Research', 'Product Strategy'],
    description: 'Dismantled a legacy product-first gate causing cognitive overwhelm and high abandonment.',
    outcomes: [
      { val: '45%', label: 'Faster time-to-convert' },
      { val: '15%', label: 'Lift in enrollments' },
      { val: '50%', label: 'Reduction in rage clicks' },
    ],
    href: '#',
  },
}
