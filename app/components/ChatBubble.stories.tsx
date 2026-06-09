import type { Meta, StoryObj } from '@storybook/react'
import ChatBubble from './ChatBubble'

const meta: Meta<typeof ChatBubble> = {
  title: 'Chat UI/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A single chat message bubble. User messages are right-aligned with a dark fill and a 2px tail on the bottom-right corner. Assistant messages are left-aligned with a surface background, border, and a 2px tail on the bottom-left corner.',
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant'],
      description: 'Determines alignment, color, and tail direction.',
    },
    content: {
      control: 'text',
      description: 'Message text. Preserves whitespace and line breaks.',
    },
  },
}

export default meta
type Story = StoryObj<typeof ChatBubble>

export const User: Story = {
  args: {
    role: 'user',
    content: 'Walk me through the AI agent project.',
  },
}

export const Assistant: Story = {
  args: {
    role: 'assistant',
    content: 'The AI agent project was a 0-to-1 design effort for an internal tool that automated benefits enrollment research. I led end-to-end UX — from defining the agent interaction model to designing the source attribution UI that made AI outputs trustworthy to compliance teams.',
  },
}

export const MultiLine: Story = {
  args: {
    role: 'assistant',
    content: 'There were three main challenges:\n\n1. Making AI confidence legible to non-technical users\n2. Designing for partial or stalled responses\n3. Keeping the interface fast when context windows were large',
  },
}
