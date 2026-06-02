import type { Meta, StoryObj } from '@storybook/react'
import SectionLabel from './SectionLabel'

/**
 * SectionLabel is the eyebrow label used to introduce sections throughout the site.
 * It appears above section headings on the homepage, My Work page, and About page.
 *
 * Uses `--text-xs` (0.75rem / 12px), medium weight, 0.12em letter spacing,
 * and uppercase transform — the tightest letter spacing in the system, reserved
 * for this component and the accent bar on cards.
 *
 * The Dark variant uses `--warm-300` (#C4BDB7) for sufficient contrast against
 * dark section backgrounds (`--dark-bg`).
 */
const meta: Meta<typeof SectionLabel> = {
  title: 'Labels/SectionLabel',
  tags: ['autodocs'],
  component: SectionLabel,
  argTypes: {
    label: { control: 'text', description: 'The eyebrow text. Always rendered uppercase.' },
    variant: { control: 'select', options: ['default', 'dark'], description: 'Default for light backgrounds. Dark for dark section backgrounds.' },
  },
}

export default meta
type Story = StoryObj<typeof SectionLabel>

export const Default: Story = {
  args: { label: 'Featured Work', variant: 'default' },
}

export const Dark: Story = {
  args: { label: 'About Me', variant: 'dark' },
  parameters: { backgrounds: { default: 'dark' } },
}
