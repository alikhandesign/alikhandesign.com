import type { Meta, StoryObj } from '@storybook/react'
import SideNav from './SideNav'

/**
 * SideNavigation is used on case study pages to provide in-page navigation
 * between sections. It uses IntersectionObserver to track which section is
 * currently in view and updates the active state accordingly.
 *
 * ## States
 * Each nav item has three states:
 * - **Default:** `--text-muted`, weight 400, `--border` left border
 * - **Hover:** `--text-mid`, weight 500, `--border-mid` left border
 * - **Active:** `--accent`, weight 500, `--accent` left border
 *
 * The sticky positioning (`top: 5rem`) keeps the nav visible as the user
 * scrolls through long case study content. Hidden on tablet and mobile
 * via the `.article-layout` grid collapse.
 */
const meta: Meta<typeof SideNav> = {
  title: 'Navigation/SideNavigation',
  tags: ['autodocs'],
  component: SideNav,
  argTypes: {
    sections: { control: 'object', description: 'Array of section IDs matching the `id` attributes of page sections. Labels are auto-generated from the ID by capitalizing each word.' },
    unlocked: { control: 'boolean', description: 'When false, the observer setup is deferred. Used when content is behind a PasswordGate.' },
  },
}

export default meta
type Story = StoryObj<typeof SideNav>

export const Default: Story = {
  args: {
    sections: ['overview', 'research', 'design', 'outcomes', 'reflections'],
    unlocked: true,
  },
}
