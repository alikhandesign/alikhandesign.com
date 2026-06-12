import type { Meta, StoryObj } from '@storybook/react'
import CTAStrip from './CTAStrip'

/**
 * CTAStrip is the dark call-to-action section that appears at the bottom of every
 * project and case study page. It's the conversion moment for high-intent visitors.
 *
 * ## Design rationale
 * The dark background (`--color-bg-dark`) creates a clear visual break between page
 * content and the CTA — signaling "this page is ending, here's what to do next"
 * without requiring a hard divider or modal. The eyebrow + serif heading + button
 * layout mirrors the homepage hero and About page contact card, creating
 * compositional consistency across high-intent moments on the site.
 *
 * ## Tokens used
 * - Background: `--color-bg-dark`
 * - Eyebrow: `.eyebrow-dark` class (`--font-size-xs`, `--letter-spacing-lg`, `--color-text-on-dark`)
 * - Title: `--font-size-2xl`, font-serif, weight 400, `--color-bg`
 */
const meta: Meta<typeof CTAStrip> = {
  title: 'Templates/CTAStrip',
  component: CTAStrip,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    eyebrow: { control: 'text', description: 'Small uppercase label above the title. Defaults to "Interested?"' },
    title: { control: 'text', description: 'The main heading. Should be an invitation, not a command.' },
    onContact: { description: 'Callback that opens ContactModal.' },
  },
}

export default meta
type Story = StoryObj<typeof CTAStrip>

export const Default: Story = {
  args: {
    eyebrow: 'Interested?',
    title: 'Interested in how this came together?',
    onContact: () => {},
  },
}
