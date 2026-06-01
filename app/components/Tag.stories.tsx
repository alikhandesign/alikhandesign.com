import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

/**
 * Tag is used throughout the site to communicate content type and discipline.
 * It has two variants with distinct semantic meaning — they are not interchangeable.
 *
 * ## Variant: Default
 * Used for discipline tags — the areas of practice associated with a piece of work.
 * Examples: "UX Research", "AI Design", "Product Strategy".
 * Styled with a warm neutral background (`--warm-75`) and muted text (`--text-muted`).
 * Multiple default tags can appear together on a single card.
 *
 * ## Variant: Accent
 * Used exclusively to signal content type — specifically "Case Study".
 * Styled with the accent background (`--accent-bg`, red/50) and accent text (`--accent`).
 * There is only ever one accent tag per card, and it always reads "Case Study".
 *
 * ## Why the distinction matters
 * The accent variant functions as a content type signal, not a discipline label.
 * A visitor scanning the My Work page can immediately identify case studies by
 * the red tag before reading the title or description. This reduces cognitive load
 * and helps hiring managers find the work most relevant to their evaluation.
 *
 * Using color to communicate content type — rather than relying on layout or
 * position alone — is an accessibility-informed decision. It creates a redundant
 * signal that works even when visual hierarchy is flattened on smaller screens.
 *
 * ## Tokens used
 * - Default background: `--warm-75` (#F2EFE9)
 * - Default text: `--text-muted`
 * - Accent background: `--accent-bg` (#FDF0F0, red/50)
 * - Accent text: `--accent` (#89181A, red/700)
 * - Font size: `--text-xs` (0.75rem / 12px)
 * - Font weight: 500 (medium)
 * - Letter spacing: 0.08em
 * - Border radius: `--radius` (4px)
 * - Padding: 4px 10px
 *
 * ## Usage rules
 * - Accent variant: one per card, always "Case Study", always first in the tag row
 * - Default variant: one or more per card, discipline labels only
 * - Never use accent for anything other than content type signaling
 */
const meta: Meta<typeof Tag> = {
  title: 'Tag/Tag',
  tags: ['autodocs'],
  component: Tag,
  argTypes: {
    label: {
      control: 'text',
      description: 'The text displayed inside the tag. For accent variant, always use "Case Study".',
    },
    variant: {
      control: 'select',
      options: ['default', 'accent'],
      description: 'Default for discipline tags. Accent for content type signal (Case Study only).',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: { label: 'UX Research', variant: 'default' },
}

export const Accent: Story = {
  args: { label: 'Case Study', variant: 'accent' },
}
