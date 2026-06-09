import type { Meta, StoryObj } from '@storybook/react'
import SuggestedPrompts from './SuggestedPrompts'

const meta: Meta<typeof SuggestedPrompts> = {
  title: 'Chat UI/SuggestedPrompts',
  component: SuggestedPrompts,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Shown in the empty state of the chat before any messages are sent. A warm neutral background section with a "Try asking" eyebrow and a row of pill buttons. Hidden once the conversation starts. Pills wrap on narrow viewports.',
      },
    },
  },
  argTypes: {
    prompts: {
      control: 'object',
      description: 'Array of prompt strings rendered as pill buttons.',
    },
    onSelect: { action: 'selected' },
  },
}

export default meta
type Story = StoryObj<typeof SuggestedPrompts>

export const Default: Story = {
  args: {
    prompts: [
      'Walk me through the AI agent project',
      'What is Ali\'s approach to UX research?',
      'What roles is Ali looking for?',
      'Tell me about the People-First redesign',
    ],
  },
}

export const Short: Story = {
  args: {
    prompts: ['Tell me about Ali', 'View recent work'],
  },
}
