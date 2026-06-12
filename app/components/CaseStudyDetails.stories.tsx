import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyDetails from './CaseStudyDetails'

const meta: Meta<typeof CaseStudyDetails> = {
  title: 'Core Components/Content/CaseStudyDetails',
  component: CaseStudyDetails,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'warm' },
    docs: {
      description: {
        component: 'Details card for case study and project pages. Displays structured metadata — My Role, Timeline, Methods, Output — in a 2-column grid inside a white card with a subtle border. Labels use `--font-size-xs` uppercase with wide letter spacing. Values use `--font-size-sm` medium weight. The card sits between the hero image and the body content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyDetails>

export const Default: Story = {
  args: {
    items: [
      { label: 'My Role', value: 'Senior Product Designer (self-initiated)' },
      { label: 'Output', value: 'Competitive audit, pattern definitions, React implementation, design system components' },
      { label: 'Timeline', value: '2025–2026' },
      { label: 'Status', value: 'Phase 1 complete — conversational AI patterns' },
    ],
  },
}

export const Minimal: Story = {
  args: {
    items: [
      { label: 'My Role', value: 'Senior Product Designer' },
      { label: 'Timeline', value: 'Q2 2023' },
    ],
  },
}
