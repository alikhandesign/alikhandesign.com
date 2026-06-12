import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

/**
 * Tag is used throughout the site to communicate content type and discipline.
 * It has two variants with distinct semantic meaning — they are not interchangeable.
 *
 * ## Variant: Default
 * Used for discipline tags — the areas of practice associated with a piece of work.
 * Examples: "UX Research", "AI Design", "Product Strategy".
 * Styled with `--color-surface-subtle` background and `--color-text-muted` text.
 * Multiple default tags can appear together on a single card.
 *
 * ## Variant: Accent
 * Used exclusively to signal content type — specifically "Case Study".
 * Styled with `--color-accent-bg` (red/50) background and `--color-accent` text.
 * There is only ever one accent tag per card, and it always reads "Case Study".
 *
 * On CaseStudyCard, the accent tag is prepended automatically by the component —
 * consumers do not pass it in the tags array. The component enforces the convention
 * at the code level.
 *
 * On FeaturedProjectCard, the tag is derived entirely from the `type` prop.
 *
 * The accent variant does not enforce its label — passing `variant="accent"` with
 * any string other than "Case Study" is a misuse of the pattern. It is a design
 * convention, not a code constraint.
 *
 * ## Why the distinction matters
 * The accent variant functions as a content type signal, not a discipline label.
 * A visitor scanning the My Work page can identify case studies by the red tag
 * before reading the title or description. This reduces cognitive load and helps
 * hiring managers find the work most relevant to their evaluation.
 *
 * Using color to communicate content type — rather than relying on layout alone —
 * is an accessibility-informed decision. It creates a redundant signal that works
 * even when visual hierarchy is flattened on smaller screens.
 *
 * ## Tokens used
 * - Default background: `--color-surface-subtle` (#F2EFE9)
 * - Default text: `--color-text-muted`
 * - Accent background: `--color-accent-bg` (#FDF0F0, red/50)
 * - Accent text: `--color-accent` (#89181A, red/700)
 * - Font size: `--font-size-xs` (0.75rem / 12px)
 * - Font weight: `--font-weight-medium` (500)
 * - Letter spacing: `--letter-spacing-md` (0.08em)
 * - Border radius: `--radius-sm` (4px)
 * - Padding: 4px 10px (intentionally hardcoded — not on the spacing scale)
 *
 * ## Usage rules
 * - Accent: one per card, always "Case Study", always first in the tag row
 * - Default: one or more per card, discipline labels only
 * - Never use accent for anything other than content type signaling
 *
 * ## Usage
 * Used in the tag row on FeaturedProjectCard, CaseStudyCard, and the My Work
 * filter tabs. Always rendered uppercase via CSS — pass labels in natural casing.
 */
const meta: Meta<typeof Tag> = {
  title: 'Core Components/Labels/Tag',
  tags: ['autodocs'],
  component: Tag,
  argTypes: {
    label: {
      control: 'text',
      description: 'The text displayed inside the tag. Pass in natural casing — CSS applies uppercase. For accent variant, always use "Case Study" (not enforced by code, but a design convention).',
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

export const MultiTagRow: Story = {
  name: 'Multi-Tag Row',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag label="Case Study" variant="accent" />
      <Tag label="UX Research" variant="default" />
      <Tag label="AI Design" variant="default" />
    </div>
  ),
}
