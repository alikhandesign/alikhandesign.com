import type { Meta, StoryObj } from '@storybook/react'
import Body from './Body'

const meta: Meta<typeof Body> = {
  title: 'Core Components/Typography/Body',
  component: Body,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Standard body copy paragraph used throughout case study and project pages. Defaults to `--font-size-sm` (14px) and `--color-text-mid`. The `size` prop steps up to `--font-size-base` (16px) for intro paragraphs. The `mb` prop controls bottom margin — set to false on the last paragraph in a sequence.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base'],
      description: 'sm (14px) for body copy. base (16px) for intro paragraphs.',
    },
    mb: {
      control: 'boolean',
      description: 'Bottom margin. Set to false on the last paragraph in a sequence.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Body>

export const Default: Story = {
  args: {
    children: 'The research surfaced six distinct barrier categories. Each one mapped to a specific failure in how the product communicated value, trust, and process to users who were already skeptical before the first touchpoint.',
    size: 'sm',
    mb: true,
  },
}

export const Intro: Story = {
  args: {
    children: 'For 40 years, Medicare enrollment meant sitting across from a benefits counselor. Conversational AI is changing that.',
    size: 'base',
    color: 'var(--color-text)',
  },
}

export const Sequence: Story = {
  name: 'Sequence — production layout',
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <Body>The research surfaced six distinct barrier categories. Each one mapped to a specific failure in how the product communicated value, trust, and process to users who were already skeptical before the first touchpoint.</Body>
      <Body>Rather than redesigning the visual layer, we redesigned the information architecture — leading with identity and trust signals before asking users to make any decisions about their coverage.</Body>
      <Body mb={false}>The result was a 45% improvement in time-to-convert and a 15% lift in total enrollments within the first enrollment season after launch.</Body>
    </div>
  ),
}
