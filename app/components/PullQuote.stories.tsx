import type { Meta, StoryObj } from '@storybook/react'
import PullQuote from './PullQuote'

const meta: Meta<typeof PullQuote> = {
  title: 'Core Components/Typography/PullQuote',
  component: PullQuote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Typographically styled pull quote for case study narrative. Uses font-serif italic at `--text-xl` with a red left border accent. Used to surface a key direct quote from research participants or a pivotal moment in the narrative. For highlighted findings with a title, use CalloutCard with `variant="light"` instead.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PullQuote>

export const Default: Story = {
  args: {
    children: 'Before we start making things look pretty — tell me about yourself. Who are you, what do you do, and what kind of site are you trying to build?',
  },
}

export const ResearchQuote: Story = {
  args: {
    children: 'I know it\'s free but it just feels like they\'re trying to sell me something.',
  },
}
