import type { Meta, StoryObj } from '@storybook/react'
import SectionLabel from './SectionLabel'

/**
 * SectionLabel is the eyebrow label used to introduce sections throughout the site.
 * It appears above section headings on the homepage, My Work page, and About page.
 *
 * ## Design rationale
 * The wide letter spacing (`--letter-spacing-lg`, 0.12em) distinguishes this
 * component from body text and creates the visual separation needed for a label
 * that appears above a large heading. This is the largest letter spacing in the
 * system — reserved for this component and related eyebrow treatments.
 *
 * ## Label casing
 * Pass `label` in natural casing (e.g. "Featured Work", not "FEATURED WORK").
 * The component applies `text-transform: uppercase` via the `.eyebrow` CSS class.
 *
 * ## Tokens used
 * - Default color: `--color-accent` (#89181A) via `.eyebrow` class
 * - Dark color: `--color-text-on-dark` (#C4BDB7) via `.eyebrow-dark` class
 * - Font size: `--font-size-xs` (0.75rem / 12px)
 * - Font weight: `--font-weight-medium` (500)
 * - Letter spacing: `--letter-spacing-lg` (0.12em)
 */
const meta: Meta<typeof SectionLabel> = {
  title: 'Core Components/Typography/SectionLabel',
  tags: ['autodocs'],
  component: SectionLabel,
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'dark'],
      description: 'Default for light backgrounds. Dark for dark section backgrounds.',
    },
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
