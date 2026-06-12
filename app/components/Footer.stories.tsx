import type { Meta, StoryObj } from '@storybook/react'
import Footer from './Footer'

/**
 * Footer is the site-wide footer rendered on every page via the root layout.
 * It uses a simple two-column flex layout — copyright left, contact links right —
 * that wraps gracefully on mobile.
 *
 * ## Content
 * The footer surfaces three contact entry points: email (mailto), LinkedIn, and
 * GitHub. These are the same links available in ContactModal, giving visitors
 * a persistent low-friction alternative to the modal for direct contact.
 *
 * The email link is a direct mailto: here (unlike the nav "Let's Talk" which
 * triggers ContactModal). The footer is a passive, low-attention context —
 * a visitor scanning the footer is more likely to want to copy an address
 * than to be walked through a modal experience.
 *
 * ## Tokens used
 * - Background: --color-bg
 * - Copyright font size: --font-size-xs (0.75rem / 12px)
 * - Copyright color: --color-text-muted
 * - Link font size: --font-size-base (0.875rem / 14px)
 * - Link color: --color-text-muted
 * - Link weight: --font-weight-medium (500)
 * - Link gap: --space-6 (1.5rem)
 * - Container padding: site-footer class (--space-8 vertical, --space-12 horizontal)
 * - Top border: 1px --border (via site-footer class)
 *
 * ## Usage
 * Rendered once at the bottom of every page via app/layout.tsx.
 * Not used in isolation anywhere on the site.
 */
const meta: Meta<typeof Footer> = {
  title: 'Core Components/Navigation/Footer',
  component: Footer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
