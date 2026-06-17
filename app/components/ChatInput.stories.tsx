import type { Meta, StoryObj } from '@storybook/react'
import ChatInput from './ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'AI Patterns/Chat/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The chat input area. Contains an auto-resizing textarea (grows up to 160px, resets on send) and a context-aware action button — "Send →" in idle state, "Pause & edit" with a pause icon during streaming. Disabled state reduces opacity and blocks interaction when the rate limit is reached.',
      },
    },
  },
  argTypes: {
    value: { control: 'text', description: 'Current input value.' },
    disabled: { control: 'boolean', description: 'Disables input and send button. Used when rate limit is reached.' },
    streaming: { control: 'boolean', description: 'When true, shows the Pause & edit button instead of Send.' },
    placeholder: { control: 'text', description: 'Textarea placeholder text.' },
    onSend: { action: 'sent' },
    onPauseEdit: { action: 'paused' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Idle: Story = {
  args: {
    value: '',
    disabled: false,
    streaming: false,
    placeholder: "Ask about Ali's work, background, or approach...",
  },
}

export const WithValue: Story = {
  args: {
    value: 'What is Ali\'s approach to UX research?',
    disabled: false,
    streaming: false,
  },
}

export const Streaming: Story = {
  args: {
    value: '',
    disabled: false,
    streaming: true,
  },
}

export const Disabled: Story = {
  args: {
    value: '',
    disabled: true,
    streaming: false,
    placeholder: 'Rate limit reached.',
  },
}

