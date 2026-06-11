import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyDetails from './CaseStudyDetails'

const meta: Meta<typeof CaseStudyDetails> = {
  title: 'Core Components/CaseStudyDetails',
  component: CaseStudyDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Details bar for case study and project pages. Displays structured metadata — My Role, Timeline, Methods, Output — in a horizontal strip with a border above and below. Labels use `--text-xs` uppercase, values use `--text-sm` medium weight. Renders inside the `.details-bar` CSS class which handles layout and responsive stacking.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyDetails>

export const Default: Story = {
  args: {
    items: [
      { label: 'My Role', value: 'UX Researcher & Designer' },
      { label: 'Methods', value: 'Qualitative Interviews, Thematic Synthesis, Service Blueprinting' },
      { label: 'Timeline', value: '6 months' },
      { label: 'Output', value: 'Research report, Portal redesign, Stakeholder presentation' },
    ],
  },
}

export const Minimal: Story = {
  args: {
    items: [
      { label: 'My Role', value: 'Senior Product Designer' },
      { label: 'Timeline', value: '3 months' },
    ],
  },
}
