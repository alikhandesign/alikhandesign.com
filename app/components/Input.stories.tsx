import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

/**
 * Input is a single-purpose component used exclusively inside PasswordGate.
 * It has three states that reflect the user's interaction with the password form.
 *
 * ## State: Default
 * The resting state. Border is `--color-border` — intentionally neutral and
 * unobtrusive. The default border does not use the accent color, which was a
 * deliberate correction from the original build where the default border was
 * `--color-accent`. Using accent as a default border conflated brand color with
 * interactive feedback, making it harder to distinguish the default state from
 * an error state.
 *
 * ## State: Focus
 * When the input is active, the border transitions to `--color-text` (dark) and a
 * subtle box shadow appears using `--color-border-mid`. The shadow color was chosen
 * over the full accent color to keep the focus ring calm — the PasswordGate is
 * already a high-attention moment and a bright red focus ring would add visual
 * noise without improving clarity.
 *
 * ## State: Error
 * When an incorrect password is submitted, the border changes to `--color-accent-dark`.
 * Using `--color-accent-dark` rather than a separate error red keeps the palette
 * minimal — the system only has one red ramp. The accompanying error message renders
 * below the input in `--color-accent-dark` at `--font-size-xs` — see PasswordGate
 * for the full error treatment in context.
 *
 * ## Tokens used
 * - Background: `--color-surface`
 * - Default border: `--color-border` (1.5px)
 * - Focus border: `--color-text` (1.5px) + box shadow `--color-border-mid`
 * - Error border: `--color-accent-dark` (1.5px)
 * - Font: `--font-sans`, `--font-size-base`
 * - Border radius: `--radius-sm`
 * - Transition: `--transition-base`
 */
const meta: Meta<typeof Input> = {
  title: 'Core Components/Input',
  tags: ['autodocs'],
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'boolean', description: 'Applies error border. Set by PasswordGate on incorrect submission.' },
    value: { control: 'text' },
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
