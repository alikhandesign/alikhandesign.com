import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

/**
 * ButtonLink is a text-based navigation link used throughout the site for
 * secondary CTAs — "Read case study", "View project", and "Read my full story".
 *
 * ## Variant: Normal
 * Used on light backgrounds. Accent color text, no underline.
 * The standard CTA at the bottom of cards and sections.
 *
 * ## Variant: Underline
 * Used on dark backgrounds only. White (`--bg`) text with a 1px `--accent`
 * underline and 2px bottom padding. Used in the About strip on the homepage
 * for "Read my full story →". The underline provides contrast against the dark
 * background where accent-colored text alone would be too subtle.
 *
 * All instances use `--text-base` (0.875rem / 14px) — standardized during the
 * build to replace inconsistent 12px, 13px, and 14px values found across the codebase.
 *
 * ## Tokens used
 * - Normal color: `--accent`
 * - Underline color: `--bg` (text) + `--accent` (border)
 * - Font size: `--text-base` (0.875rem / 14px)
 * - Font weight: `--font-weight-medium` (500)
 *
 * ## Usage
 * Used on FeaturedProjectCard, CaseStudyCard, and inline in page sections.
 */
const meta: Meta<typeof ButtonLink> = {
  title: 'Button/ButtonLink',
  tags: ['autodocs'],
  component: ButtonLink,
  argTypes: {
    label: { control: 'text', description: 'Link label text. Arrow (→) is appended automatically. Keep concise.' },
    href: { control: 'text', description: 'Destination URL. Use relative paths for internal links.' },
    variant: { control: 'select', options: ['normal', 'underline'], description: 'Normal for light backgrounds. Underline for dark backgrounds only.' },
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
