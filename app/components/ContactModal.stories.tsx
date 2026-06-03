import type { Meta, StoryObj } from '@storybook/react'
import ContactModal from './ContactModal'

/**
 * ContactModal is the primary contact entry point across the site. It replaces
 * the direct mailto: link on "Let's Talk" in the nav — and any other CTA that
 * signals the visitor can reach out — with a considered overlay experience.
 *
 * ## Why not mailto?
 * A direct mailto: link opens the visitor's default email client, which may not
 * be configured, may open a native app they don't use, or may do nothing at all
 * if no default is set. It removes the visitor from the browser context unexpectedly.
 * The modal gives visitors agency: copy the address and use any tool they prefer,
 * or click the mailto button if that works for them.
 *
 * ## Animation
 * Opens with a 200ms fade + 0.96→1 scale (ease-out).
 * Closes with a 150ms fade + 1→0.96 scale (ease-in).
 * Faster on close than open — a deliberate micro-interaction principle.
 * The asymmetry makes opening feel welcoming and closing feel decisive.
 *
 * ## Dismissal
 * Three ways to close: X button, backdrop click, Escape key.
 * All three are equivalent — no hierarchy of confirmation.
 *
 * ## Copy confirmation
 * The Copy button swaps to a checkmark + "Copied!" for 2 seconds after
 * clicking, then reverts. Provides clear feedback without disrupting the layout.
 *
 * ## Accessibility
 * role="dialog", aria-modal="true", aria-label on the container.
 * X button has aria-label="Close contact modal".
 * Focus trap is implemented — Tab cycles within the modal, Shift+Tab reverses.
 * Focus returns to the trigger element (Let's Talk button) when the modal closes.
 *
 * ## Tokens used
 * - Background: --bg
 * - Border radius: --radius
 * - Accent bar: 3px, --accent
 * - Padding: --space-8
 * - Overlay: rgba(28,28,26,0.75) — --dark-bg at 75% opacity
 * - Email row background: --surface
 * - Title: --text-2xl, --font-serif, weight 400
 * - Body: --text-base, --text-muted
 * - Copy button active color: --accent
 * - Primary button: btn-primary class
 * - Link colors: --text-muted
 * - Transition: --transition-base
 *
 * ## Usage
 * Triggered by:
 * - "Let's Talk" in HeaderNavigation
 * - "Get in touch" button on About page
 * - CTAStrip on all project and case study pages
 */
const meta: Meta<typeof ContactModal> = {
  title: 'Contact/ContactModal',
  component: ContactModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Controls modal visibility. Managed by parent component state.' },
    onClose: { description: 'Callback fired when the modal is dismissed — via X button, backdrop click, or Escape key.' },
  },
}

export default meta
type Story = StoryObj<typeof ContactModal>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
}
