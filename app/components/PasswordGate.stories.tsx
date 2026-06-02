import type { Meta, StoryObj } from '@storybook/react'
import PasswordGate from './PasswordGate'

/**
 * PasswordGate protects full case study content from public access while still
 * surfacing enough context — title, description, and a preview of what's inside —
 * to give hiring managers a reason to request access.
 *
 * ## Why a password gate?
 * Full case studies contain proprietary research findings, internal workflow
 * diagrams, and client-sensitive data. A password gate allows controlled sharing
 * with recruiters and hiring managers without making sensitive work fully public.
 *
 * The gate is intentionally transparent about what it's protecting — the "What's
 * inside" list sets expectations before the visitor even attempts to enter a
 * password. This reduces friction: a visitor who knows the content is relevant
 * to them is more likely to reach out for access than one who encounters a
 * blank gate with no context.
 *
 * ## Visual design
 * The component uses the same 3px accent bar pattern as MetricCard — signaling
 * that this is a featured or elevated piece of content. The dark background
 * (`--dark-surface`) creates a visual container that separates the gate from
 * the surrounding page content without requiring a modal or overlay.
 *
 * ## Interaction model
 * Password validation happens client-side on submit. On success, the gate
 * unmounts and the protected children render in its place. On failure, the
 * Input switches to its error state and an error message appears below the form.
 * The password is stored in sessionStorage so the visitor doesn't need to
 * re-enter it on page refresh.
 *
 * ## Tokens used
 * - Container background: `--surface`
 * - Border: `--border`
 * - Border radius: `--radius`
 * - Accent bar: 3px, `--accent`
 * - Padding: `--space-8` (2rem)
 * - Title: `--text-2xl`, `--font-serif`, weight 400
 * - Description: `--text-sm`, `--text-muted`
 * - Inside label: `--text-xs`, uppercase, `--text-muted`
 * - Inside items: `--text-sm`, `--text-muted`
 * - Error message: `--text-xs`, `--accent-dark`
 */
const meta: Meta<typeof PasswordGate> = {
  title: 'Password Gate/PasswordGate',
  component: PasswordGate,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Case study title displayed at the top of the gate.' },
    cta: { control: 'text', description: 'Short description of the case study shown below the title. Sets context before the visitor enters a password.' },
    inside: { control: 'object', description: 'Array of strings previewing what the full case study contains. Displayed as a bulleted list.' },
    password: { control: 'text', description: 'The password required to unlock the content. Validated client-side.' },
  },
}

export default meta
type Story = StoryObj<typeof PasswordGate>

export const Default: Story = {
  args: {
    password: '4likh4n',
    title: 'Participant Listening Agent — Full Case Study',
    cta: 'This case study contains proprietary workflow details and internal research findings.',
    inside: [
      'Full research methodology and interview guides',
      'Agentic pipeline architecture diagrams',
      'Internal validation results and accuracy breakdown',
      'Stakeholder presentation deck',
    ],
    children: <p>Unlocked content here.</p>,
  },
}
