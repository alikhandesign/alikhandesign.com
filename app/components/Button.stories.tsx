import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

/**
 * Button is the primary call-to-action component. Used for the main CTA on the
 * homepage hero ("View My Work") and inside PasswordGate ("View Full Case Study").
 *
 * Styled with `--accent` background and `--bg` text. On hover the background
 * transitions to `--accent-dark` via `--transition-base` (150ms ease).
 * Uses `--font-sans` at `--text-base` with `--font-weight-medium` and
 * `--letter-spacing-sm` (0.02em).
 *
 * Arrow (→) is always appended to the label and marked `aria-hidden`.
 * Focus visible styles apply a 2px `--accent` outline with 3px offset.
 *
 * For text-only links, use ButtonLink instead.
 *
 * ## Tokens used
 * - Background: `--accent` (hover: `--accent-dark`)
 * - Text: `--bg`
 * - Font size: `--text-base` (0.875rem / 14px)
 * - Font weight: `--font-weight-medium` (500)
 * - Letter spacing: `--letter-spacing-sm` (0.02em)
 * - Border radius: `--radius` (4px)
 * - Padding: 0.8rem `--space-8`
 * - Gap: `--space-2`
 * - Transition: background `--transition-base`
 */
const meta: Meta<typeof Button> = {
  title: 'Button/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    label: { control: 'text', description: 'Button label text. Arrow (→) is appended automatically. Keep concise — aim for 3 words or fewer.' },
    fullWidth: { control: 'boolean', description: 'When true, button expands to fill its container width with centered text. Used inside PasswordGate.' },
    type: { control: 'select', options: ['button', 'submit'], description: 'HTML button type attribute.' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { label: 'View My Work' },
}

export const FullWidth: Story = {
  args: { label: 'View Full Case Study', fullWidth: true },
  parameters: {
    layout: 'padded',
  },
}
