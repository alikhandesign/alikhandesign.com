import type { Meta, StoryObj } from '@storybook/react'
import ResourceCard from './ResourceCard'

/**
 * Link card for surfacing supplementary materials within case study content.
 * Displays a bold title, supporting description, and a red arrow on the right.
 *
 * Used for audit spreadsheets, interactive prototypes, GitHub repos, and other
 * resources attached to a case study. Set `external={true}` for links that
 * open in a new tab.
 *
 * ## Tokens used
 * - Background: `--color-surface`
 * - Border: `--color-border`
 * - Title: `--font-size-sm`, `--font-weight-semibold`, `--color-text`
 * - Description: `--font-size-sm`, `--color-text-muted`
 * - Arrow: `--color-accent`
 */
const meta: Meta<typeof ResourceCard> = {
  title: 'Core Components/Cards/ResourceCard',
  component: ResourceCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
    external: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ResourceCard>

export const Default: Story = {
  args: {
    title: 'Full audit spreadsheet',
    description: '22 documented intents · user quotes · failure mode taxonomy',
    href: 'https://docs.google.com/spreadsheets/d/example',
    external: true,
  },
}

export const MultipleResources: Story = {
  name: 'Multiple resources — production layout',
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
