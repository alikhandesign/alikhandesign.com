import type { Meta, StoryObj } from '@storybook/react'
import StatusBadge from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'AI Patterns/Generation/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Communicates AI generation state. Used in Generation States and Error States patterns. Four semantic states map to distinct visual treatments — thinking, streaming, complete, and hung — to ensure users can distinguish between active generation and a frozen state.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof StatusBadge>

export const Thinking: Story = { args: { state: 'thinking', label: 'Thinking', pulse: true } }
export const Streaming: Story = { args: { state: 'streaming', label: 'Generating', pulse: true } }
export const Complete: Story = { args: { state: 'complete', label: 'Complete' } }
export const Hung: Story = { args: { state: 'hung', label: 'Response stalled', pulse: false } }
export const Error: Story = { args: { state: 'error', label: 'Error' } }
export const Warning: Story = { args: { state: 'warning', label: 'Warning' } }

