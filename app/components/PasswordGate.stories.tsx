import type { Meta, StoryObj } from '@storybook/react'
import PasswordGate from './PasswordGate'

const meta: Meta<typeof PasswordGate> = {
  title: 'Password Gate/PasswordGate',
  component: PasswordGate,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    cta: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PasswordGate>

export const Default: Story = {
  args: {
    password: '4likh4n',
    title: 'Participant Listening Agent — Full Case Study',
    cta: 'This case study contains proprietary workflow details and internal research findings.',
    inside: [
      'Full research methodology and interview guides',
      'Agentic pipeline architecture diagrams',
      'Internal validation results and accuracy breakdown',
      'Stakeholder presentation deck',
    ],
    children: <p>Unlocked content here.</p>,
  },
}
