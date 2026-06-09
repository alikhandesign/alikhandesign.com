import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumb from './Breadcrumb'

/**
 * BreadcrumbNavigation provides wayfinding context on project and case study pages.
 * It shows the visitor where they are within the site hierarchy and provides
 * a quick path back to the My Work page.
 *
 * Always two levels on this site: "My Work" (link) › "Page Title" (current).
 * A third level is not currently used but the component supports it.
 *
 * ## Accessibility
 * Wrapped in a nav element with aria-label="Breadcrumb" so screen readers
 * announce it as a distinct navigation landmark. The current page item uses
 * aria-current="page" and is not a link. Separator characters are aria-hidden.
 *
 * ## Tokens used
 * - Link color: --text-muted
 * - Current page color: --text, weight 500
 * - Separator color: --border-mid
 * - Font size: --text-base
 * - Gap: --space-2
 *
 * ## Usage
 * Used at the top of every project and case study page, above the page header.
 * Always starts with "My Work" linking to /work, followed by the current page title.
 */
const meta: Meta<typeof Breadcrumb> = {
  title: 'Core Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array of breadcrumb items. Each item has a label and an optional href. Items without href render as the current page (no link, aria-current="page").' },
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
