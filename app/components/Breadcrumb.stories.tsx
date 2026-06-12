import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumb from './Breadcrumb'

/**
 * Breadcrumb provides hierarchical navigation context on case study and project
 * pages. Links are rendered in `--color-text-muted`; the current page (last item,
 * no href) renders in `--color-text` at medium weight with `aria-current="page"`.
 * Chevron separators (›) use `--color-border-mid` and are `aria-hidden`.
 *
 * ## Tokens used
 * - Link color: `--color-text-muted`
 * - Current page color: `--color-text`, weight 500
 * - Separator color: `--color-border-mid`
 * - Font size: `--font-size-sm`
 * - Gap: `--space-2`
 */
const meta: Meta<typeof Breadcrumb> = {
  title: 'Core Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items. Omit href on the last item to render it as the current page.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'My Work', href: '/work' },
      { label: 'AI Feedback & Insights Agent' },
    ],
  },
}

export const ThreeLevel: Story = {
  name: 'Three levels',
  args: {
    items: [
      { label: 'My Work', href: '/work' },
      { label: 'Pattern Library', href: '/work/pattern-library' },
      { label: 'Generation States' },
    ],
  },
}
