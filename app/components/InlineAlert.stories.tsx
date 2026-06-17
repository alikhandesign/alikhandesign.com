import type { Meta, StoryObj } from '@storybook/react'
import InlineAlert from './InlineAlert'

const meta: Meta<typeof InlineAlert> = {
  title: 'AI Patterns/Response/InlineAlert',
  component: InlineAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Contextual alert used across Error States, Limitation Handling, and Uncertainty Communication patterns. Left-border treatment carries semantic weight — color encodes error type. Always includes a recovery action where one exists.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof InlineAlert>

export const Info: Story = {
  args: { variant: 'info', title: 'Info', children: 'This is an informational message.' }
}
export const Warning: Story = {
  args: { variant: 'warning', title: 'Data gap', children: 'This information falls outside my training data.', action: { label: 'Run web search', onClick: () => {} } }
}
export const ErrorState: Story = {
  args: { variant: 'error', title: 'Generation stalled', children: 'The response stopped mid-stream. Your prompt has been preserved.', action: { label: 'Retry', onClick: () => {} }, secondaryAction: { label: 'Copy prompt', onClick: () => {} } }
}
export const Success: Story = {
  args: { variant: 'success', title: 'Complete', children: 'Response generated successfully.' }
}
export const Neutral: Story = {
  args: { variant: 'neutral', title: 'Capability limit', children: 'I cannot book flights directly, but I can draft your itinerary.' }
}

