import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

/**
 * ButtonLink is a text-based navigation link used throughout the site for
 * secondary CTAs — "Read case study", "View project", and "Read my full story".
 *
 * ## Variant: Normal
 * Used on light backgrounds. Accent color text, no underline. The standard
 * CTA at the bottom of cards and sections.
 *
 * ## Variant: Underline
 * Used when a link needs to stand out against a non-accent background — for
 * example, on the About/dark strip ("Read my full story →") and inline on
 * the My Work page where the chat link sits in body-colored text. The optional
 * `color` prop overrides the default white, allowing the underline variant to
 * work on light surfaces too.
 *
 * ## Tokens used
 * - Normal color: `--color-accent`
 * - Underline default color: `--color-bg` (white, for dark backgrounds)
 * - Underline border: `--color-accent`
 * - Font size: `--font-size-sm`
 * - Font weight: `--font-weight-medium` (500)
 */
const meta: Meta<typeof ButtonLink> = {
  title: 'Core Components/Actions/ButtonLink',
  tags: ['autodocs'],
  component: ButtonLink,
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    variant: {
      control: 'select',
      options: ['normal', 'underline'],
      description: 'Normal for accent-colored CTAs. Underline when the link sits within non-accent text.',
    },
    color: {
      control: 'text',
      description: 'Overrides default link color. Use for underline variant on light backgrounds.',
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonLink>

export const Normal: Story = {
  args: { label: 'Read case study', href: '#', variant: 'normal' },
}

// TODO: per-story background default not applying in Storybook 10 Docs view.
// Toggle background manually using the toolbar. Tracked for future fix.
export const UnderlineDark: Story = {
  name: 'Underline — dark background',
  args: { label: 'Read my full story', href: '#', variant: 'underline' },
  parameters: { backgrounds: { default: 'dark' } },
}

export const UnderlineLight: Story = {
  name: 'Underline — light background',
  args: {
    label: 'Try the AI assistant',
    href: '/chat',
    variant: 'underline',
    color: 'var(--color-text)',
  },
}
