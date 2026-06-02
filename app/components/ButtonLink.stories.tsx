import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

/**
 * ButtonLink is a text-based navigation link used throughout the site for
 * secondary CTAs — "Read case study", "View project", and "Read my full story".
 *
 * ## Variants
 * **Normal:** Used on light backgrounds. Accent color text, no underline.
 * The standard CTA at the bottom of cards and sections.
 *
 * **Underline:** Used on dark backgrounds. White text with a 1px accent-color
 * underline. Used in the About strip on the homepage for "Read my full story →".
 * The underline provides contrast against the dark background where accent-colored
 * text alone would be too subtle.
 *
 * All instances use `--text-base` (1rem / 16px) — standardized during the build
 * to replace inconsistent 12px, 13px, and 14px values found across the codebase.
 */
const meta: Meta<typeof ButtonLink> = {
  title: 'Button/ButtonLink',
  tags: ['autodocs'],
  component: ButtonLink,
  argTypes: {
    label: { control: 'text', description: 'Link label text. Arrow (→) is appended automatically.' },
    href: { control: 'text', description: 'Destination URL.' },
    variant: { control: 'select', options: ['normal', 'underline'], description: 'Normal for light backgrounds. Underline for dark backgrounds.' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonLink>

export const Normal: Story = {
  args: { label: 'Read case study', href: '#', variant: 'normal' },
}

export const Underline: Story = {
  args: { label: 'Read my full story', href: '#', variant: 'underline' },
  parameters: { backgrounds: { default: 'dark' } },
}
