import type { Meta, StoryObj } from '@storybook/react'
import PasswordGate from './PasswordGate'

/**
 * PasswordGate protects full case study content from public access while still
 * surfacing enough context to give hiring managers a reason to request access.
 *
 * ## Why a password gate?
 * Full case studies contain proprietary research findings, internal workflow
 * diagrams, and client-sensitive data. A password gate allows controlled sharing
 * with recruiters and hiring managers without making sensitive work fully public.
 *
 * The gate is intentionally transparent about what it's protecting — the "What's
 * inside" list sets expectations before the visitor even attempts to enter a
 * password. A visitor who knows the content is relevant to them is more likely to
 * reach out for access than one who encounters a blank gate with no context.
 *
 * ## Visual design
 * Uses the same 3px accent bar pattern as MetricCard — signaling elevated content.
 * The `--color-surface` background on a page with `--color-bg` fill creates visual separation
 * without requiring a modal or overlay.
 *
 * ## Interaction model
 * Password validation happens client-side on submit (button click or Enter key).
 * On success: gate unmounts, children render, `onUnlock` callback fires.
 * On failure: Input switches to error state, error message appears with `role="alert"`.
 * The error clears automatically after 2 seconds.
 *
 * ## Accessibility
 * Error message uses `role="alert"` for screen reader announcement.
 * Password input is labeled via `aria-label` and connected to the error message
 * via `aria-describedby` when an error is present.
 *
 * ## Tokens used
 * - Background: `--color-surface`
 * - Border: `--color-border`
 * - Border radius: `--radius-sm`
 * - Accent bar: 3px, `--color-accent`
 * - Padding: `--space-8` (2rem)
 * - Title: `--font-size-xl`, `--font-serif`, weight 400
 * - Description: `--font-size-base`, `--color-text-muted`
 * - Inside label: `--font-size-xs`, `--letter-spacing-md`, uppercase, `--color-text-muted`
 * - Inside items: `--font-size-base`, `--color-text-muted`
 * - Error message: `--font-size-xs`, `--color-accent-dark`
 *
 * ## Usage
 * Used once per protected case study page, wrapping the full case study content
 * as its `children`. Currently used on the Participant Listening Agent case study.
 */
const meta: Meta<typeof PasswordGate> = {
  title: 'Core Components/Forms/PasswordGate',
  component: PasswordGate,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Case study title displayed at the top of the gate.' },
    description: { control: 'text', description: 'Short description of the case study shown below the title. Sets context before the visitor enters a password.' },
    inside: { control: 'object', description: 'Array of strings previewing what the full case study contains.' },
    onUnlock: { description: 'Optional callback fired after successful password entry. Use for post-unlock side effects such as enabling the SideNavigation observer or triggering analytics.' },
    children: { description: 'The protected content rendered in place of the gate after a correct password is entered. Typically the full case study page content.' },
  },
}

export default meta
type Story = StoryObj<typeof PasswordGate>

export const Default: Story = {
  args: {
    title: 'Participant Listening Agent — Full Case Study',
    description: 'This case study contains proprietary workflow details and internal research findings.',
    inside: [
      'Full research methodology and interview guides',
      'Agentic pipeline architecture diagrams',
      'Internal validation results and accuracy breakdown',
      'Stakeholder presentation deck',
    ],
    children: <p style={{ padding: '2rem', color: 'var(--color-text-muted)' }}>Protected content renders here after unlock.</p>,
  },
}

export const ErrorState: Story = {
  name: 'Error State',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-8)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />
        <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Full Case Study</p>
        <h2 className="font-serif" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 400, lineHeight: 1.25, marginBottom: 'var(--space-2)' }}>Participant Listening Agent</h2>
        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>This case study contains proprietary workflow details and internal research findings.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', fontWeight: 600 }}>Enter password to access</p>
          <input type="password" className="password-input error" placeholder="Password" defaultValue="wrongpassword" style={{ width: '100%' }} aria-label="Case study password" readOnly />
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>View Full Case Study →</button>
          <p role="alert" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-dark)' }}>Incorrect password. Try again or request access below.</p>
        </div>
      </div>
    </div>
  ),
}
