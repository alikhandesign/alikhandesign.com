import type { Meta, StoryObj } from '@storybook/react'
import SectionIntro from './SectionIntro'

/**
 * Section opener used throughout case study pages. Pairs a small uppercase
 * section label with a serif heading that frames what follows.
 *
 * The label uses the `.section-label` utility class (defined in globals.css):
 * `--font-size-xs`, uppercase, `--letter-spacing-lg`, `--color-accent`.
 * The heading renders at `--font-size-base` in font-serif weight 400 — intentionally
 * restrained so it reads as a lead-in rather than competing with section content.
 *
 * Used in every case study page for each narrative section: The Context,
 * The Problem, The Research, The Insight, The Design, The Outcomes, The Reflection.
 *
 * ## Tokens used
 * - Label: `--font-size-xs`, `--letter-spacing-lg`, `--color-accent` (via .section-label)
 * - Heading: `--font-size-base`, font-serif, `--color-text`
 */
const meta: Meta<typeof SectionIntro> = {
  title: 'Core Components/Typography/SectionIntro',
  component: SectionIntro,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    heading: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SectionIntro>

export const Default: Story = {
  args: {
    label: 'The Insight',
    heading: 'Treat the portfolio like a product',
  },
}

export const Outcomes: Story = {
  args: {
    label: 'The Outcomes',
    heading: 'Every key metric moved in the right direction',
  },
}
