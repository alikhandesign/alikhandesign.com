import type { Meta, StoryObj } from '@storybook/react'
import Nav from './Nav'

/**
 * HeaderNavigation is the site-wide sticky navigation bar. It appears at the top
 * of every page and uses Next.js's `usePathname` hook to determine the active page.
 *
 * ## Link types
 * The nav has two distinct link types — not interchangeable:
 *
 * **Page links (My Work, About Me):** Navigate to internal pages. Use `next/link`
 * for client-side routing. Active state is determined by the current pathname.
 *
 * **CTA link (Let's Talk):** A `mailto:` link that opens the visitor's email client.
 * Always styled in `--accent` with medium weight regardless of active state.
 * It is never "active" in the traditional sense — it's a persistent call to action.
 *
 * ## State model
 * Each page link has three states:
 * - **Default:** `--text-muted`, weight 400
 * - **Hover:** `--accent-dark`, weight 500 — handled inline via `onMouseEnter`/`onMouseLeave`
 *   rather than CSS because inline styles override CSS class-based hover rules
 * - **Active:** `--text` (dark), weight 500 — set when `pathname` matches the link's href
 *
 * The hover state uses `--accent-dark` rather than `--accent` to distinguish
 * hover from the CTA link's persistent accent color. This prevents visual
 * confusion between "I'm hovering over a nav link" and "this is the Let's Talk button."
 *
 * ## Sticky behavior
 * The nav is `position: sticky` with `top: 0` and `z-index: 100`. It has a
 * `1px solid --border` bottom border that visually separates it from page content
 * when the user scrolls. Background is `--bg` (warm/50) — not white — to maintain
 * the warm palette even in the nav.
 *
 * ## Accessibility
 * Includes a visually hidden skip navigation link (`Skip to main content`) that
 * becomes visible on keyboard focus, allowing keyboard users to bypass the nav
 * and jump directly to page content.
 *
 * ## Tokens used
 * - Background: `--bg`
 * - Bottom border: `--border`
 * - Padding: 1.25rem vertical, `--space-12` (3rem) horizontal
 * - Link font size: `--text-base` (1rem / 16px)
 * - Link letter spacing: 0.02em
 * - Link gap: `--space-8` (2rem)
 * - Default color: `--text-muted`
 * - Hover color: `--accent-dark`
 * - Active color: `--text`
 * - CTA color: `--accent`
 * - Transition: color 150ms ease
 */
const meta: Meta<typeof Nav> = {
  title: 'Navigation/HeaderNavigation',
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
 * Default state — no page is active. Shown when visiting the homepage.
 */
export const Default: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/' } },
  },
}

/**
 * My Work is the active page. The link renders in --text (dark) at weight 500.
 */
export const WorkActive: Story = {
  name: 'Active — My Work',
  parameters: {
    nextjs: { navigation: { pathname: '/work' } },
  },
}

/**
 * About Me is the active page. The link renders in --text (dark) at weight 500.
 */
export const AboutActive: Story = {
  name: 'Active — About Me',
  parameters: {
    nextjs: { navigation: { pathname: '/about' } },
  },
}
