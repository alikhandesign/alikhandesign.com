import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Core Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Primary action button. The `primary` variant uses the accent fill — for the single most important action. The `secondary` variant uses a transparent background with a border — for secondary actions alongside a primary.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { label: 'View my work', variant: 'primary' } }
export const Secondary: Story = { args: { label: 'Learn more', variant: 'secondary' } }
export const PrimaryFullWidth: Story = { args: { label: 'Submit', variant: 'primary', fullWidth: true } }
export const SecondaryDisabled: Story = { args: { label: 'Unavailable', variant: 'secondary', disabled: true } }
export const NoArrow: Story = { args: { label: 'Reset', variant: 'secondary', arrow: false } }
