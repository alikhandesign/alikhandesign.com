import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

/**
 * Button is the primary call-to-action component. Used for the main CTA on the
 * homepage hero ("View My Work") and inside PasswordGate ("View Full Case Study").
 *
 * Styled with `--accent` background and `--bg` text. On hover the background
 * transitions to `--accent-dark`. Uses `--font-sans` at `--text-base` (1rem)
 * with medium weight and 0.02em letter spacing.
 *
 * For text-only links, use ButtonLink instead.
 */
const meta: Meta<typeof Button> = {
  title: 'Button/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    label: { control: 'text', description: 'Button label text. Arrow (→) is appended automatically.' },
    fullWidth: { control: 'boolean', description: 'When true, button expands to fill its container. Used inside PasswordGate.' },
    type: { control: 'select', options: ['button', 'submit'], description: 'HTML button type attribute.' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { label: 'View My Work' },
}
