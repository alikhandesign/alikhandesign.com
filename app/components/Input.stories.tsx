import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

/**
 * Input is a single-purpose component used exclusively inside PasswordGate.
 * It has three states that reflect the user's interaction with the password form.
 *
 * ## State: Default
 * The resting state. Border is `--border` (warm/100) — intentionally neutral and
 * unobtrusive. The default border does not use the accent color, which was a
 * deliberate correction from the original build where the default border was
 * `--accent`. Using accent as a default border conflated brand color with
 * interactive feedback, making it harder to distinguish the default state from
 * an error state.
 *
 * ## State: Focus
 * When the input is active, the border transitions to `--text` (dark) and a
 * subtle box shadow appears using `--border-mid` (warm/200). The shadow color
 * was chosen over the full accent color to keep the focus ring calm — the
 * PasswordGate is already a high-attention moment and a bright red focus ring
 * would add visual noise without improving clarity.
 *
 * ## State: Error
 * When an incorrect password is submitted, the border changes to `--accent-dark`
 * (red/800). Using `--accent-dark` rather than a separate error red keeps the
 * palette minimal — the system only has one red ramp, and `--accent-dark` is
 * sufficiently distinct from the default and focus states to communicate failure
 * clearly without introducing a new color token.
 *
 * ## Background
 * The input sits on `--dark-bg` because PasswordGate always renders inside a
 * dark-surface context. The input background is `--dark-bg` with white caret
 * and white placeholder text (at reduced opacity).
 *
 * ## Tokens used
 * - Background: `--dark-bg`
 * - Default border: `--border` (1.5px)
 * - Focus border: `--text` (1.5px) + box shadow `--border-mid`
 * - Error border: `--accent-dark` (1.5px)
 * - Font: `--font-sans`, `--text-base` (1rem / 16px)
 * - Placeholder: `--text-faint`
 * - Padding: 0.75rem 1rem (`--space-3` / `--space-4`)
 * - Border radius: `--radius`
 * - Transition: `--transition-base` (150ms ease)
 */
const meta: Meta<typeof Input> = {
  title: 'Core Components/Input',
  tags: ['autodocs'],
  component: Input,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text shown when input is empty.' },
    error: { control: 'boolean', description: 'When true, applies the error border color (--accent-dark). Set by PasswordGate when an incorrect password is submitted.' },
    value: { control: 'text', description: 'Current input value. Controlled by parent component.' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Password',
    error: false,
    onChange: () => {},
  },
}

export const Focus: Story = {
  args: {
    value: '',
    placeholder: 'Password',
    error: false,
    onChange: () => {},
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Error: Story = {
  args: {
    value: 'wrongpassword',
    placeholder: 'Password',
    error: true,
    onChange: () => {},
  },
}
