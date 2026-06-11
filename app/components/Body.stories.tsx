import type { Meta, StoryObj } from '@storybook/react'
import Body from './Body'

const meta: Meta<typeof Body> = {
  title: 'Core Components/Typography/Body',
  component: Body,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Standard body copy paragraph used throughout case study and project pages. Uses `--text-sm` (14px), `--color-text-mid`, and a generous line height of 1.85 for comfortable reading. The `mb` prop controls whether bottom margin is applied -- set to false on the last paragraph in a sequence.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Body>

export const Default: Story = {
  args: {
    children: 'The research surfaced six distinct barrier categories. Each one mapped to a specific failure in how the product communicated value, trust, and process to users who were already skeptical before the first touchpoint.',
    mb: true,
  },
}

export const NoMargin: Story = {
  args: {
    children: 'This is the last paragraph in a sequence. No bottom margin is applied.',
    mb: false,
  },
}

export const Sequence: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <Body>The research surfaced six distinct barrier categories. Each one mapped to a specific failure in how the product communicated value, trust, and process to users who were already skeptical before the first touchpoint.</Body>
      <Body>Rather than redesigning the visual layer, we redesigned the information architecture — leading with identity and trust signals before asking users to make any decisions about their coverage.</Body>
      <Body mb={false}>The result was a 45% improvement in time-to-convert and a 15% lift in total enrollments within the first enrollment season after launch.</Body>
    </div>
  ),
}
