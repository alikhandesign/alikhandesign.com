import type { Meta, StoryObj } from '@storybook/react'
import EpistemicBanner from './EpistemicBanner'

const meta: Meta<typeof EpistemicBanner> = {
  title: 'AI Patterns/EpistemicBanner',
  component: EpistemicBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Surfaces epistemic state before the response body. Distinguishes between a knowledge gap (training data missing), a principled limit (structurally cannot access), and probabilistic claims (response contains uncertain assertions). Appears only when the response meets a threshold — not on every response.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof EpistemicBanner>

export const KnowledgeGap: Story = {
  args: { type: 'knowledge-gap', message: 'This information falls outside my training data.', actionLabel: 'Run web search', onAction: () => {} }
}
export const PrincipledLimit: Story = {
  args: { type: 'principled-limit', message: 'I am structurally restricted from accessing private personal data.', actionLabel: 'View guardrails', onAction: () => {} }
}
export const Probabilistic: Story = {
  args: { type: 'probabilistic', message: 'This response contains claims that may vary — verify before acting.' }
}
