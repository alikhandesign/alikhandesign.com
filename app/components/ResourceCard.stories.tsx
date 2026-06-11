import type { Meta, StoryObj } from '@storybook/react'
import ResourceCard from './ResourceCard'

const meta: Meta<typeof ResourceCard> = {
  title: 'Core Components/Cards/ResourceCard',
  component: ResourceCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Link card for surfacing external resources within case study content. Displays a bold title, supporting description, and a red arrow on the right. Used for audit spreadsheets, interactive prototypes, GitHub repos, and other supplementary materials. Set `external={true}` for links that open in a new tab.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ResourceCard>

export const External: Story = {
  args: {
    title: 'Full audit spreadsheet',
    description: '22 documented intents · user quotes · failure mode taxonomy',
    href: 'https://docs.google.com/spreadsheets/d/example',
    external: true,
  },
}

export const Internal: Story = {
  args: {
    title: 'Interactive prototype',
    description: 'Built in React and Vercel — all three moments interactive',
    href: '/prototype',
    external: false,
  },
}

export const MultipleResources: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 600 }}>
      <ResourceCard
        title="Full audit spreadsheet"
        description="22 documented intents · user quotes · failure mode taxonomy"
        href="https://docs.google.com/spreadsheets/d/example"
        external
      />
      <ResourceCard
        title="Interactive prototype"
        description="Built in React and Vercel — all three moments interactive"
        href="/prototype"
      />
    </div>
  ),
}
