import type { Meta, StoryObj } from '@storybook/react'
import Heading from './Heading'

/**
 * Serif heading used throughout the site for all major headings and section titles.
 * Always rendered in DM Serif Display at weight 400 — the typeface was designed
 * for display use and its lighter weight is what gives it an editorial quality.
 *
 * ## Size scale
 * The `size` prop maps directly to font-size tokens. Default sizes per level:
 * - h1 → `--font-size-4xl` (40px) — page titles, hero headings
 * - h2 → `--font-size-3xl` (32px) — section headings, case study section titles
 * - h3 → `--font-size-2xl` (24px) — subsection headings, card titles
 *
 * Override with the `size` prop when context requires a different scale
 * (e.g. a CTA heading at h2 level using `--font-size-2xl`).
 *
 * ## Tokens used
 * - Font: font-serif (DM Serif Display)
 * - Weight: 400
 * - Line height: 1.2
 * - Color: `--color-text`
 * - Sizes: `--font-size-xl`, `--font-size-2xl`, `--font-size-3xl`,
 *   `--font-size-4xl`, `--font-size-5xl`
 */
const meta: Meta<typeof Heading> = {
  title: 'Core Components/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3],
      description: 'HTML heading level — h1, h2, or h3. Controls semantics, not visual size.',
    },
    size: {
      control: 'select',
      options: ['xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'Visual size. Defaults to 4xl for h1, 3xl for h2, 2xl for h3.',
    },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const H1: Story = {
  args: {
    level: 1,
    children: 'Designing systems that make research scale.',
  },
}

export const H2: Story = {
  args: {
    level: 2,
    children: 'Work that moves the needle.',
  },
}

export const H3: Story = {
  args: {
    level: 3,
    children: 'The insight that changed the direction.',
  },
}

export const Scale: Story = {
  name: 'Full scale',
  render: () => (
    <div>
      <Heading level={1}>Page title — h1 at 40px</Heading>
      <Heading level={2}>Section heading — h2 at 32px</Heading>
      <Heading level={3}>Subsection — h3 at 24px</Heading>
      <Heading level={2} size="2xl">CTA heading — h2 at 24px</Heading>
      <Heading level={2} size="5xl">Hero heading — h2 at 48px</Heading>
    </div>
  ),
}
