import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyCard from './CaseStudyCard'

const meta: Meta<typeof CaseStudyCard> = {
  title: 'Card/CaseStudyCard',
  component: CaseStudyCard,
  argTypes: {
    title: { control: 'text' },
    company: { control: 'text' },
    description: { control: 'text' },
  },
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
      { val: '3.5M+', label: 'Annual evaluations supported' },
    ],
    href: '#',
  },
}
