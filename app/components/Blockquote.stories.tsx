import type { Meta, StoryObj } from '@storybook/react'
import Blockquote from './Blockquote'

const meta: Meta<typeof Blockquote> = {
  title: 'Core Components/Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Pull quote component with a red left border accent. Used to highlight key insights, direct quotes from research, or pivotal findings within case study narrative. Uses `--text-xl` (20px), font-serif, italic. The left border uses `--color-accent` and the background uses `--color-surface` to lift it slightly from the page.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Blockquote>

export const Default: Story = {
  args: {
    children: 'Before we start making things look pretty — tell me about yourself. Who are you, what do you do, and what kind of site are you trying to build?',
  },
}

export const ResearchFinding: Story = {
  args: {
    children: 'Members knew what the visiting clinician couldn\'t do. No blood draws, no prescriptions, no referrals. The visit felt like a checkbox exercise masquerading as care.',
  },
}
