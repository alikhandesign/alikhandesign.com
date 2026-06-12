import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyPage from './CaseStudyPage'
import Body from './Body'
import PullQuote from './PullQuote'

const meta: Meta<typeof CaseStudyPage> = {
  title: 'Templates/CaseStudyPage',
  component: CaseStudyPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Shell component for all case study pages. Encodes consistent layout: breadcrumb, header (title, company, tags, hook), optional header metrics, optional details bar, optional side nav, body content via children, CTA strip, and next case study/project. All case study pages use this component as their root.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyPage>

export const Default: Story = {
  args: {
    title: 'AI Feedback & Insights Agent',
    company: 'Willis Towers Watson',
    tags: ['Agentic Workflow Design', 'AI Design'],
    hook: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy.',
    metrics: [
      { value: '95%', label: 'Categorization accuracy' },
      { value: '8 hrs → 8 min', label: 'Synthesis time reduction' },
    ],
    details: [
      { label: 'My Role', value: 'Senior Product Designer' },
      { label: 'Timeline', value: '4 months' },
      { label: 'Methods', value: 'Agentic AI Design, Qualitative Research' },
      { label: 'Output', value: 'Production pipeline, Research report' },
    ],
    cta: { title: 'Interested in working together?' },
    next: { title: 'People-First Enrollment Redesign', href: '/work/people-first', type: 'case-study' },
    children: (
      <div>
        <Body>This is where the case study body content goes. Each section uses Body, Blockquote, and other components to build the narrative.</Body>
        <PullQuote>A key insight or pull quote from the research.</PullQuote>
        <Body mb={false}>The final paragraph with no bottom margin.</Body>
      </div>
    ),
  },
}

export const WithSideNav: Story = {
  args: {
    ...Default.args,
    sections: ['the-context', 'the-problem', 'the-research', 'the-outcome'],
  },
}

export const ProjectNext: Story = {
  args: {
    ...Default.args,
    next: { title: 'Vivio Clinical App', href: '/work/vivio', type: 'project' },
  },
}
