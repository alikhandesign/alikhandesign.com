import type { Meta, StoryObj } from '@storybook/react'
import PullQuote from './PullQuote'

const meta: Meta<typeof PullQuote> = {
  title: 'Core Components/Typography/PullQuote',
  component: PullQuote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Typographically styled pull quote for case study narrative. Uses font-serif italic at `--font-size-xl` with a 3px red left border accent. Used to surface a key direct quote from research participants or a pivotal moment in the narrative. For highlighted findings with a title, use CalloutCard with `variant="light"` instead.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PullQuote>

export const Default: Story = {
  args: {
    children: 'Before we start making things look pretty — tell me about yourself. Who are you, what do you do, and what kind of site are you trying to build?',
  },
}
