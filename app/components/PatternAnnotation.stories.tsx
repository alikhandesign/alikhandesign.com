import type { Meta, StoryObj } from '@storybook/react'
import PatternAnnotation from './PatternAnnotation'

const meta: Meta<typeof PatternAnnotation> = {
  title: 'Core Components/Documentation/PatternAnnotation',
  component: PatternAnnotation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Editorial annotation that anchors each interactive demo to a specific audit finding. Always appears above demo controls — framing what the user is about to see before they interact. Used consistently across all six AI Interface Patterns.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof PatternAnnotation>

export const Default: Story = {
  args: {
    finding: 'Observed in Claude, ChatGPT, Gemini, and Perplexity. In every case, the streaming indicator continued running with no visual distinction between active generation and a frozen state. No product escalated to an error state — users had no signal to wait or intervene.',
  },
}

