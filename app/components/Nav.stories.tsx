import type { Meta, StoryObj } from '@storybook/react'
import Nav from './Nav'

/**
 * HeaderNavigation is the site-wide sticky navigation bar. It appears at the top
 * of every page and uses Next.js's usePathname hook to determine the active page.
 *
 * This component accepts no props. Active state is derived automatically from the
 * current pathname via usePathname. In Storybook, active state is simulated by
 * passing a mock pathname value via the nextjs.navigation story parameter.
 *
 * ## Link types
 * The nav has two distinct link types — not interchangeable:
 *
 * **Page links (My Work, About Me):** Navigate to internal pages using next/link
 * for client-side routing. Active state is determined by pathname matching.
 *
 * **CTA link (Let's Talk):** A mailto: link that opens the visitor's email client.
 * Always styled in --accent with medium weight regardless of active state.
 * It is never "active" in the traditional sense — it's a persistent call to action.
 *
 * ## State model
 * Each page link has three states:
 * - Default: --text-muted, weight 400
 * - Hover: --accent-dark, weight 500 — handled inline via onMouseEnter/onMouseLeave
 *   rather than CSS because inline styles override CSS class-based hover rules
 * - Active: --text (dark), weight 500 — set when pathname matches the link's href
 *
 * Hover uses --accent-dark rather than --accent to distinguish hover from the
 * CTA link's persistent accent color.
 *
 * ## Sticky behavior
 * position: sticky, top: 0, z-index: 100. Bottom border 1px --border separates
 * the nav from page content on scroll. Background is --bg (warm/50), not white.
 *
 * ## Accessibility
 * Includes a visually hidden skip link ("Skip to main content") that becomes
 * visible on keyboard focus, allowing keyboard users to bypass the nav.
 * Focus visible styles apply a 2px --accent outline.
 *
 * ## Tokens used
 * - Background: --bg (warm/50)
 * - Bottom border: --border
 * - Padding: 1.25rem vertical, --space-12 (3rem) horizontal
 * - Link font size: --text-base (0.875rem / 14px)
 * - Link letter spacing: --letter-spacing-sm (0.02em)
 * - Link gap: --space-8 (2rem)
 * - Default color: --text-muted
 * - Hover color: --accent-dark
 * - Active color: --text
 * - CTA color: --accent
 * - Transition: color --transition-base
 *
 * ## Usage
 * Renders once at the top of every page via the root layout (app/layout.tsx).
 */
const meta: Meta<typeof Nav> = {
  title: 'Core Components/Navigation/Header',
  tags: ['autodocs'],
  component: Nav,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Nav>

/**
 * No page is active. Shown when visiting the homepage (pathname: '/').
 * All page links render in --text-muted at regular weight.
 */
export const Default: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/' } },
  },
}

/**
 * My Work (/work) is the active page.
 * "My Work" renders in --text (dark) at weight 500.
 */
export const WorkActive: Story = {
  name: 'Active — My Work',
  parameters: {
    nextjs: { navigation: { pathname: '/work' } },
  },
}

/**
 * About Me (/about) is the active page.
 * "About Me" renders in --text (dark) at weight 500.
 */
export const AboutActive: Story = {
  name: 'Active — About Me',
  parameters: {
    nextjs: { navigation: { pathname: '/about' } },
  },
}
