import type { Meta, StoryObj } from '@storybook/react'
import SectionLabel from './SectionLabel'

/**
 * SectionLabel is the eyebrow label used to introduce sections throughout the site.
 * It appears above section headings on the homepage, My Work page, and About page.
 *
 * ## Design rationale
 * The tighter letter spacing (`--letter-spacing-lg`, 0.12em) distinguishes this
 * component from body text and creates the visual separation needed for a label
 * that appears above a large heading. This value is the largest letter spacing
 * in the system — reserved for this component and related eyebrow treatments.
 * It signals hierarchy without requiring additional weight or size.
 *
 * ## Label casing
 * Pass `label` in natural casing (e.g. "Featured Work", not "FEATURED WORK").
 * The component applies `text-transform: uppercase` via CSS.
 *
 * ## Tokens used
 * - Default color: `--accent` (#89181A)
 * - Dark color: `--warm-300` (#C4BDB7) — for sufficient contrast on `--dark-bg`
 * - Font size: `--text-xs` (0.75rem / 12px)
 * - Font weight: `--font-weight-medium` (500)
 * - Letter spacing: `--letter-spacing-lg` (0.12em) — the largest in the system
 * - Transform: uppercase (CSS)
 *
 * ## Usage
 * Used above section headings throughout the site:
 * - Default variant: homepage Impact, Featured Work, My Work page header, About page sections
 * - Dark variant: About strip on the homepage (dark background section)
 */
const meta: Meta<typeof SectionLabel> = {
  title: 'Labels/SectionLabel',
  tags: ['autodocs'],
  component: SectionLabel,
  argTypes: {
    label: { control: 'text', description: 'The eyebrow text. Pass in natural casing — CSS applies uppercase transform.' },
    variant: { control: 'select', options: ['default', 'dark'], description: 'Default for light backgrounds. Dark for dark section backgrounds — uses --warm-300 for contrast.' },
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
