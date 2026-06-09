import type { Meta, StoryObj } from '@storybook/react'
import GenerationState from './GenerationState'

const meta: Meta<typeof GenerationState> = {
  title: 'Chat UI/GenerationState',
  component: GenerationState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Inline status indicator shown in the chat thread while the assistant is responding. Two active phases — Thinking (warning amber) and Generating (success olive) — with a pulsing dot. Complete, Stalled, and Error phases show a static dot for terminal states.',
      },
    },
  },
  argTypes: {
    phase: {
      control: 'select',
      options: ['thinking', 'generating', 'complete', 'stalled', 'error'],
      description: 'Current generation phase. Thinking and Generating animate; the rest are static.',
    },
  },
}

export default meta
type Story = StoryObj<typeof GenerationState>

export const Thinking: Story = { args: { phase: 'thinking' } }
export const Generating: Story = { args: { phase: 'generating' } }
export const Complete: Story = { args: { phase: 'complete' } }
export const Stalled: Story = { args: { phase: 'stalled' } }
export const Error: Story = { args: { phase: 'error' } }
