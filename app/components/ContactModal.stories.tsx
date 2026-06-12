import type { Meta, StoryObj } from '@storybook/react'
import ContactModal from './ContactModal'

/**
 * ContactModal is the primary contact entry point across the site. It replaces
 * direct mailto: links with a considered overlay experience.
 *
 * ## Why not mailto?
 * A direct mailto: link opens the visitor's default email client, which may not
 * be configured, may open a native app they don't use, or may do nothing at all
 * if no default is set. The modal gives visitors agency: copy the address and
 * use any tool they prefer.
 *
 * ## Animation
 * Opens with a 200ms fade + 0.96→1 scale (ease-out).
 * Closes with a 150ms fade + 1→0.96 scale (ease-in).
 * Asymmetric timing: opening feels welcoming, closing feels decisive.
 *
 * ## Accessibility
 * role="dialog", aria-modal="true". Focus trap implemented — Tab cycles within
 * the modal. Focus returns to the trigger element on close.
 *
 * ## Tokens used
 * - Background: `--color-bg`
 * - Border radius: `--radius-sm`
 * - Accent bar: 3px, `--color-accent`
 * - Email row: `--color-surface`
 * - Title: `--font-size-2xl`, font-serif, weight 400
 * - Body: `--font-size-base`, `--color-text-muted`
 * - Copy button active: `--color-accent`
 */
const meta: Meta<typeof ContactModal> = {
  title: 'Templates/Overlays/ContactModal',
  component: ContactModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
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
