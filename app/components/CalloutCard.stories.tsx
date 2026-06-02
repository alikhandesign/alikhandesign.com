import type { Meta, StoryObj } from '@storybook/react'
import CalloutCard from './CalloutCard'

/**
 * CalloutCard is used in the About strip on the homepage to display the four
 * core values: Empathy, Curiosity, Honesty, and Giving Back.
 *
 * It uses a 3px left accent border — the same pattern as MetricCard and
 * PasswordGate — to signal elevated or featured content within a dark surface.
 * This is a deliberate cross-component visual language: red left border = highlighted content.
 *
 * Always rendered on a dark background (`--dark-surface`).
 * Never used on light surfaces.
 *
 * ## Title casing
 * Pass `title` in natural casing (e.g. "Empathy", not "EMPATHY").
 * The component applies `text-transform: uppercase` via CSS.
 *
 * ## Tokens used
 * - Background: `--dark-surface`
 * - Left border: 3px solid `--accent`
 * - Border radius: `0 --radius --radius 0`
 * - Padding: `--space-4` (1rem)
 * - Title: `--text-xs`, `--letter-spacing-md`, uppercase, `--font-weight-semibold`, `--bg`
 * - Body: `--text-base`, `--warm-300` (#C4BDB7), line height 1.5
 *
 * ## Usage
 * Used exclusively in the About strip on the homepage (`/`).
 * Always appears as a 2×2 grid of four cards, one per core value.
 */
const meta: Meta<typeof CalloutCard> = {
  title: 'Card/CalloutCard',
  tags: ['autodocs'],
  component: CalloutCard,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    title: { control: 'text', description: 'Short label for the value or concept. Pass in natural casing — CSS handles uppercase transform.' },
    body: { control: 'text', description: 'One sentence description. Recommended max ~80 characters.' },
  },
}

export default meta
type Story = StoryObj<typeof CalloutCard>

export const Empathy: Story = {
  args: { title: 'Empathy', body: 'Learned through research, not assumed.' },
}

export const Curiosity: Story = {
  args: { title: 'Curiosity', body: 'Lifelong student of people and systems.' },
}

export const Honesty: Story = {
  args: { title: 'Honesty', body: 'Data as a mediator, not decoration.' },
}

export const GivingBack: Story = {
  name: 'Giving Back',
  args: { title: 'Giving Back', body: 'Volunteering, fostering, pro bono work.' },
}

export const AllValues: Story = {
  name: 'All Values (Production Grid)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 560 }}>
      <CalloutCard title="Empathy" body="Learned through research, not assumed." />
      <CalloutCard title="Curiosity" body="Lifelong student of people and systems." />
      <CalloutCard title="Honesty" body="Data as a mediator, not decoration." />
      <CalloutCard title="Giving Back" body="Volunteering, fostering, pro bono work." />
    </div>
  ),
}
